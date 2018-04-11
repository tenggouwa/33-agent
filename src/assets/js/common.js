import bus from "./bus.js"

/* 组件时间格式转换 */
var temptime=function(temptime){
    var gettype=Object.prototype.toString;
    if (temptime != '' && (gettype.call(temptime) == '[object Date]')) {
        temptime = temptime.getFullYear() + '-' + (temptime.getMonth() + 1) + '-' + temptime.getDate();
    }
    return temptime;
}
/* 时间戳转换函数 */
var getDataYear = function(format, timestamp) {
  console.log(timestamp==0 )
  if(timestamp == null||timestamp == undefined||timestamp == 0){
    return ''
  }
    var date = new Date(timestamp ? (parseInt(timestamp) * 1000) : new Date().getTime());
    var FORMAT = new Object();
    FORMAT = {
        'Y': "date.getFullYear()",
        'M': "date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1",
        'D': "date.getDate() < 10 ? '0' + date.getDate() : date.getDate()",
        'h': "date.getHours() < 10 ? '0' + date.getHours() : date.getHours()",
        'm': "date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()",
        's': "date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()"
    }
    for (var i in FORMAT) {
      if (format.indexOf(i) != -1) {
        format = format.replace(i, eval(FORMAT[i]));
      }
    }
    return format;
}
//设置cookie
var setcookie=function(name,value){//设置cookie的值
  name = "block_fxees" + name;
  $.cookie(name, value);
  if (localStorage) {
    localStorage.setItem(name, value);
  }
  // var Days = 30;
  // var exp = new Date();
  // exp.setTime(exp.getTime() + Days*24*60*60*1000);
  // document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//获取cookie
var getcookie=function(name){//获取cookie的值
  name = "block_fxees" + name;
  if ($.cookie(name)) {
    return $.cookie(name);
  } else if (localStorage) {
    return localStorage.getItem(name);
  } else {
    return null;
  }

  // var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
  // if(arr=document.cookie.match(reg)){
  //   return unescape(arr[2]);
  // } else{
  //   return null;
  // }
}
var delatecookie=function(){//清空cookie
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
  }
  localStorage.clear();
}

var savecookie = function(data) {
  setcookie('username', data.base.username);
  setcookie('adddate', data.base.adddate);
  setcookie('addtime', data.base.addtime);
  setcookie('email', data.base.email);
  setcookie('group', data.base.group);
  setcookie('regip', data.base.regip);
  // setcookie('username', data.base.username);
  // setcookie('phone', data.base.mobile);
  // setcookie('country', 'CN');
  // setcookie('email', data.base.email);
  // setcookie('hmobile', data.base.hmobile);
  // setcookie('lockname', (data.auth.lockname != null ? data.auth.lockname : ''), '/', false);
  // setcookie('tradepwdstate', data.state.tradepwdstate);
  // setcookie('emailstate', data.state.emailstate);
  // setcookie('mobilestate', data.state.mobilestate);
  // setcookie('personstate', data.state.personstate);
  // setcookie('personintegrity', data.state.personintegrity);
  // setcookie('businessstate', data.state.businessstate);//企业认证
  // setcookie('enterprise_name', data.auth.enterprise_name);//企业名字
  // setcookie('enterprise_id', data.auth.enterprise_id);//企业id
  // setcookie('regtime', data.base.regtime);
}

