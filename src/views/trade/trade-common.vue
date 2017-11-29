<template>
<div class="tabscom">
  <!-- <div class="cellactive">
    <ul>
      <li>撤买</li>
      <li>撤卖</li>
      <li>全撤</li>
    </ul>
  </div> -->
  <el-tabs @tab-click="handleClick" value="first">
    <el-tab-pane label="委托交易明细" name="first">
      <div class="contwarp">
        <table class="hislist1">
          <thead>
            <tr class="btitle">
              <th class="middw">订单号</th>
              <th class="maxw">委托时间</th>
              <th class="midd">订单类型</th>
              <th class="midd">委托价格</th>
              <th class="midd">成交均价</th>
              <th class="midd">委托数量</th>
              <th class="midd">成交数量</th>
              <th class="mixw">状态</th>
              <th class="mixw">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderlist">
              <td class="middw">{{item.id}}</td>
              <td class="maxw">{{item.create_time}}</td>
              <td class="midd">{{item.ty==0?'买入':'卖出'}}</td>
              <td class="midd">{{item.price}}</td>
              <td class="midd">{{item.agreeprice}}</td>
              <td class="midd">{{item.oquantity}}</td>
              <td class="midd">{{item.quantity}}</td>
              <td class="mixw">{{getTradeStatus(item.status)}}</td>
              <td class="mixw" style="color:blue;cursor:pointer" @click="cannel(this,item.id)">撤单</td>
            </tr>
          </tbody>
        </table>
        <el-pagination layout="prev, pager, next" @current-change="myweituodan" :page-size="15" :total="pagetotal"></el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="历史交易明细" name="second">
      <div class="contwarp">
        <table class="hislist2">
          <thead>
            <tr class="btitle">
              <th class="middw">订单号</th>
              <th class="maxw">委托时间</th>
              <th class="maxw">成交时间</th>
              <th class="midd">订单类型</th>
              <th class="midd">委托价格</th>
              <th class="midd">成交均价</th>
              <th class="midd">委托数量</th>
              <th class="midd">成交数量</th>
              <!-- <th class="mixw">手续费</th> -->
              <th class="mixw">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderlist">
              <td class="middw">{{item.id}}</td>
              <td class="maxw">{{item.create_time}}</td>
              <td class="maxw">{{item.update_time}}</td>
              <td class="midd">{{item.ty==0?'买入':'卖出'}}</td>
              <td class="midd">{{item.price}}</td>
              <td class="midd">{{item.agreeprice}}</td>
              <td class="midd">{{item.oquantity}}</td>
              <td class="midd">{{item.quantity}}</td>
              <!-- <td class="mixw">{{item.poundage}}</td> -->
             <td class="mixw">{{getTradeStatus(item.status)}}</td>
            </tr>
          </tbody>
        </table>
        <el-pagination layout="prev, pager, next" @current-change="myweituodan" :page-size="15" :total="pagetotal"></el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="所有用户交易明细" name="third">
      <div class="contwarp">
        <table class="hislist3">
          <thead>
            <tr class="btitle">
              <th class="middw">订单号</th>
              <th class="maxw">委托时间</th>
              <th class="maxw">成交时间</th>
              <th class="midd">订单类型</th>
              <th class="midd">委托价格</th>
              <th class="midd">成交均价</th>
              <th class="midd">委托数量</th>
              <th class="midd">成交数量</th>
              <th class="mixw">状态</th>
            </tr>
          </thead>
          <tbody>
           <tr v-for="(item,index) in orderlist">
              <td class="middw">{{item.id}}</td>
              <td class="maxw">{{item.create_time}}</td>
              <td class="maxw">{{item.update_time}}</td>
              <td class="midd">{{item.ty==0?'买入':'卖出'}}</td>
              <td class="midd">{{item.price}}</td>
              <td class="midd">{{item.quantity==0? '--' : formatquantity(item.cost,item.quantity) }}</td>
              <td class="midd">{{item.oquantity}}</td>
              <td class="midd">{{item.quantity}}</td>
              <td class="mixw">{{getTradeStatus(item.status)}}</td>
            </tr>
          </tbody>
        </table>
        <el-pagination layout="prev, pager, next" @current-change="myweituodan" :page-size="15" :total="pagetotal"></el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
  
