<template>
  <div class="user-block">
    <indexHeader></indexHeader>
    <div class="user-content">
      <div class="top-part" v-loading="userload">
        <div class="head-box fl box">
          <div class="usertou">
          
          </div> 
          <p>欢迎您！</p>
          <p>{{userinfo.username}}</p>
        </div>
        <div class="msg-state fl box">
          <p>资料完善程度:{{this.stateNum}}/3</p>
          <div>
            <el-progress :percentage="progreeticker" :stroke-width='10'></el-progress>
          </div>
          <ul class="stateShow">
            <el-tooltip class="item" effect="light" content="已身份认证" placement="bottom" :disabled="!personBind">
              <li class="fl" :class="{active:personBind}"><i class="iconfont icon-user"></i></li>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="已手机验证" placement="bottom" :disabled="!mobileBind">
              <li class="fl" :class="{active:mobileBind}"><i class="iconfont icon-shouji"></i></li>
            </el-tooltip>
            <!-- <li class="fl" :class="{active:mobileBind}"><i class="iconfont icon-shouji"></i></li> -->
            <el-tooltip class="item" effect="light"   content="已邮箱验证" placement="bottom" :disabled="!emailBind">
              <li class="fl" :class="{active:emailBind}"><i class="iconfont icon-tubiao01"></i></li>
            </el-tooltip>           
          </ul>
        </div>
        <div class="msg-list fr box">
          <ul class="msg-list-box">
            <li class="fl">
              <div>UID</div>
              <div class="msg-line">{{userinfo.id}}</div>
            </li>
            <li class="fl">
              <div>昵称</div>
              <div class="msg-line">{{userinfo.username}}</div>
            </li>
            <li class="fl">
              <div>电子邮箱</div>
              <div class="msg-line">{{userinfo.email|filterNumHide('email')}}</div>
            </li>
            <li class="fl">
              <div>注册时间</div>
              <div class="msg-line">{{userinfo.adddate}}</div>
            </li>
          </ul>
          <ul class="msg-list-box line2">
            <!-- <li class="fl">
              <div>QQ号码</div>
              <div class="msg-line">请填写您的QQ号码</div>
            </li>
            <li class="fl">
              <div>推荐人QQ</div>
              <div class="msg-line">请添加您的推荐人QQ</div>
            </li> -->
            <li class="fl">
              <div>手机号码</div>
              <div class="msg-line">{{mobileNum}}</div>
            </li>
            <!-- <li class="fl">
              <div>等级</div>
              <div class="msg-line"><br></div>
            </li> -->
          </ul>
        </div>
      </div>
      <div class="bottom-part box">
        <div class="left-part">
          <ul>
            <router-link to="/usercenter/identify" active-class="active" tag="li">
              <i class="iconfont icon-yirenzheng"></i>
              <span>账户认证</span>
            </router-link>
            <router-link to="/usercenter/setting" active-class="active" tag="li">             
              <i class="iconfont icon-weibiaoti"></i>
              <span>安全设置</span>
            </router-link>
          </ul>
        </div>
        <div class="right-part">
          <router-view></router-view>  
        </div>
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from "../../components/header.vue"
import indexFooter from "../../components/footer.vue"
import {ajax,getstate,getUserData} from "../../assets/js/common.js"
export default{
  data(){
    return{
      progreeticker:0,
      userload:true,
      userinfo:[],
      tab:0,
      userState:{},
      emailBind:false,
      mobileBind:false,
      personBind:false,
      stateNum:0,
      mobileNum:"----",
    }
  }, 
  mounted(){
    this.$nextTick(()=>{
      this.docList();   
      getstate(this,(data)=>{
        if(data.data.states.email.statu==1){
          this.emailBind=true;
          this.stateNum++;
        }
        if(data.data.states.mobile.statu==1){
          this.mobileBind=true;
          this.mobileNum=data.data.states.mobile.data.mobile;
          this.stateNum++;
        }
        if(data.data.states.identity.statu==1){
          this.personBind=true;
          this.stateNum++;
        }
        this.ticker();
      });
    });   
  },
  methods:{
    docList(){
      let that = this;
      getUserData(this,(res)=>{
        if(res.code == 200){
          this.userload = false;
          this.userinfo = res.data.base;
        }
      });
    },
    ticker(){
      let e = 100*(this.stateNum/3);
      this.progreeticker = Number(e);
    }
  },
  components:{
    indexHeader,
    indexFooter,
  }
}
</script>

