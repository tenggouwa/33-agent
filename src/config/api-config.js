/*
 * 端口域名配置
 * @type Object
 */
var apiUrl = {
    basehostUrl: 'https://dev407.33.cn',
    // basehostUrl: 'https://kdata.fxee.com',
    uploadUrl:"https://oss.33.cn",
}
export default {

   userLogin:apiUrl.basehostUrl+'/api/member/login',//用户登录

   // getToken:apiUrl.basehostUrl+'/api/member/login',//用户登录

   userLoginUp:apiUrl.basehostUrl+'/api/member/reg',//用户注册

   // userReg:apiUrl.basehostUrl+'/api/member/reg',//用户注册

   // getMoneyInfo:apiUrl.basehostUrl + '/api/Account/Asset',//获取资产信息

   userAssetlist:apiUrl.basehostUrl+'/api/Account/Asset',//用户资产列表

   userAssethist:apiUrl.basehostUrl+'/api/Pay/CoinRecord',//我的资产历史记录

   usertradeList:apiUrl.basehostUrl+'/api/data/market',////获取行情

   // tradecoin:apiUrl.basehostUrl+'/api/trade/place',//买卖币

   // tradeOrder:apiUrl.basehostUrl+'/api/trade/OrderList',//交易明细
   
   // indexticker:apiUrl.basehostUrl+'/api/data/Ticker',//首页ticker数据

   getcoindata:apiUrl.basehostUrl+'/api/data/Ticker',//首页ticker数据

   // getBtcMarketData:apiUrl.basehostUrl+"/api/data/market",//获取行情

   sendEmail: apiUrl.basehostUrl + '/api/send/mail', //发送邮件通知

   getUserInfo: apiUrl.basehostUrl + "/api/member/info",//获取用户信息

   loginout: apiUrl.basehostUrl + '/api/member/loginout',//账户退出

   Cancel: apiUrl.basehostUrl+'/api/trade/cancel',//撤单接口

   hisorder: apiUrl.basehostUrl + "/api/trade/OrderList",//交易历史

   place: apiUrl.basehostUrl+'/api/trade/place',//交易接口

   changePassword: apiUrl.basehostUrl+'/api/member/editpassword',//修改密码

   loginrecord: apiUrl.basehostUrl+'/api/account/loginrecord',//登陆日志

   chargecoin: apiUrl.basehostUrl+'/api/account/myaddress',//充币

   adressList: apiUrl.basehostUrl+'/api/account/addresslist',//地址列表

   mancoinmon: apiUrl.basehostUrl+'/api/data/fees',//提币手续费

   phoneCountry: apiUrl.basehostUrl+'/api/data/country',//国家信息

   phoneCheckedNum: apiUrl.basehostUrl+'/api/send/sms',//手机验证码

   phoneCommit:apiUrl.basehostUrl+'/api/certification/mobile',//手机验证提交

   getState:apiUrl.basehostUrl+'/api/certification/states',//验证状态

   // emailSend:apiUrl.basehostUrl+'/api/send/mail',//发送邮件

   emailCommit:apiUrl.basehostUrl+'/api/certification/email',//邮件验证

   uploadImg:apiUrl.uploadUrl+'/upload/certificate',//上传图片

   getImgToken:apiUrl.basehostUrl + "/api/certification/UploadToken",//获取图片上传token

   cardType:apiUrl.basehostUrl + '/api/data/cardtypes', //获取证件类型

   ocr:apiUrl.basehostUrl + '/api/Certification/Ocr', //证件OCR

   Certification: apiUrl.basehostUrl + '/api/certification/identity', //提交认证信息

   resetPwd:apiUrl.basehostUrl + '/api/member/resetpassword', //重置密码

   pwdSend:apiUrl.basehostUrl + '/api/send/reset', // 密码找回（邮件短信）发送

   txFees:apiUrl.basehostUrl + '/api/data/txfees',//提币手续费

   getFaceAmount:apiUrl.basehostUrl + '/api/data/faceamount',//获取人脸额度

   getOutCin:apiUrl.basehostUrl + '/api/pay/Withdrawcoin',//提币接口

   addAdress:apiUrl.basehostUrl + '/Applications/account/ManageAdress',//新增地址

}
