<template>
  <div>
    <index-header></index-header>
    <div class="home-content">
      <div class="banner-block">
        <el-carousel indicator-position="none" height="900px" arrow="never" :interval="5000">
          <el-carousel-item>
            <div class="banner1">
              <div class="widcen">
                <button @click="jumpapply">申请经纪商</button>
              </div>
            </div>  
          </el-carousel-item>
          <el-carousel-item>
            <div class="banner2">
              <div class="widcen">
                <button @click="jumpapply">申请经纪商</button>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div class="banner3">
              <div class="widcen">
                <button @click="jumpapply">申请经纪商</button>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="button-line2" v-show="isStart">
          <button class="btn1" @click="jumpapply">申请经纪商</button>
          <!-- <button class="btn2">在线咨询</button> -->
          <span class="phoneNum">热线电话：+86 173 5471 8363</span>
        </div>
        <!-- <div class="button-line-box">
          <div class="about-line">
            <h3>ABOUT</h3>
            <h4>Mainstream reliable trading currencies</h4>
            <p class="word">交易币种</p>
            <hr>
            <p class="word-tip">精选主流币种</p>
            <p class="word-tip">多种报价模式</p>
          </div>
          <div class="button-line" v-show="isStart">
                <button class="btn1">申请代理</button>
                <button class="btn2">在线咨询</button>
                <span class="phoneNum">热线电话：4001-566-899</span>
              </div>    
        </div> -->
        <loginPart></loginPart>
      </div>
      <div class="fixLine" v-show="isNotStart">
        <button class="btn1" @click="jumpapply">申请经纪商</button>
        <!-- <button class="btn2">在线咨询</button> -->
        <span class="phoneNum">热线电话：+86 173 5471 8363</span>
      </div>
      <div class="coin-block">
        <div class="tras-block">
          <ul v-for="(item,index) in coinBlock">
            <li 
              :class="{lastBlock:i.normal,noCoin:i.nocoin}" 
              v-for="(i,num) in item" 
              ><!-- @mouseenter="showBtn2('coinBlock',1,index,num,i)" 
              @mouseleave="showBtn2('coinBlock',0,index,num,i)"
              @click="gohelp(i.coinname,i.normal)" -->
              <div class="part" v-if="i.state!==1">
                <!-- <p class="name">{{i.name}}</p> -->
                <div class="icon iconfont" :class="i.coin" v-if="!i.nocoin"></div>
                <p class="coin-name">{{i.coinname}}</p>
              </div>
              <!-- <div class="part2" v-if="i.  ===1&&!i.normal">
                <div class="icon iconfont" :class="i.coin" v-if="!i.nocoin"></div>
                <p class="price" v-if="!i.nocoin">
                  <span>{{i.coinname}}/BTC：</span>
                  <em v-if='marketData[i.coinname+"BTC"].last'>{{marketData[i.coinname+"BTC"].last}}</em>
                </p>
                <p v-if="!i.nocoin" class="range">{{marketData[i.coinname+"BTC"].range|filterCoin}}</p>
                <p v-if="i.nocoin" class="expect-line">敬请期待</p>
              </div> -->
            </li>
          </ul>
        </div>
        <!-- 新币种图标 -->
        <div class="coinTitle">
          <h1>主流交易币种</h1>
          <h2>Mainstream Trading Crypto-currency</h2>
          <div class="blueLine"></div>
        </div>
        <div class="coinBox">
          <div class="btn pre iconfont icon-fanhui"></div>
          <ul v-for="(item,index) in newCoinBox">
            <li v-for="(i,num) in item" :class="{'bottomLi':num>=5}">
              <div class="smallBox">
                <div class="icon iconfont" :class="i.coinclass"></div>
                <p v-if="i.state == 0">{{i.coinname}}( {{i.name}} )</p>
                <p v-if="i.state == 1">{{i.coinname}}</p>
              </div>
            </li>
          </ul>
          <div class="btn next iconfont icon-fanhui-copy-copy"></div>
        </div>
      </div>
      <addUs></addUs>
      <plat></plat>
      <server></server>
      <contactUs></contactUs>
    </div> 
  </div>
