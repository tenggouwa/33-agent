<template>
	<div class="bac">
		<div class="sell">
			<span>BTC余额:0.000</span><span class="sellri">充币</span><br>
			<span>可卖ETH:0.000</span>	
		</div>
		<div class="sellbor">
			<span>&nbsp;&nbsp;(价格)</span><span class="sellrig">0.1234</span>
		</div>
		<div class="sellbor">
			<span>&nbsp;&nbsp;(数量ETH)</span><span class="sellrig">0.0013</span>
		</div>
		<input class="sellbtn" type="button" value="买入BTC">
	</div>
</template>
<style scoped>
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
				color: #e24743;
				font-size: 20px;
				font-weight: bold;
				margin-right: 10px;
			}
		}
		.sellbtn{
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
</style>