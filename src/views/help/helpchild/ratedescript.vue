<template>
	<div>
		<div class="placein">
			<p>费率说明</p>
		</div>
		<div class="palcebottom">
			<div class="rate-box">
			    <p class="title">充值提款</p>
			    <p class="main">充值、提款免手续费！</p>
			    <p class="title">交易、提币手续费</p>
			    <p class="main">各币种交易、提币的手续费：</p>
			    <div>
			    	<table>
			    		<thead>
			    			<tr>
			    				<th class="th1"><span>币种</span></th>
			    				<th class="th2"><span>交易手续费</span></th>
			    				<th class="th3"><span>提币矿工费</span></th>
			    			</tr>
			    		</thead>
			    		<tbody>
			    			<tr>
			    				<td class="td1"><span>BTC</span></td>
			    				<td rowspan="7"><span>千分之一</span></td>
			    				<td class="td1"><span>0.0001BTC-0.001BTC</span></td>
			    			</tr>
			    			<tr>
			    				<td class="td1-1"><span>ETH</span></td>
			    				<td><span>每次0.01ETH</span></td>
			    			</tr>
			    			<tr>
			    				<td class="td1"><span>ETC</span></td>
			    				<td class="td1"><span>每次0.01ETC</span></td>
			    			</tr>
			    			<tr>
			    				<td class="td1-1"><span>SC</span></td>
			    				<td><span>每次10个SC</span></td>
			    			</tr>
			    			<tr>
			    				<td class="td1"><span>ZEC</span></td>
			    				<td class="td1"><span>每次0.01ZEC</span></td>
			    			</tr>
			    			<tr>
			    				<td class="td1-1"><span>BTS</span></td>
			    				<td><span>每次5个BTS</span></td>
			    			</tr>
			    			<tr>
			    				<td class="td1"><span>LTC</span></td>
			    				<td class="td1"><span>每次0.005LTC</span></td>
			    			</tr>
			    		</tbody>
			    	</table>
			    	<div class="bottom">
			    	  <p class="main">*交易手续费最高可返还90%</p>
			    	</div>
			    </div>
			</div>
		</div>	
	</div>
</template>
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
	.palcebottom{
		margin-top: 20px;
		font-size: 14px;
		color: #333;
	}
	.rate-box {
    background-color: #fff;
    min-height: 500px;
    margin: 0 auto;
    width: 950px;
    .title{
      margin-top: 20px;
      font-size: 16px;
      color: #333;
      font-weight: bold;
    }
    .main{
    	margin-top: 20px;
    	font-size: 14px;
    	color: #666;
    }
    table{
    	text-align: center;
    	margin-top: 20px; 
    	th{
    		text-align: center;
    		border: 1px solid #edeff4;
    	}
    	td{
    		border: 1px solid #edeff4;
    	}
    	span{
    		font-size: 14px;
    		color: #333;
    	}
    	.th1,.td1,.td1-1{
    		height: 40px;
    	}
    	.th1{ width: 160px; }
    	.th2{ width: 280px; }
    	.th3{ width: 495px; }
    	/*.td1{
    		background: #edeff4;
    	}*/
    }
    .bottom{
            padding-bottom: 77px; 
        }
}
</style>