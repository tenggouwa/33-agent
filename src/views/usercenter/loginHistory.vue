<template>
  <div class="login-History">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="历史登录" name="first">
        <table class="history-box" v-loading="tabload">
          <thead>
            <tr>
              <td>登录IP</td>
              <td>登录时间</td>
              <td>登录地点</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in loginre">
              <td>{{item.ip}}</td>
              <td>{{item.date}}</td>
              <td>{{item.ipwhere}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {ajax} from "../../assets/js/common.js"

export default{
  data(){
    return{
      tabload:true,
      loginre:[],
      authTab:0,
      activeName: 'first',
    }
  },
  mounted(){
    this.loginrecord();
  },
  methods:{
    handleClick(){

    },
    loginrecord(){
// loginrecord
      let that = this;
      ajax(that,that.extendApi.loginrecord,'',(res)=>{
        if(res.code == 200){
          that.tabload = false;
          that.loginre = res.data.list;
        }else{

        }
      },'GET')
    }
  }
}
</script>

<style>
.login-History{
  .history-box{
    font-size: 14px;
    color: #333;
    width: 100%;
    text-align: center;
    margin-bottom: 70px;
    thead{
      tr{
        background-color: #eee;
        line-height: 40px;
        height: 40px;
      }
    }
    tbody{
      tr{
        line-height: 45px;
        height: 45px;
        background-color: #fff;
      }
      tr:nth-child(odd){
        background-color: #f7f7f7;
      }
      tr:hover {
        background: #eee;
      }
    }
  }
}
</style>
