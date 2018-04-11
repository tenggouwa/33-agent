<template>
	<div class="contantwe">
		<div class="button" @click="showT=!showT">
			<img src="../assets/img/banner/kefu.png" height="22" width="22" alt="">
			<span>联<br>系<br>客<br>服</span>
		</div>
		<div class="contant" v-show="showT">
			<div class="wechart">
				<img src="../assets/img/banner/weichatKefu.png">
			</div>
			<div class="phone">
				<div>
					<p>电话咨询</p>
				</div>
				<img src="../assets/img/banner/phone.png" height="31" width="37" alt="">
				<p>+8617354718363</p>
			</div>
		</div>
	</div>
	
</template>
<script>
	export default{
		data(){
			return{
				showT:false,
			}
		},
		methods:{

		}
	}
</script>
<style>
	.contantwe{
		position: fixed;
		top: 28%;
		right: 0px;
		z-index: 100;
		/*width: 130px;
		height: 430px;
		background: #20a0ff;
		z-index: 100;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;*/
		.contant{
			box-shadow: 0 3px 5px 2px rgba(26,0,0,0.4);
			width: 150px;
			background: #20a0ff;
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
			padding-top: 10px;
			padding-bottom: 10px;
			.wechart{
				background: #fff;
				width: 130px;
				margin: 0 auto;
				padding: 10px 0;
				border-radius: 10px;
			}
			.phone{
				background: #fff;
				width: 130px;
				height: 130px;
				margin: 0 auto;
				padding: 10px 5px;
				border-radius: 10px;
				margin-top: 10px;
				div{
					border-bottom: 1px solid #e5e5e5;
					p{
						font-size: 14px;
						color: #333;
						font-weight: bold;
						line-height: 30px;
						text-align: left;
						margin-left: 10px;
					}
				}
				p{
					font-size: 14px;
					color: #333;
					font-weight: bold;
					line-height: 30px;
				}
				img{
					margin-top: 10px;
				}
			}
		}
		.button{
			width: 36px;
			height: 120px;
			background: #20a0ff;
			position: absolute;
			margin-left: -36px;
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;
			cursor: pointer;
			margin-top: 108px;
			text-align: center;
			img{
				margin-top: 10px;
			}
			span{
				color: #fffc00;
				font-size: 14px;
			}
		}
	}
</style>