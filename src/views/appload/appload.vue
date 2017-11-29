<template>
  <div>
    <index-header></index-header>
      <div class="nanner">
        <div class="banner1">
          <div class="erwe">
            <div class="an">
              <img src="../../assets/img/appload/an.png" alt="">
              <p>扫一扫</p>
              <span>安卓端APP下载</span>
            </div>  
            <div class="ios">
              <img src="../../assets/img/appload/IOS.png" height="133" width="134" alt="">
              <p>扫一扫</p>
              <span>安卓端APP下载</span>
            </div>
          </div>
        </div>
        <div class="banner2">
          <!-- <img src="../../assets/img/appload/2.png" height="690" width="1920" alt=""> -->
        </div>
        <div class="banner3">
          <!-- <img src="../../assets/img/appload/3.png" height="666" width="1920" alt=""> -->
        </div>
      </div>
    <index-footer></index-footer>
  </div>
</template>

<script>
import indexHeader from "../../components/header.vue"
import indexFooter from "../../components/footer.vue"
export default{
  data(){
    return{
      
    }
  },
  components:{
    indexHeader,
    indexFooter
  }, 
}

</script>

<style scoped>
*{
  margin:0;
  padding:0;
}
img{
  display: block;
  border:none;
}
.nanner{
  position: relative;
  .banner1{
    overflow: hidden;
    width: 100%;
    height: 613px;
    background: url(../../assets/img/appload/1.png) no-repeat center center;
    background-size: auto 100%;
    .erwe{
      position: absolute;
      left: 50%;
      margin-top: 380px;
      margin-left: -620px; 
      .an{
        float: left;
        margin-right: 50px;
        p{
          font-size: 14px;
          margin-top: 10px;
        }
        span{
          color: #1a6fa6;
        }
      }
      .ios{
        float: left;
        p{
          font-size: 14px;
          margin-top: 15px;
        }
        span{
          color: #1a6fa6;
        }
      }
    }
  }
  .banner2{
    width: 100%;
    height: 613px;
    background: url(../../assets/img/appload/2.png) no-repeat center center;
    background-size: auto 100%;
  }
  .banner3{
    width: 100%;
    height: 613px;
    background: url(../../assets/img/appload/3.png) no-repeat center center;
    background-size: auto 100%;
  }
}
</style>