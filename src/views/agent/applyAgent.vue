<template>
  <div class="apply-block">
    <indexHeader></indexHeader>
    <div class="apply-content">
      <div class="banner-box">
        <img src="../../assets/img/apply/banner.png" alt="">
      </div>
      <!-- <location :dataList="locationData"></location> -->
      <div class="apply-form">
        <div class="tab-line">
          <button :class="{active:applyItem===0}" @click="applyOne">经纪商申请</button>
          <button :class="{active:applyItem===1}" @click="applyTwo">代理商申请</button>
        </div>
        <div class="apply-form-box">
          <div @click="niceChange" class="change-box"><span v-if="applycheck==true"> < </span><span v-if="applycheck==false"> > </span></div>
          <!-- <div class="change-box" v-show="applycheck==false"> < </div> -->
          <div class="left-part" v-show="applyItem===1 && applycheck == true">
            <h4>代理商申请标准:</h4>
            <p>1.代理商分多个等级VIP1-VIP6；</p>
            <p>2.代理资格主要两项指标：所辖客户月累计手续费、当月活跃客户（至少成交1笔）；</p>
            <p>3.每月底统计代理商的代理资格，两项指标均达标，可升级；</p>
            <p>4.所辖客户的交易手续费返佣比例，根据当月等级，从20%-30%自动调节；</p>
            <p>5.所辖客户另外推荐的客户所产生的手续费，只计入所辖客户的返佣，不计入当前代理返佣；</p>
            <p>6.代理商本人交易，所产生的手续费，只计入他推荐人的返佣，不计入本人的返佣；</p>
            <p>7.如所辖客户有不当得利的行为（恶意刷单、利用BUG等），不计入当月累计手续费；</p>
            <p>8.每月10号前发放上月佣金；</p> 
          </div>
          <div class="left-part part2" v-show="applyItem===0 &&applycheck == true">
            <h4>经济商申请标准:</h4>
            <h5>经纪商是需要具有一定资源并能独立运营的公司、机构或团体。</h5>
            <p>1.经纪商所辖客户交易手续费的70%为返佣；</p>
            <p>2.经纪商可自行设置客户的提款手续费标准；</p>
            <p>3.经纪商可招募代理商，并在经纪商后台调整代理商返佣标准；</p>
            <p>4.经纪商所辖客户有不当得利的行为（恶意刷单、利用BUG等），手续费不返还；</p>
            <p>5.经纪商可在后台查看直发客户及代理客户的交易统计表；</p>
          </div>
          <div class="right-part" id="containDiv">
            <el-form v-model="applyform" label-width="80px" v-show="applyItem===1">
              <el-form-item label="姓名:" >
                <el-input v-model="applyform.name" placeholder="请输入您的姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号:">
                <el-input v-model="applyform.name" placeholder="请输入您的手机号码"></el-input>
              </el-form-item>
              <el-form-item label="QQ号:">
                <el-input v-model="applyform.name" placeholder="请输入您的QQ号码"></el-input>
              </el-form-item>
              <el-form-item label="微信号:">
                <el-input v-model="applyform.name" placeholder="请输入您的微信号码"></el-input>
              </el-form-item>
              <el-form-item label="所在地区:" class="location-box">
                <el-select v-model="locationGroup.country" clearable placeholder="所属国家">
                  <el-option
                    v-for="item in countryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="locationGroup.country" clearable placeholder="所属国家">
                  <el-option
                    v-for="item in countryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="locationGroup.country" clearable placeholder="所属国家">
                  <el-option
                    v-for="item in countryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button>立即申请</el-button>  
              </el-form-item>
            </el-form>
            <el-form v-model="applyform" label-width="138px" v-show="applyItem===0">
              <el-form-item label="公司/机构名称:">
                <el-input v-model="applyform.name" placeholder="请输入您所在的公司或者机构名称"></el-input>
              </el-form-item>
              <el-form-item label="公司/机构成立时间:">                
                <el-input v-model="applyform.name" placeholder="请输入公司或机构成立的时间"></el-input>
              </el-form-item>
              <el-form-item label="公司/机构所在地:" class="location-box">
                <el-select v-model="locationGroup.country" clearable placeholder="所属国家">
                  <el-option
                    v-for="item in countryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="locationGroup.city" clearable placeholder="所属城市">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名:">
                <el-input v-model="applyform.name" placeholder="请输入您的姓名"></el-input>
              </el-form-item>
              <el-form-item label="电话:">
                <el-input v-model="applyform.name" placeholder="请输入您的电话或者手机号码"></el-input>
              </el-form-item>
              <el-form-item label="身份证号:">
                <el-input v-model="applyform.name" placeholder="请输入您的身份证号"></el-input>
              </el-form-item>
              <el-form-item label="与公司/机构关系:">
                <el-input v-model="applyform.name" placeholder="请输入您与公司或者机构的关系"></el-input>
              </el-form-item>             
              <el-form-item label="QQ号:">
                <el-input v-model="applyform.name" placeholder="请输入您的QQ号码"></el-input>
              </el-form-item>
              <el-form-item label="微信号:">
                <el-input v-model="applyform.name" placeholder="请输入您的微信号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button>立即申请</el-button>  
              </el-form-item>
            </el-form>
            <p class="tip">
              *您好，我们尊重每一个客户的隐私。
              一旦提交了以上内容则表明您同意FX66使用以上提供的信息与您联系，为您解答您所咨询的产品及服务。
            </p>
          </div>
        </div>
        <div class="server-block">
          <div class="tt-line">
            <hr>
            <h3>联系我们 快速申请</h3>
            <hr>
          </div>         
          <h4 class="sub-title">Contact us for quick application</h4>
          <ul class="serverList">
            <li 
              v-for="(item,index) in contactList" 
              @mouseenter="showBtn3('contactList',1,index)" 
              @mouseleave="showBtn3('contactList',0,index)">
              <img v-show="item.state===0" :src="item.baseUrl" alt="">
              <img v-show="item.state===1" :src="item.hoverUrl" alt="">
              <p v-for="i in item.text">{{i}}</p>
            </li>
          </ul>
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
export default{
  data(){
    return{
      applycheck:true,
      applyItem:1,
      locationData:[
        {
          name:"申请代理",
          link:"/apply"
        },
      ],
      contactList:[
        {
          baseUrl:"static/img/apply/phone.png",
          hoverUrl:"static/img/apply/phoneHover.png",
          state:0,
          text:["400-1566-899"],
        },
        {
          baseUrl:"static/img/apply/qq.png",
          hoverUrl:"static/img/apply/qqHover.png",
          state:0,
          text:["345106800","545967811"],
        },
        {
          baseUrl:"static/img/apply/wx.png",
          hoverUrl:"static/img/apply/wxHover.png",
          state:0,
          text:["yfx0323"],
        },
      ],
      applyform:{
        name:""
      },
      locationGroup:{
        country:"",
        city:""
      },
      countryOptions:[
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
      ],
      cityOptions:[
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
      ],
      serverBlock:[
        {
          name:'1',
          text:"FX66具备一键交易功能，<br/>闪电交易，专业快捷!",
          state:0,
        },
        {
          name:'2',
          text:"FX66具备一键交易功能，<br/>闪电交易，专业快捷!",
          state:0,
        },
        {
          name:'3',
          text:"FX66具备一键交易功能，<br/>闪电交易，专业快捷!",
          state:0,
        },
        {
          name:'4',
          text:"FX66具备一键交易功能，<br/>闪电交易，专业快捷!",
          state:0,
        },
      ],
    }
  },
  components:{
    indexHeader,
    indexFooter,
    location
  },
  mounted(){
    this.addclassdiv();
  },
  methods:{
    showBtn3(key,val,index){
      this[key][index].state=val;     
    },
    niceChange(){
      this.applycheck =! this.applycheck;
      this.addclassdiv();
    },
    applyOne(){
      this.applyItem=0;
      this.applycheck=true;
      this.addclassdiv();
    },
    applyTwo(){
      this.applyItem=1;
      this.applycheck=true;
      this.addclassdiv();
    },
    addclassdiv(){
      if(this.applycheck==false){
        document.getElementById("containDiv").style.marginLeft="250px";
      }else{
        document.getElementById("containDiv").style.marginLeft="40px";
      }
    }
  }
}
</script>

