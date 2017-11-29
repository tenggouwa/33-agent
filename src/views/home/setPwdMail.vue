<template>
  <div class="set-pwd-mail">
    <index-header></index-header>
    <div class="content-box">
      <div class="content-box-in">
        <h2>修改密码</h2>
        <div class="login-line">
          <span><i class="iconfont icon-mima"></i></span>
          <input class="input" v-model="setParam.password" type="password" placeholder="请输入您的新密码">
        </div>
        <div class="login-line">
          <span><i class="iconfont icon-mima"></i></span>
          <input class="input" v-model="setParam.password2" type="password" placeholder="请重复输入您的新密码">
        </div>
        <div class="btn-line">
          <el-button :loading="setLoad" @click="reSetPwd">确定</el-button>
        </div>
      </div>
      
    </div>
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from "../../components/header.vue"
import indexFooter from "../../components/footer.vue"
import {ajax} from "../../assets/js/common.js"
  export default{
    data(){
      return{
        setParam:{
          password:"",
          password2:"",         
        },
        setLoad:false,
        setToken:""
      }
    },
    mounted(){
      this.$nextTick(()=>{
        let route=this.$route;
        console.log(route);
        this.setToken=route.query.resettoken;
      })
    },
    methods:{
      reSetPwd(){
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
          resettoken:this.setToken,
          password:this.setParam.password,
          password2:this.setParam.password2,
          os:"web",
          type:"email",
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
            this.$router.push("/index");
          }
        },'post');
      },
    },
    components:{
      indexHeader,
      indexFooter,
    },
  }
</script>
<style>
  .set-pwd-mail{
    .login-line{
      width: 330px;
      height: 50px;
      line-height: 50px;
      margin: 0 auto;
      border:1px solid #dcdcdc;
      text-align: left;
      margin-bottom: 20px;
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
    }
    .content-box{
      padding-top: 225px;
      width: 900px;   
      margin:0 auto 150px;
      /*background-color: #fff;*/
      h2{
        height: 80px;
        line-height: 80px;
        font-size: 24px;
        background-color: #1a5f9b;
        color: #fff;
        margin-bottom: 60px;
      }
      .btn-line{
        margin-top: 50px;
        width: 330px;
        margin: 50px auto 0;
        button{
          width: 100%;
          border: none;
          background-color: #1a5f9b;
          color: #fff;
          border-radius: 0;
          height: 50px;
          line-height: 50px;
          padding-top: 0;
        }
      }
      &-in{
        /*margin-top: 200px;*/
        height: 400px;
        background-color: #fff;
      }
    }
  }
</style>