<template>
  <div class="identify-block">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="身份认证" name="first" class="part1">
        <identBox></identBox>
      </el-tab-pane>
      <el-tab-pane label="手机验证" name="second" class="part2">
        <el-form label-width="100px" class="phone-bind" v-show="!mobileBind">
          <el-form-item label="所在地：">
            <!-- <el-input v-model="phoneForm.name"></el-input> -->
            <el-select v-model="phonecheck.area" placeholder="请选择" @change="changecountry">
              <el-option
                v-for="item in options"
                :key="item.code"
                :label="item.ch_name"
                :value="item.code"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码：">
            <el-input v-model="phonecheck.mobile" placeholder="请输入您的手机号码"></el-input>
          </el-form-item>
          <el-form-item label="手机验证码：">
            <el-input v-model="phonecheck.code" placeholder="请输入短信验证码" class="phoneinput"></el-input>
            <el-button class="phonebtn fr" @click="phoneChecked()" v-if="codestate==0" :loading="codeload">点击获取验证码</el-button>
            <el-button class="phonebtn fr" v-if="codestate==1">已发送{{secondNum}}</el-button>
          </el-form-item>
          <div class="button-line">
            <el-button @click="commitphone" :loading="codeload2">提交</el-button>
          </div>
          <p class="cue">温馨提示：我们将严格对用户的所有资料进行保密。</p>
        </el-form>
        <div class="showBox" v-show="mobileBind">
          <p class="line1">手机已验证</p>
          <p class="line2">您的手机号码是：<span>{{mobileNum|filterNumHide}}</span> </p>
        </div>      
      </el-tab-pane>
      <el-tab-pane label="邮箱验证" name="third" class="part3">
        <el-form label-width="100px" class="phone-bind" v-show="!emailBind">
          <el-form-item label="电子邮箱：">
            <el-input v-model="emailForm.email" placeholder="请输入您需要绑定的电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="验证码：">
            <el-input class="phoneinput" v-model="emailForm.code" placeholder="请输入邮箱验证码"></el-input>
            <el-button class="phonebtn fr" @click="sendemail" v-if="codestate==0" :loading="codeload">点击获取验证码</el-button>
            <el-button class="phonebtn fr" v-if="codestate==1">已发送{{secondNum}}</el-button>
          </el-form-item>
          <div class="button-line">
            <el-button @click="commitEmail" :loading="codeload2">提交</el-button>
          </div>
          <p class="cue">温馨提示：我们将严格对用户的所有资料进行保密。</p>
        </el-form>
        <div class="showBox" v-show="emailBind">
          <p class="line1">邮箱已验证</p>
          <p class="line2">您的邮箱是：<span>{{emailNum|filterNumHide('email')}}</span> </p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {ajax,getstate,sendCode,sendEmail} from "../../assets/js/common.js"