</template>
<script>
import { ajax,getcookie,formatcoinpriceHQ } from '../../assets/js/common'
  export default {
    props:['statee','updateurl','updatesymbol'],
    data() {
      return {
        loading2:true,
        // state:0,
        pagetotal:0,
        orderparm:{
          symbol:'BCCBTC',
          order_type:'all',
          order_statu:'open',
          pagesize:15,
          page:1,
          format:'',
        },
        openTime:0,
        orderlist:[],
        cancelparm:{
          orderid:'',
          currency:'',
          currency2:'BTC',
        }
      };
    },
    watch: {
      updateurl:function(val){
        this.loading2=true;
        this.orderlist=[];
        if(getcookie('token')){
          if(this.updatesymbol){
            this.gethistorylist();
          }
        }
      },
      statee:function(val){
        var _this=this;
        if(getcookie('token')){
          setTimeout(function(){
            _this.gethistorylist();
          }, 1000);
        }
      }
    },
    mounted:function(){
      this.$nextTick(function(){
        this.orderlist=[];
        if(getcookie('token')){
          if(this.updatesymbol){
            this.gethistorylist();
            this.openTime=setInterval(()=>{
              this.gethistorylist();
            }, 5000);
          } 
        }
      });
    },
    destroyed:function(){
      clearInterval(this.openTime);
    },
    methods: {
      getTradeStatus(e) {
        let itemObj = {
          0:'挂单',
          1:'成交',
          2:'已撤单',
          3:'部成',
        }
        return itemObj[e];
      },
      formatquantity(cost,quantity){
        if(formatcoinpriceHQ(sessionStorage.getItem('symbol'))==0){
          return parseInt(cost/quantity);
        }
        else{
          return (cost/quantity).toFixed(formatcoinpriceHQ(sessionStorage.getItem('symbol')));
        }
      },
      handleClick(tab, event) {
        clearInterval(this.openTime);
        var _this=this;
        var formate=encodeURI('Y-m-d H:i:s');
        this.loading2=true;
        this.orderparm.format=formate;
        this.orderlist=[];
        if(tab.index==0){
          this.orderparm.order_statu='open';
          this.orderparm.order_type='all';
          this.gethistorylist();
          this.openTime=setInterval(()=>{
            this.gethistorylist();
          }, 5000);
        }else if(tab.index==1){
          this.orderparm.order_statu='history';
          this.orderparm.order_type='all';
          clearInterval(this.openTime);
          this.gethistorylist();
        }else{
          this.orderparm.order_statu='all';
          this.orderparm.order_type='bs';
          clearInterval(this.openTime);
          this.gethistorylist();
        }
      },
      //获取历史订单列表
      gethistorylist(){
        var _this=this;
        var formate=encodeURI('Y-m-d H:i:s');
        this.orderparm.format=formate;
        this.orderparm.symbol=this.updatesymbol+'BTC';
        ajax(this,this.extendApi.hisorder,this.orderparm,function(reponse){
          if(reponse.code==200){
            var reponse=reponse.data;
            if(_this.updatesymbol+'BTC' == reponse.symbol){
              _this.loading2=false;
              if(reponse.data.length>0){
                for(let i=0;i<reponse.data.length;i++){
                  let agreeprice=0;
                  if(reponse.data[i].quantity==0){
                    agreeprice='--';
                  }else{
                    if(formatcoinpriceHQ(sessionStorage.getItem('symbol'))==0){
                      agreeprice=parseInt((reponse.data[i].cost/reponse.data[i].quantity));
                    }
                    else{
                      agreeprice=(reponse.data[i].cost/reponse.data[i].quantity).toFixed(formatcoinpriceHQ(sessionStorage.getItem('symbol')));
                    }
                  }
                  reponse.data[i].agreeprice=agreeprice;
                }
                _this.orderlist=reponse.data;
                _this.pagetotal=reponse.total;
              }else{
                _this.orderlist=[];
                _this.pagetotal=0;
              }
            }
          }else{
            _this.$notify({
              title: '提示',
              message: reponse.message,
              type: 'error'
            });
          }
        },'GET')
      },
      cannel(self,id){
        var _this=this;
        this.cancelparm.orderid=id;
        this.cancelparm.currency=sessionStorage.getItem('symbol');
        ajax(this,this.extendApi.Cancel,this.cancelparm,function(response){
          if(response.code==200){
            setTimeout(function(){
              _this.gethistorylist();
              _this.$emit('reFlashMoney');
            }, 1500);
            _this.$notify({
              title: '成功',
              message: '撤单成功',
              type: 'success',
              duration:'2000'
            });
          }else{
            _this.$notify({
              title: '失败',
              message: '撤单失败',
              type: 'error'
            });
          }
        })
      },
      myweituodan(val){
        this.orderparm.page=val;
        this.gethistorylist();
      },
      buy(){
        console.log(123);
      }
    }
  };
</script>
<style>
  .tabscom{
    color: #000;
    /*position: relative;*/
    .el-tabs__item.is-active {
      color: #000;
    }
    .el-tabs__active-bar{
      background-color: #c81118;
    }
    .el-tabs__item{
      padding: 0 24px;
    }
    .el-pager li.active{
      border-color: #c81118;
      background-color: #c81118;
    }
    .el-pagination{
      margin-top: 15px;
    }
    .cellactive{
      width: 225px;
      float: right;
      margin-right: 125px;
     /* top:0px;
      position: absolute;
      right: 125px;*/
      ul{
        width: 225px;
        height: 40px;
        li{
          float: left;
          width: 75px;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .contwarp{
      width: 934px;
      margin: 0 auto;
      .hislist1,.hislist2,.hislist3{
        width: 100%;
        border-spacing: 0;
        font-size: 13px;
        .btitle{
          background: rgb(235,235,235);
        }
        th,td{
          padding: 0px;
          font-weight: 500;
          height: 30px;
          text-align: left;
        }
        tbody{
          tr:nth-child(2n+2){
            background: rgb(235,235,235);
          };
        }
        .middw{
          min-width: 120px;
          padding-left: 15px;
        }
        .maxw{
          min-width: 180px;
        }
        .midd{
          min-width: 70px;
        }
        .mixw{
          min-width: 45px;
        }
      }
    }
  }
</style>