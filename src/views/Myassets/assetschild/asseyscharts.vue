<template>
	<div id="main" :style="{width:'569px',height:'240px'}" v-loading="echartload">
		<!-- {{asset.BTC.total}}ewqe -->
	</div>
</template>
<script>
	import echarts from 'echarts'
	export default{
		// name:'myChart',
		data(){
			return{
        echartload:true,
        asset:{
          BTC:{}
        },
				charts:'',
        // color:['#e35144','#3ccc87','#30b3da','#722d80','#493898','#fcbc3e'],
				// opinion:['BTC','BCC','ETH','ETC','SC','ZEC','BTS','LTC'],
        opinion:['BTC','BCC','ETH','ETC','ZEC','LTC'],
				opinionData:[
          {value:"43",name:'BTC'},
          {value:"4",name:'BCC'},
          {value:"43",name:'ETH'},
          {value:"4342",name:'ETC'},
          // {value:"",name:'SC'},
          {value:"43",name:'ZEC'},
          // {value:"",name:'BTS'},
          {value:"4",name:'LTC'},
				]
			}
		},
    props:{
      assestList:{
        required:true
      }
    },
    //调用
    mounted(){
      let that = this;
      that.asset = that.assestList;
      // console.log(that.asset);
      let rel=setInterval(()=>{
        if(that.assestList.BTC.total){
          that.echartload=false;
          that.echartdata();
          clearInterval(rel);
        }
      },200);
      // that.echartdata();
    },
    methods:{
      //data
      echartdata(){
        let that = this;
        that.opinionData[0].value = that.assestList.BTC.total;
        that.opinionData[1].value = that.assestList.BCC.total;
        that.opinionData[2].value = that.assestList.ETH.total;
        that.opinionData[3].value = that.assestList.ETC.total;
        // that.opinionData[4].value = that.asset.SC.total;
        that.opinionData[4].value = that.assestList.ZEC.total;
        // that.opinionData[6].value = that.asset.BTS.total;
        that.opinionData[5].value = that.assestList.LTC.total;
        // console.log(that.opinionData[0].value)
        that.$nextTick(function() {
          that.drawPie('main')
        })
      },
      //echarts
      drawPie(id){
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:this.opinion
          },
          color:['#e35144','#3ccc87','#30b3da','#722d80','#493898','#fcbc3e'],
          series: [
            {
              name:'资产估值',
              type:'pie',
              radius:['50%','70%'],
              avoidLabelOverlap: false,
              label: {
              normal: {
                // show: false,
                // position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'blod'
                }
              }
            },
            // labelLine: {
            //   normal: {
            //     lineStyle: {
            //       color: 'rgba(255, 255, 255, 0.3)'
            //     },
            //     smooth: 0.2,
            //     length: 10,
            //     length2: 20
            //   }
            // },
            data:this.opinionData
            }]
          })
        }
      },
    
    }
</script>