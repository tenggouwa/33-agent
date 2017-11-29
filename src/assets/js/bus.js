import Vue from 'vue'
var bus = new Vue();
bus.menushow = true;
bus.$on("routerc",function(msg,path){
  bus.menushow = msg;
  bus.$emit("menustaus",msg,path)
})

export default bus