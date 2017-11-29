<template>
  <div class="proess" @click="iscanchange()">
    <div class="range" :class="bgclass" id="sellSlider"><!-- 买单滑动杆 -->

      <span class="sellPercent colormoney" v-if="showcionType=='WTC'">剩余{{nextnum}} WDT</span>
      <span class="sellPercent colormoney" v-if="showcionType=='NYCC'">剩余{{nextnum}} YCC</span>
      <span class="sellPercent colormoney" v-if="showcionType!='NYCC' && showcionType!='WTC'">剩余{{nextnum}} {{showcionType}}</span>
      <el-slider v-model="proessNumber" :step="1" @change="scroll"></el-slider>
      <div class="comcrice onec stop" @click="changeproess(0)" :class="{'criceactive':proessNumber>0}"></div>
      <div class="comcrice twoc stop" @click="changeproess(25)" :class="{'criceactive':proessNumber>25 || proessNumber==25}"></div>
      <div class="comcrice threec stop" @click="changeproess(50)" :class="{'criceactive':proessNumber>50 || proessNumber==50}"></div>
      <div class="comcrice fourc stop" @click="changeproess(75)" :class="{'criceactive':proessNumber>75 || proessNumber==75}"></div>
      <div class="comcrice fivec stop" @click="changeproess(100)" :style="[{'left':lastleng+'px'}]" :class="{'criceactive':proessNumber>100 || proessNumber==100}"></div>
    </div>
    <div class="row-control fn-clear numtop">
      <span id="bty-cost">{{coastnum}} BTC</span>
      <span id="bty-remain" style="float:right;">{{proessNumber}}%</span>
    </div>
  </div>
</template>
<script>
  export default{
    //proessnum滑动条滑动的长度，coastnum消耗的数量，nextnum剩余的数量,showcionType显示的币种类型,bgclass用于控制滚动条的背景色
    props:['proessnum','coastnum','nextnum','showcionType','proessbg','bgclass','lastleng'],
    data(){
      return{
        proessNumber:0,
        usemon:0,
      }
    },
    watch:{
      // coastnum:function(val){

      //   this.usemon=parseFloat(val).tofixed(2);
      // },
      proessnum:function(val){
        if(isNaN(val)){
          this.proessNumber=0;
        }else{
          this.proessNumber=val;
        }
      },
    },
    mounted(){
      this.proessNumber=this.proessnum; 
    },
    
    methods:{
      iscanchange(){
        this.$emit('proessClick');
      },
      scroll(){
        console.log(this.proessNumber);
        this.$emit('change',this.proessNumber);
      },
      changeproess(val){
        this.proessNumber=val;
      },
      clickscroll(val){
        console.log(22222);
        console.log(val);
      },
    },
  }
</script>
<style scoped>
  .sellPercent{
    display: inline-block;
    width: 100%;
    text-align: right;
  }
</style>