<template>
  <div class="home-wrap">
    <!-- 注册页面 -->
    <div class="login-block" v-if="loginTab===0">
      <div class="contain">
        <!-- <h2>FX66&nbsp;欢迎您注册</h2>
        <h4>Welcome you to join</h4> -->
        <div class="tab-box">
          <span :class='{active:operateType=="mobile"}' @click="operateType='mobile'">手机注册</span>
          <span :class='{active:operateType=="email"}' @click="operateType='email'">邮箱注册</span>
        </div>
        <div class="login-line">
          <span v-if="operateType=='email'"><i class="iconfont icon-tubiao01"></i></span>
          <span class="areaBlock" v-if="operateType=='mobile'">
            <el-select class="areaSelect" v-model="area" placeholder="">
              <el-option
                v-for="item in areaOptions"
                :key="item.code"
                :label="item.ch_name"
                :value="item.code">
              </el-option>
            </el-select>
          </span>
          <input class="input" type="text" v-model="regParam.email" :placeholder="tipWord" @blur="checkPhoneNumber()">
        </div>
        <div class="yanz-line">
          <input class="input" type="text" v-model="regParam.code" placeholder="请输入验证码">
          <button v-if="codestate===0" @click="sendCode()">发送验证码</button>
          <button :class="{bgGrey:codestate===1}" v-if="codestate===1" disabled>已发送{{secondNum}}</button>
          <button v-if="codestate===2" @click="sendCode()">重新发送</button>
        </div>
        <div class="login-line">
          <span><i class="iconfont icon-mima"></i></span>
          <input class="input" type="password" v-model="regParam.password" placeholder="请输入您的密码">
          <i class="iconfont icon-keyboard keyboradIcon"></i>
          <!-- <el-input class="input" type="text" v-model="regParam.password" placeholder="请输入您的密码">
            <i slot="suffix-icon" class="iconfont icon-keyboard"></i>
          </el-input> -->
        </div>
        <div class="tip-line">
          <input v-model="tipNeed" class="input" type="checkbox" id="tip">
          <!-- <label for="tip">
            <span>我已了解风险提示!</span>
          </label> -->
          <span>我已了解<i @click="dialogVisible=true">风险提示</i>!</span>        
          <div class="switch-box">
            <span class="cursor" @click="loginTab=1">立即登录!</span>
          </div>
          <p class="warning" v-show="isRegisted">*该邮箱已注册</p>
          <p class="warning" v-show="isError">*您输入的手机号有误，请重新输入</p>
        </div>
        <div class="submit-line">
          <!-- <button class="loginBtn">登录</button> -->
          <el-button class="regBtn" @click="goreg" :loading="regLoad">注册</el-button>
        </div>
      </div>
    </div>
    <!-- 登录页面 -->
    <div class="login-block" v-if="loginTab===1">
      <div class="contain">
        <!-- <h2>FX66&nbsp;欢迎您登录</h2>
        <h4>Welcome you to join</h4> -->
        <div class="tab-box">
          <span :class='{active:operateType=="mobile"}' @click="operateType='mobile'">手机登录</span>
          <span :class='{active:operateType=="email"}' @click="operateType='email'">邮箱登录</span>
        </div>
        <div class="login-line">
          <span v-if="operateType=='email'"><i class="iconfont icon-tubiao01"></i></span>
          <span class="areaBlock" v-if="operateType=='mobile'">
            <!-- <select v-model="area">
              <option :value="item.code" v-for="item in areaOptions">{{item.ch_name}}</option>
            </select> -->
            <el-select class="areaSelect" v-model="area" placeholder="">
              <el-option
                v-for="item in areaOptions"
                :key="item.code"
                :label="item.ch_name"
                :value="item.code">
              </el-option>
            </el-select>
          </span>
          <input class="input" v-model="loginParam.username" type="text" :placeholder="tipWord">
        </div>
        <div class="login-line">
          <span><i class="iconfont icon-mima"></i></span>
          <input class="input" v-model="loginParam.password" type="password" placeholder="请输入您的密码">
        </div>
       <!--  <div class="yanz-line">
         <input class="input" type="text" v-model="loginParam.password" placeholder="请输入验证码">
         <button v-if="codestate===0" @click="sendLoginCode()">发送验证码</button>
         <button :class="{bgGrey:codestate===1}" v-if="codestate===1">已发送{{secondNum}}</button>
       </div> -->
        <div class="tip-line">
          <span class="cursor" @click="toForgetPassWord()">忘记密码？</span>
          <div class="switch-box">
            <span class="cursor" @click="loginTab=0">立即注册!</span>
          </div>
          <!-- <p class="warning" v-show="">*该邮箱还未注册</p> -->
        </div>
        <div class="submit-line">
          <el-button class="loginBtn cursor" @click="gologin" :loading="buttonLoad">登录</el-button>
        </div>
      </div>
    </div>
    <!-- 手机or邮箱找回密码 -->
    <div class="login-block" v-if="loginTab===2">
      <div class="contain">
        <!-- <h2>找回密码</h2>
        <h4>Retrieve password</h4> -->
        <div class="tab-box">
          <span :class='{active:operateType=="email"}' @click="operateType='email'">邮箱找回</span>
          <span :class='{active:operateType=="mobile"}' @click="operateType='mobile'">手机找回</span>
        </div>
        <div class="login-line" v-if="operateType=='email'">
          <span><i class="iconfont icon-tubiao01"></i></span>
          <input class="input" v-model="setParam.username" type="text" placeholder="请输入您的邮箱">
        </div>
        <div v-if="operateType=='mobile'">
          <div class="login-line">
            <span v-if="operateType=='email'"><i class="iconfont icon-tubiao01"></i></span>
            <span class="areaBlock" v-if="operateType=='mobile'">
              <el-select class="areaSelect" v-model="area" placeholder="">
                <el-option
                  v-for="item in areaOptions"
                  :key="item.code"
                  :label="item.ch_name"
                  :value="item.code">
                </el-option>
              </el-select>
            </span>
            <input class="input" type="text" v-model="setParam.username" :placeholder="tipWord">
          </div>
          <div class="yanz-line">
            <input class="input" type="text" v-model="setParam.resettoken" placeholder="请输入验证码">
            <button v-if="codestate===0" @click="pwdSend()" :loading="codeLoad">发送验证码</button>
            <button :class="{bgGrey:codestate===1}" v-if="codestate===1">已发送{{secondNum}}</button>
            <button v-if="codestate===2" @click="pwdSend()">重新发送</button>
          </div>
          <div class="login-line">
            <span><i class="iconfont icon-mima"></i></span>
            <input class="input" type="password" v-model="setParam.password" placeholder="请输入您的新密码">
            <i class="iconfont icon-keyboard keyboradIcon"></i>
          </div>
          <div class="login-line">
            <span><i class="iconfont icon-mima"></i></span>
            <input class="input" type="password" v-model="setParam.password2" placeholder="请再次输入您的新密码">
            <i class="iconfont icon-keyboard keyboradIcon"></i>
          </div>
        </div>
        
        <div class="tip-line">
          <div class="switch-box">
            <span class="cursor" @click="loginTab=1">返回登录!</span>
          </div>
          <p class="warning" v-show="messageCodeisError">*短信验证码错误</p>
        </div>
        <div class="submit-line">
          <el-button class="loginBtn cursor" @click="" v-if="operateType=='email'" :loading="codeLoad">
            <span v-if="codestate===0" @click="pwdSend()">发送邮件</span>
            <span v-if="codestate===1">已发送{{secondNum}}</span>
            <span v-if="codestate===2" @click="pwdSend()">重新发送</span>
          </el-button>
          <el-button class="loginBtn cursor" @click="reSetPwd" v-if="operateType=='mobile'" :loading="setLoad">修改密码</el-button>
        </div>
      </div>
    </div>
    <!-- 邮箱找回密码 -->
    <div class="login-block" v-if="loginTab===4">
      <div class="contain">
        <h2>找回密码</h2>
        <h4>Retrieve password</h4>
        <div class="login-line">
          <span><i class="iconfont icon-tubiao01"></i></span>
          <input class="input" v-model="setParam.username" type="text" placeholder="请输入您的邮箱">
        </div>
        <div class="tip-line">
          <div class="switch-box">
            <span class="cursor" @click="loginTab=1">返回登录!</span>
          </div>                
        </div>
        <div class="submit-line">
          <el-button class="loginBtn cursor" :loading="codeLoad">
            <span v-if="codestate===0" @click="pwdSend()">发送邮件</span>
            <span v-if="codestate===1" style="background-color: #ccc;">已发送{{secondNum}}</span>
            <span v-if="codestate===2" @click="pwdSend()">重新发送</span>
          </el-button>
          <!-- <el-button class="loginBtn cursor" @click="reSetPwd" v-if="operateType=='mobile'" :loading="setLoad">发送邮件</el-button> -->
        </div>
      </div>
    </div>
    <!-- 登录成功页面 -->
    <div class="login-block" v-if="loginTab===3">
      <div class="contain">
        <p class="user-msg">欢迎您，{{username}} !</p>
        <div class="whole-line">
          <button v-if="hahashenqingnimabi == 0" class="whole-btn cursor" @click="golink('/apply')">申请经纪商</button>
          <button v-if="hahashenqingnimabi == 1" class="whole-btn cursor" @click="golink('/apply')">您的申请正在审核中</button>
          <button v-if="hahashenqingnimabi == 2" class="whole-btn cursor" @click="golink('/apply')">您的申请已通过</button>
          <button v-if="hahashenqingnimabi == 3" class="whole-btn cursor" @click="golink('/apply')">您的申请已被拒绝</button>
          <!-- <button class="whole-btn cursor" @click="golink('/tradecenter')">立即交易</button> -->
        </div>       
        <div class="operate-line">
          <!-- <button class="deep cursor" @click="golink('/myassets')">充币</button>
          <button class="cursor" @click="golink('/myassets')">提币</button> -->
        </div>
      </div>
    </div>
    <el-dialog
      class="statement-box"
      title="FX66平台风险提示及免责声明"
      :visible.sync="dialogVisible">
      <publicWord></publicWord>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="readSure()">我已阅读</el-button>
      </span>
    </el-dialog>


    
    <!-- 验证码 -->
    <div class="msgBox" v-if="fuckfuck">
        <div id="TCaptcha" v-if="fuckfuck" style="width:300px;height:40px;"></div>
    </div>

  </div>
