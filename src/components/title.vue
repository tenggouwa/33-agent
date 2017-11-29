<template>
  <div class="title-block">
    <div class="line-box">
      <hr/>
      <span></span>
    </div>
    <h3>我的代理</h3><div class="line-box line-box2">
      <span></span>     
      <hr/>         
    </div>
  </div>
</template>

<style>
.title-block{
  background-color: rgba(31, 118, 175, 0.3);
  width: 530px;
  margin: 35px auto;
  height: 70px;
  line-height: 70px;
  h3{
    font-size: 37px;
    color: #fff;
    font-weight: bold;
    display: inline-block;
  }
  .line-box{
    float: left;
    line-height: 70px;
    hr{
      width: 176px;
      height: 1px;
      border: 0;
      margin-top: 35px;
      background-color: #5ea9c2;
      float: left;     
    }
    span{
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #5ea9c2;
    }
  }
  .line-box2{
    float: right;
    hr{
      float: right;
    }
  }
}
</style>