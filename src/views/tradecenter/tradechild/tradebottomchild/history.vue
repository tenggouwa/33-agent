<template>
	<div class="entru">
		<table>
			<tr class="trtr">
				<td>订单号</td>
				<td>委托时间</td>
				<td>成交时间</td>
				<td>订单类型</td>
				<td>委托价格</td>
				<td>成交均价</td>
				<td>委托数量</td>
				<td>成交数量</td>
				<td>状态</td>
			</tr>
			<tr v-for="item in List">
				<td>{{item.id}}</td>
				<td>{{item.create_time}}</td>
				<td>{{item.update_time}}</td>
				<td>{{item.ty | ordertype}}</td>
				<td>{{item.price}}</td>
				<td>{{item.cost}}</td>
				<td>{{item.oquantity}}</td>
				<td>{{item.quantity}}</td>
				<td>{{item.status | orderT}}</td>
			</tr>
			
		</table>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				List:[],
			}
		},
		props:{
	  	dataList:{
	  		required:true
	  	}
	  },
		filters:{
	  	ordertype(e){
	  		let name = "";
	  		switch(e){
	  			case'0':
	  			name="买单";
	  			break;
	  			case'1':
	  			name="卖单";
	  			break;
	  		}
	  		return name;
	  	},
	  	orderT(i){
	  		let lablesname = "";
	  		console.log(i)
	  		if(i = 0){
	  			lablesname = "挂单";
	  		}else if(i = 1){
	  			lablesname = "成交";
	  		}else if(i = 2){
	  			lablesname = "撤单";
	  		}else if(i = 3){
	  			lablesname = "部分成交";
	  		}
	  		return lablesname;
	  	}
	  },
	  mounted(){
	  	this.List="";
	    let that = this;
	    that.List = that.dataList;
	    let liner=setInterval(()=>{
	      if(that.dataList){
	        // that.tradedata();
	        clearInterval(liner);
	      }
	    },200);
	  },
	}
</script>
<style scoped>
	.entru{
		margin: 10px 10px 0 10px;
		table tr:nth-child(odd) td{
			background: #f6f6f6;
		}
		table{
			width: 100%;
			tr{
				text-align: center;
				td{
					line-height: 38px;
					font-size: 16px;
				}

			}
			tr:hover td{
					background: #eee !important;
			}
			.trtr td{
				background: #eee !important;
				line-height: 50px;
			}
		}
	}
</style>