/* ajax请求 */
var ajax = function(that, url, params, success, method) {
  var token = getcookie('token');
  // console.log(url);
  // console.log(params);
  // var openId = sessionStorage.getItem('openId');
  var headerParam;
  if(token){
    headerParam={
      Authorization: 'Bearer ' + token,
      'Content-Type':'application/x-www-form-urlencoded;',
    };
  }
  else{
    headerParam={
      'Content-Type':'application/x-www-form-urlencoded;',
    };
  }
  if(method=='GET'){
    that.axios({
      method: 'get',
      url: url,
      headers:headerParam,
     params:params,
    }).then((response) => {
      // console.log(that.axios.headers)
      // if(response.data.code==-2 && token){
      //   delatecookie();
      //   that.$alert(
      //       '您长时间未登录，请先登录',
      //       '提示',
      //   ).then(() => {
      //     that.$router.push({
      //       path: '/'
      //     });
      //   });
      // }else{
      //   success(response.data);
      // }
      // if(response.data.code==-2){
      //   that.$notify({
      //     title: '提示',
      //     message: '请重新登录',
      //     type: 'warning',
      //     duration:'2000'
      //   });
      //   // that.$router.push({path:"/index"});
      //   return false;
      // }
      if(typeof(success)==="function"){
        success(response.data);
      }
      if(response.data.code==200||response.data.code==-2){
             
      }
      else{
        that.$notify({
          title: '提示',
          message: response.data.message,
          type: 'warning',
          duration:'2000'
        });
      } 
    }).catch(function(response){
      // console.log(response);
    })
  }else{
    params=that.querystring.stringify(params);
    that.axios({
      method: "POST",
      url: url,
      headers:headerParam,
     data:params,
    }).then((response) => {
      // if(response.data.code==-2 && token){
      //   delatecookie();
      //   that.$alert(
      //       '您长时间未登录，请先登录',
      //       '提示',
      //   ).then(() => {
      //     that.$router.push({
      //       path: '/'
      //     });
      //   });
      // }else{
      //   success(response.data);
      // }
      // if(response.data.code==-2){
      //   that.$notify({
      //     title: '提示',
      //     message: '请重新登录',
      //     type: 'warning',
      //     duration:'2000'
      //   });
      //   // that.$router.push({path:"/index"});
      //   return false;
      // }
      if(typeof(success)==="function"){
        success(response.data);
      }
      if(response.data.code==200||response.data.code==-2){

      }
      else{
        that.$notify({
          title: '提示',
          message: response.data.message,
          type: 'warning',
          duration:'2000'
        });
      }     
    }).catch(function(response){
      // console.log(response);
    })
  }
}

/*发送短信*/
var sendCode=function(that,params,success){
  // params.param=params.vparam;
  // delete params.vparam;
  ajax(that,that.extendApi.sedMsssss,params,function(res){
    if(typeof(success)=='function'){
      success(res);
    }
    if(res.code==200){
      if(res.data.isShow == 1){
        sessionStorage.setItem('alertStatus','true');
        sessionStorage.setItem('dataSrc',res.data.data.jsUrl);
        sessionStorage.setItem('businessId',res.data.data.businessId);
      }
      that.$notify({
        title: '提示',
        message: '发送成功',
        type: 'success',
        duration:'2000'
      });
      
      that.codestate=1;
      that.secondNum=60;
      clearInterval(that.reltime);
      that.reltime=setInterval(function(){
        that.secondNum--;
        if(that.secondNum==0){
          clearInterval(that.reltime);
          that.codestate=2; //变成“重新发送”了！
          that.secondNum=60;
        }
      }, 1000);
    }
  },'post');
};

/*发送邮件*/
var sendEmail=function(that,params,success){
  // params.param=params.vparam;
  // delete params.vparam;
  ajax(that,that.extendApi.sedEmmmmm,params,function(res){
    if(typeof(success)=='function'){
      success(res);
    }
    if(res.code==200){
      if(res.data.isShow == 1){
        // that.alertStatus = true;
        sessionStorage.setItem('alertStatus','true')
        sessionStorage.setItem('dataSrc',res.data.data.jsUrl)
        sessionStorage.setItem('businessId',res.data.data.businessId)
      }
      that.$notify({
        title: '提示',
        message: '发送成功',
        type: 'success',
        duration:'2000'
      });
      
      //that.gid = res.data.gid;
      that.codestate=1;
      that.secondNum=60;
      clearInterval(that.reltime);
      that.reltime=setInterval(function(){
        that.secondNum--;
        if(that.secondNum==0){
          clearInterval(that.reltime);
          that.codestate=2; //变成“重新发送”了！
          that.secondNum=60;
        }
      }, 1000);
    }
  },'post');
};

