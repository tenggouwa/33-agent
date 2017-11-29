<template>
	<div class="contantbottom">
    <div class="contantleft">
      <ul class="middle-box">
        <li>
          <router-link to='/tradecenter/entrustment'>
            <a href="" :class="{'lsactive':hasactive==1}" @click="tradeone">
              委托交易明细
            </a>
          </router-link>
        </li>
        <li>
          <router-link to='/tradecenter/history'>
            <a href="" :class="{'lsactive':hasactive==2}" @click="tradetwo">
              历史交易明细
            </a>
          </router-link>
        </li>
        <li>
          <router-link to='/tradecenter/everybody'>
            <a href="" :class="{'lsactive':hasactive==3}" @click="tradethree">
              所有用户交易明细
            </a>
          </router-link>
        </li>
      </ul>
    </div>
      <!-- <router-view :dataList="dataList"></router-view> -->
      <div class="entru" v-loading="tabkeload">
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
          <tr v-for="item in dataList">
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
    </div>   
  </div>
</template>
<script>
import {ajax} from "../../../assets/js/common.js"
export default {
	data(){
		return{
      tabkeload:true,
      currency:'ETH',
			hasactive:1,
      dataList:[],
      orderList:{
        symbol:'ETHBTC',//货币对
        order_type:'all',//订单类型
        order_statu:'open',
        pagesize:15,
        page:1,
        format:'',
        amstring:'',
      }
		}
	},
  props:['symbol'],
  mounted(){
    this.$router.push({path:"/tradecenter/entrustment"});
    this.tradeone();
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
  // created(){
  //   this.interTime = setInterval(()=>{
  //     this.tradeone();
  //   },2000)
  // },
  // destroyed:function(){
  //   clearInterval(this.interTime);
  // },
  //tradeOrder
	methods:{
    tradeone(){
      this.tabkeload = true;
      let that = this;
      that.orderList.order_statu = '';
      that.orderList.order_statu = 'open';
      // that.fn(1);
      that.orderbottom();
    },
    tradetwo(){
      this.tabkeload = true;
      let that = this;
      that.orderList.order_statu = '';
      that.orderList.order_statu = 'history';
      // that.fn(2);
      that.orderbottom();
    },
    tradethree(){
      this.tabkeload = true;
      let that = this;
      that.orderList.order_statu = '';
      that.orderList.order_statu = 'all';
      // that.fn(3);
      that.orderbottom();
    },
    //控制切换
    // fn(index){
    //   this.showHide = index;
    //   console.log(index)
    // },
    // orderList
    orderbottom(){
      let _this = this;
      _this.orderList.symbol = _this.currency+'BTC';
      ajax(_this,_this.extendApi.hisorder,_this.orderList,(res)=>{
        _this.tabkeload = false;
        if(res.code == 200){
          _this.dataList=[];
          _this.dataList = res.data.data;
        }else{
          
        }
      },'GET')
    },
    gotolink(id){
      switch(id){
        case 1:
        this.hasactive = id;
        break;
        case 2:
        this.hasactive = id;
        break;
        case 3:
        this.hasactive = id;
        break;
      }
    }
  },
  watch:{
    symbol:function(val){
      this.currency=val;//改变货币对
      this.tradeone();
    },
    '$route' (to,from){
      var path = to.path;
      // console.log(path);
      switch(path){
        case '/tradecenter/entrustment':
        this.gotolink(1);
        break;
        case '/tradecenter/history':
        this.gotolink(2);
        break;
        case '/tradecenter/everybody':
        this.gotolink(3);
        break;
      }
    }
  }
}
</script>
<style scoped>
		.contantbottom{
		/*float: left;*/
		width: 990px;
		min-height: 160px;
		background: #fff;
		margin: 10px 0 0 10px;
		border:1px solid #eee; 
    padding-bottom: 50px;
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
    .middle-box{
      width: 100%;
      overflow: hidden;
      border-bottom: 1px solid #eee;
      margin-top: 30px;
      li{
        float: left;
        line-height: 30px;
        font-size: 16px;
        margin: 0 10px;
        cursor: pointer;
        a{
          /*margin-bottom: -20px;*/
          a{
            /*margin-bottom:-2px;*/
          }
        }
      }
      .lsactive{
        color: #1a6fa6;
        border-bottom: 1px solid #1a6fa6;
        padding-bottom: 3px;  
      }
    }
	}
</style>