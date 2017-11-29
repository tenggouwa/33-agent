<template>
  <div class="traditionpage">
    <trade-header :moneyinfo="moneyinfo" @updatesymbol="updateThisSymbol" @headlogin="tradeLoginSuccess" :loginsuccess="loginsucc" :change="'0'" @fullChange="checkFullChange"></trade-header>
    <div class="tradecontent">
      <div id="tradeleft">
        <!-- <common-let></common-let> -->
      </div>
      <div id="traderight" v-loading="tradeloading" element-loading-text="数据加载中">
      <div class="ticketleft content" >
        <div class="tabletitle tableheader" style="clear:both;">
          <ul>
            <li class="tdth1 tdthleft">总价</li>
            <li class="tdth2 currencynumber">数量</li>
            <li class="tdth3">我买</li>
            <li class="tdth4">买入</li>
          </ul>
        </div>
        <div class="tabcom lt1">
          <table class="tradetable tradetablescr">
            <tbody>
              <tr v-for="(item,index) in buyticket">
                <td class="tdth1 tdthleft">{{parseFloat(item.am*item.price)|formatAllPrice}}</td>
                <td class="tdth2 currencynumber" @click="getnumber(item.price,index,1)">{{item.am |formatNum}}</td>
                <td class="tdth3 mynum">{{item.buywtd |formatNum}}</td>
                <td class="tdth4 buycolor" @click="getprice(item.price,'sell')">{{item.price |formatPrice}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="ticketright content">
        <div class=" tabletitle">
          <ul class="righttable">
            <li class="tdth4 rsell">卖出</li>
            <li class="tdth3">我卖</li>
            <li class="tdth2">数量</li>
            <li class="tdth1 fsell">总价</li>
          </ul>
        </div>
        <div class="tabcom1 lt2">
          <table class="tradetable">
            <tbody>
              <tr v-for="(item,index) in sellticket">
                <td class="tdth4 rsell sellcolor" @click="getprice(item.price,'buy')">{{item.price|formatPrice}}</td>
                <td class="tdth3 mynum">{{item.sellwtd |formatNum}}</td>
                <td class="tdth2" @click="getnumber(item.price,index,2)">{{item.am |formatNum}}</td>
                <td class="tdth1 fsell">{{parseFloat(item.am*item.price)|formatAllPrice}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        <div class="buysellgroup">
          <div class="groupcom buyleft">
            <ul style="margin-top:10px">
              <li class="inputcss">
                <span class="bfirst fbgc">价格  BTC</span>
                <!-- <div class="bcenter">
                  <button class="xsan fbgc" @click="priceup('buy')">
                    <div class="xssj"></div>
                  </button>
                 <button class="xxan fbgc" @click="pricedown('buy')">
                    <div class="xxsj"></div>
                  </button>
                </div> -->
                <input type="number" v-model="buyprice" @keyup="inputBuyPrice()" style="color:#ff3a3a">              
              </li>
              <li class="inputcss">
                <span class="bfirst fbgc">数量  {{tradecoin|filIndex}}</span>
                <!-- <div class="bcenter">
                  <button class="xsan fbgc" @click="numup('buy')">
                    <div class="xssj"></div>
                  </button>
                 <button class="xxan fbgc" @click="numdown('buy')">
                    <div class="xxsj"></div>
                  </button>
                </div> -->
                <input type="text" v-model="buynum" @keyup='inputTradeNum(buynum,"BUY")' >
              </li>
            </ul>
            <span class="maxnum" @click="buyallNum">最大可买{{MaxBuyNum}}{{symbol}}</span>
            <!-- <scrollCom :proessnum="buynumm" bgclass="range_buy" showcionType="BTC" :coastnum="buymoney" :nextnum="nextMoney" @proessClick="scrolltrue('BUY')" @change="buyscroll">
            </scrollCom> -->
            <div class="bbutton buybutton" @click="tradeC('BUY')">买入{{tradecoin|filIndex}}</div>
          </div>
          <div class="groupcom sellright">
            <div class="success" :class="{'buycolor':tradeparam.ty=='BUY'}" v-if="success">
              <p class="priceandNum">
                <label class="leftprice"><span class="labelname">价</span><span>{{Tprice}}</span></label>
                <label class="rightnum"><span class="labelname">量</span><span>{{Tnum}}</span></label>
              </p>
              <p class="tradeok">{{tradeparam.ty=='BUY' ? '买入成功' : '卖出成功'}}</p>
            </div>
            <ul style="margin-top:10px">
              <li class="inputcss">
                <span class="bfirst sellinput">价格  BTC</span>
                <!-- <div class="bcenter">
                  <button class="xsan" id="mai_up" @click="priceup('sell')">
                    <div class="xssj"></div>
                  </button>
                 <button class="xxan" id="mai_down" @click="pricedown('sell')">
                    <div class="xxsj"></div>
                  </button>
                </div> -->
                <input type="number" v-model="sellprice" @keyup="inputSellPrice()" style="color:#6cd84c">
              </li>
              <li class="inputcss">
                <span class="bfirst sellinput">数量  {{tradecoin|filIndex}}</span>
                <!-- <div class="bcenter">
                  <button class="xsan" id="mai_up" @click="numup('sell')">
                    <div class="xssj"></div>
                  </button>
                 <button class="xxan" id="mai_down" @click="numdown('sell')">
                    <div class="xxsj"></div>
                  </button>
                </div> -->
                <input type="text" v-model="sellnum" @keyup='inputTradeNum(sellnum,"SELL")' @blur="inputSellNum">
              </li>
            </ul>
            <span class="maxnum" @click="sellAllNum()">最大可卖出量{{myAssets.availablecoin}}{{symbol}}</span>
            <!-- <scrollCom :proessnum="sellScroll" bgclass="range_sell" :showcionType="tradecoin" :coastnum="sellmoney" :nextnum="nextcoin" @proessClick="scrolltrue('SELL')" @change="sellscroll">
            </scrollCom> -->
            
            <div class="bbutton sellbutton" @click="tradeC('SELL')">卖出{{tradecoin|filIndex}}</div>
            <!-- <div class="bbutton sellbutton" v-if="tradecoin=='NYCC'" @click="tradeC('SELL')">卖出YCC</div>
            <div class="bbutton sellbutton" v-if="tradecoin=='WTC'" @click="tradeC('SELL')">卖出WDT</div> -->
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
        <div class="traditionbut">
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
  import {ajax,getticketcom,getticket,cannel,getusermoney,getcookie,initCoinNum,formatcoinNum,getmincoinNum,formatcoinPrice,formatcoinprice,addformatcoinprice,formatcoinpriceHQ,initINput,sublogion,goregister,addtradeNum,numjs} from '../../assets/js/common'
  import {sellscrolles,buyscrolles,buycTradeCom,sellTradeCom,priceComDown,priceComUp,inputTradeNumCom} from '../../assets/js/proesscom'
  export default{
    props:["change"],
    data(){
      return{
        tradecoin:"BCC",
        buyscrollchange:true,
        sellscrollchange:true,
        MaxBuyNum:0,//最大可购买量
        tradeloading:true,//加载行情数据
        isclickMax:false,//是否买入最大量
        // MaxSellNum:0,//最大可卖量
        mountedBuyone:0,//表示行最新价
        mountedSellone:0,//表示行最新价
        changebuyprice:true,//判断是否改变最新价
        changesellprice:true,//判断是否改变最新价
        loginsucc:false,
        success:false,
        Tprice:0,//成功提示显示价格
        Tnum:0,//成功提示显示量
        reveal:false,
        rate:0,//手续费比例
        tradeComLogines:true,
        flashSymbal:false,//币种切换更改
        loginNum:1,//用于显示登录或者注册
        showss:false,//未登录下鼠标移入的控制
        shwomoney:false,//登录下鼠标移入的控制
        sellScroll:0,
        buynumm:0,
        buyticket:[],
        sellticket:[],
        newtrade:[],
        orderlist:[],
        repeattime:0,
        nextcoin:0,//剩余币
        nextMoney:0,//剩余金额
        symbol:sessionStorage.getItem('symbol'),
        ticket:{
          num:'50',
          symbol:'BCCBTC',
        },
        tradeparam:{//交易参数
          ty:'BUY',
          price:0,
          amount:0,
          currency:'BCC',
          currency2:'BTC',
        },
        moneyinfo:{
          BTC:{},
          BCC:{},
          ETH:{},
          ETC:{},
          ZEC:{},
          LTC:{},
        },
        buyprice:0,
        buynum:'0.0000',
        buymoney:'0.00',
        sellprice:0,
        sellnum:'0.0000',
        sellmoney:'0.00',
        myAssets:{
          availablecoin:'--',
          frozencoin:'--',
          availablemoney:'--',
          frozenmoney:'--',
        },
        amstat:{},
        //委托单参数
        orderparm:{
          symbol:'BCCBTC',
          order_type:'all',
          order_statu:'open',
          pagesize:15,
          page:1,
          format:'',
          amstring:1
        },
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
      //格式化数量小数点位数
      formatNum(e){
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
      formatPrice(e){
        return  parseFloat(e).toFixed(formatcoinprice(sessionStorage.getItem('symbol')))
      },
      formatAllPrice(e){
        return  parseFloat(e).toFixed(8);
      },
    },
    watch:{
      mountedSellone:function(val){
        if(this.buyprice==0){
          this.buyprice=val;
        }
      },
      mountedBuyone:function(val){
        if(this.sellprice==0){
          this.sellprice=val;
        }
      }
    },
    mounted:function(){
      var _this=this;
      // getfxee(this);
      if(getcookie('token')){
        this.getweituodan();
        getusermoney(this);
        this.reveal=true;
        this.username=getcookie('username');
      }
      this.buyticket=[];
      this.sellticket=[];
      this.tradeloading=true;
      this.symbol=sessionStorage.getItem('symbol');
      if(sessionStorage.getItem('symbol')==undefined)
      {
        sessionStorage.setItem('symbol','BTC');
        $.cookie('symbol','BCCBTC');
      }
      if(sessionStorage.getItem('period')==undefined||sessionStorage.getItem('period')=='null')
      {
        sessionStorage.setItem('period','H1')
         $.cookie('period','H1')
      }
      this.buynum=initCoinNum(this.symbol);
      this.sellnum=initCoinNum(this.symbol);
      // this.buynum=initINput(this.symbol);
      // this.sellnum=initINput(this.symbol);
      getticket(this,sessionStorage.getItem('symbol'));
      this.repeattime=setInterval(function(){
        getticket(_this,sessionStorage.getItem('symbol'));
        if(getcookie('token')){
          getusermoney(_this);
          _this.getweituodan();
        }
      }, 2000);
      this.checkFullChange();
      this.getmHt();
      setTimeout(function(){
        $(".lt1").mCustomScrollbar('destroy');
        $(".lt2").mCustomScrollbar('destroy');
        $(".tradecontent").mCustomScrollbar('destroy');
        $('#traderight').mCustomScrollbar({
          scrollButtons:{  
              enable:false //是否使用上下滚动按钮  
          }, 
          autoHideScrollbar: true,
        });
        $(".lt1").mCustomScrollbar({
          scrollButtons:{  
              enable:false //是否使用上下滚动按钮  
          }, 
          autoHideScrollbar: true,
        });
        $(".lt2").mCustomScrollbar({
          scrollButtons:{  
              enable:false //是否使用上下滚动按钮  
          }, 
          autoHideScrollbar: true,
        });
        $(".traderight").mCustomScrollbar({
          scrollButtons:{  
              enable:false //是否使用上下滚动按钮  
          }, 
          autoHideScrollbar: true,
        });
      }, 200);
      const that = this;
      window.onresize = function temp() {
        that.checkFullChange();
        that.getmHt();
        location.reload(true)
      };
    },
    destroyed:function(){
      clearInterval(this.repeattime);
    },
    mountedSellone:function(val){
      if(this.changesellprice){
        this.sellprice=val;
      }
    },
    mountedBuyone:function(val){
      if(this.changebuyprice){
        this.buyprice=val;
      }
    },
    methods:{
      //判断是否全屏
      checkFullChange(){
        if(sessionStorage.fullChange=="1"){
          //全屏模式
          this.getFullwh();
          $("#traderight").hide();
        }else{
          this.getmwh();
          $("#traderight").show();
        }
      },
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
      addclass(){
        sessionStorage.setItem('change','0');
        alert(1)
      },
      //全买
      buyallNum(){
        this.buynum=this.MaxBuyNum;
        this.buynumm=100;
        this.isclickMax=true;
      },
      //全卖
      sellAllNum(){
        this.sellnum=this.myAssets.availablecoin;
        this.sellScroll=100;
      },
      //交易函数
      tradeC(tradetype){
        // this.state= '123';
        var _this=this;
        var url=this.extendApi.place;
        this.tradeparam.ty=tradetype;
        if(tradetype=='BUY'){
          this.tradeparam.price=this.buyprice;
          this.tradeparam.amount=this.buynum;
          if(parseFloat(this.tradeparam.price)>parseFloat(this.newprice)*1.1){
            //买入价高出当前价格的10%给出提示
            this.$confirm('买入价高出当前价格的10%，您确定继续交易么？','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              if(this.myAssets.availablemoney-this.buyprice*this.buynum>=0){
                _this.canteade(url);
              }else{
                _this.$notify({
                  title: '失败',
                  message: '可用资金不足',
                  type: 'error'
                })
              }
            });
          }else if(this.myAssets.availablemoney-this.buyprice*this.buynum>=0){
            _this.canteade(url);
          }else{
            _this.$notify({
              title: '失败',
              message: '可用资金不足',
              type: 'error'
            })
          }
        }
        if(tradetype=='SELL'){
          this.tradeparam.price=this.sellprice;
          this.tradeparam.amount=this.sellnum;
          if(parseFloat(this.tradeparam.price)<parseFloat(this.newprice)*0.9){
          //卖出价低于当前价格的10%给出提示
            this.$confirm('卖出价低于当前价格的10%，您确定继续交易么？','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              if(this.myAssets.availablecoin-this.sellnum>=0){
                _this.canteade(url);
              }else{
                _this.$notify({
                  title: '失败',
                  message: '可用币不足',
                  type: 'error'
                })
              }
            })
          }else if(this.myAssets.availablecoin-this.sellnum>=0){
            _this.canteade(url);
          }else{
            _this.$notify({
              title: '失败',
              message: '可用币不足',
              type: 'error'
            })
          }
        }
      },
      scrolltrue(type){
        if(type=='BUY'){
          this.buyscrollchange=true;
        }else{
          this.sellscrollchange=true;
        }
      },
      
      inputTradeNum(num,type){
        this.isclickMax=false;
        inputTradeNumCom(num,type,this);
      },
      updateThisSymbol(){
        this.symbol=sessionStorage.getItem('symbol');
        this.buyprice=0;
        this.sellprice=0;
        this.buymoney='0.00';
        this.sellmoney='0.00';
        this.buyticket=[];
        this.sellticket=[];
        this.tradeloading=true;
        this.buynumm=0;
        this.sellScroll=0;
        this.buynum=initINput(this.symbol);
        this.sellnum=initINput(this.symbol);
        getticket(this,sessionStorage.getItem('symbol'));
        this.tradecoin=sessionStorage.getItem('symbol');
        this.flashSymbal=!this.flashSymbal;
        this.changebuyprice=true;//判断是否改变最新价
        this.changesellprice=true;//判断是否改变最新价
      },
      getFullwh(){
        var mwidth=document.body.clientWidth;
        var tradeleft=document.getElementById('tradeleft');
        tradeleft.style.width=mwidth+'px';
      },
      getmwh(){
        var mwidth=document.body.clientWidth;
        var tradeleft=document.getElementById('tradeleft');
        tradeleft.style.width=(mwidth-541)+'px';
      },
      getmHt(){
        var mheight=document.body.clientHeight;
        var tradeleft=document.getElementById('tradeleft');
        tradeleft.style.height=(mheight-110)+'px';
     
        let tabcom=document.getElementsByClassName('tabcom')[0];
        let tabcom1=document.getElementsByClassName('tabcom1')[0];
        tabcom.style.height=(mheight-432)+'px';
        tabcom1.style.height=(mheight-432)+'px';
      },
      //获取委托单
      getweituodan(){
        var _this=this;
        this.orderparm.order_statu='open';
        this.orderparm.order_type='all';
        this.orderparm.symbol=sessionStorage.getItem('symbol')+"BTC";
        var _this=this;
        ajax(this,this.extendApi.hisorder,this.orderparm,function(reponse){
          console.log(11111);
          console.log(reponse);
          if(reponse.code == 200){
            var reponse=reponse.data;
            // console.log("reponse.amstat:"+reponse.amstat)
            _this.amstat=reponse.amstat;
          }else if(reponse.code==-2){
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
              message: reponse.message,
              type: 'error'
            });
          }
        },'GET')
      },
      getprice(price,typetrade){
        this.buyprice=this.sellprice=price;
        this.changebuyprice=false;//判断是否改变最新价
        this.changesellprice=false;
        this.changMaxNum();
        if(typetrade=='buy'){
          this.sellScroll=0;
          this.sellnum=initCoinNum(this.symbol);
          // if(this.buyprice>0){
          //   buycTradeCom(this);
          // }
        }else{
          // this.buynumm=0;
          this.buynum=initCoinNum(this.symbol);
        }
      },
      //点击行情的数量的操作
      getnumber(price,sindex,tradetype){
        this.buyscrollchange=false;
        this.sellscrollchange=false;
        this.changebuyprice=false;//判断是否改变最新价
        this.changesellprice=false;//判断是否改变最新价
        var tradenum=0;
        this.buyprice=this.sellprice=price=formatcoinPrice(this.symbol,price);
        for(let i=0;i<=sindex;i++){
          if(tradetype==1){
            tradenum=Number(tradenum)+Number(this.buyticket[i].am);
          }else{
            tradenum=Number(tradenum)+Number(this.sellticket[i].am);
          }
        }
        if(tradetype==1){
          this.buymoney='0.00';
          this.buynum=initCoinNum(this.symbol);
          this.sellnum=parseFloat(tradenum).toFixed(formatcoinNum(this.symbol));
          if(this.sellnum-this.myAssets.availablecoin>0){
            this.sellnum=this.myAssets.availablecoin;
          }
          // if(this.myAssets.availablecoin!=0){
          //   this.sellScroll= Number(parseFloat((parseFloat(this.sellnum)/parseFloat(this.myAssets.availablecoin))*100).toFixed(2));
          // }
          this.sellmoney=Number(parseFloat(price*this.sellnum).toFixed(8));
        }else{
          this.sellmoney='0.00';
          this.sellnum=initCoinNum(this.symbol);
          this.buynum=parseFloat(tradenum).toFixed(formatcoinNum(this.symbol));
          // buycTradeCom(this);
        }
      },
      //点击买入价格向上调
      // priceup(tradetype){
      //   this.changebuyprice=false;//判断是否改变最新价
      //   this.changesellprice=false;//判断是否改变最新价
      //   if(tradetype=='buy'){
      //     this.changMaxNum();
      //   }
      //   priceComUp(tradetype,this);
      // },
      //点击买入价格向下调
      // pricedown(tradetype){
      //   this.changebuyprice=false;//判断是否改变最新价
      //   this.changesellprice=false;//判断是否改变最新价
      //   if(tradetype=='buy'){
      //     this.changMaxNum();
      //   }
      //   priceComDown(tradetype,this);
      // },
      // numup(tradetype){
      //   this.changebuyprice=false;//判断是否改变最新价
      //   this.changesellprice=false;//判断是否改变最新价
      //   if(tradetype=='buy'){
      //     this.buyscrollchange=false;
      //     this.buynum=parseFloat(parseFloat(this.buynum)+parseFloat(addtradeNum(this.symbol))).toFixed(formatcoinNum(this.symbol))
      //     if(this.buyprice-addformatcoinprice(this.symbol)>0){
      //       buycTradeCom(this);
      //     }
      //   }else{
      //     this.sellscrollchange=false;
      //     this.sellnum=(parseFloat(this.sellnum)+parseFloat(addtradeNum(this.symbol))).toFixed(formatcoinNum(this.symbol))
      //     if(this.sellnum-this.myAssets.availablecoin>0){
      //       this.sellnum=Number(this.myAssets.availablecoin);
      //     }
      //     sellTradeCom(this);
      //   }
      // },
      // numdown(tradetype){
      //   let _this=this;
      //   this.changebuyprice=false;//判断是否改变最新价
      //   this.changesellprice=false;//判断是否改变最新价
      //   if(tradetype=='buy'){
      //     this.buyscrollchange=false;
      //     if(parseFloat(this.buynum)-parseFloat(initCoinNum(this.symbol))>0){
      //        _this.buynum=(Number(this.buynum)-Number(addtradeNum(this.symbol))).toFixed(formatcoinNum(this.symbol)) 
      //     }
      //     else{
      //       _this.buynum=parseFloat(initCoinNum(this.symbol));
      //     }
      //     if(this.buyprice>0){
      //       buycTradeCom(this);
      //     }
      //   }else{
      //     this.sellscrollchange=false;
      //     if(parseFloat(this.sellnum)-parseFloat(initCoinNum(this.symbol))>0){
      //        _this.sellnum=(parseFloat(this.sellnum)-parseFloat(addtradeNum(this.symbol))).toFixed(formatcoinNum(this.symbol)) 
      //     }
      //     else{
      //        _this.sellnum=initCoinNum(this.symbol);
      //     }
      //     if(this.sellnum<=0){
      //       this.sellnum=0.00;
      //     }
      //     sellTradeCom(this);
      //   }
      // },
      // //拖动买入滑块
      // buyscroll(val){
      //   this.changebuyprice=false;//判断是否改变最新价
      //   this.changesellprice=false;//判断是否改变最新价
      //   buyscrolles(val,this);
      // },
      // //拖动卖出滑块
      // sellscroll(val){
      //   sellscrolles(val,this);
      // },
      inputBuyPrice(){
        this.changebuyprice=false;//判断是否改变最新价
        this.changesellprice=false;//判断是否改变最新价
        this.buyprice=formatcoinPrice(this.symbol,this.buyprice);
        this.changMaxNum();
        // if(this.buyprice){
        //   buycTradeCom(this);
        // }
      },
      //计算可买的最大值
      changMaxNum(){
        if(this.buyprice>0){
          this.MaxBuyNum=parseInt(this.myAssets.availablemoney/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
          if(this.isclickMax){
            this.buynum=this.MaxBuyNum;
          }
        }
        // if(this.buyprice>0 && this.rate>0){
        //   this.MaxBuyNum=parseInt(this.myAssets.availablemoney/(1+this.rate)/this.buyprice*numjs(this.symbol))/numjs(this.symbol);
        //   if(this.isclickMax){
        //     this.buynum=this.MaxBuyNum;
        //   }
        // }
      },
      inputBuyNum(){
        this.changebuyprice=false;//判断是否改变最新价
        this.changesellprice=false;//判断是否改变最新价
        this.buyscrollchange=true;
      },
      inputSellPrice(){
        this.changebuyprice=false;//判断是否改变最新价
        this.changesellprice=false;//判断是否改变最新价
        this.sellprice=formatcoinPrice(this.symbol,this.sellprice);
        // if(this.sellprice){
        //   sellTradeCom(this);
        // }
      },
      inputSellNum(){
        this.changebuyprice=false;//判断是否改变最新价
        this.changesellprice=false;//判断是否改变最新价
        this.sellscrollchange=true;
      },
      canteade(url){
        var _this=this;
        this.tradeparam.currency=sessionStorage.symbol;
        this.Tprice=this.tradeparam.price;
        this.Tnum=this.tradeparam.amount;
        ajax(this,url,this.tradeparam,function(response){
          if(response.code==200){
             _this.success=true;
            setTimeout(function(){
              _this.success=false;
            }, 2000);

            if(_this.tradeparam.ty=="BUY"){
              _this.buynum=initCoinNum(_this.symbol);
              _this.buynumm=0;
              _this.buymoney='0.00';
            }else{
              _this.sellnum=initCoinNum(_this.symbol);
              _this.sellmoney='0.00';
              _this.sellScroll=0;
            }
            getusermoney(_this);
          }else if(response.code==-2){
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
              duration:'2000',
            })
          }
        })
      }
    }
  }
