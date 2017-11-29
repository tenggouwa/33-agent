<template>
  <div class="tradecomLogin">
    <div class="logincom parentCls" v-show="showss" @mouseleave="hidelogo(1)" @mouseover="showlogo(1)"><!--  -->
      <p class='title1'>区块链交易所</p>
      <input class="tel-email inputElem logsss" style="color:#fff;"  value="" id="loginusername" autocomplete="off" name="username" type="text" placeholder="请输入邮箱">
      <input type="password" id="loginpassword" v-model="login.password" @keyup.enter="gologin()" class="pwd logom" placeholder="请输入密码">
      <span class="register-switch" @click="zhuce()">注册</span>
      <span class="forget-pwd" id="forget" @click="forgotpass()">忘记密码</span>
      <button class="login-btn" id="loginBtn" @click="gologin()">登录</button>
    </div>
    <div class="logincom parentCls" v-show="resgist" @mouseleave="hidelogo(3)" @mouseover="showlogo(2)"><!--  -->
      <p class='title1'>区块链交易所</p>
      <input class="tel-email inputElem" style="color:#fff;" value="" id="regesteremail" autocomplete="off" name="username" type="text" placeholder="请输入邮箱">
      <input type="password" id="loginpassword" v-model="regester.password" class="pwd logom" placeholder="设置登录密码">
      <div class="cons">
        <input class="usercom codeinput" v-model="regester.code" placeholder="请输入邮箱验证码">
        <button class="codeButton" @click="getYZM()">{{coinInfo}}</button>
      </div>
      <span class="register-switch" @click="showlogo(1)">返回</span>
      <!-- <span class="forget-pwd" id="forget">忘记密码</span> -->
      <button class="login-btn" id="loginBtn" @click="goregist()">注册</button>
    </div>
    <div class="logincom parentCls"  v-show="forgot"  @mouseleave="hidelogo(4)"><!---->
      <p class='title1'>忘记密码</p>
      <!-- <input class="tel-email inputElem" style="color:#fff;" v-model="lowpassword.mobile" name="username" type="text" placeholder="请输入邮箱"> -->
      <div class="inbox">
         <input type="text" id="loginpassword" v-model="lowpassword.email" class="pwd loemail logom" placeholder="输入邮箱">
         <button @click="getpasssword()" class="getcods">获取验证码</button>
      </div>
      <span class="register-switch" @click="showlogo(1)">返回</span>
      <span class="forget-pwd" @click="zhuce()">注册</span>
      <!-- <span class="forget-pwd" id="forget">忘记密码</span> -->
      <!-- <button class="login-btn" id="loginBtn" @click="validateCode" style="cursor:pointer;">下一步</button> -->
    </div>
    <div class="logincom parentCls" v-show="resetpassword" @mouseleave="hidelogo(5)"><!--  -->
      <p class='title1'>重置密码</p>
      <input class="tel-email inputElem" style="color:#fff;" v-model="respassword" name="username" type="password" placeholder="请设置新密码">
      <input type="password" v-model="respasswordagain" placeholder="请再次输入新密码" @keyup.enter="goregisterpwd()" style="margin-top:20px">
      <!-- <span class="register-switch" @click="showlogo(1)">返回</span> -->
      <!-- <span class="forget-pwd" id="forget">忘记密码</span> -->
      <button class="login-btn" id="loginBtn" @click="goregisterpwd()"style="cursor:pointer;">提交</button>
    </div>
  </div>
