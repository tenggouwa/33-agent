<template>
  <div>
    <index-header></index-header>
    <div class="home-content">
      <!-- banner背景图 -->
      <div class="banner">
        <div class="bannertit"></div>
      </div>
      <!-- 内容 -->
      <div class="container">
        <!-- 头部 -->
        <!-- <div class="header">
          <img src="../../assets/img/myassets/position.png" height="32" width="32" alt="">
          <span>当前位置:</span>
          <span>帮助中心>></span>
          <a href="#/myassets">平台公告</a>
        </div> -->
        <!-- <location class="header" :dataList="locationData"></location> -->
        <div class="contant">
          <!-- 左侧导航栏 -->
          <div class="contantleft">
            <ul class="middle-box">
              <li :class="{'activeli':isactive==1}">
                <router-link to='/help/placeinform'>
                  <a href="" :class="{'active':isactive==1}">
                    <i class="iconfont icon-pingtaigonggao"></i>
                    <!-- <img src="../../assets/img/help/inform.png" height="20" width="20" alt=""> -->
                    平台公告
                  </a>
                </router-link>
              </li>
              <li :class="{'activeli':isactive==2}">
                <router-link to='/help/coinintroduce'>
                  <a href="" :class="{'active':isactive==2}">
                    <i class="iconfont icon-bizhong"></i>
                    <!-- <img src="../../assets/img/help/icon.png" height="20" width="20" alt=""> -->
                    币种介绍
                  </a>
                </router-link>
              </li>
              <li :class="{'activeli':isactive==3}">
                <router-link to='/help/warningrisk'>
                  <a href="" :class="{'active':isactive==3}">
                    <i class="iconfont icon-fengxiantishi"></i>
                    <!-- <img src="../../assets/img/help/warning.png" height="20" width="20" alt=""> -->
                  风险提示
                  </a>
                </router-link>
              </li>
              <li :class="{'activeli':isactive==4}">
                <router-link to='/help/agencyneed'>
                  <a href="" :class="{'active':isactive==4}">
                    <i class="iconfont icon-xuzhi"></i>
                    <!-- <img src="../../assets/img/help/needs.png" height="20" width="20" alt=""> -->
                    代理须知
                  </a>
                </router-link>
              </li>
              <li :class="{'activeli':isactive==5}">
                <router-link to='/help/ratedescript'>
                  <a href="" :class="{'active':isactive==5}">
                    <i class="iconfont icon-yuefeilv"></i>
                    <!-- <img src="../../assets/img/help/rate.png" height="20" width="20" alt=""> -->
                    费率说明
                  </a>
                </router-link>
              </li>
              <li :class="{'activeli':isactive==6}">
                <router-link to='/help/feedback'>
                  <a href="" :class="{'active':isactive==6}">
                    <i class="iconfont icon-phonedateicon26"></i>
                    <!-- <img src="../../assets/img/help/question.png" height="20" width="20" alt=""> -->
                    问题反馈
                  </a>
                </router-link>
              </li>
              <li :class="{'activeli':isactive==7}">
                <router-link to='/help/contantus'>
                  <a href="" :class="{'active':isactive==7}">
                    <i class="iconfont icon-lianxiwomendianhua"></i>
                    <!-- <img src="../../assets/img/help/contant.png" height="20" width="20" alt=""> -->
                    联系我们
                  </a>
                </router-link>
              </li>
            </ul>
          </div>
          <!-- 右侧内容 -->
          <div class="contantright">
            <div class="contantcontainer">
               <router-view></router-view>
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
export default{
  data(){
    return{
      isactive:1,
    }
  },
  components:{
    indexHeader,
    indexFooter,
  },
  methods:{
    golink(id){
      switch(id){
        case 1:
        this.isactive = id;
        break;
        case 2:
        this.isactive = id;
        break;
        case 3:
        this.isactive = id;
        break;
        case 4:
        this.isactive = id;
        break;
        case 5:
        this.isactive = id;
        break;
        case 6:
        this.isactive = id;
        break;
        case 7:
        this.isactive = id;
        break;
      }
    }
  },
  watch:{
    '$route' (to,from){
      var path = to.path;
      console.log(path);
      switch(path){
        case '/help/placeinform':
        this.golink(1);
        break;
        case '/help/coinintroduce':
        this.golink(2);
        break;
        case '/help/warningrisk':
        this.golink(3);
        break;
        case '/help/agencyneed':
        this.golink(4);
        break;
        case '/help/ratedescript':
        this.golink(5);
        break;
        case '/help/feedback':
        this.golink(6);
        break;
        case '/help/contantus':
        this.golink(7);
        break;

      }
    }
  }
}
</script>

<style scoped>
  .banner{
    width: 100%;
    height: 400px;
    background: url(../../assets/img/help/banner.png) no-repeat center center;
    background-size:auto 100%; 
    .bannertit{
      width: 520px;
      height: 70px;
      background: url(../../assets/img/help/helpcenter.png) no-repeat;
      position: absolute;
      left: 50%;
      margin-left: -260px;
      margin-top: 105px;
    }
  }
  .container{
    width: 1200px;
    margin: 0 auto;
    /*height: 800px;*/
    /*background: #666;*/
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
            border-bottom:1px solid #2076af;
            a{
              color: #fff;
              padding: 20px 20px;
              i{
                font-size: 20px;
                margin-right: 10px;
              }
           
            }
            
          }
          li:hover a{
            color: #1a6fa6;
           
          }
          li:hover{
            background: #fff;
            opacity: 0.9;
          }
          .active{
            color: #1a6fa6;
          }
          .activeli{
            background: #fff;
            opacity: 0.9;
          }
        }
      }
      .contantright{
        background: #fff;
        text-align: left;
        margin-left: 200px;
        min-height: 700px;
        .contantcontainer{
          margin:0 30px;
          padding-top:20px; 
          overflow: hidden;
        }
      }
    }
  }
</style>