<template>
	<div>
		<div class="placein">
			<p>问题反馈</p>
		</div>
	    <div class="feedback-box">
	    	<p class="tip"><span style="color:#1a6fa6;">*</span>描述</p>
	    	<el-input
		        class="e-input"
		        type="textarea"
		        :rows="7"
		        placeholder="请输入内容"
		        v-model="feedlist.op_content">
		    </el-input>
	    	<p class="tip1">请输入问题描述，我们的工作人员将尽快答复您。</p>
	    	<p class="tip2">附件</p>
	    		<!-- :on-preview="handlePreview" 
	      		:on-remove="handleRemove" 
	      		:on-change="handsuccess" 
            class="upload-demo" 
            ref="upload" 
            action="https://feedback.licai.cn/" 
            drag
          
            :file-list="feedlist.file_name" 
            :auto-upload="false" -->
	      	<el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="addfile">添加图片或把文件拖放到这里</span><br> 
	    	<button class="submit-btn" @click="commit">提交</button>
	  	</div>
      <!-- 弹框 -->
      <div>
        <el-dialog
          class="success"
          :visible.sync="dialogVisible"
          size="tiny">
          <p><i class="iconfont icon-chenggong"></i>非常感谢您的问题反馈！</p>
          <span>我们将会尽快处理您的问题反馈，感谢您的参加！</span>  
        </el-dialog>
      </div>
	</div>
</template>
<script>
// import api from '../../config/api-config'
// import { ajax,setcookie,getcookie} from '../../assets/js/common'
  export default {
    data() {
      return {
        dialogVisible:false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
         feedlist:{
         op_content:'',
         file_name:[],
         user_id:'',
         type:1,
        // title:'',
        },
        fileList:[],
        imageUrl: '',
      }
    },
    methods: {
      //提交弹框
      commit(){
        this.dialogVisible=true;
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    }
    // methods:{
    //    handleRemove(file, fileList) {
    //    console.log(file, fileList);
    //   },
    //   handlePreview(file) {
    //     console.log(file);
    //   },
    //   handsuccess(file,fileList){
    //     console.log(file, fileList);
    //   },
    //   sumbitfeedback(){
    //    console.log(this.fileList);
    //     let _this=this;
    //     _this.feedlist.user_id=getcookie('id');
    //     ajax(_this,_this.extendApi.createFeedback,_this.feedlist,function(success){
    //       if(success.code == 200){
    //         _this.$notify({
    //           code: 200,
    //           message: '创建成功'
    //         });
    //       }else{
    //         _this.$notify({
    //           name: 'error',
    //           message: '文件必须是png,jpg,txt形式而且不能超过500k',
    //           code: 10001,
    //           type: 'common/components/Exception'
    //         });
    //       }
    //     },'POST')
    //   }
    // },
  }
</script>
<style scoped>
.placein{
		border-bottom: 1px solid #ccc;
		p{
			display: inline-block;
			font-size: 24px;
			color: #1a6fa6;
			border-bottom: 2px solid #1a6fa6;
		}
}
.feedback-box{
  /*padding: 0 40px;*/
  .tip{
    font-size: 14px;
    color: #333;
    line-height: 14px;
    padding:15px 0;
    /*margin-left: 40px;*/
  }
  .e-input{
    width: 100%;
    border-radius: 2px;
    /*margin-left: 40px;*/
  }
  .tip1{
    font-size: 12px;
    color: #999;
    line-height: 14px;
    padding:15px 0;
    /*margin-left: 40px;*/
  }
  .tip2{
    font-size: 14px;
    color: #333;
    line-height: 14px;
    /*margin-left: 40px;*/
    padding-bottom: 20px;
  }
  .submit-btn{
    width: 150px;
    height: 40px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin:30px 0 77px 220px;
    font-size: 14px;
    color: #1a6fa6;
    cursor: pointer;
  }
  .submit-btn:hover{
    background: #1a6fa6;
    color: #fff; 
  }
}
/*.el-upload-dragger {
    height: 100px !important;
    width: 100px !important;
    border: 1px solid #ccc !important;
}*/
.avatar-uploader .el-upload {
    float: left;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .addfile{
    float: left;
    margin-top: 20px;
  }
  .success{
    text-align: center;
    i{
      font-size: 24px;
      margin-right: 20px;
    }
    p{
      font-size: 20px;
      color: #1a6fa6;
      margin-bottom: 25px;
    }
    span{
      display: inline-block;
      margin-bottom: 70px;
    }
  }
</style>