<template>
    <div class="privatetrade">
        <section class="crowdone">
          <div class="crowdtitle">
            <p>认购须知：</p>
            <p>原链YCC不代表股权、债权、货币、分红权；一旦认购，不支持赎回；基金会也不对YCC的未来市场价格做任何的承诺，请自愿认购并承担相应的风险。</p>
          </div>
          <div class="crowcontent">
            <p>
              <label>认购价格 : </label>
              <span>
              <b>1</b>{{symbol}} = <b>{{coinrates}}</b>
              <span class="danw">YCC</span>
              <span style="padding-left: 10px;">({{startnum}}个{{symbol}}起)</span></span>
            </p>
            <p>
              <label>可用{{symbol}}数量 : </label>
              <span class="danw">{{myAssets.availablecoin}}</span>
            </p>
            <p>
              <label>认购数量 : </label>
              <input type="text" name="" :placeholder="placeholderinfo" @keyup="cangetYCC" v-model="crowNum">
            </p>
            <p>
              <label>原链代币 : </label>
              <span><b>{{crowall}}</b><span class="danw">YCC</span></span>
            </p>
            <el-button type="primary" class="button" :loading="loadinges" @click="crowYCCTrade">支持原链</el-button>
            <!-- <button class="button" :loading="true" ></button> -->
          </div>
        </section>
    </div>
</template>
<script>
    import tradeCommon from './subtrade-common.vue'
    import { ajax} from '../../assets/js/common'
    require('../../../static/jquery.qrcode.min.js') 
    export default {
  props:['symbolname','changeurl'],
  data() {
      return {
        myAssets:{
          availablecoin:0.00,
          frozencoin:0.00,
          availablemoney:0.00,
          frozenmoney:0.00,
        },
        symbol:'BTC',
        onePres:0,//一份的量
        cnartes:0,//比例
        coinrates:0,//不缩写比例
        crowNum:'',
        crowall:0,
        startnum:0,
        usertype:-1,
        loadinges:false,
        placeholderinfo:'请输入要认购的BTC的数量',
        crawParam:{
            currency:'BTC',
            num:0,
        },
      }
    },
  components:{
    tradeCommon,
  },
  watch: {
    changeurl(){
      var val=this.symbolname;
      this.symbol=val;
      this.crowall=0;
      this.crowNum='';
      this.getusermoney();
      this.commomstart();
        this.placeholderinfo='请输入要认购的'+val+'的数量';
    },
    // symbolname(val){
    //   this.symbol=val;
    //   this.crowall=0;
    //   this.crowNum='';
    //   this.getusermoney();
    //   this.commomstart();
    //     this.placeholderinfo='请输入要认购的'+val+'的数量';
    // },
  },
  mounted:function(){
    this.$nextTick(()=>{
      this.flashRoute();
      this.commomstart();
    });
  },
  methods:{
    commomstart(){
        this.getratese();
        this.getpeopse();
    },
   
    flashRoute: function() {
      var path = this.$route.path;
      switch(path){
        case '/usercenter/subBTCtrade':
        break;
         case '/usercenter/subSCCtrade':
        break;
         case '/usercenter/subETHtrade':
        break;
         case '/usercenter/subETCtrade':
        break;
        case '/usercenter/subSCtrade':
        break;
        case '/usercenter/subZECtrade':
        break;
        case '/usercenter/subBTStrade':
        break;
        case '/usercenter/subLTCtrade':
        break;
      }
      this.getusermoney();
      this.commomstart();
    },
    getratese(){
        var coincre=this.symbol.toLowerCase();
        ajax(this,this.extendApi.isicouser,'',(response)=>{
            if(response.code==200){
               this.coinrates=response.data[coincre+'_pre'];
            }
        },'GET');
    },
    cangetYCC(){
        var num=Number(this.crowNum);
        this.crowall=parseInt(this.coinrates * num); 
    },
    getpeopse(){
        this.usertype=-1;
        this.startnum=0;
        ajax(this,this.extendApi.isicouser,'',(response)=>{
          if(response.code==200){
            this.usertype=response.data.isinvestor;
            if(this.usertype==0){
              if(this.symbol=="BTC"){
                this.startnum=35;
              }else if(this.symbol=="ETH"){
                this.startnum=460;
              }
            }else if(this.usertype==1){
              if(this.symbol=="BTC"){
                this.startnum=7;
              }else if(this.symbol=="ETH"){
                this.startnum=92;
              }
            }else{
              this.$router.push({
                path:'/'
              });
            }
          }else{
            this.$router.push({
              path:'/'
            });
          }
        },'GET');
      },
    crowYCCTrade(){
        var _this=this;
        if(this.crowNum){
            this.crawParam.currency=this.symbol;
            this.crawParam.num=Number(this.crowNum);
            if(this.myAssets.availablecoin-this.crowNum>=0){
              this.loadinges=true;
              ajax(this,this.extendApi.icoInvest,this.crawParam,(response)=>{
                if(response.code==200){
                    this.crowNum='';
                    this.loadinges=false;
                    this.crowall=0;
                    this.getusermoney();
                    _this.$notify({
                        title: '成功',
                        message: '交易成功',
                        type: 'success',
                        duration:'2000'
                    });
                    this.$emit('tradesuccess');
                  }else{
                    this.loadinges=false;
                    _this.$notify({
                        title: '提示',
                        message: response.error,
                        type: 'error',
                        duration:'2000'
                    });
                  }
              });
            }else{
              this.$notify({
                  title: '提示',
                  message: '可用币不足',
                  type: 'error',
                  duration:'2000'
              });
            }
        }else{
            _this.$notify({
                title: '提示',
                message: 数量不能为空,
                type: 'error',
                duration:'2000'
            });
        }
    },
    // cangetYCC(){
    //     ajax(this,this.extendApi.Calculate,(response)=>{

    //     });
    // }
    //获取用户资金
    getusermoney(){
      var _this=this;
      this.myAssets.availablecoin=0;
      ajax(this,this.extendApi.getMoneyInfo,'',function(reponse){
        if(reponse.code==200){
          var data=reponse.data;
          _this.myAssets.availablecoin=data.list[_this.symbol].active;
        }
      });
    },
  },
}
</script>
<style>
    .privatetrade{
        .crowdone{
          width: 974px;
          height: 490px;
          background: #fff;
          padding: 20px;
          .crowdtitle{
            width: 934px;
            background: #fcf9e3;
            padding: 20px 30px 20px 20px;
            border:1px solid #faebcc;
            font-size: 16px;
          }
          .crowcontent{
            width: 420px;
            margin:0 auto;
            font-size: 16px;
            p{
              margin-top: 45px;
              label{
                display: inline-block;
                width: 122px;
                padding-right: 12px;
                text-align: right;
              }
              .danw{
                font-size: 14px;
              }
              span{
                b{
                  padding-right:5px;
                }
              }
              input{
                width: 270px;
                height: 36px;
                line-height: 36px;
                border-radius: 2px;
                padding-left: 10px;
                font-size: 12px;
                color: #333;
                border:1px solid #d1d1d1;
              }
            }
            .button{
              width: 180px;
              height: 36px;
              /*line-height: 36px;*/
              color: #fff;
              text-align: center;
              border:0;
              font-size: 14px;
              background: #e64544;
              margin:45px 0 0 120px;
            }
          }
        }
    }
</style>