import identBox from "./identItem.vue"
export default{
  data(){
    return{
      fileList:[],
      value:'',
      activeName: 'first',
      phoneForm:{

      },
      options:[],
      interOptions: [],
      phonecheck:{
        codetype:-1,
        mobile: '',
        area:'',
      },
      emailForm:{
        email:'',
        code:""
      },
      gid:"",
      userState:{},
      emailNum:"",
      mobileNum:"",
      emailBind:false,
      mobileBind:false,
      codestate:0,
      secondNum:60,
      reltime:"",
      codeload:false,//点击验证码获取加载
      codeload2:false,//提交加载
    }
  },
  components:{
    identBox
  },
  mounted(){
    this.$nextTick(()=>{
      this.country();
      getstate(this,(data)=>{
        if(data.data.states.email.statu==1){
          this.emailBind=true;
          this.emailNum=data.data.states.email.data.email;
        }
        if(data.data.states.mobile.statu==1){
          this.mobileBind=true;
          this.mobileNum=data.data.states.mobile.data.mobile;
        }
      });
    });    
  },
  methods:{
    handleClick(){

    },
    // 获取国家
    country(){
      ajax(this,this.extendApi.phoneCountry,'',(res)=>{
        if(res.code == 200){
          this.options = res.data;
        }
      },'GET');
    },
    //国家手机代号
    changecountry(val){
      console.log(this.phonecheck.area);
    },
    // 获取验证码
    phoneChecked(){
      if(this.phonecheck.area==""){
        this.$notify({
          title: '提示',
          message: '所在地不能为空',
          type: 'warning',
          duration:'2000'
        });
        return false;
      }
      if(this.phonecheck.mobile==""){
        this.$notify({
          title: '提示',
          message: '手机号码不能为空',
          type: 'warning',
          duration:'2000'
        });
        return false;
      }
      let param={
        codetype:"validate",
        param:"FzmRandom",
        area:this.phonecheck.area,
        mobile:this.phonecheck.mobile,
      };
      this.codeload=true;
      sendCode(this,param,(data)=>{
        this.codeload=false;
        if(data.code==200){
          this.gid = data.data.gid;
        }
      });
    },
    // 提交手机验证
    commitphone(){
      this.codeload2=true;
      let param={};
      for(let x in this.phonecheck){
        param[x]=this.phonecheck[x];
      }
      param.gid=this.gid;
      ajax(this,this.extendApi.phoneCommit,param,(res)=>{
        this.codeload2=false;
        if(res.code == 200){
          this.$notify({
            title: '提示',
            message: '验证成功',
            type: 'success',
            duration:'2000'
          });
          this.getstate();
        }
      },'POST')
    },
    // 邮箱验证码发送
    sendemail(){
      if(this.emailForm.email==""){
        this.$notify({
          title: '提示',
          message: '邮箱不能为空',
          type: 'warning',
          duration:'2000'
        });
        return false;
      }
      let param={
        codetype:"validate",
        param:"FzmDateTime|FzmRandom",
        email:this.emailForm.email
      }
      this.codeload=true;
      sendEmail(this,param,(data)=>{
        this.codeload=false;
        if(data.code==200){
          this.gid = data.data.gid;
        }
      });
    },
    //提交email验证
    commitEmail(){
      this.codeload2=true;
      let param={
        email:this.emailForm.email,
        code:this.emailForm.code
      };
      ajax(this,this.extendApi.emailCommit,param,(data)=>{
        this.codeload2=false;
        if(data.code == 200){
          this.$notify({
            title: '提示',
            message: '验证成功',
            type: 'success',
            duration:'2000'
          });
          this.getstate();
        }
      },'POST')
    }
  }
}
</script>

<style>
.identify-block{
  .showBox{
    text-align: center;
    line-height: 1;
    width: 420px;
    margin: 30px auto 70px auto;
    .line1{
      color: #1a6fa6;
      font-size: 20px;
      text-align: center;
      background: url("../../assets/img/usercenter/success.png") no-repeat 34%;
      padding: 16px 0;
      padding-left: 16%;
    }
    .line2{
      font-size: 16px;
      color: #333;
      margin-top: 30px;
      span{
        color: #1a6fa6;
      }
    }
  }
  .part1{
    .button-line{
      margin-top: 50px;
      margin-bottom: 60px;
    }
  }
  .part2{
    .button-line{
      margin-top: 50px;
      margin-bottom: 20px;
    }    
  }
  .phone-bind{
    width: 420px;
    margin: 0 auto;
    .phoneinput{
      width: 165px;
    }
    .phonebtn{
      width: 150px;
    }
  }
  .inter-user{
    .el-form{
      /*display: inline-block;*/
      width: 410px;
      margin-left: 40px;
      .el-form-item{
        margin-bottom: 30px;
      }
    }
    
    .png-box{
      width: 480px;
      border-right:1px solid #eee;
      padding-right: 50px;
      .tip{
        font-size: 14px;
        margin-bottom: 30px;
        color: #999;
        span{
          font-size: 16px;
          color: #1a6fa6;
        }
      }
      .tip-word{
        font-size: 14px;
        color: #666;
        margin-top: 40px;
        .iconfont{
          color: #cf0101;
          font-size: 22px;
          vertical-align: middle;
        }
      }
      .paper-list{
        li{
          width: 200px;
          height: 200px;
          border:1px solid #e5e5e5;
          text-align: center;
          padding-top: 45px;
          overflow: hidden;
          p{
            margin-top: 12px;
            font-size: 16px;
            color: #333;
          }
        }
        li:hover{
          border-color: #73b4f3;
        }
        .item1{          
          background: url("../../assets/img/usercenter/positive.png") bottom center no-repeat;
        }
        .item2{
          background: url("../../assets/img/usercenter/hold.png") bottom center no-repeat;
        }
      }
    }
  }
  .auth-tab{
    padding:70px 130px;
    overflow: hidden;
    .zh{
      margin-top: 30px;
      margin-bottom: 10px;
    }
    .en{
      color:#999;
    }
    li{
      width: 290px;
      /*height: 290px;*/
      border:1px solid #e5e5e5;
      text-align: center;
      font-size: 16px;
      color: #333;
      padding-top: 60px;
      padding-bottom: 35px;
      line-height: 1;
      cursor: pointer;
    }
    li:hover{
      border-color: #1a6fa6;
    }
  }
}
</style>