</script>
<style>
  .traditionpage{
    width: 100%;
    height: 100%;
    background: #000;
    overflow: hidden;
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
      }
      #traderight{
        margin-top: 2px;
        width: 540px;
        float: right;
        cursor: default;
        overflow-x: hidden;
        color: #999;
        .ticketleft{
          float: left;
          width: 273px;
          overflow: hidden;
          overflow-x: hidden;
          overflow-y: auto;
          background: rgba(15,15,15,15);
        }
        .ticketright{
          float: left;
          width: 267px;
          overflow: hidden;
          overflow-x: hidden;
          overflow-y: auto;
          background: rgba(15,15,15,15);
        }
        .tabletitle{
          /*float: left;*/
         ul{
            width: 256px;
            height: 20px;
            /*margin-left: 10px;*/
            background: rgb(15, 15, 15);
            li{
              list-style: none;
              float: left;
              text-align: right;
              height: 20px;
              line-height: 20px;
              color: #555;
            }
          }
          /*.righttable{
            margin-left: 4px;
             
          }*/
          .tdth1{
            width: 80px;
            font-size: 12px;
            color: #555;
          }
           .tdthleft{
            text-align: left;
          }
          .currencynumber{
          
            text-align: left;
          }
          .fsell{
             width: 80px;
             /*padding-right: 5px;*/
          }
          .tdth2{
            width: 70px;
            padding-right: 5px;
          }
          .tdth3{
            /*text-align: left;*/
            text-align: right;
            width: 46px;
          }
          .tdth4{
            width: 60px;
            padding-right: 3px;
          }
          .rsell{
            text-align: left;
            padding-right: 0;
          }
        }
        .tableheader{
          ul{
            margin-left: 10px;
          }
        }
        .amount{
          padding-right: 5px;
        }
        .tabcom{
          float: left;
          width: 255px;
          background: rgba(15,15,15,15);
          margin-left: 10px;
          overflow: hidden!important;
          margin-bottom: 2px;
          float: left;
          .tradetablescr{
            overflow-x: hidden;
            overflow-y: auto;
          }
          .tradetable{
            width: 100%;
            th,td{
              text-align: right;
              height: 20px;
              line-height: 20px;
            }
            .tdth1{
              width: 80px;
              box-sizing: border-box;
            }
            .fsell{
               width: 80px;
            }
            .tdth2{
              width: 70px;
              padding-right: 5px;
              cursor: default;
            }
            .tdth3{
              width: 46px;
              cursor: default;
            }
            .tdth4{
              width: 60px;
              padding-right: 2px;
              cursor: pointer;
            }
            .tdthleft{
            text-align: left;
          }
          .currencynumber{
            text-align: left;
          }
            .rsell{
              text-align: left;
              padding-left: 5px;
              padding-right: 0;
            }
            .mynum{
               text-align: left;
              color: #ff6600;
            }
            .buycolor{
              color: #ff3a3a;
            }
            .sellcolor{
              color: #6cd84c;
            }
          }
        }
        .tabcom1{
          float: left;
          width: 262px;
          background: rgba(15,15,15,15);
          overflow: hidden!important;
          margin-bottom: 2px;
          float: left;
          margin-right: 5px;
          .tradetablescr{
            overflow-x: hidden;
            overflow-y: auto;
          }
          .tradetable{
            width: 100%;
            th,td{
              text-align: right;
              height: 20px;
              line-height: 20px;
            }
            .tdth1{
              width: 82px;
            }
            .fsell{
               width: 80px;
               padding-right: 5px;
            }
            .tdth2{
              width: 70px;
              padding-right: 5px;
              cursor: default;
            }
            .tdth3{
              width: 62px;
              cursor: default;
            }
            .tdth4{
              width: 62px;
              cursor: pointer;
            }
            .rsell{
              text-align: left;
              /*padding-left: 5px;*/
              padding-right: 0;
              width: 60px;
            }
            .mynum{
              width: 46px;
              color: #ff6600;
            }
            .buycolor{
              color: #ad2424;
            }
            .sellcolor{
              color: #6cd84c;
            }
          }
        }
        .lt2{
          float: right;
          /*margin-left: 4px;*/
          overflow: hidden;
        }
        .buysellgroup{
          clear: both;
          width: 100%;
          height: 135px;
          position: relative;
          background: rgba(15,15,15,15);
          .shade{
            width: 100%;
            height: 100%;
            background:rgba(0,0,0,0.7);
            position: absolute;
            top:0;
            left:0;
            z-index: 1500;
            ul{
              width: 40%;
              margin: auto;
              position: relative;
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
                  padding: 0 5px;
                }
              }
              .logins{
                position: absolute;
                top:-190px;
                left:76px;
                color:#ff6600;
                font-size: 14px;
                .logincom{
                  position: absolute!important;
                  z-index: 2000;
                  left: -100px;
                  width: 180px;
                  background-color: #232325;
                  color: #ff6600;
                  text-align: center;
                  padding: 0px 20px 20px 20px;
                }
              }
            }
          }
          .groupcom{
            width: 256px;
            /*height: 180px;*/
            height: 135px;
            /*padding: 2px 5px 10px 10px;*/
            float: left;
            position: relative;
            .maxnum{
              text-align: right;
              display: inline-block;
              width: 100%;
              color: #00aaee;
              cursor: pointer;
            }
            /*margin-left: 10px;*/
            .comcrice{
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #3c3c42;
              position: absolute;
              top:81px;
            }
            .bar{
              position: relative;
              p:nth-child(1){
                width:50%;
              }
              p:nth-child(2){
                width:50%;
                position: absolute;
                top: 0;
                right: 3px;
              }
            }
            .onec{
              left: 0px;
              top:107px;
            }
            .lonec{
              left: 0px;
              top:107px;
            }
            .twoc{
              left: 64px;
              top:107px;
            }
            .threec{
              left: 125px;
              top:107px;
            }
            .fourc{
              left: 185px;
              top:107px;
            }
            .fivec{
              left: 245px;
              top:107px;
            }
            .rightfc{
              left: 248px;
              top:107px;
            }
            .range_buy{
              .criceactive{
                background: #c81118;
              }
            }
            .range_sell{
              .criceactive{
                background: #24a948;
              }
            }
            .inputcss{
              height: 24px;
              margin-bottom: 5px;
              input{
                float: left;
                height: 24px;
                padding: 4px 0;
                border-radius: 0;
                border:1px solid #3c3c42;
                background-color: transparent;
                padding-right: 4px;
                width: 145px;
                color: #aaa;
                text-align: right;
              }
              /*.bcenter{
                float: left;
                width: 9px;
                height: 24px;
                .xsan {
                  height: 12px;
                  padding-left: 2px;
                  padding-right: 2px;
                  width: 100%;
                  border-style: none;
                  display: block;
                  background: #3c3c42;
                }
                .xssj {
                  width: 0;
                  height: 0;
                  margin-left: -1px;
                  vertical-align: middle;
                  border-bottom: 6px solid #000 !important;
                  border-right: 4px solid transparent;
                  border-left: 4px solid transparent;
                  padding-top: 2px;
                }
                .xxan {
                  height: 12px;
                  padding-left: 2px;
                  padding-right: 2px;
                  width: 100%;
                  border-style: none;
                  display: block;
                  background: #3c3c42;
                }
                .xxsj {
                  width: 0;
                  height: 0;
                  margin-left: -1px;
                  vertical-align: middle;
                  border-top: 6px solid #000!important;
                  border-right: 4px solid transparent;
                  border-left: 4px solid transparent;
                  margin-top: 2px;
                  padding-top: 2px;
                }
              }*/
              .bfirst{
                border-radius: 0;
                color: #aaa;
                font-size: 9pt;
                float: right;
                height: 24px;
                line-height: 24px;
                border-color: transparent;
                background-color: #3c3c42;
                font-family: "微软雅黑";
                width: 110px;
                float: left;
                margin-right: 1px;
                text-align: center;
              }
              .sellinput{
                float: left!important;
                margin-right: 1px;
              }
              .tradeMoney{
                width: 92px;
              }
            }
            .bfb{
              width: 250px;
              height: 18px;
              line-height: 18px;
              text-align: right;
              color: #555;
            }
            .el-slider__runway{
              background: #3c3c42;
              margin: 5px 5px;
              width:96%;
            }
            .el-slider__button{
              background: rgb(38,39,42);
            }
            .colormoney{
              color: #999;
              padding-left: 0px;
            }
            .colormoneyy{
              color:#999;
            }
            .colormon{
              color: #999;
            }
            .bbutton{
              width: 256px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              color: #fff;
              font-size: 14px;
              margin: 15px auto;
              cursor: pointer;
            }
            .buybutton{
              background: #ae2424;
            }
            .buybutton:hover{
              background: #ff3a3a;
            }
            .sellbutton{
              background: #3a7a26;
            }
            .sellbutton:hover{
              background: #6cd84c;
            }
          }
          .buyleft{
            background: rgba(15,15,15,15);
            margin-left: 10px;
            .el-slider__bar{
              background: #c81118;
            }
            .inputcss{
              input{
                text-align: right;
              }
            }
          }
          .sellright{
            float: right;
            margin-right: 10px;
            background: rgba(15,15,15,15);
            position: relative;
            .success{
              /*position: absolute;
              bottom:-30px;
              left: 0px;
              font-size: 16px;
              width: 60px;
              height: 30px;
              line-height: 30px;
              color: #46962e; 
              text-align: center;*/
              position: absolute;
              bottom: 57px;
              left: -90px;
              font-size: 16px;
              width: 180px;
              height: 52px;
              line-height: 26px;
              color: #46962e;
              text-align: center;
              background: #323234;
              z-index: 2001;
              border-radius: 4px;
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
                  /*text-align: left;*/
                  padding-left: 4px;
                  font-weight: bold;
                  
                }
                .rightnum{
                  /*text-align: right;*/
                  padding-right: 4px;
                  font-weight: bold;
                }
              }
            }
            .buycolor{
              /*color: #c81118;*/
              color: #ff3a3a;
            }
            .el-slider__bar{
              background: #46962e;
            }
            .inputcss{
              input{
                text-align: left;
                padding-left: 5px;
              }
            }
          }
        }
        .traditionbut{
          background: rgba(15,15,15,15);
          padding: 0 7px 0 10px;
        }
      }
    }
  }
  .mCustomScrollBox>.mCSB_scrollTools{
    w:3px;
  }
</style>