/*登录*/
var sublogion=function(_this,pageindex,params,success){
  ajax(_this, _this.extendApi.newLogin,params, function(res) {
    if(typeof(success)==="function"){
      success(res);
    }
    if (res.code == 200) {
      var data = res.data;
      setcookie('token', data.access_token);
      setcookie('refreshtoken', data.refresh_token);
      var tokenexpressTime = parseInt(data.expires_in);
      var logintime = parseInt(new Date().getTime() / 1000);
      var deadtime = logintime + tokenexpressTime;
      setcookie('deadtime', deadtime);
      setcookie('id', data.userid);
      ajax(_this, _this.extendApi.getUserInfo, '', function(data) {
        if(data.code==200){
          _this.username = data.data.base.username;
          savecookie(data.data);
          setcookie('quite', '4'); //登录状态为4.未登录为0
          bus.$emit("login","h1");
          if(_this.loginTab){
            _this.loginTab=3;//首页登录框切换
          }      
          if(_this.islogoin){
            _this.islogoin = 4;
          }
          if(_this.username){
            _this.username = data.data.username;
          }             
          if (pageindex == 'index') {
            // _this.$router.push({
            //   path: '/usercenter/bcctrade'
            // });
          } else {
            _this.$emit('tradeSuccess');
          }
        }
        else if(data.code==-2){
          delatecookie();
          _this.$router.push({path:'/index'});
          _this.$notify({
            title: '提示',
            message: "请重新登录",
            type: 'warning',
            duration: '1000'
          });
        }    
      })
    } else {
      _this.$notify({
        title: '提示',
        message: res.message,
        type: 'warning',
        duration: '2000'
      });
    }
  }, 'POST');

  // ajax(_this,_this.extendApi.userLogin,params,function(res){
  //   // console.log(_this.extendApi);
  //   if(res.code==200){
  //     // setcookie('token', data.access_token);
  //     sessionStorage.setItem("token", res.data.access_token);
  //     sessionStorage.setItem("userid", res.data.userid);
  //     // sessionStorage.setItem("username",params.email);
  //     if(_this.loginTab){
  //       _this.loginTab=3;
  //     }
  //     _this.$notify({
  //       title: '提示',
  //       message: '登陆成功',
  //       type: 'success',
  //       duration:'2000'
  //     });
  //     if(typeof(success)==="function"){
  //       success(res);
  //     }
  //   }
  // },'POST');
}
//注册
var subloginup=function(_this,params,success){
  ajax(_this,_this.extendApi.newRegist,params,function(data){
    if(typeof(success)==="function"){
      success(data);
    }
    if(data.code == 200){
      
    }
  },'POST')
}

var getUserData=function(that,success,param){
  ajax(that,that.extendApi.getUserInfo,param,(data)=>{
    if(typeof(success)==="function"){
      success(data);
    }
    if(data.code==200){
      
    }
    else if(data.code==-2){
      delatecookie();
      that.$router.push({path:'/index'});
      that.$notify({
        title: '提示',
        message: "请重新登录",
        type: 'warning',
        duration: '1000'
      });          
    }
  },"GET");
};
var goregister = function(_this, pageindex) { //注册接口
  // var _this=this;
  ajax(_this, _this.extendApi.userLoginUp, _this.regester, function(res) {
    if (res.code == 200) {
      _this.$notify({
        title: '提示',
        message: '注册成功',
        type: 'success'
      });
      _this.login.email = _this.regester.email;
      console.log();
      _this.login.password = _this.regester.password;
      sublogion(_this, pageindex);
    } else {
      _this.$notify({
        title: '提示',
        message: res.message,
        type: 'warning'
      });
    }
  })
};

  //价格框输入保留位数
var formatcoinPrice = function(type, price) {
  price = price.toString();
  if (type == "ETH" || type == "ETC" || type == "ZEC" || type == "LTC" || type == "BTC" || type == "BCC") {
    return (price.match(/\d+(\.\d{0,4})?/) || [''])[0];
  }
  // if(type=="BTC"){
  //   return (price.match(/\d+$/) || [''])[0];
  // }
  // if(type=="BTS" || type=="NYCC"){
  //   return (price.match(/\d+(\.\d{0,3})?/) || [''])[0];
  // }
  // if(type=="SC" || type=="WTC"){
  //    return (price.match(/\d+(\.\d{0,4})?/) || [''])[0];
  // }
};

  //格式化数量框
