<template>
	<div class="notice-box">
		<div class="placein">
			<p>币种介绍</p>
		</div>
		<div class="placeul">
			<ul>
				<li class="label" :class="{'active':isactive==1}" @click = "fn(1)">BTC比特币</li>
				<li class="label" :class="{'active':isactive==2}" @click = "fn(2)">ETH以太坊</li>
				<li class="label" :class="{'active':isactive==3}" @click = "fn(3)">ETC以太坊经典</li>
				<li class="label" :class="{'active':isactive==4}" @click = "fn(4)">S C云储币</li>
				<li class="label" :class="{'active':isactive==5}" @click = "fn(5)">ZEC零币</li>
				<li class="label" :class="{'active':isactive==6}" @click = "fn(6)">BTS比特股</li>
				<li class="label" :class="{'active':isactive==7}" @click = "fn(7)">LTC莱特币</li>
               <!--  <li class="label" :class="{'active':isactive==8}" @click = "fn(8)">YCC原链币</li>
                <li class="label" :class="{'active':isactive==9}" @click = "fn(9)">WDT我的钱包</li> -->
			</ul>
		</div>
		<div v-if="showHide==1">
            <div>
            <p class="main-1">比特币（BTC）简介</p>
            </div>
            <div class="tabke">
            	<table>
            		<tr>
            			<td>中文名：比特币</td>
            			<td>英文名：Bitcoin</td>
            			<td>简称：BTC</td>
            		</tr>
            		<tr>
            			<td>货币总量：2100万</td>
            			<td>区块时间：10分钟</td>
            			<td>发布时间：2009-01-09</td>
            		</tr>
            		<tr>
            			<td>挖矿方式：CPU</td>
            			<td>核心算法：SHA-256</td>
            			<td></td>
            		</tr>
            	</table>
            </div>
            <div>
                <p class="title-1">主要特色：</p>
                <p class="main-2">虚拟币始创者，受众最广，被信任最高</p>
                <p class="title-1">主要介绍：</p>
                <p class="main-2 main-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比特币（BitCoin）的概念最初由中本聪在2009年提出，根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币是一种P2P形式的数字货币。点对点的传输意味着一个去中心化的支付系统。与大多数货币不同，比特币不依靠特定货币机构发行，它依据特定算法，通过大量的计算产生，比特币经济使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学的设计来确保货币流通各个环节安全性。P2P的去中心化特性与算法本身可以确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实的拥有者转移或支付。这同样确保了货币所有权与流通交易的匿名性。比特币与其他虚拟货币最大的不同，是其总数量非常有限，具有极强的稀缺性。该货币系统曾在4年内只有不超过1050万个，之后的总数量将被永久限制在2100万个。比特币可以用来兑现，可以兑换成大多数国家的货币。使用者可以用比特币购买一些虚拟物品，比如网络游戏当中的衣服、帽子、装备等，只要有人接受，也可以使用比特币购买现实生活当中的物品。</p>
            
            </div>      
        </div>
        <div v-if="showHide==2">
            <div>
            <p class="main-1">以太坊（ETH）简介</p>
            </div>
            <div class="tabke">
            	<table>
            		<tr>
            			<td>中文名：以太坊</td>
            			<td>英文名：Ethereum</td>
            			<td>简称：ETH</td>
            		</tr>
            		<tr>
            			<td>货币总量：7200万+1872万/年</td>
            			<td>区块时间：12秒</td>
            			<td>发布时间：2015-03-20</td>
            		</tr>
            		<tr>
            			<td>挖矿方式：</td>
            			<td>核心算法：Ethash</td>
            			<td></td>
            		</tr>
            	</table>
            </div>
            <div>
                <p class="title-1">主要特色：</p>
                <p class="main-2">国内外人气高，技术实力雄厚</p>
                <p class="title-1">主要介绍：</p>
                <p class="main-2 main-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethereum（以太坊）是一个平台和一种编程语言，使开发人员能够建立和发布下一代分布式应用。 以太坊（Ethereum）并不是一个机构，而是一款能够在区块链上实现智能合约、开源的底层系统，以太坊从诞生到2017年5月，短短3年半时间，全球已有200多个以太坊应用诞生。 以太坊是一个平台和一种编程语言，使开发人员能够建立和发布下一代分布式应用。 以太坊可以用来编程，分散，担保和交易任何事物：投票，域名，金融交易所，众筹，公司管理， 合同和大部分的协议，知识产权，还有得益于硬件集成的智能资产。</p>
            
            </div>      
        </div>
        <div v-if="showHide==3">
            <div>
            <p class="main-1">以太坊经典（ETC）</p>
            </div>
            <div class="tabke">
            	<table>
            		<tr>
            			<td>中文名：以太坊经典</td>
            			<td>英文名：Ethereum Classic</td>
            			<td>简称：ETC</td>
            		</tr>
            		<tr>
            			<td>货币总量：7200万</td>
            			<td>区块时间：</td>
            			<td>发布时间：2015-11-01</td>
            		</tr>
            		<tr>
            			<td>挖矿方式：POW </td>
            			<td>核心算法：</td>
            			<td></td>
            		</tr>
            	</table>
            </div>
            <div>
                <!-- <p class="title-1">主要特色：</p>
                <p class="main-2">国内外人气高，技术实力雄厚</p> -->
                <p class="title-1">主要介绍：</p>
                <p class="main-2 main-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ETC是以太坊在1,920,000个块后硬分叉出的分叉币种，功能和以太坊极为类似。ETC秉承去中心化理念，通过区块链保证的共识机制。ETC坚信，区块链一旦开始运行，它的发展方向就不被任何中心团队所左右，而是按照参与整个网络人员的共识和全网算力的共识所决定。</p>
            
            </div>      
        </div>
        <div v-if="showHide==4">
            <div>
            <p class="main-1">云储币（SC）简介</p>
            </div>
            <div class="tabke">
            	<table>
            		<tr>
            			<td>中文名：云储币</td>
            			<td>英文名：Siacoin</td>
            			<td>简称：SC </td>
            		</tr>
            		<tr>
            			<td>货币总量：445.5亿</td>
            			<td>区块时间：10分钟</td>
            			<td>发布时间：2015-07-03</td>
            		</tr>
            		<tr>
            			<td>挖矿方式：POW</td>
            			<td>核心算法：Reed-Solomn算法</td>
            			<td></td>
            		</tr>
            	</table>
            </div>
            <div>
                <p class="title-1">主要特色：</p>
                <p class="main-2">加密与奖励机制；去中心化与备份；Sia如何应对Sybil攻击；</p>
                <p class="title-1">主要介绍：</p>
                <p class="main-2 main-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sia最初的设计目的是：让云储存去中心化。在这个平台上可以存放和提取各种各样的文件，并不需要为您的文件隐私和安全担心。通过运用加密技术，加密合约，和重复备份，Sia 能够使一群互不信任的和互不了解的计算机节点联合起来成为一种有统一运行逻辑和程序的云储存平台。 这种平台将比传统的云储存平台更快，更便宜，和更可靠。因为这些互不信任的计算机节点分布于世界各地，Sia 可以在无需添加成本的情况下成为一个有效的文件及其内容的分销网络。文件上传者可以自由选择他们所使用的节点，这意味着他们可以避开一定区域内的节点，或只用那些他们认为可信的节点。去中心化是指把上传的一个文件分成许多小块并把每个小块存放在不同的计算机节点上。在这些存放文件的节点中，只需一小部分节点是可信任的，就可以使上传文件既安全又可靠。</p>
            
            </div>      
        </div>
        <div v-if="showHide==5">
            <div>
            <p class="main-1">零币（ZEC）简介</p>
            </div>
            <div class="tabke">
            	<table>
            		<tr>
            			<td>中文名：零币</td>
            			<td>英文名：ZCash</td>
            			<td>简称：ZEC</td>
            		</tr>
            		<tr>
            			<td>货币总量：2100万</td>
            			<td>区块时间：150秒/块</td>
            			<td>发布时间：2016-10-28</td>
            		</tr>
            		<tr>
            			<td>挖矿方式：POW</td>
            			<td>核心算法：EquiHash</td>
            			<td></td>
            		</tr>
            	</table>
            </div>
            <div>
                <!-- <p class="title-1">主要特色：</p>
                <p class="main-2">加密与奖励机制；去中心化与备份；Sia如何应对Sybil攻击；</p> -->
                <p class="title-1">主要介绍：</p>
                <p class="main-2 main-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Zcash（ZEC）是一种采用零知识证明算法的透明和匿名性共存的新型加密数字资产，采用EquiHash算法和PoW的方式构建适合普通电脑挖矿的分发机制。发行总量与比特币相同2100万。</p>
            
            </div>      
        </div>
        <div v-if="showHide==6">
            <div>
            <p class="main-1">比特股（BTS）简介</p>
            </div>
            <div class="tabke">
            	<table>
            		<tr>
            			<td>中文名：比特股</td>
            			<td>英文名：Bitshares</td>
            			<td>简称：BTS</td>
            		</tr>
            		<tr>
            			<td>货币总量：20亿</td>
            			<td>区块时间：10秒</td>
            			<td>发布时间：2014-07-19</td>
            		</tr>
            		<tr>
            			<td>挖矿方式：CPU</td>
            			<td>核心算法：DPoS</td>
            			<td></td>
            		</tr>
            	</table>
            </div>
            <div>
                <p class="title-1">主要特色：</p>
                <p class="main-2">构思宏伟、公司开发、知名度高、分发相对公平</p>
                <p class="title-1">主要介绍：</p>
                <p class="main-2 main-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BitShares是一项测试一种新型“可预测市场(Prediction Market)”背后的经济理论的实验。该实验创建了去中心化的银行和交易所，使用由DPoS保障安全的去中心化交易总账来创造可互换数字资产，这些资产可以市场化锚定美元、黄金、汽油等任何东西的价值。和所有的DAC一样，比特股 X拥有可以像比特币那样在用户间转让的股权。比特股 X的特殊之处是它实施了一个类似于银行或经纪公司的商业模式。</p>
            
            </div>      
        </div>
        <div v-if="showHide==7">
            <div>
            <p class="main-1">莱特币（LTC）简介</p>
            </div>
            <div class="tabke">
            	<table>
            		<tr>
            			<td>中文名：莱特币</td>
            			<td>英文名：Litecoin</td>
            			<td>简称：LTC</td>
            		</tr>
            		<tr>
            			<td>货币总量：8400万</td>
            			<td>区块时间：150秒</td>
            			<td>发布时间：2011-10-07</td>
            		</tr>
            		<tr>
            			<td>挖矿方式：CPU</td>
            			<td>核心算法：scrypt算法</td>
            			<td></td>
            		</tr>
            	</table>
            </div>
            <div>
                <p class="title-1">主要特色：</p>
                <p class="main-2">人气高、国内几大交易网站支持、开发能力强</p>
                <p class="title-1">主要介绍：</p>
                <p class="main-2 main-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Litecoin受到了比特币(BTC)的启发，并且在技术上具有相同的实现原理，Litecoin的创造和转让基于一种开源的加密协议，不受到任何中央机构的管理。Litecoin旨在改进比特币，与其相比，Litecoin具有三种显著差异。第一，Litecoin网络每2.5分钟（而不是10分钟）就可以处理一个块，因此可以提供更快的交易确认。第二，Litecoin网络预期产出8400万个Litecoin，是比特币网络发行货币量的四倍之多。第三，Litecoin在其工作量证明算法中使用了由Colin Percival首次提出的scrypt加密算法。</p>
            
            </div>      
        </div>
        <!-- <div v-if="showHide==8">
            <div>
            <p class="main-1">原链币（YCC）简介</p>
            </div>
            <div>
                <p class="waring waringfrist">比特理财Licai.cn不为任何加密数字货币资产做背书，所有相关介绍均来自于第三方，并有可能存在错误和遗漏。</p>
                <p class="waring">
                    加密数字货币投资是高风险行为，您必须自行承担价格有可能归零的风险，请根据自己的能力谨慎投资，谢谢！
                </p>
                <p class="title-1">简介：</p>
                <p class="main-2">原链YCC:英文名“yuan chain”。</p>
                <p class="main-2">原链YCC汲取了比特币、瑞波币、比特股、以太坊、超级账本各系统的优点，融入多项创新技术，形成一种全新的区块链网络架构，一方面公链的性能可以超过万笔/秒，另一方面公链和许可链可以实现信息互联，价值互通。既具有公链的去中心化特征，又能兼顾许可链对性能和隐私的要求。</p>
                <p class="title-1">特点：</p>
                <p class="title-2">1.创新:</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原链的创新方面主要包括，热替换智能合约、智能合约异构、跨链信息互联价值互通、持币产生免费流量额度，移动端私钥硬件管理方案、加密检索方案、数据对比及共识方法、登陆验证及隐私保护、公链许可链跨链身份认证及管理、近 10 项区块链抗攻击安全措施。
                这些创新实现了联盟链、私链的隐私保护和价值互通，同时实现与比特币、以太坊等公链的跨链交易。</p>
                <p class="title-2">2.目标:</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;帮助企业大幅提高运营效率，降低成本。
                个人或企业只要购买原链原生币 YCC，即可获得一定额度使用区块链系统的消费燃料，YCC 可直接作为区块链燃料使用，用于支付使用智能合约及各类服务的费用。可以把原链自组织社区这种模式类比为会员，加入的用户越多共享经济的效率就越高，用户越多就越容易产生信息和价值的交互关系，用户对原链币 YCC 的需求量也就越大。</p>
                <p class="title-1">相关信息：</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发行总量：100亿YCC。其中30 亿用于早期投资；预留 YCC量共70 亿，用于企业应用、市场推广、技术开发、团队运营。</p>
                <p class="title-1">相关链接：</p>
                <p class="main-2 last">原链YCC官网：<a href="https://www.yuan.org">www.yuan.org</a></p>
            </div>      
        </div>
        <div v-if="showHide==9">
            <div>
            <p class="main-1">我的钱包（WDT）简介</p>
            </div>
            <div>
                <p class="waring waringfrist">比特理财Licai.cn不为任何加密数字货币资产做背书，所有相关介绍均来自于第三方，并有可能存在错误和遗漏。</p>
                <p class="waring">
                    加密数字货币投资是高风险行为，您必须自行承担价格有可能归零的风险，请根据自己的能力谨慎投资，谢谢！
                </p>
                <p class="title-1">简介：</p>
                <p class="main-2">WDT：WorldToken，中文名“我的钱包”。</p>
                <p class="main-2">WorldToken是一个基于区块链技术的数字资产存储设备。任何机构和个人，都可以在WorldToken上开设自己的账户，并可将WDT用于存贷、支付、兑换、结算、投资等服务。</p>
                <p class="main-2">WorldToken将致力于建立一个分布式超级金融市场，打造一个跨链的数字资产管理终端，成为数字资产管理行业的“支付宝”。</p>
                <p class="title-1">功能：</p>
                <p class="title-2">1.安全性：</p>
                <p class="main-2">软件方面，采用多重国际领先的加密技术，私钥永不联网；</p>
                <p class="main-2">硬件方面，通过蓝牙SIM卡及蓝牙U盾，做到冷热钱包分离。</p>
                <p class="title-2">2.多样性：</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可添加BTC、 ETH、 ETC等国内外大多数主流数字资产，未来还将不断的增加其他数字资产标的。</p>
                <p class="title-2">3.功能性：</p>
                 <p class="main-2">
                    可进行数字资产的转入、储存和支付；</p>
                <p class="main-2">
                    钱包内的数字资产之间的兑换，也可以用数字资产进行TOKEN SALE、投资、消费等。</p>
                <p class="title-1">相关信息：</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WorldToken发行总量：20亿枚WDT
                其中，3亿WDT用于早期投资；4亿WDT用于市场推广，建设WorldToken生态圈；6亿WDT用于技术团队开发；7亿WDT团队运营管理。</p>
                <p class="title-1">WDT相关链接：</p>
                <p class="main-2 last">WorldToken的官网<a href="http://www.WorldToken.cn">http://www.WorldToken.cn</a></p>
            </div>      
        </div> -->
    </div>