<style>
  .el-tooltip__popper.is-light{
    border-color: #dcdcdc;
  }
  .el-tooltip__popper .popper__arrow{
    border-bottom-color: #dcdcdc !important;
  }
</style>
<style>
.user-block{
  .el-form{
    .el-input__inner{
      border-radius: 0;
      border-color: #e5e5e5;
    }
  }
  .button-line{
    text-align: center;
    margin-top: 50px;
    margin-bottom: 20px;
    button{
      width: 140px;
      height: 40px;
      border-radius: 20px;
      border:1px solid #e5e5e5;
      background-color: transparent;
      font-size: 18px;
      color: #1a6fa6;
      cursor: pointer;
    }
    button+button{
      margin-left:18px; 
    }
  }
  .cue{
    color: #3884d3;
    font-size: 14px;
    text-align: center;
    margin-bottom: 70px;
  }
  .user-content{
    width: 1200px;
    margin:0 auto;
    padding-top: 95px;
    margin-bottom: 20px;
    .box{
      height: 100%;
      background-color: #fff;
      border:1px solid #eee;
    }
    .bottom-part{
      text-align: left;
      margin-top: 10px;
      position: relative;
      .el-tabs{
        .el-tabs__header{
          border-bottom:2px solid #e5e5e5;
          margin-bottom: 30px;
        }
        .el-tabs__nav-wrap{
          margin-bottom: -2px;
        }
        .el-tabs__active-bar{
          background-color: #1f76af;
        }
        .el-tabs__item.is-active{
          color: #1f76af;
        }
        .el-tabs__item{
          color: #999;
          font-size: 16px;
        }
        .el-tab-pane{
          /*text-align: center;*/
        }
      }     
      .left-part{
        position: absolute;
        background-color: #1a6fa6;
        color: #fff;
        font-size: 16px;
        padding-top: 40px;
        width: 200px;
        height: 100%;
        .iconfont{
          font-size: 27px;
          vertical-align: middle;
        }
        span{
          margin-left: 10px;
          font-size: 16px;
          vertical-align: middle;
        }
        ul{
          li{
            border-bottom: 1px solid #1f76af;
            height: 72px;
            line-height: 72px;
            text-align: center;
            cursor: pointer;
          }
          li.active{
            background-color:rgba(255,255,255,0.95);
            color: #1a6fa6;
          }
        }
      }
      .right-part{
        padding-left: 230px;
        padding-right: 30px;
        padding-top: 20px;
      }
    }
    .top-part{
      height: 200px;      
      
    }
    .head-box{
      margin-right:8px;
      height: 100%;
      text-align: center;
      width: 186px;
      color: #1a6fa6;
      font-size: 14px;
   /*   border-right: 0 !important;
      border: 1px solid #e5e5e5;*/
      .usertou{
        margin: 0 auto;
        margin-top: 20px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #ccc;
        background-image: url(../../assets/img/userheader.png);
        margin-bottom: 15px;
      }
    }
    .msg-state{
      width: 248px;
      div{
        .el-progress .el-progress__text{
          display: none;
        }
        /*margin:20px 0 0 24px;
        width: 200px;
        height: 9px;
        background: #1a6fa6;
        border-radius: 4px;*/
      }
      p{
        margin-top: 30px;
        margin-bottom: 18px;
        font-size: 14px;
        color: #1a6fa6;
      }
      .stateShow{
        .active{
          background:#1a6fa6;
          cursor: pointer;      
          i{
            color: #fff;
          }
        }
      }
      ul{
        li{
          width: 55px;
          height: 55px;
          border: 1px solid #ccc;
          border-radius: 50%;
          margin:30px 0 0 20px; 
          i{
            display: inline-block;
            color: #1a6fa6;
            font-size: 28px;
            margin-top: 10px;
          }
        }
        /*li:hover{
          background:#1a6fa6;
          cursor: pointer;
          i{
            color: #fff;
          } 
        }*/
      }
    }
    .msg-list{
      width: 750px;
      padding: 30px 15px;
      &-box{
        clear: both;
        overflow: hidden;     
        li{
          width: 150px;
          margin-right: 38px;
          text-align: left;
          color: #999;
          font-size: 14px;
          .msg-line{
            color: #1a6fa6;
            padding: 9px 0;
            border-bottom:1px solid #e5e5e5;
          }
        }
        li:last-child{
          margin-right: 0;
        }       
      }
      .line2{
        margin-top: 30px;
      }
    }
  }
}
</style>