</template>
<script>
  import { ajax,getcookie,setcookie,delatecookie,sublogion,goregister,formatcoinprice} from '../../assets/js/common'
  export default{
    props:['showLogin','shownum','logins'],
    data(){
      return{
        showss:false,//未登录下鼠标移入的控制
        resgist:false,//注册
        forgot:false,//忘记密码
        islogin:false,//判断是否登录
        shwomoney:false,//登录下鼠标移入的控制
        resetpassword:false,//密码重置
        mobileType:true,//判断是否是手机
        coinInfo:'获取验证码',
        hidetime:0,
        login:{
          redirect_uri:'https://licai.cn',
          ltype:'web',
          email:'',
          password:'',
        },
        viladtecode:'',
        respassword:'',
        respasswordagain:'',
        lowpassword:{
          email:'',
        },
        regester:{
          email:'',
          password:'',
          code:'',
          checkmethod:'data',
        },
      }
    },
    // mounted(){
    //   this.showlogo(1);
    // },
    watch:{
      showLogin:function(){
        this.showlogo(this.shownum);
      },
    },
    methods:{
      gologin(){
        var _this=this;
        // this.login.username=$('.logsss').val();
        $(".logsss").each(function(index){ 
          if(index == _this.logins-1){
            _this.login.email=$(this).val();
          } 
        })
        sublogion(this);
      },
      goregist(){
        this.regester.email = $('#regesteremail').val();
        goregister(this);
      },
      //获取验证码
      getYZM(){
        if(!$('#regesteremail').val()){
          this.$notify({
            title: '失败',
            message: '请输入邮箱',
            type: 'error',
            duration:'1000',
          });
          return;
        }
        var param = {
          email:$('#regesteremail').val(),
          codetype:'validate',
          vparam:'xjxtime|xjxrandom'
        }
        ajax(this,this.extendApi.sendEmail,param,(response)=>{
          if(response.code == 200){
            this.regester.gid = response.data.guide;
            this.lasscode();
            this.$notify({
              title: '成功',
              message: '验证码发送成功',
              type: 'success',
              duration:'1000',
            });
          }else{
            this.$notify({
              title: '失败',
              message: response.message,
              type: 'error',
              duration:'1000',
            });
          }
        });
      },
      lasscode(){
        var _this=this;
        clearInterval(this.scode);
        var codenum = 60;
        this.scode = setInterval(()=>{
          codenum= codenum-1;
          this.coinInfo = codenum+'秒后重试'
          if(codenum == 0){
            // this.regester.gid = '';
            this.coinInfo = '获取验证码';
            clearInterval(_this.scode);
            // this.regester.code = '';
          }
        },1000)
      },
      getpasssword(){
        var _this=this;
        if(this.lowpassword.email==""){
          this.$notify({
            title: '提示',
            message: '请输入邮箱',
            type: 'error',
            duration:'1000',
          });
        return;
        }
        ajax(this,this.extendApi.resetmail,this.lowpassword,(response)=>{
          if(response.code == 200){
            _this.$notify({
              title: '成功',
              message: '邮件发送成功,请点击邮箱确认链接修改密码',
              type: 'success',
              duration:'3000',
            });
            // this.$router.push({
            //   path: '/regestpassword'
            // });
          }else{
            _this.$notify({
              title: '成功',
              message: response.message,
              type: 'error',
              duration:'1000',
            });
          }
        });
        //判断输入的是手机还是邮箱
        // var r = /^\+?[1-9][0-9]*$/;　　//正整数 
        // r.test(this.lowpassword.mobile);
        // if(r.test(this.lowpassword.mobile)==true){
        //   var url=_this.extendApi.sendSms;
        //   this.lowpassword.email="";
        //   this.lowpassword.vparam='xjxrandom';
        //   _this.mobileType=true;
        // }
        // else{
        //   var url=_this.extendApi.sendEmail;
        //   this.lowpassword.vparam='email|xjxrandom';
        //   this.lowpassword.email=this.lowpassword.mobile;
        //   _this.mobileType=false;
        // }
        // // console.log(r.test(this.lowpassword.mobile));
        // // console.log("getPassword:"+this.lowpassword.mobile);
        // this.lowpassword.codetype='resetpwd';
        // ajax(_this,url,this.lowpassword,function(response){
        //   if(response.code==200){
        //     _this.$notify({
        //       title: '成功',
        //       message: '成功',
        //       type: 'success',
        //       duration:'1000',
        //     });
        //   }
        // })
      },
      validateCode(){
        var _this=this;
        if(_this.mobileType==true){
          ajax(_this,_this.extendApi.checkedcode,{
            't':'sms',
            'rcheck':0,
            'code':_this.viladtecode,
            'codetype':'resetpwd',
            'mobile':_this.lowpassword.mobile,
            'country':'CN',
            'email':''
          },function(response){
            if(response.code==200){
               _this.forgot=false;
               _this.resetpassword=true;
            }
          })
        }
        else{
          ajax(_this,_this.extendApi.checkedcode,{
            't':'mail',
            'rcheck':0,
            'code':_this.viladtecode,
            'codetype':'resetpwd',
            'mobile':'',
            'email':_this.lowpassword.email,
            'country':'CN',
          },function(response){
            if(response.code==200){
              _this.forgot=false;
              _this.resetpassword=true;
            }
          })
        }
      },
      goregisterpwd(){//重置密码
        var _this=this;
        var type="";
        if(_this.mobileType==true){
          type="mobile"
          _this.lowpassword.email="";
        }
        else{
          type="email";
          _this.lowpassword.mobile="";
        }
        if(this.respassword!=this.respasswordagain){
          _this.$notify({
            title: '提示',
            message: '修改失败，；两次密码输入不一致',
            type: 'error',
            duration:'1000',
          });
        }
        if(this.respassword==this.respasswordagain){
          ajax(this,this.extendApi.resgestpwd,{
            mode:type,
            mobile:_this.lowpassword.mobile,
            code:_this.viladtecode,
            email:_this.lowpassword.email,
            newPwd:_this.respassword,
            country:'CN'
          },function(response){
            if(response.code==200){
               _this.$notify({
                title: '成功',
                message: '重置密码成功',
                type: 'success',
                duration:'1000',
              });
              _this.showlogo(1);
              // _this.islogoin=1;
            }else{
              _this.$notify({
                title: '提示',
                message: response.message,
                type: 'error',
                duration:'1000',
              });
            }
          })
        }else{
           _this.$notify({
            title: '提示',
            message: '两次密码不一致',
            type: 'error',
            duration:'1000',
          });
        }  
      },
      showlogo(num){
        clearTimeout(this.hidetime)
        if(num==1){
          this.showss=true;
          this.resgist=false;
          this.forgot=false;
        }else{
          this.showss=false;
          this.resgist=true;
          this.forgot=false;
        }
      },
      hidelogo(num){
        if(num==1){
          this.hidetime=setTimeout(()=>{
            this.showss=false;
          },2000)
         
        }else if(num==3){
          this.hidetime=setTimeout(()=>{
            this.resgist=false;
          },2000)
          
        }else if(num==4){
          this.hidetime=setTimeout(()=>{
            this.forgot=false;
          },2000)
          
        }else if(num==5){
          this.hidetime=setTimeout(()=>{
            this.resetpassword=false;
          },2000)
        }else{
          this.shwomoney=false;
        }
      },
      zhuce(){
        this.showss=false;
        this.resgist=true;
        this.forgot=false;
      },
      forgotpass(){
        this.showss=false;
        this.forgot=true;
      },
      next(){
        this.forgot=false;
        this.resetpassword=true;
      },
    }
  }
