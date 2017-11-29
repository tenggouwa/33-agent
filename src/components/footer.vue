<template>
  <div class="bottom-foot">
    <div class="foot-content">
      <div class="foot-content-in">
        <div class="foot-left">
          <h3>联系我们</h3>
          <div class="contact">
            <ul class="line">
              <li>
                <span><i class="iconfont icon-kefuQQ"></i>客服QQ:</span>
                <span>4001566899</span>
              </li>
              <li>
                <span><i class="iconfont icon-hotphone"></i>热线电话:</span>
                <span>400-1566-899</span>
              </li>
            </ul>
            <ul class="line">
              <li>
                <span><i class="iconfont icon-weixin1"></i>微信咨询:</span>
                <span>公众号在线客服</span>
              </li>
              <li>
                <span><i class="iconfont icon-tubiao01"></i>客服邮箱:</span>
                <span>support@licai.cn</span>
              </li>
            </ul>
          </div>
          <p>©2017杭州本链科技有限公司 All Rights Reserved <span>浙ICP备07503793</span><span>市场有风险&nbsp;投资需谨慎</span></p>
        </div>
        <div class="foot-right">
          <h3>手机应用</h3>
          <div> 
            <div class="rightan">
              <img src="../assets/img/andriod.png" height="110" width="109" alt="">
              <p>安卓APP下载</p>
            </div>
            <div class="rightios">
              <img src="../assets/img/ios.png" height="107" width="107" alt="">
              <p>IOSAPP下载</p>
            </div> 
          </div>
        </div>  
      </div>
        
    </div>
        
  </div>
</template>

<style>
.bottom-foot{
  height: 300px;
  background-color: #073571;
  color: #fff;
  .foot-content{
    text-align: left;
    width: 1200px;
    margin: 0 auto;
    &-in{
      width: 1200px;
      margin: 0 auto;
      padding-top: 46px;
      display: flex;
      justify-content: space-between;
      h3{
        font-size: 18px;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 35px;
      }
      .foot-right{
        .rightios{
          float: right;
          margin: 2px 20px 0 0;
          p{
            text-align: center;
          }
        }
        .rightan{
          float: right;
          p{
            text-align: center;
          }
        }
      }
      .foot-left{
        p{
          font-size: 14px;
          margin-top: 30px;
          span{
            margin-left: 40px;
          }
        }
      }
      .contact{
        .line:first-child{
          margin-bottom: 20px;
        }
        .line{
          display: flex;
          font-size: 14px;
          li{
            width: 244px;
          }
          i{
            font-style: normal;
            margin-right: 10px;
            font-size: 18px;
          }
        }      
      }
    }
  }
}
</style>