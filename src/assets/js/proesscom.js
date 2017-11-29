import {formatcoinprice,addformatcoinprice,initCoinNum,formatcoinNum,getmincoinNum,addtradeNum,numjs} from './common'
//拖动卖出滑块
var sellscrolles=function(val,_this){
  // var _this=this;
  _this.sellScroll=val;
  if(_this.sellscrollchange){
    setTimeout(function(){
      if(formatcoinNum(_this.symbol)==0){
        _this.sellnum=_this.tradenum=parseInt(_this.myAssets.availablecoin*_this.sellScroll/100);
      }
      else{
        _this.sellnum=_this.tradenum=parseFloat(_this.myAssets.availablecoin*_this.sellScroll/100).toFixed(formatcoinNum(_this.symbol));
      }
      _this.nextcoin=(_this.myAssets.availablecoin-_this.sellnum).toFixed(formatcoinNum(_this.symbol));
      if(_this.sellprice){
        _this.sellmoney=parseFloat(_this.sellprice*_this.sellnum).toFixed(2);
      }
    }, 50);
  }
};
//拖动买入滑块
var buyscrolles=function(val,_this){
  _this.buynumm=val;
  // console.log(_this.rate);
  // console.log("_this.buynum:"+_this.buyprice)
  if(_this.buyscrollchange){
    setTimeout(function(){
      _this.buymoney=parseFloat(_this.myAssets.availablemoney*(1+_this.rate)*_this.buynumm/100).toFixed(2);
      if(_this.buymoney-_this.myAssets.availablemoney>=0){
        _this.buymoney=_this.myAssets.availablemoney;
      }
      _this.nextMoney=parseFloat(_this.myAssets.availablemoney-_this.buymoney).toFixed(2);
      if(_this.buyprice!=0){
        if(formatcoinNum(_this.symbol)==0){
          _this.buynum=_this.tradenum=parseInt(_this.buymoney/(1+_this.rate)/_this.buyprice);
        }
        else{
          _this.buynum=_this.tradenum=parseInt(_this.buymoney/(1+_this.rate)/_this.buyprice*numjs(_this.symbol))/numjs(_this.symbol);
        }
      }
    }, 50);
  }
}

var buycTradeCom=function(_this){
  if(_this.buynum>0){
     _this.buynum=_this.buynum
  }else if( _this.tradenum>0){
    _this.buynum= _this.tradenum;
  }else{
    _this.buynum=initCoinNum(_this.symbol);
  }
  var allmoney=parseFloat(Number(_this.buynum)*Number(_this.buyprice)*(1+_this.rate)).toFixed(2);//加入手续费计算
  if(allmoney-_this.myAssets.availablemoney>=0){
    _this.buymoney=_this.myAssets.availablemoney;
    if(formatcoinNum(_this.symbol)==0){
      _this.buynum=parseInt((parseFloat(_this.buymoney)/(1+_this.rate)/parseFloat(_this.buyprice)));
    }
    else{
      _this.buynum=parseInt((parseFloat(_this.buymoney)/(1+_this.rate)/parseFloat(_this.buyprice))*numjs(_this.symbol))/numjs(_this.symbol);
    }
  }else{
    _this.buymoney=allmoney;
    _this.buynum=parseInt((parseFloat(_this.buymoney)/(1+_this.rate)/parseFloat(_this.buyprice))*numjs(_this.symbol))/numjs(_this.symbol);
    if(isNaN(_this.buynum)){
      _this.buynum=0;
    }
  }
  if(_this.myAssets.availablemoney>0){
    _this.buynumm=Number(parseFloat((parseFloat(_this.buymoney)/parseFloat(_this.myAssets.availablemoney))*100).toFixed(2));
  }
}

var sellTradeCom=function(_this){
  _this.sellnum=_this.sellnum || _this.tradenum;
  _this.sellmoney=parseFloat(_this.sellprice*_this.sellnum).toFixed(2);
  if(_this.myAssets.availablecoin>0){
    _this.sellScroll=Number(parseFloat(_this.sellnum/_this.myAssets.availablecoin*100).toFixed(2));
  } 
}
//点击买入价格向上调
var priceComUp=function(tradetype,_this){
  if(tradetype=='buy'){
      _this.buyprice=parseFloat(parseFloat(_this.buyprice)+Number(addformatcoinprice(_this.symbol))).toFixed(formatcoinprice(_this.symbol))
    if(_this.buynum>0){
      buycTradeCom(_this);
    }
  }else{
      _this.sellprice=parseFloat(parseFloat(_this.sellprice)+Number(addformatcoinprice(_this.symbol))).toFixed(formatcoinprice(_this.symbol))
    if(_this.sellnum>0){
      sellTradeCom(_this);
    }
  }
}
//点击买入价格向下调
var priceComDown=function(tradetype,_this){
  if(tradetype=='buy'){
    _this.buyscrollchange=false;
    if(_this.buyprice-Number(addformatcoinprice(_this.symbol))>0){
        _this.buyprice=parseFloat(parseFloat(_this.buyprice)-Number(addformatcoinprice(_this.symbol))).toFixed(formatcoinprice(_this.symbol))
    }else {
      _this.buyprice=Number(addformatcoinprice(_this.symbol));
    }
    buycTradeCom(_this);
  }else{
    _this.sellscrollchange=false;
    if(_this.sellprice-Number(addformatcoinprice(_this.symbol))>0){
        _this.sellprice=(parseFloat(_this.sellprice)-addformatcoinprice(_this.symbol)).toFixed(formatcoinprice(_this.symbol))
    }else{
      _this.sellprice=Number(addformatcoinprice(_this.symbol))
    }
    sellTradeCom(_this);
  }
}
var inputTradeNumCom=function(num,type,_this){
  if(type=="BUY"){
    _this.buyscrollchange=false;
    _this.buynum=getmincoinNum(_this.symbol,num)
    _this.buymoney=parseFloat(_this.buyprice*_this.buynum*(1+_this.rate)).toFixed(2);//加入手续费rate手续费比例
    if(_this.buymoney-_this.myAssets.availablemoney>0){
      _this.buymoney=_this.myAssets.availablemoney;
      if(formatcoinNum(_this.symbol)==0){
        _this.buynum=parseInt(_this.buymoney/(1+_this.rate)/_this.buyprice);
      }
      else{
        _this.buynum=parseInt(_this.buymoney/(1+_this.rate)/_this.buyprice*numjs(_this.symbol))/numjs(_this.symbol);
      }
    }
    _this.nextMoney=parseFloat(_this.myAssets.availablemoney-_this.buymoney).toFixed(formatcoinprice(_this.symbol));
    _this.buynumm=Number(parseFloat((_this.buymoney/_this.myAssets.availablemoney)*100).toFixed(2));
  }else{//卖
    _this.sellscrollchange=false;
    _this.sellnum=getmincoinNum(_this.symbol,num);
    if(_this.sellnum-_this.myAssets.availablecoin>0){
      _this.sellnum=_this.myAssets.availablecoin;
    }
    _this.sellmoney=parseFloat(_this.sellprice*_this.sellnum).toFixed(2);
    _this.nextcoin=_this.myAssets.availablecoin-_this.sellnum;
    _this.nextcoin=getmincoinNum(_this.symbol,_this.nextcoin);
    _this.sellScroll=Number(parseFloat(_this.sellnum/_this.myAssets.availablecoin*100).toFixed(2));
  }
}
export{
  sellscrolles,
  buyscrolles,
  buycTradeCom,
  sellTradeCom,
  priceComUp,
  priceComDown,
  inputTradeNumCom
}