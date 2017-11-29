<template>
  <div class="server-block">
    <div class="tt-line">
      <hr>
      <h3>全方位 一站式服务</h3>
      <hr>
    </div>         
    <h4 class="sub-title">All-around one-stop service</h4>
    <ul class="serverList">
      <li 
        v-for="(item,index) in serverBlock" 
        @mouseenter="showBtn3('serverBlock',1,index)" 
        @mouseleave="showBtn3('serverBlock',0,index)">
        <div class="item" v-show="item.state!==1">
          <i class="iconfont" :class="item.icon"></i>
        </div>
        <div class="item2" v-show="item.state===1" v-html="item.text"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default{
  data(){
    return{
      serverBlock:[
        {
          icon:'icon-shandian',
          text:"FX66具备一键交易功能，<br/>闪电交易，专业快捷!",
          state:0,
        },
        {
          icon:'icon-shouji',
          text:"手机客户端，<br/>随时随地，紧跟市场!",
          state:0,
        },
        {
          icon:'icon-jiazhipinggu-',
          text:"专业分析指导，<br/>价值评估市场!",
          state:0,
        },
        {
          icon:'icon-kefu1',
          text:"新手帮帮帮，<br/>一小时教您炒币入门",
          state:0,
        },
      ],
    }
  },
  methods:{
    showBtn3(key,val,index){
      this[key][index].state=val;     
    },
  }
}
</script>