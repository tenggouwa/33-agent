<template>
	<div>
		<div v-loading="tabload">
			<table>
				<tr class="trhead">
					<td>币种</td>
					<td>可用数量</td>
					<td>冻结数量</td>
					<td>总数量</td>
					<td>操作</td>
				</tr>
				<tr class="trsin" v-for="(item,key) in assestList">
					<td class="imgicon">
						<img :src="'static/myassets/'+key+'.png'" height="50" width="50" alt="">
						<span>{{key|filterT}}{{key}}</span>
					</td>
					<td>{{item.active}}</td>
					<td>{{item.frozen}}</td>
					<td>{{item.total}}</td>
					<td>
						<el-button @click="ChargeMoney(key)">充币</el-button>
						<el-button @click="MentionMoney(key)">提币</el-button>
						<el-button @click="Management(key)">地址管理</el-button>
					</td>
				</tr>
			</table>
		</div>
		<!-- 充币 -->
		<div>
			<el-dialog
			class="chongbidia"
		    :title="cur.currency+'充币'"
		    :visible.sync="dialogVisible"
		    size="small">
		    <div class="chongbi">
		    	<div class="chongbimargin">
		    		<div class="chonger qcode">
			    	
				    </div>
				    <div class="chongadress">
				    	<p>请将需要存入的{{cur.currency}}发送到此地址和备注码</p>
				    	<p>{{cur.currency}}地址:</p>
						<textarea disabled class="kuang" v-model="chargec.address"></textarea><br>
						<!-- <p>MEMO:</p> -->
						<!-- <div class="kuang">1dnksajdlksjaldlskamxsak</div>
						<p class="must">请务必填写memo,否则你的{{cur.currency}}无法到账。</p> -->
						<el-button v-clipboard:copy="chargec.address" v-clipboard:success="onCopy">复制存币地址</el-button>
						<!-- <el-button>复制MEMO</el-button> -->
				    </div>
		    	</div>
		    </div>
		    <div class="tit">
		    	<span>温馨提示：</span><br>
		    	<p>{{cur.currency}}充值需要一个确认，实际到账时间取决于区块链确认速度，大约需要5-30分钟时间。</p>
		    	<span>在线支持：</span><br>
		    	<p>微信：yfx0323 营销QQ：400-1566-899</p>
		    </div>
		    <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		    </span>
			</el-dialog>
		</div>
		<!-- 提币 -->
		<div>
			<el-dialog
		    :title="tibi.currency+'提币'"
		    :visible.sync="dialogTicon"
		    size="small">
		    <div class="tibi">
			    <span>提币地址：</span>
			    <span></span>
			    <el-select v-model="withoucoin.aid" placeholder="请选择" class="tibicheck">
				    <el-option
				      v-for="item in options"
				      :key="item.key"
				      :value="item.address">
				      {{item.address}}
				    </el-option>
				  </el-select><br>
				  <span>提币数量：</span>
				  <input type="text" v-model="mountTmany">
				  <span>≈0.00</span>
				  <span class="null">BTC</span><br>
				  <span class="tibiname">矿工费：</span>
				  <el-select v-model="withoucoin.txfee" placeholder="请选择" class="tibicheckuse">
				    <el-option
				      v-for="item in option"
				      :key="item"
				      :label="item"
				      :value="item">
				    </el-option>
				  </el-select>
				  <div class="jianz" v-if="thoutMount">
				  	<span>验证码：</span>
			  		<input type="text" class="inputshort" v-model="withoucoin.code" placeholder="请输入短信验证码">
				  	<button @click="getsmsT" v-if="smsshow">获取短信验证码</button>
				  	<button @click="getemailT" v-if="emailshow">获取邮箱验证码</button>
				  </div>
				  <el-button @click="questionT">确认提币</el-button>
		    </div>
		    <div class="tit">
		    	<span>温馨提示：</span>
		    	<p>1.提币到账时间取决于接收方对确认数的要求，详细情况可查询区块链。<br>2.提币前请务必确认提币地址的正确性，如若发生错误请联系客服寻求帮助。<br>3.如果48小时后依然未收到款项，请及时联系我们。</p>
		    	<span>在线支持：</span>
		    	<p>微信：yfx0323 营销QQ：400-1566-899</p>
		    </div>
		    <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogTicon = false">取 消</el-button>
			    <el-button type="primary" @click="dialogTicon = false">确 定</el-button>
		    </span>
			</el-dialog>
		</div>
		<!-- 地址管理 -->
		<div>
			<el-dialog
		    title="添加地址"
		    :visible.sync="dialogAdress"
		    size="small">
		    <div class="adress">
			    <span>提币地址：</span>
			    <input type="text" placeholder="请添加您的提币地址" v-model="mangerAdress.address"><br>
				  <span>地址标签：</span>
				  <input type="text" placeholder="请添加您的地址标签" v-model="mangerAdress.lable"><br>
				  <span class="tibiname">验证码：</span>
				  <input type="text" class="inputshort" placeholder="请输入短信验证码" v-model="mangerAdress.code">
				  <!-- <el-button>获取验证码</el-button> -->
				  <button @click="getzhesms" v-if="smsshow">获取短信验证码</button>
				  <button @click="getzheemail" v-if="emailshow">获取邮箱验证码</button>
				  <el-button class="buttonyes" @click="adNewadress">新建提币地址</el-button>
		    </div>
		    <div class="tittab">
		    	<table>
		    		<tr class="trtit">
		    			<td>标签</td>
		    			<td>提币地址</td>
		    			<td>操作</td>
		    			<td>默认</td>
		    		</tr>
		    		<tr v-for="item in addresslist">
		    			<td>{{item.label}}</td>
		    			<td>{{item.address}}</td>
		    			<td>{{item.memo}}</td>
		    			<td>{{item.isdefault|isdefalt}}</td>
		    		</tr>
		    	</table>
		    </div>
		    
			</el-dialog>
		</div>
	</div>