</template>
<script>
import {sublogion,sendEmail,sendCode,ajax,subloginup, getUserData,getcookie} from "../../assets/js/common.js"
import bus from "../../assets/js/bus.js"
import publicWord from "./public.vue"

export default{
  data(){
    return{
      regLoad:false,
      buttonLoad:false,
      setLoad:false,
      codeLoad:false,    
      dialogVisible:false,
      codestate:0,
      secondNum:60,
      reltime:"",
      loginTab:0,
      loginParam:{
        'username':"",
        'password':"",
      },
      regParam:{
        'email':"",
        'password':"",
        'code':"",
      },
      setParam:{
        "username":"",
        'password':"",
        "password2":"",
        "resettoken":"",
      },
      // userInfo:{
        //base:{}
        username:'',
      // },
      operateType:"mobile",
      areaOptions:{},
      area:"86",
      gid:"",
      tipNeed:false,
      isRegisted:false,//邮箱是否已被注册
      isError:false,   //手机号对不对
      messageCodeisError:false, //找回密码短信验证码错误
      ticketNum:'',
      businessId:'',
      dataSrc:'',
      fuckfuck:false,
      alertStatus:false,
      hahashenqingnimabi:0,
    }
  },
  components:{
    publicWord
  },
  computed:{  
    tipWord:function(){
      let val="";
      if(this.operateType=="mobile"){
        val="请输入您的手机号码";
      }
      else{
        val="请输入您的邮箱";
      }
      return val;
    }
  },
  watch:{
    area(val){
      // console.log(val);
    },
    // alertStatus(val){
     
    //   this.addscript();
    // },
    operateType(val){
      for(let x in this.loginParam){
        this.loginParam[x]="";
      }
      for(let x in this.regParam){
        this.regParam[x]="";
      }
      for(let x in this.setParam){
        this.setParam[x]="";
      }    
    },
    loginTab(val){
      // console.log("val:"+val);
      this.area="86";
      //this.operateType="mobile";
      /*if(val!=2){
        this.operateType="mobile";
      }*/
      if(val===1){
        for(let x in this.loginParam){
          this.loginParam[x]="";
        }
      }
      if(val===0){
        for(let x in this.regParam){
          this.regParam[x]="";
        }
      }
      if(val===2||val===4){
        for(let x in this.setParam){
          this.setParam[x]="";
        }
      }
    }
  },
  mounted(){
    // console.log(this.alertStatus);
    this.$nextTick(()=>{
      let token=getcookie("token");
      if(token){
        this.getUserInfo();
        this.loginTab=3;
        this.username = localStorage.getItem('block_fxeesusername');
      }
      else{
        this.loginTab=1;
      }
      bus.$on("goout",()=>{
        this.loginTab=1;
      });
      this.country();
      this.getStatus();
      this.getUserInfo()
    })   
  },
  methods:{
     //获取状态
     getStatus(){
      ajax(this,this.extendApi.applyStatus,'',(res)=>{
        if(res.code == 200){
          if(res.data.isApplyed == 1){//以申请

            if(res.data.info.status == 0){//待审核
              this.hahashenqingnimabi = 1;
            }else if(res.data.info.status == 1){//以通过
              this.hahashenqingnimabi = 2;
            }else if(res.data.info.status == -1){//以拒绝
              this.hahashenqingnimabi = 3;
            }
          }else{//未申请
            this.hahashenqingnimabi = 0;
          }
          console.log(this.hahashenqingnimabi)
        }else{

        }
      },'POST')
    },
    //添加script标签
    addscript(){
      let dom = document.createElement('script');
      console.log(this.dataSrc)
      dom.src = this.dataSrc;
      document.getElementsByTagName('body')[0].appendChild(dom);
      this.fuckfuck = true;
      setTimeout(()=>{
        let capOption={callback :this.cbfn,type:'popup'};
        capInit(document.getElementById("TCaptcha"), capOption);
      },2000)
    },
    //删除script标签
    // deletescript(){
    //   let list = document.getElementsByTagName('script');
    //   for(let i=0; i<list.length; i++){
    //     if(list[i].src.indexOf(this.dataSrc)>-1){
    //       document.getElementsByTagName('body')[0].removeChild(list[i]);
    //     }
    //   }
    // },
    //验证码
    cbfn(retJson){
      if(retJson.ret==0){
        // 用户验证成功,需要校验签名
        this.$notify({
          title: '成功',
          message: '验证通过',
          type: 'success',
          duration:'2000'
        })
        this.ticketNum = retJson.ticket;
        this.pwdSend();
        this.fuckfuck=false;
        sessionStorage.setItem('alertStatus','')
        sessionStorage.setItem('dataSrc','')
        sessionStorage.setItem('businessId','')
        // 销毁上一个验证
        capDestroy();
      }else{       
        //用户关闭验证码页面，没有验证
        capDestroy();
        this.fuckfuck=false;
        sessionStorage.setItem('alertStatus','')
        sessionStorage.setItem('dataSrc','')
        sessionStorage.setItem('businessId','')

      }
    },
    toForgetPassWord(){
      if(this.operateType=='mobile'){
        this.loginTab = 2;
        this.operateType='mobile'
      }else if(this.operateType=='email'){
        this.loginTab = 2;
        this.operateType='email'
      }
    },
    //正则表达式验证手机号码是否正确
    checkPhoneNumber(){
      if(this.operateType == 'mobile'){
        if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.regParam.email))&&this.regParam.email!=''){
          this.isError = true;
          return false;
        }else{
          this.isError = false;
        }
      }
    },
    //重置密码
    reSetPwd(){
      // console.log("this.operateType :"+this.operateType);
      if(this.setParam.resettoken==""){
        this.$notify({
          title: '提示',
          message: '验证码不能为空',
          type: 'warning',
          duration:'1500'
        })
        return false;
      }
      if(this.setParam.password==""){
        this.$notify({
          title: '提示',
          message: '请输入新密码',
          type: 'warning',
          duration:'1500'
        })
        return false;
      }
      if(this.setParam.password2==""){
        this.$notify({
          title: '提示',
          message: '请再次输入新密码',
          type: 'warning',
          duration:'1500'
        })
        return false;
      }
      if(this.setParam.password!=this.setParam.password2){
        this.$notify({
          title: '提示',
          message: '两次输入的密码不同',
          type: 'warning',
          duration:'1500'
        })
        return false;
      }
      let postdata = {
        resettoken:this.setParam.resettoken,
        password:this.setParam.password,
        password2:this.setParam.password2,
        os:"web",
        type:"sms",
      };
      this.setLoad=true;
      ajax(this,this.extendApi.resetPwd,postdata,(data)=>{
        this.setLoad=false;
        if(data.code==200){
          this.$notify({
            title: '提示',
            message: '修改密码成功,请使用新密码登录',
            type: 'success',
            duration:'1500'
          });
          this.loginTab=1;
          this.messageCodeisError = false;
        }else if(data.code==1024){  //该状态码为 验证码错误
          this.messageCodeisError = true;
        }
      },'post');
    },
    //发送验证码
    pwdSend(){
      //this.operateType = "email"
      // console.log("this.operateType :"+this.operateType);
      if(this.setParam.username==""){
        // this.$notify({
        //   title: '提示',
        //   message: this.tipWord,
        //   type: 'warning',
        //   duration:'1500'
        // })
        return false;
      }
      let param={
        os:'web',
        platCode:'04031632e48cd96e',
        ticket:'',
        businessId:'',
        ticket:this.ticketNum,
        businessId:this.businessId
      };
      if(this.operateType=='email'){
        param.email=this.setParam.username;
        param.type="email";
      }
      else{
        param.mobile=this.setParam.username;
        param.area=this.area;
        param.type="sms";
      };
      this.codeLoad=true;
      ajax(this,this.extendApi.resetEmailPassword,param,(data)=>{
        this.codeLoad=false;
        if(data.code==200){
          this.$notify({
            title: '成功',
            message: '短信发送成功',
            type: 'success',
            duration:'1500'
          });
          // 清空ticked
          this.ticketNum='';
          // 判断是否触发腾讯验证码
          if(data.data.isShow ==1){
            this.dataSrc = data.data.data.jsUrl;
            //创建dom script标签
            this.addscript();
            this.businessId = data.data.data.businessId;
          }else{
          }
          // 计时器
          this.codestate=1;
          this.secondNum=60;
          clearInterval(this.reltime);
          this.reltime=setInterval(()=>{
            this.secondNum--;
            if(this.secondNum==0){
              clearInterval(this.reltime);
              this.codestate=2;
              this.secondNum=60;
            }
          }, 1000);
        }
      },'post');
    },
    readSure(){
      this.dialogVisible = false;
      this.tipNeed=true;
    },
    // 获取国家
    country(){
      ajax(this,this.extendApi.phoneCountry,'',(res)=>{
        if(res.code == 200){
          this.areaOptions = res.data;
        }
      },'GET');
    },
    golink(val){
      this.$router.push({path:val});
    },
    //注册时~发送验证码
    sendCode(){
      if(this.regParam.email==""){
        this.$notify({
          title: '提示',
          message: this.tipWord,
          type: 'warning',
          duration:'1500'
        })
        return false;
      };
      let sparam={};
      if(this.operateType=='email'){
        sparam={
          // codetype:'validate',
          param:"FzmDateTime|FzmRandom",
          email:this.regParam.email,
          codetype:'validate',
          platkey:'zhaobi'
        };
        sendEmail(this,sparam,(data)=>{
        });
      }
      else{
        sparam={
          codetype:'validate',
          param:'FzmRandom',
          mobile:this.regParam.email,
          area:this.area,
          platkey:'zhaobi',
        };       
        sendCode(this,sparam,(data)=>{
        });
        
        
      }
      if(sessionStorage.getItem('alertStatus') == 'true'){
        this.alertStatus = true;
        this.dataSrc = sessionStorage.getItem('dataSrc');
        this.businessId = sessionStorage.getItem('businessId');
        this.addscript();
        console.log( this.dataSrc, this.businessId)
      }
      
    },
    //登录时~发送验证码
    sendLoginCode(){
      if(this.loginParam.username==""){
        this.$notify({
          title: '提示',
          message: this.tipWord,
          type: 'warning',
          duration:'1500'
        })
        return false;
      };
      let param={};
      if(this.operateType=='email'){
        param={
          codetype:'validate',
          vparam:"FzmDateTime|FzmRandom",
          email:this.loginParam.username
        };
        sendEmail(this,param,(data)=>{});
      }
      else{
        param={
          codetype:'validate',
          vparam:"FzmRandom",
          mobile:this.loginParam.username,
          area:this.area
        };       
        sendCode(this,param,(data)=>{});
      }
    },
    //注册按钮
    goreg(){
      //验证输入
        if(this.regParam.email==""){
          this.$notify({
            title: '提示',
            message: this.tipWord,
            type: 'warning',
            duration:'1500'
          })
          return false;
        };
        if(this.regParam.code==""){
          this.$notify({
            title: '提示',
            message: '验证码不能为空',
            type: 'warning',
            duration:'1500'
          })
          return false;
        };
        if(this.regParam.password==""){
          this.$notify({
            title: '提示',
            message: '密码不能为空',
            type: 'warning',
            duration:'1500'
          })
          return false;
        };
        if(this.tipNeed==false){
          this.$notify({
            title: '提示',
            message: '请阅读风险提示',
            type: 'warning',
            duration:'1500'
          })
          return false;
        }
      let param={};
      if(this.operateType=="email"){
        param={
          'email':this.regParam.email,
          'password':this.regParam.password,
          'code':this.regParam.code,
          'type':"email",
          // 'checkmethod':"data",
          // 'platform':'fx66',
        };
      }
      else{
        param={
          'mobile':this.regParam.email,
          'password':this.regParam.password,
          'code':this.regParam.code,
          // 'checkmethod':"data",
          'type':"sms",
          'area':this.area,
          // 'platform':'fx66',
        };
      }
      this.regLoad=true;
      subloginup(this,param,(data)=>{
        this.regLoad=false;
        if(data.code==200){         
          this.gologin('reg');
          this.isRegisted = false; 
          this.$notify({
            title: '成功',
            message: '注册成功！',
            type: 'success',
            duration:'1500'
          })
          this.loginTab = 1;
        }else if(data.code == 1001&&this.operateType == 'email'){  //code=1001 代表该邮箱已被注册
          this.isRegisted = true;
        }
      })
    },
    //登录按钮
    gologin(state){
      if(state!='reg'){
        if(this.loginParam.username===""){
          this.$notify({
            title: '提示',
            message:this.tipWord,
            type: 'warning',
            duration:'1500'
          })
          return false;
        }
        if(this.loginParam.password===""){
          this.$notify({
            title: '提示',
            message: '密码不能为空',
            type: 'warning',
            duration:'1500'
          })
          return false;
        }
      }
      let param={
        'redirect_uri':'http://33.cn',
        'os':'web',
        'platform':'fx66',
        'broker_code':'04031632e48cd96e'
      };
      if(this.operateType=='mobile'){
        param.type="sms";
        param.area=this.area;
        if(state=='reg'){
          param.password=this.regParam.password;
          param.mobile=this.regParam.email;
        }
        else{
          param.password=this.loginParam.password;
          param.mobile=this.loginParam.username;
        }      
      }
      else{
        param.type="email";
        if(state=='reg'){
          param.password=this.regParam.password;
          param.email=this.regParam.email;
        }
        else{
          param.password=this.loginParam.password;       
          param.email=this.loginParam.username;
        }  
      }      
      this.buttonLoad=true;      
      sublogion(this,'index',param,(data)=>{
        this.buttonLoad=false;
        if(data.code==200){    
            
          
          this.$notify({
            title: '成功',
            message: '登录成功',
            type: 'success',
            duration:'1500'
          })
          // console.log(localStorage.getItem('block_fxeesusername'))
          if(localStorage.getItem('block_fxeesusername') == null){
            setTimeout(()=>{
              this.getUserInfo();
              this.getStatus();
            },100)
          }else{
            
            
          }
          this.getUserInfo();
          this.getStatus();
          
          // this.userInfo.username = localStorage.getItem('block_fxeesusername');
        }  
      });
    },
    getUserInfo(){
      getUserData(this,(data)=>{
        this.username = data.data.base.username;
      });
    },
  }
}
</script>

