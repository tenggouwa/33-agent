
/*
 * 时间格式化
 */
exports.filterTime = (timestamp,format) => {
  let date = new Date(timestamp ? (parseInt(timestamp)/1000000) : new Date().getTime());
  let FORMAT = new Object();
  FORMAT = {
    'Y': "date.getFullYear()",
    'M': "date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1",
    'D': "date.getDate() < 10 ? '0' + date.getDate() : date.getDate()",
    'h': "date.getHours() < 10 ? '0' + date.getHours() : date.getHours()",
    'm': "date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()",
    's': "date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()"
  }
  for (let i in FORMAT) {
    if (format.indexOf(i) != -1) {
      format = format.replace(i, eval(FORMAT[i]));
    }
  }
  return format;
}
exports.filterStr=(value,length)=>{
  value=value.toFixed(length);
  return value;
}
exports.filterNumHide=(val,state)=>{
  if(val){
    if(state=='email'){
        val=val.split('@')[0].substr(0,1)+'**@'+val.split('@')[1];
    }
    else{
        val=val.substr(0,3)+'****'+val.substr(-4);
    }
    return val; 
  } 
}