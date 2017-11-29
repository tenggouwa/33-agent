<template>
  <div id="innovate">
    <trade-header :moneyinfo="moneyinfo" @headlogin="tradeLoginSuccess" @updatesymbol="updateThisSymbol" @fullChange="checkFullChange" :loginsuccess="loginsucc" :change="'1'"></trade-header>
    <div class="tradecontent">
      <div id="tradeleft">
        <common-let></common-let>
      </div>
      <div id="traderight" v-loading="tradeloading" element-loading-text="数据加载中">
        <div id="Quotation">
          <table class="tb-buy">
            <thead>
              <tr>
                <th class="tdth1"></th>
                <th class="tdth2">挂买量</th>
                <th class="tdth3"></th>
                <th class="tdth4">{{symbol}}/CNY</th>
                <th class="tdth5"></th>
                <th class="tdth6">挂卖量</th>
                <th class="tdth7" style="text-align:right;padding-right:20px;">市场量</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in sellticketList">
                <td class="tdth1 btd1" style="text-align:left;padding-left:20px;">{{-(index-sellticketList.length)}}</td>
                <td class="tdth2 btd2">{{item.buywtd |formatNum}}</td>
                <td class="tdth3 btd3" @click="tradeC('BUY',item.price,tradenum)">买入</td>
                <td class="tdth4 btd4" @click="selectprice(item.price)">{{item.price |formatPrice}}</td>
                <td class="tdth5 btd5" @click="tradeC('SELL',item.price,tradenum)" >挂卖</td><!-- 双击事件 ：@dblclick='canneltrade(item.id)'id要从外界传过来 -->
                <td class="tdth6 btd6">{{item.sellwtd |formatNum}}</td>
                <td class="tdth7 btd7" style="text-align:right;padding-right:20px;">{{item.am |formatNum}}</td>
              </tr>
            </tbody>
          </table>
          <table class="newinfo" style="height:30px">
            <tbody>
              <tr>
                <td class="tdth1"></td>
                <td class="tdth2 btd1"></td>
                <td class="tdth3"></td>
                <td class="tdth4" style="font-size:20px;line-height:30px" :class="{'newlasttr':isbuy==0,'newlast':isbuy!=0}">{{newprice}}</td>
                <td class="tdth5"></td>
                <td class="tdth6 btd1"></td>
                <td class="tdth7 btd99" style="font-size:20px;line-height:30px; height:30px;text-align: right;" :class="{'newlasttr':isbuy==0,'newlast':isbuy!=0}">{{newtradenum}}</td>
              </tr>
            </tbody>
          </table>
          <table class="tb-sell">
            <tbody>
              <tr v-for="(item,index) in buyticket">
                <td class="tdth1 btd1" style="text-align:left;padding-left:20px;">{{ index+1 }}</td>
                <td class="tdth2 btd2">{{item.buywtd|formatNum }}</td>
                <td class="tdth3 btd3" @click="tradeC('BUY',item.price,tradenum)">挂买</td>
                <td class="tdth4 btd4" @click="selectprice(item.price)" >{{item.price|formatPrice}}</td>
                <td class="tdth5 btd5" @click="tradeC('SELL',item.price,tradenum)">卖出</td>
                <td class="tdth6 btd6" @click="">{{item.sellwtd|formatNum}}</td>
                <td class="tdth7 btd7" style="text-align:right;padding-right:20px;">{{item.am|formatNum}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="capitalinfo">
          <!-- <div class="proesspas">
            <scrollCom class="leftinfo" :proessnum="buynumm" bgclass="surplus" showcionType="BTC" :coastnum="buymoney" :nextnum="nextMoney" @proessClick="scrolltrue('BUY')" @change="buyscroll">
            </scrollCom>
            <scrollCom class="rightinfo" :proessnum="sellScroll" bgclass="surplus" :showcionType="symbol" :coastnum="sellmoney" :nextnum="nextcoin" @proessClick="scrolltrue('SELL')" @change="sellscroll" :lastleng="182">
            </scrollCom>
          </div> -->
          <div class="tradeinput">
            <ul class="tradebutton">
              <li class="buytrade">
                <span class="bfirst fbgc" @click="tradeC('BUY',buyprice,tradenum)">买入</span>
                <!-- <div class="bcenter">
                  <button class="xsan fbgc" @click="priceup('buy')">
                    <div class="xssj"></div>
                  </button>
                 <button class="xxan fbgc" @click="pricedown('buy')">
                    <div class="xxsj"></div>
                  </button>
                </div> -->
                <input class="binput buyborder" type="number" @keyup="inputprice('buy')" v-model="buyprice" style="color: #ff3a3a">
              </li>
              <li class="buynum">
                <span class="bfirst bbgc">数量</span>
                <!-- <div class="bcenter">
                  <button class="xsan bbgc" @click="numup()">
                    <div class="xssj"></div>
                  </button>
                 <button class="xxan bbgc" @click='numdown()'>
                    <div class="xxsj"></div>
                  </button>
                </div> -->
                <input class="binput buynum" type="number" v-model="tradenum" @keyup="tradeinputNum()">
              </li>
              <li class="selltrade">
                <span class="bfirst cbgc" @click="tradeC('SELL',sellprice,tradenum)">卖出</span>
                <!-- <div class="bcenter">
                  <button class="xsan cbgc" @click="priceup('sell')">
                    <div class="xssj"></div>
                  </button>
                  <button class="xxan cbgc" @click="pricedown('sell')">
                    <div class="xxsj"></div>
                  </button>
                </div> -->
                <input class="binput sellborder" type="number" @keyup="inputprice('sell')" v-model="sellprice" style="color: #6cd84c;">
              </li>
            </ul>
            <div class="fl coamoney">
              <p>
                <span>可用BTC</span>
                <span class="nextmoney clickcolor" @click="buyall()">{{myAssets.availablemoney}} ≈ {{MaxBuyNum}}{{symbol}}</span>
              </p>
              <p class='freeze'>
                <span>冻结BTC</span>
                <span> {{myAssets.frozenmoney}}</span></p> 
            </div>
            <div class="fr coamoney coastright">
              <p>
                <span class="nextmoney clickcolor" @click="sellall()">{{myAssets.availablecoin}}</span>
                <span>可用{{symbol|filIndex}}</span>
                <!-- <span v-if="symbol=='NYCC'">可用YCC</span>
                <span v-if="symbol=='WTC'">可用WTD</span> -->
              </p>
              <p>
                <span class="nextmoney">{{myAssets.frozencoin}}</span>
                <span>冻结{{symbol|filIndex}}</span>
                <!-- <span v-if="symbol=='NYCC'">冻结YCC</span>
                <span v-if="symbol=='WTC'">冻结WTD</span> -->
              </p>
            </div> 
            <div class="success" :class="{'buycolor':tradeparam.ty=='BUY'}" v-if="success">
              <p class="priceandNum">
                <label class="leftprice"><span class="labelname">价</span><span>{{Tprice}}</span></label>
                <label class="rightnum"><span class="labelname">量</span><span>{{Tnum}}</span></label>
              </p>
              <p class="tradeok">{{tradeparam.ty=='BUY' ? '买入成功' : '卖出成功'}}</p>
            </div>
          </div>
          <div class="shade" v-if="reveal==false">
            <ul>
              <li class="nologindia">
                <p>请先</p>
                <p class='click' @mouseover="showlogo(1)">登录</p>
                <p>或</p>
                <p class='click' @mouseover="showlogo(2)">注册</p>
                <p>后进行交易</p>
              </li>
              <li class="logins">
                <tradelogin @tradeSuccess="tradeLoginSuccess" :showLogin="tradeComLogines" :logins="2" :shownum="loginNum"></tradelogin>
              </li>
            </ul>
          </div>
        </div>
        <div class="newtradebottom">
          <handlePage :newtradedata="newtrade" :flashSymbal="flashSymbal"></handlePage>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import tradeHeader from './tradeheader'
  import commonLet from './commonlet'
  import scrollCom from '../../components/scrollCom.vue'
  import handlePage from './handlePage.vue'
  import tradelogin from './tradelogin.vue'
  import { ajax,getticketcom,delatecookie,getticket,cannel,getusermoney,getcookie,formatcoinNum,formatcoinPrice,initCoinNum,getmincoinNum,getminPriceNUm,formatcoinpriceHQ,formatcoinprice,initINput,addtradeNum,numjs } from '../../assets/js/common'
  import {sellscrolles,buyscrolles,sellTradeCom,buycTradeCom,priceComDown,priceComUp} from '../../assets/js/proesscom'
  export default{
    props:["change"],
    data(){
      return{
        loginNum:1,
        tradeComLogines:true,
        showss:false,//未登录下鼠标移入的控制
        shwomoney:false,//登录下鼠标移入的控制
        isbuy:0,
        tradeloading:false,//行情数据加载
        loginsucc:false,//页面登录，控制头部的登录信息显示
        success:false,//显示交易成功的提示
        activeName:'first',
        rate:0,
        MaxBuyNum:0,
        isclickMax:false,
        addNumFlage:0,//用来判断是否要截取
        buyprice:0,
        sellprice:0,
        Tprice:0,//成功显示的价格
        Tnum:0,//成功显示的量
        sellScroll:0,
        sellmoney:'0.00',
        flashSymbal:false,//切换币种是改变
        buynumm:0,
        sellnum:0,
        nextcoin:0,
        buymoney:0,
        nextMoney:0,
        buyscrollchange:true,
        sellscrollchange:true,
        mountedSellone:0,
        mountedBuyone:0,
        tradenum:0.0001,
        repeattime:0,
        lunxuntime:0,
        buyshow:'false',
        sellshow:'false',
        reveal:false,
        symbol:sessionStorage.getItem('symbol'),
        ticket:{
          num:'12',
          currency:'btc',
        },
        moneyinfo:{
          // CNY:{},
          BTC:{},
          BCC:{},
          ETH:{},
          ETC:{},
          // SC:{},
          ZEC:{},
          // BTS:{},
          LTC:{},
          // NYCC:{},
          // WTC:{},
        },
        myAssets:{
          availablecoin:'--',
          frozencoin:'--',
          availablemoney:'--',
          frozenmoney:'--',
        },
        //委托单参数
        orderparm:{
          symbol:'BTCCNY',
          t:'all',
          ty:'open',
          pagesize:30,
          page:1,
          format:'',
          amstring:1
        },
        tradeparam:{//交易参数
          ty:'BUY',
          price:0,
          amount:0,
          currency:'BCC',
          currency2:'BTC',
        },
        orderlist:[],
        sellticket:[],
        buyticket:[],
        newtrade:[],
        newprice:0,
        newtradenum:0,
        selllength:0,
      }
    },
    watch:{
      mountedSellone:function(val){
        if(this.sellprice==0){
          this.sellprice=val;
        }
      },
      mountedBuyone:function(val){
        if(this.buyprice==0){
          this.buyprice=val;
        }
      }
    },
    computed:{//触发
      sellticketList: function () {
        getusermoney(this);
        if(this.addNumFlage==1){
          return this.sellticket.slice(1, this.ticket.num);
        }else if(this.addNumFlage==3){
          return this.sellticket;
        }
      }
    },
    components:{
      tradeHeader,
      commonLet,
      scrollCom,
      handlePage,
      tradelogin
    },
    filters:{
      filIndex(e){
        if(e == 'NYCC'){
          return 'YCC';
        }
        else if(e == 'YCC'){
          return 'DYCC';
        }
        else if(e == 'WTC'){
          return 'WDT';
        }
        else{
          return e;
        }
      }, 
      // var _this=this;
       //格式化数量小数点位数
      formatNum(e){
        // console.log(e);
        if(e==''||e==undefined){
          return '';
        }
        if(formatcoinNum(sessionStorage.getItem('symbol'))==0){
          return parseInt(e);
        }
        else{
          return  parseFloat(e).toFixed(formatcoinNum(sessionStorage.getItem('symbol')))
        }
      },
      //格式化价格小数点位数
      formatPrice(e){
        return  parseFloat(e).toFixed(formatcoinprice(sessionStorage.getItem('symbol')))
      },
      checkSellshow:function(e,sellshow){
        if(sellshow==true){
          return e;
        }
        else{
          return "";
        }
      },
      checkBUYshow:function(e,buyshow){
        if(buyshow==true){
          return e;
        }
        else{
          return "";
        }
      }
    },
    mounted:function(){
      var _this=this;
      this.checkFullChange();
      this.getmHt();
      this.sellticket=[];
      this.buyticket=[];
      this.tradeloading=true;
      this.newprice=0;
      this.newtradenum=0;
      this.symbol=sessionStorage.getItem('symbol');
      // getfxee(this);
      this.tradenum=initINput(this.symbol);
      getticket(this,sessionStorage.getItem('symbol'),'fasttrade');//获取行情
      if(getcookie('token')){
        this.reveal=true;
        this.username=getcookie('username');
      }
      if(getcookie('token')){
        this.getweituodan();
        getusermoney(this);
      }
      this.repeattime=setInterval(function(){
        getticket(_this,sessionStorage.getItem('symbol'),'fasttrade');
        if(getcookie('token')){
          getusermoney(_this);
          _this.getweituodan();
        }
      }, 2000);
      setTimeout(function(){
        $("#traderight").mCustomScrollbar('destroy');
        $("#traderight").mCustomScrollbar({
          scrollButtons:{  
              enable:false //是否使用上下滚动按钮  
          }, 
          autoHideScrollbar: true,
        });
        $(".content1").mCustomScrollbar({
          scrollButtons:{  
              enable:false //是否使用上下滚动按钮  
          }, 
          autoHideScrollbar: true,
        });
      }, 100);
      let that = this;
      window.onresize = function temp() {
        that.checkFullChange();
        that.getmwh();
        location.reload(true)
      };
    },
    
    destroyed:function(){
      clearInterval(this.repeattime);
      clearInterval(this.historyTime);
      clearInterval(this.openTime);
    },
    methods:{
      tradeLoginSuccess(){
        this.reveal = true;
        this.loginsucc = !this.loginsucc;
        if(getcookie('token')){
          getusermoney(this);
          this.getweituodan();
        }
      },
      showlogo(num){
        this.tradeComLogines=!this.tradeComLogines;
        this.loginNum=num;
      },
      //判断是否全屏
      checkFullChange(){
        if(sessionStorage.getItem('fullChange')=="1"){
          //全屏模式
          this.getFullwh();
          $("#traderight").hide();
        }else{
          this.getmwh();
          $("#traderight").show();
        }
      },
      addclass(){
        sessionStorage.setItem('change','1');
      },
      sellcomtrade(){
        this.sellmoney=Number(parseFloat(this.sellprice*this.sellnum).toFixed(2));
        this.sellScroll=Number(parseFloat(this.sellnum/this.myAssets.availablecoin*100).toFixed(2));
      },
      scrolltrue(type){
        if(type=='BUY'){
          this.buyscrollchange=true;
        }else{
          this.sellscrollchange=true;
        }
      },
      //拖动买入滑块
      // buyscroll(val){
      //   this.sellScroll=0;
      //   buyscrolles(val,this);
      // },
      //  //拖动卖出滑块
      // sellscroll(val){
      //   sellscrolles(val,this);
      //   this.buynumm=0;
      // },
      updateThisSymbol(){
        this.sellticket=[];
        this.buyticket=[];
        this.tradeloading=true;
        this.sellprice=0;
         this.buyprice=0;
        this.symbol=sessionStorage.getItem('symbol');
        this.tradenum=initINput(this.symbol);
        this.sellScroll=0;
        this.buynumm=0;
        this.isclickMax=false;
        getticket(this,sessionStorage.getItem('symbol'),'fasttrade');
        this.flashSymbal=!this.flashSymbal;
      },
      tradeinputNum(){
        this.tradenum=getmincoinNum(this.symbol,this.tradenum);
        // this.changtradeNum();

      },
      //改变数量的变化
      // changtradeNum(){
      //   if(this.tradenum>0 && this.buynumm>0 && this.buyprice>0){
      //     this.buyscrollchange=false;
      //     this.sellScroll=0;
      //     this.buymoney=parseFloat(this.buyprice*this.tradenum).toFixed(2);
      //     // this.buymoney=parseFloat(this.buyprice*this.tradenum*(1+this.rate)).toFixed(2);
      //     if(this.buymoney-this.myAssets.availablemoney>=0){
      //       this.buymoney=this.myAssets.availablemoney;
      //       // this.tradenum=parseInt(this.myAssets.availablemoney/(1+this.rate)/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
      //       this.tradenum=parseInt(this.myAssets.availablemoney/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
      //     }
      //     this.buynumm=Number(parseFloat(this.buymoney/this.myAssets.availablemoney*100).toFixed(2));
      //     this.nextMoney=parseFloat(this.myAssets.availablemoney-this.buymoney).toFixed(2);
      //     // buycTradeCom(this);
      //   }else if(this.tradenum>0 && this.sellScroll>0 && this.sellprice>0){
      //     this.sellscrollchange=false;
      //     this.buynumm=0;
      //     this.sellmoney=parseFloat(this.sellprice*this.tradenum).toFixed(2);
      //     if(this.tradenum-this.myAssets.availablecoin>=0){
      //       this.tradenum=this.myAssets.availablecoin;
      //     }
      //     this.nextcoin=parseInt((this.myAssets.availablecoin-this.tradenum)*numjs(this.symbol))/numjs(this.symbol)
      //     this.sellScroll=Number(parseFloat(this.tradenum/this.myAssets.availablecoin*100).toFixed(2));
      //     // sellTradeCom(this);
      //   }
      // },
      inputprice(type){
        if(type=='buy'){
          this.buyscrollchange=false;
          this.buyprice=formatcoinPrice(this.symbol,this.buyprice)
          // if(this.buyprice){
          //   buycTradeCom(this);
          // }
        }else{
          this.sellprice=formatcoinPrice(this.symbol,this.sellprice);
          this.sellscrollchange=false;
          // if(this.sellprice){
          //   sellTradeCom(this);
          // }
        }
      },
      getFullwh(){
        var mwidth=document.body.clientWidth;
        var tradeleft=document.getElementById('tradeleft');
        tradeleft.style.width=mwidth+'px';
        var mheight=document.body.clientHeight;
        var tradeleft=document.getElementById('tradeleft');
        tradeleft.style.height=(mheight-110)+'px';
      },
      getmwh(){
        var mwidth=document.body.clientWidth;
        var tradeleft=document.getElementById('tradeleft');
        tradeleft.style.width=(mwidth-452)+'px';
        var mheight=document.body.clientHeight;
        var tradeleft=document.getElementById('tradeleft');
         tradeleft.style.height=(mheight-110)+'px';
      },
      getmHt(){
        let mheight=document.body.clientHeight;
        let Quotation=document.getElementById('Quotation');
        let QuotaHeight=mheight-384;
        let ticketHeight=QuotaHeight-60;
        Quotation.style.height=QuotaHeight+'px';
        this.ticket.num=parseInt(ticketHeight/40);
        if(ticketHeight-this.ticket.num*40>20){
          this.ticket.num=this.ticket.num+1;
          this.addNumFlage=1;
        }else{
          this.addNumFlage=3;
        }
      },
      //
      buyall(){
        this.sellScroll=0;
        this.buynumm=100;
        this.isclickMax=true;
        if(formatcoinNum(this.symbol)==0){
          // this.tradenum=parseInt(this.myAssets.availablemoney/(1+this.rate)/this.buyprice)
          this.tradenum=parseInt(this.myAssets.availablemoney/this.buyprice)
        }
        else{
          // this.tradenum=parseInt(this.myAssets.availablemoney/(1+this.rate)/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
          this.tradenum=parseInt(this.myAssets.availablemoney/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
        }
      },
      //计算可买的最大值
      changMaxNum(){
        if(this.buyprice>0){
          this.MaxBuyNum=parseInt(this.myAssets.availablemoney/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
          if(this.isclickMax){
            this.tradenum=this.MaxBuyNum;
            buycTradeCom(this);
          }
        }
        // if(this.buyprice>0 && this.rate>0){
        //   this.MaxBuyNum=parseInt(this.myAssets.availablemoney/(1+this.rate)/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
        //   if(this.isclickMax){
        //     this.tradenum=this.MaxBuyNum;
        //     buycTradeCom(this);
        //   }
        // }
      },
      sellall(){
        this.buynumm=0;
        this.sellScroll=100;
        this.tradenum=this.myAssets.availablecoin;
      },
      //获取委托单
      getweituodan(){
        var _this=this;
        this.orderparm.order_statu='open';
        this.orderparm.order_type='all';
        this.orderparm.symbol=sessionStorage.getItem('symbol')+"BTC";
        var _this=this;
        ajax(this,this.extendApi.hisorder,this.orderparm,function(reponse){
          if(reponse.code==200){
            var reponse=reponse.data;
            _this.amstat=reponse.amstat;
          }else if(reponse.code==-2){
            delatecookie();
            _this.$alert(
                '您还未登录，请先登录',
                '提示',
            ).then(() => {
              _this.$router.push({
                path: '/'
              });
            });
          }else{
            _this.$notify({
              title: '提示',
              message: response.error,
              type: 'error'
            });
          }
        },'GET')
      },
      selectprice(price){
        this.buyprice=this.sellprice=price;
        this.changMaxNum();
      },
      //交易函数
      tradeC(tradetype,price,num){
        // this.state= '123';
        var _this=this;
        var url=this.extendApi.place;
        this.tradeparam.ty=tradetype;
        this.tradeparam.price=price;
        this.tradeparam.amount=num;
        this.tradeparam.currency=sessionStorage.symbol;
        if(tradetype=='BUY'){
          _this.buyshow=true;
          if(parseFloat(this.tradeparam.price)>parseFloat(this.newprice)*1.1){
            //买入价高出当前价格的10%给出提示
            this.$confirm('买入价高出当前价格的10%，您确定继续交易么？','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              if(this.myAssets.availablemoney-price*num>0){
                this.canteade(url);
              }else{
                _this.$notify({
                  title: '失败',
                  message: '可用资金不足',
                  type: 'error'
                })
              }
            });
          }else if(this.myAssets.availablemoney-price*num>0){
            this.canteade(url);
          }else{
            _this.$notify({
              title: '失败',
              message: '可用资金不足',
              type: 'error'
            })
          }
        }
        if(tradetype=='SELL'){
          _this.sellshow=true;
          if(parseFloat(this.tradeparam.price)<parseFloat(this.newprice)*0.9){
          //卖出价低于当前价格的10%给出提示
            this.$confirm('卖出价低于当前价格的10%，您确定继续交易么？','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              if(this.myAssets.availablecoin-num>=0){
                this.canteade(url);
              }else{
                _this.$notify({
                  title: '失败',
                  message: '可用币不足',
                  type: 'error'
                })
              }
            })
          }else if(this.myAssets.availablecoin-num>=0){
            this.canteade(url);
          }else{
            _this.$notify({
              title: '失败',
              message: '可用币不足',
              type: 'error'
            })
          }
        }
      },
      canteade(url){
        var _this=this;
        ajax(this,url,this.tradeparam,function(response){
          _this.Tprice=_this.tradeparam.price;
          _this.Tnum=_this.tradeparam.amount
          if(response.code==200){
            _this.buynumm=0;
            _this.sellScroll=0;
            getusermoney(_this);
            _this.success=true;
            setTimeout(function(){
              _this.success=false;
            }, 2000);
          }else if(response.code==-2){
            delatecookie();
            _this.$alert(
                '您还未登录，请先登录',
                '提示',
            ).then(() => {
              _this.$router.push({
                path: '/'
              });
            });
          }else{
            _this.$notify({
              title: '提示',
              message: response.error,
              type: 'error',
              duration:'1000',
            })
          }
        });
      },
      //点击数量向上加数量
      // numup(){
      //   let addnum=formatcoinNum(this.symbol);
      //   if(formatcoinNum(this.symbol)>0){
      //     this.tradenum=Number(this.tradenum)+Number(addtradeNum(this.symbol));
      //     this.tradenum=parseFloat(Number(this.tradenum)).toFixed(formatcoinNum(this.symbol));
      //   }else{
      //     this.tradenum=this.tradenum+1;
      //   }
      //   this.changtradeNum();
      // },
      // numdown(){
      //   let _this=this;
      //   let addnum=formatcoinNum(this.symbol);
      //   if(formatcoinNum(this.symbol)>0){
      //     this.tradenum=Number(this.tradenum)-Number(addtradeNum(this.symbol));
      //     this.tradenum=parseFloat(Number(this.tradenum)).toFixed(formatcoinNum(this.symbol));
      //   }else{
      //     this.tradenum=this.tradenum-1;
      //   }
      //   this.changtradeNum();
      //   if(this.tradenum<=0.0001){
      //     this.tradenum="0.0001";
      //     _this.$notify({
      //       title: '提示',
      //       message: "数量不足,不可点击",
      //       type: 'error'
      //     })
      //   }
      // },
      // priceup(tradetype){
      //   if(tradetype=='buy'){
      //     this.buyscrollchange=false;
      //     this.buynum=this.tradenum;
      //   }else{
      //     this.sellscrollchange=false;
      //     this.sellnum=this.tradenum;
      //   }
      //   priceComUp(tradetype,this); 
      // },
      // pricedown(tradetype){
      //   if(tradetype=='buy'){
      //     this.buynum=this.tradenum;
      //   }else{
      //     this.sellnum=this.tradenum;
      //   }
      //   priceComDown(tradetype,this);
      // },
      canneltrade(id){
        var _this=this;
        cannel(this,id);
      },
    }
  }