<style>
.home-wrap{
  width: 1200px;
  margin: 0 auto;
  position:absolute;
  left: 50%;
  margin-left: -600px;
  top: 0;
  margin-top: 180px;
  .cursor{
    cursor: pointer;
  }
  .login-block{
    width: 390px;
    background-color: rgba(255,255,255,0.4);
    padding: 15px;
    position: absolute;
    right: 0;
    top: 0;
    z-index:50;
    .areaSelect{
      .el-input .el-input__icon{
        font-size: 8px !important;
        right: 2px;
        width: 14px;
      }
      input{
        padding: 0;
        padding-left: 4px;
        padding-right: 14px;
        font-size: 12px;
        border: none;
      }
    }
    .areaBlock{
      select{
        width: 100%;
        height: 96%;
        border: none;
      }
    }
    .tab-box{
      border-bottom: 2px solid #e5e5e5;
      margin-bottom: 30px;
      span{
        display: inline-block;
        font-size: 20px;
        color: #333;
        width: 110px;
        padding-bottom: 20px;
        cursor: pointer;
      }
      span.active{
        border-bottom: 2px solid #1a6fa6;
        margin-bottom: -2px;
        color: #1a6fa6;
      }
    }
    .user-msg{
      font-size: 25px;
      color: #1a6fa6;
    }
    .whole-line{
      margin-top: 50px;

    }
    .operate-line{
      padding-bottom: 50px;
      font-size: 0;
      button{
        width: 150px;
        height: 50px;
        font-size: 18px;
        line-height: 50px;
        background-color: transparent;
        border: 1px solid #d2d2d2;
      }
      button+button{
        margin-left: 20px;
      }
      .deep{
        background-color: #1a6fa6;
        color: #fff;
      }
    }
    .whole-btn{
      width: 100%;
      height: 50px;
      line-height: 50px;
      border:1px solid #d2d2d2;
      background-color: transparent;
      margin-bottom: 20px;
      font-size: 18px;
    }
    .contain{
      background-color: #fff;
      padding: 50px 20px 0 20px;
      color: #333;
      h2{
        font-size: 30px;
        line-height: 1;
      }
      h4{
        line-height: 1;
        font-size: 16px;
        color: #b0b0b0;
        margin-top: 7px;
        margin-bottom: 23px;
      }
      .login-line{
        position: relative;
        width: 310px;
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
        border:1px solid #dcdcdc;
        text-align: left;
        margin-bottom: 10px;
        span{
          display: inline-block;
          width: 50px;
          height: 50px;
          text-align: center;
          border-right: 1px solid #dcdcdc;
          i{
            font-size: 24px;
            color: #ccc;
          }
        }
        .input{
          position: absolute;
          margin-top: 10px;
          padding-left: 10px;  
          line-height: 30px;
          border:0;
          font-size: 14px;
          width: 250px;
        }
        .keyboradIcon{
          font-size: 30px;
          color: #B4B4B4;
          position: absolute;
          left: 270px;
          top: 0px;
        }
      }
      /* .input:focus .login-line{
        border: 1px solid #235ADA;
      } */
      .yanz-line{
        width: 310px;
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
        text-align: left;
        margin-bottom: 10px;
        input{
          border:1px solid #dcdcdc;
          height: 50px;
          /*position: absolute;*/
          /*width: 250px;*/
          padding-left: 10px;  
          line-height: 30px;
          font-size: 14px;
        }
        button{
          width: 130px;
          height: 50px;
          background: #ffe366;
          border: 0;
          position: absolute;
          /*margin-top: -2px;*/
          margin-left: 10px;
          font-size: 14px;
          color: #666;
          cursor: pointer;
        }
        .bgGrey{
          background-color: #eee;
        }
      }
      .tip-line{
        width: 310px;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 26px;
        text-align: left;
        line-height: 1;
        /* display: flex; */
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        input{
          margin-right: 10px;
        }
        i{
          color: #1a6fa6;
          cursor: pointer;
          font-style: normal;
        }
        .switch-box{
          /* flex:1; */
          display: inline-block;
          float: right;
          span{
            color: #1a6fa6;
          }
        }
        .warning{
          color:red;
          padding-top:10px;
        }
      }
      .submit-line{
        padding-bottom: 30px;
        font-size: 0;
        button{
          width: 150px;
          height: 50px;
          font-size: 18px;
          background-color: #1a6fa6;
          border: 0;
          color: #fff;
          border-radius: 0;
        }
        button+button{
          margin-left: 10px;
        }
        /*.loginBtn{
          
        }
        .regBtn{
          
        }*/
      }
    }
  }
  .msgBox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.2);
    z-index: 100;
    text-align: center;
    #TCaptcha{
      /* z-index: 1000000; */
      position: absolute;
      left: 50%;
      margin : -20px 0 0 -150px;
      top: 50%;
    }
    
  }
  
}
</style>