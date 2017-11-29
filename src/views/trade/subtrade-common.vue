<template>
<div class="tabscom">
  <!-- <div class="cellactive">
    <ul>
      <li>撤买</li>
      <li>撤卖</li>
      <li>全撤</li>
    </ul>
  </div> -->
  <el-tabs value="first">
    <el-tab-pane label="认购记录" name="first">
      <div class="contwarp">
      <table class="hislist1" v-if="crowtype==1">
          <thead>
            <tr class="btitle">
              <th class="middw">编号</th>
              <th class="maxw">认购时间</th>
              <th class="midd">认购币种</th>
              <th class="midd">认购数量</th>
              <th class="midd">YCC数量</th>
              <th class="midd cnanel">状态</th>
              <th class="midd cnanel">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in orderlist">
              <td class="middw">{{item.id}}</td>
              <td class="maxw">{{item.addtime}}</td>
              <td class="midd">{{item.currency}}</td>
              <td class="midd">{{item.amount}}</td>
              <td class="midd">{{item.ycc}}</td>
              <td class="midd cnanel">{{item.states}}</td>
              <td v-if="item.states=='认购成功'" class="midd cnanel colorcanel" @click="cannellist(item,index)">
                <el-button type="danger" :loading="canneles[index]" :disabled="canneles[index]">撤销</el-button>
              </td>
              <td v-else class="midd cnanel colorcanel">--</td>
            </tr>
          </tbody>
        </table>
        <!-- <table class="hislist1" v-if="crowtype==2">
          <thead>
            <tr class="btitle">
              <th class="middw">编号</th>
              <th class="maxw">认购时间</th>
              <th class="midd">认购币种</th>
              <th class="midd">认购数量</th>
              <th class="midd">YCC数量 </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderlist">
              <td class="middw">{{item.id}}</td>
              <td class="maxw">{{item.create_time}}</td>
              <td class="midd">{{item.ty==0?'买入':'卖出'}}</td>
              <td class="midd">{{item.price}}</td>
              <td class="midd">{{item.agreeprice}}</td>
            </tr>
          </tbody>
        </table> -->
        <el-pagination layout="prev, pager, next" @current-change="allmylistcoin" :page-size="15" :total="pagetotal"></el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
  
</template>
<script>
import { ajax,getcookie,icopricenum } from '../../assets/js/common'
  export default {
    props:['statee','symbolname','issuccess'],
    data() {
      return {
        
        // state:0,
        symbol:'BTC',
        pagetotal:0,
        // orderparm:{
        //   symbol:'YCCBTC',
        //   t:'all',
        //   ty:'history',
        //   pagesize:15,
        //   page:1,
        //   format:'',
        //   ico:1,
        // },
        icolistParam:{
          pagesize:15,
          page:1,
          format:'',
          currency:'BTC'
        },
        openTime:0,
        orderlist:[],
        crowtype:1,
        canneles:[],
      };
    },
    watch: {
      symbolname:function(val){
        this.symbol=val;
        if(this.crowtype==1){
          this.geticolist();
        }else{
          this.gethistorylist();
        }
      },
      statee:function(val){
        var _this=this;
        if(val==1){
          this.geticolist();
        }else{
          this.gethistorylist();
        }
      },
      issuccess(){
        if(this.crowtype==1){
          this.geticolist();
        }else{
          this.gethistorylist();
        }
      }
    },
    
    mounted:function(){
      this.$nextTick(function(){
        this.symbol=this.symbolname;
        this.crowtype=this.statee;
        if(getcookie('token')){
          if(this.crowtype==1){
            this.geticolist();
          }
          else{
            this.gethistorylist();
          }
        }
      });
    },
    // destroyed:function(){
    //   // clearInterval(this.openTime);
    // },
    methods: {
      //撤销认购
      cannellist(item,num){
        this.$set(this.canneles,num,true);
        ajax(this,this.extendApi.Reback,{id:item.id},(response)=>{
          this.$set(this.canneles,num,false);
          // this.canneles=false;
          if(response.code==200){
            this.$notify({
              title: '提示',
              message: '撤销成功',
              type: 'success'
            });
            this.geticolist();
          }
        });
      },
      //获取ico列表
      geticolist(){
        this.icolistParam.currency=this.symbol;
        var formate=encodeURI('Y-m-d H:i:s');
        this.icolistParam.format=formate;
        this.orderlist=[];
        this.canneles=[];
        ajax(this,this.extendApi.icoinvestlist,this.icolistParam,(response)=>{
          if(response.code==200){
            for(let i=0;i<response.data.data.length;i++){
              this.canneles.push(false);
            }
            this.orderlist=response.data.data;

            this.pagetotal=Number(response.data.total);
          }else{
            this.$notify({
              title: '提示',
              message: response.error,
              type: 'error'
            });
          }
        },'GET');
      },
      //获取认购列表
      gethistorylist(){
        var _this=this;
        var formate=encodeURI('Y-m-d H:i:s');
        this.orderparm.format=formate;
        this.orderparm.symbol='YCC'+sessionStorage.getItem('symbol');
        this.orderlist=[];
        ajax(this,this.extendApi.hisorder,this.orderparm,function(reponse){
          var reponse=reponse.data;
          if(reponse.code==200){
           if(reponse.data.length>0){
              for(let i=0;i<reponse.data.length;i++){
                let agreeprice=0;
                if(reponse.data[i].quantity==0){
                  agreeprice='--';
                }else{
                  agreeprice=(reponse.data[i].cost/reponse.data[i].quantity).toFixed(icopricenum(sessionStorage.getItem('symbol')));
                }
                reponse.data[i].agreeprice=agreeprice;
              }
              _this.orderlist=reponse.data;
              _this.pagetotal=reponse.total;
           }else{
             _this.orderlist=[];
             _this.pagetotal=0;
           }
          }else{
            _this.$notify({
              title: '提示',
              message: response.error,
              type: 'error'
            });
          }
        },'GET')
      },
     
      allmylistcoin(val){
        if(this.crowtype==1){
          this.icolistParam.page=val;
          this.geticolist();
        }
        else{
          this.orderparm.page=val;
          this.gethistorylist();
        }
      },
    }
  };
</script>
<style>
  .tabscom{
    color: #000;
    background: #fff;
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
        .cnanel{
          text-align: center;
          cursor: pointer;
        }
        .colorcanel{
          color: #c81118;
          .el-button{
            padding: 3px 10px !important;
          }
        }
        .mixw{
          min-width: 45px;
        }
      }
    }
  }
</style>