var formatcoinNum = function(type) {
  let coinlist = {
    "BTC": '3',
    "BCC": '3',
    "ETH": '3',
    "ETC": '3',
    "ZEC": '3',
    "LTC": '3'
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
};

  //格式化价格框保留位数
var formatcoinprice = function(type) {
  let coinlist = {
    "BTC": '4',
    "BCC": '4',
    "ETH": '4',
    "ETC": '4',
    "ZEC": '4',
    "LTC": '4'
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
};

var cannel = function(_this, id) {
  _this.cancelparm.orderid = id;
  _this.cancelparm.currency = sessionStorage.getItem('symbol');
  ajax(_this, _this.extendApi.Cancel, _this.cancelparm, function(response) {
    if (response.code == 200) {
      setTimeout(function() {
        _this.gethistorylist();
        getusermoney(_this);
      }, 1000)
      _this.$notify({
        title: '成功',
        message: '撤单成功',
        type: 'success',
        duration: '1000',
      });
    } else {
      _this.$notify({
        title: '失败',
        message: '撤单失败',
        type: 'error',
        duration: '1000',
      });
    }
  })
};

var numjs = function(type) {
  let coinlist = {
    "BTC": 1000,
    "BCC": 1000,
    "ETH": 1000,
    "ETC": 1000,
    "ZEC": 1000,
    "LTC": 1000
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
};

  //最小交易量
var getmincoinNum = function(type, num) {
  num = num.toString();
  return (num.match(/\d+(\.\d{0,3})?/) || [''])[0];
  // if(type=="ETH" || type=="ETC" ||type=="BTS"){
  //   return (num.match(/\d+(\.\d{0,2})?/) || [''])[0];
  // }
  // if(type=="BTC"||type=="BCC"){
  //   return (num.match(/\d+(\.\d{0,4})?/) || [''])[0];
  // }
  // if(type=="SC" || type=="NYCC" || type=="WTC"){
  //   return num.replace(/[^\d]/g,'');
  // }
  // if(type=="ZEC"||type=="LTC"){
  //   return (num.match(/\d+(\.\d{0,3})?/) || [''])[0];
  // }
};

  //累加价格
var addformatcoinprice = function(type) {
  let coinlist = {
    "BTC": '10',
    "BCC": '1',
    "ETH": '1',
    "ETC": '1',
    "SC": '0.0005',
    "WTC": '0.0005',
    "NYCC": '0.005',
    "ZEC": '1',
    "BTS": '0.1',
    "LTC": '1'
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
};

var initCoinNum = function(type) {
  let coinlist = {
    "BTC": '0.0001',
    "BCC": '0.0001',
    "ETH": '0.0001',
    "ETC": '0.0001',
    "ZEC": '0.0001',
    "LTC": '0.0001'
  }
  if (coinlist[type] == undefined) {
    console.log("缺少币种配对配置");
    return false;
  } else {
    return coinlist[type];
  }
};

var getticket = function(_this, cointype, tradepage) {
  cointype = cointype + 'BTC';
  _this.ticket.symbol = cointype;
  getticketcom(_this, _this.ticket, function(reponse) {
    if (reponse.code == 200 && (_this.symbol + "BTC") == reponse.data.symbol) {
      _this.tradeloading = false;
      _this.newtrade = reponse.data.trade;
      if (reponse.data.trade.length > 0) {
        _this.newprice = reponse.data.trade[0].price.toFixed(formatcoinprice(sessionStorage.symbol));
        _this.newtradenum = reponse.data.trade[0].am.toFixed(formatcoinNum(sessionStorage.symbol));
        _this.isbuy = reponse.data.trade[0].type;
      } else {
        _this.newprice = 0;
        _this.newtradenum = 0;
      }
      if (tradepage == 'fasttrade') {
        reponse.data.marketdata.sell = reponse.data.marketdata.sell.reverse();
      }
      if (reponse.data.marketdata.buy.length > 0) {
        _this.mountedBuyone = reponse.data.marketdata.buy[0].price;
      } else {
        _this.mountedBuyone = 0.00;
      }
      if (reponse.data.marketdata.sell.length > 0) {
        if (tradepage == 'fasttrade') {
          _this.mountedSellone = reponse.data.marketdata.sell[reponse.data.marketdata.sell.length - 1].price;
        } else {
          _this.mountedSellone = reponse.data.marketdata.sell[0].price;
        }

      } else {
        _this.mountedSellone = 0.00;
      }
      _this.sellticket = reponse.data.marketdata.sell;
      _this.buyticket = reponse.data.marketdata.buy;
      for (let i = 0; i < _this.sellticket.length; i++) {
        _this.sellticket[i].sellwtd = '';
        _this.sellticket[i].buywtd = '';
        var lprice = 0;

        //根据后台给的小数点位数来控制比较好
        lprice = _this.sellticket[i].price.toFixed(formatcoinpriceHQ(sessionStorage.symbol))

        if (_this.amstat[lprice]) {
          if (_this.amstat[lprice].buy != null) {
            _this.sellticket[i].buywtd = _this.amstat[lprice]['buy'];
          } else {
            _this.sellticket[i].sellwtd = _this.amstat[lprice]['sell'];
          }
        }
      }
      for (let i = 0; i < _this.buyticket.length; i++) {
        _this.buyticket[i].buywtd = '';
        var lprice = 0;
        lprice = _this.buyticket[i].price.toFixed(formatcoinpriceHQ(sessionStorage.symbol))
        if (_this.amstat[lprice]) {
          if (_this.amstat[lprice].buy != null) {
            _this.buyticket[i].buywtd = _this.amstat[lprice]['buy'];
          } else {
            _this.buyticket[i].sellwtd = _this.amstat[lprice]['sell'];
          }
        }
      }
      _this.sellticket.amst = amst;
      _this.buyticket.amst = amst;
    } else {
      _this.$notify({
        title: '提示',
        message: response.error,
        type: 'error'
      });
    }
  }, 'GET')
};

  //获取资金数据
var getusermoney = function(_this) {
  // var _this=this;
  ajax(_this, _this.extendApi.userAssetlist, '', function(reponse) {
    if (reponse.code == 200) {
      var data = reponse.data;
      for (let index in _this.moneyinfo) {
        _this.moneyinfo[index] = data.list[index];
      }
      _this.moneyinfo.valuation = data.valuation;
      _this.myAssets.availablemoney = data.list.BTC.active;
      if (_this.buyprice > 0) {
        _this.MaxBuyNum = parseInt(_this.myAssets.availablemoney / _this.buyprice * numjs(_this.symbol)) / numjs(_this.symbol);
      }
      if (_this.buynumm == 0) {
        _this.nextMoney = _this.myAssets.availablemoney;
      }
      _this.myAssets.frozenmoney = data.list.BTC.frozen;
      let symbol = sessionStorage.getItem('symbol');
      _this.myAssets.availablecoin = data.list[symbol].active;
      if (_this.sellScroll == 0) {
        _this.nextcoin = _this.myAssets.availablecoin
      }
      _this.myAssets.frozencoin = data.list[symbol].frozen;
    }

    if (reponse.code == -2) {
      delatecookie();
    }
  }, 'GET');
}

var initINput = function(type) {
  return 0.001;
  // if(type=="BTC"||type=="BCC"){
  //   return 0.01;
  // }
  // if(type=='ETH' ||type=='ETC' ||type=='ZEC' ||type=='LTC'){
  //   return 1;
  // }
  // if(type=='SC' ||type=='BTS' ||type=='NYCC' || type=='WTC'){
  //   return 100;
  // }
};

  //获取行情数据
var getticketcom = function(that, params, callback) {
  that.axios({
    method: 'get',
    url: that.extendApi.usertradeList,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;',
    },
    params: params,
  }).then((response) => {
    var reponse = response.data;
    callback(reponse);
  }).catch(function(response) {
    // console.log(response);
  })
};

/*获取认证状态*/
var getstate=function(that,success){
  ajax(that,that.extendApi.getState,"",function(data){    
    if(data.code==200){
      that.userState=data.data.states;
    }
    else{
      // that.$notify({
      //   title: '提示',
      //   message: data.message,
      //   type: 'error'
      // });
    }
    if(typeof(success)=="function"){
      success(data);
    }
  },"GET");
};

var quit=function(that,type){
  ajax(that,that.extendApi.loginout,"",(data)=>{
    if(data.code==200||data.code==-2){
      if(type!=1){
        that.$notify({
          title: '提示',
          message: '退出成功',
          type: 'success',
          duration:'1500'
        });
      }    
      delatecookie();
      that.$router.push({path:"/index"});
      that.showstate=0;
      bus.$emit("goout");
    }
  },"GET");
};

export{
  quit,
  getstate,
  temptime,
  getDataYear,
  ajax,
  delatecookie,
  savecookie,
  sublogion,
  subloginup,
  getcookie,
  setcookie,
  sendEmail,
  sendCode,
  getUserData,
  goregister,
  formatcoinPrice,
  formatcoinNum,
  formatcoinprice,
  cannel,
  numjs,
  getmincoinNum,
  addformatcoinprice,
  initCoinNum,
  getticket,
  getusermoney,
  initINput,
  getticketcom
  // subRegist,
  // base64Sort,
}