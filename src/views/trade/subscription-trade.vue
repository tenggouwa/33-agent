<template>
  <div class="bty-trade">
    <div class="bcontent">
      <div class="wrapper">
        <!-- <section class="adressdt">
          <p class="ptitle">钱包地址</p>
          <div class="adressinfo">
            <ul class="adresscontent">
              <li class="qcode">
                
              </li>
              <li class="secondli">
                <p>请将需要存入的{{symbol}}发送到此地址和备注码：</p>
                <input type="text" name="" :disabled="true" v-model="walletadress">
                <p class="tits">转币前，请与客服确认此转币地址，一旦转错，资产将不可追回。</p>
              </li>
              <li class="threeli" v-clipboard="walletadress" v-clipboard:success="copyadress">复制钱包地址</li>
            </ul>
          </div>
        </section> -->
        <!-- <privatetrade v-if="Crowdtypess==1" :symbolname="symbolname" @tradesuccess="jssuccess" :changeurl="changeurl"></privatetrade>
        <div  v-if="Crowdtypess==2">
          <div class="w-box m-l">
            <div class="subing">
              <img class="subload" src="../../assets/img/trade/subtradeing.png">
              <p class="subts">认购进行中，等待上线！</p>
            </div>
            <div class="content" >
              <p>
                <span class="spanl">可用({{symbol}}) :<b>{{myAssets.availablecoin}}</b></span>
              </p>
              <p>
                <span class="spanl">冻结({{symbol}}) :
                <b>{{myAssets.frozencoin}}</b>  
                </span>
              </p>
              <div class="row-control">
                <input id="sellPrice" class="validate-float-2" type="text" data-label="价格" data-validate="required" v-model="sellprice" @keyup="inputTradePrice('sell')" @blur="inputsellnum()">
                <p>（单位：元）</p>
              </div>
              <div class="row-control">
                <input class="validate-float-2 sellcolor" type="text" @keyup="inputTradeNum(sellnum,'SELL')" v-model="sellnum" @blur="inputsellnum()">
                <p>（交易量）</p>
              </div>
              <scrollCom :proessnum="sellScroll" bgclass="range_sell" :showcionType="symbol" :coastnum="sellmoney" :nextnum="nextcoin" @proessClick="canChange('SELL')" @change="sellscroll"></scrollCom>
              <div class="row-control fn-clear">
                <input id="sellbutton" class="btn" type="button" v-model="sellbutton">
              </div>
            </div>
            <ul id="navlist">
              <li class="list1"></li>
              <li class="list2"><a href="http://d.licai.cn/download.html" style="padding-top: 22px;padding-bottom: 22px;">区块链交易所</a></li>
              <li class="list1"></li>
            </ul>
            <div class="content" >
              <p>
                <span class="spanl">1{{symbol}}={{cnarte}}YCC</span>
                <span class="spanl flr">1份={{onePre}}YCC</span>
              </p>
              <p>
                <span class="spanl">可用({{symbol}}) :<b>{{myAssets.availablecoin}}</b></span>
              </p>
              <div class="row-control">
                <input id="sellPrice" class="validate-float-2" type="text" data-label="价格" data-validate="required" v-model="sellprice" disabled>
                <p>每份单价（{{symbol}}）</p>
              </div>
              <div class="row-control">
                <input class="validate-float-2 sellcolor" type="text" @keyup="inputTradeNum(sellnum,'SELL')" v-model="sellnum" @blur="inputsellnum()">
                <p>认购份数（份）</p>
              </div>
              <scrollCom :proessnum="sellScroll" bgclass="range_sell" :showcionType="symbol" :coastnum="sellmoney" :nextnum="nextcoin" @proessClick="canChange('SELL')" @change="sellscroll"></scrollCom>
              <div class="row-control fn-clear">
                <input id="sbubutton" class="btn" type="button" v-model="sbubutton" @click="tradeC('BUY',sellnum)">
              </div>
            </div>
          </div>
          <div class="w-box m-l">
            <table class="market trhead">
              <tr class="trhead">
                <th class="lone">类型</th>
                <th>价格</th>
                <th class="last">数量</th>
              </tr>
              <tr v-for="(item, index) in sellticket">
                <td class="one">卖({{ -(index-sellticket.length) }})</td>
                <td class="tradeprice" @click="sletprice('buy',index)">{{ item.price}}</td>
                <td class="last" @click="mairuNum(index)">{{ item.am}}</td>
              </tr>
            </table>
            <table class="market">
              <tr>
                <th class="lone">最新价</th>
                <th class="clolor" :class="{'secolor':newtradetype==1}">{{newprice}}</th>
                <th class="last clolor" :class="{'secolor':newtradetype==1}">{{newtradenum}}</th>
              </tr>
              <tr v-for="(item, index) in buyticket">
                <td class="cone">买({{index+1}})</td>
                <td class="tradeprice" @click="sletprice('sell',index)">{{ item.price}}</td>
                <td class="last" @click="maichuNum(index)">{{ item.am}}</td>
              </tr>
            </table>
          </div>
          <div class="w-box m-r">
            <table class="market newhistory trhead">
              <tr>
                <th class="lone">时间</th>
                <th>价格</th>
                <th class="last">数量</th>
              </tr>
              <tr v-for="item in newtrade">
                <td class="lone clolor" :class="{'secolor':item.type==1}">{{item.time}}</td>
                <td class="clolor" :class="{'secolor':item.type==1}">{{item.price}}</td>
                <td class="last clolor" :class="{'secolor':item.type==1}">{{item.am}}</td>
              </tr>
            </table>
          </div>
        </div> -->
        <section class="tradelist">
          <tradeCommon :statee="Crowdtypess" :symbolname="symbolname" :issuccess="istradesuccess"></tradeCommon>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import scrollCom from '../../components/scrollCom.vue'
