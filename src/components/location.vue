<template>
  <div class="location-block">
    <div class="img-box">
      <img src="../assets/img/location.png" alt="">
    </div>
    <div class="word">
      <i>当前位置：</i>
      <span v-for="(item,index) in dataArr">
        <router-link :to="item.link">{{item.name}}</router-link> 
        <em v-show="index!==arrLength-1">&gt;&gt;</em>
      </span>
    </div>  
  </div>
</template>

<script>
export default{
  data(){
    return{
      dataArr:[],
      arrLength:0,
    }
  },
  props:["dataList"],
  mounted(){
    this.dataArr=this.dataList;
    this.arrLength=this.dataArr.length;
  },
}
</script>

<style>
.location-block{
  background-image:linear-gradient(0deg,
    rgba(244, 243, 243, 1) 0%, 
    rgba(250, 249, 249, 1) 8%, 
    rgba(255, 255, 255, 1) 100%);
  width: 1200px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
  padding-left: 10px;
  font-size: 14px;
  .img-box{
    margin-right: 10px;
  }
  i{
    font-style: normal;
  }
  span:last-child a{
    color: #1a6fa6;
  }
}
</style>