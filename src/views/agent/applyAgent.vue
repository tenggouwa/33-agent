<template>
  <div class="apply-block" id="nice">
    <indexHeader></indexHeader>
    <div class="apply-content">
      <div class="banner-box">
        <img src="../../assets/img/apply/banner.png" alt="">
      </div>
      <div class="indextab">
        <el-steps :active="getjindu" :align-center="true">
          <el-step title="填写申请信息"></el-step>
          <el-step title="审核中"></el-step>
          <el-step title="申请通过"></el-step>
        </el-steps>
      </div>
      <div class="apply-form" v-if="show1">
        <div class="tab-line">
          <h2>经纪商申请</h2>
        </div>
        <div class="apply-form-box">
          <div class="left-part part2">
            <h4>经纪商申请标准:</h4>
            <h5>经纪商是具有一定资源并能独立运营的公司、机构或团体。</h5>
            <p>1.经纪商所辖客户交易手续费的一部分作为返佣；</p>
            <p>2.经纪商可自行设置客户的提款手续费标准；</p>
            <p>3.经纪商可招募代理商，并在经纪商后台调整代理商返佣标准；</p>
            <p>4.经纪商所辖客户有不当得利的行为（恶意刷单、利用BUG等），手续费不返还；</p>
            <p>5.经纪商可在后台查看直发客户及代理客户的交易统计表；</p>
          </div>
          <div class="right-part" id="containDiv">
            <el-form v-model="applyform" label-width="138px">
              <el-form-item label="公司/机构名称:">
                <el-input :disabled="showG" v-model="applyform.company" placeholder="请输入您所在的公司或者机构名称"></el-input>
              </el-form-item>
              <el-form-item label="姓名:">
                <el-input :disabled="showG" v-model="applyform.contacts" placeholder="请输入您的姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" class="only">
                <el-input :disabled="showG" v-model="applyform.mobile" placeholder="请输入您的手机号码">
                  <template slot="prepend">
                    <el-select v-model="applyform.mobile_area" placeholder="请选择":disabled="showG" class="selsct">
                      <el-option
                        v-for="item in options"
                        :key="item.code"
                        :label="item.ch_name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </template>
                </el-input>
              </el-form-item>
              
              <el-form-item label="其他联系方式:">
                <el-input :disabled="showG" type="textarea" v-model="applyform.other" placeholder="请输入您的其他联系方式 如：微信、邮箱等"></el-input>
              </el-form-item>
              <el-form-item label="所在地:" class="location-box">
                <el-select :disabled="showG" v-model="applyform.country" class="firstbox" clearable placeholder="所属国家" @change="getcont">
                  <el-option
                    v-for="item in countryOptions"
                    :key="item.sname"
                    :label="item.ch_name"
                    :value="item.sname">
                  </el-option>
                </el-select>
                <el-select :disabled="showG||showSheng" v-model="applyform.area" class="firstbox" clearable placeholder="所属省份">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button :disabled="showG" :class="{enablebtn:showG == true}" @click="applyNow">立即申请</el-button>  
              </el-form-item>
            </el-form>
            <p class="tip">
              *您好，我们尊重每一个客户的隐私。
              一旦提交了以上内容则表明您同意FX66使用以上提供的信息与您联系，为您解答您所咨询的产品及服务。
            </p>
          </div>
        </div>
        <div class="server-block">
          <div class="tt-line">
            <hr>
            <h3>联系我们 快速申请</h3>
            <hr>
          </div>         
          <!-- <h4 class="sub-title">Contact us for quick application</h4> -->
          <h4 class="sub-title">Feel Free to Contact Us</h4>
          <ul class="serverList">
            <li 
              v-for="(item,index) in contactList" 
              @mouseenter="showBtn3('contactList',1,index)" 
              @mouseleave="showBtn3('contactList',0,index)">
              <img v-show="item.state===0" :src="item.baseUrl" alt="">
              <img v-show="item.state===1" :src="item.hoverUrl" alt="">
              <p v-for="i in item.text">{{i}}</p>
            </li>
          </ul>
          <img class="erweima" v-if="erweima == true" src="../../assets/img/fx66kefufu.jpg" width="120px" alt="">
        </div>
      </div>
      <div class="success-apply" v-if="show3">
        <div class="tab-line">
          <h2>经纪商申请</h2>
        </div>
        <p>
          <i class="el-icon-circle-check"></i>
        </p>
        <h5>恭喜您已经成功成为经纪商！</h5>
        <p>您可用现在的账号和密码登录后台！如有疑问，可联系我们！</p>
        <button @click="loginBack">登录后台</button>
      </div>
      <!-- 弹框立即申请 -->
      <div class="dialogapply">
        <el-dialog
        class="dialog-content"
          :visible.sync="dialogVisible">
          <span class="content"><i class="el-icon-circle-check"></i>您的申请已经提交成功！</span>
          <p>我们会尽快通过电话与您沟通，请保持手机畅通，谢谢！</p>
        </el-dialog>
      </div>
      <!-- 弹框登录提示 -->
      <div class="dialogapply">
        <el-dialog
        class="dialog-content"
          :visible.sync="dialogtit">
          <span class="content"><i class="el-icon-information"></i>登录后才可申请经纪商！</span><br>
          <button @click="jumptologin">立即登录</button>
        </el-dialog>
      </div>
      <contactUs></contactUs>
    </div>
    <!-- <contactUs></contactUs> -->
  </div>
