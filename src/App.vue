<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1200px;
  display: block;
}
.el-loading-spinner{
  .path{
    stroke:#c81118!important;
  }
}
/*.rechange{
  height: 50px;
  li{
    float: left;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #000;
  }
  .pleft{
    width: 96px;
    border-bottom: 3px solid #c81118;
  }
  .pright{
    width:739px;
    border-bottom: 3px solid #ccc; 
  }
}*/
#app{
  ::-webkit-scrollbar{
    display:none;
  }
}

scrollbar-arrow-color: rgba(15,15,15,15); 
scrollbar-face-color: rgba(15,15,15,15); 
scrollbar-3dlight-color: rgba(15,15,15,15); 
scrollbar-highlight-color: rgba(15,15,15,15); 
scrollbar-shadow-color: rgba(15,15,15,15); 
scrollbar-darkshadow-color: rgba(15,15,15,15); 
scrollbar-track-color: rgba(15,15,15,15); 
scrollbar-base-color:rgba(15,15,15,15);
</style>