</script>
<style>
  #innovate{
    width: 100%;
    height: 100%;
    background: #000;
    overflow: hidden; 
    .el-slider__button-wrapper{
      z-index:2!important;
    }
    .el-loading-mask{
      background: rgba(0,0,0,0.7)!important;
    }
    .tradecontent{
      width: 100%;
      height: 100%;
      #tradeleft{
        float: left;
        margin-top: 70px;
        height: 100%;
        /*background: url('../../assets/img/Klogo.png')*/
      }
      #traderight{
        margin-top: 2px;
        width: 450px;
        height: 100%;
        cursor: default;
        float: right;
        overflow-y: auto;
        overflow-x: hidden;
        .buycolor{
          color: #c81118;
        }
        .sellcolor{
          color: #46962e;
        }
        #Quotation{
          width: 100%;
          overflow: hidden;
         min-height: 160px;
          background: rgba(15,15,15,15);
          th{
            color: #555555;
            height: 30px;
            line-height: 30px;
            text-align: center;
          }
          td{
            height: 20px;
            line-height: 20px;
            text-align: center;
          }
          .tdth1{
            width: 40px;
          }
          .tdth2,.tdth6{
            width: 70px;
          }
          .tdth3,.tdth4,.tdth5{
            width: 56px;
            text-align: center;
          }
          /*.tdth4{
            text-align: right;
          }*/
          .tdth7{
            width: 100px;
            padding-right: 20px;
          }
          .btd1{
            color: #555;
          }
          .btd2,.btd6{
            color: rgb(255, 102, 0);;
          }
          .btd3{
            color: #681818;
            cursor: pointer;
          }
          .newlasttr{
             color:rgb(255, 58, 58);
            cursor: pointer;
          }
          .newlast{
            color: rgb(108, 216, 76);
            cursor: pointer;
          }
          .btd3:hover{
            background: #ad2424;
            color: #fff;
          }
          .btd4,.btd7{
            color: #777;
             font-weight:bold;
          }
          .btd5{
             color: #316526;
            cursor: pointer;
          }
          
          .btd5:hover{
            background: #46962e;
            color: #fff;
          }
          .newinfo{
            background: #171716;
            width: 450px;
            height: 20px;
            line-height: 20px;
          }
        }
        .capitalinfo{
          width: 100%;
          /*height: 150px;*/
          height: 105px;
          margin: 2px 0px 0px 0px;
          background: rgba(15,15,15,15);
          color: #777;
          position: relative; 
          padding-top: 5px;
          .shade{
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,0.7);
            position: absolute;
            top:0;
            left:0;
            z-index:10;
            ul{
              width: 50%;
              margin: auto;
              .nologindia{
                p{
                  float: left;
                  font-size: 16px;
                  color:#fff;
                  line-height: 30px;
                  margin-top: 75px;
                }
                .click{
                  color: #ff6600;
                  padding:0 5px 0 5px;
                }
              }
            .logins{
                position: absolute;
                top:-190px;
                left:76px;
                color:#ff6600;
                font-size: 14px;
                z-index: 2000;
                .logincom{
                  position: absolute!important;
                  left: 10px;
                  width: 180px;
                  background-color: #232325;
                  color: #ff6600;
                  text-align: center;
                  padding: 0px 20px 20px 20px;
                }
                .user-num {
                  color: rgba(225, 225, 225, 0.9);
                  padding-left: 25px;
                  background-image: url(../../assets/img/head-portrait.png);
                  background-position: left center;
                  background-repeat: no-repeat;
                  background-size: 20px;
                }
                .islogo{
                  color: #fff;
                  width: 300px;
                  z-index: 9999;
                  .total-assets{
                    text-align: left;
                    height: 40px;
                    color: #666;
                    span{
                      line-height: 40px;
                    }
                    .assets{
                      font-size: 18px;
                      color: #ccc;
                    }
                  }
                  .btn-box{
                    #exit {
                      float: right;
                      background-color: #808080;
                      width: 80px;
                      height: 30px;
                      line-height: 30px;
                      border-width: 0px;
                      padding: 0px 6px;
                      margin-top: 2px;
                      /*margin-left: 8px;*/
                    }
                  }
                  .rech{
                    width: 160px;
                    margin-left: -20px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background: #c81118;
                    color: #fff;
                    cursor: pointer;
                    border:0;
                  }
                  .table{
                    width: 100%;
                    margin-left: -60px; 
                    margin: auto;
                  }
                  .coinmoney{
                    width: 260px!important;
                    height: 30px;
                    line-height: 30px;
                    td{
                      width: 40px!important;
                      height: 30px;
                      line-height: 30px;
                      text-align: right;
                      padding: 0 5px;
                      font-size: 14px;
                      color: #ccc;
                    }
                    td:nth-child(1){
                      text-align: left;
                      width: 40px!important;
                    }
                    th{
                      width: 40px;
                      height: 30px;
                      line-height: 30px;
                      text-align: left;
                      padding: 0 5px;
                      font-size: 12px;
                      color: #666;
                    }
                    .at-right{
                      text-align: right;
                      width: 110px;
                    }
                  }
                }
              }
            }
          }
          .tradebutton{
            height: 30px;
            /*margin-top: 10px;*/
            padding: 0 20px;
            .buytrade{
              float: left;
              height: 100%;
              margin-right:2px;
            }
            .selltrade{
              float: right;
              height: 100%;
              margin-right: -5px;
            }
            li{
              float: left;
              width: 137px;
              height: 30px;
              .bfirst{
                display: block;
                float: left;
                width: 40px;
                height: 30px;
                line-height: 30px;
                padding: 0px 6px;
                border-radius: 0;
                font-size: 10pt;
                cursor: pointer;
                border-color: transparent;
                font-weight: bold;
                color: #000;
              }
              .fbgc{
                background: #ae2424;
                
              }
              .fbgc:hover{
                background:rgb(255, 58, 58);
                color: #fff; 
              }
              .bbgc{
                background: #808080; 
              }
              .cbgc{
                background: #3a7a26;
              }
              .cbgc:hover{
                color: #fff;
                background: rgb(108, 216, 76);
              }
              /*.bcenter{
                float: left;
                width: 15px;
                height: 30px;
                margin-left: 1px;
                .xsan {
                  height: 15px;
                  padding-left: 2px;
                  padding-right: 2px;
                  width: 100%;
                  border-style: none;
                  display: block;
                }
                .xssj {
                  width: 0;
                  height: 0;
                  margin-left: 1px;
                  vertical-align: middle;
                  border-bottom: 4px solid #000 !important;
                  border-right: 4px solid transparent;
                  border-left: 4px solid transparent;
                  margin-bottom: 4px;
                  padding-top: 2px;
                }
                .xxan {
                  height: 15px;
                  padding-left: 2px;
                  padding-right: 2px;
                  width: 100%;
                  border-style: none;
                  display: block;
                }
                .xxsj {
                  width: 0;
                  height: 0;
                  margin-left: 1px;
                  vertical-align: middle;
                  border-top: 4px solid #000 !important;
                  border-right: 4px solid transparent;
                  border-left: 4px solid transparent;
                  margin-top: 2px;
                  padding-top: 2px;
                }
              }*/
              .binput{
                float: left;
                width: 92px;
                height: 30px;
                border:1px solid #ad2424;
                color: #aaa;
                padding-left: 5px;
                background: rgba(15,15,15,15);
              }
              .buyborder{
                border-color: #ad2424;
              }
              .buynum{
                border-color: #808080;
              }
              .sellborder{
                border-color: #3a7a26;
              }
            }
          }
        }
        .proesspas{
          height: 50px;
        }
        .success{
          /*position: absolute;
          left: 270px;
          bottom: -30px;
          z-index:1002;
          color:#46962e;
          font-size: 16px;
          width: 60px;
          height: 30px;
          line-height: 30px;
          text-align: center;*/
          position: absolute;
          left: 50%;
          bottom: -1px;
          margin-left: -90px;
          z-index: 1002;
          color: #6cd84c;
          font-size: 16px;
          width: 180px;
          height: 52px;
          line-height: 26px;
          text-align: center;
          background: #323234;
          border-radius: 6px;
          .priceandNum{
            label{
              display: inline-block;
              /*width: 80px;*/
              line-height: 26px;
              font-size: 14px;
              .labelname{
                padding-right: 4px;
                color: #666;
                font-size: 12px;
              }
            }
            .leftprice{
              font-weight: bold;
              /*text-align: left;*/
              padding-left: 4px;
              
            }
            .rightnum{
              font-weight: bold;
              /*text-align: right;*/
              padding-right: 4px;
            }
          }
        }
        .buycolor{
          /*color: #c81118;*/
          color: #ff3a3a;
        }
        .leftinfo{
          margin-left: 20px;
          margin-top: 5px;
          height: 100%;
          width: 190px;
          float: left;
          position: relative;
          .el-slider__runway{
            background: #3c3c42;
            margin: 4px 5px;
          }
          .surplus{
            color:#555;
            .criceactive{
              background: #c81118;
            }
          }
          
          .el-slider__bar{
            background: #c81118;
          }
        }
        .coamoney{
          padding: 10px 20px 0;
          .freeze{
            text-align: left;
          }
          .pright{
            text-align: right;
          }
          .nextmoney{
            padding-right: 2px;
            cursor: pointer;
          }
          .clickcolor{
            color: #00aaee;
          }
        }
        .coastright{
          text-align: right;
        }
        .rightinfo{
          margin-right: 20px;
          margin-top: 5px;
          width: 190px;
          height: 100%;
          float: right;
          position: relative;
          .surplus{
            color:#555;
            .criceactive{
              background: #24a948;
            }
          }
          .el-slider__runway{
            background: #3c3c42;
            margin: 4px 0px;
          }
          p{
            text-align: right;
          }
          .el-slider__bar{
            background: #24a948;
          }
          .el-slider__button-wrapper{ 
            transform: translateX(-40%); 
          }
        }
        .comcrice{
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3c3c42;
          position: absolute;
          top:20px;
        }
        .onec{
          left: 0px;
        }
        .lonec{
          left: -1px;
        }
        .twoc{
          left: 45px;
        }
        .threec{
          left: 95px;
        }
        .fourc{
          left: 142px;
        }
        .fivec{
          left: 187px;
        }
        /*.rightfc{
          left: 182px;
        }*/
        .bfb{
          width: 100%;
          height: 18px;
          line-height: 18px;
          text-align: right;
        }
        
        .el-right{
          margin-left: 0px;
        }
        .el-slider__button{
          background: rgb(38,39,42);
        }
        .sellcriceactive{
          background: #24a948;
        }
        .buycriceactive{
          background: #c81118;
        }
        .newtradebottom{
          background: rgba(15,15,15,15);
          padding:0 10px 0 20px;
          .amount{
            padding-right: 10px!important;
          }
          .right-alignment{
            padding-right: 10px!important;
          }
        }
      }
    }
  }
</style>