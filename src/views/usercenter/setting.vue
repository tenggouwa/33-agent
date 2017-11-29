<template>
  <div class="set-block">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="修改登录密码" name="first" class="part1">
        <el-form label-width="100px" class="set-content">
          <el-form-item label="原密码：">
            <el-input v-model="phoneForm.name" placeholder="请输入您的原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码：">
            <el-input v-model="phoneForm.newpass" placeholder="请输入您的新密码"></el-input>
          </el-form-item>
          <el-form-item label="重复密码：">
            <el-input v-model="phoneForm.newagain" placeholder="请输入您的新密码"></el-input>
          </el-form-item>
          <div class="button-line">
            <el-button @click="passwordcommit">确认</el-button>
          </div>
          <p class="cue">密码请不要太简单，建议为字母、数字和符号的组合。</p>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="修改支付密码" name="second" class="part2">
        <el-form label-width="110px" class="set-content">
          <el-form-item label="支付密码：">
            <el-input v-model="phoneForm.name" placeholder="请输入您的原密码"></el-input>
          </el-form-item>
          <el-form-item label="重复支付密码：">
            <el-input v-model="phoneForm.name" placeholder="请输入您的新密码"></el-input>
          </el-form-item>
          <el-form-item label="手机验证码：">
            <el-input v-model="phoneForm.name" placeholder="请输入短信验证码"></el-input>
          </el-form-item>
          <div class="button-line">
            <button>确认</button>
          </div>
          <p class="cue">支付密码必须由6位纯数字组成</p>
        </el-form>
      </el-tab-pane> -->
      <!-- 谷歌验证暂时去除 -->
      <!-- <el-tab-pane label="谷歌验证" name="third">
        <h2>Google Authenticator设置</h2>
        <p>您可以依照下面的步骤来设置并启用这一功能，也可参考谷歌官网教程安装使用,点击进入谷歌官方教程</p>
        <h3>步骤一：在您的手机上安装双重验证程序：Google Authenticator.</h3>
        <p>Iphone手机（在App Store中搜索Google Authenticator）</p>
        <p>Android手机（在应用市场中搜索“谷歌身份验证器”，或搜索Google Authenticator）</p>
        <h3>步骤二：安装完成后，您需要对该应用程序进行如下配置.</h3>
        <div class="configure-box">
          <p>1. 打开“Google Authenticator (身份验证器)” ,点击开设设置,在添加账户中“添加账户(iOS 下是 + 号)”，然后选择“扫描条形码。</p>
          <p>2. 将手机上的相机镜头对准下图扫描该条形码。(如果您安装 谷歌身份验证器后，但不能扫描条形码，会要求安装扫描器)</p>
          <p>3. 如果您无法扫描成功上图的条形码，您还可以手动添加账户，并输入如下密匙：7KQD7RQXPLYD4NFZ</p>
        </div>
        <h3>步骤三：配置完成</h3>
        <el-form label-width="110px" class="set-content">
          <el-form-item label="支付密码：">
            <el-input v-model="phoneForm.name"></el-input>
          </el-form-item>
          <el-form-item label="重复支付密码：">
            <el-input v-model="phoneForm.name"></el-input>
          </el-form-item>
          <el-form-item label="手机验证码：">
            <el-input v-model="phoneForm.name"></el-input>
          </el-form-item>
          <div class="button-line">
            <button>提交</button>
          </div>
          <p class="cue">支付密码必须由6位纯数字组成</p>
        </el-form>
      </el-tab-pane> -->
    </el-tabs>
    <loginHistory></loginHistory>
  </div>
</template>

<script>
import loginHistory from "./loginHistory.vue"
import {ajax,quit} from "../../assets/js/common.js"
export default{
  data(){
    return{
      authTab:0,
      activeName: 'first',
      // 提交
      passForm:{
        password:'',
        newpassword:'',
        password2:'',
      },
      interForm:{
        name:""
      },
      phoneForm:{
        name:'',
        newpass:'',
        newagain:'',
      },
      emailForm:{}
    }
  },
  components:{
    loginHistory
  },
  methods:{
    handleClick(){
      // changePassword
      
    },
    passwordcommit(){
      let that = this;
      if(that.phoneForm.name && that.phoneForm.newpass && that.phoneForm.newagain){
        if(that.phoneForm.newpass == that.phoneForm.newagain){
          that.passForm.password = that.phoneForm.name;
          that.passForm.newpassword = that.phoneForm.newpass;
          that.passForm.password2 = that.phoneForm.newagain;
          ajax(that,that.extendApi.changePassword,that.passForm,(params)=>{
            if(params.code == 200){
              that.$notify({
                title: '提示',
                message: "密码修改成功,请重新登录",
                type: 'success',
                duration:'1500',
              })
              quit(that,1);
            }else{
              that.$notify({
                title: '提示',
                message: res.message,
                type: 'warning',
                duration:'1500'
              })
            }
          },'POST');
        }else{
          that.$notify({
            title: '提示',
            message: "重复密码与新密码不一致",
            type: 'warning',
            duration:'1500'
          })
        }
      }else{
        that.$notify({
          title: '提示',
          message: "请完全填写密码",
          type: 'warning',
          duration:'1500'
        })
      }
    },
  }
}
</script>

<style>
.set-block{
  .set-content{
    width: 420px;
    margin: 0 auto;
  }
}
</style>