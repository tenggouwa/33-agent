<template>
  <div class="my-agent">
    <indexHeader></indexHeader>
    <div class="agent-content">
      <titleBox></titleBox>
      <div class="agent-list">
        <!-- <location :dataList="locationData"></location> -->
        <div class="agent-list-box">
          <ul class="count-num">
            <li v-for="item in countList">
              <p class="num-line">
                <em>{{item.amount}}</em>{{item.tip}}
              </p>
              <p class="word-line">{{item.word}}</p>
            </li>
          </ul>
        </div>
        <div class="table-title">
          <span>返佣列表</span>
        </div>
        <div class="toolLine">
          <div class="time item">
            <span class="prompt-word">时间：</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-date-picker
              v-model="value2"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="timeSlot item">
            <span 
            :class="{active:index==timeTab}" 
            v-for="(item,index) in timeList"
            @click="timeTab=index">
            {{item}}
          </span>
          </div>
          <div class="state-box item">
            <span class="prompt-word">结算状态：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="submit-block">
            <el-button>结算</el-button>
          </div>
        </div>
        <table class="commision-list">
          <thead>
            <tr>
              <th>流水编号</th>
              <th>被推荐人UID</th>
              <th>被推荐人姓名</th>
              <th>返佣比例</th>
              <th>累计返佣</th>
              <th>本期返佣</th>
              <th>结算状态</th>
              <th>结算时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 8">
              <td>2017080623</td>
              <td>236987</td>
              <td>张*</td>
              <td>20%</td>
              <td>0.0002BTC</td>
              <td>0.0001BTC</td>
              <td>审核中</td>
              <td>2017-09-19</td>
            </tr>
          </tbody>
        </table>
        <div class="block">
          <el-pagination
            layout="prev, pager, next"
            :total="500">
          </el-pagination>
        </div>
      </div>
    </div>
    <indexFooter></indexFooter>
  </div>
</template>

<script>
import indexHeader from "../../components/header.vue"
import indexFooter from "../../components/footer.vue"
import location from "../../components/location.vue"
import titleBox from "../../components/title.vue"
export default{
  data(){
    return{
      timeTab:0,
      timeList:["今天","7天","15天","30天"],
      activeName:"first",
      value:"",
      value1:"",
      value2:"",
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      countList:{
        people:{
          amount:10,
          tip:"人",
          word:"累计推广人数",
        },
        currency:{
          amount:0.553,
          tip:"BTC",
          word:"累计返佣额",
        },
        lastCurrency:{
          amount:0.0001,
          tip:"BTC",
          word:"上月返佣",
        }
      },
      locationData:[
        {
          name:"申请代理",
          link:"/apply"
        },
      ],
    }
  },
  components:{
    indexHeader,
    indexFooter,
    location,
    titleBox
  },
} 
</script>

<style>
.agent-content{
  padding-top: 75px;
  background: url("../../assets/img/myAgent/banner.png") no-repeat center 70px;
  background-size: auto 400px;
  .agent-list{
    width: 1200px;
    margin: 0 auto 20px auto;
    padding: 0 40px;
    background-color: #fff;
    .tabs{
      .el-tabs__item.is-active{
        color: #1a6fa6;
      }
      .el-tabs__active-bar{
        background-color:#1f76af;
        height: 2px; 
      }
      .el-tabs__item{
        font-size: 16px;
        color: #1a6fa6;
      }
      .el-tabs__active-bar{
        width: 96px !important;
      }
    }
    .table-title{
      text-align: left;
      border-bottom: 2px solid #e5e5e5;
      margin-bottom: 10px;
      position: relative;
      .scroll-bar{
        position: absolute;
        bottom: -2px;
        width: 120px;
        height: 2px;
        background-color: #1f76af;
      }
      span{
        display: inline-block;
        width: 120px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        text-align: center;
        color: #1a6fa6;
        border-bottom: 2px solid #1f76af;
        margin-bottom: -2px;
      }
    }
    .block{
      padding-bottom: 30px;
    }
    .toolLine{
      overflow: hidden;
      color: #333;
      .item{
        float: left;
      }
      .prompt-word{
        font-size: 14px;
        color: #333;
      }
      .submit-block{
        float: right;
      }
      .el-input__inner{
        border-radius: 0;
      }
      .submit-block{
        .el-button{
          border-radius:16px;
          background-color: #1a6fa6;
          border: 0;
          color: #fff;
          width: 120px;
          height: 36px;
          font-size: 16px;
        }
      }
      
      .el-date-editor.el-input{
        width: 150px;
      }
      .state-box{
        margin-left: 40px;
        span{
          line-height: 36px;
        }
        .el-select{
          width: 200px;
        }
      }
      .timeSlot{
        padding:6px 0;
        margin-left: 20px;
        span{
          display: inline-block;
          width: 60px;
          font-size: 14px;
          height: 24px;
          color: #333;
          line-height: 24px;         
          cursor: pointer;
          &.active{
            background-color: #1a6fa6;
            color: #fff;
          }
        }
      }
    }
    .commision-list{
      clear: both;
      width: 100%;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 30px;
      thead{
        tr{
          background-color: #eee;
        }
      }
      tbody{
        tr:nth-child(even){
          background-color:#f7f7f7;
        };
      }
      tr{
        font-size: 14px;
        color: #333;
        th{
          text-align: center;
          line-height: 40px;
        }
        td{
          line-height: 45px;
        }
      }
    }
    &-box{
      /*     */
      margin: 0 auto;
      padding: 30px 0;
      background-color: #fff;
      .count-num{
        display: flex;
        li:first-child{
          border-left: 1px solid #e5e5e5;
        }
        li{
          flex: 1;
          border: 1px solid #e5e5e5;
          border-left:0;
          padding: 30px 0;
          .num-line{
            font-size: 16px;
            color: #333;
            line-height: 1;
            em{
              font-size: 48px;
              color: #ef5b50;
            }
          }
          .word-line{
            line-height: 1;
            margin-top: 20px;
            font-size: 18px;
            color: #1a6fa6;
          }
        }
        
      }
    }
  }
}
</style>