</template>

<script>
import indexHeader from "../../components/header.vue"
// import indexFooter from "../../components/footer.vue"
import location from "../../components/location.vue"
import contactUs from "../../components/contantWe.vue"
import {ajax} from "../../assets/js/common.js"
export default{
  data(){
    return{
      showSheng:false,
      options:[],
      getjindu:0,
      showG:false,
      dialogtit:false,
      dialogVisible:false,
      show3: false,
      show1: true,
      applycheck:true,
      applyItem:1,
      locationData:[
        {
          name:"申请代理",
          link:"/apply"
        },
      ],
      contactList:[
        {
          baseUrl:"static/img/apply/phone.png",
          hoverUrl:"static/img/apply/phoneHover.png",
          state:0,
          text:["86-17354718363"],
        },
        // {
        //   baseUrl:"static/img/apply/qq.png",
        //   hoverUrl:"static/img/apply/qqHover.png",
        //   state:0,
        //   text:["4001566899"],
        // },
        {
          baseUrl:"static/img/apply/wx.png",
          hoverUrl:"static/img/apply/wxHover.png",
          state:0,
          text:["fx66kefu"],
        },
      ],
      applyform:{
        company:"",
        contacts:'',
        mobile:"",
        other:'',
        country:"",
        area:'',
        mobile_area:'',
      },
      locationGroup:{
        country:"",
        area:""
      },
      countryOptions:[],
      cityOptions:[],
      serverBlock:[
        {
          name:'1',
          text:"FX66具备一键交易功能，<br/>闪电交易，专业快捷!",
          state:0,
        },
        {
          name:'2',
          text:"FX66具备一键交易功能，<br/>闪电交易，专业快捷!",
          state:0,
        },
        {
          name:'3',
          text:"FX66具备一键交易功能，<br/>闪电交易，专业快捷!",
          state:0,
        },
        {
          name:'4',
          text:"FX66具备一键交易功能，<br/>闪电交易，专业快捷!",
          state:0,
        },
      ],
      countrySize:{
        pid:'',
      },
      erweima:false,
    }
  },
  components:{
    indexHeader,
    contactUs,
    // indexFooter,
    location
  },
  created(){
    document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=0;
  },
  mounted(){
    this.getCountry();
    // this.getStatus();
    this.loginup();
    this.getmobile();
    this.jumpdown();
  },
  methods:{
    //跳转锚点固定
    jumpdown(){
      // document.getElementById('nice').scrollTop =401;
      // window.scrollTo(0,401);
      // console.log(document.documentElement.scrollTop)
      document.documentElement.scrollTop = window.pageYOffset = document.body.scrollTop=400;
      // console.log("11:"+document.documentElement.scrollTop)
      // e = ;
    },
    //跳转后台
    loginBack(){
      window.location.href = 'https://pms.licai.cn/#/';
    },
    //获取国家手机前缀
    getmobile(){
      ajax(this,this.extendApi.phoneCountry,'',(res)=>{
        if(res.code == 200){
          this.options = res.data;
        }else{

        }
      },'GET')
    },  

    //跳转登陆
    jumptologin(){
      this.$router.push({path:"/"});
    },
    //获取是否登陆
    loginup(){
      let e = localStorage.getItem("block_fxeestoken");
      if (e && e!=''){
        this.getStatus();
      }else{
        this.dialogtit=true;
      }
    },
    //获取状态
    getStatus(){
      ajax(this,this.extendApi.applyStatus,'',(res)=>{
        if(res.code == 200){
          // if(res.data.status == 1){//待申请
          //   this.getjindu = 1;
          // }else if(res.data.status == 2){//以申请
          //   this.getjindu = 2;
          //   this.showG = true;
          //   this.applyform = res.data;
          // }else if(res.data.status == 9){//以审核
          //   this.getjindu = 3;
          //   this.showG = true;
          //   this.$notify({
          //     title: '成功',
          //     message: '您的申请已通过审核！',
          //     type: 'success',
          //     duration:'5000'
          //   });
          // }else if(res.data.status == -1){//以拒绝
          //   this.getjindu = 1;
          //   this.showG = false;
          //   this.$notify({
          //     title: '提示',
          //     message: '您的申请已被拒绝！',
          //     type: 'warning',
          //     duration:'2000'
          //   });
          // }
          if(res.data.isApplyed == 1){//以申请
            this.getjindu = 1;
            if(res.data.info.status == 0){//待审核
              this.getjindu = 2;
              this.showG = true;
              this.applyform = res.data.info;
              this.$notify({
                title: '提示',
                message: '您的申请正在审核中！',
                type: 'warning',
                duration:'2000'
              });
            }else if(res.data.info.status == 1){//以通过
              this.show1 = false;
              this.show3 = true;
              this.getjindu = 3;
              this.showG = true;
              this.applyform = res.data.info;
              this.$notify({
                title: '成功',
                message: '您的申请已通过审核！',
                type: 'success',
                duration:'5000'
              });
            }else if(res.data.info.status == -1){//以拒绝
              this.getjindu = 1;
              this.showG = false;
              this.$notify({
                title: '提示',
                message: '您的申请已被拒绝！',
                type: 'warning',
                duration:'2000'
              });
            }
          }else{//未申请

          }
        }else{

        }
      },'POST')
    },
    showBtn3(key,val,index){
      if(val == 1){
        if(index == 1){
          this.erweima = true;
        }
      }else{
        this.erweima = false;
      }
      this[key][index].state=val;     
    },
    //立即申请
    applyNow(){
      ajax(this,this.extendApi.applyToAgent,this.applyform,(data)=>{
        if(data.code == 200){
          this.dialogVisible = true;
          this.getStatus();
        }else{
          this.$notify({
            title: '提示',
            message: data.message,
            type: 'warning',
            duration:'2000'
          });
        }
      },'POST')
      // this.dialogtit=true;
    },
    //获取国家列表
    getCountry(){
      let param = {
        type:'name',
      }
      ajax(this,this.extendApi.phoneCountry,param,(res)=>{
        if(res.code == 200){
          this.countryOptions = res.data;
        }else{

        }
      },'GET');
    },
    //选中省份
    getcont(e){
      this.applyform.area = '';
      this.countrySize.pid = e;
      if(e == 'CN'){
        this.showSheng = false;
        ajax(this,this.extendApi.applyCountry,'',(param)=>{
          if(param.code == 200){
            this.cityOptions = param.data
          }else{

          }
        },'GET')
      }else{
        this.showSheng = true;
      }
      
    },
  }
}
</script>
<style>
.apply-content{
  /* .el-step__head.is-text.is-process{
    background-color:#409eff;
    border-color:#409eff;
  } */
  .selsct{
    i{
      left: 100px !important;
    }
    .el-input__inner{
      width: 130px;
      padding-right: 0px;
      
    }
  }
  .el-button, .el-textarea__inner{
    min-height: 40px;
    max-height: 150px;
  }
}
</style>
<style scoped>
.apply-block{
  /*height: 12000px;*/
  display: block;
.apply-content{
  display: block;
  padding-top:75px;
  .enablebtn{
    background: #d1dbe5 !important; 
    color: #bbb !important;    
  }
  .tt-line{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3{
      font-size: 25px;
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
    font-size: 16px;
    color: #999;
    margin-top: 12px;
  }
  .server-block{
    position: relative;
    /*height: 600px;*/
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    .erweima{
     position: absolute;
     top:0;
     margin-top:150px;
     margin-left:240px;
    }
    .serverList{
      margin-top: 50px;
      padding: 0 400px 70px 400px;
      display: flex;
      justify-content:space-between;
      img{
        margin-bottom:20px;
      }
      p{
        line-height: 1;
        font-size: 20px;
        margin-bottom: 10px;
      }
      p:last-child{
        margin-bottom: 0;
      }
    }
  }
  .apply-form{
    background: #fff;
    width: 1200px;
    margin: 0 auto 20px auto;
    .tab-line{
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 50px;
      height: 80px;
      h2{
        line-height: 80px;
        font-size: 24px;
        font-weight: bold;
      }
    }
    &-box{
      text-align: left;
      margin: 0 75px;            
      color: #333;
      display: flex;
      .change-box{
        text-align: center;
        font-size: 28px;
        line-height: 80px;
        color: #fff;
        width: 30px;
        height: 80px;
        background: #1697f3;
        margin-top: 180px;
      }
      .right-part{
        width: 480px !important;
        /*margin: 0 auto;*/
        /*flex: 1;*/
        margin-left: 40px;
        .tip{
          padding-left: 28px;
          color: #3884d3;
          font-size: 14px;
        }
        .el-form{
          .el-input__inner{
            border-radius: 0;
            border-color: #bfbfbf;
          }
          .el-button{
            display: block;
            width: 100%;
            border: 0;
            border-radius: 0;
            background-color: #0176c3;
            color: #fff;
            height: 40px;
            line-height: 40px;
            padding-top: 0;
          }
          .textareabox{
            textarea{
              width: 342px!important;
              min-height: 70px;
              max-height: 120px;
              border:1px solid #bfcbd9;
              border-radius: 4px;
              padding:8px 10px;
            }
          }
          .location-box{
            .firstbox{
              width: 165px;
            }
            .el-form-item__content{
              display: flex;
            }
            .el-select+.el-select{
              margin-left: 8px;
            }
          }
          
        }
      }
      .left-part{
        width: 530px;
        border:1px solid #e5e5e5;
        padding: 20px;
        position: relative;
        &.part2{
          height: 320px;
        }
        h4{
          font-size: 16px;
          line-height: 1;
        }
        h5{
          color:#0176c3;
          margin-top: 20px;
          font-size: 14px;
        }
        p{
          margin-top: 20px;
          font-size: 14px;
        }
        &:before{
          content: "";
          position: absolute;
          top: 50%;
          right: -10px;
          transform: translateY(-50%);
          display: block;
          border-left: 10px solid #e5e5e5;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }
        &:after{
          content: "";
          position: absolute;
          top: 50%;
          right: -8px;
          transform: translateY(-50%);
          display: block;
          border-left: 8px solid #fff;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }
      }     
    }
  }
  .indextab{
    width: 1200px;
    height: 110px;
    background: #fff;
    margin: 0 auto;
    margin-bottom: 10px;
    padding-left: 280px;
    padding-top: 20px;  
  }
  .success-apply{
    width: 1200px;
    background: #fff;
    margin: 0 auto;
    margin-bottom: 10px;
    .tab-line{
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 50px;
      height: 80px;
      h2{
        line-height: 80px;
        font-size: 24px;
        font-weight: bold;
      }
    }
    p{
      color: #666;
      font-size: 12px;
      i{
        font-size: 50px;
        color: green;
      }
    }
    h5{
        line-height: 80px;
        font-size: 24px;
        font-weight: bold;
    }
    button{
      border: 1px solid #e5e5e5;
      color: #1a6fa6;
      height: 35px;
      width: 120px;
      border-radius: 25px;
      margin-top: 30px;
      margin-bottom: 60px;
      font-size: 16px;
      font-weight: bold;
      transition: all 0.3s ease 0s;
      -moz-transition: all 0.3s ease 0s;
      -webkit-transition: all 0.3s ease 0s;
      -o-transition: all 0.3s ease 0s;
      cursor: pointer;
    }
    button:hover{
      background: #1a6fa6;
      color: #fff;
    }

  }
  .dialogapply{
    .dialog-content{
      width: 1200px!important;
      left: 50%;
      margin-left: -600px;
      button{
        border: 1px solid #e5e5e5;
        color: #1a6fa6;
        height: 35px;
        width: 120px;
        border-radius: 25px;
        margin-top: 30px;
        margin-bottom: 40px;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.3s ease 0s;
        -moz-transition: all 0.3s ease 0s;
        -webkit-transition: all 0.3s ease 0s;
        -o-transition: all 0.3s ease 0s;
        cursor: pointer;
      }
      button:hover{
        background: #1a6fa6;
        color: #fff;
      }
    }
    .content{
      font-size: 24px;
      color: #1a6fa6;
      i{
        font-size: 26px;
        margin-right: 10px;
      }

    }
    p{
      margin-top: 20px;
      margin-bottom: 70px;
    }
  }
  .banner-box{
    height: 400px;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    img{
      height: 100%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  } 
}
}
</style> 