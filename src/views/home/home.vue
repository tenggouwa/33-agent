<template>
  <div>
    <index-header></index-header>
    <div class="home-content">
      <!-- <div class="section-box">
        <ol>
          <li :class="{active:sectionState==item}"  v-for="(item,index) in 5">
            <div class="item">0{{item}}</div>
          </li>
        </ol>
      </div> -->
      <div class="banner-block">
        <el-carousel trigger="click" height="900px" :autoplay="false" indicator-position="none" arrow="never">
          <el-carousel-item v-for="item in 4" :key="item">
            <!-- <img src="../assets/img/banner1.png" alt=""> -->
            <div class="banner"></div>
          </el-carousel-item>
        </el-carousel>
        
        <div class="button-line-box">         
          <div class="button-line">
            <div class="about-line">
              <h3>ABOUT</h3>
              <h4>Mainstream reliable trading currencies</h4>
              <p class="word">交易币种</p>
              <hr>
              <p class="word-tip">精选主流币种</p>
              <p class="word-tip">多种报价模式</p>
            </div>
            <div class="button-line">         
              <button class="btn1">申请代理</button>
              <button class="btn2">在线咨询</button>
              <span class="phoneNum">热线电话：4001-566-899</span>
            </div>          
          </div>       
        </div>       
        <loginPart></loginPart>                
      </div>
      <div class="coin-block">
        <div class="tras-block">
          <ul v-for="(item,index) in coinBlock">
            <!-- @mouseenter="showBtn2('coinBlock',1,index,num,i)" 
              @mouseleave="showBtn2('coinBlock',0,index,num,i)"
              @click="gohelp(i.coinname,i.normal)"
              :class="{lastBlock:i.normal,noCoin:i.nocoin}" -->
            <li
              v-for="(i,num) in item">
              <div class="part">
                <p class="name">{{i.name}}</p>
                <p class="coin-name">{{i.coinname}}</p>
              </div>
              <!-- <div class="part2" v-if="i.state===1&&!i.normal">
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
      </div>
      <addUs></addUs>
      <plat></plat>
      <server></server>
      <contactUs></contactUs>
    </div>  
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from "../../components/header.vue"
import indexFooter from "../../components/footer.vue"
import loginPart from "./login.vue"
import addUs from "./addUs.vue"
import plat from "./plat.vue"
import server from "./server-block.vue"
import contactUs from "../../components/contact.vue"
import {ajax} from "../../assets/js/common.js"
export default{
  data(){
    return{
      // dialogVisible:true,
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
            name:"比特现金",
            coinname:"BCC",
            coin:"icon-BCC",
            state:0,
          },         
          {
            name:"以太坊经典",
            coinname:"ETC",
            coin:"icon-ETC",
            state:0,
          },
          // {
          //   name:"比特股",
          //   coinname:"BTS",
          //   coin:"icon-BTS",
          //   state:0,
          // },
          {
            state:0,
            nocoin:true,
          },
        ],
        [
          {
            name:"以太坊",
            coinname:"ETH",
            coin:"icon-ETH",
            state:0,
          },
          {
            name:"零币",
            coinname:"ZEC",
            coin:"icon-ZEC",
            state:0,
          },
          // {
          //   name:"比特币",
          //   coinname:"BTC",
          //   coin:"icon-BTC",
          //   state:0,
          // },
          {
            state:0,
            nocoin:true,
          },
        ],
        [
          {
            name:"莱特币",
            coinname:"LTC",
            coin:"icon-LTC",
            state:0,
          },
          // {
          //   name:"云储币",
          //   coinname:"SC",
          //   coin:"icon-SC",
          //   state:0,
          // },
          {
            state:0,
            nocoin:true,
          },       
          {
            name:"主流",
            coinname:"交易币种",
            state:0,
            normal:true,
          },
        ],
      ],
      sectionState:1,
      requtime:'',//轮询计时器
    }
  },
  watch:{
    sectionState(val){
      console.log(val);
    }
  },
  components:{
    indexHeader,
    indexFooter,
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
      this.getHomeMarket();
      this.requtime=setInterval(()=>{
        this.getHomeMarket();
      },5000);
    })
  },
  methods:{
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
    
    showBtn2(key,val,index,num,item){
      //最后一个方块不做hover效果
      if(!item.normal){
        this[key][index][num].state=val;
      }
      // if(index!==2||num!==2){
      //   this[key][index][num].state=val;
      // }     
    },
    // showBtn(key,val){
    //   this[key]=val;
    // },
  }
}
</script>
<style>
.home-content{
  /*padding-top: 75px;*/
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
    .banner{
      background:url("../../assets/img/banner1.png") no-repeat center center;
      background-size: auto 100%;
      height: 900px;
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
            font-size: 50px;
            margin-top: 10px;
            margin-bottom: 10px;
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
            padding-top: 30px;
          }
          .coin-name{
            font-size: 40px;
            color: #1a6fa6;
            margin-top: 20px;
          }
          /*&:hover{
            background-color:rgba(26,111,166,0.95);
            border-color: #1a6fa6;
          }*/
          &.noCoin{
            background-image: url("../../assets/img/home/no-coin.png");
            background-repeat: no-repeat;
            background-position: center;
          }
          &.noCoin:hover{
            background-image: none;
          }
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
      }
      ul:last-child{
        margin-bottom: 0;
      }
    }
  }
  .plat-block{
    height: 900px;
    background: url("../../assets/img/home/platBg.png") no-repeat center bottom;
    background-size: auto;
    position: relative;
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
        width: 380px;
        right: 250px;
        top:56px;
        font-size: 18px;
        text-align: center;
        line-height: 1.6;
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
  
  .button-line-box{
    background-color: rgba(0,0,0,0.46);
    position: absolute;
    bottom: 0;
    z-index: 10;
    height: 100px;
    text-align: center;
    width: 100%;
    color: #fff;  
    padding: 30px 0;
    .about-line{
      position: absolute;
      top:-20px;
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
}
</style>