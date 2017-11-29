<template>
  <div id="plot_container" class="plot_container">
    <div id="plot_area" class="plot_area">
      <div id="plot_content" style="display:none">
        <!--  <canvas style="background-image: url(../../assets/img/Klogo.png); width:100px;height:100px;"></canvas> -->
          <div id="plot_canvas_0" class="canvas_group">
              <canvas id="plot_canvas_00"></canvas>
              <canvas id="plot_canvas_01"></canvas>
              <canvas id="plot_canvas_02"></canvas>
          </div>
          <div id="plot_canvas_div_0" class="resize"></div>
          <div id="plot_canvas_1" class="canvas_group">
              <canvas id="plot_canvas_10"></canvas>
              <canvas id="plot_canvas_11"></canvas>
              <canvas id="plot_canvas_12"></canvas>
          </div>
          <div id="plot_canvas_div_1" class="resize"></div>
          <div id="plot_canvas_2" class="canvas_group">
              <canvas id="plot_canvas_20"></canvas>
              <canvas id="plot_canvas_21"></canvas>
              <canvas id="plot_canvas_22"></canvas>
          </div>
          <div id="plot_canvas_div_2" class="resize"></div>
          <div id="plot_canvas_3" class="canvas_group">
              <canvas id="plot_canvas_30"></canvas>
              <canvas id="plot_canvas_31"></canvas>
              <canvas id="plot_canvas_32"></canvas>
          </div>
          <div id="plot_canvas_div_3" class="resize"></div>
          <div id="plot_canvas_4" class="canvas_group">
              <canvas id="plot_canvas_40"></canvas>
              <canvas id="plot_canvas_41"></canvas>
              <canvas id="plot_canvas_42"></canvas>
          </div>
          <div id="plot_canvas_div_4" class="resize"></div>
          <div id="plot_canvas_5" class="canvas_group">
              <canvas id="plot_canvas_50"></canvas>
              <canvas id="plot_canvas_51"></canvas>
              <canvas id="plot_canvas_52"></canvas>
          </div>
          <div id="plot_canvas_div_5" class="resize"></div>
          <div id="plot_canvas_6" class="canvas_group">
              <canvas id="plot_canvas_60"></canvas>
              <canvas id="plot_canvas_61"></canvas>
              <canvas id="plot_canvas_62"></canvas>
          </div>
          <div id="plot_canvas_div_6" class="resize"></div>
          <div id="plot_canvas_7" class="canvas_group">
              <canvas id="plot_canvas_70"></canvas>
              <canvas id="plot_canvas_71"></canvas>
              <canvas id="plot_canvas_72"></canvas>
          </div>
      </div>
    </div>
   <!--  <div id="background" >
      <img src="../../assets/img/Klogo.png">
    </div> -->
    <div id="debugx"></div>
    <div id="loading"></div>
    <noscript>javascript扩展必须打开</noscript>
    <div id="flash_notify" style="display:none">你的浏览器必须支持flash 或者 html5</div>
    <div id="msgbox"></div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        api:""
      }
    },
    mounted:function(){
      //初始化k线
      // console.log("k线布局");
      this.api = new HTML5StockChartAPI("plot_container");
      HTML5StockChartAPI.API = this.api;
      if(sessionStorage.getItem('symbol')==undefined||sessionStorage.getItem('symbol')=='null'||sessionStorage.getItem('symbol')==null){
        $.cookie('symbol', sessionStorage.getItem('symbol').toUpperCase()+"BTC")
      }
      else{
        $.cookie('symbol',"BCCBTC")
      }
      if($.cookie('period')==undefined){
        $.cookie('period','H1')
      }
      html5chart(this.api,$.cookie('symbol'),$.cookie('period')); 
    },
    destroyed:function(){
      this.api.destroyed();
    },
    methods:{
      flashRoute: function() {
        html5chart(this.api,$.cookie('symbol'),$.cookie('period'));
        
      },
    }
  }

</script>
<style>
  @import '../../../static/kline.css';
  .plot_container{
    height: 100%;
    width: 100%;
    float: left ;
    color: rgba(255,255,255,0.6);
    /*background:url('../../assets/img/Klogo.png') no-repeat !import;*/
    /*z-index: 990;*/
    background-size: 100%;
  }
  .plot_area{
    height: 100%;
    width: 100%;
    /*background:url('../../assets/img/Klogo.png') no-repeat;*/
    background-size: 100%;
  }
</style>