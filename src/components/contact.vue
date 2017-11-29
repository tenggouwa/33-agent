<template>
  <div class="contact-block">
    <ul class="contact-list">
      <li v-for="(item,index) in contactList" @mouseenter="item.state=true" @mouseleave="item.state=false">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.name}}</span>
        <div class="open-box" v-show="item.state&&index!=0">
          <em class="iconfont" :class="item.icon"></em>
          <div class="msg-box" v-html="item.text" :class="{twoLine:item.icon=='icon-QQqun'}"></div>
        </div>
      </li>
      <!-- <li>
        <i class="iconfont icon-kefu"></i>
        <span>在线客服</span>
        <div class="open-box">的开始大客户大厦电话撒娇hd</div>
      </li>
      <li>
        <i class="iconfont icon-phone"></i>
        <span>热线电话</span>
      </li>
      <li>
        <i class="iconfont icon-QQqun"></i>
        <span>官方QQ群</span>
      </li>
      <li>
        <i class="iconfont icon-weixin"></i>
        <span>微信咨询</span>       
      </li> -->
    </ul>
  </div>
</template>

<script> 
export default{
  data(){
    return{
      contactList:[
        {
          icon:"icon-kefu",
          name:"在线客服",
          text:"",
          state:false,
        },
        {
          icon:"icon-phone",
          name:"热线电话",
          text:"400-1566-899",
          state:false,
        },
        {
          icon:"icon-QQqun",
          name:"官方QQ群",
          text:"①&nbsp;345106800<br/>②&nbsp;545967811",
          state:false,
        },
        {
          icon:"icon-weixin",
          name:"微信咨询",
          text:"yfx0323",
          state:false,
        },
      ],
    }
  }
}
</script>
<style>
.contact-block{
  position:fixed;
  top:50%;
  right: 20px;
  transform: translateY(-50%);
  z-index:102;
  .contact-list{
    li{
      width: 60px;
      height: 60px;
      background-color: #1a6fa6;
      color: #fff;
      font-size: 12px;
      margin-bottom: 1px;
      position: relative;
      span{
        display: block;
      }
      i{
        display: inline-block;
        padding-top: 9px;
        font-size: 26px;
      }
      .open-box{
        width: 160px;
        background-color: #1792e2;
        position: absolute;
        right: 0;
        top: 0;
        height: 60px;
        em{
          font-size: 26px;
          float: left;
          line-height: 60px;
          height: 60px;
          padding:0 10px;
        }
        .msg-box{
          text-align: left;
          font-size: 16px;
          line-height: 60px;
        }
        .twoLine{
          padding-top: 6px;
          line-height: 1.5;
          span{
            display: inline-block;
            width: 14px;
            height: 14px;
            text-align: center;
            line-height: 14px;
            border:1px solid #fff;
            border-radius: 50%;
            font-size: 12px;
          }
        }
      }
    }   
  }
}
</style>