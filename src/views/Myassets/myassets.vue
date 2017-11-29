<template>
  <div>
    <index-header></index-header>
    <div class="home-content">
      <!-- banner背景图 -->
      <div class="banner">
        <div class="bannertit"></div>
      </div>
      <!-- 内容 -->
      <div class="container">
        <!-- 头部 -->
        <!-- <div class="header">
          <img src="../../assets/img/myassets/position.png" height="32" width="32" alt="">
          <span>当前位置:</span>
          <a href="#/myassets">我的资产</a>
        </div> -->
        <!-- <location class="header" :dataList="locationData"></location> -->
        <!-- 内容 -->
        <div class="contant">
          <!-- 上部分 -->
          <div class="contanttop">
            <!-- echarts -->
            <div class="assetscirl">
              <!-- <router-view></router-view>assetsEchart -->
              <index-echart :assestList="assestList"></index-echart>
            </div>
            <!-- 总资产 -->
            <div class="assetsnum">
              <div class="numline" v-loading="assestload">
                <span class="numnum">资产估值</span> 
                <!-- <span class="numnumber">≈1.0700</span>
                <el-select v-model="value" placeholder="请选择" class="assetsselect">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>  -->
                <p class="zcnum">资产数量 ( 个 ) :</p>
                <table class="assettab">
                  <tr>
                    <td>
                      <span class="highpic btc"></span><span>BTC: {{assestList.BTC.total}} (个)</span>
                    </td>
                    <td>
                      <span class="highpic bcc"></span><span>BCC: {{assestList.BCC.total}} (个)</span>
                    </td>
                    <td>
                      <span class="highpic eth"></span><span>ETH: {{assestList.ETH.total}} (个)</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="highpic etc"></span><span>ETC: {{assestList.ETC.total}} (个)</span>
                    </td>
                    <!-- <td>
                      <span class="highpic sc"></span><span>S&nbsp;&nbsp;C: {{assestList.SC.total}} (个)</span>
                    </td> -->
                    <td>
                      <span class="highpic zec"></span><span>ZEC: {{assestList.ZEC.total}} (个)</span>
                    </td>
                  </tr>
                  <tr>
                    <!-- <td>
                      <span class="highpic bts"></span><span>BTS: {{assestList.BTS.total}} (个)</span>
                    </td> -->
                    <td>
                      <span class="highpic ltc"></span><span>LTC: {{assestList.LTC.total}} (个)</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="contantbottom">
            <!-- tab选项卡 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="我的资产" name="first">
                <index-assets :assestList="assestList"></index-assets>
              </el-tab-pane>
              <el-tab-pane label="历史记录" name="second">
                <index-history></index-history>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>  
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from "../../components/header.vue"
import indexFooter from "../../components/footer.vue"
import indexEchart from "../../views/Myassets/assetschild/asseyscharts"
import indexAssets from "../../views/Myassets/assetschild/myassetstab"
import indexHistory from "../../views/Myassets/assetschild/historyrecode.vue"
// import api from "../../config/api-config.js"
import {ajax} from "../../assets/js/common.js"
export default{
  data(){
    return {
      assestload:true,
      assestList:{
        BTC:{},
        BCC:{},
        ETH:{},
        ETC:{},
        SE:{},
        ZEC:{},
        BTS:{},
        LTC:{},
      },
      activeName: 'first',
      locationData:[
        {
          name:"我的资产",
          link:"/myassets"
        },
      ],
      options: [{
        value: '选项1',
        label: 'BTC'
      }, {
        value: '选项2',
        label: 'BCC'
      }, {
        value: '选项3',
        label: 'ETH'
      }, {
        value: '选项4',
        label: 'ETC'
      }, {
        value: '选项5',
        label: 'SC'
      }, {
        value: '选项6',
        label: 'ZEC'
      }, {
        value: '选项7',
        label: 'BTS'
      }, {
        value: '选项8',
        label: 'LTC'
      }],
      value: ''
    }
  },
  components:{
    indexHeader,
    indexFooter,
    indexEchart,
    indexAssets,
    indexHistory,
  },
  mounted(){
    this.myassets();
  },
  methods:{
    handleClick(tab, event) {
        console.log(tab, event);
    },
    //我的资产
    myassets(){
      let that = this;
      ajax(that,that.extendApi.userAssetlist,'',function(res){
        if(res.code == 200){
          that.assestload = false;
          that.assestList = res.data.list;

          // console.log(that.assestList)
        }else if(res.code == -2){
          that.$router.push("/index");
          // console.log('活的失败')
        }
      },'GET')
    }
  }
}
</script>

<style scoped>
  .banner{
    width: 100%;
    height: 400px;
    background: url(../../assets/img/myassets/banner.png) no-repeat center center;
    background-size: auto 100%;
    .bannertit{
      width: 520px;
      height: 70px;
      background: url(../../assets/img/myassets/myassets.png) no-repeat;
      position: absolute;
      left: 50%;
      margin-left: -260px;
      margin-top: 105px;
    }
  }
  .container{
    width: 1200px;
    margin: 0 auto;
    /*height: 800px;*/
    /*background: #666;*/
    margin-top: -200px;
    margin-bottom: 20px;
    .header{
      /*text-align: left;
      line-height: 60px;
      height: 60px;*/
      background: #ccc;
      opacity: 0.8;
      /*font-size: 14px;*/
      img{
        float: left;
        margin: 13px 5px 0 10px;
        /*display: inline-block;*/
      }
      a{
        color: #1a6fa6;
      }
    }
    .contant{
      background: #fff;
      padding: 30px 0;
      .contanttop{
        margin: 0 30px;
        height: 240px;
        border: 1px solid #ccc;
        .assetscirl{
          margin:5px 0;
          width: 50%;
          height: 230px;
          float: left;
          border-right: 1px solid #ccc;
        }
        .assetsnum{
          text-align: left;
          padding: 10px 0 0 30px;
          width: 50%;
          /*background: #090;*/
          height: 240px;
          float: left;
          .numline{
            /*line-height: 30px;*/
            .numnum{
            font-size: 16px;
            font-weight: bold;
            }
            .numnumber{
              font-size: 38px;
              font-weight: bold;
              margin:0 10px;
              color: #e85a3d;
              vertical-align: middle;
            }
            .assetsselect{
              width: 100px;
            }
            .zcnum{
              margin-top: 20px;
              font-size: 14px;
            }
            .assettab{
              margin-top: 10px;
              /*background: #090;*/
              tr{
                line-height: 36px;
                font-size: 14px;
                td{
                  width: 185px;
                  .highpic{
                    width: 10px;
                    height: 10px;
                    margin: 0 10px 0 0;
                    /*background: #ccc;*/
                    display: inline-block;
                  }
                  .btc{
                    background: #e35144;
                  }
                  .bcc{
                    background: #3ccc87;
                  }
                  .eth{
                    background: #30b3da;
                  }
                  .etc{
                    background: #722d80;
                  }
                  .sc{
                    background: #0f578b;
                  }
                  .zec{
                    background: #493898;
                  }
                  .bts{
                    background: #fc8e3f;
                  }
                  .ltc{
                    background: #fcbc3e;
                  }
                }
              }
            }
          }
          
        }
      }
      .contantbottom{
        margin: 20px 30px;
        /*border: 1px solid #ccc;*/
      }
    }
  }
</style>