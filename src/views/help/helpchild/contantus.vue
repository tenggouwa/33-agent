<template>
	<div class="main">
		<div class="placein">
			<p>联系我们</p>
			<div></div>
		</div>
		<div class="enter">
			
		</div>
		<div class="contant">
			<p class="tit">客户服务</p>
			<img src="../../../assets/img/help/qq.png" height="130" width="948" alt="">
			<div class="contantmax">
				<span class="contantmin1">
					<span>QQ</span><br>
					<p>4001566899</p>
				</span>
				<span class="contantmin2">
					<span>微信</span><br>
					<p>yfx0323</p>
				</span>
				<span class="contantmin3">
					<span>电话</span><br>
					<p>400-1566-899</p>
				</span>
				<span class="contantmin4">
					<span>邮箱</span><br>
					<p>support@licai.cn</p>
				</span>
			</div>
			<div class="map">
				<div class="mapcont">
					<div class="first">
						<div class="firsttop">
							<h3>商务合作</h3>
							<span class="firstsp">微信：</span><span class="fistcon">yfx0323</span><br>
							<span class="firstsp">电话：</span><span class="fistcon">400-1566-899</span>
						</div>
						<div class="firstbot">
							<h3>人才招聘</h3>
							<span class="firstsp">联系人：</span><span class="fistcon">叶小姐</span><br>
							<span class="firstsp">联系邮箱：</span><span class="fistcon">support@licai.cn</span>
						</div>
					</div>
					<div class="second">
						<img src="../../../assets/img/help/erweima.png" height="125" width="125" alt="">
						<p>扫一扫</p>
						<p>关注<span>bitlicai</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
	.main{
		padding-bottom: 60px;
		.placein{
			border-bottom: 1px solid #ccc;
			p{
				display: inline-block;
				font-size: 24px;
				color: #1a6fa6;
				border-bottom: 2px solid #1a6fa6;
			}
		}
		.enter{
			height: 50px;
			width: 100%;
		}
		.contant{
			.tit{
				text-align: center;
				font-size: 18px;
			}
			.contantmin1{
				font-size: 14px;
				float: left;
				text-align: center;
				margin-left: 30px;
				p{
					color: #1a6fa6;
				}
			}
			.contantmin2{
				font-size: 14px;
				float: left;
				text-align: center;
				margin-left: 210px;
				p{
					color: #1a6fa6;
				}
			}
			.contantmin3{
				font-size: 14px;
				float: left;
				text-align: center;
				margin-left: 200px;
				p{
					color: #1a6fa6;
				}
			}
			.contantmin4{
				font-size: 14px;
				float: left;
				text-align: center;
				margin-left: 180px;
				p{
					color: #1a6fa6;
				}
			}
			.map{
				background: url(../../../assets/img/help/map.png) no-repeat;
				width: 940px;
				height: 330px;
				margin-top: 100px;
				.mapcont{
					width: 400px;
					height: 220px;
					background: #0e67a3;
					float: right;
					opacity: 0.8;
					margin-top: 50px;
					margin-right: 50px;
					.first{
						float: left;
						width: 225px;
						height: 100%;
						/*background: #090;*/
						border-right: 1px solid #3b99d7;
						.firsttop{
							border-bottom: 1px solid #3b99d7;
							height: 109px;
							h3{
								font-size: 18px;
								color: #fff;
								line-height: 50px;
								margin-left: 10px;
							}
							.firstsp{
								color: #fff;
								font-size: 14px;
								margin-left: 10px;
							}
							.fistcon{
								color: #fff;
								font-weight: bold;
								font-size: 14px;
							}
						}
						.firstbot{
							border-top: 1px solid #333;
							height: 109px;
							/*background: yellow;*/
							h3{
								font-size: 18px;
								color: #fff;
								line-height: 50px;
								margin-left: 10px;
							}
							.firstsp{
								color: #fff;
								font-size: 14px;
								margin-left: 10px;
							}
							.fistcon{
								color: #fff;
								font-weight: bold;
								font-size: 14px;
							}
						}
					}
					.second{
						float: left;
						width: 175px;
						/*background: red;*/
						text-align: center;
						border-left: 1px solid #333;
						height: 100%;
						img{
							margin-top: 20px;
						}
						p{
							color: #fff;
							font-size: 16px;
							span{
								font-weight: bold;
							}
						}
					}
				}
			}
		}
	}
</style>