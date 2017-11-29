<template>
  <div class="rbottom">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="最新成交单" name="first">
      <div class="tabletitle">
        <ul class="newtradess">
          <li>成交时间</li>
          <li>成交价格</li>
          <li>成交数量</li>
          <li class="amount" >总金额</li>
        </ul>
      </div>
      <div class="content1">
        <table>
          <tbody class="tbodys">
            <tr v-for="item in newtrade" class="newtradess">
              <td>{{item.time}}</td>
              <td :class="{'buycolor':item.type==0,'sellcolor':item.type==1}">{{item.price|priceFormat}}</td>
              <td >{{item.am|formatNum}}</td>
              <td class="amount">{{parseFloat(item.am*item.price).toFixed(8)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </el-tab-pane>
      <el-tab-pane label="我的委托单" name="second">
        <div class="tabletitle">
          <ul class="myweituoes">
            <li>委托时间</li>
            <li>委托价格</li>
            <li>委托数量</li>
            <li>成交数量</li>
            <li class='right-alignment'>撤销</li>
          </ul>
        </div>
        <div class="content2">
          <table>
            <tbody>
              <tr class="myweituoes" v-for="item in orderlist">
                <td>{{item.create_time}}</td>
                <td :class="{'buycolor':item.ty==0,'sellcolor':item.ty==1}">{{item.price|priceFormat}}</td>
                <td >{{item.oquantity|formatNum}}</td><!-- :class="{'buycolor':item.ty==0,'sellcolor':item.ty==1}" -->
                <td>{{item.quantity|formatNum}}</td>
                <td class="cell right-alignment" @click="canneltrade(item.id)">撤单</td>
              </tr>
            </tbody>
          </table>
          <!-- <p v-if='orderlist.length==0' class="noData">暂无数据</p> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的成交单" name="fourth">
        <div class="tabletitle">

          <ul class="myweituoes mynote">
            <li>委托时间</li>
            <li>委托价格</li>
            <li>成交价格</li>
            <li>成交数量</li>
            <!-- <li>手续费</li> -->
            <li class='right-alignment'>状态</li>
          </ul>
        </div>
        <div class="content3">
          <table>
             <tbody>
              <tr class="myweituoes mynote" v-for="item in orderlist">
               <td>{{item.create_time}}</td>
                <td :class="{'buycolor':item.ty==0,'sellcolor':item.ty==1}">{{item.price|priceFormat}}</td>
                <td :class="{'buycolor':item.ty==0,'sellcolor':item.ty==1}">{{item.quantity==0? '--' : formatquantity(item.cost,item.quantity)}}</td>
                <td>{{item.quantity|formatNum}}</td>
                <!-- <td>{{item.poundage}}</td> -->
                <td class="mixw estate right-alignment">{{getTradeStatus(item.status)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import {ajax,cannel,getusermoney,formatcoinNum,formatcoinpriceHQ,formatcoinprice} from '../../assets/js/common'
  export default{
    props:['newtradedata','flashSymbal'],
    data(){
      return{
        newtrade:[],
        orderlist:[],
        orderparm:{
          symbol:'BCCBTC',
          order_type:'all',
          order_statu:'open',
          pagesize:15,
          page:1,
          format:'',
          amstring:1,
        },
        tabindex:0,//判断处于第几个tab页
        cancelparm:{
          orderid:'',
          currency:'',
          currency2:'BTC',
        },
        myAssets:{
          availablecoin:'--',
          frozencoin:'--',
          availablemoney:'--',
          frozenmoney:'--',
        },
        activeName:'first',
        historyTime:0,
        openTime:0,
      }
    },
    watch:{
      newtradedata:function(val){
        this.newtrade=val;
      },
      flashSymbal:function(){//切换币种时的操作
        this.orderlist=[];
        if(this.tabindex==1){
          this.orderparm.order_statu='open';
          this.orderparm.order_type='all';
          this.gethistorylist('open');
        }else if(this.tabindex==2){
          this.orderparm.order_statu='history';
          this.orderparm.order_type='all';
          this.gethistorylist('history');
        }
      }
    },
    filters:{
      //格式化数量小数点位数
      formatNum(e){
        // console.log(e);
        if(e==''||e==undefined){
          return '--';
        }
        if(formatcoinNum(sessionStorage.getItem('symbol'))==0){
          return parseInt(e);
        }
        else{
          return  parseFloat(e).toFixed(formatcoinNum(sessionStorage.getItem('symbol')))
        }
      },
      priceFormat:function(dev){//控制行情价格位数
         // if(formatcoinprice(sessionStorage.getItem('symbol'))==0){
         //   return parseInt(dev);
         // }
         // else{
          return parseFloat(dev).toFixed(formatcoinprice(sessionStorage.getItem('symbol')));
         // }
      }
    },
    mounted(){
      clearInterval(this.historyTime);
      clearInterval(this.openTime);
      setTimeout(()=>{
        $(".content1").mCustomScrollbar('destroy');
        $(".content2").mCustomScrollbar('destroy');
        $(".content3").mCustomScrollbar('destroy');
        $('.content1').mCustomScrollbar({
          scrollButtons:{  
            enable:false,//是否使用上下滚动按钮  
          }, 
          autoHideScrollbar: true,
        });
      },200);
    },
    destroyed:function(){
      clearInterval(this.historyTime);
      clearInterval(this.openTime);
    },
    methods:{
      getTradeStatus(e) {
        let itemObj = {
          0:'挂单',
          1:'成交',
          2:'已撤单',
          3:'部成',
        }
        return itemObj[e];
      },
      handleClick(tab,event){
        $(".content1").mCustomScrollbar('destroy');
        $(".content2").mCustomScrollbar('destroy');
        $(".content3").mCustomScrollbar('destroy');
        this.tabindex=0;
        this.orderlist=[];
        clearInterval(this.openTime);
        clearInterval(this.historyTime);
        // console.log(tab.index);
        if(tab.index==1){
          this.orderparm.order_statu='open';
          this.orderparm.order_type='all';
          this.tabindex=1;
          setTimeout(function(){
            $('.content2').mCustomScrollbar({
              scrollButtons:{  
                  enable:false //是否使用上下滚动按钮  
              }, 
              autoHideScrollbar: true,
            });
          }, 300);
          // clearInterval(this.historyTime);
          this.gethistorylist('open');
          this.openTime=setInterval(()=>{
            this.gethistorylist('open');
          }, 3000);
        }else if(tab.index==2){
          this.tabindex=2;
          this.orderparm.order_statu='history';
          this.orderparm.order_type='all';
          setTimeout(function(){
            $('.content3').mCustomScrollbar({
              scrollButtons:{  
                enable:false //是否使用上下滚动按钮  
              }, 
              autoHideScrollbar: true,
            });
          }, 300);
          this.gethistorylist('history');
          this.historyTime=setInterval(()=>{
            this.gethistorylist('history');
          }, 3000);
        }else{
          setTimeout(function(){
            $('.content1').mCustomScrollbar({
              scrollButtons:{  
                enable:false //是否使用上下滚动按钮  
              }, 
              autoHideScrollbar: true,
            });
          }, 300);
        }
      },
      //获取历史订单列表
      gethistorylist(listtype){
        var _this=this;
        this.orderparm.symbol=sessionStorage.getItem('symbol')+"BTC";
        if(listtype=='history'){
          this.orderparm.order_statu='history';
        }else{
          this.orderparm.order_statu='open';
        }
        ajax(this,this.extendApi.hisorder,this.orderparm,function(reponse){
          if(reponse.code==200){
            var reponse=reponse.data;
            if(sessionStorage.getItem("symbol")+"BTC" == reponse.symbol){
              if(reponse.data.length>0){
                _this.orderlist=reponse.data;
                console.log(_this.orderlist);
              }else{
                _this.orderlist=[];
              }
            }
          }else if(reponse.code==-2){
             _this.$alert(
                '您还未登录，请先登录',
                '提示',
            ).then(() => {
              _this.$router.push({
                path: '/'
              });
            });
          }else{
            _this.$notify({
              title: '提示',
              message: reponse.message,
              type: 'error'
            });
          }
        },'GET')
      },
      formatquantity(cost,quantity){
        return (cost/quantity).toFixed(formatcoinprice(sessionStorage.getItem('symbol')));
      },
      canneltrade(id){
        cannel(this,id);
      },
    }
  }
</script>
<style>
  .rbottom{
    /*height: 190px;*/
    height: 230px;
    width: 100%;
    margin-top: 2px;
    background: rgba(15,15,15,15);
    .buycolor{
      color: #c81118;
    }
    .sellcolor{
      color: #46962e;
    }
    .content1,.content2,.content3{
      width: 100%;
      height: 170px;
      overflow: auto;
      .noData{
        text-align: center;
        margin-top: 20px;
      }
      table{
        width: 100%;
      }
    }
    .el-tabs__header{
      clear: both;
      border-bottom: 0px solid rgba(225, 225, 225, 0.2);
      margin: 0;
      height: 30px;
    }
    .el-tabs__item{
      width: 33%;
      text-align: left;
      height: 30px;
      line-height: 30px;
      padding-left: 0px;
    }
    .el-tabs__item.is-active,.el-tabs__item:hover{
      color: rgb(255, 102, 0)!important;
    }
    .el-tabs__item {
      color:#84451b;
    }
    .el-tabs__active-bar{
      height: 0;
    }
    .el-tabs__content{
      width: 100%;
      padding: 0;
      color: #999;
      /*height: 160px;*/
      height: 210px;
      overflow: hidden;
      .sctbody{
        height: 170px;
        overflow: auto;
      }
      /*.el-tab-pane{
        width: 100%;
        .tabletitle{
          width: 100%;
        }
      }*/
      /*.tabletitle{
        ul{
          margin-left: 0!important;
        }
      }*/
      .newtradess{
        width: 100%!important;
        height: 20px!important;
        li{
          /*width:130px;*/
          width: 25%;
          color: #555;
          height: 20px;
          line-height: 20px;
          text-align: left!important;
          float: left;
        }
        td{
          /*width:130px;*/
          width: 25%;
          height: 20px;
          line-height: 20px;
          text-align: left;
          
        }
        .amount{
          text-align: right!important;
          /*padding-right:0px; */
          padding-right: 3px!important;
        }
      }
      .myweituoes{
        width: 100%!important;
        height: 20px!important;
        li{
          width:20%;
          color: #808080;
          height: 20px;
          line-height: 20px;
          text-align: left!important;
          float: left;
        }
        td{
          width:20%;
          height: 20px;
          line-height: 20px;
          text-align: left;
        }
        .estate{
          text-align: right;
        }
        .right-alignment{
          text-align: right!important;
          padding-right:3px!important; 
          
        }
        .cell:hover{
          color: #c81118;
          cursor: pointer;
        }
      }
      .mynote{
        li,td{
          width: 20%;
        }
      }
    }
  }
</style>