</template>
<script>
export default{
    data(){
      return{
          showHide:1,
          isactive:1
      }
    },
    methods:{
      fn(index){
         this.showHide=index;
         this.isactive=index;
      }
    }
  }
</script>
<style scoped>
.notice-box {
    background-color: #fff;
    min-height: 500px;
    margin: 0 auto;
    width: 950px;
    .placein{
		border-bottom: 1px solid #ccc;
		p{
			display: inline-block;
			font-size: 24px;
			color: #1a6fa6;
			border-bottom: 2px solid #1a6fa6;
		}
	}
	.placeul{
		margin-top: 20px;
	}
    .label{
    	width: 135.7px;
    	height: 35px;
    	line-height: 35px;
        font-size: 14px;
        color: #333;
        text-align: center;
        float: left;
        background: #ebebeb;
        border-right: 1px solid #fff;
        margin-top: 5px;
    }
    .active,.label:hover{
    	color: #1a6fa6;
        cursor:pointer;
    }
    .main-1{
    	font-size: 16px;
    	color: #333;
    	font-weight: bold;
    	position:relative;
    	border-bottom: 1px dashed #e6e6e6;
    	margin-top: 80px;
    	padding-bottom: 25px;
    }
    .tabke{
		width: 100%;
		table{
			width: 100%;
			tr{
				border-bottom: 1px dashed #e6e6e6;
				td{
					width: 33%;
					color: #333;
					font-size: 14px;
					line-height: 40px;
					padding-left: 40px; 
				}
			}
		}
    }
    .waring{
        color: red;
        font-size: 16px;
        line-height: 24px;
    }
    .waringfrist{
        margin-top: 20px;
    }
    .title-1{
    	font-size: 16px;
    	color: #333;
    	font-weight: bold;
    	padding-top: 20px;
    	padding-bottom: 20px;
    }
    .title-2{
        font-size: 14px;
        font-weight: bold;
        color: #333;
        margin: 10px 0;
    }
    .last{
        margin-bottom: 40px;
    }
    .main-2{
    	font-size: 14px;   
    	color: #333;
    }
    .main-3{
    	padding-bottom: 77px;
    	line-height: 30px;
    }
}
</style>