<template>
  <div v-loading="popupVisible2" element-loading-text="上传中，请稍候">
    <div class="ident-box">
      <ul class="auth-tab" v-show="authTab===0">
        <li class="fl domestic" @click='authTab=1'>
          <img src="../../assets/img/usercenter/domestic.png" alt="">
          <p class="zh">国内用户</p>
          <p class="en">Domestic users</p>
        </li>
        <li class="fr abroad" @click='authTab=2'>
          <img src="../../assets/img/usercenter/abroad.png" alt="">
          <p class="zh">国际用户</p>
          <p class="en">International users</p>
        </li>
      </ul>
      <!-- <div class="inter-user" v-show="authTab===1">
        <div class="png-box fl" >
          <p class="tip">
            <span>上传证件材料</span>（您的照片仅用于审核，我们将为您严格保密）
          </p>
          <ul class="paper-list">
            <li class="item1 fl">
              <img src="../../assets/img/usercenter/add.png" alt="">
              <p>身份证正面照片</p>
            </li>
            <li class="item2 fr">
              <img src="../../assets/img/usercenter/add2.png" alt="">
              <p>手持身份证正面照片</p>
            </li>
          </ul>
          <div class="clearfix"></div>
          <p class="tip-word">
            <i class="iconfont icon-fengxiantishi"></i>
            证件必须是清晰彩色原件电子版，证件上文字清晰可见；请上传后缀名为jpg jpeg png的照片，照片最大尺寸为2M；
          </p>
        </div>
        <el-form label-width="90px" class="fr">
          <el-form-item label="姓名：">
            <el-input v-model="interForm.name" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item label="证件类型：">
            <el-input v-model="interForm.name"></el-input>
          </el-form-item>
          <el-form-item label="证件号码：">
            <el-input v-model="interForm.name" placeholder="请输入您的证件号码"></el-input>
          </el-form-item>
        </el-form>
        
        <div class="clearfix"></div>
        <div class="button-line">
          <button>提交验证</button>
          <button @click="authTab=0">返回上级</button>
        </div>
      </div> -->
      <div class="inter-user" v-show="authTab===2||authTab===1">
        <div class="png-box fl" >
          <p class="tip">
            <span>上传证件材料</span>（您的照片仅用于审核，我们将为您严格保密）
          </p>
          <ul class="paper-list">
            <div class="fl">
              <el-upload
                class="upload-demo"
                :action="extendApi.uploadImg"
                :on-progress="handProgress"
                :on-success="handleSuccess"
                :on-error="handleError"
                :on-change="handleChange"
                :file-list="fileList"
                :headers="imgHead"
                :show-file-list="false"
                name="myfile"
                :data="imgData">                
                <li class="item1" >
                  <img v-show="cerImg.thumbImage" :src="cerImg.thumbImage" alt="">
                  <img src="../../assets/img/usercenter/add.png" alt="" v-show="!cerImg.thumbImage">
                  <p v-show="!cerImg.thumbImage">身份证正面照片</p>
                </li>
              </el-upload>
            </div>
            
            <div class="fr">
              <el-upload
                class="upload-demo"
                :action="extendApi.uploadImg"
                :on-progress="handProgress"
                :on-success="handleSuccess2"
                :on-error="handleError"
                :on-change="handleChange"
                :file-list="fileList"
                :headers="imgHead"
                :show-file-list="false"
                name="myfile"
                :data="imgData">
                <li class="item2">
                  <img v-show="handImg.thumbImage" :src="handImg.thumbImage" alt="">
                  <img src="../../assets/img/usercenter/add2.png" alt="" v-show="!handImg.thumbImage">
                  <p v-show="!handImg.thumbImage">手持身份证正面照片</p>
                </li>
              </el-upload>
            </div>
          </ul>
          <div class="clearfix"></div>
          <p class="tip-word">
            <i class="iconfont icon-fengxiantishi"></i>
            证件必须是清晰彩色原件电子版，证件上文字清晰可见；请上传后缀名为jpg jpeg png的照片，照片最大尺寸为2M；
          </p>
        </div>
        <el-form label-width="90px" class="fr">
          <el-form-item label="姓名：">
            <el-input v-model="interForm.name" placeholder="请输入您的姓名"></el-input>
          </el-form-item>
          <el-form-item label="国籍：">
            <el-select v-model="interForm.country" placeholder="请选择国籍">
              <el-option
                v-for="item in countryOptions"
                :key="item.sname"
                :label="item.ch_name"
                :value="item.sname">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型：">
            <el-select v-model="interForm.type" placeholder="请选择证件类型">
              <el-option
                v-for="item in interOptions"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：">
            <el-input v-model="interForm.cardId" placeholder="请输入您的证件号码"></el-input>
          </el-form-item>
        </el-form>      
        <div class="clearfix"></div>
        <div class="button-line">
          <el-button :loading="popupVisible3" @click="goauth">提交验证</el-button>
          <button @click="authTab=0">返回上级</button>
        </div>
      </div>
      <div class="showBox" v-show="authTab==3">
        <p class="line1">已实名验证</p>
        <p class="line2">您的真实姓名：<span>{{identMsg.name}}</span> </p>
        <p class="line2">您的证件号码是：<span>{{identMsg.cardid}}</span> </p>
      </div>
    </div>
  </div>