</script>
<style>
  .tradecomLogin{
    .logincom{
      position: absolute!important;
      z-index: 2000;
      left: -100px;
      width: 200px;
      background-color: #232325;
      color: #ff6600;
      text-align: center;
      padding: 0px 20px 20px 20px;
      .auto-tip{
        top:95px!important;
        width: 220px!important;
        left: 20px!important;
        max-height: 180px;
        overflow: auto;
        li{
          padding: 0 4px;
          text-align: left;
        }
        li:hover{
          width:218px;
          height:30px ;
          text-align: left!important;
        }
      }
      .title1{
        font-size: 16px;
        color: #ff6600!important;
        line-height: 60px!important;
        text-align: center;
        width: 100%;
      }
      input{
        display: inline-block;
        background-color: transparent;
        width: 100%;
        height: 34px;
        border: 1px solid #ff6600;
        outline: none;
        padding: 4px 0 4px 4px !important;
        color: #fff;
       
      }
      .cons{
        margin-top: 10px;
      }
      .codeinput{
        width: 140px;
      }
      .codeButton{
        border:0px;
        padding: 0 5px;
        height: 34px;
      }
      .inbox{
        .logom{
          width: 50%;
          float: left;
        }
        .loemail{
          width: 55%;
        }
        button{
          width: 40%;
          height: 34px;
          margin-left: 10px;
          /*margin-top: 20px;*/
          margin-top: 10px;
          background: #ff6600;
          border: 0;
          font-size: 14px;
          color: #232425;
          float: right;
        }
        .getcods{
          width: 35%;
        }
      }
      .logom{
         margin-top: 10px;
      }
      .register-switch {
        float: left;
        cursor: pointer;
        line-height: 60px;
        color: #999;
        font-size: 12px;
      }
      .forget-pwd {
        float: right;
        cursor: pointer;
        color: #999;
        font-size: 12px;
        line-height: 60px;
      }
      .login-btn {
        display: block;
        width: 100%;
        /*margin: 60px auto 0 auto;*/
        margin: 40px auto 0 auto;
        line-height: 30px;
        background-color: #ff6600;
        color: #232325;
        border: none;
        height: 30px;
        font-size: 14px;
        font-weight: bold;
        padding-bottom: 30px;
      }
    }
    .logins:hover .user-num{
      color: #ff6600;
      padding-left: 25px;
      background-image: url(../../assets/img/head-portrait1.png);
      background-position: left center;
      background-repeat: no-repeat;
      background-size: 20px;
    }
    .parentCls{
      /*height: 260px!important;*/
      height: auto;
    }
  }
</style>