import tradeCommon from './subtrade-common.vue'
import privatetrade from './privateTrade.vue'
import { ajax,getticketcom,getcookie,getfxee,formatcoinPrice,formatcoinNum,getmincoinNum,formatNumPrice,formatcoinprice,initINput} from '../../assets/js/common'
import {sellscrolles,buyscrolles,buycTradeCom,sellTradeCom,priceComDown,priceComUp,inputTradeNumCom} from '../../assets/js/proesscom'
export default {
  props:['symbolname','changeurl'],
  data() {
      return {
        buyscrollchange:true,
        sellscrollchange:true,//卖出滚动条改变
        rate:0,//手续费比例
        state:0,
        sellnum:0,//输入框的数据
        buynum:0,//输入框的数据
        sellScroll: 0,//显示百分号前面的数字
        buynumm: 0,//显示百分号前面的数字
        coastcoin:0,//使用的币
        sellmoney:0,
        nextcoin:0,//剩余的币
        buymoney:0,//花费的钱
        nextMoney:0,//剩余的钱
        symbol:sessionStorage.getItem('symbol'),
        ticket:{
          num:'8',
          currency:'btc',
        },
        getTickTime:0,
        sellbutton:'卖出 '+sessionStorage.getItem('symbol'),
        sbubutton:'认购YCC',
        newtrade:[],//最新交易数据
        sellticket:[],//卖出行情
        buyticket:[],//买入行情
        newprice:0,//最新成交价格
        newtradenum:0,//最新成交量
        newtradetype:0,
        buyprice:0,//买一价
        sellprice:0,//卖一价
        mountedBuyone:0,
        mountedSellone:0,
        myAssets:{
          availablecoin:0.00,
          frozencoin:0.00,
          availablemoney:0.00,
          frozenmoney:0.00,
        },
        tradeparam:{//交易参数
          ty:'BUY',
          // price:0,
          amount:0,
          currency:'YCC',
          currency2:'BTC',
        },
        icostatic:{
          symbol:'YCCBTC',
        },
        istradesuccess:false,//私募成功
        onePre:0,//一份的量
        cnarte:0,//比例
        coinrate:0,//不缩写比例
        Crowdtypess:1,//显示众筹页面，1为私募，2为公募
        walletadress:'',
        loading:false
      }
    },
  components:{
    tradeCommon,
    scrollCom,
    privatetrade,
  },
  watch: {
    changeurl(){
      // clearInterval(this.getTickTime);
      this.symbol=this.symbolname;
      // this.getusermoney();
      this.commomstart();
    },
    // symbolname(val){
    //   clearInterval(this.getTickTime);
    //   this.symbol=val;
    //   this.getusermoney();
    //   this.commomstart();
    // },
    mountedSellone:function(val){
      this.sellprice=val;
    },
    mountedBuyone:function(val){
      this.buyprice=val;
    },
  },
  mounted:function(){
    this.$nextTick(()=>{
      this.flashRoute();
      this.commomstart();
    });
  },
  methods:{
    jssuccess(){
      console.log(12345);
      this.istradesuccess=!this.istradesuccess;
    },
    commomstart(){
      // this.getcrowdadress();
      // if(this.Crowdtypess==2){
      //   this.sellbutton='卖出 '+this.symbol;
      //   this.buybutton='认购YCC';
      //   clearInterval(this.getTickTime);
      //   this.getticket(this.symbol,'YCC');
      //   this.getTickTime=setInterval(()=>{
      //     this.getticket(this.symbol,'YCC');
      //   },5000)
      //   this.icostatistic();
      //   this.sellScroll=0;
      //   this.buynumm=0;
      //   this.sellnum=initINput(this.symbol);
      //   this.buynum=initINput(this.symbol)
      //   this.state= this.state==0?1:0;
      // }
      
    },
    //获取钱包地址
    getcrowdadress(){
      var _this=this;
      var t=this.symbol;
      this.walletadress='';
      var lowcase=t.toLowerCase();
      ajax(this,this.extendApi.CoinAddress,{'t':t},function(response){
          if(response.code==200){
            if(response.data[lowcase+'_addr']=="获取地址失败"){
              _this.$notify({
                title: '提示',
                message: "获取地址失败",
                type: 'error',
                duration:'2000'
              });
            }else{
              _this.walletadress=response.data[lowcase+'_addr'];
              _this.qrcode();
            }
          }else{
            _this.$notify({
              title: '提示',
              message: response.data,
              type: 'error',
              duration:'2000'
            });
          }
        },'GET');
    },
    //获取代币信息
    icostatistic(){
      var _this=this;
      this.icostatic.symbol="YCC"+this.symbol;
      ajax(this,this.extendApi.icostatistic,this.icostatic,(response)=>{
        if(response.code==200){
          _this.onePre=response.data.onePre;
          _this.cnarte=response.data.cnarte;
          _this.coinrate=response.data.rate;
        }else{
          _this.$notify({
            title: '提示',
            message: response.error,
            type: 'error'
          })
        }
      },'GET');
    },
    qrcode() {
      var _this=this;
      $(".qcode").html('');
      $(".qcode").qrcode({
        render:'canvas',
        text: _this.walletadress,
        width:100,
        height:100,
        background : "#fff",//背景颜色  
        foreground : "#000" //前景颜色  
      });
      // $(".qcode2").html('');
    },
    //复制地址操作
    copyadress(){
      this.$notify({
        title: '提示',
        message: '复制成功',
        type: 'success',
        duration:'2000'
      });
    },
    canChange(type){
      if(type=='BUY'){
        this.buyscrollchange=true;
      }else{
        this.sellscrollchange=true;
      }
    },
    inputTradePrice(type){
      if(type=='BUY'){
        this.buyprice=formatcoinPrice(this.symbol,this.buyprice);
        if(this.buyprice){
          buycTradeCom(this);
        }
      }else{
        this.sellprice=formatcoinPrice(this.symbol,this.sellprice);
        if(this.sellprice){
          sellTradeCom(this);
        } 
      }
    },
    
    inputTradeNum(num,type){
      inputTradeNumCom(num,type,this);
    },

    //获取行情信息
    getticket(cointype,icoYCC){
      var _this=this;
      if(icoYCC){
        cointype=icoYCC+cointype;
      }else{
        cointype=cointype+'CNY';
      }
      this.ticket.currency=cointype;
      getticketcom(_this,_this.ticket,function(reponse){
        if(reponse.code==200 && reponse.data.mgs==""){
          _this.newtrade=reponse.data.trade;
          if(_this.newtrade.length!=0){
            _this.newprice=reponse.data.trade[0].price;
            _this.newtradenum=reponse.data.trade[0].am;
            _this.newtradetype=reponse.data.trade[0].type;
          }else{
            _this.newprice=0.00;
            _this.newtradenum=0.00;
          }
          if(reponse.data.marketdata.sell.length!=0){
            _this.mountedBuyone=reponse.data.marketdata.sell[0].price;
          }else{
            _this.mountedBuyone=0.00;
          }
          if(reponse.data.marketdata.buy.length!=0){
            _this.mountedSellone=reponse.data.marketdata.buy[0].price;
          }else{
            _this.mountedSellone=0.00;
          }
          reponse.data.marketdata.sell=reponse.data.marketdata.sell.reverse();
          _this.sellticket=reponse.data.marketdata.sell;
          
          _this.buyticket=reponse.data.marketdata.buy;
        }else{
          _this.$notify({
            title: '提示',
            message: response.error,
            type: 'error'
          })
        }
      });
    },
    sletprice(tradetype,index){//价格框
      if(tradetype=='buy'){
        this.buyprice=this.sellticket[index]['price'];
        this.sellprice=this.sellticket[index]['price'];
      }else{
        this.buyprice=this.buyticket[index]['price'];
        this.sellprice=this.buyticket[index]['price'];
      }
    },
    flashRoute: function() {
      var path = this.$route.path;
      this.getusermoney();
      this.commomstart();
      switch(path){
        case '/usercenter/subBTCtrade':
        break;
         case '/usercenter/subSCCtrade':
        break;
         case '/usercenter/subETHtrade':
        break;
         case '/usercenter/subETCtrade':
        break;
        case '/usercenter/subSCtrade':
        break;
        case '/usercenter/subZECtrade':
        break;
        case '/usercenter/subBTStrade':
        break;
        case '/usercenter/subLTCtrade':
        break;
      }
    },
    //获取用户资金
    getusermoney(){
      var _this=this;
      ajax(this,this.extendApi.getMoneyInfo,'',function(reponse){
        if(reponse.code==200){
          var data=reponse.data;
          var symbol=sessionStorage.getItem('symbol');
          _this.myAssets.availablemoney=data.list.CNY.active;
          if(_this.buynumm==0){
            _this.nextMoney=data.list.CNY.active;
          }
          _this.myAssets.frozenmoney=data.list.CNY.frozen;
          _this.myAssets.availablecoin=data.list[symbol].active;
          if(_this.sellScroll==0){
            _this.nextcoin=data.list[symbol].active;
          }
          _this.myAssets.frozencoin=data.list[symbol].frozen;
        }
      });
    },
    //卖币输入卖币数量
    inputsellnum(){
      this.sellscrollchange=true;
    },

    //买币输入买币数量
    inputbuynum(){
      this.buyscrollchange=true;
    },

    buyScroll(val){
      buyscrolles(val,this);
    },
    sellscroll(val){
      sellscrolles(val,this);
    },
    //交易函数
    tradeC(tradetype,num){
      // this.state= '123';
      var _this=this;
      var url=this.extendApi.icoplace;
      this.tradeparam.ty=tradetype;
      this.tradeparam.currency2=sessionStorage.getItem('symbol');
      this.tradeparam.amount=num;
      ajax(this,url,this.tradeparam,(response)=>{
        console.log(response);
      });
     
    },
  },
}
</script>
<style>
  .bty-trade{
    .el-pagination{
      text-align: center;
    }
    .bcontent{
      height: 100%;
      background: #f3f3f3;
      .wrapper{
        height: 100%;
        .adressdt{
          width: 100%;
          height: auto;
          overflow-y: hidden;
          background: #fff;
          padding:0 20px;
          margin-bottom: 10px;
          p{
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            color: #000;
          }
          .ptitle{
            border-bottom: 1px solid #ccc;
          }
          .adressinfo{
            height: 136px;
            width: 100%;
            padding-top: 18px;
            .adresscontent{
              height: 100px;
              width: 655px;
              margin:0 auto;
              li{
                float: left;
              }
              .qcode{
                width: 100px;
                height: 100px;
                canvas{
                  display: block!important;
                }
              }
              .secondli{
                width: 395px;
                margin-left:10px;
                input{
                  height: 36px;
                  width: 395px;
                  padding-left: 10px;
                }
                .tits{
                  color: red;
                  font-size: 12px;
                }
              }
              .threeli{
                width: 133px;
                height: 36px;
                line-height: 36px;
                border-radius: 5px;
                background: #e64544;
                color: #fff;
                text-align: center;
                margin-left: 10px;
                margin-top: 36px;
                cursor: pointer;
              }
            }
          }
        }
          .validate-float-2{
            font-size: 16px;
            font-weight: bold;
          }
          .w-box{
            width: 320px;
            float: left;
            height: 568px;
            background: #fff;
            margin-bottom: 7px;
            overflow: hidden;
            position: relative;
             .subing{
              position: absolute;
              height: 280px;
              width: 100%;
              background: rgba(255,255,255,0.8);
              z-index:20;
              .subload{
                position: absolute;
                left:50%;
                margin: 60px 0 25px -50px;
              }
              .subts{
                position: absolute;
                top:185px;
                width: 100%;
                text-align: center;
                font-size: 14px;
                color: #ff0000;
              }
            }
            .content{
              position: relative;
              width: 260px;
              height: 233px;
              margin: 20px auto 0;
              p{
                height: 25px;
                /*line-height: 25px;*/
                margin-top: 11px;
                font-size: 13px;
                color: #000;
                span{
                  display: inline-block;
                  float: left;
                  b{
                    font-size: 14px;
                    color: #666;
                    padding-left: 5px;
                  }
                }
                .flr{
                  float: right;
                }
                .spanr{
                  float: right;
                  padding-right: 8px;
                  font-size: 14px;
                  font-weight: 700;
                  color: #e64544;
                }
                .getcolor{
                  color: #24a948;
                }
              }
            }
            #navlist{
              width: 270px;
              height: 28px;
              margin: 8px auto 0 auto;
              display: flex;
              padding: 0;
              color: #666;
              padding-bottom: 13px;
              list-style-type: none;
              border-bottom: none !important;
              margin-bottom: 14px !important;
              li{
                float: left !important;
                height: 30px;
                border: 0px solid #6c6;
                width: 100% !important;
                line-height: 1 !important;
                font-size: 12px !important;
                margin-right: 0 !important;
                margin-left: 0 !important;
              }
              .list1 {
                border-bottom: 1px solid #e6e6e6;
                width: 100% !important;
                margin-bottom: -13px !important;
                margin-right: 0 !important;
                margin-left: 0 !important;
                /* margin: 0 0 -15px 0 !important; */
              }
              a{
                display: block;
                color: #666;
                text-decoration: none;
                padding: 6px 5px;
                width: 100%;
                text-align: center;
              }
            }
            .content{
              width: 260px;
              height: 233px;
              margin: 20px auto 0;
              p{
                height: 25px;
                /*line-height: 25px;*/
                margin-top: 11px;
                font-size: 13px;
                color: #000;
                span{
                  display: inline-block;
                  float: left;
                  b{
                    font-size: 14px;
                    color: #666;
                    padding-left: 5px;
                  }

                }
                .spanr{
                  float: right;
                  padding-right: 8px;
                  font-size: 14px;
                  font-weight: 700;
                  color: #e64544;
                }
                .getcolor{
                  color: #24a948;
                }
              }
              .proess{
                width: 260px;
                height: 55px;
                margin-top: 5px;
                .sellPercent{
                  color: #000000;
                  margin-left: 10px;
                  float: right;
                  position: absolute;
                }
                .range_sell{
                  position: relative;
                  .el-slider__bar{
                    background-color:#24a948; 
                  }
                  .criceactive{
                    background: #24a948;
                  }
                }
                .range_buy{
                  position: relative;
                  .el-slider__bar{
                    background-color:#c81118; 
                  }
                  .criceactive{
                    background: #c81118;
                  }
                }
                .row-control{
                  position: relative;
                  clear: both;
                }
                .el-slider__runway{
                  margin:22px 0 7px;
                }
                .el-slider__button{
                  background: #fff;
                  border:1px solid #e4e8f1;
                }
                .el-slider__stop{
                  width: 8px;
                  height: 8px;
                  top:-2px;
                }
                .comcrice{
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #e4e8f1;
                    position: absolute;
                  }
                  .onec{
                    top:19px;
                    left: -5px;
                  }
                  .twoc{
                    top:19px;
                    left: 60px;
                  }
                  .threec{
                    top:19px;
                    left: 125px;
                  }
                  .fourc{
                    top:19px;
                    left: 190px;
                  }
                  .fivec{
                    top:19px;
                    left: 255px;
                  }
                i{
                  font-size: 13px;
                  color: #000000;
                  float: left;
                  font-style: normal;
                }
                /*background: #000;*/
              }
              .row-control{
                margin-top: 11px;
                position: relative;
                input,input:focus{
                  border-radius: 5px;
                  height: 30px;
                  width: 260px;
                  text-align: right;
                  padding-right: 10px;
                  border: 1px solid #cccccc;
                }
                .btn,.btn:focus{
                  border-radius: 5px;
                  cursor: pointer;
                  text-align: center;
                  color: #ffffff;
                  height: 30px;
                  width: 260px;
                  font-size: 12px;
                  float: right;
                  border: 0;
                }
                #sellbutton {
                  background: #24a948 url(../../assets/img/sellbtn.png) no-repeat 75px 50%;
              }
              #buybutton {
                  background: #e64544 url(../../assets/img/buybtn.png) no-repeat 75px 50%;
              }
                #sellPrice {
                  color: #24a948;
                  font-size: 18px;
                  font-weight: bold;
              }
              .buycolor{
                color: #c81118!important;
              }
              .sellcolor{
                color: #24a948;
              }
              p{
                color: #666;
                position: absolute;
                top: -6px;
                left: 10px;
              }
            }
          }
          .market{
            border-spacing: 0;
            width: 270px;
            height: auto;
            overflow: hidden;
            margin: 0 auto;
            tr{
              padding: 0;
              margin:0;
              th,td{
                padding: 0;
                margin:0;
                width: 90px;
                text-align: center;
              }
              th{
                height: 28px;
                color: #666;
                font-size: 14px;
                font-weight: 500!important;
              }
              td{
                color: #000;
                height: 32px;
                font-size: 13px;
              }
              .lone{
                text-align: left;
              }
              .one{
                text-align: left;
                color: #009933;
              }
              .cone{
                text-align: left;
                color: #c81118;
              }
              .last{
                text-align: right;
                cursor: pointer;
              }
              .tradeprice{
                cursor: pointer;
              }
              .clolor{
                color: #c81118;
              }
              .secolor{
                color: #009933;
              }
            }
          }
          .trhead{
              margin-top: 5px!important;
            }
          .newhistory{
            tr{
              td{
                height: 24px;
              }
            }
          }
        }
        .m-l{
          margin-right: 7px;
        }
        .tradelist{
          clear: both;
          background: #fff;
        }
      }
    }
  }
  .el-loading-mask {
    background-color: rgba(255,255,255,.7);
  }
  .el-message-box__close {
    display: none;
  }
</style>