<template>
	<div class="historyrecode">
		<div class="historheadicon">
			<span class="head">币种选择:</span>
			<button 
        @click="goCoinTab(item)" 
        v-for="item in coinlist"
        :class="{active:item==currency}">
        {{item}}
      </button>
			<br>
			<span class="head">操作类型:</span>
			<button v-for="item in typelist" @click="gotype(item)" :class="{active:item==curren}">{{item|allT}}</button>
			<span class="head">起始日期:</span>
		    <el-date-picker
		    	class="datapicker"
		        v-model="value1"
		        type="date"
		        placeholder="选择日期"
		        :picker-options="pickerOptions0"
		        :change="tickerone">
		    </el-date-picker>
		    <el-date-picker
		    	class="datapicker"
		        v-model="value2"
		        type="date"
		        placeholder="选择日期"
		        :picker-options="pickerOptions1">
		    </el-date-picker>
		    <!-- <button>今天</button>
		    <button>7天</button>
		    <button>15天</button>
		    <button>30天</button> -->
		</div>
		<!-- 表格 -->
		<div class="historheadoperate">
			<table>
				<tr class="tr1">
					<td>编号</td>
					<td>币种</td>
					<td>类型</td>
					<td>金额</td>
					<td>申请时间</td>
					<td>当前状态</td>
					<td>完成日期</td>
				</tr>
				<tr v-for="item in dataList">
					<td>{{item.id}}</td>
					<td>{{item.currency}}</td>
					<td>{{item.type}}</td>
					<td>{{item.amount}}</td>
					<td>{{item.addtime}}</td>
					<td>{{item.states}}</td>
					<td>{{item.dealtime}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
import {ajax} from "../../../assets/js/common.js"

export default {
    data() {
        return {
          currency:"ETH",
          curren:"all",
          coinlist:['ETH','ETC','BTC','SC','ZEC','BTS','LTC','BCC'],
          typelist:['all','in','out'],
        	datahistList:{
        		showtype:'',
        		page:'1',
        		pagesize:'15',
        		format:'',
        		stime:'',
        		etime:'',
        	},
        	dataList:[],
        	pickerOptions0: {
          		// disabledDate(time) {
            // 		return time.getTime() < Date.now() - 8.64e7;
          		// }
        	},
        	pickerOptions1: {
          		// disabledDate(time) {
            // 		return time.getTime() < Date.now() - 8.64e7;
          		// }
        	},
        	value1: '',
        	value2: '',
        };
    },
    filters:{
    	allT(e){
    		let name = "";
    		switch(e)
    		{
    			case 'all':
    			name = "全部";
    			break;
    			case 'in':
    			name = "入币";
    			break;
    			case 'out':
    			name = "提币";
    			break;
    		}
    		return name;
    	}
    },
    mounted(){
    	this.userAssethist();
    },
    methods:{
			gotype(val){
				console.log(val)
				this.curren=val;
				this.userAssethist();
			},
      goCoinTab(val){
        this.currency=val;
        this.userAssethist();
      },
      tickerone(e){
      	console.log(e)
      },
      userAssethist(){
      	let _this = this;
        // let param={};
        // for(let x in datahistList){
        //   param[x]=datahistList[x];
        // }
        // param.currency=this.currency;
        // _this.dataList="";
        _this.datahistList.currency=this.currency;
        _this.datahistList.showtype=this.curren;
      	ajax(_this,_this.extendApi.userAssethist,_this.datahistList,(res)=>{
      		if (res.code == 200) {
      			_this.dataList = res.data.list;
      			// console.log("成功")
      		}else{
      			// console.log("失败")
      		}
      	},'GET')
      }
    }
    
};
</script>
<style scoped>
	.historyrecode{
		text-align: left;
		.historheadicon{
			/*margin-left: 20px;*/
			line-height: 30px;
			.head{
				color: #1a6fa6;
			}
			button{
				width: 60px;
				height: 25px;
				margin-right: 5px;
				border:none;
				background:#fff;
				font-size: 14px;
				cursor: pointer;
			}
			button.active{
				color: #fff;
				background:#1a6fa6;
			}
			.datapicker{
				width: 120px;
				margin-right: 10px;
			}
		}
		.historheadoperate{
			margin-top: 30px;
			table tr:nth-child(odd) td{
			background: #f6f6f6;
			}
			table{
				width: 100%;
				text-align: center;
				.tr1 td{
					background: #eee !important;
				}
				tr{
					line-height: 40px;
					td{
						width: 170px;
					}
				}
				tr:hover td{
					background: #eee;
				}
			}
		}
	}
</style>