</template>

<script>
import {ajax,getstate,setcookie,getcookie} from "../../assets/js/common.js"
import identBox from "./identItem.vue"
export default{
  data(){
    return{
      fileList:[],
      popupVisible2:false,
      popupVisible3:false,
      imgToken:"",
      deadline:"",
      imgHead:{
        "FZM-Ca-AppKey":'fxee'
      },
      imgData:{
        'token':"",
        "idtype":1,
      },
      cerImg:{
        'mid':"",
        "thumbImage":"http://images.33.cn/upload/fxee/20171102/2017110216114956215057_water.png"
      },
      handImg:{
        'mid':"",
        "thumbImage":"http://images.33.cn/upload/fxee/20171102/2017110216114956215057_water.png"
      },
      value:'',
      authTab:0,
      activeName: 'first',
      
      interForm:{
        name:"",
        type:"",
        cardId:"",
        country:"",
      },
      interOptions: [],
      countryOptions: [],
      defaultCountry:[],
      defaultType:[],
      userState:{},
      identMsg:{}
    }
  },
  watch:{
    authTab(val){
      for(let x in this.interForm){
        this.interForm[x]="";
      }
      for(let x in this.cerImg){
        this.cerImg[x]="";
      }
      for(let x in this.cerImg){
        this.handImg[x]="";
      }
      if(val==1){
        this.countryOptions=[
          {
            ch_name:"中国",
            code:"86",
            en_name:"China",            
            is_open:1,
            sname:"CN"
          }
        ];
        this.interForm.country="CN";
        this.interOptions=[
          {
            name:"身份证(identity card)",
            type:1
          }
        ];
        this.interForm.type=1;
      }
      else if(val==2){
        this.countryOptions=this.defaultCountry;
        this.interOptions=this.defaultType;
      }
    },
  },
  components:{
    identBox
  },
  mounted(){
    this.$nextTick(()=>{
      let time1=getcookie('deadline');
      /*获取当前时间戳与上传时间限制相比较*/
      let nowTime=new Date().getTime();
      nowTime=nowTime+60000;//若1分钟后时间到期，重新请求接口
      let state;
      if(nowTime<time1){
        state=1;//时间没到期
      }
      if(time1&&state===1){
        this.imgToken=getcookie("imgToken");
        this.deadline=getcookie("deadline");
      }
      else{
        this.getImgState();
      }
      this.country();
      this.getCardType();
      getstate(this,(data)=>{
        if(data.data.states.identity.statu==1){
          this.authTab=3;
          this.identMsg=data.data.states.identity.data;
        }
      });
    });    
  },
  methods:{
    /*获取图片上传token*/
    getImgState(){
      let param={
        provider:'service',
      };
      ajax(this,this.extendApi.getImgToken,param,(data)=>{
        if(data.code==200){
          this.imgToken=data.data.token;
          this.deadline=data.data.deadline*1000;
          setcookie('imgToken',data.data.token);
          setcookie('deadline',this.deadline);
        }
      },'post');
    },
    /*上传相关方法*/
    handleChange(file, fileList){
      this.imgData.token=this.imgToken;    
    },
    handProgress(event, file, fileList){
      this.popupVisible2=true;
    },
    handleSuccess(response, file, fileList) {     
      this.popupVisible2=false;
      if(response.code==200){
        this.cerImg=response.data;
        this.$notify({
          title: '提示',
          message:'上传成功',
          type: 'success',
          duration:'2000'
        });
        if(this.authTab == 0){
          ajax(this,this.extendApi.ocr,this.cerImg.mid,(res)=>{
            if(res.code == 200){

            }else{

            }
          },'POST')
        }
      }
      else{
        this.$notify({
          title: '提示',
          message:response.message,
          type: 'error',
          duration:'2000'
        });
      }    
    },
    handleSuccess2(response, file, fileList) {
      this.popupVisible2=false;
      if(response.code==200){
        this.handImg=response.data;
        this.$notify({
          title: '提示',
          message:'上传成功',
          type: 'success',
          duration:'2000'
        });
      }
      else{
        this.$notify({
          title: '提示',
          message:response.message,
          type: 'error',
          duration:'2000'
        });
      }
    },
    handleError(err, file, fileList){
      this.$notify({
        title: '提示',
        message:'上传失败，请重新上传',
        type: 'error',
        duration:'2000'
      });
      this.popupVisible2=false;
    },
    /*点击验证按钮*/
    goauth(){
      if(this.cerImg.thumbImage==""){
        this.$notify({
          title: '提示',
          message:'请先上传身份证正面照',
          type: 'warning',
          duration:'2000'
        });
        return false;
      }
      if(this.handImg.thumbImage==""){
        this.$notify({
          title: '提示',
          message:'请先上传手持身份证照',
          type: 'warning',
          duration:'2000'
        });
        return false;
      }
      if(this.interForm.name==""){
        this.$notify({
          title: '提示',
          message:'请输入姓名',
          type: 'warning',
          duration:'2000'
        });
        return false;
      }     
      if(this.interForm.type==""){
        this.$notify({
          title: '提示',
          message:'请选择证件类型',
          type: 'warning',
          duration:'2000'
        });
        return false;
      }
      if(this.interForm.cardId==""){
        this.$notify({
          title: '提示',
          message:'请输入证件号码',
          type: 'warning',
          duration:'2000'
        });
        return false;
      }      
      let param={
        country:this.interForm.country,
        cardtype:this.interForm.type,
        cardid:this.interForm.cardId,
        name:this.interForm.name,
        mid:this.cerImg.mid,
        matchmid:this.handImg.mid
      };
      this.popupVisible3=true;
      ajax(this,this.extendApi.Certification,param,(data)=>{
        this.popupVisible3=false;
        if(data.code==200){
          this.$notify({
            title: '提示',
            message:'认证成功',
            type: 'success',
            duration:'2000'
          });
          this.authTab=3;
        }
      },'post');
    },
    /*获取证件类型*/
    getCardType(){
      ajax(this,this.extendApi.cardType,"",(data)=>{
        if(data.code==200){
          this.defaultType=data.data;
          if(this.authTab==1){
            this.interOptions=[
              {
                name:"身份证(identity card)",
                type:1
              }
            ];
            this.interForm.type=1;
          }
          else if(this.authTab==2){
            this.interOptions=this.defaultType;           
          }          
        }
      },'GET');
    },
    // 获取国家
    country(){
      let that = this;
      ajax(that,that.extendApi.phoneCountry,'',(res)=>{
        if(res.code == 200){
          this.defaultCountry=res.data;
          if(this.authTab==1){
            this.countryOptions=[
              {
                ch_name:"中国",
                code:"86",
                en_name:"China",            
                is_open:1,
                sname:"CN"
              }
            ];
            this.interForm.country="CN";
          }
          else if(this.authTab==2){
            this.countryOptions=this.defaultCountry;           
          }       
        }
      },'GET');
    },
  }
}
</script>