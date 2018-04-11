<template>
  <div class="add-block">
    <div class="tt-line">
      <hr>
      <h3>加入我们，可以获得</h3>
      <hr>
    </div>         
    <h4 class="sub-title">To join our agent you will gain the following advantages</h4>
    <div class="content-box">
      <div class="adv-line">
        <div class="adv-line-item" @mouseenter="showBtn('showBtnState',1)" @mouseleave="showBtn('showBtnState',0)">
          <h4>超高返佣</h4>
          <h5>High commission</h5>
          <p>推荐FX66给他人，可以获取被推荐人等比例的交易手续费做为佣金。</p>
          <img src="../../assets/img/home/add01.png" alt="">
          <div class="apply-btn" v-if="showBtnState==1">
            <span class="word" @click="golink('/apply')">立即申请经纪商</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="adv-line-item" @mouseenter="showBtn('showBtnState',2)" @mouseleave="showBtn('showBtnState',0)">
          <h4>VIP奖励</h4>
          <h5>VIP rewards</h5>
          <p>每个经纪商都会有相应的业绩排名，凡是每个月业绩排名靠前者，均可以得到我们平台的VIP级别奖励。</p>
          <img src="../../assets/img/home/add02.png" alt="">
          <div class="apply-btn" v-if="showBtnState==2">
            <span class="word" @click="golink('/apply')">立即申请经纪商</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
      <div class="adv-line">
        <div class="adv-line-item"  @mouseenter="showBtn('showBtnState',3)" @mouseleave="showBtn('showBtnState',0)">
          <h4>市场支持</h4>
          <h5>Marketing support</h5>
          <p>FX66经纪商可以使用我们所可以提供的全部交易工具和交易资源，并且会在市场宣传方面给予相应的支持！</p>
          <img src="../../assets/img/home/add03.png" alt="">
          <div class="apply-btn" v-if="showBtnState==3">
            <span class="word" @click="golink('/apply')">立即申请经纪商</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div class="adv-line-item" @mouseenter="showBtn('showBtnState',4)" @mouseleave="showBtn('showBtnState',0)">
          <h4>技术支持</h4>
          <h5>Technical support</h5>
          <p>我们拥有强大的技术开发团队，可以制定符合客户营销特点的网站，只收成本费。</p>
          <img src="../../assets/img/home/add04.png" alt="">
          <div class="apply-btn" v-if="showBtnState==4">
            <span class="word" @click="golink('/apply')">立即申请经纪商</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      showBtnState:0,
    }
  },
  methods:{
    showBtn(key,val){
      this[key]=val;
    },
    golink(val){
      this.$router.push({path:val});
    }
  }
}
</script>

<style>
.add-block{
  
}
</style>