<style>
.apply-content{
  padding-top:75px;
  .tt-line{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3{
      font-size: 35px;
      font-weight: bold;
      line-height: 1;
    }
    hr{
      width: 420px;
      height: 1px;
      background-color: #e5e5e5;
      border:0;
    }
  }
  .sub-title{
    font-size: 20px;
    color: #999;
    margin-top: 12px;
  }
  .server-block{
    /*height: 600px;*/
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    .serverList{
      margin-top: 50px;
      padding: 0 188px 70px 188px;
      display: flex;
      justify-content:space-between;
      img{
        margin-bottom:20px;
      }
      p{
        line-height: 1;
        font-size: 20px;
        margin-bottom: 10px;
      }
      p:last-child{
        margin-bottom: 0;
      }
      /*li{
        border:1px solid #dcdcdc;
        width: 176px;
        height: 176px;
        transform: rotate(45deg);
        margin-right: 72px;
        background-color: #fff;
        .item{
          width: 100%;
          height: 100%;
          line-height: 176px;
          transform: rotate(-45deg);
        }
        .item2{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotate(-45deg);
          color: #fff;
          font-size: 15px;
        }
        &:hover{
          background-color: #1a6fa6;
        }
      }*/
    }
  }
  .apply-form{
    padding-top: 50px;
    background: #fff;
    width: 1200px;
    margin: 0 auto 20px auto;
    .tab-line{
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 50px;
      button{
        display: inline-block;
        width: 138px;
        height: 36px;
        font-size: 18px;
        background-color: #e5e5e5;
        border: 0;
        cursor: pointer;        
      }
      button+button{
        margin-left: 6px;
      }
      button.active{
        background-color: #0176c3;
        color: #fff;
      }
    }
    &-box{
      text-align: left;
      margin: 0 75px;            
      color: #333;
      display: flex;
      .change-box{
        text-align: center;
        font-size: 28px;
        line-height: 80px;
        color: #fff;
        width: 30px;
        height: 80px;
        background: #1697f3;
        margin-top: 180px;
      }
      .right-part{
        width: 480px !important;
        /*margin: 0 auto;*/
        /*flex: 1;*/
        margin-left: 40px;
        .tip{
          padding-left: 28px;
          color: #3884d3;
          font-size: 14px;
        }
        .el-form{
          .el-input__inner{
            border-radius: 0;
            border-color: #bfbfbf;
          }
          .el-button{
            display: block;
            width: 100%;
            border: 0;
            border-radius: 0;
            background-color: #0176c3;
            color: #fff;
            height: 40px;
            line-height: 40px;
            padding-top: 0;
          }
          .location-box{
            .el-form-item__content{
              display: flex;
            }
            .el-select+.el-select{
              margin-left: 8px;
            }
          }
          
        }
      }
      .left-part{
        width: 530px;
        border:1px solid #e5e5e5;
        padding: 20px;
        position: relative;
        &.part2{
          height: 320px;
        }
        h4{
          font-size: 16px;
          line-height: 1;
        }
        h5{
          color:#0176c3;
          margin-top: 20px;
          font-size: 14px;
        }
        p{
          margin-top: 20px;
          font-size: 14px;
        }
        &:before{
          content: "";
          position: absolute;
          top: 50%;
          right: -10px;
          transform: translateY(-50%);
          display: block;
          border-left: 10px solid #e5e5e5;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }
        &:after{
          content: "";
          position: absolute;
          top: 50%;
          right: -8px;
          transform: translateY(-50%);
          display: block;
          border-left: 8px solid #fff;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }
      }     
    }
  }
  .banner-box{
    height: 400px;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
    img{
      height: 100%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  } 
}
</style> 