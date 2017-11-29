<template>
  <div class="tradecenter">
    <index-header></index-header>
    <div class="home-content">
      <!-- banner背景图 -->
      <div class="banner">
        <div class="bannertit"></div>
      </div>
      <!-- 内容 -->
      <div class="container">
        <!-- 头部 -->
        <div class="contant">
          <!-- 左侧导航栏 -->
          <div class="contantleft">
            <ul class="middle-box">
              <li @click="fn(1)">
                <router-link to=''>
                  <a href="">
                    <i class="iconfont icon-jiaoyi"></i>
                    交易中心
                  </a>
                </router-link>
              </li>

              <li @click="changeTab(item)" v-for="(item,index) in isnace" :class="{'activeli':item==currency}">
                <a href="/#/tradecenter/entrustment" :class="{'active':item==currency}">{{item}}/BTC</a>
              </li>

              <li @click="fn(2)" :class="{'activeli':isactive==2}">
                <router-link to='/traditional'>
                  <a href="/traditional" :class="{'active':isactive==2}">
                    <i class="iconfont icon-zhuanyejineng"></i>
                    专业交易
                  </a>
                </router-link>
              </li>
              <li @click="fn(3)" :class="{'activeli':isactive==3}">
                <router-link to='/innovate'>
                  <a href="/innovate" :class="{'active':isactive==3}">
                    <i class="iconfont icon-shandianpeisong"></i>
                    闪电交易
                  </a>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 右侧内容 -->
          <div class="contantright">
            <div class="contantcontainer">
              <!-- <router-view></router-view> -->
              <index-tradetop :dataBack="dataBack" :symbol="symbol"></index-tradetop>
              <index-bottom :symbol="symbol"></index-bottom>
            </div>
          </div>
        </div>
      </div>
    </div>  
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from "../../components/header.vue"
import indexFooter from "../../components/footer.vue"
import indexTradetop from "../../views/tradecenter/tradechild/trandetop.vue"
import indexBottom from "../../views/tradecenter/tradechild/tradebottom.vue"
import {ajax,getcookie} from "../../assets/js/common.js"
export default{
  data(){
    return{
      symbol:"",
      isactive:1,
      isnace:['ETH','BCC','ETC','LTC','ZEC','BTS','SC'],
      dataList:{
        num:8,//显示档位数量
        format:'',//时间格式化样式
        symbol:'', //货币对
      },
      dataBack:[],
      currency:"ETH",
    }
  },
  components:{
    indexHeader,
    indexFooter,
    indexTradetop,
    indexBottom,
  }, 
  created(){
    let token =getcookie("token");
    if(token){
      
    }
    this.tradeList();
    this.interTime = setInterval(()=>{
      this.tradeList();
    },2000)
  },
  destroyed:function(){
    clearInterval(this.interTime);
  },
  methods:{
    fn(val){
      this.isactive = val;
    },
    //控制对应币种
    changeTab(val){
      // console.log(val);
      this.currency=val;
      this.symbol=this.currency;
      this.dataBack=[];
      this.tradeList();
      // console.log(this.symbol)
    },
    tradeList(){
      let that = this;
      this.dataList.symbol=this.currency+'BTC';
      ajax(that,that.extendApi.usertradeList,that.dataList,(res)=>{
        if(res.code == 200){
          that.dataBack = res.data;
        }
      },'GET')
    },
  },
}

</script>

<style scoped>
  .banner{
    width: 100%;
    height: 400px;
    background: url(../../assets/img/trade/banner.png) no-repeat center center;
    background-size: auto 100%; 
    .bannertit{
      width: 520px;
      height: 70px;
      background: url(../../assets/img/trade/tradecenter.png) no-repeat;
      position: absolute;
      left: 50%;
      margin-left: -260px;
      margin-top: 105px;
    }
  }
  .container{
    width: 1200px;
    margin: 0 auto;
    margin-top: -200px;
    margin-bottom: 20px;
    .header{
      background: #ccc;
      opacity: 0.8;
      img{
        float: left;
        margin: 13px 5px 0 10px;
      }
      a{
        color: #1a6fa6;
      }
    }
    .contant{
      .contantleft{
        float: left;
        width: 200px;
        background: #1a6fa6;
        .middle-box{
          padding-top:20px;
          li{
            line-height: 80px;
            font-size: 20px;
            a{
              color: #fff;
              padding: 15px 20px;
              i{
                font-size: 20px;
                margin-right: 10px;
              }
            }
          }
          li:hover{
            background: #fff;
            opacity: 0.9;
          }
          li:hover a{
            color: #1a6fa6;
          }
          li.activeli{
            background: #fff;
            opacity: 0.9;
          }
          a.active{
            color: #1a6fa6;
            background: #fff;
            opacity: 0.9;
          }
        }
      }
      .contantright{
        overflow: hidden;
        background: #f5f8ff;
        text-align: left;
        margin-left: 200px;
        .contantcontainer{
          overflow: hidden;
        }
      }
    }
  }
</style>