</template>
<script>
import {ajax} from "../../../assets/js/common.js"
require('../../../../static/jquery.qrcode.min.js')
export default {
  data() {
	  return {
	  	//提币验证码
	  	thoutMount:false,
	  	//充币
	  	cur:{
	  		currency:'',
	  	},
	  	chargec:[],
	  	//提币
	  	tibi:{
	  		currency:'',
	  	},
	  	tiList:[],
	  	//地址管理列表
	  	man:{
	  		currency:'',
	  	},
	  	//人脸额度
	  	faceMont:[],
	  	//提币数量
	  	mountTmany:'',
	  	//获取用户信息
	  	emailT:[],
	  	identityT:[],
	  	mobileT:[],
	  	// 发送短信参数
	  	smsyanT:{
	  		codetype:'withdraw_coin',
	  		area:'',
	  		mobile:'',
	  		param:'',
	  	},
	  	//发送邮件参数
	  	emailyanT:{
	  		codetype:'withdraw_coin',
	  		email:'',
	  		param:'',
	  	},
	  	emailshow:false,
	  	smsshow:false,
	  	//提币参数
	  	withoucoin:{
	  		currency:'',
	  		amount:'',
	  		txfee:'',
	  		aid:'',
	  		gid:'',
	  		code:'',
	  		email:'',
	  		yztype:'',
	  		area:'',
	  		mobile:'',
	  	},
	  	//地址管理手机验证码
	  	smsyanD:{
	  		codetype:'add_coin_address',
	  		area:'',
	  		mobile:'',
	  		param:'FzmDateTime|FzmRandom',
	  	},
	  	//邮箱
	  	emailyanD:{
	  		email:'',
	  		codetype:'add_coin_address',
	  		param:'',
	  	},
	  	//地址新增
	  	mangerAdress:{
	  		currency:'',
	  		aid:'',
	  		op:'',
	  		address:'',
	  		memo:'',
	  		email:'',
	  		code:'',
	  		gid:'',
	  		lable:'',
	  		type:'',
	  		area:'',
	  		mobile:'',
	  	},

	  	addresslist:[],

	  	tabload:true,
	  	dialogVisible: false,
	  	dialogTicon: false,
	  	dialogAdress: false,
	  	asset:{
			},
  		options: [],
  		option:[],
        value: '',
        value2:'',
      };
  	},
    props:{
    	assestList:{
    		required:true
    	}
    },
    filters:{
    	filterT(e){
    		let name = "";
    		switch(e){
    			case'LTC':
    			name = "莱特币";
    			break;
    			case'BCC':
    			name = "比特现金";
    			break;
    			case'BTC':
    			name = "比特币";
    			break;
    			case'ETH':
    			name = "以太坊";
    			break;
    			case'ETC':
    			name = "以太坊经典";
    			break;
    			case'ZEC':
    			name = "零币";
    			break;
    			case'BTY':
    			name = "比特元";
    			break;
    			case'USDT':
    			name = "泰达币";
    			break;
    		}
    		return name;
    	},
    	isdefalt(e){
    		let labname = "";
    		switch(e){
    			case 1:
    			labname = "是";
    			break;
    			case 0:
    			labname = "否";
    			break;
    		}
    		return labname;
    	}
    },
    mounted(){
    	this.getFace();
    	this.getUserT();
    	let that = this;
    	that.asset = that.assestList;
    	let rel=setInterval(()=>{
        if(that.assestList.BTC.total){
          // that.echartdata();
          that.tabload = false;
          clearInterval(rel);
        }
      },200);
    },
    methods: {
    	// 充币
    	ChargeMoney(key){
    		this.dialogVisible = true;
    		let that = this;
    		that.cur.currency = key;
    		// console.log(that.currency);
    		ajax(that,that.extendApi.chargecoin,that.cur,(res)=>{
    			if(res.code == 200){
    				that.chargec = res.data;
    				this.qrcodes();
    			}else{
    				// console.log(22222);
    			}
    		},'GET');
    	},
    	//提币
    	MentionMoney(key){
    		this.thoutMount=false;
    		this.mountTmany='';
    		this.withoucoin.txfee='';
    		this.withoucoin.aid='';
    		this.dialogTicon = true;
       		let that = this;
    		that.tibi.currency = key;
    		// that.options="";
    		// 地址
    		ajax(that,that.extendApi.adressList,that.tibi,(res)=>{
    			if(res.code == 200){
    				that.options = res.data.list;
    				// console.log(that.options);
    			}else{
    				
    			}
    		},'GET');
    		// 手续费
    		ajax(that,that.extendApi.mancoinmon,'',(par)=>{
    			if(par.code == 200){
    				let nameKey = key;
    				// console.log(par.data);
    				that.option=[];
    				if(par.data[nameKey].length){
    					that.option = par.data[nameKey];
    				}
    				else{
    					that.option[0]=par.data[nameKey];
    				}
    				// that.option = par.data[nameKey];
    				// that.option[0]=par.data[nameKey];
    				// for(let i=0;i<par.data[nameKey].length;i++){
    				// 	that.option[i].value=par.data.nameKey[i];
    				// 	that.option[i].label=par.data.nameKey[i];
    				// }
    				// console.log(345);
    				// console.log(that.option);
    				// that.option = that.option.nameKey;
    				// console.log(nameKey);
    			}else{
    				// alert(1);
    			}
    		})

    	},
    	//获得用户信息
    	getUserT(){
    		ajax(this,this.extendApi.getState,'',(res)=>{
    			if(res.code == 200){
    				this.emailT = res.data.states.email;
    				this.identityT = res.data.states.identity;
    				this.mobileT = res.data.states.mobile;
    			}else{

    			}
    		},'GET');
    	},
    	//确认提币
    	questionT(){
    		// 判断是否实名认证
    		// if()
    		console.log(this.identityT.statu)
    			if(this.identityT.statu == 0){
    				if(this.mountTmany>=this.faceMont[this.tibi.currency] && this.thoutMount == false){
    					// 验证码
    					this.$notify({
				            title: '提示',
				            message: '由于提币额度较大请先进行验证',
				            type: 'warning',
				            duration:'4000'
				        });
    					this.thoutMount = true;
    					if(this.emailT.statu == 1){
    						this.emailshow = true;
    						// this.withoucoin.currency = this.tibi.currency;
    						// this.withoucoin.amount = this.mountTmany;
    						// this.withoucoin.email = this.emailT.data.show;
    						// this.withoucoin.yztype = 'email';   
    						// this.getoutCoin();
    	 				}
    					if(this.mobileT.statu == 1){
    						this.smsshow = true;
    						// this.withoucoin.currency = this.tibi.currency;
    						// this.withoucoin.amount = this.mountTmany;
    						// this.withoucoin.yztype = 'sms';
    						// this.withoucoin.mobile = this.mobileT.data.show;
    						// this.withoucoin.area = this.mobileT.data.area;
    						// this.getoutCoin();
    					}
    				}else if(this.thoutMount == true){
    					// 提币
    					if(this.emailT.statu == 1){
    						this.emailshow = true;
    						this.withoucoin.currency = this.tibi.currency;
    						this.withoucoin.amount = this.mountTmany;
    						this.withoucoin.email = this.emailT.data.show;
    						this.withoucoin.yztype = 'email';   
    						this.getoutCoin();
    	 				}
    					if(this.mobileT.statu == 1){
    						this.smsshow = true;
    						this.withoucoin.currency = this.tibi.currency;
    						this.withoucoin.amount = this.mountTmany;
    						this.withoucoin.yztype = 'sms';
    						this.withoucoin.mobile = this.mobileT.data.show;
    						this.withoucoin.area = this.mobileT.data.area;
    						this.getoutCoin();
    					}
    					
    				}
    			}else{
    				this.$notify({
			            title: '提示',
			            message: '请先去用户中心进行实名认证',
			            type: 'warning',
			            duration:'0'
			        });
    			}
    	},
    	//提币接口
    	getoutCoin(){
    		// this.withoucoin.currency = this.tibi.currency;
    		// this.withoucoin.amount = this.mountTmany;
    		// this.withoucoin.gid = '';
    		// this.withoucoin.email = this.emailT.data.show;
    		// this.withoucoin.yztype = 'sms/email';
    		// this.withoucoin.mobile = this.mobileT.data.show;
    		// this.withoucoin.area = this.mobileT.data.area;

    		ajax(this,this.extendApi.getOutCin,this.withoucoin,(param)=>{

    		},'POST')
    	},
    	//发送验证码
    	//邮件
    	getemailT(){
    		this.emailyanT.email = this.emailT.data.show;
    		this.emailyanT.param = 'FzmUid|FzmDateTime|'+this.mountTmany+'|'+this.tibi.currency+'|FzmRandom';
    		ajax(this,this.extendApi.sendEmail,this.emailyanT,(res)=>{
    			if(res.code == 200){
    				this.$notify({
	            title: '成功',
	            message: '邮件发送成功，请注意查收',
	            type: 'success',
	            duration:'2000'
	        	});
    			}else{
    				this.$notify({
	            title: '提示',
	            message: '邮件发送失败',
	            type: 'warning',
	            duration:'2000'
	        	});
    			}
    		},'POST')

    	},
    	//短信
    	getsmsT(){
    		this.smsyanT.area = this.mobileT.data.area;
    		this.smsyanT.mobile = this.mobileT.data.show;
    		this.smsyanT.param = 'FzmUid|FzmDateTime|'+this.mountTmany+'|'+this.tibi.currency+'|FzmRandom';
    		// console.log(this.smsyanT.param)
    		ajax(this,this.extendApi.phoneCheckedNum,this.smsyanT,(res)=>{
    			if(res.code == 200){
    				this.$notify({
	            title: '成功',
	            message: '短信发送成功，请注意查收',
	            type: 'success',
	            duration:'2000'
	        	});
    			}else{
    				this.$notify({
	            title: '提示',
	            message: '短信发送失败',
	            type: 'warning',
	            duration:'2000'
	        	});
    			}
    		},'POST')
    	},
    	//获得人脸额度
    	getFace(){
    		ajax(this,this.extendApi.getFaceAmount,'',(pra)=>{
    			if(pra.code == 200){
    				this.faceMont = pra.data;
    			}else{

    			}
    		},'GET')
    	},
    	//地址管理
    	Management(key){
    		this.dialogAdress = true;
    		let that = this;
    		that.man.currency = key;
    		ajax(that,that.extendApi.adressList,that.man,(params)=>{
    			if(params.code == 200){
    				that.addresslist = params.data.list;
    			}else{

    			}
    		},'GET');
    		if(this.emailT.statu == 1){
				this.emailshow = true;
				}
			if(this.mobileT.statu == 1){
				this.smsshow = true;
			}
    	},
    	//新增提币地址
    	adNewadress(){
    		if(this.emailT.statu == 1){
    			this.mangerAdress.currency = this.man.currency;
    			this.mangerAdress.op = 'add';
    			this.mangerAdress.type = 'email';
    			this.mangerAdress.email = this.emailT.data.show;
				this.ajaxGetAdress();
				}
			if(this.mobileT.statu == 1){
				this.mangerAdress.currency = this.man.currency;
    			this.mangerAdress.op = 'add';
    			this.mangerAdress.type = 'sms';
    			this.mangerAdress.area = this.mobileT.data.area;
    			this.mangerAdress.mobile = this.mobileT.data.show;
    			this.ajaxGetAdress();
			}
    	},
    	//提币接口
    	ajaxGetAdress(){
    		ajax(this,this.extendApi.addAdress,this.mangerAdress,(res)=>{
    			if(res.code == 200){
    				this.$notify({
			            title: '成功',
			            message: res.message,
			            type: 'success',
			            duration:'2000'
		        	});
    			}else{
    				
    			}
    		},'POST')
    	},
    	//地址管理短信
    	getzhesms(){
    		this.smsyanD.area = this.mobileT.data.area;
    		this.smsyanD.mobile = this.mobileT.data.show;
    		ajax(this,this.extendApi.phoneCheckedNum,this.smsyanD,(res)=>{
    			if(res.code == 200){
    				this.$notify({
	            title: '成功',
	            message: '短信发送成功，请注意查收',
	            type: 'success',
	            duration:'2000'
	        	});
    			}else{
    				this.$notify({
	            title: '提示',
	            message: '短信发送失败',
	            type: 'warning',
	            duration:'2000'
	        	});
    			}
    		},'POST')
    	},
    	getzheemail(){
    		this.emailyanD.email = this.emailT.data.show;
    		this.emailyanD.param = 'FzmUid|FzmDateTime|'+this.tibi.currency+'|FzmRandom';
    		ajax(this,this.extendApi.sendEmail,this.emailyanD,(res)=>{
    			if(res.code == 200){
    				this.$notify({
	            title: '成功',
	            message: '邮件发送成功，请注意查收',
	            type: 'success',
	            duration:'2000'
	        	});
    			}else{
    				this.$notify({
	            title: '提示',
	            message: '邮件发送失败',
	            type: 'warning',
	            duration:'2000'
	        	});
    			}
    		},'POST')
    	},
    	//复制text
    	onCopy: function (e) {
		    this.$notify({
          title: '提示',
          message: '复制成功',
          type: 'success',
          duration:'2000'
	      });
		},
		//生成二维码
		qrcodes(){
			let that = this;
			$(".qcode").html('');
			$(".qcode").qrcode({
				render:'canvas',
				text:that.chargec.address,
				width:180,
				height:180,
			})
		}
    }
};
</script>
<style scoped>
	table tr:nth-child(odd) td{
		background: #f6f6f6;
	}
	table{
		width: 100%;
		tr{
			width: 100%;
			td{
				width: 70px;
				height: 70px;
				font-size: 14px;
				span{
					float: left;
					margin-top: 20px;
				}
				img{
					float: left;
					margin: 3px 10px 0 20px;
				}
				button{
					border-radius: 18px !important;
					color: #1a6fa6;
				}
				button:hover{
					background: #1a6fa6;
					color: #fff;
				}
			}
			.imgicon{
					text-align: left !important;
			}
		}
		tr:hover td{
			background: #f1f1f1;
		}
		.trhead{
			background: #f1f1f1;
			td{
				height: 40px !important;
			}
		}
		.trcos{
			background: #f8f8f8;
		}
	}
	.el-dialog{
		/*width: 0 !important;*/
		width: 1700px !important;
	}
	.chongbi{
		
		
		min-width: 600px;
		overflow: hidden;
		text-align: left;
		.chongbimargin{
			width: 600px;
			margin: 0 auto;
			.chonger{
				float: left;
				width: 200px;
				height: 200px;
				margin-right: 10px;
			}
			.qcode{
				margin-left: 40px;
			}
			.chongadress{
				float: left;
				.kuang{
					width: 250px;
					height: 45px;
				}
				.must{
					margin-top: 10px;
					color: #1a6fa6;
				}
				button{
					color: #1a6fa6;
					font-size: 16px;
					font-weight: bold;
					margin-top: 20px;
					border-radius: 40px;
					width: 150px;
				}
				p{
					line-height: 40px;
				}
				div{
					width: 350px;
					height: 50px;
					border:1px solid #eee;
				}
			}
		}
		
	}
	.tibi{
		/*background:#090;*/
		width: 500px;
		overflow: hidden;
		text-align: left;
		margin: 0 auto;
		.jianz{
			span{
				margin-left: 14px;
			}
			input{
				height: 36px;
				padding-left: 10px;
				/*margin-top: 5px;*/
			}
			button{
				margin-left: 0;
				height: 36px;
				width: 100px;
				background: #ccc; 
				border-radius: 10px;
				border: none;
				font-size: 12px;
				cursor: pointer;
			}
			button:hover{
				background: #fff;
				border: 1px solid #1a6fa6;
			}
		}
		input{
			border: none;
			width: 200px;
			height: 32px;
			margin-bottom: 10px;
			border: 1px solid #bfcbd9 !important;
			border-radius: 4px;
			outline: none;
			padding-left: 10px;
		}
		.null{
			float: right;
			margin:8px 30px 0 0;
		}
		.tibicheck{
			width: 400px;
			margin-bottom: 10px;
		}
		.tibicheckuse{
			width: 400px;
		}
		.tibiname{
			margin-left:14px;
		}
		button{
			color: #1a6fa6;
			font-size: 16px;
			font-weight: bold;
			margin: 10px 0 0 75px;
			border-radius: 40px;
			width: 120px;
		}
	}
	.adress{
		/*background:#090;*/
		width: 400px;
		overflow: hidden;
		text-align: left;
		margin: 0 auto;
		input{
			border: none;
			width: 325px;
			height: 32px;
			margin-bottom: 10px;
			border: 1px solid #bfcbd9 !important;
			border-radius: 4px;
			outline: none;
			padding-left: 10px; 
		}
		.inputshort{
			width: 126px;
		}
		.null{
			float: right;
			margin:8px 30px 0 0;
		}
		.tibicheck{
			width: 400px;
			margin-bottom: 10px;
		}
		.tibicheckuse{
			width: 400px;
		}
		.tibiname{
			margin-left:14px;
		}
		button{
			float: right;
			width: 90px;
			height: 32px;
			text-align: center;
			border: 1px solid #bfcbd9 !important;
			border-radius: 4px;
			background: none;
			color: #666;
			cursor: pointer;
			margin-left:10px;
		}
		button:hover{
			background: #1a6fa6;
			color: #fff;
		}
		.buttonyes{
			color: #1a6fa6;
			font-size: 16px;
			font-weight: bold;
			margin:0 0 0 75px;
			border-radius: 40px;
			width: 120px;
			height: 36px;
			float: left;
		}
	}
	.tittab{
		margin-top: 30px;
		table{
			width: 100%;
			.trtit{
				td{
					background:#eee;
					height: 40px;
				}
			}
			tr{
				td{
					height: 34px;
				}
			}
		}
	}
	.tit{
		text-align: left;
		/*margin-left: 40px;*/
		width: 600px;
		margin: 0 auto;
		span{
			color: #1a6fa6;
			line-height: 40px;
		}
	}
</style>