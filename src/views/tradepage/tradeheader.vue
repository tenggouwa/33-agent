<template>
  <div class="tradeheader">
    <div class="logo">
      <a href="" class='btlogo' ></a>
      <div class="tb-table" v-show="ishowtrade==true" >
        <table @mouseleave="hidetrade" @mouseover="showtrade">
          <thead>
            <tr>
              <th>交易市场</th>
              <th>最新价</th>
              <th>涨跌幅</th>
              <th>最低</th>
              <th>最高</th>
              <th>交易量</th>
            </tr>
          </thead>
          <tbody id="getsymbol">
            <tr v-for="(item,index) in coinlastdata"  @click="getSymbol(index)" :class="{'clickactive':ind==index}">
            <td class='currency-name'>{{index | formatCoin}}</td>
              <td class='up-to-date'>{{item['last']}}</td>
              <td class='highslows' v-bind:class="{'ups-downs':parseFloat(item.last)>parseFloat(item.open)}">{{item.range}}</td>
              <td>{{item['low'] }}</td>
              <td>{{item['high'] }}</td>
              <td>{{item['vol']}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ul class="neworice frist" @click="getSymbol('BCC')" @mouseover="ishowtrade=false" >
      <li  class='btcbox' id="bccsymbol" >
        <a class="currency" :class="{active:currencySymbol=='BCC'}">BCC/BTC {{BCCcurrencyLast}}</a>
      </li>
    </ul>

    <ul class="neworice" @click="getSymbol('ETH')" @mouseover="ishowtrade=false">
      <li class='btcbox ' id="ethsymbol" >
        <a class="currency" :class="{active:currencySymbol=='ETH'}">ETH/BTC {{ETHcurrencyLast}}</a>
      </li>
    </ul>
    <ul class="neworice" @click="getSymbol('ETC')" @mouseover="ishowtrade=false" v-if="smallscrell==false">
      <li class='btcbox ' id="etcsymbol" >
        <a class="currency" :class="{active:currencySymbol=='ETC'}">ETC/BTC {{ETCcurrencyLast}}</a>
      </li>
    </ul>
    <ul class="neworice" >
      <li @mouseover="showtrade" class='btcbox'>
        <a class="active" >
            <p v-if="currency!='BTC' && currency!='BCC'" class='moercur' :class="{'liactiveee':isactiveae=='0'}" >{{currency|showchange}}</p> 
            <p v-if="currency=='ETH' || currency=='BCC'">更多市场</p>
            <p v-if="currency!='BTC' && currency!='BCC'" class="happen">{{currencyLast}}</p>
        </a>
        <p class='arrowhead' v-show="orange"><img src="../../assets/img/arrowhead.png" alt=""></p> 
        <p class='arrowhead' v-show="huise"><img src="../../assets/img/hui.png" alt=""></p> 
      </li>
    </ul> 
    <div  class="period-indicator">
      <ul class="period" id="period">
      <li name="M1" class="period_content" @click="changePeriod('M1')" ><a href="#" v-bind:class="{ active: isperiodshow('M1') }" >M1</a></li>
      <li name="M5" class="period_content" @click="changePeriod('M5')"><a href="#" v-bind:class="{ active: isperiodshow('M5') }">M5</a></li>
      <li name="M15" class="period_content" @click="changePeriod('M15')"><a href="#" v-bind:class="{ active: isperiodshow('M15') }">M15</a></li>
      <li name="M30" class="period_content" @click="changePeriod('M30')"><a href="#" v-bind:class="{ active: isperiodshow('M30') }">M30</a></li>
      <li name="H1" class="period_content" @click="changePeriod('H1')"><a href="#" v-bind:class="{ active: isperiodshow('H1') }">H1</a></li>
      <li name="H2" class="period_content" @click="changePeriod('H2')"><a href="#" v-bind:class="{ active: isperiodshow('H2') }">H2</a></li>
      <li name="H4" class="period_content" @click="changePeriod('H4')"><a href="#" v-bind:class="{ active: isperiodshow('H4') }">H4</a></li>
      <li name="D1" class="period_content" @click="changePeriod('W1')"><a href="#" v-bind:class="{ active: isperiodshow('D1') }">D1</a></li>
      <li name="W1" class="period_content"><a href="#" v-bind:class="{ active: isperiodshow('W1') }">W1</a></li>
      <li name="MN1" class="period_content" @click="changePeriod('MN1')"><a href="#" v-bind:class="{ active: isperiodshow('MN1') }">MN1</a></li>
    </ul>
    <div class="indicator" id="Indicator_list">
      <label >MA</label>
      <label>VOLUMES</label>
      <label>MACD</label>
      <label>BOLLING</label>
      <label>KDJ</label>
    </div>
    </div>
   
    <div class="freetimebox ">
      <ul>
        <li>时间：2017-7-31 11:20</li>
        <li>开：1422</li>
        <li>高：8545</li>
        <li>低：47444</li>
        <li>收：475</li>
        <li>涨幅：44%</li>
        <li>振幅：0.11%</li>
        <li>量：46665</li>
      </ul>
    </div>
    <!-- <div class="Contact">
      <ul>
        <li @mouseleave="hiddenimg(0)"> 
          <router-link to="/appload">
            <img @mouseover="showimg(0)" src="../../assets/img/app-heaed.png" alt="" style="width:34px">
          </router-link>
          <div class="groupimg" v-show="imgisshow[0]==true">
            <img class="showindex 33erweima" src="../../assets/img/app/andimg.png" alt="">
            <img class="showios" src="../../assets/img/app/iosimg.png" alt="">
          </div>
        </li>
         <li class='tx-icon' @mouseleave="hiddenimg(1)">
          <a >
            <img src="../../assets/img/y-call.png" alt=""  @mouseover="showimg(1)">
            <p v-show="imgisshow[1]==true" class="qqinfo">400-1566-899</p>
          </a>
        </li>
        <li class='tx-icon' @mouseleave="hiddenimg(2)">
          <a class="licaiimg">
            <img src="../../assets/img/weixin.png" alt="" @mouseover="showimg(2)">
            <div v-show="imgisshow[2]==true" class="qqinfo" >
              <p>公众号 : bitlicai</p>
              <p class='wximg' ><img src="../../assets/img/wxgzh.jpg" alt="" style="width:120px;height:120px"></p>
            </div>
            
          </a>
        </li>
        <li class='tx-icon' @mouseleave="hiddenimg(3)">
          <a >
            <img src="../../assets/img/QQjiaoyi.png" alt="" @mouseover="showimg(3)" >
            <div v-show="imgisshow[3]==true" class="qqinfo">
                <p>官方QQ群</p>
                 <ul style="width:140px;height:85px;background:#232325;margin-left:-30px;text-align:center">
                   <li style="width:140px;margin-left:0;">
                     ①群：345106800
                   </li>
                   <li style="width:140px;margin-left:0;">
                     ②群：545967811
                   </li>
                 </ul>
               </div>
          </a>
        </li>
        <li class='tx-icon' @mouseleave="hiddenimg(4)">
          <a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=4001566899&aty=2&a=2&curl=&ty=1" target="_blank">
            <img src="../../assets/img/header/kf.png" alt=""  @mouseover="showimg(4)">
            <p v-show="imgisshow[4]==true" class="qqinfo yxQQ">营销QQ 4001566899</p>
          </a>  
        </li>
      </ul>
    </div> -->
    <div class="fright">
      <ul class="islog" @mouseleave="hidelogo(2)">
        <li class="logins" v-if="islogin==false">
          <span @mouseover="showlogin">登录/注册</span>
          <tradelogin @tradeSuccess="loginSuccess" :showLogin="tradeComLogin" :shownum="1" :logins="1"></tradelogin>
        </li>
        <li class="logins" v-if="islogin==true">
          <span @mouseover="showlogo(2)" class="user-num">{{username}}</span>
          <div class="logincom islogo" v-show="shwomoney"  @mouseleave="hidelogo(2)">
            <p class='total-assets'>
               <!--  <span>总资产:</span>
                <span class='assets'>{{moneyinfo.valuation}}</span> -->
            </p>
            <div class="btn-box">
              <button class="rech" ><router-link to="/usercenter/fince">充币</router-link></button>
              <span id="exit" @click="goOut()">退出</span>
            </div>
            <table class="table">
              <thead>
                <tr class="coinmoney">
                  <th>币种</th>
                  <th class='at-right'>可用</th>
                  <th class='at-right'>冻结</th>
                </tr>
              </thead>
              <tbody>
                <tr class="coinmoney" v-for="(item,index) in moneyinfo" v-if="index != 'valuation'">
                  <td>{{index|filterIndex}}</td>
                  <td >{{item.active}}</td>
                  <td >{{item.frozen}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
      <ul v-if="cutout==false" class='cutout islog'>
        <li v-show="reveall">
          <router-link to="/usercenter/fince">
            <span class="shift-in">我的资产</span>
          </router-link>
        </li>
         <li>
           <a  @click="gototrade"><span class="shift-in">交易中心</span></a> 
        </li>
         <li>
          <router-link to="/traditional">
            <span :class="{'liactive':change=='0'}" class="shift-in" style="display:block;height:40px;">专业交易</span>
          </router-link>
        </li>
        <li>
          <router-link to="/innovate">
            <span :class="{'liactive':change=='1'}"  class="shift-in"  style="display:block;height:40px;">闪电交易</span>
          </router-link>
        </li>
      </ul>
      <div v-show="unlash" class="unlash-more">
          <h3>{{selected}}</h3>
          <p class='arrowhead1'><img src="../../assets/img/arrowhead.png" alt=""></p> 
          <ul class="over-flow">
          <li v-show="reveall" @mouseover="hidelogo(2)">
            <router-link to="/usercenter/fince">
              <span>我的资产</span>
            </router-link>
          </li>
           <li>
             <a  @click="gototrade"><span>交易中心</span></a> 
          </li>
           <li>
            <router-link to="/traditional">
              <span  @click="tradingg">{{trading}}</span>
            </router-link>
          </li>
          <li>
            <router-link to="/innovate">
              <span @click="flashtradingg">{{flashtrading}}</span>
            </router-link>
          </li>
          </ul>
      </div>
      <div style="float:left">
        <a  @click="harvest" class="harvest" v-if='harvesta==false||harvesta=="false"'><img src="../../assets/img/harvest.png" alt=""></a>
        <a  @click="leavea" class="harvest" v-if='harvesta==true||harvesta=="true"'><img src="../../assets/img/leave.png" alt=""></a> 
      </div>
    </div> 
  </div>
</template>
<script>
import { ajax,getcookie,setcookie,delatecookie,sublogion,goregister,formatcoinprice} from '../../assets/js/common'
import tradelogin from './tradelogin.vue'
  export default{
    props:['moneyinfo','change','fullChange','listentochild','loginsuccess'],
    data(){
      return {
        imgisshow:[false,false,false,false],
        ishowtrade:false,
        islogin:false,//判断是否登录
        shwomoney:false,//登录下鼠标移入的控制
        tradeComLogin:false,
        isactive:1,
        isactiveae:0,
        smallscrell:false,
        isActivea:false,
        reveall:false,
        cutout:false,
        unlash:false,
        harvesta: false||sessionStorage.getItem('harvesta'),
        leave:false,
        isinvote:0,
        huise:false,
        orange:false,
        ind:'',
        username:'',
        selected:'更多',
        trading:'专业交易',
        flashtrading :'闪电交易',
        coinlastdata:{
          BCCBTC:{},
          ETHBTC:{},
          ETCBTC:{},
          // SCCNY:{},
          ZECBTC:{},
          // BTSCNY:{},
          LTCBTC:{},
          // NYCCCNY:{},
          // WTCCNY:{},
        },
        lowpassword:{
        mobile:'',
        email:'',
        vparam:'',
        codetype:'',
        },
        viladtecode:'',
        respassword:'',
        respasswordagain:'',
        currencySymbol:sessionStorage.getItem('symbol'),
        currency:'BCC',
        BTCcurrencyLast:'',
        // WTCcurrencyLast:'',
        ETHcurrencyLast:'',
        ETCcurrencyLast:'',
        SCcurrencyLast:'',
        BCCcurrencyLast:'',
        // NYCCcurrencyLast:'',
        currencyLast:'',
        login:{
          redirect_uri:'https://licai.cn',
          ltype:'web',
          username:'',
          password:'',
        },
        regester:{
          username:'',
          password:'',
        },
        interTime:0,
      }
    },
    created(){
      if(this.harvesta==null){
        this.harvesta=false;
      }
    },

    filters:{
      formatCoin:function(dev){
        return dev.substr(0,dev.length-3)+'/'+'BTC';
      },
      filterIndex(e){
        if(e == 'NYCC'){
          return 'YCC';
        }
        else if(e == 'YCC'){
          return 'DYCC';
        }
        else if(e == 'WTC'){
          return 'WDT';
        }
        else{
          return e;
        }
      },
      showchange(e){
        if(e == '更多市场'){
          return e;
        }else{
          return e+'/BTC';
        }
      },
      getRise:function(e){
        let difference=(parseFloat(e.last))-parseFloat(e.open);
        let rose=(parseFloat(difference)/parseFloat(e.open))*100 ;
        let num=parseFloat(rose).toFixed(2);
        if(rose>0){
          return '+'+num
        }else{
          return num
        }
      },
    },
    destroyed(){
      clearInterval(this.interTime);
    },
    mounted:function(){
      this.flashRoute();
      // this.getcoindata();
      this.getmwh();
      // this.harvest();
      this.interTime=setInterval(()=>{
        // this.getcoindata();
      },2000);
      if(getcookie('token')){
        this.islogin=true;
        this.username=getcookie('username');
        this.reveall=true;
      }
      var activecoin=sessionStorage.getItem('symbol');
      if(activecoin=='null'||activecoin==null){
        this.getSymbol('BCC');
      }
      else{
        this.getSymbol(activecoin);
      }

      if(document.body.clientWidth<1366){
        this.smallscrell=true;
      }else{
        this.smallscrell=false;
      }
     
    },
    components:{
      tradelogin
    },
    watch:{
      '$route' (to, from){
        var path=to.path;
        switch(path){
          case '/traditional':
          this.isinvote=0;
          break;
          case '/innovate':
          this.isinvote=1;
          break;
        }
      },
      loginsuccess(){
        if(getcookie('token')){
          this.islogin=true;
          this.username=getcookie('username');
          this.reveall=true;
        }
      }
    },
    methods:{
      loginSuccess(){
        if(getcookie('token')){
          this.islogin=true;
          this.username=getcookie('username');
          this.reveall=true;
        }
        this.$emit('headlogin');
      },
      showlogin(){
        this.tradeComLogin=!this.tradeComLogin;
      },
      changePeriod(period){
        $.cookie('period',period)
      },
      showimg(num){
        this.ishowtrade=false;
        this.$set(this.imgisshow,num,true)
      },
      hiddenimg(num){
        this.$set(this.imgisshow,num,false)
      },
      showtrade(){
        this.ishowtrade=true;
        let selectcoin=sessionStorage.symbol+'CNY';
        // if(selectcoin=="YCCCNY"){
        //   selectcoin="NYCCCNY"
        // }
        for(let index in this.coinlastdata){
          if(index==selectcoin){
            this.ind=index;
          }
        }
      },
      hidetrade(){
        this.ishowtrade=false;
      },
      showlogo(num){
        this.shwomoney=true;
        this.resgist=false;
      },
      hidelogo(num){
        this.shwomoney=false;
      },
      addclass(index){
        sessionStorage.setItem('change',index);
        this.$emit("change",sessionStorage.getItem('change'));
      },
      leavea(){
        this.harvesta=false;
        sessionStorage.setItem('harvesta',false);
        sessionStorage.setItem('fullChange','0');
        this.$emit("fullChange","0");//1代表全屏，0代表非全屏
        location.reload(true);
      },
      tradingg(e){
        var _this=this
        _this.selected=_this.trading
      },
      flashtradingg(e){
        var _this=this
        _this.selected=_this.flashtrading
      },
      harvest(){
       this.harvesta=true;
       sessionStorage.setItem('harvesta',true);
       sessionStorage.setItem('fullChange','1');
       this.$emit("fullChange","1");//1代表全屏，0代表非全屏
       location.reload(true);
      },
     getmwh(){
        var mwidth=document.body.clientWidth;
        if(mwidth<=1580){
          this.cutout=true;
          this.unlash=true;
        }else{
          this.cutout=false;
          this.unlash=false;
        }
      },
      flashRoute: function() {
        var path = this.$route.path;
        switch(path){
          case '/traditional':
          this.isinvote=0;
          break;
          case '/innovate':
          this.isinvote=1;
          break;
        }
      },
      gototrade:function(){
       let type=sessionStorage.getItem('symbol').toLowerCase()+'trade';
       this.$router.push({
            path: '/usercenter/'+type
        });
      },
      //获取最新数据
      getcoindata(){
        var _this=this;
        this.axios.get(this.extendApi.getcoindata,{
          headers: {
            'Content-Type':'application/x-www-form-urlencoded;'
          }
        })
        .then(function(response){
          if(response.status==200){
            // _this.coinlastdata=response.data;
            for(let index in _this.coinlastdata){
              _this.coinlastdata[index]=response.data.data[index][0];
            }
            if(_this.currency=="更多市场"){
              _this.currencyLast='';
              _this.isactiveae='0';
              _this.huise=true;
              _this.orange=false;
            }
            else{
              console.log(4444);
              console.log(_this.currency);
              let indexes = _this.currency+"BTC";
              _this.currencyLast=_this.coinlastdata[indexes].last;
              _this.isactiveae='1';
              _this.huise=false;
              _this.orange=true;
            }
            _this.BCCcurrencyLast=_this.coinlastdata["BCCBTC"].last;
            _this.ETHcurrencyLast=_this.coinlastdata["ETHBTC"].last;
            _this.ETCcurrencyLast=_this.coinlastdata["ETCBTC"].last;
            if(_this.coinlastdata.BCCBTC==undefined){
              _this.BCCcurrencyLast="";
            }
            else{
              _this.BCCcurrencyLast=_this.coinlastdata["BCCBTC"].last;
            }
          }
          else{
            console.log("Interface abnormal:接口异常");
          }
        })
        .catch(function(error){
          console.log(error);
        })
      },
      getSymbol(e){
        this.ind=e;
        console.log(e);
        if(e.length>4){
          e=e.slice(0,e.length-3);
        }
        this.isActive=true;
        this.clickactive=true;
        if(this.smallscrell){
          console.log(123123);
          if(e=='ETH' || e=='BCC'){
            this.currency="更多市场";
            this.getcoindata();
            console.log(44444);
          }
          if(e!='ETH' && e!='BCC'){
            console.log(55555);
            this.currency=e;
            this.getcoindata();
          }
        }else{
          if(e=='BTC'||e=='BCC' || e=='ETH' || e=='ETC'){
            this.currency="更多市场";
            this.getcoindata();
          }
          if(e!='BTC' && e!='BCC' && e!='ETH' && e!='ETC'){
            this.currency=e;
            this.getcoindata();
          }
        }
        this.currencySymbol=e;
        sessionStorage.setItem('symbol',e);
        
        this.$emit('updatesymbol');
        $.cookie('symbol',e+'BTC');
      },
      goOut(){
        delatecookie();
        location.reload(true);
      },
      gologin(){
        sublogion(this);
      },
      goregist(){
        goregister(this);
      },
      isperiodshow(e){
        if(e==sessionStorage.getItem('period')){
          return true;
        }
        else{
          return false;
        }
      }
    },
  }
</script>
<style> 
@import '../../../static/jquery.mCustomScrollbar.css';
  .mCSB_container{
    margin-right:0 
  }
  .tradeheader{
    width:100%;
    height: 40px;
    background: #171717;
   
    position: relative;
    a{
      color: #fff;
    }
    .logo{
      float: left;
      line-height: 34px;
      margin-left: 11px;
      position: relative;
      a{
        display: block;
        width: 106px;
        height: 40px;
        background: url(../../assets/img/index/logo.png) no-repeat center;
        background-size: cover;
        span{
          font-size: 15px;
          vertical-align: top;
          margin-top: -1px;
        }
      }
      a:hover{
        color: rgb(255, 102, 0);
      }
      .tb-table{
        position: absolute;
        width: 720px;
        font-size: 10px;
        top:40px;
        
        z-index: 100;
        background: #232325;
        left: 350px;
        tr td:first-child{
          cursor:pointer;
        };
        .clickactive{
          background: #323234;
        }
        th{
          font-size: 12px;
          width: 110px;
          height: 35px;
          line-height: 35px;
          padding-left: 10px;
          font-weight: bold;
          color: #666;
        }
        .currency-name{
          font-size: 14px;
          width: 120px;
          height: 30px;
          line-height: 35px;
          padding-left: 10px;
          color: #ccc;
        }
        td{
          text-align: left;
          font-size: 14px;
          width: 120px;
          height: 30px;
          line-height: 35px;
          padding-left: 10px;
          color: #999;
        }
        .highslows{
          color: #6cd84c;
        }
        .ups-downs{
          color: #ff3a3a;
        }
        tr:hover{
          background: #323234;
        }
      }
    }
    .frist{
      margin-left: 20px;
    }
    .neworice{
      float: left;
      height: 40px;
      line-height: 40px;
      width: 150px;
      text-align: center;
      li{
        float: left;
        a{
          color: #808080;
          padding-left: 10px;
          font-size: 12px;
          cursor: default;
          
        }
        .active{
          
          padding-left: 10px;
          font-size: 14px;
          p{
            float: left;
          }
          .happen{
            margin-left: 10px;
          }
        }
      }
      .btcbox{
        position: relative;
        text-align: center;
        a{
          font-size: 14px;
          color:#999999;
        }
        .active{
          display: block;
          width: 150px;
          height: 100%;
          padding-left: 0px;
          font-size: 14px;
          font-weight: bold;
         text-align: center;
        position: relative;
        }
        .moercur{
          position: absolute;
          width: 150px;
          left: -25px;
        }
        .happen{
          position: absolute;
          width: 150px;
          /*left: 10px;*/
          left: 20px
        }
        .active:hover{
          color:#ff6600;
          background: #232325;
         }
        .arrowhead{
          position: absolute;
          top:0px;
          right:0;
        }
        .currency{
          display: block;
          width: 150px;
          height: 100%;
          font-size: 14px;
          font-weight:bold;
          color: #999;
          border-right: 1px solid #232325;
          padding:0;
        }
        .currency:hover{
          background: #171717;
          color: #ff6600;
          width: 150px;
        }
        .active{
          color: rgb(255, 102, 0);
          font-weight: bolder;
          background: #232325;
          .liactiveee{
            width: 150px;
            color: #999;
            position: absolute;
            left: 0px;
          }
        }
      }
    }
    .first{
      margin-left: 30px;
      border-left: 1px solid #232325;
    }
    .period-indicator{
      width:100%;
      /*height:50px;*/
      height:70px;
      background:rgb(10,10,10);
      position:absolute;
      top:40px;
      .period{
      width: 320px;
      margin-left:8px;
      height: 40px;
      cursor: pointer;
      line-height: 44px;
      text-align: center;
      position: absolute;
      z-index: 99;
      a{
        color: #999999;
      }
      .period_content{
        float: left;
        padding-left: 10px;
        font-size: 12px;
      }
      .active{
          font-weight:bold;
          cursor: pointer;
          font-size: 12px;
          color:#ff6600;
        }
    }
    .indicator{
      position: absolute;
      /*top: 40px;*/
      left: 315px;
      margin-left:15px;
      margin-right:20px;
      height: 40px;
      line-height: 44px;
      text-align: center;
      z-index: 99;
      label{
        float: left;
        padding-left: 10px;
        font-size: 12px;
        color: #808080;
        /*.active{
          padding-left: 6px;
          font-size: 12px;
          color:#ff6600;
        }*/
      }
      .active{
         color:#ff6600;
         font-weight:bold;
      }
     label:hover{
      color:#ff6600;
     }
    }
    }
    .period{
      width: 320px;
      margin-left:8px;
      height: 34px;
      cursor: pointer;
      line-height: 34px;
      text-align: center;
      position: absolute;
      /*background:#fff ;*/
      /*top: 40px;*/
      z-index: 99;
      a{
        color: #999999;
      }
      .period_content{
        float: left;
        padding-left: 10px;
        font-size: 12px;
      }
      .active{
          /*padding-left: 8px;*/
          
          cursor: pointer;
          font-size: 12px;
          color:#ff6600;
        }
    }
    .indicator{
      position: absolute;
      /*top: 40px;*/
      left: 315px;
      margin-left:15px;
      margin-right:20px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      z-index: 99;
      label{
        float: left;
        padding-left: 10px;
        font-size: 12px;
        color: #808080;
        /*.active{
          padding-left: 6px;
          font-size: 12px;
          color:#ff6600;
        }*/
      }
      .active{
         color:#ff6600;
      }
     label:hover{
      color:#ff6600;
     }
    }
    .freetimebox {
      display: none;
      position: absolute;
      top: 80px;
      z-index: 99;
      ul{
        li{
           color: #555;
           float: left;
           margin-left: 18px;
        }
      }
    }
    .Contact{
      ul{
        li{
          float: left;
          color: rgba(255, 255, 255, 0.6);
          height: 40px;
          font-size: 12px;
          cursor: pointer;
          position: relative;
          padding-top:5px;
          margin-left: 40px;
          img{
            width: 20px;
            height: 20px;
            margin-top: 7px;
          }
          .showindex{
            z-index: 10;
            position: absolute;
            width: 96px;
            height: 120px;
            top:40px;
            margin-top: 0;
            left:-90px;
          }
          .groupimg{
            height: auto;
            overflow: hidden;
          }
          .showios{
            z-index: 10;
            position: absolute;
            width: 96px;
            height: 120px;
            top:40px;
            margin-top: 0;
            left:10px;
          }
          .qqinfo{
            z-index: 10;
            position: absolute;
            height: 20px;
            top:30px;
            left: -20px;
            margin: 0;
            color: rgba(255, 255, 255, 0.6)

          }
          .yxQQ{
            /*padding: 0 10px;*/
            width: 166px!important;
          }
          .33erweima{
            left: 0;
            top:34px;
          }
          .weixin{
            left: -40px;
          }
        }
        .tx-icon{
          margin-left: 20px;
         a{
          /*cursor: default;*/
            display: inline-block;
            width: 100%;
            height: 100%;
          p{
            width: 140px;
            height: 30px;
            font-size: 14px;
            color: #ccc;
            background: #232325;
            line-height: 30px;
            text-align: center;
            margin-top: 10px;
            margin-left: -30px;
          }
          .wximg{
             height:140px;
             margin-top: 0;
            }
         }
        }
      }
    }
    .fright{
      float: right;
      color: rgba(225, 225, 225, 0.9);
      line-height: 34px;
      margin-right: -8px;
      
      .unlash-more{
        float: left;
        margin-right: 100px;
        cursor: pointer;
        line-height: 40px;
        font-size: 14px;
        position: relative;
        .arrowhead1{
          position: absolute;
          right: -30px;
          top: 0;
        }
        .over-flow{
          width: 100px;
          background: #232325;
          position: absolute;
          right: -40px;
          z-index: 2000;
          display: none;
          li{
            line-height: 40px;
            text-align: center;

          }
          li:hover{
            background: #29292b;
          }
        }

      }
       .unlash-more:hover .over-flow{
          display: block;
        }
      .unlash-more:hover{
         color:#ff6600;
      }
       div{
          position: relative;
          .harvest{
            position: absolute;
            right: 20px;
            top:7.5px;
          }
        }
        .cutout{

        margin-right: 40px;
        }
      .islog{
        float: left;
        li{
          float: left;
          /*margin-right: 40px;*/
          margin-right: 20px;
          cursor: pointer;
          span{
            line-height: 40px;
          }
          a{
            span{
               font-size: 14px;
            color: #999;
            line-height: 40px;
            }
           
          }
        }
        .liactive{
        color:#ff6600;
      }
        li:hover .shift-in{
          color: #ff6600;
        }
        .logins{
          position: relative;
          color:#ff6600;
          font-size: 14px;
          .logincom{
            position: absolute!important;
            z-index: 2000;
            left: -100px;
           
            width: 180px;
            background-color: #232325;
            color: #ff6600;
            text-align: center;
            padding: 0px 20px 20px 20px;
          }
          .user-num {
            /*color: rgba(225, 225, 225, 0.9);*/
            color: #999;
            padding-left: 25px;
            background-image: url(../../assets/img/head-portrait.png);
            background-position: left center;
            background-repeat: no-repeat;
            background-size: 20px;
          }
          .islogo{
            color: #fff;
            width: 300px;
            z-index: 9999;
            .total-assets{
              text-align: left;
              height: 10px;
              color: #666;
              span{
                line-height: 40px;
              }
              .assets{
                font-size: 18px;
                color: #ccc;
              }
            }
            .btn-box{
              #exit {
                float: right;
                background-color: #808080;
                width: 80px;
                height: 30px;
                line-height: 30px;
                border-width: 0px;
                padding: 0px 6px;
                margin-top: 2px;
                /*margin-left: 8px;*/
              }
            }
            .rech{
              width: 160px;
              margin-left: -20px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              background: #c81118;
              color: #fff;
              cursor: pointer;
              border:0;
            }
            .table{
              width: 100%;
              margin-left: -60px;
              margin: auto;
              height: auto;
              overflow: hidden;
            }
            .coinmoney{
              width: 260px!important;
              height: 30px;
              line-height: 30px;

              td{
                width: 40px!important;
                height: 30px;
                line-height: 30px;
                text-align: right;
                padding: 0 5px;
                font-size: 14px;
                color: #ccc;
              }
              td:nth-child(1){
                text-align: left;
                width: 40px!important;
              }
              th{
                width: 40px;
                height: 30px;
                line-height: 30px;
                text-align: left;
                padding: 0 5px;
                font-size: 12px;
                color: #666;
              }
              .at-right{
                text-align: right;
                width: 110px;
              }
            }
          }
        }
        .logins:hover .user-num{
            color: #ff6600;
            padding-left: 25px;
            background-image: url(../../assets/img/head-portrait1.png);
            background-position: left center;
            background-repeat: no-repeat;
            background-size: 20px;
          }
      }
    }
  }
</style>