<template>
  <div class="top-header-box" :class="{init:isIndex===true&&scrollState===false}">
    <div class="top-header">
      <div class="logo">
        <img v-show="isIndex===true&&scrollState===false" src="../assets/img/mainLogo.png" alt="">
        <img v-show="!(isIndex===true&&scrollState===false)" src="../assets/img/logo2.png" alt="">
      </div>
      <ul class="nav-line">
        <li v-for="item in navlist" @click="golink(item.link)" :class="{active:item.link==currentPath}">
          <span>{{item.name}}</span>
          <i class="badge" v-if="item.badge==true">HOT</i>
        </li>
      </ul>
      <div class="userMsg" v-show="showstate===1">
        <div class="item" @click="golink('/usercenter')">
          <i class="iconfont icon-user"></i>
          <span >{{username}}</span>
        </div>
        <div class="item" @click="quit">
          <i class="iconfont icon-tuichu"></i>
          <span>退出</span>
        </div>
      </div>
      <div class="userMsg" v-show="showstate===0&&isIndex===false">
        <div class="item">
          <span @click="golink('/index')">登录</span>
        </div>
        <div class="item">
          <span @click="golink('/index')">注册</span>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import {ajax,getUserData,delatecookie,getcookie} from "../assets/js/common.js"
import bus from "../assets/js/bus.js"
export default{
  data(){
    return{
      navlist:[
        {
          name:"首页",
          link:"/index",
        },
        {
          name:"交易中心",
          link:"/tradecenter",
        },
        {
          name:"我的资产",
          link:"/myassets",
        },
        {
          name:"帮助中心",
          link:"/help",
        },
        {
          name:"APP下载",
          link:"/appload",
        },
        {
          name:"申请代理",
          link:"/apply",
          badge:true,
        },
      ],
      isIndex:false,
      scrollState:false,
      currentPath:"",
      showstate:0,
      username:"",
    }
  },
  mounted(){
    this.$nextTick(()=>{
      javascript:scrollTo(0,0);
      if(this.$route.path=="/index"){
        this.isIndex=true;
      }
      let mainword=this.$route.path.split("/")[1];
      this.currentPath="/"+mainword;
      window.addEventListener("scroll",this.menuchange);      
      let token=getcookie("token");
      if(token){
        this.showstate=1;
      }
      else{
        this.showstate=0;
      }
      bus.$on("login",()=>{
        this.showstate=1;
        this.username=getcookie("username");    
      });
      this.username=getcookie("username");      
    })
  },
  methods:{
    menuchange(){
      if(document.documentElement.scrollTop>0){
        this.scrollState=true;
      }
      else{
        this.scrollState=false;
      }
    },
    quit(){
      ajax(this,this.extendApi.loginout,"",(data)=>{
        if(data.code==200||data.code==-2){
          this.$notify({
            title: '提示',
            message: '退出成功',
            type: 'success',
            duration:'1500'
          });
          delatecookie();
          this.$router.push({path:"/index"});
          this.showstate=0;
          bus.$emit("goout");
        }
      },"GET");
    },
    golink(val){
      let token=getcookie('token');
      if(token){
        this.$router.push({path:val});
      }
      else{
        if(val=='/apply'||val=='/myassets'){
          this.$notify({
            title: '提示',
            message: '请先登录',
            type: 'warning',
            duration: '2000'
          });
        }
        else{
          this.$router.push({path:val});
        }
      }     
    },
  }
}
</script>

<style scoped>
.top-header-box{
  background-color:#fff;
  overflow: hidden;
  position: fixed;
  z-index: 100;
  width: 100%;
  &.init{
    background-color:rgba(0,0,0,0.2);
    .nav-line{
      li{
        color: #fff;        
      }
      .active{
        color:#1a6fa6;
        background-color: #fff;
      }
    }
    .userMsg{
      color: #fff;
      .iconfont{
        color: #fff !important;
      }
    }
  }
}
.top-header{
  text-align: left;
  width: 1200px;
  margin: 0 auto;
  .logo{
    float: left;
    width: 98px;
    line-height: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    margin-right: 55px;
    img{
      width: 100%;
    }

  }
  .nav-line{
    /*overflow: hidden;
    position: relative;*/
    li{
      float: left;
      position: relative;
      line-height: 75px;
      font-size: 14px;
      width: 118px;
      text-align: center;
      cursor: pointer;
      color: #333;
    }
    .active{
      color:#fff;
      background-color: #1a6fa6;
    }
    .badge{
      position: absolute;
      background-color: #ff4e00;
      color: #fff;
      display: block;
      width: 38px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      border-radius: 2px;
      top: 8px;
      right: 0;
    }
    .badge:after{
      content:"";
      width: 0;
      height: 0;
      position: absolute;
      z-index:-1;      
      bottom: 0;
      left: 30%;
      border-left:5px solid transparent;
      border-right:5px solid transparent;
      border-top:14px solid #ff4e00;   
      margin-bottom: -8px;
      transform:rotate(30deg);
    }
  }
  .userMsg{
    float: right;
    line-height: 72px;
    color: #333;
    .item{
      float: left;
      font-size: 14px;
      cursor: pointer;
    }
    .item+.item{
      margin-left: 30px;
    }
    .iconfont{
      font-size: 20px;
      color: #999;
    }
  }
}
</style>