</template>

<script>
import indexHeader from "../../components/header.vue"
import loginPart from "./login.vue"
import addUs from "./addUs.vue"
import plat from "./plat.vue"
import server from "./server-block.vue"
import contactUs from "../../components/contantWe.vue"
import {ajax} from "../../assets/js/common.js"

export default{
  data(){
    return{
      //1193139906@qq.com
      showBtnState:0,
      coinchange:0,
      marketData:{
        BCCBTC:{},
        LTCBTC:{},
        ZECBTC:{},
        ETHBTC:{},
        ETCBTC:{},
        BTCBTC:{},
        SCBTC:{},
        BTSBTC:{},
      },
      coinBlock:[
        [
          {
            name:"比特币",
            coinname:"BTC",
            coin:"icon-BTC3",
            state:0,
          },
          {
            name:"比特元",
            coinname:"BTY",
            coin:"icon-BTY3",
            state:0,
          },   
          {
            name:"以太坊经典",
            coinname:"ETC",
            coin:"icon-ETC3",
            state:0,
          },
        ],
        [
          {
            name:"USDT",
            coinname:"USDT",
            coin:"icon-meiyuan",
            state:0,
          },
          {
            name:"以太坊",
            coinname:"ETH",
            coin:"icon-ETH3",
            state:0,
          },
          {
            name:"莱特币",
            coinname:"LTC",
            coin:"icon-LTC3",
            state:0,
          },
        ],
        [
          {
            name:"比特现金",
            coinname:"BCC",
            coin:"icon-BCC3",
            state:0,
          },  
          {
            name:"零币",
            coinname:"ZEC",
            coin:"icon-ZEC1",
            state:0,
          },  
          {
            name:"主流",
            coinname:"主流币种",
            coin:"icon-jiaoyi",
            state:0,
            normal:true,
          },
        ],
      ],
      newCoinBox:[
        [
          // {
          //   name:"USDT",
          //   coinname:"USDT",
          //   coinclass:"icon-meiyuan",
          //   state:0,
          // },
          {
            name:"比特币",
            coinname:"BTC",
            coinclass:"icon-BTC3",
            state:0,
          },
          {
            name:"比特元",
            coinname:"BTY",
            coinclass:"icon-BTY3",
            state:0,
          },
          {
            name:"比特现金",
            coinname:"BCC",
            coinclass:"icon-BCC3",
            state:0,
          },
          {
            name:"以太坊",
            coinname:"ETH",
            coinclass:"icon-ETH1",
            state:0,
          },
          {
            name:"以太坊经典",
            coinname:"ETC",
            coinclass:"icon-ETC3",
            state:0,
          },
          {
            name:"零币",
            coinname:"ZEC",
            coinclass:"icon-ZEC1",
            state:0,
          },
          {
            name:"莱特币",
            coinname:"LTC",
            coinclass:"icon-ltc",
            state:0,
          },
          {
            name:"比特股",
            coinname:"BTS",
            coinclass:"icon-BTS3",
            state:0,
          },
          {
            name:"云储币",
            coinname:"SC",
            coinclass:"icon-SC3",
            state:0,
          },
          {
            name:"德信币",
            coinname:"DCR",
            coinclass:"icon-DCR3",
            state:0,
          },
        ],
      ],
      sectionState:1,
      requtime:'',//轮询计时器
      isStart:true,
      isNotStart:false,
    }
  },
  watch:{
    sectionState(val){
      // console.log(val);
    }
  },
  components:{
    indexHeader,
    loginPart,
    contactUs,
    addUs,
    plat,
    server
  },
  filters:{
    filterCoin(val){
      if(val){
        let state=val.toString().indexOf("-");
        if(state===-1){
          val="+"+val;
        }
        return val;
      }    
    },
  },
  destroyed:function(){
    clearInterval(this.requtime);
  },
  mounted(){
    this.$nextTick(()=>{
      this.windowScroll();
      document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=0;
      //this.getHomeMarket();
      /*this.requtime=setInterval(()=>{
        this.getHomeMarket();
      },5000);*/
    })
  },
  methods:{
    jumpapply(){
      this.$router.push({path:"/apply"});
    },
    gohelp(coin,state){
      if(state){
        this.$router.push({path:"/help/coinintroduce"});
      }
      else{
        this.$router.push({path:"/help/coinintroduce",query:{"type":coin}});
      }
      
    },
    getHomeMarket(){
      let param={
        sort:"plat",
      };
      ajax(this,this.extendApi.getcoindata,param,(data)=>{
        if(data.code==200){         
          for(let i=0;i<data.data.fxee.length;i++){
            this.marketData[data.data.fxee[i].symbol]=data.data.fxee[i];
            // for(let j=0;j<this.coinBlock.length;j++){
            //   for(let k=0;k<this.coinBlock[j].length;k++){
            //     if(this.coinBlock[j][k].coinname+"BTC"==data.data.fxee[i].symbol){
            //       this.coinBlock[j][k]=object.assign(this.coinBlock[j][k],data.data.fxee[i]);
            //     }
            //   }              
            // }           
          }
          // console.log(this.coinBlock);
        }
      }, "GET");
    },
    windowScroll(){
      let that=this;
      window.onscroll=()=>{
        let num=parseInt(document.documentElement.scrollTop);
        if(num>=800){
          this.isStart = false;
          this.isNotStart = true;
        }else{
          this.isStart = true;
          this.isNotStart = false;
        }
        if(num<=800){
          this.sectionState=1;
        }
        if(num>800&&num<=1600){
          this.sectionState=2;
        }
        if(num>1600&&num<=2400){
          this.sectionState=3;
        }
        if(num>2400&&num<=3200){
          this.sectionState=4;
        }
        if(num>3200){
          this.sectionState=5;
        }
      };
    },
    
    /*showBtn2(key,val,index,num,item){
      //最后一个方块不做hover效果
      if(!item.normal){
        this[key][index][num].state=val;
      }
      // if(index!==2||num!==2){
      //   this[key][index][num].state=val;
      // }     
    },*/
    // showBtn(key,val){
    //   this[key]=val;
    // },
  }
}
</script>
<style>
.home-content{
  /*padding-top: 75px;*/
  .fixLine{
    position: fixed;
    bottom: -1px;
    height: 80px;
    background-color: rgba(0,0,0,0.6);
    z-index: 11;
    width: 100%;
    margin: 0 auto;
    /* transition: all 0.5s ease; */
    button{
      width: 140px;
      height: 40px;
      border-radius: 20px;
      border: 0;
      font-size: 18px;
      font-weight: bold;
      margin-right: 60px;
      cursor: pointer;
    }
    .btn1{
      background-color: #1a6fa6;
      color: #fff;
    }
    .btn2{
      color: #1a6fa6;
      background-color: #fff;
    }
    .phoneNum{
      line-height: 80px;
      color: #fff;
      font-size: 25px;
      font-weight: bold;
    }
  }
  .statement-box{
    .el-dialog{
      width: 1100px; 
    }
    .el-dialog__header{
      padding-top: 30px;
    }    
    .el-dialog__title{
      color: #165e8d;
      font-size: 24px;
    }
    .el-dialog__footer{
      text-align: center;
      .el-button{
        font-size: 18px;
      }
    }
    .el-dialog__body{
      padding-bottom:5px;
    }
    .el-button{
      width: 140px;
      height: 40px;
      border-radius: 20px;
      background-color: #1a6fa6;
      border:0;
    }    
  }
  .section-box{
    position: fixed;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 50;
    color: #666;
    height: 570px;   
    /*line-height: 114px;*/
    background: url("../../assets/img/home/secBg.png") no-repeat 0 top;
    padding-left: 1px;
    li{
      /*padding-left: 16px;
      margin: 35px 0;*/
      height: 114px;
      padding:35px 0;
      .item{
        line-height: 44px;
        padding-left: 16px;
      }
    }
    li.active{
      .item{
        color: #1a6fa6;
        border-left:3px solid #1a6fa6; 
      }
      
    }
  }
  .el-carousel__item{
    img{
      position: relative;
      left:50%;
      transform: translateX(-50%);
    }
  }
  .banner-block{
    position: relative;
    .widcen{
      text-align: left;
      width: 1200px;
      margin: 0 auto;
      button{
        margin: 425px 0 0 8px;
        width: 150px;
        height: 40px;
        font-size: 16px;
        color: #1f52c9;
        background: #fede00;
        border: none;
        cursor: pointer;
      }
    }
    .banner1{
      background:url("../../assets/img/banner1/banner.png") no-repeat center center;
      background-size: auto 100%;
      height: 900px
    }
    .banner2{
      background:url("../../assets/img/banner1/banner1.png") no-repeat center center;
      background-size: auto 100%;
      height: 900px
    }
    .banner3{
      background:url("../../assets/img/banner1/banner2.png") no-repeat center center;
      background-size: auto 100%;
      height: 900px
    }
    .el-carousel__indicators--outside{
      margin-top: -20px;
    }
  }
  .server-block{
    height: 600px;
    width: 1200px;
    margin: 0 auto;
    padding-top: 68px;
    .serverList{
      margin-top: 80px;
      display: flex;
      justify-content: center;
      li{
        border:1px solid #dcdcdc;
        width: 176px;
        height: 176px;
        transform: rotate(45deg);
        margin-right: 72px;
        background-color: #fff;
        .item{
          width: 100%;
          height: 100%;
          line-height: 176px;
          transform: rotate(-45deg);
          .iconfont{
            font-size: 60px;
            color: #2580bb;
          }
        }
        .item2{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(-45deg);
          color: #fff;
          font-size: 15px;
        }
        &:hover{
          background-color: #1a6fa6;
        }
      }
    }
  }
  .coin-block{
    height: 900px; 
    background: url("../../assets/img/home/coinBg.png") no-repeat center bottom;
    position: relative;
    .tras-block{
      position: absolute;
      top: 360px;
      left:50%;
      transform: rotate(45deg) translateX(-50%);
      display: none;
      /*border:1px solid #dcdcdc;*/
      ul{
        display: flex;
        margin-bottom: 24px;
        li{
          width: 185px;
          height: 185px;
          margin-right: 24px;
          border:1px solid #dcdcdc;
          position: relative;
          cursor: pointer; 
          transition: all 0.3s ease 0s;
          -moz-transition: all 0.3s ease 0s;
          -webkit-transition: all 0.3s ease 0s;
          -o-transition: all 0.3s ease 0s;
          .part{
            position: absolute;
            left:50%;
            margin-left: -40%;
            top: 50%;
            margin-top: -40%;
            width: 80%;
            height: 80%;
            transform: rotate(-45deg);
            line-height: 1;
            /*background-color: #ff0000;*/
          }
          .part2{
            position: absolute;
            width: 100%;
            height: 100%;
            /*top: 10;*/
            /*margin-top: 10px;
            margin-left:10px;*/
            transform: rotate(-45deg);
            color: #fff;
          }
          .expect-line{
            position: absolute;
            left: 50%;
            top:50%;
            width: 100%;
            transform: translateX(-50%) translateY(-50%);
            font-size: 24px;
          }
          .icon{
            font-size: 62px;
            margin-top: 10px;
            margin-bottom: 10px;
            color: #1a6fa6;
          }
          .price{
            font-size: 16px;
            margin-bottom: 20px;
            em{
              color:#ffc600;
              font-size: 22px;
            }
          }
          .range{
            font-size: 25px;
          }
          .name{
            font-size: 17px;
            color: #666;
            padding-top: 20px;
          }
          .coin-name{
            font-size: 30px;
            color: #999;
            margin-top: 20px;
          }
          /* &:hover{
            background-color:rgba(26,111,166,0.95);
            border-color: #1a6fa6;
          } */
          &.noCoin{
            background-image: url("../../assets/img/home/no-coin.png");
            background-repeat: no-repeat;
            background-position: center;
          }
          /* &.noCoin:hover{
            background-image: none;
          } */
          &.lastBlock{
            background-color: #fff;
            .name{
              font-size: 30px;
              color: #1a6fa6;
              padding-top: 45px;
            }
            .coin-name{
              font-size: 30px;
              color: #333;
              margin-top: 20px;
            }
          }
          &.lastBlock:hover{
            border-color: #dcdcdc;
          };
        }
        li:last-child{
          margin-right: 0;
        }
        /*li:hover{
          transform: scale(1.1);
          box-shadow: 2px 2px 50px #1A6FA6;
        }*/
      }
      ul:last-child{
        margin-bottom: 0;
      }
    }
    .coinTitle{
      text-align: center;
      padding-top: 78px;
      h1{
        font-weight: bold;
        font-size: 35px;
        color: #333;
      }
      h2{
        font-size: 20px;
        color: rgba(153,153,153,0.8);
        margin-top: 12px;
      }
      .blueLine{
        width: 60px;
        height: 2px;
        margin:0 auto;
        margin-top: 15px;
        background-color: #1A6FA6;
      }
    }
    .coinBox{
      width: 1200px;
      height: auto;
      margin: 80px auto 0;
      position: relative;
      ul{
        width: 915px;
        height: 363px;
        margin: 0 auto;
        li{
          width: 180px;
          height: 180px;
          background-color: #fff;
          display: inline-block;
          float: left;
          margin-right: 3px;
          margin-bottom: 3px;
          .smallBox{
            width: 100%;
            height: 100%;
            /*-webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;*/
            .icon{
              font-size: 62px;
              margin-top: 30px;
              margin-bottom: 30px;
              color: #1a6fa6;
            }
            p{
              font-size: 20px;
              color: #999;
            }
          }
        }
        li:nth-child(5){
          margin-right: 0px;
        }
        .bottomLi{
          margin-bottom: 0px;
        }
        li:nth-child(10){
          margin-right: 0px;
        }
      }
      .btn{
        position: absolute;
        top: 142px;
        font-size: 75px;
        color: #C0C0C0;
        cursor: pointer;
        display: none;
        &:hover{
          color: #3884D3;
        }
      }
      .pre{
        left: 0px;
      }
      .next{
        right: 0px;
      }
    }
  }
  .plat-block{
    height: 900px;
    background: url("../../assets/img/home/plat01.png") no-repeat center 30px;
    background-size: auto;
    position: relative;
    .plat-block-back{
      width: 100%;
      height: 417px;
      position: absolute;
      bottom: 0;
      background: url("../../assets/img/home/plat02.png") no-repeat center bottom;
      .word-box{
        width: 1200px;
        height: 250px;
        position: absolute;
        left:50%;
        transform: translateX(-50%);
        bottom: 85px;
        background-color:rgba(2,134,219,0.83);
        padding-left: 195px;
        text-align: left;
        color: #fff;
        img{
          position: absolute;
          top:-37px;
          left: 158px;
        }
        .tip1{
          line-height: 1;
        }
        .word1{
          font-size: 35px;
          margin-top: 30px;
          font-weight: bold;
        }
        .word2{
          font-size: 24px;
          margin-left: 80px;
          margin-top: 10px;
          font-weight: bold;
        }
        .word3{
          margin-top: 16px;
          font-size: 12px;
          line-height: 1.5;
        }
        hr{
          width: 45px;
          height: 2px;
          background-color: #fff;
          border:0;
          margin-top: 20px;
        }
        .ins-box{
          position: absolute;
          width: 400px;
          right: 250px;
          top:56px;
          font-size: 18px;
          text-align: center;
          line-height: 1.6;
          >span{
            display: block;
            padding: 5px 0;
          }
        }
      }
    }
  }
  .tt-line{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3{
      font-size: 35px;
      font-weight: bold;
      line-height: 1;
    }
    hr{
      width: 420px;
      height: 1px;
      background-color: #e5e5e5;
      border:0;
    }
  }
  .sub-title{
    font-size: 20px;
    color: #999;
    margin-top: 12px;
  }
  .add-block{
    height: 900px;
    width: 1200px;
    padding-top: 60px;
    margin: 0 auto;   
    .adv-line{
      display: flex;
      margin-top: 80px;
      .apply-btn{
        position: absolute;
        bottom:-22px;
        width: 170px;
        height: 45px;
        background-color: #1a6fa6;
        color: #fff;
        padding-left: 18px;
        cursor: pointer;
        span{
          line-height: 45px;
          font-size: 15px;
        }
        i{
          display: inline-block;
          width: 45px;
          height: 45px;
          text-align: center;
          line-height: 45px;
          font-size: 16px;
          position: absolute;
          right: 0;
          top: 0;          
          background-color: #2580bb;
          
        }
      }
      &-item:first-child{
        margin-right:200px;
      }
      &-item:hover{
        border:1px solid #1a6fa6;
        border-left:3px solid #1a6fa6;
        box-shadow: 0 0 20px 1px #e5e5e5;
      }
      &-item{
        
        position: relative;
        text-align: left;
        width: 430px;
        height: 250px;
        border:1px solid #eee;
        color: #333;
        padding: 32px 0 0 20px;
        background-color: #fff;
        h4{
          font-size: 25px;
          font-weight: bold;
          line-height: 1;
        }
        h5{
          font-size: 20px;
          line-height: 1;
          color: #999;
          font-weight: 500;
          margin-top: 10px;
          margin-bottom: 40px;
        }
        p{
          width: 255px;
          font-size: 15px;
        }
        img{
          position: absolute;
          top:20px;
          right: -135px;
          width: 270px;
        }
      }
    }
  }
  .buttonLineBox{
    height: 100px;
    background-color: rgba(0,0,0,0.46);
  } 
  .button-line-box{
    /* height: 100px;
    background-color: rgba(0,0,0,0.46); */
    position: absolute;
    bottom: 25px;
    z-index: 10;
    text-align: center;
    width: 100%;
    color: #fff;  
    padding: 30px 0;
    .about-line{
      position: absolute;
      top: 20px;
      left: 260px;
      width: 200px;
      height: 450px;
      background:#1a6fa6 url("../../assets/img/home/aboutBg.png") no-repeat left 125%;
      text-align: left;
      padding: 0 20px;
      h3{
        font-size: 45px;
        padding-top: 124px;
        line-height: 1;
        margin-bottom: 15px;    
      }
      h4{
        font-size: 12px;
        margin-bottom: 30px;
      }
      .word{
        font-size: 30px;
        font-weight: bold;
      }
      .word-tip{
        color: #a8ddff;
        font-size: 18px;
      }
      hr{
        height: 2px;
        width: 60px;
        background-color: #fff;
        border: 0;
        margin: 20px 0;
      }
    }
  }
  .button-line{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    button{
      width: 140px;
      height: 40px;
      border-radius: 20px;
      border: 0;
      font-size: 18px;
      font-weight: bold;
      margin-right: 60px;
      cursor: pointer;
    }
    .btn1{
      background-color: #1a6fa6;
      color: #fff;
    }
    .btn2{
      color: #1a6fa6;
      background-color: #fff;
    }
    .phoneNum{
      font-size: 25px;
      font-weight: bold;
    }
  }
  .button-line2{
    height: 100px;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    margin: 0 auto;
    line-height: 100px;
    position: absolute;
    top: 800px;
    z-index: 100;
    button{
      width: 140px;
      height: 40px;
      border-radius: 20px;
      border: 0;
      font-size: 18px;
      font-weight: bold;
      margin-right: 60px;
      cursor: pointer;
    }
    .btn1{
      background-color: #1a6fa6;
      color: #fff;
    }
    .btn2{
      color: #1a6fa6;
      background-color: #fff;
    }
    .phoneNum{
      color: #fff;
      font-size: 25px;
      font-weight: bold;
    }
  }
}
</style>