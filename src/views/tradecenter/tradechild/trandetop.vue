<template>
	<div class="tophid">
		<div class="top">
			<!-- 卖出 -->
			<div class="bac">
				<div class="sell">
					<span>{{currency}}余额:{{assest[currency].active}}</span><span class="sellri">充币</span><br>
					<span>可卖BTC:{{assest[symbolT].active}}</span>	
				</div>
				<div class="sellbor">
					<span>&nbsp;&nbsp;(价格)</span>
					<!-- <span class="sellrig">0.1234</span> -->
					<input type="text" class="sellrig" v-model="sell.price">
				</div>
				<div class="sellbor">
					<span>&nbsp;&nbsp;(数量{{currency}})</span>
					<!-- <span class="sellrig">0.0013</span> -->
					<input type="text" class="sellrig" v-model="sell.amount">
				</div>
				<div class="block">
				    <!-- <span class="demonstration">格式化 Tooltip</span> -->
				    <el-slider v-model="value4" :format-tooltip="formatTooltip"n @change="getrating"></el-slider>
				    <span class="nice">0BTC</span>
				    <span>{{pocent}}%</span>
				</div>
				<div >
					<el-button :loading="loadbtn" class="sellbtn" type="button" @click="tradecoinsell()">卖出{{currency}}</el-button>
				</div>
			</div>
			<div class="middle">
				—————区块链交易所—————
			</div>
			<!--买入-->
			<div class="bac">
				<div class="sell">
					<span>BTC余额:{{assest[symbolT].active}}</span><span class="sellri">充币</span><br>
					<span>可卖{{currency}}:{{assest[currency].active}}</span>	
				</div>
				<div class="sellbor">
					<span>&nbsp;&nbsp;(价格)</span>
					<!-- <span class="sellrig1">0.1234</span> -->
					<input type="text" class="sellrig1" v-model="buy.price">
				</div>
				<div class="sellbor">
					<span>&nbsp;&nbsp;(数量{{currency}})</span>
					<!-- <span class="sellrig1">0.0013</span> -->
					<input type="text" class="sellrig1" v-model="buy.amount">
				</div>
				<div class="block">
				    <!-- <span class="demonstration">格式化 Tooltip</span> -->
				    <el-slider v-model="value5" :format-tooltip="formatTool"></el-slider>
				    <span class="nice">0BTC</span>
				    <span>{{pocentOne}}%</span>
				</div>
				<div >
					<el-button :loading="loadbtnbuy" class="sellbtn1" type="button" @click="tradecoinbuy()">买入{{currency}}</el-button>
				</div>
			</div>
		</div>
		<!-- 表格1 -->
		<div class="tablehist" v-loading="tableone">
			<table class="table" >
				<tr>
					<td  class="tabletit">类型</td>
					<td class="tabletit">价格</td>
					<td class="tabletit">数量</td>
				</tr>
				<tr v-for="(item,index) in Listtradesell">
					<td class="tabletype">卖({{8-index}})</td>
					<td>{{item.price}}</td>
					<td>{{item.am}}</td>
				</tr>
				
				<tr>
					<td>最新价</td>
					<td class="tabletype" :class="{typebuy:newtype==0,typesell:newtype==1}">{{newprice}}</td>
					<td class="tabletype" :class="{typebuy:newtype==0,typesell:newtype==1}">{{newam}}</td>
				</tr>
				<tr v-for="(item,index) in Listtradebuy">
					<td class="tabletypeone">买({{index+1}})</td>
					<td>{{item.price}}</td>
					<td>{{item.am}}</td>
				</tr>
			</table>
		</div>
		<div class="tablelast" v-loading="tableone">
			<table class="tablel">
				<tr class="tableltit">
					<td>时间</td>
					<td>价格</td>
					<td>数量</td>
				</tr>
				<tr v-for="item in Listtradese" :class="{color1:item.type==1,color2:item.type==0}">
					<td>{{item.time}}</td>
					<td>{{item.price}}</td>
					<td>{{item.am}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
import {ajax,getcookie} from "../../../assets/js/common.js"
export default{

	data(){
		return{
			haha:'',
			pocent:0,
			pocentOne:0,
			value4:0,
			value5:0,
			//loading1
			tableone:true,
			//btnload
			loadbtn:false,
			loadbtnbuy:false,
			assest:{
				"BTC":{},
				"ETH":{},
				"BCC":{},
				"ETC":{},
				"LTC":{},
				"ZEC":{},
				"BTS":{},
				"SC":{}				
			},
			// assestsell:[],
			symbolT:'BTC',
			newprice:[],
			newam:[],
			newtype:[],
			dataBackha:[],
			dataListT:{
		        num:8,//显示档位数量
		        format:'',//时间格式化样式
		        symbol:'', //货币对
		    },
			symboltype:'',
			newtrade:[],
			List:[],
			Listtrade:[],
			Listtradese:[],//第二个表格
			Listtradebuy:[],//买
			Listtradesell:[],//卖
			//币种交易
			sell:{
				price:'',
				amount:'',
			},
			buy:{
				price:'',
				amount:'',
			},
			dataList:{
				currency:'',//币种1
				currency2:'BTC',//BTC
				ty:'',//buy／sell
				amount:'',//交易数量
				price:'',//交易价格
			},
			currency:'ETH',
			datarating:[],
		}
	},
	// props:['dataBack','newtradedata'],
	props:['dataBack','symbol'],
	watch:{
		symbol:function(val){
			// console.log(val);
			this.Listtradese='';
			this.Listtradebuy='';
			this.Listtradesell='';
			this.currency=val;//改变货币对
			this.tradeList();
			this.myassets();
			this.gettfxee();
		},

	},
  mounted(){
  	// this.symbolT="";
  	this.gettfxee();
  	this.tradeList();
    let token =getcookie("token");
    if(token){
      this.myassets();
    }
  	
  },
  methods:{
  	//交易手续费
  	gettfxee(){
  		ajax(this,this.extendApi.txFees,'',(res)=>{
  			if(res.code == 200){
  				this.haha = this.currency+'BTC';
  				// console.log(haha)
  				this.datarating = res.data;
  				
  			}else{

  			}
  		},'GET');
  	},
  	formatTooltip(val) {
  		
  		this.pocent = val;
      return val;
    },
    getrating(){
    	let ninin = this.sell.price*(1-Number(this.datarating[this.haha]))
    	console.log(ninin)
    	// {{assest[currency].active}}
    	// this.assest[this.currency].active;
    },
    formatTool(valO) {
  		this.pocentOne = valO;
      return valO;
    },
  	//余额／可卖
  	myassets(){
      let that = this;
      ajax(that,that.extendApi.userAssetlist,'',function(res){
      	// that.loadbtn = false; 
        if(res.code == 200){
          that.assest = res.data.list;
          // that.symbolT = that.currency;
          // console.log(that.assest)
          // console.log(that.symbolT)
          // if(that.symbolT = 'ETH'){
          // 	that.assest.assest = res.data.list.ETH.total;
          // 	that.assest.assestsell = res.data.list.ETH.active;
          // }else if(that.symbolT = 'BCC'){
          // 	// that.assest.assest='hahhahaha';
          // 	// that.assest.assest = res.data.list.BCC.total;
          // 	that.assest.assestsell = res.data.list.BCC.active;
          // }
        }else if(res.code == -2){
        	that.$router.push("/index");
          // console.log('活的失败')
        }
      },'GET')
    },
// 判断是buy还是sell并进行赋值
  	tradecoinbuy(){
  		let that = this;
  		that.loadbtnbuy = true;
  		that.dataList.ty = "BUY";
  		console.log(that.dataList.ty);
  		that.dataList.amount = that.buy.amount;
			that.dataList.price = that.buy.price;
			that.tradequest();
  	},
  	tradecoinsell(){
  		let that = this;
  		that.loadbtn = true;
  		that.dataList.ty = "SELL";
  		console.log(that.dataList.ty);
  		that.dataList.amount = that.sell.amount;
			that.dataList.price = that.sell.price;
  		that.tradequest();

  	},
  	// ajax
  	tradequest(){
  		let that = this;
  		that.dataList.currency = that.currency;
  		if(that.dataList.amount && that.dataList.price){
  			
  			ajax(that,that.extendApi.place,that.dataList,(res)=>{
  				that.loadbtn = false;
  				that.loadbtnbuy = false;
  				if(res.code == 200){
  					that.myassets();
  					that.$notify({
			            title: '提示',
			            message: '交易成功',
			            type: 'success',
			            duration:'1500'
			        })
  				}else{
  					
  				}
  			},'POST');
  		}else{
  			that.loadbtn = false;
  				that.loadbtnbuy = false;
  			that.$notify({
	            title: '提示',
	            message: '请输入价格和数量',
	            type: 'warning',
	            duration:'1500'
	        })
  		}
  	},
  	tradeList(){//所有的数据
      let that = this;
      this.dataListT.symbol=this.currency+'BTC';
      ajax(that,that.extendApi.usertradeList,that.dataListT,(res)=>{
      	that.tableone=false;
        if(res.code == 200){
          that.dataBackha = res.data;
          that.Listtradese = that.dataBackha.trade;//右侧表格
          that.newprice = that.dataBackha.trade[0].price;//最新价格
          that.newam = that.dataBackha.trade[0].am;//最新数量
          that.newtype = that.dataBackha.trade[0].type;
          that.Listtradebuy = that.dataBackha.marketdata.buy;//买币表格
          that.Listtradesell = that.dataBackha.marketdata.sell.reverse();//卖币表格
        }else{

        }
      },'GET')
    },
  }
}
</script>
<style scoped>
.tophid{
	overflow: hidden;
}
.top{
	float: left;
	width: 300px;
	/*买卖*/
	.bac{
		float: left;
		background: #fff;
		width: 290px;
		height: 310px;
		margin-left:10px;
		border:1px solid #eee;
		.sell{
			margin: 20px 10px;
			span{
				font-size: 16px;
				line-height: 30px;
			}
			.sellri{
				float: right;
				color: #e24743;
				cursor: pointer;
			}
		}
		.block{
			/*width: 200px;*/
			margin: -10px 20px 10px 20px;
			/*overflow: hidden;*/
			span{
				float: right;
			}
			.nice{
				float: left;
			}
		}
		.sellbor{
			margin: 20px 10px;
			border:1px solid #ccc;
			height: 38px;
			span{
				line-height: 38px;
				font-size: 16px;
			}
			.sellrig{
				float: right;
				color: #45b54f;
				font-size: 20px;
				font-weight: bold;
				margin:7px 10px 0 0;
				width: 100px;
				outline: none;
				border:none;
			}
			.sellrig1{
				float: right;
				color: #e24743;
				font-size: 20px;
				font-weight: bold;
				margin:7px 10px 0 0;
				width: 100px;
				outline: none;
				border:none;
			}
		}
		.sellbtn{
			width: 268px;
			height: 35px;
			background: #02a548;
			border:none;
			color: #fff;
			font-size: 16px;
			font-weight: bold;
			margin-left: 10px;
			cursor: pointer;
		}
		.sellbtn1{
			width: 268px;
			height: 35px;
			background: #e24743;
			border:none;
			color: #fff;
			font-size: 16px;
			font-weight: bold;
			margin-left: 10px;
			cursor: pointer;
		}
	}
	.middle{
		line-height: 38px;
		margin-left: 10px;
		font-size: 16px;
		text-align: center;
	}
	
}
/*表格1*/
.tablehist{
	border: 1px solid #eee;
	float: left;
	width: 340px;
	height: 658px;
	background: #fff;
	margin-left: 10px;
	.table tr:nth-child(odd) td{
		background: #f6f6f6;
	}
	.table{
		margin-top: 20px;
		width: 100%;
		text-align: center;
		tr:hover td{
			background: #eee;
		}
		tr{
			.tabletit{
				background: #fff !important;
				padding-bottom: 2px;			
			}
			td{
				line-height: 35px;
				font-size: 16px;
				width: 33.3%;
			}
			.tabletype{
				color: #02a548;
			}
			.tabletypeone{
				color: #e24743;
			}
			.typebuy{
				color: #02a548;
			}
			.typesell{
				color: #e24743;
			}
		}
	}
}
/*表格2*/
.tablelast{
	border: 1px solid #eee;
	float: left;
	width: 340px;
	height: 658px;
	background: #fff;
	margin-left: 10px;
	.tablel tr:nth-child(odd) td{
		background: #f6f6f6;
	}
	.tablel{
		margin-top: 20px;
		width: 100%;
		text-align: center;
		.color1{
			color: #02a548;
		}
		.color2{
			color: #e24743;
		}
		.tableltit td{
			background: #fff !important;
			padding-bottom: 10px;			
		}
		td{
			line-height: 30px;
			font-size: 16px;
			width: 33.3%;
		}
		tr:hover td{
			background: #eee;
		}
	}
}
</style>