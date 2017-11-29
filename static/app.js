if (!window.console || !window.console.log || !window.console.error) {
    window.console = { log: function(x) { myalert(x) }, error: function(x) { myalert(x) } };
}

function array_diff(arr1, arr2) {
    var diff = [];
    for (var i = 0; i < arr1.length; i++) {
        if (!in_array(arr2, arr1[i])) {
            diff.push(arr1[i]);
        }
    }
    return diff;
}

function array_equal(arr1, arr2) {
    if (is_array(arr1) && is_array(arr2)) {
        if (arr1.length != arr2.length) return false;
        for (var i = 0; i < arr1.length; i++) {
            if (!array_equal(arr1[i], arr2[i])) {
                return false;
            }
        }
        return true;
    } else {
        return arr1 == arr2;
    }
}

function in_array(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (array_equal(arr[i], value)) return true;
    }
    return false;
}
//*没有用到
// function playmusic(url) {
//     var id = "__music__embed__player__";
//     var obj = document.getElementById(id);
//     url = __baseurl__ + "js/music/" + encodeURI(url);
//     if (obj == null) {
//         var oDiv = document.createElement("DIV");
//         oDiv.id = id;
//         oDiv.style.position = "absolute";
//         oDiv.style.width = "1px";
//         oDiv.style.height = "1px";
//         oDiv.style.top = "-2000px";
//         document.body.appendChild(oDiv);
//         obj = oDiv;
//     }
//     if (url.match(new RegExp("\\.wav$", 'ig'))) {
//         playwav(obj, url);
//     } else {
//         playmp3swf(obj, url);
//     }
// }

function isIE() {
    var ua = navigator.userAgent.toLowerCase();
    var s;
    if (ua.match(new RegExp("msie\\s+([\\d.]+)", "ig"))) {
        return true;
    }
    return false;
}

// function playwav(obj, url) {
//     var html;
//     if (isIE()) {
//         html = '<embed name="music" height="1px" width="1px" src="' + url + '" />';
//     } else {
//         html = '<audio height="1px" width="1px" autoplay="true">';
//         html += '<source name="music" src="' + url + '" type="audio/x-wav" />';
//         html += '</audio>';
//     }
//     obj.innerHTML = html;
// }

// function playmp3swf(obj, url) {
//     var url = escape(url);
//     var html = '<embed type="application/x-shockwave-flash" wmode="transparent" ' + 'src="' + __baseurl__ + 'js/audio-player.swf" flashvars="audioUrl=' + url + '&autoPlay=true" height="1px" width="1px"></embed>';
//     obj.innerHTML = html;
// }

function myalert(text) {
    if (__javascript_debug__) {
        //alert(text);
    }
}

function GetText(value, unit) {
    if (unit < 1) {
        unit = -Math.floor(Math.log(unit) / Math.LN10);
        var text = FormatNumber(value, unit);
    } else if (unit == 1) {
        var text = Math.floor(value) + ".0";
    } else {
        var text = value;
    }
    return text;
}

function triggerKeydown(code) {
    var e = jQuery.Event("keydown");
    e.keyCode = code;
    $(document).trigger(e);
}
/*
function Alert(obj, showFunction)
{
    var str = "";
    var key;
    if (typeof showFunction == "undefined")
    {
        showFunction = true;
    }
    if (typeof obj == 'object')
    {
        for (key in obj)
        {
            if (typeof key == 'string')
            {
                if (typeof obj[key] == 'function')
                {
                    if (showFunction)
                    {
                        str += key +" => (\n    "+Alert(obj[key])+"\n)\n";
                    }
                } else {
                    str += key +" => (\n    "+Alert(obj[key])+"\n)\n";
                }
            }
        }
        return str;
    } else {
        if (typeof obj === "undefined")
        {
            return "undefined";
        } else if (obj === null) {
            return "null";
        } else {
            return obj.toString();
        }
    }
}
*/
/*没有用到
function url_concat(base, str)
{
    var last = base.charAt(base.length - 1);
    if (base.indexOf("?") != -1)
    {
        if(last != "?") {
            return base + "&" + str;
        } else {
            return base + str;
        }
    } else {
        return base + "?" + str;
    }
}*/
//controller里面作为判断
function is_undefined(obj) {
    return typeof obj === "undefined";
}

//object copy复制一份数据
function object_copy(obj, copy_array) {
    var newobj = {};
    if (is_array(obj)) {
        if (copy_array) {
            return array_copy(obj);
        } else {
            return obj;
        }
    }
    if (typeof obj == 'object') {
        for (var key in obj) {
            newobj[key] = object_copy(obj[key]);
        }
    } else {
        return obj;
    }
    return newobj;
}
//深度拷贝
function array_copy(arr) {
    var copy = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
        if (is_array(arr[i])) {
            copy[i] = array_copy(arr[i]);
        } else {
            copy[i] = arr[i];
        }
    }
    return copy;
}
//判断是否是数组
function is_array(a) {
    return Object.prototype.toString.call(a) === "[object Array]";
}


function ClassExtend(sub, base) {
    //before:
    //alert("before");
    //alert(Alert(oparnet.prototype));
    for (var property in base.prototype) {
        sub.prototype[property] = base.prototype[property];
    }
    sub.prototype.constructor = sub;
    //获得基类
    sub.__parent = base;
    if (!base.__sub) {
        base.__sub = [];
    }
    //保存继承它的子类
    base.__sub.push(sub);
}

function ClassNew(classname) {
    var args = Array.prototype.slice.call(arguments, 1);
    var _this = this;

    function F() {
        _this.parent = classname.apply(_this, args);
        return _this.parent;
    }
    F.prototype = classname.prototype;
    return new F();
}

function getClassName(obj) {
    var str = obj.constructor.toString();
    var regexp = new RegExp("function(\\s+)([^\\(]+)", "ig");
    str = regexp.exec(str);
    return $.trim(str[2]);
}

function sup(_this) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (_this.constructor && _this.constructor.__parent) {
        if (typeof _this.__counter === 'undefined') {
            // It has not... perform the initilization
            _this.__counter = 0;
        }
        _this.__counter++;
        if (_this.__counter > 1) //不是第一次调用继承
        {
            var _parent = _this.constructor.__parent;
            for (var i = 1; i < _this.__counter; i++) {
                _parent = _parent.__parent;
            }
            args.unshift(_parent);
            ClassNew.apply(_this, args);
        } else {
            args.unshift(_this.constructor.__parent);
            ClassNew.apply(_this, args);
        }
    }
}

function Point(x, y, z) {
    this.x = x;
    this.y = y;
    if (z !== undefined || z !== null) {
        this.z = z;
    }
}

function FormatNumber(srcStr, nAfterDot) {
    var nten = Math.pow(10, nAfterDot);
    srcStr = Math.round(parseFloat(srcStr) * nten) / nten;
    srcStr = srcStr.toString();
    var arr = srcStr.split(".");
    if (arr[1] == null) {
        return srcStr + "." + bulidZero(nAfterDot);
    }
    if (arr[1].length < nAfterDot) {
        var offset = nAfterDot - arr[1].length;
        srcStr += bulidZero(offset);

    }
    return srcStr;
}

function bulidZero(num) {
    var srcStr = '';
    for (var i = 0; i < num; i++) {
        srcStr += "0";
    }
    return srcStr;
}

function array_copy1d(arr) {
    var copy = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
        copy[i] = arr[i];
    }
    return copy;
}

function array_copy2d(arr) {
    var copy = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
        var len = arr[i].length;
        copy[i] = new Array(len);
        for (var j = 0; j < len; j++) {
            copy[i][j] = arr[i][j];
        }
    }
    return copy;
}


//得到最大最小值
function minmax(data, start_index, end_index) {
    if (!start_index) start_index = 0;
    if (!end_index) end_index = data.length - 1;

    if (is_array(data[start_index])) {
        return _minmax2d(data, start_index, end_index);
    } else {
        return _minmax1d(data, start_index, end_index);
    }
}
//辅助minmax
function _minmax2d(data, start_index, end_index) {
    var max = -Infinity;
    var min = Infinity;
    var maxIndex="";
    var minIndex="";

    for (var i = start_index; i <= end_index; i++) {
        for (var j = 0; j < data[i].length; j++) {
            if (data[i][j] >= max) {
                max = data[i][j];
                maxIndex=[i,j];
            }
            if (data[i][j] < min){
                min = data[i][j];
                minIndex=[i,j]
            } 
        }
    }
    return [min, max,minIndex,maxIndex];
}
//辅助minmax
function _minmax1d(data, start_index, end_index) {
    var max = -Infinity;
    var min = Infinity;
    var maxIndex="";
    var minIndex="";
    for (var i = start_index; i <= end_index; i++) {
        if (data[i] >= max) {
            max = data[i];
            maxIndex=i;
        }
        if (data[i] < min) {
            min = data[i];
            minIndex=i;
        }
    }
    return [min, max,minIndex,maxIndex];
}
//画行
function drawRow(ctx, point, len, color, width) {
    var x = point.x;
    var y = point.y;
    if (isNaN(y)) {
        debug("draw row y nan");
    }
    ctx.beginPath();
    if (width) ctx.lineWidth = width;
    if (color) ctx.strokeStyle = color;
    ctx.moveTo(x, y + 0.5);
    ctx.lineTo(x + len, y + 0.5);
    ctx.closePath();
    ctx.stroke();
}

//画列
function drawCol(ctx, point, len, color, width) {
    var x = point.x;
    var y = point.y;
    ctx.beginPath();
    if (width) ctx.lineWidth = width;
    if (color) ctx.strokeStyle = color;
    ctx.moveTo(x + 0.5, y);
    ctx.lineTo(x + 0.5, y + len);
    ctx.closePath();
    ctx.stroke();
}
//时间转换成日期格式
function timeToDate(time, format, timezone) {
    if (!format) format = "Y-m-d H:i:s";
    if (!timezone) timezone = 0;

    var date = new Date();
    if (format.indexOf(".") == -1) // time no msecond
    {
        time *= 1000;
    }
    time += (date.getTimezoneOffset() + timezone * 60) * 60 * 1000;
    date.setTime(time);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var i = date.getMinutes();
    var s = date.getSeconds();
    var u = date.getMilliseconds();

    format = time_replace(format, "Y", y);
    format = time_replace(format, "m", m);
    format = time_replace(format, "d", d);
    format = time_replace(format, "H", h);
    format = time_replace(format, "i", i);
    format = time_replace(format, "s", s);
    format = time_replace(format, "u", u, 3);
    return format;
}
//时间标准模式
function formatTime(time, p) {
    var conf = Config.getInstance()
    var unit = conf.Global.xunit[p]
    if (unit) {
        unit = unit * 60;
        return Math.floor(time / unit) * unit
    }
    return time
}
//formatTime 辅助函数
function time_replace(format, search, n, zero_number) {
    if (typeof zero_number === "undefined") {
        zero_number = 2;
    }
    if (n < 10) n = padingZero(n, zero_number) + n;
    return format.replace(search, n);
}
//time_replace 辅助函数 
function padingZero(n, zero_number) {
    if (n < 0) {
        return n;
    }
    var zn = zero_number - 1;
    if (n > 0) {
        var zero_current_num = Math.floor(Math.log(n) / Math.LN10) + 1;
        zn = zero_number - zero_current_num;
    }
    var zero = "";
    for (var i = 0; i < zn; i++) {
        zero += "0";
    }
    return zero;
}
//在k线图上写内容
function writeText(ctx, point, text, color, font) {
    //console.log(window.do_drawText);
    if (isIPhone() && window.do_drawText) {
        //手机内容设置
        text = text.toString();
        if (color) ctx.strokeStyle = color;
        do_drawText.call(ctx, text, point.x, point.y - 10, 9);
    } //电脑内容设置
    else if (ctx.fillText) {
        if (color) ctx.fillStyle = color;
        if (font) { ctx.font = font; } else { ctx.font = "normal small-caps normal 1.1em Arial" }
        ctx.fillText(text, point.x, point.y);
    } else {
        if (color) ctx.strokeStyle = color;
        if (font) { ctx.font = font; } else { ctx.font = "normal small-caps normal 1.1em Arial" }
        ctx.strokeText(text, point.x, point.y);
    }
}
/*
 * 画带箭头的虚线
 */

function drawWithArrowheads(x1,y1,x2,y2,ctx){
    // arbitrary styling
    ctx.strokeStyle="#ff6600";
    ctx.fillStyle="#ff6600";
    ctx.lineWidth=1;
    // draw the line
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    // draw the starting arrowhead
    var startRadians=Math.atan((y2-y1)/(x2-x1));
    startRadians+=((x2>x1)?-90:90)*Math.PI/180;
    this.drawArrowhead(ctx,x1,y1,startRadians);
    // draw the ending arrowhead
    var endRadians=Math.atan((y2-y1)/(x2-x1));
    endRadians+=((x2>x1)?90:-90)*Math.PI/180;
    drawArrowhead(ctx,x2,y2,endRadians);

}
function drawArrowhead(ctx,x,y,radians){
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(radians);
    ctx.moveTo(0,0);
    ctx.lineTo(3,10);
    ctx.lineTo(-3,10);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
}

/*
 * 画虚线
 * 
 */
function drawDashLine(context,x1,y1,x2,y2,pattern)  
{  
    pattern = pattern === undefined ? 5 : pattern;  
    //得到斜边的总长度  
    // calculate the delta x and delta y 
    var dx = (x2 - x1); 
    var dy = (y2 - y1); 
    var distance = Math.floor(Math.sqrt(dx*dx + dy*dy)); 
    var dashlineInteveral = (pattern <= 0) ? distance : (distance/pattern); 
    var deltay = (dy/distance) * pattern; 
    var deltax = (dx/distance) * pattern; 
    // draw dash line 
    context.beginPath(); 
    context.lineWidth=0.7;
    context.strokeStyle="#333";
    for(var dl=0; dl<dashlineInteveral; dl++) { 
        if(dl%2) { 
           context.lineTo(x1 + dl*deltax, y1 + dl*deltay); 
        } else { 
           context.moveTo(x1 + dl*deltax, y1 + dl*deltay); 
        } 
    } 
    context.stroke(); 
}  
//画canvas层的分割线 折线
function drawLever(ctx,x,y,color,width,heigh){
   ctx.beginPath();
   ctx.strokeStyle = color;
   //设置路径起点坐标
   ctx.moveTo(x, y);
   //定义中间点坐标1
   ctx.lineTo(x+width, y);
   //定义中间点坐标2
    ctx.lineTo(x+width, y-heigh);
     //按照绘制路径顺序连接各个坐标点
    ctx.stroke();
    //关闭绘制路径
    ctx.closePath();
}

//画线
function drawLine(ctx, X, Y, color, width) {
    ctx.beginPath();
    if (width) ctx.lineWidth = width;
    if (color) ctx.strokeStyle = color;
    ctx.moveTo(X[0], Y[0]);
    var prevx = X[0];
    var prevy = Y[0];
    for (var i = 1; i < X.length; i++) {
        if (prevx == X[i] && prevy == Y[i]) {
            continue;
        }
        prevx = X[i];
        prevy = Y[i];
        ctx.lineTo(X[i], Y[i]);
    }
    ctx.stroke();
}
//plotLine plot画线
function plotLine(ctx, p1, p2, color, width) {
    ctx.beginPath();
    if (width) ctx.lineWidth = width;
    if (color) ctx.strokeStyle = color;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.closePath();
    ctx.stroke();
}
//debug打印信息
function debug(msg) {
    var d = $("#debug");
    if (d) {
        var time = (new Date()).getTime();
        var msecond = time % 1000;
        time = Math.floor(time / 1000);
        d.append(time + "(" + msecond + ")" + ": " + msg + "<br />");
    }
}
/*貌似没有用到
function debugx(msg)
{
    var d = $("#debugx");
    if (d)
    {
        var time = (new Date()).getTime();
        var msecond = time % 1000;
        time = Math.floor(time / 1000);
        d.append(time + "("+ msecond +")" + ": " + msg + "<br />");
    }
}*/
//得到当前时间
function getTime() {
    return (new Date()).getTime();
}

/*/从小到大排列的数组 没有使用
function find_first_big(arr, match)
{
    //结束条件是：match >= arr[mid] && match <= arr[mid + 1], 也就是在 mid  和 mid + 1 的之间， 这样，mid + 1 就是first big
    var start = 0;
    var end  = arr.length - 1;
    while (start <= end)
    {
        mid = Math.floor((end - start) / 2) + start;
        if (mid + 1 > arr.length -1) //越界了， 只有在 start == end 的时候会发生，这个时候 mid = arr.length - 1
        {
            if (arr.length > 1)
            {
                if (arr[mid -1] >= match) //判断一下前面一个数字
                {
                    return mid - 1;
                }
            }
            return arr[mid] >= match ? mid : -1;
        }
        if (match >= arr[mid] && match <= arr[mid + 1]) {
                return match == arr[mid] ? mid : mid + 1;
        } else if (arr[mid] < match) {
            start = mid + 1;
        } else { //macth
            end = mid - 1
        }
    }
    return -1;
}*/
////查找到第一个点
function find_first_big_r(arr, match) {
    //结束条件是：match >= arr[mid - 1] && match <= arr[mid + 1], 也就是在 mid  和 mid + 1 的之间， 这样，mid + 1 就是first big
    var start = 0;
    var end = arr.length - 1;
    if (arr[end] > match) {
        return end;
    }
    while (start <= end) {
        mid = Math.floor((end - start) / 2) + start;
        if (mid - 1 < 0) //最多有两个数据 start = 0, end = 0, 1
        {
            if (arr.length > 1) {
                if (arr[1] >= match) {
                    return 1;
                }
            }
            return arr[0] >= match ? 0 : -1;
        }
        if (match >= arr[mid] && match <= arr[mid - 1]) {
            return match == arr[mid] ? mid : mid - 1;
        } else if (arr[mid] < match) {
            end = mid - 1;
        } else { //macth
            start = mid + 1
        }
    }
    return -1;
}

////判断兼容性 手机 pc的兼容性
function check_textRender(canvas) {
    //判断是否是iPhone 或者 ipad
    if (isIPhone()) {
        return false;
    }
    if (!canvas.get(0).getContext) {
        return true;
    }
    var ctx = canvas.get(0).getContext('2d');
       // ctx.drawImage('static/img/klogo.png',this.width, this.height); 
    if (typeof ctx.strokeText == 'function' || ctx.fillText == 'function') {
        return true
    } else {
        return false
    }
}

//判断是否是iPhone 或者 ipad
function isIPhone() //如果是iPhone,那么采用js库绘制, 已知的bug
{
    var agent = navigator.userAgent;
    //agent = "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_3 like Mac OS X; zh-cn) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7E18 Safari/528.16";
    if (agent.toLowerCase().indexOf("iphone") >= 0 || agent.toLowerCase().indexOf("ipad") >= 0) {
        return true;
    }
    return false;
}

//初始化标志位 对于空值做处理
function init_obj(obj, c, p, default_value) {
    if (typeof obj === "undefined") {
        obj = {};
    }
    if (typeof obj[c] === "undefined") {
        obj[c] = {};
    }
    if (typeof obj[c][p] === "undefined") {
        obj[c][p] = default_value;
    }
    return obj;
}

//判断是否为object类型
function is_object(obj, key) {
    if (key) {
        if (typeof obj[key] == "object") {
            return true;
        }
        return false;
    }
    return (typeof obj == "object");
}

//FzmCookie  cookie 内容
FzmCookie = {};
//FzmCookie读函数 从cookie拿数据
FzmCookie.read = function(name) {
    var cookieValue = "",
        search = name + "=";
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
            if (offset > 0) {
                //去除空格部分
                var myoffset = offset;
                while (myoffset > 0 && document.cookie.charAt(--myoffset) == ' ');
                if (myoffset > 0 && document.cookie.charAt(myoffset) != ';') {
                    return '';
                }
            }
            offset += search.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1) {
                end = document.cookie.length;
            }
            cookieValue = unescape(document.cookie.substring(offset, end))
        }
    }
    return cookieValue;
};
//当前时间
function now() {
    return (new Date()).getTime();
}
//写cookie
FzmCookie.write = function(name, value, hours, path, domain, secure) {
    var expire = "";
    if (domain == null) {
        /*
        domain = document.domain;
        if (domain.indexOf(".") == -1) {
            domain = '';
        } else {
            domain = "." + domain;
        }
        domain = domain ? "; domain=" + domain : "";
        */
    }
    path = path ? path : "/";

    if (hours != null) {
        expire = new Date(now() + hours * 3600000);
        expire = "; expires=" + expire.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expire + domain + "; path=" + path + ";";
};
//
FzmCookie.del = function(name, domain, path) {
    var expire = "";

    if (domain == null) {
        domain = domainName();
        if (domain.indexOf(".") == -1) {
            domain = '';
        } else {
            domain = "." + domain;
        }
        domain = domain ? "; domain=" + domain : "";
    }

    path = path ? path : "/";
    value = "";
    hours = "-10";
    if (hours != null) {
        expire = new Date(Fzm.clientTime() + hours * 3600000);
        expire = "; expires=" + expire.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expire + domain + "; path=" + path + ";";
};
//更新cookie
FzmCookie.update = function(name, value, hours, path, domain, secure) {
    var v = Guidv4.get(name); //以guid中保存的值为准
    if (!v) v = FzmCookie.read(name);
    if (v == '') {
        v = value;
    }
    Guidv4.update(name, v);
    FzmCookie.write(name, v, hours, path, domain, secure);
    return v;
};
//设置plot_area基本样式
function set_style(name) {
    var conf = Config.getInstance();
    if (!name) {
        name = conf.Global.style;
    } else {
        conf.Global.style = name;
    }
    conf.merge("Global.Candle.public", "Global.Candle." + name);
    conf.merge("Global.Grid.public", "Global.Grid." + name);
    //设置plot_area的背景颜色
    $(conf.Global.canvasID).css("background", conf.Global.Grid.public.bgColor);
   
    // $(conf.Global.canvasID).css("background-image","url('static/img/Klogo.png')");
    // $(conf.Global.canvasID).css("background-repeat","no-repeat");
}

/*//create_canvas创建canvas层 没有用
function create_canvas()
{
    //
    var conf = Config.getInstance();
    var count = conf.Global.maxCanvasCount;
    for (var i = 0; i < count; i++)
    {
        var id = conf.Global.canvasIDPerfix + i;
        var tmp = $("<canvas id='"+id+"'></canvas>");
        tmp.get(0).height = 1;
        $(conf.Global.canvasID).append(tmp);
    }
}
*/
//显示加载
function show_loading() {
    var conf = Config.getInstance();
    var id = conf.Global.ajaxloadingID;
   
    var view = HTML5StockChartAPI.API.controller.view;

    var plotWidth = view.plotWidth;
    var offsetHeight = $("#plot_area").offset().top;
    var offsetWidth = $("#plot_area").offset().left;
    var plotHeight = view.plotHeight;
    $(id).css("top", offsetHeight + plotHeight / 2 - $(id).width() / 2);
    $(id).css("left", offsetWidth + plotWidth / 2 - $(id).width() / 2);
    $(id).show();
    $("#background").css("top", offsetHeight + plotHeight / 2 - $(id).width() / 2-130);
    $("#background").css("left",  offsetWidth+ plotWidth / 2 - $(id).width() / 2-130 );
    // $(id).show();
}
//隐藏加载
function hide_loading() {
    var conf = Config.getInstance();
    var id = conf.Global.ajaxloadingID;
    $(id).hide();
}
//原来是放了一个矩形框在那里显示内容，现在做成六边形输入框update by fangxiao from 2016/7/1   次方法主要是为了价格标线来设置的
function writeTextOption(ctx, point, value, option) {
    if (option) {
        if (option.bg) {
           if(option.type=="price"){
                ctx.fillStyle = option.bg.fillcolor;
                ctx.fillRect(point.x+8,point.y-11,80,20);
                ctx.fill();
            }
            else{
                //画线
                //做个六边形
                ctx.strokeStyle = option.bg.color;
                //ctx.strokeRect(point.x, point.y - option.bg.height / 2, option.bg.width , option.bg.height);
                ctx.fillStyle = option.fillcolor;
                ctx.lineWidth = 0.6; //设置线宽
                var a = option.bg.width;
                var b = option.bg.width / 2 * 0.3; //左小测
                //ctx.strokeStyle=gradient;
                //console.log(point.x);
                //console.log(point.y);
                //  ctx.strokeText(value, point.x+3,point.y+2.8,option.bg.width);
                //ctx.translate(point.x+option.bg.width/2,point.y);
                ctx.moveTo(point.x, point.y);//左边第一个点
                ctx.lineTo(point.x + b, point.y + option.bg.height / 2);//左上角第一个点
                ctx.lineTo(point.x + a - b, point.y + option.bg.height / 2);
                ctx.lineTo(point.x + a, point.y);
                ctx.lineTo(point.x + a - b, point.y - option.bg.height / 2);
                ctx.lineTo(point.x + b, point.y - option.bg.height / 2);
                ctx.lineTo(point.x, point.y);
//              ctx.fillText(text, point.x, point.y);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();

//              ctx.fillRect(point.x, point.y - option.bg.height / 2, option.bg.width , option.bg.height);
//              point.y += option.bg.height / 2;
            }
        }
        if (option.unit < 1) {
            value = FormatNumber(value, -Math.floor(Math.log(option.unit) / Math.LN10));
        }
    }
    point.y += 5;
    point.x += 12;
    writeText(ctx, point, value, option.color, option.font);
}
//为了光标设置的样式
function writeTextOptionFortoollist(ctx, point, value, option) {
    ctx.strokeStyle = "#000";
    //ctx.strokeRect(point.x, point.y - option.bg.height / 2, option.bg.width , option.bg.height);
    //ctx.fillStyle = "#000";
    ctx.lineWidth = 1; //设置线宽
    var a = option.bg.width;
    var b = option.bg.width / 2 * 0.3; //左小测
    //ctx.strokeStyle=gradient;
    //console.log(point.x);
    //console.log(point.y);
    ctx.strokeText(value, point.x + 3, point.y + 2.8, option.bg.width);
    //ctx.translate(point.x+option.bg.width/2,point.y);
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(point.x + b, point.y + option.bg.height / 2);
    ctx.lineTo(point.x + a - b, point.y + option.bg.height / 2);
    ctx.lineTo(point.x + a, point.y);
    ctx.lineTo(point.x + a - b, point.y - option.bg.height / 2);
    ctx.lineTo(point.x + b, point.y - option.bg.height / 2);
    ctx.lineTo(point.x, point.y);
    //  ctx.fillText(text, point.x, point.y);
    ctx.closePath();
    ctx.stroke();
}


//start 大， end 小的情况  二分法找寻value值位置
function binsearch_r(arr, value, start, end) {
    if (typeof start === "undefined") {
        start = 0;
    }
    if (typeof end === "undefined") {
        end = arr.length - 1;
    }
    var mid;
    while (start <= end) {
        mid = parseInt((start + end) / 2);
        if (arr[mid] == value) {
            return mid;
        } else if (arr[mid] > value) {
            start = mid + 1;
        } else if (arr[mid] < value) {
            end = mid - 1;
        }
    }
    return -1;
}
//最后大于find最大的点的位置
function find_last_little_r(x, find) {
    index = find_first_big_r(x, find); //第一个最大值点位置
    if (index == -1) //没有找到
    {
        if (x[0] <= find) {
            return 0;
        } else {
            return -1;
        }
    } else {
        if (x[index] == find) { //找寻到
            return index;
        } else {
            index++;
            if (index >= x.length) return -1;
            return index;
        }
    }
}
//找到相邻的find位置
function find_near(x, find) {
    var index = find_first_big_r(x, find);
    if (index == -1) return 0;
    if (index < x.length - 1 && (x[index] - find > find - x[index + 1])) {
        index++;
    }
    return index;
}
//旋转得到的新坐标
//point是在原来坐标系内的坐标
//cta 是新坐标系旋转的角度
//ab 是新坐标系的远点，在原来坐标系中的坐标
function axis_translate(point, cta, ab) {
    var newpoint = {};
    newpoint.x = (point.x - ab.x) * Math.cos(cta) + (point.y - ab.y) * Math.sin(cta);
    newpoint.y = (ab.x - point.x) * Math.sin(cta) + (point.y - ab.y) * Math.cos(cta);
    return newpoint;
}
//获取flash版本
function get_flash_version() {
    var UNDEF = "undefined",
        OBJECT = "object",
        SHOCKWAVE_FLASH = "Shockwave Flash",
        SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
        FLASH_MIME_TYPE = "application/x-shockwave-flash",
        EXPRESS_INSTALL_ID = "SWFObjectExprInst";
    var playerVersion = [0, 0, 0];
    var d = null;
    if (typeof navigator.plugins != UNDEF && typeof navigator.plugins[SHOCKWAVE_FLASH] == OBJECT) {
        d = navigator.plugins[SHOCKWAVE_FLASH].description;
        if (d && !(typeof navigator.mimeTypes != UNDEF && navigator.mimeTypes[FLASH_MIME_TYPE] && !navigator.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
            plugin = true;
            d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
            playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
            playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
            playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
        }
    } else if (typeof window.ActiveXObject != UNDEF) {
        try {
            var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
            if (a) { // a will return null when ActiveX is disabled
                d = a.GetVariable("$version");
                if (d) {
                    ie = true; // cascaded feature detection for Internet Explorer
                    d = d.split(" ")[1].split(",");
                    playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                }
            }
        } catch (e) {
            return playerVersion;
        }
    }
    return playerVersion;
}
//是否支持websocket
function support_websocket() {
    var version = get_flash_version();
    if (version[0] >= 9) {
        return true;
    }
    if (window.WebSocket) {
        return true;
    }
    return false;
}
/*未使用
function init_websocket()
{
    if (window.WebSocket) {
        return true;
    }
    if (get_flash_version()[0] >= 9)
    {
        include(__baseurl__ + "js/swfobject.js");
        include(__baseurl__ + "js/web_socket.js");
        return true;
    }
    return false;
}*/
//设置宽度
function set_width(obj, w) {
    if (typeof obj.get == "function" && obj.get(0)) {
        obj.get(0).width = w;
        obj.width(w);
    } else {
        obj.width = w;
    }
}
//设置高度
function set_height(obj, h) {
    // if(h>1){
    //    if(obj.attr('id')=="plot_canvas_00"||obj.attr('id')=="plot_canvas_01"||obj.attr('id')=="plot_canvas_02"){
    //         h=h-60;
    //     } 
    // }
    
    if (typeof obj.get == "function" && obj.get(0)) {
        obj.get(0).height = h;
        obj.height(h);
    } else {
        obj.height = h;
    }
}
/*未使用
function __indicator__name__change(obj)
{
    indicator.load(indicator.tab, $(obj).val());
}*/
//从search位置开始
function start_with(search, obj) {
    return obj.indexOf(search) == 0
}
//HTML5StockChartAPI函数
function HTML5StockChartAPI(id) {
    this.isinit = false;
    this.id = id;
    this.tplParams = {};
    this.container = $("#" + this.id);
    // this.container.html( __tpl__base__ + __tpl__indwin__);
    this.config = Config.getInstance();

    //console.log(DataReaderTrendLine.getYminmax()); 
    this.option = {
        debug: __debug__,
        jsdebug: __javascript_debug__,
        datasource: __datasource__,
        datafile: __datafile__,
        pair: __symbol__list__,
        runtime_load: __runtime_load__,
        staticChat: __static__,
        startTime: __start_time__,
        "toolbar.isenable": false,
        plot_area: $("#plot_container"),
        ind: [this.config.mainName]
    };
    if (!this.read('model')) this.write("model", "active");
    var _this = this;
    if (window["FlashCanvas"]) {
        FlashCanvas.ready = function() {
            FlashCanvas.init();
            _this.init();
        }
    } else {
        $(document).ready(function() {
            _this.init();
        });
    }
}

HTML5StockChartAPI.prototype.setTPLParams = function(key, val) {
    this.tplParams[key] = val;
}

HTML5StockChartAPI.prototype.init = function() {
    if (this.isinit) {
        return;
    }
    this.isinit = true;
    
    this.controller = new Controller(this);
    if (!is_undefined(this.option["controller.staticChat"])) {
        this.controller.staticChat = this.option["controller.staticChat"];
    }
    //为了兼容以前的版本，添加了这个全局变量
    /*this.indicator = indicator = new WinAjax("indicator.add", "指标管理", 700, 500,this);
    this.indicator.createWindow("__indicator__");

    this.order = order = new WinAjax("order.order","订单",320,240,this);
    this.order.createWindow("__order__");*/
    //////////////////////////
    if (this.c && this.p) {
        this.setPair(this.c, this.p);
    }

}

HTML5StockChartAPI.prototype.destroyed=function(){
     this.isinit = false;
      this.controller.deinit();
      this.controller = null;
}

HTML5StockChartAPI.prototype.setStaticChart = function(isstatic) {
    //alert(typeof isstatic === "undefined");
    var p = (typeof isstatic === "undefined") ? true : isstatic;
    if (this.isinit) {
        this.controller.staticChat = p;
    } else {
        this.set("controller.staticChat", p);
    }

}

HTML5StockChartAPI.prototype.setSymbolList = function(pair) {
    return this.set("pair", pair);
}

HTML5StockChartAPI.prototype.setIndicatorConf = function(indicator) {
    if (typeof indicator !== "string") {
        indicator = indicator.join(":");
    }
    indicator = indicator.toLowerCase();
    this.write("ind", indicator);
    this.set("ind", indicator);
    // this.isinit=false;
    if (this.isinit) {
        window.location.reload();
        // this.isinit = false;
        // this.controller.deinit();
        // this.controller = null;
        // this.isinit = false;
        // this.init();
    }
}

HTML5StockChartAPI.prototype.initSignal = function() {
    var signal_id = this.read("signal");
    //固定一个策略
    if (signal_id < 4) {
        signal_id = 5;
    }
    if (signal_id) {
        this.config.Global.signal = signal_id;
    } else {
        signal_id = this.config.Global.signal;
    }
    return signal_id;
}

HTML5StockChartAPI.prototype.setModel = function(model) {
    this.write("model", model);
    this.config.Global.app_model = model;
    if (this.isinit) {
        window.location.href = "";
    }
}

HTML5StockChartAPI.prototype.setSignal = function(signal_id) {
    this.write("signal", signal_id);
    this.config.Global.signal = signal_id;
    if (this.isinit) {
        window.location.href = "";
    }
}

HTML5StockChartAPI.prototype.set = function(name, value) {
    this.option[name] = value;
    return this;
}

HTML5StockChartAPI.prototype.setPair = function(c, p) {
    this.c = c;
    this.p = p;
    if (!this.isinit) {
        return;
    }
    this.write("symbol", c);
    $.cookie("symbol",c);
    $.cookie("period",p)
    // sessionStorage.setItem('period',p);
    this.write("period", p);
    
    this.controller.set(this.c, this.p);
    if (typeof this.option["paircb"] === "function") {
        this.option["paircb"](this.c, this.p);
    }
    // console.log(DataReaderbdensity.prototype.getYminmax());
}

HTML5StockChartAPI.prototype.toolbarEnable = function() {
    this.set("toolbar.isenable", true);
    if (!this.isinit) {
        return;
    }
    this.controller.toolbar.enable();

}

HTML5StockChartAPI.prototype.toolbarDisable = function() {
    this.set("toolbar.isenable", false);
    $("#toolbar").hide();
    if (!this.isinit) {
        return;
    }
    this.controller.toolbar.disable();
}

HTML5StockChartAPI.prototype.read = function(name) {
    return FzmCookie.read(name);
}

HTML5StockChartAPI.prototype.write = function(name, data) {
    if (typeof data === "string") {
        return FzmCookie.write(name, data, 10000);
    }
    console.error("cookie write error");
    return false;
}

HTML5StockChartAPI.prototype.initInd = function(def) {
    var name = this.read("ind");
    if (!name) {
        name = def;
    }
    this.setInd(name);
}

HTML5StockChartAPI.prototype.setConfig = function(key, val) {
    return this.config.set(key, val);
}

HTML5StockChartAPI.prototype.setInd = function(name) {
    if (name == "tick_price" || name.indexOf("tick_source") === 0) {
        this.p = "TICK";
    } else {
        if (this.p == "TICK") {
            this.p = "H1";
             $.cookie('period','H1');
            // sessionStorage.setItem('period','H1');
        }
    }
    this.setIndicatorConf(name);
}

HTML5StockChartAPI.prototype.clearCookie = function() {
    this.write("period", "");
    $.cookie('period','H1');
    this.write("ind", "");
}

HTML5StockChartAPI.prototype.initPair = function(c, p, ignore) {
    var symbol = this.read("symbol");
    symbol = symbol ? symbol : c;
    var period = this.read("period");
    period = period ? period : p;
    if (period == ignore) {
        period = "H1";
        $.cookie('period','H1');
    }
    this.setPair(symbol, period);
}


//坐标轴的设计按照通用配置的形式来设计。
//
//输入: 
//
//1. POINT(SCALE):  描点形式：需要，model读出的数据.
//2. EXTEND(NOMAL): 扩展的方式，需要指定扩展对应的数据。
//3. MIAN:  需要提供主图的数据
//4. SCALE: 按照比例进行，这个需要提供的是最大值，最小值
//
//坐标值的密集阵值：一般指定多小像素内一个坐标，然后根据高度计算大概需要多少个坐标。
//但是这个值不是精确的，而是有弹性的，为了计算一个最佳的坐标值。
//
//设计流程：
//
//首先是：[point 还是 scale]
//
//如果是scale 给出最大值，最小值 就可以进行计算了。调用 Axis_Scale
//
//如果是point: 那么闲判断主图有没有计算，如果没有计算，那么先计算主图。
//
//计算主图的过程是这样的：闲判断是否需要 扩展，如果需要扩展，那么
//按照主图数据，进行扩展。这个时候，要知道主图是 p是多少。这样就可以扩展了。
//
//Axis_ExtendByMain
//Axis_ExtendByTime
//
//主图扩展完成后(注意，这里要把Y的数据进行扩展，所以，要计算X的坐标，再计算Y的坐标)，
//那就计算扩展后主图的坐标。扩展完成后调用 Axis_Point, 进行描点处理。
//
//对于副图。
//如果配置不是按照主图进行绘制的，那么直接报错。暂时不支持这样的情况。
//
//如果是按照主图进行扩展，那么
//调用 Axis_ExtendByMain 扩展。
//
//最后调用 Axis_PointBYMain 获取坐标数据。
//
//
//main 是主图坐标，因为附图可能和主图相关，所以要加这个值。
//对于主图的坐标系，这个main值是null
function Axis(main) {
    this.main = main;
    this.config = Config.getInstance();
}

Axis.POINT = 1;
Axis.MAIN = 1 << 1;
Axis.TIME = 1 << 2;
Axis.BIG2SMALL = 1 << 3;
Axis.BIG2BIG = 1 << 4;
Axis.SCALE = 1 << 5;
Axis.CUSTOM = 1 << 6;
Axis.CUSTOM_DATA = 1 << 7;

Axis.prototype.setViewConfig = function(viewconfig) {
    if (viewconfig) this.viewconfig = viewconfig;
}

Axis.prototype.setData = function(data) {
    if (data) {
        this.data = data;
        this.c = data.c;
        this.p = data.p;
        $.cookie('period',data.p);
    }
}

Axis.prototype.clearData = function() {
    this.data = null;
    this.viewconfig = null;
}

Axis.prototype.getData = function() {
    this.calc();
    var ret = { data: this.data, axis: this.viewconfig };
    return ret;
}

Axis.prototype.calc = function() {
    //viewconfig 按canvas的ID进行组织，主图默认在序号为 0 的配置里面
    //按照数据,现在刚刚传入的数据，每个图还是有关系的.我们要分离这样的关系。
    //
    //1. 读取每个 指标 计算坐标的标准配置
    //2. 获取最大最小指。
    //
    //计算主图
    var maxY = -Infinity;
    var maxX = -Infinity;
    var minX = Infinity;
    var minY = Infinity;
    for (var j = 0; j < this.viewconfig.plot.length; j++) {
        var name = this.viewconfig.plot[j];
        //判断是否参与计算
        var vc = this.config.Global.View[name];
        if (name != this.config.mainName && typeof vc["disable_axis_area"] !== 'undefined' && vc["disable_axis_area"]) {
            continue;
        }
        if (this.data[name].maxX > maxX) maxX = this.data[name].maxX;
        if (this.data[name].minX < minX) minX = this.data[name].minX;
        if (this.data[name].maxY > maxY) maxY = this.data[name].maxY;
        if (this.data[name].minY < minY) minY = this.data[name].minY;
    }
    this.viewconfig.x.max = maxX;
    this.viewconfig.x.min = minX;
    this.viewconfig.y.max = maxY;
    this.viewconfig.y.min = minY;
    if (this.main == null) {
        this.calcMain();
        this.main = this;
    }
    for (j = 0; j < this.viewconfig.plot.length; j++) {
        name = this.viewconfig.plot[j];
        if (name == this.config.mainName) continue;
        this.calcOne(name);
    }
}

Axis.prototype.calcOne = function(name) {
    this.getAxis(name, "x");
    this.getAxis(name, "y");
}

Axis.prototype.calcMain = function() {
    //下面的数据时扩展过的数据，这样。
    this.getAxisMainX();
    this.getAxis(this.config.mainName, "y");
}

Axis.prototype.getAxis = function(name, tag) {
    //tag 标记是 x 轴还是 y轴，取数据的时候用的到。
    var data = this.data[name][tag];
    if (!data || data.length == 0) return;
    var plot = this.viewconfig[tag]; //在tag下面的配置
    var axisconfig = this.config.Global.Axis[name][tag];
    var unit = this.data[name][tag + "unit"];

    if (axisconfig & Axis.POINT) {
        if (plot.axis) debug("plot axis has set.");
        var data = this.pointAxisValue(data, plot.beg, plot.end, this.viewconfig.one, plot.n, axisconfig);
        plot.axis = data.axis;
        plot.axis_option = {};
        plot.axis_option.style = axisconfig;
        plot.axis_option.unit = unit;

        this.viewconfig[tag] = plot;
        this.data[name][tag] = data.data;
        //描点,计算坐标轴的值
    } else if (axisconfig & Axis.MAIN) {
        //通过主图计算
        this.pointByMain(name); //这个不需要什么配置了
        //不需要生成什么坐标的信息，坐标在主图中生成。
    } else if (axisconfig & Axis.SCALE) {
        //通过比例进行计算,每个都要生成坐标的信息。
        if (!plot.axis) {
            //计算坐标轴的值[比例计算的坐标轴]
            var scalevalue = this.getScaleValue(plot.min, plot.max, unit, plot.n, axisconfig);
            var data = this.scaleAxisValue(data, scalevalue, plot.beg, plot.end, axisconfig);
            plot.axis = data.axis;
            plot.axis_option = {};
            plot.axis_option.style = axisconfig;
            plot.axis_option.unit = unit;
            this.viewconfig[tag] = plot;
            this.data[name][tag] = data.data;
        } else {
            if (axisconfig & Axis.CUSTOM) {
                this.data[name][tag] = this.customTranslate(name, data, plot.axis);
            } else {
                this.data[name][tag] = this.lineTranslate(data, plot.axis);
            }
        }
    }
    if (axisconfig & Axis.CUSTOM_DATA) {
        if (this.viewconfig.x.axis && this.viewconfig.y.axis) {
            for (var type in this.data[name].data) {
                this.data[name].data[type].x = this.lineTranslate(this.data[name].data[type].x, this.viewconfig.x.axis);
                this.data[name].data[type].y = this.lineTranslate(this.data[name].data[type].y, this.viewconfig.y.axis);
            }
        }
    }
}

Axis.prototype.customTranslate = function(name, data, axis) {
    var param = this.lineGetAxisParam(axis);
    if (!param) {
        return data;
    }
    var a = param[0];
    var b = param[1];
    if (name == "profit" || start_with("profit|", name)) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                data[i][j][1] = a * data[i][j][1] + b;
            }
        }
        return data;
    } else if (name == "kshapetest" || start_with("kshapetest|", name)) {
        for (var i = 0; i < data.length; i++) {
            data[i][0] = a * data[i][0] + b;
        }
        return data;
    } else if (name == "fractals" || start_with("fractals|", name) || name == "advfractals" || start_with("advfractals|", name)) {
        for (var i = 0; i < data.length; i++) {
            data[i][1] = a * data[i][1] + b;
        }
        return data;
    } else if (name == "bolling_desity") {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j += 2) {
                if (data[i][j] == -1) {
                    continue;
                }
                data[i][j] = a * data[i][j] + b;
            }
        }
        return data;
    }
    if (name == "wdesity") {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                if (data[i][j] == 0) {
                    data[i][j] = 0;
                    continue;
                }
                data[i][j] = a * data[i][j] + b;
            }
        }
        return data;
    } else if (name == "trend_line") {
        //计算曲线的斜率
        var axis = this.viewconfig.y.axis;
        dy = -(axis[0].key - axis[1].key) / (axis[0].value - axis[1].value);
        dx = this.viewconfig.one;
        var group = {};
        for (i = 0; i < data.length; i++) {
            var g = data[i][4];
            if (g > 0) {
                if (typeof group[g] === "undefined") {
                    group[g] = 0;
                } else {
                    group[g] += 0;
                }
            } else {
                group[g] = 0;
            }
            //斜率
            data[i][1] = dy * (data[i][1] - data[i][0]) / dx
                //位置
            data[i][0] = a * data[i][0] + b + group[g];
            data[i][7] = a * data[i][7] + b + group[g];
            data[i][6] = this.main.axisMap[data[i][6]];
        }
        return data;
    }
}

//beg 是坐标的开始值,这里的data必须是一维数组。
Axis.prototype.pointAxisValue = function(data, beg, end, one, n, axisconfig) {
    var index = 0;
    var j = 0;

    var data_axis = [];
    var axis = [];

    var total_pixel = beg - end;
    var plot_number = Math.ceil(total_pixel / one);
    if (n > plot_number) {
        var mod = 1;
    } else {
        var mod = Math.round(plot_number / n);
    }
    //这里还有的一个问题是：大坐标表示小数据，还是大坐标，表示大数据，默认是大坐标表示大数据
    if (axisconfig & Axis.BIG2SMALL) { //小的排在前面
        if (data.length > 1 && data[data.length - 1] < data[0]) data = data.reverse();
    }
    for (var i = 0; i < data.length; i++) {
        data_axis[i] = beg;
        if (i % mod == 0) {
            axis[j] = { key: beg, value: data[i] };
            j++;
        }
        beg -= one;
    }
    var ret = { data: data_axis, axis: axis };
    return ret;
}

Axis.prototype.scaleAxisValue = function(data, scalevalue, beg, end, axisconfig) {
    var data_axis = [];
    var axis = [];
    if (!scalevalue) {
        debug("error scalevalue.");
        return { data: [], axis: [] };
    }
    var n = scalevalue.length;
    //坐标大小问题，1. 大的坐标表示小的数字，2. 小的坐标表示大的数字
    if (axisconfig & Axis.BIG2SMALL) { //小的排在前面
        if (n > 1 && scalevalue[n - 1] < scalevalue[0]) {
            scalevalue = scalevalue.reverse();
        }
    } else { //Axis.BIG2BIG
        if (n > 1 && scalevalue[n - 1] > scalevalue[0]) {
            scalevalue = scalevalue.reverse();
        }
    }
    var one = Math.floor((beg - end) / (n - 1));
    var index = 0;
    while (beg >= end && index < n) {
        axis.push({ key: beg, value: scalevalue[index++] });
        beg -= one;
    }
    //下面开始转换数据,这里的data可以是一维，也可以是二维
    data = this.lineTranslate(data, axis);
    var ret = { data: data, axis: axis };
    return ret;
}

Axis.prototype.getXValue = function(x, mode, axis) {
    /*if (!axis) axis = this;
    var _axis = axis.viewconfig.x.axis; //从小到大排列
    
    */
    //查找x的值
    var current = null;
    var offset = null;
    var min = Infinity;
    for (var time in this.main.axisMap) {
        var pos = this.main.axisMap[time];
        if (typeof pos == "number") {
            offset = Math.abs(pos - x);
            if (offset < min) {
                min = offset;
                current = time;
            }
        }
    }
    return parseInt(current);
    //return this.getValue(x, _axis, mode);
}

Axis.prototype.getValue = function(key, axis, mode) {
    if (typeof axis === "undefined") return false;
    var index = this.findNear(axis, key);
    if (mode == PlotGrid.NEAR) {
        return axis[index].value;
    } else if (mode == PlotGrid.INTERPOLATION) {
        return this.getInterpolation(key, index, axis);
    }
    return false;
}

Axis.prototype.getInterpolation = function(find, index, axis) {
    //寻找两个差值点：
    var newaxis = [];
    var start, end;
    if (axis.length <= 1) {
        return axis[index].value;
    }
    if (index == 0) {
        start = 0;
        end = 1;
    } else if (index == axis.length - 1) {
        start = axis.length - 2;
        end = axis.length - 1;
    } else {
        if (axis[index].key > find) {
            start = index;
            end = index + 1;
        } else {
            start = index - 1;
            end = index;
        }
    }
    newaxis.push({ key: axis[start].value, value: axis[start].key });
    newaxis.push({ key: axis[end].value, value: axis[end].key });
    return this.lineTranslate(find, newaxis, true);
}

Axis.prototype.findNear = function(axis, find) {
    for (var i = 0; i < axis.length; i++) {
        if (axis[i].key < find) { // find 在 i 和 i - 1 之间
            if (i == 0) return 0;
            if (find - axis[i].key < axis[i - 1].key - find) {
                return i;
            } else {
                return i - 1;
            }
        }
    }
    return axis.length - 1;
}

Axis.prototype.getYValue = function(y, mode, axis) {
    if (!axis) axis = this;
    var _axis = axis.viewconfig.y.axis; //从小到大排列
    return this.getValue(y, _axis, mode);
}

Axis.prototype.getX = function(data) {
    return this.lineTranslate(data, this.viewconfig.x.axis);
}

Axis.prototype.getY = function(data) {
    return this.lineTranslate(data, this.viewconfig.y.axis);
}

Axis.prototype.lineTranslate = function(data, axis, noround) {
    if (axis.length == 0) return data;
    if (axis.length == 1) {
        var a = 0;
        var b = axis[0].key;
    } else {
        var a = (axis[0].key - axis[axis.length - 1].key) / (axis[0].value - axis[axis.length - 1].value);
        var b = axis[0].key - a * axis[0].value;
    }
    var is1d = is_array(data);
    var is2d = is_array(data[0]);
    if (is1d) {
        for (var i = 0; i < data.length; i++) {
            if (is2d) {
                for (var j = 0; j < data[i].length; j++) {
                    data[i][j] = Math.round(a * data[i][j] + b);
                }
            } else {
                data[i] = Math.round(a * data[i] + b);
            }
        }
    } else {
        if (noround) {
            data = a * data + b;
        } else {
            data = Math.round(a * data + b);
        }
    }
    return data;
}

Axis.prototype.lineGetAxisParam = function(axis) {
    if (axis.length == 0) return false;
    if (axis.length == 1) {
        var a = 0;
        var b = axis[0].key;
    } else {
        var a = (axis[0].key - axis[axis.length - 1].key) / (axis[0].value - axis[axis.length - 1].value);
        var b = axis[0].key - a * axis[0].value;
    }
    return [a, b];
}

Axis.prototype.getScaleValue = function(start, end, unit, n, axis_style) {

    //浮动：这个n是建议的数目
    var number = Math.ceil((end - start) / unit) / n;
    if (number <= 0) {
        if (start == end) {
            var vals = [start];
            return this.standarAxisValue(vals, start, end, axis_style);
        }
        return null;
    }
    var closest;
    if (number <= 1) {
        closest = unit;
    } else {
        var low = Math.pow(10, Math.floor(Math.log(number) / Math.LN10));
        var high = low * 10;
        var i = 0;
        if (low >= 10) {
            if (axis_style & Axis.TIME) {
                var lookup = [1, 1.5, 2, 3.0, 4.5, 6.0, 10];
            } else {
                var lookup = [1, 1.5, 2, 2.5, 4, 5, 8, 10];
            }
            for (i = 0; i < lookup.length; i++) {
                lookup[i] *= low;
            }
        } else {
            if (axis_style & Axis.TIME) {
                var lookup = [1, 2, 3, 4, 6, 10];
            } else {
                var lookup = [1, 2, 4, 5, 8, 10];
            }
        }
        var min_value = Number.MAX_VALUE;
        var min_index = 0;
        for (i = 0; i < lookup.length; i++) {
            var tmp = Math.abs(lookup[i] - number);
            if (min_value > tmp) {
                min_value = tmp;
                min_index = i;
            }
        }
        var closest = unit * lookup[min_index];
    }
    var minindex = Math.floor(start / closest);
    var maxindex = Math.ceil(end / closest);
    vals = [];
    for (var j = minindex; j <= maxindex; j++) {
        vals.push(j * closest);
    }
    return this.standarAxisValue(vals, start, end, axis_style);
}

Axis.prototype.standarAxisValue = function(axis, beg, end, axis_style) {
    var abeg = axis[0];
    var aend = axis[axis.length - 1];
    var delta = 0;
    if (axis_style & Axis.FIX_BEG) {
        delta = abeg - beg;
    } else if (axis_style & Axis.FIX_END) {
        delta = aend - end;
    }
    for (var i = 0; i < axis.length; i++) {
        axis[i] -= delta;
    }
    //下面开始计算坐标的值
    return axis;
}

Axis.prototype.getAxisMainX = function() {
    //计算之前复制一份:
    var x = this.data[this.config.mainName].x;
    this.getAxis(this.config.mainName, "x");
    //这个是X轴坐标的映射，其他的坐标要靠这个来计算。
    this.axisMap = {};
    for (var i = 0; i < x.length; i++) {
        this.axisMap[x[i]] = this.data[this.config.mainName].x[i];
    }
    //这样时间和坐标成了一一对应
}

Axis.prototype.pointByMain = function(name) {
    //这里主要去除一些毛刺数据，所以统一又处理了一次。
    //这个部分，以后如果要调节性能，还要进行修改。
    var x = [];
    var y = [];
    var index = 0;
    var data = this.data[name];
    for (var i = 0; i < data.x.length; i++) {
        var item = this.main.axisMap[data.x[i]];
        if (item) {
            //查找到坐标，那么就采用这个坐标
            x[index] = item;
            y[index] = data.y[i];
            index++;
        } else {
            if (typeof item === "undefined") {
                continue;
            } else {
                x[index] = item;
                y[index] = data.y[i];
                index++;
            }
        }
    }
    this.data[name].x = x;
    this.data[name].y = y;
}

//配置画图的属性
//1. 类映射
//绘制图形的时候，是根据绘图的名称，来绘制的。
//main 是主图，这个是固定的名字。
//其他的是指标图，用各自的名字。每个画图对象通过两个方面来控制。

//1. 是数据读取部分，我们把缓存在内存的数据看成是一个数据库，这个读取
//虽然是千篇一律，但是还是有规律可循。
//
//2. 是数据的显示控制，我们会根据plotset的情况，最后转换成坐标的值。通过
//这个坐标的值，来绘制不同的图形。
//
//3. 还有一个对象控制数据保存的过程。比如，数据下载怎么处理，
//   下载后怎么保存，新数据怎么处理，新数据怎么保存等问题。
//   处理读写数据的模块应该是要和 数据更新模块分离的。
//
//update by fangxiao from 2016/6/29 17:17
function Config() {
    //浏览器测试
    this.getBrowserInfo();
    this.name = "Config";
    this.mainName = "main";
    this.main = { reader: DataReaderCandle, writer: DataWriterCandle, plot: PlotCandle, data: DataReader.EXTEND, downdata: 1, newdata: 1 };
    //扩展数据。必须有扩展的接口。否则会直接忽略这个选项。
    //通过主图读取数据，主图会传入一个时间范围，然后通过函数读取数据，通过主图扩展数据
    this.volumes = { reader: DataReadervolumes, writer: DataWriter, plot: Plotvolumes };
    this.volumes2 = { reader: DataReadervolumes2, writer: DataWriter, plot: Plotvolumes2 };
   // console.log(""+DataReadervolumes.getYminmax);
    this.ma = { reader: DataReaderIndicatorsMa, writer: null, plot: PlotLine };
    this.macd = { reader: DataReaderIndicatorsMacd, writer: null, plot: PlotMacd };
    this.bolling = { reader: DataReaderIndicatorsBolling, writer: null, plot: PlotBolling };
    this.kdj = { reader: DataReaderIndicatorsKDJ, writer: null, plot: PlotBolling };
    //this.order = {reader:DataReaderIndicatorsOrder,write:null,plot:PlotOrder};
    this.Global = {};
    //这个DataWriter 的基类处理通用的读写。
    this.Global.downloadCount = 600;
    this.Global.maxStoreChunk = 20; // store max = 5 * this.Global.downloadCount 
    this.Global.lowMark = 300;
    this.Global.Interval = 20;
    this.Global.newDisable = false;
    this.Global.boxwidth = 1;
    this.Global.trend_line_selected = [];
    this.Global.xunit = {
        //  YMD:1440,
        //S5:1/12,
        M1: 1,
        M2: 2,
        M3: 3,
        M3: 4,
        M5: 5,
        M15: 15,
        M30: 30,
        H1: 60,
        H2: 120,
        H4: 240,
        D1: 1440,
        W1: 10080,
        MN1: 4320
    };
    this.Global.styleName = { "hx": "中国经典", "mt": "MT4" };
    //时间选择坐标的时间格式
    this.Global.timeformat = {
        YMD: "Y-m-d",
        TICK: "i:s.u",
        //S5:"m-d H:i:s",
        M1: "m-d H:i",
        M2: "m-d H:i",
        M3: "m-d H:i",
        M5: "m-d H:i",
        M15: "m-d H:i",
        M30: "m-d H:i",
        H1: "m-d H:i",
        H2: "m-d H:i",
        H4: "m-d H:i",
        D1: "m-d",
        W1: "m-d",
        MN1: "m-d"
    };
    this.Global.ajaxloadingID = "#loading";
    this.Global.yunit = {};
    this.Global.yunit.default_value = 0.00001;
    this.Global.maxstep = 1 * 3600; //最大没有数据的时间
    this.Global.maxCanvasCount = 8;
    this.Global.forcePoll = true;
    if (!this.Global.forcePoll && support_websocket()) {
        this.Global.modelName = ModelShortWS;
        this.Global.WSHost = __broadcast_server_active__;
        this.Global.WSPort = "2003";
        this.Global.pingTime = 5; //如果5s没有数据，就ping一下
        this.Global.maxNOData = 10; //如果10s内都没有数据， 那么就close掉。//最好是ping time 的整数倍。也就是 10s 以上
    } else {
        this.Global.modelName = ModelShortPoll;
    }
    if (FzmCookie.read('model') == 'passive_mode') {
        this.Global.modelName = ModelNode;
    }
    this.Global.viewName = View;
    this.Global.canvasID = "#plot_area";
    this.Global.canvasIDPerfix = "plot_canvas_";
    this.Global.PollInterval = 3000; //30ms 判断一次
    this.Global.maxConnectAliveTime = 12; //轮询的链接最多存活的时间
    this.Global.DataAPIDB ="https://kdata.fxee.com/kdata?datafile=" + __datafile__;
    if (__dbreset__) {
        this.Global.DataAPIDB += "&dbreset=" + __dbreset__
    }
    this.Global.DataAPIUpload = "static.php?datafile=" + __datafile__;
    if (__dbreset__) {
        this.Global.DataAPIUpload += "&dbreset=" + __dbreset__
    }
    if (__datasource__ == "db") {
        this.Global.DataAPI = this.Global.DataAPIDB; //一定要加上这个callbac=?否则json无法调用
    } else if (__datasource__ == "upload") {
        this.Global.DataAPI = this.Global.DataAPIUpload; //一定要加上这个callbac=?否则json无法调用
    }
    if (__refererhost__ != __apihost__) {
        this.Global.PollMode = "jsonp";
    } else {
        this.Global.PollMode = "json";
    }
    if (this.Global.PollMode == "jsonp") {
        /* $.ajaxSetup({ 
           //'jsonp' : false,
           'jsonpCallback': "_jsonp_"
        });
        */
    }
    //view 模块相关的配置
    this.Global.View = {
        main: { NXPixel: 100, NYPixel: 50, sep: 0 },
        sin: { NXPixel: 100, NYPixel: 50, sep: 0 },
        cos: { NXPixel: 100, NYPixel: 50, sep: 0 },
        tick_source: { NXPixel: 100, NYPixel: 50, sep: 0 },
        profit_line: { NXPixel: 100, NYPixel: 50, sep: 0 },
        volumes: { sep: 1, height: 0.2 },
        volumes2: { sep: 1, height: 0.2 },
        ma: { sep: 0, height: 0.5 },
        //order:{sep:0,height:0.5},
        macd: { sep: 1, height: 0.2 },
        bolling: { sep: 0, height: 0.5 },
        kdj: { sep: 1, height: 0.2 },
    };

    this.Global.TPL = {
        signal: 'main:profit',
        mac2: 'main:volumes:volumes2:ma|main|10|color=red:ma|main|20|color=green:ma|main|50|color=yellow:ma|main|100|color=white:macd|main|12,26,9|color=white-lime:kdj|main|9|color=Red-blue-green:',
        mac: "main:volumes",
        bty: "main:volumes",
        eth: "main:volumes",
        ma: 'ma|main|10|color=red:ma|main|20|color=green:ma|main|50|color=yellow:ma|main|100|color=white:',
        volumes:'volumes:',
        macd: 'macd|main|12,26,9|color=white-lime:',
        bolling: 'bolling|main|20,2|color=green-green-green:',
        kdj: 'kdj|main|9|color=Red-blue-green:',
        ssi: "main:easyforex:fxtrade:" +
            "ma|main|10|color=red:" +
            "ma|easyforex|10|color=red:" +
            "ma|fxtrade|10|color=red:" +
            "ma|main|50|color=yellow:" +
            "ma|easyforex|50|color=yellow:" +
            "ma|fxtrade|50|color=yellow:" +
            "ma|main|100:" +
            "ma|easyforex|100:" +
            "ma|fxtrade|100:" +
            "matrend|main|10,20,30,50|color=red:" +
            "<matrend|main|50,80,120,180|color=yellow:" +
            "matrend|easyforex|10,20,30,50|color=red:" +
            "<matrend|easyforex|50,80,120,180|color=yellow:" +
            "matrend|fxtrade|10,20,30,50|color=red:" +
            "<matrend|fxtrade|50,80,120,180|color=yellow:" +
            "rsi|easyforex,main|14:" +
            "rsi|fxtrade,main|14",
        bolling_desity: "main:bolling_desity:profit",
        sin_cos: "sin||-10,10,1000|color=red:cos||-10,10,1000|color=green",
        profit: "profit_line||{ajax_path}|color=red",
        tick_price: "tick_source||bid-ask/20/1,fxdd,exness,fxcm|fxdd_color=green,fxpro_color=red,exness_color=blue,fxcm_color=yellow,fxdd_flag=true"
    };

    this.Global.arrow = {};
    this.Global.arrow[DataWriterProfit.BUY_OPEN] = {
        height: 15,
        width: 1,
        boder: "white",
        fill: "red",
        cta: (5 * Math.PI / 4),
        incta: (5 * Math.PI / 4)
    };
    this.Global.arrow[DataWriterProfit.BUY_CLOSE] = {
        height: 15,
        width: 1,
        boder: "pink",
        fill: "pink",
        cta: (Math.PI / 4),
        incta: (Math.PI / 4)
    };
    this.Global.arrow[DataWriterProfit.SELL_OPEN] = {
        height: 15,
        width: 1,
        boder: "aqua",
        fill: "aqua",
        cta: Math.PI * 7 / 4,
        incta: Math.PI * 3 / 4
    };
    this.Global.arrow[DataWriterProfit.SELL_CLOSE] = {
        height: 15,
        width: 1,
        boder: "yellow",
        fill: "yellow",
        cta: Math.PI * 3 / 4,
        incta: Math.PI * 7 / 4
    };
    this.Global.autoScroll = false;
    this.Global.signal = 3; //default signal id
    this.Global.WinTplID = "#__wintplid__";
    //this.Global.WinOrderTplID= "#__winordertplid__";
    this.Global.WinAPI = "http://" + __apihost__ + "/window.php";
    //this.Global.WinOrder = "http://" + __orderhost__+"/order";

    //alert(__apihost__);
    this.Global.Win = {};
    this.Global.Win.__indicator__ = {
        tab: {
            add: "添加指标",
            manage: "管理指标"
        }
    };

    /*this.Global.Win.__order__ ={
        tab:{
            order:"下单"
        }
    };*/
    this.Global.style = "hx";
    this.Global.Model = {};
    this.Global.timezone = 8;
    this.Global.overPadding = 3;
    this.Global.hoverTime = 400;
    //坐标轴相关的配置
    //对于坐标轴，有下面的配置模式：
    //1. 按照比例显示绘制数据。比如Y轴上的数据，为了对比，一般采用这样的方式。
    //2.
    //按照点进行排列。从我们外汇的图表来说，还可以把数据扩充成线性连续的模式。
    //K线图往往会缺乏数据。但是，有些时候，为了对比，或者绘制图形方便，扩充成连续的模式是非常的有必要的。
    //但是，扩充的时候要非常的注意非交易日的判断。一般来说，非交易日的没有数据的时间一般大于12个小时，而这
    //在交易日的情况下，基本不可能出现，所以，补充数据可以简单的判断没有数据的时间是否超过12个小时。
    //
    //3.
    //主图可以按照连续的方式扩充。附图的扩充方式增加了一种新的方式，那就是按照主图进行扩充。
    //
    //这些主要在搜索坐标数据的时候非常有用。
    //
    //
    this.Global.Axis = {
        main: { x: Axis.POINT | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL }, //扩展，也可以是 AXIS_NOMAL ,
        sin: { x: Axis.SCALE, y: Axis.SCALE | Axis.BIG2SMALL },
        cos: { x: Axis.SCALE, y: Axis.SCALE | Axis.BIG2SMALL },
        tick_source: { x: Axis.SCALE | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL | Axis.CUSTOM_DATA },
        profit_line: { x: Axis.POINT | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL },
        ma: { x: Axis.MAIN | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL },
        macd: { x: Axis.MAIN | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL },
        bolling: { x: Axis.MAIN | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL },
        kdj: { x: Axis.MAIN | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL },
        volumes: { x: Axis.MAIN | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL },
        volumes2: { x: Axis.MAIN | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL },
        //并采用描点法。也就是不按照比例进行计算坐标
        easyforex: { x: Axis.MAIN | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL }, //扩展，以主图的形式。着就是说，
        //主图没有的点，这个也进行扩展。
        //order:{x:Axis.MAIN | Axis.TIME, y:Axis.SCALE | Axis.BIG2SMALL| Axis.CUSTOM},
        profit: { x: Axis.MAIN | Axis.TIME, y: Axis.SCALE | Axis.BIG2SMALL | Axis.CUSTOM }
    };

    //default grid config
    this.Global.Grid = {
        //全局私有配置，这部分配置是每个对象私有的。暂时，我们只支持全局公共配置。
        private: {

        },
        //全局公共配置
        public: {
            marginTop: [60, 80, 15, 1],
            margin: [20, 65, 15, 1],
            paddingX: 30, //绘制坐标的时候，要用到padding的值。
            paddingY: 0,
            NX: 10, //推荐的数目，但是按照现行算法可能会产生 50%左右的浮动（8-15）都有可能
            NY: 10, //推荐的数目，但是按照现行算法可能会产生 50%左右的浮动
            ledgeLen: 5,
            crossXMode: PlotGrid.NEAR, //采用寻找最近的点的模式
            crossYMode: PlotGrid.INTERPOLATION, //采用差值法
            bgColor: "white",
            axisColor: "rgb(225, 225, 225)",
            gridColor: "rgb(128, 0, 0)",
            fontColor: "rgba(225,225,225,0.4)",
            font: '',
            crossX: //光标画x轴线的颜色设置
            {
                bg: {
                    color: "#999",
                    width: 100,
                    height: 14
                },
                font: "12px Arial",
                color: "#999",
                lineColor: "#999",
                fillcolor:"#0a0a0a"
            },
            crossY: {
                bg: //光标画Y轴线的颜色设置
                {
                    color: "#999",
                    width: 80,
                    height: 20
                },
                font: "12px Arial",
                color: "#999",
                lineColor: "#999",
                fillcolor:"rgb(10,10,10)"
            },
            headText: {
                font: "",
                color: "rgb(200,0,0)"
            }
        },
        hx: {
            bgColor   : "#0a0a0a",
            // background:url('../../../assets/img/Klogo.png') no-repeat,
            // background-size: 100%,
            axisColor : "#555",
            gridColor : "#555",//水平刻度移动端
            fontColor : "#555",
            xstyle_axis : 0,
            xstyle_grid : PlotGrid.NO_GRID,
            ystyle_axis : 0,
            ystyle_grid : PlotGrid.NO_GRID,
            xname : 10,
            yname : 10,
            // fontColor : "rgb(110,110,110)",
            font: "12px Arial"
        },
        mt: {
            bgColor: "black",
            axisColor: "rgb(225, 225, 225)",
            gridColor: "LightSlateGray",
            fontColor: "rgba(225,225,225,0.4)", //字体颜色
            xstyle_axis: 0,
            xstyle_grid: PlotGrid.NO_GRID,
            ystyle_axis: 0,
            ystyle_grid: 0,
            xname: 10,
            yname: 10,
            fontColor: "rgba(225,225,225,0.4)",
            font: "1.2em Arial"
        }
    };
    this.Global.volumes = {//volumn颜色修改
        public: {
            //lineColor:["red","green"]
             lineColor:["rgb(176,0,0)","rgb(24,179,75)"]//红涨绿卖
        }
    };
    this.Global.volumes2 = {
        public: {
            lineColor: ["rgb(176,0,0)", "rgb(220,43,43)"]
        }
    };
    this.Global.Line = {
        public: {
            lineColor: "pink"
        }
    };
    /*this.Global.Order = {
        public:{
            fontcolor:["red","aqua" ],
            linecolor:["red","aqua"],
            font:"1px Georgia",
            width : 1,
            size:20,
            tradersize:60,
            midsize:30
        }
    };*/

    this.Global.Candle = {
        public: {
            box_pixel: 4,
            space_pixel: 4,
            close: {
                bg: {
                    color: "#ff6600",
                    fillcolor:"#0a0a0a",
                    width: 55,
                    height: 14
                },
                type:"price",
                font: "",
                color: "#ff6600",
                lineColor: "rgb(225,225,225)"
                
            }
        },

        mt: {
            open_big_color: "white",
            open_small_color: "black",
            ob_border_color: "rgb(220,43,43)",
            os_border_color: "rgb(220,43,43)",
            grid: "mt"
        },
        hx: {//红涨绿卖
            open_big_color : "rgb(24,179,75)",/*红色"rgb(176,0,0)"*/
            open_small_color : "rgb(10,10,10)",
            ob_border_color : "rgb(24,179,75)",/*红色*/
            os_border_color :"rgb(176,0,0)" ,/*绿色"rgb(24,179,75)"*/
            grid: 'hx'
        }
    };
}

Config.obj = null;
//单件模式
Config.getInstance = function() {
    if (Config.obj == null) {
        Config.obj = new Config();
        //以下进行测试
    }
    return Config.obj;
}

Config.prototype.get = function(key, _default) {
    key = key.split(".");
    var _tmp = this;
    if (key.length == 0) return _default;
    for (var i = 0; i < key.length; i++) {
        if (typeof _tmp[key[i]] === "undefined") {
            return _default;
        } else {
            _tmp = _tmp[key[i]]
        }
    }
    return _tmp;
}

Config.prototype.getBrowserInfo = function() {
    var ua = navigator.userAgent.toLowerCase();
    var s;
    if (s = ua.match(/msie\s+([\d.]+)/)) {
        this.browser = "ie";
        this.bversion = s[1].split(".");
    } else if (s = ua.match(/firefox\/([\d.]+)/)) {
        this.browser = "firefox";
        this.bversion = s[1].split(".");
    } else if (s = ua.match(/chrome\/([\d.]+)/)) {
        this.browser = "chrome";
        this.bversion = s[1].split(".");
    } else if (s = ua.match(/opera.([\d.]+)/)) {
        this.browser = "opera";
        this.bversion = s[1].split(".");
    } else if (s = ua.match(/version\/([\d.]+).*safari/)) {
        this.browser = "safari";
        this.bversion = s[1].split(".");
    } else {
        this.browser = "other";
        this.bversion = [0, 0, 0];
    }
    if (!is_array(this.bversion) || this.bversion.length == 0) {
        this.bversion = [0, 0, 0];
    }
    for (var i = 0; i < this.bversion.length; i++) {
        this.bversion[i] = parseInt(this.bversion[i]);
    }
    //因为ie6的问题比较多，所以，添加一个专门的变量识别IE6
    this.isIE6 = (this.browser == "ie" && this.bversion[0] <= 6) ? true : false;
}

Config.prototype.set = function(key, value) {
    key = key.split(".");
    _tmp = this;
    if (key.length == 0) return this;
    var last = key.pop();
    for (var i = 0; i < key.length; i++) {
        if (typeof _tmp[key[i]] === "undefined") {
            _tmp[key[i]] = {};
        }
        _tmp = _tmp[key[i]];
    }
    _tmp[last] = value;
    return this;
}

Config.prototype.merge = function(key1, key2) {
    var dkey1 = this.get(key1);
    var dkey2 = this.get(key2);
    if (is_object(dkey1) && is_object(dkey2)) {
        for (var key in dkey2) {
            if (typeof key === "string" && typeof dkey2[key] !== "function") {
                dkey1[key] = dkey2[key];
            }
        }
    }
    this.set(key1, dkey1);
}

//控制器主要的工作是初始化整个工作环境。
//1. canvas : Config.Global.MaxCanvasCount = 10 每个页面图形个数应该是有限制的，canvas太多，往往也看不清楚。
//2. 选择正确的model Config.Global.ModelName = "ModelShortPoll"
//3. 兼容性判断
//
//增加indicator。减少indicator的接口。
//绘图接口
//绘图更新接口
//
var periods = {
    // S5: 5,
    M1: 60,
    M2: 60 * 2,
    M3: 60 * 3,
    M4: 60 * 4,
    M5: 60 * 5,
    H1: 60 * 60,
    H2: 60 * 60 * 2,
    D1: 60 * 60 * 24,
    W1: 60 * 60 * 24 * 7,
    MN1: 60 * 60 * 24 * 30
};

function get_period_second(name) {
    var name = name.toUpperCase();
    var ratios = { S: 1, M: 60, H: 3600, D: 3600 * 24, W: 3600 * 24 * 7 };
    if (name == "MN1") {
        return periods[name];
    }
    var perfix = name.charAt(0);
    if (ratios[perfix] && ratios[perfix] > 0) {
        var base = parseInt(name.substr(1));
        if (isNaN(base)) return 0;
        return base * ratios[perfix];
    }
    return 0;
}

function Controller(api) {
    this.config = Config.getInstance();
    this.api = api;
    // console.log("api"+this.api);
    var opt = this.api.option;
    var indicators;
    this.plot_area = opt.plot_area;
    this.staticChat = opt.staticChat;
    this.startTime = opt.startTime;
    this.pair = opt.pair;
    this.toolbar = new ToolBar(this);
    this.initInd(opt.ind);
    this.runtime_load = opt.runtime_load;
    this.isinit = false;

    for (var key in this.pair) {
        if (is_object(this.pair[key])) {
            this.config.Global.yunit[key] = this.pair[key].yunit;
        }
    }
    this.timerID = null;
    this.intervalEvent = {};
    this.recall = {};
    if (this.api.option["toolbar.isenable"]) {
        this.toolbar.enable();
    } else {
        this.toolbar.disable();
    }

    this.model = this.getModel();
    this.view = this.getView();
    if (!this.runtime_load) {

        this.initChat();
    }
    this.isinit = false;
    this.init();
}

Controller.prototype.deinit = function() {
    this.model.deinit();
    this.view.deinit();
    this.toolbar.deinit();
    this.model = null;
    this.view = null;
    this.toolbar = null;
}

Controller.prototype.initChat = function() {
    this.indicators = this.api.indicators;
    var prevlist = [];
    var notseplist = [];
    for (var key in this.ind) {

        if (is_object(this.ind[key])) {
            name = key;
            if (this.ind[name].prev) {
                prevlist.push(name);
                continue;
            }
            if (!this.view.isSeperatePlot(name)) {
                notseplist.push(name);
                continue;
            }
            // if(name.split('"').length==2){
            //     name=name.split('"')[1];
            // }
            this.registerChat(name, null, true);
        }
        //注册prev 形式的图
    }
    //对prevlist，首先它必须依赖一个 sep 的图。因为，每个not sep 都是,都是依赖某个sep放到某个sep上的。
    for (var i = 0; i < prevlist.length; i++) {
        var name = prevlist[i];
        var index = this.view.plotindex[this.ind[name].prev];
        if (typeof index === "undefined") {
            continue;
        }
        this.registerChat(name, index);
    }
    //对于非seplist的图表，这个性质是固有的，依赖某个图。
    for (var i = 0; i < notseplist.length; i++) {
        var name = notseplist[i];
        if (!this.ind[name].param) {
            index = 0;
        } else {
            var index = this.view.plotindex[this.ind[name].param[0][0]];
            if (typeof index === "undefined") {
                index = 0;
            }
        }
        this.registerChat(name, index);
    }
}

Controller.prototype.getIndParam = function(name) {
    if (this.ind[name] && this.ind[name].param) {
        return this.ind[name].param;
    }
    return false;
}

Controller.prototype.getIndList = function() {
    var ind = {};
    for (var key in this.ind) {
        ind[key] = 1;
    }
    return ind;
}

Controller.prototype.indTpl = function(indicator) {
    //判断是不是tpl
    //alert(disable_selected);
    if (this.config.Global.TPL[indicator]) {
        ToolBar.tplselect(indicator);
        indicator = this.config.Global.TPL[indicator];
        for (var key in HTML5StockChartAPI.API.tplParams) {
            var data = HTML5StockChartAPI.API.tplParams[key];
            if (typeof data === "string" || typeof data === "number") {
                indicator = indicator.replace(key, data);
            }
        }
    } else {
        ToolBar.tplselect("none");
    }

    // indicator =JSON.stringify(indicator).split(":");
    // console.log("indicator:"+indicator.split);
    if(indicator.split==undefined){
        return indicator
    }
    else{

    }
    if(indicator.split==undefined){
        return indicator;
    }
    indicator =indicator.split(':');
    return indicator;
}

Controller.prototype.initInd = function(indlist, disable_parse) {
    //ind 的结构进行调整：
    //区别对待下载数据，但是不显示的情况
    var indlist = this.indTpl(indlist);
    this.config.mainName = indlist[0];
    // if(this.config.mainName.split('"').length==2){
    //     this.config.mainName=this.config.mainName.split('"')[1];
    // }
    // this.config.mainName=indlist[0]+'"';
    //alert(this.config.mainName);
    if (disable_parse) {
        var param_ind = indlist;
    } else {
        var param_ind = this.parseInd(indlist);
    }
    for (var i = 0; i < param_ind.length; i++) {
        var ind = param_ind[i];
        var name = param_ind[i].join("|");
        var ind_name = ind[0];
        //注册新的指标值,复制配置。
        if (ind[1]) {
            var depends = ind[1].split(",");
            for (var j = 0; j < depends.length; j++) {
                if (depends[j] == this.config.mainName || depends[j] == "null" || this.ind[depends[j]]) {
                    //donothing
                    continue;
                }
                if (this.config.Global.View[depends[j]]) {
                    this.ind[depends[j]] = { name: depends[j], view: 0, prev: false };
                }
            }
        }
        ind.shift(); //shift 名称
        ind.shift(); //shift depends
        if (depends) {
            ind.unshift(depends);
        } else {
            ind.unshift("none");
        }
        this.ind[name].param = ind;
        this.config[name] = this.config[ind_name];
        this.config.Global.View[name] = this.config.Global.View[ind_name];
        this.config.Global.Axis[name] = this.config.Global.Axis[ind_name];
    }
}

Controller.prototype.parseInd = function(indlist) {
    var curperiod = get_period_second(this.api.p);
    this.ind = {};
    var param_ind = [];
    for (var i = 0; i < indlist.length; i++) {
        //判断是否是prev类型的
        var prev = false;
        var name = indlist[i];
        if (indlist[i].charAt(0) == "<") //prev
        {
            prev = this.config.mainName;
            if (i > 0) {
                for (var j = i - 1; j >= 0; j--) {
                    if (indlist[j][0] != "<") {
                        prev = indlist[j];
                        break;
                    }
                }
            }
            name = name.substr(1);
        }
        var ind = name.split("|");
        var index = ind[0].indexOf(",");
        var tper, tname;
        if (index != -1) {
            tname = ind[0].substring(0, index);
            tper = ind[0].substring(index + 1);
            name = tname + name.substring(ind[0].length);
            ind[0] = tname;
            if (tper != curperiod) {
                continue;
            }
        }
        if (ind.length > 1) {
            param_ind.push(ind);
        }
        this.ind[name] = {
            name: name,
            view: 1,
            prev: prev
        };
    }
    return param_ind;
}

Controller.prototype.addIntervalEvent = function(name, obj, recall) {
    this.intervalEvent[name] = obj;
    if (recall) {
        this.recall[name] = obj;
    }
}

Controller.prototype.removeIntervalEvent = function(name) {
    this.intervalEvent[name] = null;
    if (this.recall[name]) {
        this.recall[name] = null;
    }
}

Controller.prototype.recallEvent = function() {
    for (var key in this.recall) {
        if (this.recall[key] && is_object(this.recall[key])) {
            this.recall[key].recall(this);
        }
    }
}

Controller.prototype.init = function() {
    if (this.isinit) {
        return;
    }
    this.isinit = true;
    this.toolbar.init();
    this.view.init();
    this.setGlobalInterval();
    return true;
}

Controller.prototype.set = function(c, p) {
    // console.log('p:'+p)
    if (c && p) {
        this.c = c.toUpperCase();
        this.p = p.toUpperCase();
        $.cookie('period',this.p);
        this.init();
        if (this.model) {

            this.model.set(this.c, this.p);
            this.model.init();
        }
    }
}

Controller.prototype.setGlobalInterval = function() {
    var time = this.config.Global.Interval;
    if (time < 20) {
        time = 20;
    } //以20ms为单位
    //规则为：要实现一个功能,就分装一个函数在此处执行
    if (this.timerID !== null) {
        return;
    }
    var _this = this;
    this.timerID = window.setInterval(function() {

        var events = _this.intervalEvent;
        for (var key in events) {
            if (events[key] != null && is_object(events[key])) {
                events[key].run(_this);
            }
        }
    }, time);
}

Controller.prototype.flag = function(type) {
    debug(type);
    if (type == "new") {
        this.draw();
        this.recallEvent();
        if (this.config.Global.autoScroll) {
            triggerKeydown(Key.KEY_END);
        }
    } else if (type == "down") {
        this.draw();
        this.recallEvent();
    }
}

Controller.prototype.getModel = function() {
    var ModelClass = this.config.Global.modelName;
    //以后要加入兼容性的判断，最后选择一个正确的model
    return new ModelClass(this);
}

Controller.prototype.getView = function() {
    var ViewClass = this.config.Global.viewName;
    return new ViewClass(this);
}

Controller.prototype.registerChat = function(name, index, has_plot_area) {
    var indinfo = this.ind[name];
    if (indinfo.view) //如果没有view ，不会注册显示对象
    {
        this.view.registerPlot(name, index, has_plot_area, indinfo.param);
    }
    this.model.registerData(name);
}

Controller.prototype.unregisetChat = function(name) {
    this.view.unregisetData(name);
    this.view.unregisetPlot(name);
}
Controller.prototype.draw = function() {
    if(this.model==undefined)return;
    if (!this.model.ready) return;
    var viewconfig = this.view.getAxisConfig(); //view 的图形分布情况
    //然后。model要根据这个配置，生成相应的坐标数据。
    //坐标配置：
    // (绘图区域)
    // canvas_id => [width, height, 对应的图形名称：main, ma, easyforex ...]
    // 
    // 返回的格式：图形名称 => 坐标数据
    //
    //主图要绘制的个数
    if (viewconfig.length <= 0) return;
    //清除原来的view数据
    this.view.clearData();
    this.model.clearData();
    debug("draw_data_init");
    var data = this.model.getData(viewconfig);
    for (var i = 0; i < data.length; i++) {
        //debug("get_data_beg");
        //获取数据内部进行封装：我们只调整这一块。
        //对画图来说，是自己计算的，还是服务器下载的是没有差别的。
        //这样就不会让问题扩大化。
        //debug("get_data_end");
        this.view.updateData(data[i], i); //加入数据
        //debug("calc_axis");
    }
    debug("draw_data_end");
    this.view.draw();

    //检查是否要下载数据
    this.model.downloadData();
    debug("draw_end");
}

Controller.prototype.startSet = function(name) {
    var one = this.view.plot[this.config.mainName].getOneSize();
    var area = this.view.grid[0].getPlotArea();
    if (name == "Next") {
        this.model.point(this.model.point() - Math.round(30 / one));
    } else if (name == "Prev") {
        this.model.point(this.model.point() + Math.round(30 / one));
    } else if (name == "PageDown") {
        this.model.point(this.model.point() + Math.round((area.x.beg - area.x.end) / one));
    } else if (name == "PageUp") {
        this.model.point(this.model.point() - Math.round((area.x.beg - area.x.end) / one));
    } else if (name == "Home") {
        this.model.point(this.model.endPos());
        this.model.state = 'home';
    } else if (name == "End") {
        this.model.point(0);
        this.model.state = 'end';
    }
    return this.model.point();
}

Controller.prototype.startOffset = function(offset) {
    var start = this.model.point();
    this.model.point(start + offset);
}

Controller.prototype.zoomIn = function() {
    this.view.plot[this.config.mainName].zoomIn();
    this.draw();
}

Controller.prototype.zoomOut = function() {
    this.view.plot[this.config.mainName].zoomOut();
    this.draw();
}

function Data() {

}

Data.OPEN = 0;
Data.HIGH = 1;
Data.LOW = 2;
Data.CLOSE = 3;
Data.VOLUMES = 4;
//controller 中有一个接口会增加这个
//事件，它提供一个接口给客户端
//setVal()
//getVal()
//提供给controller 的接口是 
//run
function IntervalEvent(count, callback, zerocall) {
    this.count = count;
    if (this.count <= 0) {
        this.count = 1;
    }
    this.current = 0;
    this.callback = callback;
    this.value = 0;
    this.prev = null;
    if (!zerocall) {
        this.zerocall = 0;
    } else {
        this.zerocall = zerocall;
    }
}

IntervalEvent.prototype.run = function(controller) {
    this.current++;
    if (this.count == this.current) {
        this.current = 0;
        if (this.zerocall) {
            this.prev = this.value;
            this.callback.call(this, controller);
        } else {
            if (this.value != 0) {
                this.prev = this.value;
                this.callback.call(this, controller);
                this.value = 0;
            }
        }
    }
}

IntervalEvent.prototype.getVal = function() {
    return this.value;
}

IntervalEvent.prototype.recall = function(controller) {
    this.value = this.prev;
    if (this.zerocall) {
        this.callback.call(this, controller, true);
    } else {
        if (this.value != 0) {
            this.callback.call(this, controller, true);
            this.value = 0;
        }
    }
}

IntervalEvent.prototype.setVal = function(val) {
    this.value = val;
    return this;
}


//数据更新部分：
//广播服务器的设计是集中式的。我们要广播所有的数据，所以需要进行更新。
//这个部分将会分为两个部分：下载K线，更新最新的数据
//
// 管理tick图：
// 根据货币对k线，会注册一系列的K线，指标。
// 更新或者下载的数据都有下面的属性：
// 1. 货币对/时间/名称
// 2. 绘图提供更新接口：
// plot = plot_list[currency][time][name];
// updateNew(data);
// download(data);
//
//data.registerPlot(c, p, name, plot);
//data.unregisetPlot(c, p, name, plot);
//
//采用广播协议的数据

function Model(controller) {
    this.data = {};
    this.maindata = {};
    this.dataObj = {};
    this.realname = {};
    this.flagset = {};
    this.ready = false;
    //保存数据指针。标志当前图形读取的位置。
    this.datapoint = {};
    this.config = Config.getInstance();
    this.controller = controller;
    this.registerData(this.config.mainName); // 注册主图
    //alert(this.config.mainName);
    this.main = this.dataObj[this.config.mainName];
    this.downOptions = {};

    //这个由数据层来更新
    this.leftoffset = 0;
    this.rightoffset = 0;
    this.state = '';
}

Model.prototype.init = function() {
    //初始化数据
    if (this.c && this.p) {
        //判断是否这个货币对的数据已经初始化过了
        if (this.flag(Model.INITED)) {
            hide_loading();
            this.controller.draw();

            if (this.config.Global.newDisable || this.config[this.config.mainName].newdata) {
                this.newData();
            }
        } else if (this.flag(Model.INITING)) {
            return;
        } else {
            this.flag(Model.FIRST_NEW, 1);
            show_loading();
            this.flag(Model.INITING, 1);
            //alert(this.config.mainName);
            if (this.config['main'].downdata) {
                this.initData();
            } else {
                this.flag(Model.INITED, 1);
                this.init();
            }
        }
    }
}

Model.prototype.deinit = function() {
    //释放socket 资源
}

Model.NEW = 1;
Model.DOWN = 1 << 1;
Model.NEW_DATA = 1 << 2;
Model.DOWN_DATA = 1 << 3;
Model.INITED = 1 << 4;
Model.INITING = 1 << 5;
Model.NEW_DISABLE = 1 << 6;
Model.DOWN_END = 1 << 7;
Model.FIRST_NEW = 1 << 8;
Model.UPDATE = 1 << 9;

Model.prototype.registerData = function(name) { 
    // console.log("name:"+name);
    if(this.config[name] && !this.dataObj[name]) {

        var newname = name.split("|", 2);
        if (newname.length == 2) {
            this.realname[newname[0]] = name;
        }
        var Reader = this.config[name].reader;
        var Writer = this.config[name].writer;
        this.dataObj[name] = {};
        if (Writer) {
            this.dataObj[name].writer = new Writer(this, name);
        }
        if (Reader) {
            this.dataObj[name].reader = new Reader(this, this.dataObj[name].writer, name);
        }
        //reader 要引用write
    }

}

Model.prototype.clearData = function() {
    for (var key in this.dataObj) {
        if (is_object(this.dataObj[key])) {
            this.dataObj[key].writer.clear();
            this.dataObj[key].reader.clear();
        }
    }
}

Model.prototype.getDataReader = function(name) {
    return this.dataObj[name].reader;
}

Model.prototype.unregisetData = function(name) {
    this.dataObj[name] = null;
}

Model.prototype.set = function(c, p) {
    if (this.c != c || this.p != p) {
        if (this.newDataXHR) this.newDataXHR.abort();
        //标记不在更新数据
        this.isNewing = false;
        if (this.subscribe) {
            this.subscribe();
        }
        this.downOptions = {};
    }
    this.c = c;
    this.p = p;
    $.cookie('period',p);
    //初始化标志位
    this.flagset = init_obj(this.flagset, this.c, this.p, 0);
    this.datapoint = init_obj(this.datapoint, this.c, this.p, 0);
    //set 所有的reader对象
    for (var key in this.dataObj) {
        if (is_object(this.dataObj[key])) {
            this.dataObj[key].reader.set();
        }
    }

}

Model.prototype.clearData = function() {
    this.data = {};
}

Model.prototype.getShift = function(plot) {
    var maxshift = -Infinity;
    for (var i = 0; i < plot.length; i++) {
        var name = plot[i];
        var shift = this.dataObj[name].reader.getShift();
        if (shift > maxshift) {
            maxshift = shift;
        }
    }
    return maxshift;
}

Model.prototype.getData = function(viewconfig) {
    //all plot list.
    var plot = [];
    this.plotnum = viewconfig[0].plotnum;
    for (var i = 0; i < viewconfig.length; i++) {
        var arr = viewconfig[i].plot;
        for (var j = 0; j < arr.length; j++) {
            plot.push(arr[j]);
        }
    }
    //初始化参数
    for (var i = 0; i < plot.length; i++) {
        var name = plot[i];
        //if (name == this.config.mainName) continue;
        var param = this.controller.getIndParam(name);
        if (param) {
            this.dataObj[name].reader.setParam(param);
        }
    }
    var shift = this.getShift(plot);
    //先计算普通的:
    for (var i = 0; i < viewconfig.length; i++) {
        this._getData(viewconfig[i].plot, viewconfig[i].plotnum + shift);
    }
    //再计算关联，但是不会在前台显示的数据
    var nodatalist = [];
    for (var i = 0; i < plot.length; i++) {
        var param = this.controller.getIndParam(plot[i]);
        if (param && param[0] != "none") {
            for (var k = 0; k < param[0].length; k++) {

                if (this.data[param[0][k]]) {
                    continue;
                } else {
                    nodatalist.push(param[0][k]);
                }
            }
        }
    }
    this._getData(nodatalist, viewconfig[0].plotnum + shift);
    //再计算通过这些数据得到“计算的数据”
    for (var j = 0; j < viewconfig.length; j++) {
        for (var i = 0; i < viewconfig[j].plot.length; i++) {
            var name = viewconfig[j].plot[i];
            var param = this.controller.getIndParam(name);
            if (param && param[2] != "__ignore__") {
                if (name == this.config.mainName) {
                    continue;
                }
                if (param[0] != "none") {
                    for (var k = 0; k < param[0].length; k++) {
                        this.dataObj[name].reader.setDependData(param[0][k], this.data[param[0][k]]);
                    }
                }
                this.data[name] = this.dataObj[name].reader.getData(this.config[name].data);
            }
        }
    }
    //计算完成了，这些数据就没有用了，释放掉内存
    for (var i = 0; i < nodatalist.length; i++) {
        this.data[nodatalist[i]] = null;
    }
    return this.formatData(viewconfig, shift);
}

Model.prototype._getData = function(plotlist, num) {
    if (!this.data[this.config.mainName]) {
        this.data[this.config.mainName] = this.dataObj[this.config.mainName].reader.getData(this.plotnum, this.config[this.config.mainName].data, true);
        this.maindata = this.dataObj[this.config.mainName].reader.getData(this.num, this.config[this.config.mainName].data, true);
    }
    //计算所有没有参数的情况
    for (var i = 0; i < plotlist.length; i++) {
        var name = plotlist[i];
        if (name == this.config.mainName) continue;
        var param = this.controller.getIndParam(name);
        if (!param || param[2] === "__ignore__") {
            this.data[name] = this.dataObj[name].reader.getDataByMain(this.config[name].data);
        }
    }
}

Model.prototype.shiftData = function(shift) {
    //先shift main，main直接按照数字shift
    //其他相关的shift按照时间进行shift。因为，不一定是对齐的。
    var main = this.config.mainName;
    if (shift > 0 && shift < this.data[main].x.length) {
        //this.data[main].x =  this.data[main].x.slice(0, -shift);
        //this.data[main].y =  this.data[main].y.slice(0, -shift);
        //var minx =  this.data[main].x[this.data[main].x.length -1];
        /*for (var key in this.data)
        {
           
            if (key == main) continue;
            if (this.data[key] && is_object(this.data[key]))
            {
                var shift = this.getShiftNumber(this.data[key].x, minx);
                this.data[key].x =  this.data[key].x.slice(0, -shift);
                this.data[key].y =  this.data[key].y.slice(0, -shift);
            }
        }*/
    }

    for (var key in this.data) {
        if (this.data[key] && is_object(this.data[key])) {
            this.data[key] = this.dataObj[key].reader.formatData(this.data[key].x, this.data[key].y);
        }
    }
}

Model.prototype.getShiftNumber = function(x, minx) {
    var count = 0;
    for (var i = x.length - 1; i >= 0; i--) {
        if (x[i] >= minx) {
            break;
        } else {
            count++;
        }
    }
    return count;
}

//如果是主图的数据，因为要用于对齐，所以，复制一份
//防止外界对其进行修改操作。
Model.prototype.formatData = function(viewconfig, shift) {

    this.shiftData(shift);
    //再计算通过这些数据得到“计算的数据”
    var data = [];
    //var text;
    for (var j = 0; j < viewconfig.length; j++) {
        data[j] = {};
        //text = ""; 
        for (var i = 0; i < viewconfig[j].plot.length; i++) {
            var name = viewconfig[j].plot[i];
            if (name == this.config.mainName) {
                data[j][name] = object_copy(this.data[this.config.mainName]);
                data[j][name].x = array_copy1d(this.data[this.config.mainName].x);

            } else {
                data[j][name] = this.data[name];
            }
            //text += "[" + this.getShowName(name) + " " + this.lastData(this.data[name].y[0]) + "] ";
        }
        data[j].c = this.c;
        data[j].p = this.p;
        //data[j].text = text;
    }
    return data;
}

Model.prototype.update = function(data, type) {
    if (!data) {
        if (type == Model.DOWN) {
            this.ready = true;
            this.controller.flag("down");
            this.flag(Model.DOWN_END, 1);
        }
        return;
    }
    if (data.code) {
        if (data.code == "goto" && data.msg) {
            window.location.href = data.msg;
        }
        return;
    }
    var is_new = false;
    var is_down = false;
    var is_update = false;
    if (!data.c || !data.p) {
        return;
    }
    var c = data.c.toUpperCase();
    var p = data.p.toUpperCase();
    //数据已经下载到末尾了
    var end = data.end;
    this.flag(Model.DOWN_END, end);
    if (data.code) {
        debug(data.code);
        //发生了错误
        return;
    }
    this.downOptions = data.options || {};
    for (var key in data) {
        //下载的数据
        if (!is_object(data[key])) continue;
        //这三个是保留的
        if (key == "c" || key == "p" || key == "code" || key == "end") {
            continue;
        }
        var keyreal = key;
        if (typeof this.dataObj[key] === "undefined") {
            key = this.realname[key];
        }
        if (typeof key === "undefined") {
            continue;
        }
        if (this.dataObj[key]) {
            if (type == Model.NEW) {
                is_new = true;
                if (this.dataObj[key].writer) this.dataObj[key].writer.setNewData(c, p, data[keyreal]);
            } else if (type == Model.UPDATE) {
                is_update = true;
                if (this.dataObj[key].writer) this.dataObj[key].writer.setUpdateData(c, p, data[keyreal]);
            } else if (this.downOptions.total_size) {
                is_down = true;
                if (this.dataObj[key].writer && this.dataObj[key].writer.setDownloadDataByOffset) {
                    this.dataObj[key].writer.setDownloadDataByOffset(c, p, data[keyreal], this.downOptions);
                } else {
                    if (this.dataObj[key].writer) this.dataObj[key].writer.setDownloadData(c, p, data[keyreal]);
                }
            } else {
                //判断是否存在数据对象，那么更新图形的数据。
                is_down = true;
                if (this.dataObj[key].writer) this.dataObj[key].writer.setDownloadData(c, p, data[keyreal]);
            }
        }
    }
    if (is_new) {
        this.ready = true;
        this.controller.flag("new");
    }
    if (is_down) {
        this.ready = true;
        this.controller.flag("down");
    }
    if (is_update) {
        this.ready = true;
        this.controller.flag("new");
    }
}

Model.prototype.getIndicatorList = function() {
    var list = [];
    for (var key in this.dataObj) {
        if (key == this.config.mainName) continue; //主图的数据，数据接口会默认更新
        if (is_object(this.dataObj[key])) {
            list.push(key);
        }
    }
    return list;
}

//数据集合中，按照时间，或者某个x轴一路更新
//肯定会有一个边界。这个数据边界就从这里取。
Model.prototype.startXValue = function() {
    var start = this.main.reader.startXValue();
    if (start <= 0 && this.controller.startTime) {
        return this.controller.startTime;
    }
    return start;
}

Model.prototype.endXValue = function() {
    return this.main.reader.endXValue();
}

Model.prototype.leftDataCount = function() {
    return this.endPos() - this.point() - this.plotnum;
}

Model.prototype.rightDataCount = function() {
    return this.point();
}

Model.prototype.endPos = function() {
    return this.main.reader.getEndPos();
}

Model.prototype.flag = function(key, value, c, p) {
    if (!c) {
        c = this.c;
    }
    if (!p) {
        p = this.p;
    }
    if (!c || !p) {
        return;
    }
    c = c.toUpperCase();
    p = p.toUpperCase();
    if (typeof value === "undefined") {
        return (this.flagset[c][p] & key) == key; //判断标志位是否已经被设置了
    } else if (value == 0) {
        this.flagset[c][p] = this.flagset[c][p] & (~key); //清除标志位
    } else {
        this.flagset[c][p] = this.flagset[c][p] | key; //设置标志位
    }
}

Model.prototype.point = function(value) {
    if (typeof value === "undefined") {
        return this.datapoint[this.c][this.p];
    } else {
        this.datapoint[this.c][this.p] = value;
    }
}

Model.prototype.getLeftOffset = function() {
    return this.leftoffset;
}

Model.prototype.getRightOffset = function() {
    return this.rightoffset;
}

Model.prototype.getDownOffset = function(down_flag) {
    this.count = this.config.Global.downloadCount;
    if (down_flag == -1 && this.getRightOffset() == 0) {
        return -1;
    }
    if (down_flag == 1 && this.getLeftOffset() >= this.downOptions.total_size) {
        return -1;
    }
    if (down_flag == 1) {
        var offset = this.getLeftOffset() + 1; //读取下一个数据
        //超出范围
        if (offset >= this.downOptions.total_size) offset = -1;
    }
    if (down_flag == -1) {
        var offset = this.getRightOffset() - this.config.Global.downloadCount;
        if (offset < 0) {
            offset = 0;
            this.count = this.getRightOffset() - offset;
        }
    }
    return offset;
}

Model.prototype.getDataByTime = function(name, time, near) {
    var x = this.dataObj[name].writer.getX(this.c, this.p);
    var y = this.dataObj[name].writer.getY(this.c, this.p);
    var index = binsearch_r(x, time);
    var obj = {};
    obj.time = timeToDate(time, this.config.Global.timeformat[this.p], this.config.Global.timezone);
    if (index == -1 && near == "candle") {
        index = find_last_little_r(x, time);
        if (index == -1) return false;
        var close = y[index][Data.CLOSE];
        obj.data = [close, close, close, close, y[index][Data.VOLUMES]];
    } else {
        if (index == -1) return false;
        obj.data = y[index];
    }
    return obj;
}

__javascript_debug__ = false;
__datasource__ = "db";
__datafile__ = "db";
__debug__ = false;
__static__ = false;
__runtime_load__ = false;
__start_time__ = false;
__baseurl__ = "http:\/\/locaohost:9001\/";
__broadcast_server_active__ = "115.236.165.18";
__loadhost__ = "localhost:9001";
__refererhost__ = "localhost:9001";
__orderhost__ = "localhost:9001";
__apihost__ = "rsi.33.cn";
__dbreset__ = ""
__musicselect__ = { "alert.wav": "alert", "alert2.wav": "alert2", "connect.wav": "connect", "disconnect.wav": "disconnect", "email.wav": "email", "expert.wav": "expert", "ok.wav": "ok", "request.wav": "request", "stops.wav": "stops", "tick.wav": "tick", "timeout.wav": "timeout", "wait.wav": "wait", "": "", "\u05a3\u0534 - ": "\u05a3\u0534 - " };

//plot base function. process base plot function.
function Key() {

}


Key.KEY_PREV = 37;
Key.KEY_UP = 38;
Key.KEY_NEXT = 39;
Key.KEY_DOWN = 40;
Key.KEY_HOME = 36;
Key.KEY_END = 35;
Key.KEY_PAGE_DOWN = 34;
Key.KEY_PAGE_UP = 33;

function Plot(view, grid, name) {
    this.view = view;
    this.name = name;
    this.controller = this.view.controller;
    this.grid = grid;
    this.getPlotArea();

    this.ctx = this.grid.ctx;
    this.ctxBG = this.grid.ctxBG;
    this.ctxFront = this.grid.ctxFront;

    this.axis = this.grid.axis;
    this.canvas = this.grid.canvas;
    this.config = Config.getInstance();
    this.param = {};
    classname = getClassName(this);
    classname = classname.substr(4);
    if (this.config.Global[classname]) {
        this.conf = this.config.Global[classname].public;
    } else {
        this.conf = {};
    }
    //对K线图的操作是全局性的。也就是说，这里的不会像grid里面一样复制一份全局配置。
    //而是直接操作全局配置
}

//默认一个时间占据一个像素，这个是线条默认的占用值。
Plot.prototype.getOneSize = function() {
    return 1;
}


//默认一个时间占据一个像素，这个是线条默认的占用值。
Plot.prototype.getPlotArea = function() {
    var area = this.grid.getPlotArea();
    this.top = area.y.end;
    this.left = area.x.end;
    this.bottom = area.y.beg;
    this.right = area.x.beg + this.grid.conf.paddingX;
}

Plot.prototype.getShowName = function() {
    var name = this.name.toUpperCase();
    name = name.replace("MAIN", "OHLC").replace("FXTRADE", "OANDA").replace("||", " ");
    if (name.indexOf("PROFIT_LINE") != -1) {
        name = "PROFIT";
    }
    name = name.split("|");
    if (name.length == 1) {
        return name[0];
    }
    var pre = name.shift();
    return pre + " (" + name.join(" , ") + ")";
}

Plot.prototype.lastData = function() {
    var data = this.view.model.getDataReader(this.name).last();
    if (typeof data === "undefined") {
        return "";
    }
    try {
        var yunit = this.axis.viewconfig.y.axis_option.unit;
    } catch (e) {
        return "";
    }
    var ret = [];
    if (is_array(data)) {
        for (var i = 0; i < data.length; i++) {
            ret[i] = this.grid.getText(0, data[i], yunit);
        }
        return ret;
    } else if (!isNaN(Number(data))) {
        return this.grid.getText(0, data, yunit);
    } else {
        return data;
    }
}

Plot.prototype.setParam = function(param) {
    if (param.length >= 3) {
        this.param = this.parseParam(param[2]);
    }
}

Plot.prototype.parseParam = function(pstr) {
    pstr = pstr.split(",");
    var ret = {};
    for (var i = 0; i < pstr.length; i++) {
        var tmp = pstr[i].split("=", 2);
        ret[tmp[0]] = tmp[1];
    }
    return ret;
}

Plot.prototype.lastDataShow = function() {
        var data = this.lastData();
        if (is_array(data)) {
            return data.join(", ");
        }
        return data;
    }
    //价格标线
Plot.prototype.priceFlag = function(close_price, conf) {
    var close_y = this.axis.getY(close_price);
    drawWithArrowheads(this.grid.xEnd.x-14,close_y,this.grid.xEnd.x+30,close_y,this.ctx);
//  drawRow(this.ctx, new Point(this.grid.xEnd.x , close_y), 10, conf.lineColor, 1);
    //能直接访问grid的内容
    var height = conf.bg.height / 2;
    if (close_y >= 0 && close_y - this.grid.O.y < height) {
        close_y = this.grid.O.y + height;
    }
    if (close_y <= this.grid.xyEnd.y && this.grid.xyEnd.y - close_y < height) {
        close_y = this.grid.xyEnd.y - height;
    }
    conf.unit = this.yunit;
    writeTextOption(this.ctx, new Point(this.grid.xEnd.x-6, close_y), close_price, conf);
}


function Shape(ctx, width, height, opt) {
    this.ctx = ctx;
    this.width = width ? width : 0;
    this.height = height ? height : 70;
    if (!opt) {
        opt = {};
    }
    this.boder = opt.boder ? opt.boder : "black";
    this.fill = opt.fill ? opt.fill : "black";
    this.cta = opt.cta ? opt.cta : 0;
}

__symbol__list__ = {
    // "BTYBTC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.001 },
    // "BTC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.01 },
    "BCCBTC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.01 },
    "ETHBTC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.01 },
    "ETCBTC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.01 },
    // "SC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.0001 },
    // "WTC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.0001 },
    // "NYCC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.001 },
    // "BTS": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.001 },
    "LTCBTC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.01 },
    "ZECBTC": { "time": ["M1", "M2", "M3", "M4", "M5", "M15", "M30", "H1", "H2", "H4", "D1", "W1", "MN1"], "yunit": 0.01 }
}

function ToolBar(controller) {
    this.controller = controller;
    this.pair = this.controller.pair;
    // this.initPair();
    // this.hideSymbol(); //隐藏没有数据的货币对
    this.config = Config.getInstance();
    this.api=this.controller.api;
    this.isenable = true;
}

ToolBar.prototype.deinit = function() {

}

//显示出BTY 和ETH标签
ToolBar.prototype.initPair = function() {
   // $("#symbol").html('');
    for (var c in this.pair) {
        if (!is_object(this.pair[c])) {
            continue;
        }
    }

}

ToolBar.prototype.enable = function() {
    $("#toolbar").show();
    this.isenable = true;
}

ToolBar.prototype.disable = function() {
    $("#toolbar").hide();
    this.isenable = false;
}

ToolBar.prototype.hideSymbol = function() {
    var _this = this;
    $("#symbol2").find("li").each(
        function() {
            var text = $(this).text();
            text = $.trim(text);
            $(this).show();
            if (typeof _this.pair[text] !== "object") {
                $(this).hide();
            }
        }
    );
}

ToolBar.prototype.hidePeriod = function(c) {
    var _this = this;
    if (!c) return;
    var _timeList = _this.pair[c];
    if (!_timeList) return;
    _timeList = _timeList.time;
    _timeMap = {};
    for (var i = 0; i < _timeList.length; i++) {
        _timeMap[_timeList[i]] = 1;
    }
    $("#period").find("li").each(
        function() {
            var text = $(this).text();
            text = $.trim(text);
            $(this).show();
            if (_timeMap[text] !== 1) {
                $(this).hide();
            }
        }
    );
}

ToolBar.prototype.init = function() {
    this.InitIndicatorstatus();
       //添加事件
    var _this=this;
    $("#Indicator_list label").click(function () {
        var name=$(this).text();
        _this.IndicatorStatusChange(this);
    })
    // $("#Indicator_list li").click(function () {
    //     var name=$(this).attr('name');
    //     if($(this).find('a').attr('class')=='active'){
    //         $(this).find('a').removeClass('active');
    //     }
    //     else{
    //        $(this).find('a').addClass('active'); 
    //     }
        
    //     _this.IndicatorStatusChange(name);
    // })
    //bty,eth选择切换
    $("#symbol2 a").click(function(){
        $("#symbol2 a").removeClass("active");
        var uid=$.cookie().id;
        $(this).addClass("active");
        _this.newsymbol(this);
    });
    $("#getsymbol").click(function(){
        console.log($.cookie('symbol'));
        if(sessionStorage.getItem('symbol')=='YCC'){
            HTML5StockChartAPI.API.setPair('NYCC', sessionStorage.getItem('period'));
        }else{
             HTML5StockChartAPI.API.setPair($.cookie('symbol'), sessionStorage.getItem('period'));
        }
       
    })
     $("#ethsymbol").click(function(){
        HTML5StockChartAPI.API.setPair("ETHBTC", $.cookie('period'));
    })
     $("#etcsymbol").click(function(){
        HTML5StockChartAPI.API.setPair("ETCBTC", $.cookie('period'));
    })
     $("#bccsymbol").click(function(){
        HTML5StockChartAPI.API.setPair("BCCBTC", $.cookie('period'));
    })
    /* $("#Indicator_list a").click(function(){
        var name=$(this).text();
        _this.IndicatorStatusChange(name);
     });*/
    $("#period li").click(function() {
         $("#period a").removeClass("active");
        _this.period(this);
    });
    $("#plot_area").bind('click', function() {
        _this.toolList();
    });
    $('body').not($("#plot_area")).unbind('mouseover', function() {
        // console.log($(this));
        $('body').css("cursor", "hand");
        _this.toolList();
        //$("#dropzone").slideUp("normal");
    });
    // this.addSelectEvent($("#symbol2"), this.symbol);
    this.addSelectEvent($("#period"), this.period);
    //this.addSelectEvent($("#tool_list"), this.toolList);//加号功能，指标
    this.addClickEvent($("#zoom"), this.zoom);
    //选择：
    ToolBar.selectItem($("#period"), $.cookie('period'));
}

ToolBar.prototype.InitIndicatorstatus = function() {
    // console.log("this.api:"+this.api);

    var inds = $.cookie('ind');
    if (this.config.Global.TPL[inds]) {
        inds = this.config.Global.TPL[inds];
    }
    if (inds.indexOf("ma|main|") != -1) {
        this.SetIndicatorStatus("MA");
    }
    if (inds.indexOf("macd|main|") != -1) {
        this.SetIndicatorStatus("MACD");
    }
    if (inds.indexOf("volumes") != -1) {
        this.SetIndicatorStatus("VOLUMES");
    }
    if (inds.indexOf("bolling") != -1) {
        this.SetIndicatorStatus("BOLLING");
    }
    if (inds.indexOf("kdj") != -1) {
        this.SetIndicatorStatus("KDJ");
    }
}
ToolBar.prototype.SetIndicatorStatus = function(indname) {
    $("#Indicator_list label").each(function() {
        if ($(this).text() == indname) {
            $(this).addClass("active");

        }
    });
}

ToolBar.prototype.IndicatorStatusChange = function(obj) {
    var name=$(obj).text();
    if($(obj).attr("class")=='active'){
        $(obj).removeClass('active');
    }
    else{
         $(obj).addClass('active')
    }
    var indstr = "main:";
    $("#Indicator_list label").each(function(){
        if ($(this).attr("class")=='active') {
           switch ($(this).text()) {
                case "MA":
                    indstr += Config.getInstance().Global.TPL["ma"];
                    break;
                case "VOLUMES":
                    indstr += Config.getInstance().Global.TPL["volumes"];
                    break;
                case "MACD":
                    indstr += Config.getInstance().Global.TPL["macd"];
                    break;
                case "BOLLING":
                    indstr += Config.getInstance().Global.TPL["bolling"];
                    break;
                case "KDJ":
                    indstr += Config.getInstance().Global.TPL["kdj"];
                    break;
            }
        }
    })
    // var indstr = "main:";
    // var indstr = this.api.read('ind');
    // if(this.config.Global.TPL[indstr]) {
    //     indstr = this.config.Global.TPL[indstr];
    // }
    // switch (obj) {
    //     case "MA":
    //         indstr += Config.getInstance().Global.TPL["ma"];
    //         break;
    //     case "VOLUMES":
    //         indstr += Config.getInstance().Global.TPL["volumes"];
    //         break;
    //     case "MACD":
    //         indstr += Config.getInstance().Global.TPL["macd"];
    //         break;
    //     case "BOLLING":
    //         indstr += Config.getInstance().Global.TPL["bolling"];
    //         break;
    //     case "KDJ":
    //         indstr += Config.getInstance().Global.TPL["kdj"];
    //         break;
    // }
    // console.log("IndicatorStatusChange:"+name);
    // var indstr = "main:";
    // //  选中那个a 标签就执行什么
    // $("input[name = Indicator]:checkbox").each(function() {
    //     if ($(this).is(":checked")) {
    //         switch ($(this).val()) {
    //             case "MA":
    //                 indstr += Config.getInstance().Global.TPL["ma"];
    //                 break;
    //             case "VOLUMES":
    //                 indstr += Config.getInstance().Global.TPL["volumes"];
    //                 break;
    //             case "MACD":
    //                 indstr += Config.getInstance().Global.TPL["macd"];
    //                 break;
    //             case "BOLLING":
    //                 indstr += Config.getInstance().Global.TPL["bolling"];
    //                 break;
    //             case "KDJ":
    //                 indstr += Config.getInstance().Global.TPL["kdj"];
    //                 break;
    //         }
    //     }
    // });
    this.api.setInd(indstr);
}
   
ToolBar.prototype.signal = function(obj) {
    var signal_id = $.trim(obj.attr('name'));
    //write cookie of signal
    api.setSignal(signal_id);
}

ToolBar.prototype.model = function(obj) {
    var model_id = $.trim(obj.attr('name'));
    //write cookie of model
    api.setModel(model_id);
}

ToolBar.prototype.tplswitch = function(obj) {
    var tpl = $.trim(obj.attr('name'));
    if (tpl == "none") return;
    var api = HTML5StockChartAPI.API;
    api.setIndicatorConf(tpl);
}

ToolBar.tplselect = function(name) {
    ToolBar.selectItem($("#tpl_list"), name);
    //alert(name);
}

ToolBar.prototype.clickFirst = function(obj) {
    var obj = obj.find("li");
    for (var i = 0; i < obj.length; i++) {
        var item = $(obj.get(i));
        if (item.css("display") == "none") {
            continue;
        }
        item.click();
        break;
    }
}

ToolBar.prototype.clickByName = function(obj, name) {
    var obj = obj.find("li");
    for (var i = 0; i < obj.length; i++) {
        var item = $(obj.get(i));
        if ($.trim(item.text()) == name) {
            item.click();
            break;
        }
    }
}

ToolBar.prototype.clickByLiName = function(obj, name) {
    var obj = obj.find("li");
    for (var i = 0; i < obj.length; i++) {
        var item = $(obj.get(i));
        if (item.attr("name") == name) {
            item.click();
            break;
        }
    }
}

ToolBar.prototype.symbol = function(obj) {
    var c = $.trim(obj.text());
    //c="MAC";
    var c = this.findSelected($("#symbol2"));
    //if(c = "ETH") window.location.href="http://33.cn/ethcny";
    //if(c = "BTY") window.location.href="http://33.cn/";
    this.hidePeriod(c); //隐藏没有数据的时间周期
    var p = this.findSelected($("#period"));
    $.cookie('period',p);
    // console.log("p=", p);
    if (!p) {
        //this.clickFirst($("#period"));
        HTML5StockChartAPI.API.setPair(c, this.controller.p);
    } else {
        HTML5StockChartAPI.API.setPair(c, p);
    }
}

ToolBar.prototype.newsymbol = function(obj) {

    var c = $(obj).attr("name");
    if ($.cookie('symbol') != c) {
        $.cookie("symbol", null);
        $.cookie("symbol", c);
    }
    //$("#period").children().first();
    // $("#period").children().first().text(c);

    //c="MAC";
    //var c = this.findSelected($("#symbol")); 
    //if(c = "ETH") window.location.href="http://33.cn/ethcny";
    //if(c = "BTY") window.location.href="http://33.cn/";
   // this.hidePeriod(c); //隐藏没有数据的时间周期
    var p = this.findSelected($("#period"));
    $.cookie('period',p);
    // console.log("p=", p);
    if (!p) {
        //this.clickFirst($("#period"));
        HTML5StockChartAPI.API.setPair(c, this.controller.p);
    } else {
        HTML5StockChartAPI.API.setPair(c, p);
    }
}

ToolBar.prototype.toolList = function(obj) {
    var name = obj.attr("name");
    var _this = this;
    if (name == "cross") //cross情况
    {
        $("#plot_area").css("cursor", "crosshair");
        var view = this.controller.view;
        if (window["FlashCanvas"]) {
            var count = 5;
        } else {
            var count = 2;
        }
        var crossMoveInterval = new IntervalEvent(
            count,
            function(controller, recall) //可以重新被call
            {
                var _this = controller.view;
                if (typeof recall == "undefined") {
                    _this.draw();
                }
                if (!this.value || this.value.length != 3) {
                    return;
                }
                var x = this.value[0];
                var y = this.value[1];
                var index = this.value[2];
                for (var i = 0; i < _this.canvasActiveCount; i++) {
                    _this.grid[i].drawCrossX(x, _this.axis[0]);
                }
                _this.grid[index].drawCrossY(y);
            }
        );
        for (var i = 0; i < view.canvasActiveCount; i++) {
            view.canvas[i].bind("mousemove", crossMoveInterval, this.crossMove);
        }

        //if the page is redraw， call it by controller.recall(). now, only new tick
        //redraw need to recall.
        this.controller.addIntervalEvent("crossMove", crossMoveInterval, true);
        $(document).bind("mouseover", function(e) {
            // console.log(e.target);
            $("body").css("cursor", "default");
            for (var i = 0; i < view.canvasActiveCount; i++) {
                view.canvas[i].unbind("mousemove", _this.crossMove);
            }
            view.draw();
            _this.controller.removeIntervalEvent("crossMove");
            _this.clickByLiName($("#tool_list"), "none");
            $(document).unbind("mouseover");
        });
    } else if (name == "kline_first") { //
        var view = this.config.Global.View;
        for (var key in view) {
            if (is_object(view[key]) && typeof view[key].disable_axis_area !== "undefined") {
                view[key].disable_axis_area = 1;
            }
        }
        this.controller.draw();
    } else if (name == "ind_first") {
        var view = this.config.Global.View;
        for (var key in view) {
            if (is_object(view[key]) && typeof view[key].disable_axis_area !== "undefined") {
                view[key].disable_axis_area = 0;
            }
        }
        this.controller.draw();
    } else if (name == "indicator") {
        $("#tool_list").find("li[name='indicator']").css('cursor', 'pointer');
        indicator.show();
    } else if (name == "tick_price") {

    }
}
ToolBar.prototype.toolList = function() {
    var _this = this;
    $("#plot_area").css("cursor", "crosshair");
     this.controller=this.api.controller;
    var view = this.controller.view;
    if (window["FlashCanvas"]) {
        var count = 5;
    } else {
        var count = 2;
    }
    var crossMoveInterval = new IntervalEvent(
        count,
        function(controller, recall) //可以重新被call
        {
            var _this = controller.view;
            if (typeof recall == "undefined") {
                _this.draw();
            }
            if (!this.value || this.value.length != 3) {
                return;
            }
            var x = this.value[0];
            var y = this.value[1];
            var index = this.value[2];
            for (var i = 0; i < _this.canvasActiveCount; i++) {
                _this.grid[i].drawCrossX(x, _this.axis[0]);
            }
            _this.grid[index].drawCrossY(y);
        }
    );
    for (var i = 0; i < view.canvasActiveCount; i++) {
        view.canvas[i].bind("mousemove", crossMoveInterval, this.crossMove);
    }

    //if the page is redraw， call it by controller.recall(). now, only new tick
    //redraw need to recall.
    this.controller.addIntervalEvent("crossMove", crossMoveInterval, true);
    $(document).bind("mouseover", function(e) {
        $("#plot_area").css("cursor", "default");
        if(e.target.id.indexOf("plot")==-1){
            for (var i = 0; i < view.canvasActiveCount; i++) {
                view.canvas[i].unbind("mousemove", _this.crossMove);
            }
            view.draw();
            _this.controller.removeIntervalEvent("crossMove");
            _this.clickByLiName($("#tool_list"), "none");
            $(document).unbind("mouseover");
        }
       
    });
}



ToolBar.prototype.crossMove = function(event) {
    var crossMoveInterval = event.data;
    var id = $(this).attr("id");
    var index = id.split("_").pop();
    index = index.substr(0, index.length - 1);
    index = parseInt(index);
    var x = event.pageX - $(this).offset().left;
    var y = event.pageY - $(this).offset().top;
    crossMoveInterval.setVal([x, y, index]);
}

ToolBar.prototype.period = function(obj) {
    var c =$.cookie('symbol');
    if ($(obj).find("a").length ==1) {
        var p = $.trim($(obj).text());
       $.cookie('period',p);
    } else {
        // $(obj).find("a").setAttribute('class','active');
        var elemt = obj.firstChild; 
        elemt.setAttribute('class', 'active');// obj拿到的是类似<li name="M1" class="period"><a href="#">M1</a></li>，所以需要拿到M1也就是a标签下的text
        var p = $.trim($(elemt).text());
        $.cookie('period',p);
         $.cookie('period',p);
    }
    // console.log("period:"+p)
    HTML5StockChartAPI.API.setPair(c, p);
    /* if (!c) {
         return; //没有意义，直接忽略
     } else {
         HTML5StockChartAPI.API.setPair("MAC", p);
     }*/
}
ToolBar.prototype.zoom = function(obj) {
    var name = obj.attr("name");
    if (name == "in") {
        this.controller.zoomIn();
    } else if (name == "out") {
        this.controller.zoomOut();
    }
}

ToolBar.prototype.style = function(obj) {
    var name = obj.attr("name");
    set_style(name);
    this.controller.draw();
}
ToolBar.prototype.findSymbolSelected = function(obj) {
    var text = "";

    $(obj).find("a").each(function() {
        if ($(this).attr("class") == "active") {
            text = $(this).attr("name");
        }

    })
    // console.log("findSymbolSelected:"+$.trim(text));
    return $.trim(text);
}

ToolBar.prototype.findSelected = function(obj) {
    var text = obj.find("li > strong").text();
    return $.trim(text);
}

ToolBar.prototype.addSelectEvent = function(obj, callback) {
    //获取li
    var _this = this;
    var _obj = obj.find("li");
    _obj.each(
        function() {
            var __callback = callback;
            var __obj = _obj;
            $(this).bind("click", _this,
                function(event) {
                    var _this = event.data;
                    __obj.each(
                        function() {
                            var text = $(this).text();
                            text = $.trim(text);
                            // $(this).html("<a href=\"javascript:void(0)\">" + text + "</a>");
                        }
                    );
                    $(this).html('<a class="active" >' + $.trim($(this).text()) + '</a>');
                    if (__callback) __callback.call(_this, $(this));
                }
            );
        }
    );
}

ToolBar.prototype.addClickEvent = function(obj, callback) {
    var _this = this;
    var _obj = obj.find("li");
    _obj.each(
        function() {
            var __callback = callback;
            $(this).bind("click", _this,
                function(event) {
                    var _this = event.data;
                    if (__callback) __callback.call(_this, $(this))
                }
            );
        }
    );
}

//select item , not trigger event.
ToolBar.selectItem = function(obj, name) {
    var __obj = obj.find("li");
    var _this = obj.find("li[name='" + name + "']");
    __obj.each(
        function() {
            var text = $(this).text();
            text = $.trim(text);
            $(this).html("<a href=\"javascript:void(0)\">" + text + "</a>");
        }
    );
    //alert(_this.length);
    $(_this).html('<a class="active">' + $.trim($(_this).text()) + '</a>');
}

//view 视图，负责绘制图形。
//控制器把从model 读取数据后，做处理完成。然后更新到view里面。
//view 再利用这些数据，绘制出图形，view 不能直接读取model 的数据。
//而是读取control 的数据，这样有一个中间的层次，便于扩展。
//view 没有c . p 的概念。每个图形的model都会有一个getData接口。
//每个图形的 view 都有一个setData 的接口。
//关于图形的显示格式。我想任何选项，包括view 包括 model的都通过
//更改config的形式来实现。对象本身只是读取配置，不提供更改接口。
//比如：view 的样式的修改。每次在之前会读取配置。
//比如：model改成静态图形了，也是类似的修改配置，就可以自动完成。
//在不同对象之间传递配置信息过于繁琐。我想直接读取配置是最好的方式。
//
function View(controller) {
    //当前的图像
    this.controller = controller;
    this.model = this.controller.model;
    this.config = Config.getInstance();
    this.plot_area = this.controller.plot_area;
    this.setPlotArea();
    this.canvas = [];
    this.canvasBG = [];
    this.canvasFront = [];
    this.canvasContainer = [];
    this.resize = [];
    this.grid = [];
    this.axis = [];

    //给每个canvas分配一个grid对象

    var main_axis = new Axis(null);

    for (var i = 0; i < this.config.Global.maxCanvasCount; i++) {
        var prefix = "#" + this.config.Global.canvasIDPerfix + i;
        var id = prefix + "2";
        var bg = prefix + "1";
        var front = prefix + "0";

        var id_div = "#" + this.config.Global.canvasIDPerfix + "div" + "_" + i;
        //canvas
        var tmp = $(id);
        if (!tmp) {
            continue;
        }
        if (!this.config.isIE6) {
            tmp.hide();
        }

        this.canvas.push(tmp);
        this.canvasBG.push($(bg).hide());
        this.canvasFront.push($(front).hide());
        this.canvasContainer.push($(prefix).hide());

        //resize
        var resize = $(id_div);
        resize.hide();
        this.resize.push(resize);

        if (i == 0) { //主图
            var axis_obj = main_axis;
        } else {
            var axis_obj = new Axis(main_axis);
        }
        this.axis.push(axis_obj);
        this.grid.push(new PlotGrid(this, i));
    }

    //设置宽度
    this.setWidth();
    this.setHeight();

    set_style();
    //主图被注册了
    this.canvasActiveCount = 1;
    //判断兼容性
    if (!check_textRender(this.canvas[0])) {
        //console.log('loading stroke text' + __baseurl__ + "js/strokeText.js");
        //include(__baseurl__ + "js/strokeText.js");
    }
    this.plot = {};
    this.plotindex = {};
    this.plotArea = {};
    this.plotArea[this.config.mainName] = true;
    this.viewconfig = [];

    //注册主图
    this.registerPlot(this.config.mainName, null, true, this.controller.ind[this.config.mainName].param);
}

View.prototype.deinit = function() {

}

View.prototype.setPlotArea = function(fixd) {
    if (this.plot_area != window) {
        var pa = $(this.plot_area);
        this.plotWidth = pa.attr("fw") ? pa.attr("fw") : pa.width();
        this.plotHeight = pa.attr("fh") ? pa.attr("fh") : pa.height();
        $("#plot_area").height(this.plotHeight);
        $("#plot_area").width(this.plotWidth);
        $("#plot_content").show();
        return;
    }
    if (!fixd) {
        fixd = {};
        fixd.x = 10;
        fixd.y = 3;
        if (this.config.browser == "ie" && this.config.bversion[0] >= 8) {
            fixd.y = 8;
        }
    }
    $("#plot_content").hide();
    this.plotWidth = $(this.plot_area).width() - fixd.x;
    this.offsetHeight = $("#plot_area").offset().top;
    this.plotHeight = $(this.plot_area).height() - this.offsetHeight - fixd.y;
    $("#plot_area").height(this.plotHeight + 1);
    $("#plot_area").width($(this.plot_area).width());
    if (this.plotWidth < 200) this.plotWidth = 200;
    if (this.plotHeight < 100) this.plotHeight = 100;
    $("#plot_content").show();
}

View.prototype.setWidth = function(w) {
    if (!w) {
        w = this.plotWidth;
    }
    for (var i = 0; i < this.config.Global.maxCanvasCount; i++) {
        set_width(this.canvas[i], w);
        set_width(this.canvasBG[i], w);
        set_width(this.canvasFront[i], w);
        set_width(this.resize[i], w);
        this.grid[i].setWidth(w);
    }
}

View.prototype.setHeight = function() {
    // console.log()
    for (var i = 0; i < this.config.Global.maxCanvasCount; i++) {
        set_height(this.canvas[i], 1);
    }
}

View.prototype.init = function() {
    //注册全局事件
    //resize 和 canvas 的事件放在grid中
    this.lastW = $(this.plot_area).width();
    this.lastH = $(this.plot_area).height();
    $(document).bind("keydown", this, this.keydown);
    $(document).bind("keyup", this, this.keyup);
    $(this.plot_area).bind("resize", this, this.resizeWindow);
    var _this = this;
    _this.wheelEvent = new IntervalEvent(3,
        function(controller) {
            var mainName = controller.config.mainName;
            var one = controller.view.plot[mainName].getOneSize();
            var offset = Math.round(-this.value * 40 / one);
            controller.startOffset(offset);
            controller.draw();
        }
    );
    this.controller.addIntervalEvent("wheelEvent", _this.wheelEvent);
    var wheelobj;
    if (this.plot_area == window) {
        wheelobj = document;
    } else {
        wheelobj = this.plot_area;
    }
    $(wheelobj).mousewheel(
        function(event, delta)
        {
            var e =  window.event||event;
            console.log("滚轮事件："+e)
            if (e.wheelDelta == 120) {
                _this.controller.zoomIn();
                return true;
            } else if (e.wheelDelta == -120) {
                _this.controller.zoomOut();
                return true;
            }
            if (e.detail == -3) {
                _this.controller.zoomIn();
                return true;
            } else if (e.detail == 3) {
                _this.controller.zoomOut();
                return true;
            }
             if (e.originalEvent.deltaY == -3) {
                _this.controller.zoomIn();
                return true;
            } else if (e.originalEvent.deltaY == 3) {
                _this.controller.zoomOut();
                return true;
            }

            //return false;
        }
    );
    //注册十字光标事件

}

View.prototype.registerPlot = function(name, index, has_plot_area, param) {
    if (this.config[name] && !this.plot[name]) {
        var Plot = this.config[name].plot;
        var index = this.getCanvas(name, index);
        this.plot[name] = new Plot(this, this.grid[index], name);
        if (param) this.plot[name].setParam(param);
        if(index==0){
            this.canvas[index].css('display', 'block');
            this.canvasBG[index].css('display', 'block');
            this.canvasFront[index].css('display', 'block');
            // this.canvas[index].css('padding-top', '60px');
            // this.canvasBG[index].css('padding-top', '60px');
            // this.canvasFront[index].css('padding-top', '60px');
            
        }
        else{
            this.canvas[index].css('display', 'block');
            this.canvasBG[index].css('display', 'block');
            this.canvasFront[index].css('display', 'block');
            //  this.canvas[index].css('padding-top', '10px');
            // this.canvasBG[index].css('padding-top', '10px');
            // this.canvasFront[index].css('padding-top', '10px');
        }
        
        this.canvasContainer[index].css('display', 'block');
        this.resize[index].show();
        this.plotindex[name] = index;
        if (has_plot_area) {
            this.plotArea[name] = has_plot_area;
        }
        this.grid[index].addPlot(name, this.plot[name]);
        this.setLast();
    }
}

View.prototype.isSeperatePlot = function(name) {
    if (!this.config.Global.View[name]) {
        return null;
    }
    return this.config.Global.View[name].sep;
}

View.prototype.setLast = function() {
    for (var i = 0; i < this.canvasActiveCount; i++) {
        this.grid[i].clearLast();
    }
    this.grid[this.canvasActiveCount - 1].setLast();
}

View.prototype.unregisetPlot = function(name) {
    this.plot[name] = null;
    this.plotindex[name] = null;
    this.setLast();
    var index = this.plotindex[name];
    this.grid[index].removePlot(name);
}

View.prototype.draw = function() {
    //draw grid
    //绘制Y轴
    for (var i = 0; i < this.canvasActiveCount; i++) {
        if (is_object(this.grid[i])) {
            if (this.data[i].axis.y.axis) {
                this.grid[i].drawBg();
                this.grid[i].drawY();
                this.grid[i].drawX(this.axis[0]);
                //画canvas分割折线
                var ctx = this.grid[i].ctx;
                if(i != this.canvasActiveCount - 1){
                drawLever(ctx,this.grid[i].xEnd.x-20,this.grid[i].yEnd.y-2,'#999',10,10);
                drawLever(ctx,this.grid[i].xEnd.x-20,this.grid[i].yEnd.y+2,'#999',10,-10); 
                }
                
                //绘制底部线条
                // this.grid[i].drawLine(this.ctx, data.x, data.y, color);
                //this.grid[i].drawBoder(this.axis[0]);
            } else {
                this.grid[i].drawBg();
                this.grid[i].drawX(this.axis[0]);
                 // drawLever(ctx,this.grid[i].xEnd.x,this.grid[i].yEnd.y,'#999',10,10);
                //绘制底部线条
                //this.grid[i].drawBoder(this.axis[0]);
            }
        }
        if (i == this.canvasActiveCount - 1) {
            //画线
            //绘制底线没有其他图层了画线
            var ctx = this.grid[i].ctx;
            ctx.beginPath();
            ctx.moveTo(this.grid[i].O.x, this.grid[i].yEnd.y+20 - this.grid[i].O.y);
            ctx.lineTo(this.grid[i].xEnd.x, this.grid[i].yEnd.y+20 - this.grid[i].O.y);
            ctx.closePath();
            ctx.lineWidth = 0.3;
            ctx.strokeStyle = "#fff";
            ctx.stroke();

        }
    }


    //绘制x。目前，x只需要绘制最后一个图形x轴部分
    //开始绘制每个图形
    for (i = 0; i < this.data.length; i++) {
        var plot = this.data[i].data;
        var text = "";
        for (var key in plot) {
            if (is_object(plot[key])) {
                //坐标轴的选项对绘图中的 转换是有用的。在通过数字 转换
                //成固定格式的数据的时候非常有用。比如时间转换，4舍五入等。
                if (plot[key].x && plot[key].x.length > 0) {
                    this.plot[key].draw(plot[key]);
                    //顶部内容 update by fangxiao from 2016/6/29/17:47
                    //  text += "[" + this.plot[key].getShowName() + " " + this.plot[key].lastDataShow() + "] ";
                }
            }
        }
        if (text.length > 0) {
            //  console.log(text);
            this.grid[i].writeHeadText(text);
        }
    }
}

//获取坐标轴的配置:
//
//1.附图，那么要和主图对应，这样时间应该是通过查询产生的。所以，不需要提供配置。
//2.计算x轴，完全是利用主图的配置，这样计算主图的配置就可以了。
//
View.prototype.getAxisConfig = function() {
    var one = this.plot[this.config.mainName].getOneSize(); //获取一个点占用的点数
    var nx = this.config.Global.View[this.config.mainName].NXPixel; //x轴的数目推荐坐标的数目
    var ny = this.config.Global.View[this.config.mainName].NYPixel; //x轴的数目推荐坐标的数目
    var viewconfig = [];
    for (var i = 0; i < this.canvasActiveCount; i++) {
        if (is_object(this.grid[i])) {
            viewconfig[i] = {};
            var area = this.grid[i].getPlotArea();
            var plotnum = Math.ceil((area.x.beg - area.x.end) / one);
            viewconfig[i].plotnum = plotnum;
            viewconfig[i].one = one;
            viewconfig[i].x = {};
            viewconfig[i].x.n = Math.round((area.x.beg - area.x.end) / nx);
            viewconfig[i].x.beg = area.x.beg;
            viewconfig[i].x.end = area.x.end;
            viewconfig[i].y = {};
            viewconfig[i].y.n = Math.round((area.y.beg - area.y.end) / ny);
            viewconfig[i].y.beg = area.y.beg;
            viewconfig[i].y.end = area.y.end;
        }
    }
    for (var key in this.plotindex) {
        var index = this.plotindex[key];
        if (index === null) continue;
        if (!viewconfig[index]) continue;
        if (typeof viewconfig[index].plot === "undefined") viewconfig[index].plot = [];
        viewconfig[index].plot.push(key);
    }
    this.viewconfig = viewconfig;
    return viewconfig;
}

View.prototype.getAxis = function(name) {
    var index = this.plotindex[name];
    return this.axis[index];
}

View.prototype.getCanvas = function(name, index) {

    //为指标和主函数分配canvas.
    var plotconfig = this.config.Global.View;
    //判断是否要增加canvas
    if (name == this.config.mainName) {
        this.grid[0].setHeight(this.plotHeight);
    }
    if ((typeof index !== "undefined") && index !== null && index < this.canvasActiveCount) {
        return index;
    }

    if (!plotconfig[name] || !plotconfig[name].sep) {
        return 0;
    }
    var h = this.getUnitHeight(name);
    // console.log("getUnitHeight:"+h);
    var index = this.setExistPlotHeight(h);
    // console.log("getUnitHeight:"+h * plotconfig[name].height);
    this.grid[index++].setHeight(h * plotconfig[name].height);
    this.canvasActiveCount = index;
    return index - 1;
}

//设置已经存在的图像的高度
View.prototype.setExistPlotHeight = function(unit_h) {
        //设置所有的canvas 的高度为0
        var plotconfig = this.config.Global.View;
        for (i = 0; i < this.grid.length; i++) {
            this.grid[i].setHeight(1);
        }
        this.grid[0].setHeight(unit_h);
        var index = 1;
        //返回新加入名称的canvas
        for (var key in this.plot) {
            if (is_object(this.plot[key])) {
                if (key == this.config.mainName) continue; //主图, 直接pass
                if (!plotconfig[key]) continue; //没有配置，直接pass
                if (plotconfig[key].sep) { //分离
                    // console.log("unit_h * plotconfig[key].height:"+unit_h * plotconfig[key].height)
                    this.grid[index++].setHeight(unit_h * plotconfig[key].height);
                }
            }
        }
        return index;
        //新图加在末尾
    }
    //新家图像
View.prototype.getUnitHeight = function(newname) {
    var x = 1;
    var plotconfig = this.config.Global.View;
    for (var key in this.plot) {
        if (is_object(this.plot[key])) {
            if (key == this.config.mainName) continue; //主图, 直接pass
            if (!plotconfig[key]) continue; //没有配置，直接pass
            if (!this.plotArea[key]) {
                continue;
            }
            if (plotconfig[key].sep) { //分离
                x += plotconfig[key].height;
            }
        }
    }
    if (newname) {
        x += plotconfig[newname].height;
    }
    var h = this.plotHeight * (1 / x);
    return h;
}

View.prototype.clearData = function() {
    this.data = [];
    //清除原来的main值
    this.axis[0].main = null;
    for (var i = 0; i < this.canvasActiveCount; i++) {
        this.axis[i].clearData();
    }
}

View.prototype.updateData = function(data, index) {
    var axis = this.axis[index];
    axis.setViewConfig(this.viewconfig[index]);
    axis.setData(data);
    this.data[index] = axis.getData();
}

//这里的PlotGrid 的名字是暂时使用的，具体什么名字还没有取好
//因为事件主要是在plotgrid中处理，所以，我用了这个名字
View.prototype.keydown = function(event) {
    var _this = event.data;
    PlotGrid.setMoveInterval("key", _this.grid[0]);
    debug("keydown");
    if (event.keyCode == Key.KEY_NEXT) {
        var offset = _this.controller.startSet("Next");
        PlotGrid.moveQueue.push(offset);
        return false;
    } else if (event.keyCode == Key.KEY_PREV) {
        var offset = _this.controller.startSet("Prev");
        PlotGrid.moveQueue.push(offset);
        return false;
    } else if (event.keyCode == Key.KEY_PAGE_DOWN) {
        var offset = _this.controller.startSet("PageDown");
        PlotGrid.moveQueue.push(offset);
        return false;
    } else if (event.keyCode == Key.KEY_PAGE_UP) {
        var offset = _this.controller.startSet("PageUp");
        PlotGrid.moveQueue.push(offset);
        return false;
    } else if (event.keyCode == Key.KEY_HOME) {
        var offset = _this.controller.startSet("Home");
        PlotGrid.moveQueue.push(offset);
        return false;
    } else if (event.keyCode == Key.KEY_END) {
        var offset = _this.controller.startSet("End");
        PlotGrid.moveQueue.push(offset);
        return false;
    } else if (event.keyCode == Key.KEY_UP) {
        _this.controller.zoomIn();
        return false;
    } else if (event.keyCode == Key.KEY_DOWN) {
        _this.controller.zoomOut();
        return false;
    }
}

View.prototype.keyup = function(event) {
    debug("keyup");
    var _this = event.data;
    PlotGrid.clearMoveInterval(_this.grid[0]);
}

View.prototype.resizeGrid = function(offset, index) {
    debug("set resize offset " + offset);
    if (offset == 0) return;
    var grid1 = this.grid[index];
    var grid2 = this.grid[index + 1];
    // if(index==0){
    //    var margin1 = grid1.marginTop[grid1.TOP] + grid1.marginTop[grid1.BOTTOM];
    //    var margin2 = grid2.marginTop[grid2.TOP] + grid2.marginTop[grid2.BOTTOM]; 
    // }else{
    //     var margin1 = grid1.margin[grid1.TOP] + grid1.margin[grid1.BOTTOM];
    //     var margin2 = grid2.margin[grid2.TOP] + grid2.margin[grid2.BOTTOM];
    // }
    var margin1 = grid1.margin[grid1.TOP] + grid1.margin[grid1.BOTTOM];
        var margin2 = grid2.margin[grid2.TOP] + grid2.margin[grid2.BOTTOM];
    if (!grid1 || !grid2) return;
    if (offset > 0 && grid2.height - margin2 - offset <= 5) {
        offset = grid2.height - 5 - margin2;
    }
    if (offset < 0 && grid1.height - margin1 + offset <= 5) {
        offset = -(grid1.height - 5 - margin1);
    }
    grid1.setHeight(grid1.height + offset);
    grid2.setHeight(grid2.height - offset);
}

View.prototype.resizeWindow = function(e) {
    var _this = e.data;
    if (!_this.lastW) {
        return;
    }
    if (_this.lastW == $(window).width() && _this.lastH == $(window).height()) {
        return;
    }
    //debugx("resize0: " + _this.lastW + "," +  _this.lastH);
    //debugx("resize1: " + $(window).width() + "," + $(window).height());
    _this.setPlotArea();
    _this.setWidth();
    //_this.setExistPlotHeight(_this.getUnitHeight());
    //debugx("resize2: " + $(window).width() + "," + $(window).height());
    //保存最新的window值
    _this.lastW = $(window).width();
    _this.lastH = $(window).height();
    _this.controller.draw();
}

function Win(title, width, height, opt) {
    this.title = title;
    this.width = width ? width : 400;
    this.height = height ? height : 300;
    if (!opt) opt = {};
    this.autoclose = opt.autoclose ? opt.autoclose : 0;
    this.left = opt.left ? opt.left : -1; //-1表示默认向左，其实就是窗口居中
    this.top = opt.top ? opt.top : -1; //top 的意义和 left相同
    this.config = Config.getInstance();
    this.tpl = $(this.config.Global.WinTplID);
    this.cache = {};
}
Win.zindex = 1000;

Win.prototype.getHtml = function() {
    var html = this.tpl.html();
    html = html.replace("{|$title|}", this.title);
    html = html.replace("{|$autoclose|}", this.autoclose);
    return html;
}

Win.prototype.createWindow = function(targetID) {
    if ($("#" + targetID).length) {
        return;
    }
    this.conf = this.config.Global.Win[targetID];
    var html
    var newhtml
    if (targetID == "__order__") {
        this.win = $("<div id='" + targetID + "'> </div><input type=\"hidden\" id=\"ordershow\" value=\"0\" />");
        html = this.getHtml();
        newhtml = html.replace("class=\"content\">", "id='popwin' class=\"content\">");
    } else {
        this.win = $("<div id='" + targetID + "'> </div>");
        newhtml = this.getHtml();
    }
    this.targetID = targetID;
    $("body").append(this.win);

    this.win.html(newhtml);
    this.dragArea = this.getClassQuery("popTop");
    this.win.dragdrop(this.dragArea);
    this.setWidth(this.width).setHeight(this.height);
    this.win.css("position", "absolute");
    this.win.css("z-index", Win.zindex);
    this.setPotion();
    Win.zindex++;
    this.addTab();
    this.addEvent();
    this.clickFirst(this.getClassQuery("cc"));
    this.win.hide();
}

Win.prototype.addTab = function() {
    var query = this.getClassQuery("cc");
    query = $(query);
    for (var key in this.conf.tab) {
        if (typeof this.conf.tab[key] == "string") {
            query.append('<li name="' + key + '"><a href="javascript:;">' + this.conf.tab[key] + '</a></li>');
        }
    }
}

Win.prototype.clickFirst = function(query) {
    query = $(query);
    query.children().first().click();
}

Win.prototype.setPotion = function() {
    if (this.top == -1) {
        var top = Math.max(0, ($(window).height() - this.height) / 2);
    }
    if (this.left == -1) {
        var left = Math.max(0, ($(window).width() - this.width) / 2);
    }
    this.win.css("top", top + "px");
    this.win.css("left", left + "px");
}

Win.prototype.setWidth = function(w) {
    var mainContainer = this.getClassQuery("windowBody");
    $(mainContainer).width(w);
    return this;
}

Win.prototype.setHeight = function(h) {
    var mainContainer = this.getClassQuery("windowBody");
    $(mainContainer).height(h);
    return this;
}

Win.prototype.getClassQuery = function(classname) {
    var targetID = this.targetID;
    if (targetID.charAt(0) != "#") {
        targetID = "#" + this.targetID
    }
    if (classname.charAt(0) != ".") {
        classname = " ." + classname;
    }
    var query = targetID + classname;
    return query
}

Win.prototype.show = function() {
    this.win.show();
    this.win.css("z-index", Win.zindex++);
}

Win.prototype.addEvent = function() {
    //close
    var query = this.getClassQuery("adel");
    var _this = this;
    $(query).click(
        function() {
            $("#tool_dl").find("li[name=none]").click();
            _this.win.hide();
        }
    );

    //tab
    var query = this.getClassQuery("cc");
    var _this = this;
    $(query).children().click(function(e) {
        $(query).children().removeClass("current");
        $(this).addClass("current");
        if (_this.load) {
            _this.load($(this).attr("name"));
        }
    });
}

function WinAjax(name, title, width, height, opt) {
    sup(this, title, width, height, opt);
}

ClassExtend(WinAjax, Win);

WinAjax.prototype.load = function(name, flag) {
    //这里可以根据name 做一些特殊的处理。
    //但是，目前，我们采用的是 ajax 从服务器下载相关的配置
    this.tab = name;
    this.flag = flag;
    var query = this.getClassQuery("content");
    if (this.cache[name + flag]) {
        $(query).html(this.cache[name + flag]);
        return;
    }
    var api
    if (name == "order") {
        api = this.config.Global.WinOrder;
    } else {
        api = this.config.Global.WinAPI;
    }


    var _this = this;
    if (this.ajax) {
        this.ajax.abort();
    }
    var param = { win: this.targetID, tab: name, __tmp: Math.random() };
    if (this.flag) {
        param.flag = this.flag;
    }
    if (name == "order") {
        this.ajax = $.get(api, function(data) {
            //_this.cache[data.tab + data.flag] = data.data;
            $(query).html(data);

        }, "html");
    } else {
        this.ajax = $.get(api, param, function(data) {
            _this.cache[data.tab + data.flag] = data.data;
            $(query).html(data.data);
        }, "jsonp");

    }
}

function ShapeArrow(ctx, width, height, opt) {
    sup(this, ctx, width, height, opt);
}

ClassExtend(ShapeArrow, Shape);

ShapeArrow.prototype.arrowhalf = function(ctx, width, height) {
    var pi = Math.PI;
    ctx.save();
    ctx.translate(0, -height);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    var head = (0.618) * height;
    ctx.lineTo(width, head);
    if (width <= 3) {
        var add = 3;
    } else {
        var add = width / 0.618;
    }
    ctx.lineTo(width + add, head - width * Math.tan(pi / 3));
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}

ShapeArrow.prototype.basic_arrow = function(ctx, width, height) {
    ctx.save();
    this.arrowhalf(ctx, width, height);
    ctx.transform(-1, 0, 0, 1, 0, 0);
    this.arrowhalf(ctx, width, height);
    ctx.restore();
}

//箭头的定位在于两个方面。一个方面是旋转的角度，一个是箭头指向的位置
ShapeArrow.prototype.draw = function(point) {
    var ctx = this.ctx;
    var cta = this.cta;
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate(cta);
    ctx.strokeStyle = this.boder;
    ctx.fillStyle = this.fill;
    this.basic_arrow(ctx, this.width, this.height);
    ctx.restore();
}

function PlotAdvFractals(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(PlotAdvFractals, Plot);

PlotAdvFractals.prototype.draw = function(data) {
    var color;
    if (this.param.lineColor) {
        color = this.param.lineColor;
    } else {
        color = this.conf.lineColor;
    }
    /* for(var i = 0 ;i<data.x.length ;i++){
       if(data.y[i][0] ==-1){
           writeText(this.ctx, new Point(data.x[i] , data.y[i][1]+12), "d", color[0], this.param.font);
        }else if(data.y[i][0] == 1){
           writeText(this.ctx, new Point(data.x[i] , data.y[i][1]-12), "u", color[1], this.param.font);
        } 
    }*/
    var y1 = []
    for (var i = 0; i < data.y.length; i++) {
        y1[i] = data.y[i][1];
    }
    drawLine(this.ctx, data.x, y1, color[0]);
}

function Plotadx(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(Plotadx, Plot);

Plotadx.prototype.draw = function(data) {
    var color;
    if (this.param.lineColor) {
        color = this.param.lineColor;
    } else {
        color = this.conf.lineColor;
    }
    var y1 = []
    var y2 = []
    var y3 = []
    for (var i = 0; i < data.y.length; i++) {
        y1[i] = data.y[i][0];
        y2[i] = data.y[i][1];
        y3[i] = data.y[i][2];
    }
    drawLine(this.ctx, data.x, y1, color[0]);
    drawLine(this.ctx, data.x, y2, color[1]);
    drawLine(this.ctx, data.x, y3, color[2]);
}




function Plotatr(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(Plotatr, Plot);

Plotatr.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.color) {
        color = this.param.color;
    } else {
        color = this.conf.lineColor;
    }
    var y1 = []
    var y2 = []
    for (var i = 0; i < data.y.length; i++) {
        y1[i] = data.y[i][0];
        y2[i] = data.y[i][1];
    }
    drawLine(this.ctx, data.x, y1, color[0]);
    drawLine(this.ctx, data.x, y2, color[1]);
}


function Plotbdensity(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(Plotbdensity, Plot);

Plotbdensity.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.lineColor) {
        color = this.param.lineColor;
    } else {
        color = this.conf.lineColor;
    }

    for (var i = 0; i < data.y.length; i++) {
        if (data.y[i][2] != 0) {
            writeText(this.ctx, new Point(data.x[i], data.y[i][0]), "~", color[0], this.param.font)
            writeText(this.ctx, new Point(data.x[i], data.y[i][1]), "*", color[0], this.param.font)
        }
        if (data.y[i][6] != 0) {
            writeText(this.ctx, new Point(data.x[i], data.y[i][4]), "~", color[1], this.param.font)
            writeText(this.ctx, new Point(data.x[i], data.y[i][5]), "*", color[1], this.param.font)
        }
        if (data.y[i][10] != 0) {
            writeText(this.ctx, new Point(data.x[i], data.y[i][8]), "~", color[2], this.param.font)
            writeText(this.ctx, new Point(data.x[i], data.y[i][9]), "*", color[2], this.param.font)
        }
    }
}

function PlotBolling(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(PlotBolling, Plot);

PlotBolling.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.color) {
        color = this.param.color.split("-");
    } else {
        color = this.conf.lineColor;
    }
    var y1 = []
    var y2 = []
    var y3 = []
    for (var i = 0; i < data.y.length; i++) {
        y1[i] = data.y[i][0];
        y2[i] = data.y[i][1];
        y3[i] = data.y[i][2];
    }
    drawLine(this.ctx, data.x, y1, color[0]);
    drawLine(this.ctx, data.x, y2, color[1]);
    drawLine(this.ctx, data.x, y3, color[2]);
}


function PlotBollingDesity(view, grid, name) {
    sup(this, view, grid, name);
    this.color = ["red", "rgb(255, 128, 128)", "red", "rgb(255, 128, 128)",
        "green", "rgb(128, 255, 128)", "green", "rgb(128, 255, 128)",
        "yellow", "rgb(128, 255, 128)", "yellow", "rgb(128, 255, 128)",
        "Cyan", "Cyan",
        "Blue", "Blue",
        "Fuchsia", "Fuchsia",
    ];
}

ClassExtend(PlotBollingDesity, Plot);

PlotBollingDesity.prototype.draw = function(data) {
    this.X = data.x;
    this.Y = data.y;
    this.setMaxMinDesity();
    this.getPlotArea();
    this.box = this.view.plot[this.config.mainName].getBoxSize();
    this.left = this.view.plot[this.config.mainName].getBoxLeft();
    for (var i = 0; i < this.X.length; i++) {
        this.drawOne(this.X[i], this.Y[i]);
    }
}

PlotBollingDesity.prototype.setMaxMinDesity = function() {
    var min = Infinity
    var max = -Infinity;
    var y = this.Y;
    for (var i = 0; i < y.length; i++) {
        for (var j = 1; j < y.length; j += 2) {
            if (y[i][j] == -1) {
                continue;
            }
            if (max < y[i][j]) {
                max = y[i][j];
            }

            if (min > y[i][j]) {
                min = y[i][j]
            }
        }
    }
    this.maxD = max;
    this.minD = min;
}

PlotBollingDesity.prototype.drawOne = function(time, data) {
    var price, desity, color, left, top;
    try {
        for (var i = 0; i < 16; i += 2) {
            price = data[i];
            if (price == -1 || data[i + 1] == -1) {
                continue;
            }
            desity = this.getDesity(data[i + 1]);
            color = this.color[i / 2];
            this.ctx.fillStyle = color;
            left = time - this.left;
            top = price - desity;
            if (top < this.top || top > this.bottom) {
                continue;
            }
            this.ctx.fillRect(left, top, this.box, desity);
        }
    } catch (e) {}
}

PlotBollingDesity.prototype.getDesity = function(d) {
    return (Math.floor(((d - this.minD) / (this.maxD - this.minD)) * 6) + 1);
}

PlotBollingDesity.prototype.lastDataShow = function() {
    var data = this.lastData();
    var newdata = [];
    for (var i = 0; i < data.length; i += 2) {
        newdata[i / 2] = data[i];
    }
    return newdata;
}

function PlotCandle(view, grid, name) {
    sup(this, view, grid, name);
    //放大缩小尺寸控制更加灵活。采用配置数组的形式
     this.box = [1, 2, 3, 5, 7, 9, 11, 13];
    this.space = [0, 1, 1, 2, 2, 3, 4, 5];
    this.left = [0, 1, 1, 2, 3, 4, 5, 6]
    // this.box = [ 7, 9, 11, 13,15,18,21,23];
    // this.space = [ 2, 3, 4, 5,6,8,9,10];
    // this.left = [ 3, 4, 5, 6,7,9,10,11]
    // this.box   = [3, 5, 9, 13, 17, 19, 23, 25];
    // this.space = [1, 2, 3, 5, 7, 8, 10, 11];
    // this.left  = [1, 2, 4, 6, 8, 9, 11, 12]
}

ClassExtend(PlotCandle, Plot);

PlotCandle.prototype.zoomIn = function() {
    if (this.conf.box_pixel >= 7 && this.conf.space_pixel >= 7) {
        return;
    }
    if (this.conf.box_pixel < this.conf.space_pixel) {
        this.conf.box_pixel++;
    } else if (this.conf.box_pixel > this.conf.space_pixel) {
        this.spaceOffset(1);
    } else {
        this.conf.box_pixel++;
    }
}

PlotCandle.prototype.spaceOffset = function(offset) {
    var prev = this.space[this.conf.space_pixel];
    this.conf.space_pixel = this.conf.space_pixel + offset;
    var current = this.space[this.conf.space_pixel];
    if (prev == current) {
        this.conf.box_pixel = this.conf.box_pixel + offset;
    }
}

PlotCandle.prototype.zoomOut = function() {
    if (this.conf.box_pixel <= 0 && this.conf.space_pixel <= 0) {
        return;
    }
    if (this.conf.box_pixel < this.conf.space_pixel) {
        this.spaceOffset(-1);
    } else if (this.conf.box_pixel > this.conf.space_pixel) {
        this.conf.box_pixel--;
    } else {
        this.spaceOffset(-1);
    }
    this.conf.box_pixel = this.conf.box_pixel < 0 ? 0 : this.conf.box_pixel;
}

PlotCandle.prototype.getOneSize = function() {
    return this.box[this.conf.box_pixel] + 2*this.space[this.conf.space_pixel];
}

PlotCandle.prototype.getBoxLeft = function() {
    return this.left[this.conf.box_pixel];
}

PlotCandle.prototype.getBoxSize = function() {
    return this.box[this.conf.box_pixel];
}

PlotCandle.prototype.draw = function(data) {
    this.data = data;
    this.X = data.x;
    this.Y = data.y;
    this.xunit = this.data.xunit;
    this.yunit = this.data.yunit;
    this.closePriceFlag();
    var width = this.box[this.conf.box_pixel];
    var left = this.left[this.conf.box_pixel];
    if (width > 2) {
        width--;
    }
    this.config.Global.boxwidth = width;
    //最高最低点标签
    var maxy=this.Y[this.data.maxIndex][1]-5;
    var miny=this.Y[this.data.minIndex][2]+15;
    writeText(this.ctx,new Point(this.X[this.data.maxIndex],maxy),parseFloat(this.data.maxY).toFixed(3), "#ff6600", "#fff");
    writeText(this.ctx,new Point(this.X[this.data.minIndex],miny),parseFloat(this.data.minY).toFixed(3), "#ff6600", "#fff");
    //画个分界线

    for (var i = 0; i < this.X.length; i++) {

        this.drawOne(this.X[i], this.Y[i], width, left);
        // var ohlc=this.Y[i];
        // var maxy=parseFloat(GetText(ohlc[1],this.yunit)).toFixed(3);
        // var miny=parseFloat(GetText(ohlc[2],this.yunit)).toFixed(3); 
        // if(maxy==this.data.maxY){
        //      writeText(this.ctx, new Point(this.X[i] + this.conf.ledgeLen + 2, this.Y[i]), this.data.maxY, this.conf.fontColor, this.conf.font);
        // }
        // if(miny==this.data.minY){
        //     writeText(this.ctx, new Point(this.X[i] + this.conf.ledgeLen + 2, this.Y[i]), this.data.maxY, this.conf.fontColor, this.conf.font);
        // }
    }
    //console.log(data.text);
}

//按照道理，这些数据都应该是计算好了之后，
//会送给客户端的。这个部分，还是要对数据层进行改进
//才能比较好的封装。现在暂时这样处理。
PlotCandle.prototype.closePriceFlag = function() {
    //view 一般不调用model的数据。因为，这样使得view 和 model层直接联系起来。
    //但是，我们知道，我们的Controller 是一般性的分发。
    //而且这样的一般性的分发在大多数情况下面是够用的。
    //出于这样的考虑，我们允许在view里面调用model，因为，的确很多时候需要这样的调用。
    //每个图都有对应的 model plot

    var close_price = this.view.model.getDataReader(this.name).close(0);
    this.priceFlag(close_price, this.conf.close);
}

PlotCandle.prototype.over = function(x, y) {
    //查找最接近的
   // console.log("1");
    if (!this.X || !this.Y) return;
    var index = find_near(this.X, x);
    if (index == -1) return false;
    if (Math.abs(this.X[index] - x) > this.getOneSize()) {
        return false;
    }
    var ohlc = this.Y[index];

    // console.log("text PlotCandle");
    //找到此金额的y轴坐标
    //if (ohlc[Data.HIGH] - this.config.Global.overPadding <= y && ohlc[Data.LOW] + this.config.Global.overPadding >= y) {
        var findTime = this.axis.getXValue(x, PlotGrid.NEAR);
        if (findTime === false) return;
        var cdata = this.view.model.getDataByTime(this.name, findTime, "candle");
        if (!cdata) return false;
        var time = cdata.time;
        var ohlc = cdata.data;
        var yunit = this.axis.viewconfig.y.axis_option.unit;
        var fallOrDegrees = parseFloat(GetText(ohlc[Data.CLOSE], yunit) - GetText(ohlc[Data.OPEN], yunit)) / parseFloat(GetText(ohlc[Data.OPEN], yunit));
        var fallOrDegrees = fallOrDegrees.toFixed(3);
        
        $(".freetimebox li:first-child").text("时间:"+time);
        $(".freetimebox li:nth(1)").text("开:"+GetText(ohlc[Data.OPEN], yunit));
        $(".freetimebox li:nth(2)").text("高:"+GetText(ohlc[Data.HIGH], yunit));
        $(".freetimebox li:nth(3)").text("低:"+GetText(ohlc[Data.LOW], yunit));
        $(".freetimebox li:nth(4)").text("收:"+GetText(ohlc[Data.LOW], yunit));
        $(".freetimebox li:nth(4)").text("收:"+GetText(ohlc[Data.CLOSE], yunit));
        $(".freetimebox li:nth(5)").text("涨幅:"+fallOrDegrees);
        $(".freetimebox li:nth(6)").text("振幅:"+fallOrDegrees);
        $(".freetimebox li:nth(7)").text("量:"+GetText(ohlc[Data.VOLUMES], yunit));
         $('.freetimebox').show();
        //timeLine Data
        // timelineData(time, GetText(ohlc[Data.OPEN], yunit), GetText(ohlc[Data.HIGH], yunit), GetText(ohlc[Data.LOW], yunit), GetText(ohlc[Data.CLOSE], yunit), GetText(ohlc[Data.VOLUMES], yunit));
      //  console.log("text PlotCandle");
       // return time + "<br/>" + "O: " + GetText(ohlc[Data.OPEN], yunit) + "<br />" + "H: " + GetText(ohlc[Data.HIGH], yunit) + "<br />" + "L : " + GetText(ohlc[Data.LOW], yunit) + "<br />" + "C: " + GetText(ohlc[Data.CLOSE], yunit) + "<br />" + "V: " + GetText(ohlc[Data.VOLUMES], yunit) + "<br />";
   // } else {
   //     return false;
   // }
}

PlotCandle.prototype.drawOne = function(time, ohlc, width, left) {
    var ctx = this.ctx;
    var open = ohlc[Data.OPEN];
    var high = ohlc[Data.HIGH];
    var low = ohlc[Data.LOW];
    var close = ohlc[Data.CLOSE];
    time += 0.5;
    open += 0.5;
    high += 0.5;
    low += 0.5;
    close += 0.5;
    if (high == low) {
        //画个横线就可以了
        ctx.strokeStyle = this.conf.os_border_color;
        ctx.beginPath();
        ctx.moveTo(time - left, open);
        ctx.lineTo(time + width, open);
        ctx.stroke();
        return;
    }
    if (open < close) {
        var up = open;
        var down = close;
        var fill = this.conf.open_big_color;
        var border = this.conf.ob_border_color;
    } else {
        var up = close;
        var down = open;
        var fill = this.conf.open_small_color;
        var border = this.conf.os_border_color;
    }
    ctx.strokeStyle = border;
    ctx.beginPath();
    ctx.moveTo(time, high);
    ctx.lineTo(time, low);
    ctx.stroke();
    if (this.conf.space_pixel > 0) {
        ctx.fillStyle = fill;
        ctx.fillRect(time - left, up, width, down - up);
        ctx.strokeRect(time - left, up, width, down - up);
    }
}


function PlotFractals(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(PlotFractals, Plot);

PlotFractals.prototype.draw = function(data) {
    var color;
    if (this.param.lineColor) {
        color = this.param.lineColor;
    } else {
        color = this.conf.lineColor;
    }
    /* for(var i = 0 ;i<data.x.length ;i++){
       if(data.y[i][0] ==-1){
           writeText(this.ctx, new Point(data.x[i] , data.y[i][1]+12), "d", color[0], this.param.font);
        }else if(data.y[i][0] == 1){
           writeText(this.ctx, new Point(data.x[i] , data.y[i][1]-12), "u", color[1], this.param.font);
        } 
    }*/
    var y1 = []
    for (var i = 0; i < data.y.length; i++) {
        y1[i] = data.y[i][1];
    }
    drawLine(this.ctx, data.x, y1, color[0]);
}

//grid 是一个令人纠结的类，他是图形的一部分，各种图形都在grid上进行绘制
function PlotGrid(view, index) {
    this.TOP = 0;
    this.RIGHT = 1;
    this.BOTTOM = 2;
    this.LEFT = 3;

    this.index = index;
    this.view = view;
    this.axis = this.view.axis[index];
    this.canvas = $(this.view.canvas[index]);
    this.canvasBG = $(this.view.canvasBG[index]);
    this.canvasFront = $(this.view.canvasFront[index]);
    this.canvasContainer = $(this.view.canvasContainer[index]);

    this.resize = this.view.resize[index];
    this.controller = this.view.controller;
    this.plot = [];

    if (!this.canvas.get(0).getContext) {
        //debug(Alert(this.canvas.get(0)));
        $("#flash_notify").show();
        alert("not support flash or html5");
    }
    this.ctx = this.canvas.get(0).getContext('2d');
   
    this.ctxBG = this.canvasBG.get(0).getContext('2d');
    this.ctxFront = this.canvasFront.get(0).getContext('2d');
   // if(index==0){
   //  this.height = this.canvas.get(0).height-60;
   // }
   // else{
   //  this.height = this.canvas.get(0).height-10;
   // }
    this.width = this.canvas.get(0).width;
    this.height = this.canvas.get(0).height;
    
    // var img=document.getElementById("myCanvas");
    // this.ctx.drawImage(pic,0,0,this.width, this.height);  
    this.config = Config.getInstance();
    this.conf = this.config.Global.Grid.public; //这个是全局公共配置，更改会引起全局对象的改变。
    //私有变量导出
    this.margin = array_copy(this.conf.margin);
    this.xstyle_axis = this.conf.xstyle_axis;
    this.ystyle_axis = this.conf.ystyle_axis;
    this.setConfig();
    this.addEvent();
    PlotGrid._this = this;
}

PlotGrid.FIX_BEG = 1; //开始值固定 (小值)
PlotGrid.FIX_END = 1 << 1; //结束值固定 (大值)
PlotGrid.FLOAT = 1 << 2; //浮动计算，可以得到更好的坐标值（浮动20%，得到一些更好的值）
PlotGrid.GT_ZERO = 1 << 3;
PlotGrid.TIME = 1 << 4;
PlotGrid.FIX_PIXEL = 1 << 5;
PlotGrid.NO_GRID = 1 << 6;
PlotGrid.NO_AXIS = 1 << 7;
PlotGrid.NEAR = 1 << 8; //采用寻找最近的点的模式
PlotGrid.INTERPOLATION = 1 << 9; //采用差值法
PlotGrid.ADD_YEAR = 1 << 10; //采用差值法

PlotGrid.prototype.setConfig = function() {
    this.O = new Point(this.margin[this.LEFT], this.margin[this.TOP]);
    this.xEnd = new Point(this.width - this.margin[this.RIGHT], this.margin[this.TOP]);
    this.yEnd = new Point(this.margin[this.LEFT], this.height - this.margin[this.BOTTOM]);
    this.xyEnd = new Point(this.width - this.margin[this.RIGHT], this.height - this.margin[this.BOTTOM]);
}

PlotGrid.prototype.setLast = function() {
    this.clearLast();
    if (this.margin[this.BOTTOM] < 20) {
        this.margin[this.BOTTOM] = 20; //又足够的地方写字
    }
    this.resize.hide();
    this.xstyle_axis = this.xstyle_axis & ~PlotGrid.NO_AXIS;
    this.setConfig();
}

PlotGrid.prototype.clearLast = function() {
    this.margin = array_copy(this.conf.margin);
    if (!this.xstyle_axis) {
        this.xstyle_axis = 0;
    }
    this.resize.show();
    this.xstyle_axis |= PlotGrid.NO_AXIS;
    this.setConfig();
}

PlotGrid.prototype.setHeight = function(h) {
    h = Math.round(h);
 // console.log(h);
    this.height = h;
    // if(this.canvasContainer.attr('id')=="plot_canvas_0"){
    //     h=h-60;
    // }
    // else{
    //     h=h;
    // }
    // console.log("PlotGrid.prototype.setHeight:"+this.height)
    set_height(this.canvas, h);
    set_height(this.canvasBG, h);
    set_height(this.canvasFront, h);
    set_height(this.canvasContainer, h);
    this.resize.css("top", $(this.canvas).offset().top + h - 4);
    this.setConfig();
}

PlotGrid.prototype.setWidth = function(w) {
    this.width = w;
    this.setConfig();
}

PlotGrid.prototype.getPlotArea = function() {
        //获取绘图的区域
        var area = { x: {}, y: {} };
        area.y.beg = Math.round(this.xyEnd.y - this.conf.paddingY);
        area.y.end = Math.round(this.xEnd.y);
        area.x.beg = Math.round(this.xyEnd.x - this.conf.paddingX);
        area.x.end = Math.round(this.yEnd.x);
        return area;
    }
    //绘制行，要考虑padding的值 update by fangxiao from 2016/6/29 17:16
PlotGrid.prototype.drawY = function(axis) {
    if (!axis) axis = this.axis;
    axis_option = axis.viewconfig.y.axis_option;
    var points = axis.viewconfig.y.axis;
    for (var i = 0; i < points.length; i++) {
        var point = new Point(this.O.x, points[i].key);
        var len = this.xEnd.x - this.O.x;
        if (this.conf.ystyle_grid & PlotGrid.NO_GRID) {
            //do noting
        } else {
            drawRow(this.ctx, point, len, this.conf.gridColor, 1);
        }
        
        if (this.ystyle_axis & PlotGrid.NO_AXIS) {
            //do nothing
        } else {
            var point = new Point(this.xEnd.x, points[i].key);
            //drawRow(this.ctx, point, this.conf.ledgeLen, this.conf.axisColor, 1); 去除y轴右侧字旁边的横杆
            var text = this.getText(axis_option.style, points[i].value, axis_option.unit);
            if (i == points.length - 1) //最后一个点，往内缩
            {
//              var ypoint = points[i].key + 12;

                var ypoint = points[i].key;
            } else {
                var ypoint = points[i].key;
            }
            if(i!=0){
               drawDashLine(this.ctx,this.O.x,ypoint,this.xEnd.x,ypoint,2); 
            }
            
            writeText(this.ctx, new Point(this.xEnd.x + this.conf.ledgeLen + 2, ypoint), text, this.conf.fontColor, this.conf.font);

        }
    }
}

PlotGrid.prototype.drawCrossX = function(x, axis) {
    var len = this.yEnd.y - this.O.y;
    drawCol(this.ctx, new Point(x, this.O.y-15), len+20, this.conf.crossX.lineColor, 0.6);
    if (this.xstyle_axis & PlotGrid.NO_AXIS) {
        //do nothing;
    } else {
        this.writeXLable(x, axis);
    }
}

//开始绘制
PlotGrid.prototype.writeXLable = function(x, axis) {
    if (typeof axis === "undefined") {
        axis = this.axis;
    }
    var value = this.axis.getXValue(x, this.conf.crossXMode, axis);
    if (value === false) return;
    var opt = axis.viewconfig.x.axis_option;
    value = this.getText(opt.style, value, opt.unit);
    writeTextOption(this.ctx, new Point(x - this.conf.crossX.bg.width / 2, this.yEnd.y + this.conf.crossX.bg.height / 2), value, this.conf.crossX);
}

//开始绘制
PlotGrid.prototype.writeYLable = function(y, axis) {
    if (typeof axis === "undefined") {
        axis = this.axis;
    }
    var value = this.axis.getYValue(y, this.conf.crossYMode, axis);
    if (value === false) return;
    var opt = axis.viewconfig.y.axis_option;
    value = this.getText(opt.style, value, opt.unit);
    writeTextOption(this.ctx, new Point(this.xEnd.x, y), value, this.conf.crossY);
}

PlotGrid.prototype.writeHeadText = function(text) {
    writeText(this.ctx, new Point(this.O.x + 10, this.O.y + 20), text, this.conf.headText.color, this.conf.headText.font);
}

PlotGrid.prototype.drawCrossY = function(y) {
    var len = this.xEnd.x - this.O.x;
    drawRow(this.ctx, new Point(this.O.x, y), len, this.conf.crossY.lineColor, 0.3);
    if (this.ystyle_axis & PlotGrid.NO_AXIS) {
        //do nothing
    } else {
        this.writeYLable(y);
    }
}

PlotGrid.prototype.drawX = function(axis) {
    if (!axis) axis = this.axis;
    axis_option = axis.viewconfig.x.axis_option;
    var points = axis.viewconfig.x.axis;
    if (typeof points === "undefined") {
        return;
    }


    for (var i = 0; i < points.length; i++) {
        var point = new Point(points[i].key, this.O.y);
        var len = this.yEnd.y - this.O.y;
        if (this.conf.xstyle_grid & PlotGrid.NO_GRID) {
            //do noting
        } else {
            drawCol(this.ctx, point, len, this.conf.gridColor, 1);
        }
        if (this.xstyle_axis & PlotGrid.NO_AXIS) {
            //do nothing
        } else {
            var point = new Point(points[i].key, this.yEnd.y);
            //画线

            drawCol(this.ctx, point, this.conf.ledgeLen, this.conf.axisColor, 1);
            var offset = 0;
            if (i == points.length - 1) {
                var text = this.getText(axis_option.style | PlotGrid.ADD_YEAR, points[i].value, axis_option.unit);
                offset = -20;
            } else {
                var text = this.getText(axis_option.style, points[i].value, axis_option.unit);
            }
            writeText(this.ctx, new Point(points[i].key + offset,
                this.yEnd.y + this.conf.ledgeLen + 12), text, this.conf.fontColor, this.conf.font);
        }
    }
}

//如果是固定像素的形式的，xstart 是开始index xend 是结束的 index xunit 是数据
//设计默认是xend 是画在最右边，如果屏幕像素不够，自动会舍弃xstart 这边的。
PlotGrid.prototype.drawBg = function() {
        this.ctx.fillStyle = this.conf.bgColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    //update by fangxiao from 2016、6/29 17:24
PlotGrid.prototype.drawBoder = function(axis) {
    /*
    if (!axis) axis = this.axis;
    axis_option = axis.viewconfig.x.axis_option;
    var points  = axis.viewconfig.x.axis;
    if (typeof points === "undefined")
    {
        return;
    }*/
    //绘制底部线条
    this.ctx.lineWidth = 0.85;
    this.ctx.strokeStyle = this.conf.axisColor;
    //this.ctx.moveTo(this.O.x + 0.5,this.0.y+this.O.y-this.yend.y+0.5);
    //this.ctx.lineTo(this.xEnd.x+0.5,this.0.y+this.O.y-this.yend.y+0.5);
    //this.ctx.stroke();
    //this.ctx.moveTo(this.O.x + 0.5,this.yEnd.y - this.O.y);
    //this.ctx.lineTo(this.xEnd.x - this.O.x, this.yEnd.y - this.O.y);
    //this.ctx.fill();
    //  this.ctx.stroke();
    this.ctx.strokeRect(this.O.x + 0.5, this.O.y + 0.5, this.xEnd.x - this.O.x, this.yEnd.y - this.O.y);
}


PlotGrid.prototype.getText = function(style, value, unit) {
    if (style & Axis.TIME) {
        var format = this.config.Global.timeformat[this.axis.p];
        if (style & PlotGrid.ADD_YEAR) {
            format = "Y-" + format;
        }
        var text = timeToDate(value, format, this.config.Global.timezone);
    } else {
        var text = GetText(value, unit);
    }
    return text;
}

PlotGrid.minwidth = 1; //每个图形点的最小值，至少是一个像素
PlotGrid.moveQueue = [];
PlotGrid.moveTimeid = null;
PlotGrid.xleft = 0;
PlotGrid.ytop = 0;
//1. 情况1： 指标 和 
//加载第一次数据被绑定
//2. 情况2：在加载数据的时候，这在初始化。【这个时候，加一个任务，初始化未初始化的指标】
//3. 情况3：数据已经初始化完成了，指标被加入。这个时候，马上初始化指标。然后，新下载的数据，先让指标自己缓存起来。
//4. 暂时只考虑被绑定的情况

PlotGrid.setMoveInterval = function(mode, _this) {
    if (PlotGrid.moveTimeid !== null) return;
    debug(mode);
    if (typeof mode === "undefined") {
        mode = "mouse";
    }
    if (mode == "mouse") {
        PlotGrid.mode = mode;
        //var _time = 30;
        var _time = 10;
        PlotGrid.minwidth = _this.view.plot[_this.view.config.mainName].getOneSize();
    } else if (mode == "key") {
        PlotGrid.mode = mode;
        //var _time = 100;
        var _time = 100;
    } else {
        //do nothing
        PlotGrid.mode = mode;
    }
    if (window["FlashCanvas"]) {
        //_time = 60;
        _time = 60;
    }
    this.moveTimeid = window.setInterval(function() {
        if (PlotGrid.moveQueue.length > 0) {
            debug("setInterval draw beg");
            PlotGrid.moveTo(PlotGrid.moveQueue.pop(), _this);
            debug("setInterval draw end");
            PlotGrid.moveQueue = [];
        }
    }, _time);
    debug(this.moveTimeid);
}

PlotGrid.clearMoveInterval = function(_this) {
    if (PlotGrid.moveQueue.length > 0) {
        PlotGrid.moveTo(PlotGrid.moveQueue.pop(), _this);
        PlotGrid.moveQueue = [];
    }
    if (PlotGrid.moveTimeid !== null) window.clearInterval(PlotGrid.moveTimeid);
    debug("clearMoveInterval");
    PlotGrid.moveTimeid = null;
}


PlotGrid.prototype.getYValue = function(y, axis) {
    if (typeof axis === "undefined") {
        axis = this.axis;
    }
    var value = this.axis.getYValue(y, this.conf.crossYMode, axis);
    if (value === false) return;
    var opt = axis.viewconfig.y.axis_option;
    value = this.getText(opt.style, value, opt.unit);
    return value;
}
PlotGrid.prototype.addEvent = function() {
        this.active = true;
        //这两个事件在主图中注册就可以了
        $(this.canvasContainer).bind('mousedown touchstart', this, function(e) {

            debug('mousedown');
            var _this = e.data;
            //PlotGrid.xleft = e.pageX;
            PlotGrid.xleft = isPC() ? e.pageX - $(this).offset().left : e.originalEvent.targetTouches[0].pageX - $(this).offset().left;
            PlotGrid.setMoveInterval('mouse', _this);
            var canvas_mousemove = function(e) {
                //console.log("move");
                var _this = e.data;
                //var newxleft = e.pageX - $(this).offset().left;
                var newxleft = isPC() ? e.pageX - $(this).offset().left : e.originalEvent.targetTouches[0].pageX - $(this).offset().left;
                PlotGrid.moveQueue.push(newxleft);
                debug("move to " + newxleft);
                return false;
            };
            $(_this.canvasContainer).bind('mousemove touchmove', _this, canvas_mousemove);

            var _canvas = _this.canvas;
            if (_canvas.selector == "#plot_canvas_02") {
                /*var x = e.pageX - $(_canvas).offset().left;*/
                var x = isPC() ? e.pageX - $(_canvas).offset().left : e.originalEvent.targetTouches[0].pageX - $(_canvas).offset().left;
                /*var y = e.pageY - $(_canvas).offset().top;*/
                var y = isPC() ? e.pageY - $(_canvas).offset().top : e.originalEvent.targetTouches[0].pageY - $(_canvas).offset().top;
                /*
                if(_this.xEnd.x >x && (_this.xEnd.x-x)<40){
                    $("#tool_list").find("li[name='order']").css('cursor', 'pointer');
                    $("#ordershow").val(_this.getYValue(y));
                    $("#orderprice").val( $("#ordershow").val());
                    $("#orderdirection").html("买");

                    order.show();
                }else if(_this.xEnd.x <x){
                    $("#tool_list").find("li[name='order']").css('cursor', 'pointer');
                    $("#ordershow").val(_this.getYValue(y));
                    $("#orderprice").val( $("#ordershow").val());
                    $("#orderdirection").html("卖");
                    order.show();
                }*/
            }

            $(document).bind('mouseup touchend', _this, function(e) {
                var _this = e.data;


                $(_this.canvasContainer).unbind('mousemove', canvas_mousemove);
                $(this).unbind('mouseup');
                PlotGrid.clearMoveInterval(_this);
                return false;
            });
            return false;
        });
        $(this.resize).bind("mousedown touchstart", this, function(e) {
            debug("resize mouse down");
            var _this = e.data;
            //PlotGrid.ytop = e.pageY;
            PlotGrid.ytop = isPC() ? e.pageY : e.originalEvent.targetTouches[0].pageY;
            PlotGrid.setMoveInterval('resize', _this);
            $("body").css("cursor", "n-resize");
            var document_mousemove = function(e) {
                var _this = e.data;
                //var newxtop = e.pageY;
                var newxtop = isPC() ? e.pageY : e.originalEvent.targetTouches[0].pageY;
                PlotGrid.moveQueue.push(newxtop);
                debug("move to new top " + newxtop);
                return false;
            };
            $(document).bind('mousemove tonchmove', _this, document_mousemove);
            $(document).bind('mouseup touchend', _this, function(e) {
                $(document).unbind('mousemove tonchmove', document_mousemove);
                $("body").css("cursor", "default");
                $(document).unbind('mouseup');
                PlotGrid.clearMoveInterval(_this);
                return false;
            });
            return false;
        });
        this.bindHover();
    }
    //鼠标经过的位置hover出框框
PlotGrid.prototype.bindHover = function() {
    var _this = this;
    var mouseMoveInterval = new IntervalEvent(
        3,
        function(controller) //可以重新被call
        {
            if (!this.value || this.value.length != 4) {
                return;
            }
            var x = this.value[0];
            var y = this.value[1];
            var time = this.value[2];
            if (time < 0) //已经显示过了，不用再显示了。
            {
                return;
            }
            var newtime = (new Date()).getTime();
            if (newtime - time >= PlotGrid._this.config.Global.hoverTime) {
                var show = 1;
                this.value[2] = -1;
            } else {
                var show = 0;
            }
            //  console.log("time:"+time+",newtime:"+newtime+",show:"+show+",x:"+x+",y:"+y);//头部标题内容
            if (this.X && this.Y) {
                var index = find_near(this.X, x);
                if ((index != -1) && (Math.abs(this.X[index] - x) <= this.getOneSize())) {
                    var ohlc = this.Y[index];
                    if (ohlc[Data.HIGH] - this.config.Global.overPadding <= y && ohlc[Data.LOW] + this.config.Global.overPadding >= y) {
                        var findTime = this.axis.getXValue(x, PlotGrid.NEAR);
                        if (findTime === false) return;
                        var cdata = this.view.model.getDataByTime(this.name, findTime, "candle");
                        if (!cdata) return false;
                        var time = cdata.time;
                        var ohlc = cdata.data;
                        var yunit = this.axis.viewconfig.y.axis_option.unit;
                        var fallOrDegrees = parseFloat(GetText(ohlc[Data.CLOSE], yunit) - GetText(ohlc[Data.OPEN], yunit)) / parseFloat(GetText(ohlc[Data.OPEN], yunit));
                        var fallOrDegrees = fallOrDegrees.toFixed(3);
                        //timeLine Data
                       // timelineData(time, GetText(ohlc[Data.OPEN], yunit), GetText(ohlc[Data.HIGH], yunit), GetText(ohlc[Data.LOW], yunit), GetText(ohlc[Data.CLOSE], yunit), fallOrDegrees, GetText(ohlc[Data.VOLUMES], yunit));
                        // console.log("text PlotCandle");
                    }
                }
            }



            PlotGrid.doHover(x, y, this.value[3], show);
        }, true
    );
    $(this.canvas).bind("mousemove touchmove", this, this.mouseMove);
    this.controller.addIntervalEvent("mouseMoveInterval", mouseMoveInterval);
    $(this.canvas).bind("mouseout touchend", this, function(e) {
        $("#msgbox").hide();
    });
}

PlotGrid.prototype.mouseMove = function(e) {
        var _this = e.data;
        PlotGrid._this = _this;
        var _canvas = _this.canvas;
        //var x = e.pageX - $(_canvas).offset().left;
        var x = isPC() ? e.pageX - $(_canvas).offset().left : e.originalEvent.targetTouches[0].pageX - $(_canvas).offset().left;
        //var y = e.pageY - $(_canvas).offset().top;
        var y = isPC() ? e.pageY - $(_canvas).offset().top : e.originalEvent.targetTouches[0].pageY - $(_canvas).offset().top;

        var time = (new Date()).getTime();
        var interval = _this.controller.intervalEvent.mouseMoveInterval;
        //位置没有变化，不进行处理
        if (interval.value && interval.value[0] == x && interval.value[1] == y) {
            return;
        }
        interval.setVal([x, y, time, e]);

    }
    //十字光标经过操作
PlotGrid.doHover = function(x, y, e, showhover) {
    var _this = PlotGrid._this;
    if (!showhover) {
        if ($("#msgbox").css('display') != "none") {
            $("#msgbox").css("top", -1000).css("left", -1000);
            $("#msgbox").hide();
            //debugx("hide1: " + x + "," + y);
        }
        return false;
    }
    //_this.controller.intervalEvent.mouseMoveInterval.setVal(null);
    var overstr = '';
    for (var i = _this.plot.length - 1; i >= 0; i--) {
        if (_this.plot[i].obj.over) { //将内容加入头部

            overstr = _this.plot[i].obj.over(x, y);
            if (overstr) break;
        }
    }
    if (overstr) {
        $("#msgbox").html(overstr);
        //debugx("show: " + x + "," + y);
        var top = e.pageY + 10;
        var left = e.pageX + 10;
        var w = $("#msgbox").width();
        var h = $("#msgbox").height();
        if (top + h + 10 > $(window).height()) {
            top = $(window).height() - h - 12;
        }
        if (left + w + 10 > $(window).width()) {
            left = $(window).width() - w - 12;
        }
        $("#msgbox").css("top", top).css("left", left);
        $("#msgbox").show();
    } else {
        $("#msgbox").css("top", -1000).css("left", -1000);
        $("#msgbox").hide();
        //debugx("hide2: " + x + "," + y);
    }
}

PlotGrid.prototype.removeEvent = function() {
    this.active = false;
    $(document).unbind("keydown");
    $(this.canvas).unbind('mousedown uchstartto');
    $(this.canvas).unbind('mousemove touchmove');
    $(document).unbind('mouseup touchend');
}

PlotGrid.moveTo = function(newxleft, _this) {
    if (PlotGrid.mode == "mouse") {
        if (newxleft - PlotGrid.xleft > PlotGrid.minwidth) //move to left
        {
            _this.controller.startOffset(Math.round((newxleft - PlotGrid.xleft) / PlotGrid.minwidth));
            _this.controller.draw();
            PlotGrid.xleft = newxleft;
        } else if (PlotGrid.xleft - newxleft > PlotGrid.minwidth) {
            _this.controller.startOffset(-Math.round((PlotGrid.xleft - newxleft) / PlotGrid.minwidth));
            _this.controller.draw();
            PlotGrid.xleft = newxleft;
        }
    } else if (PlotGrid.mode == "key") {
        _this.controller.draw();
    } else if (PlotGrid.mode == "resize") {
        _this.view.resizeGrid(newxleft - PlotGrid.ytop, _this.index);
        _this.controller.draw();
        PlotGrid.ytop = newxleft;
    }
}

PlotGrid.prototype.addPlot = function(name, plot) {
    var obj = { name: name, obj: plot };
    this.plot.push(obj);
}

PlotGrid.prototype.removePlot = function(name) {
    var plot = [];
    for (var i = 0; i < plot.length; i++) {
        var item = plot[i];
        if (item.name != name) {
            plot.push(item);
        }
    }
    this.plot = plot;
}

function isPC() {
    var userAgentInfo = navigator.userAgent;
    //alert(userAgentInfo)
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

function PlotKshape(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(PlotKshape, Plot);

PlotKshape.tagMap = {
    1: "A",
    2: "a",
    3: "B",
    4: "b",
    5: "C",
    6: "c",
    7: "D",
    8: "d",
    9: "E",
    10: "e",
    11: "N",
    12: "n",
    13: "W",
    14: "w",
    15: "X",
    16: "x",
    17: "F",
    18: "f",
    19: "L",
    20: "l",
    21: "T",
    22: "t",
    23: "G",
    24: "g",
    25: "Z",
    26: "z",
    27: "V",
    28: "v",
    29: "J",
    30: "j",
    31: "Y",
    32: "y"
};
PlotKshape.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.lineColor) {
        color = this.param.lineColor;
    } else {
        color = this.conf.lineColor;
    }
    for (var i = 0; i < data.x.length; i++) {
        if (data.y[i][1] != -1) {
            writeText(this.ctx, new Point(data.x[i], data.y[i][0]), PlotKshape.tagMap[data.y[i][1]], color[0], this.param.font);
        }
        if (data.y[i][2] != -1) {
            writeText(this.ctx, new Point(data.x[i], data.y[i][0] + 12), PlotKshape.tagMap[data.y[i][2]], color[1], this.param.font);
        }
    }
}

function PlotLine(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(PlotLine, Plot);

PlotLine.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.color) {
        color = this.param.color;
    } else {
        color = this.conf.lineColor;
    }
    drawLine(this.ctx, data.x, data.y, color);
}

function PlotMacd(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(PlotMacd, Plot);

PlotMacd.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.color) {
        color = this.param.color.split("-");
    } else {
        color = this.conf.lineColor;
    }
    var y1 = []
    var y2 = []
    for (var i = 0; i < data.y.length; i++) {
        y1[i] = data.y[i][0];
        y2[i] = data.y[i][1];
    }
    //color[1] = "rgb(112,207,88)";
    drawLine(this.ctx, data.x, y2, color[0],1.5);
    this.plotBar(data.x, y1, color[1]);
}
PlotMacd.prototype.getShowName = function() {
    var name = this.name.toUpperCase();
    name = name.replace("MAIN", "").replace("||", " ");
    name = name.split("|");
    if (name.length == 1) {
        return name[0];
    }
    var pre = name.shift();
    return pre + " (" + name.join(" , ") + ")";
}

PlotMacd.prototype.plotBar = function(x, H, colorbar) {
    var zero_y = this.axis.getY(0);
    drawRow(this.ctx, { x: this.left, y: zero_y }, this.right - this.left, this.conf.lineColorZero);
    this.ctx.beginPath();
    this.ctx.strokeStyle = colorbar;
    for (var i = 0; i < x.length; i++) {
        try {
            if (isNaN(H[i])) continue;
            this.ctx.moveTo(x[i] + 0.5, zero_y);
            this.ctx.lineTo(x[i] + 0.5, H[i]);
        } catch (e) {
            // console.log(e);
            // console.log(x[i]);
            // console.log(H[i]);
        }
    }
    this.ctx.stroke();
}

function Plotmatrend(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(Plotmatrend, Plot);

Plotmatrend.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.color) {
        color = this.param.color;
    } else {
        color = this.conf.lineColor;
    }
    var y1 = []
    var y2 = []
    var y3 = []
    var y4 = []
    var y5 = []
    var y6 = []
    for (var i = 0; i < data.y.length; i++) {
        y1[i] = data.y[i][0];
        y2[i] = data.y[i][1];
        y3[i] = data.y[i][2];
        y4[i] = data.y[i][3];
        y5[i] = data.y[i][4];
        y6[i] = data.y[i][5]
    }
    drawLine(this.ctx, data.x, y1, color[0]);
    drawLine(this.ctx, data.x, y2, color[1]);
    drawLine(this.ctx, data.x, y3, color[2]);
    drawLine(this.ctx, data.x, y4, color[3]);
    drawLine(this.ctx, data.x, y5, color[4]);
    drawLine(this.ctx, data.x, y6, color[5]);
}

function PlotMLine(view, grid, name) {
    sup(this, view, grid, name);
    this.laststatus = "";
    this.lastquick = "";
}
ClassExtend(PlotMLine, Plot);

PlotMLine.prototype.draw = function(data) {
    //建立点,mline的格式
    //
    var color, width;
    this.data = data;
    var last = this.lastData();
    for (var key in data.data) {
        if (this.param[key.toLowerCase() + "_color"]) {
            color = this.param[key.toLowerCase() + "_color"];
        } else {
            color = this.conf.lineColor;
        }
        if (data.width && data.width[key]) {
            width = data.width[key];
            //console.log(width);
        }
        if (data.data[key].x.length > 0) {
            drawLine(this.ctx, data.data[key].x, data.data[key].y, color, width);
        }
        if (this.param[key.toLowerCase() + "_flag"]) {
            this.priceFlag(last[key].bidask[0], this.config.Global.Candle["public"].close);
        }
    }
}

PlotMLine.prototype.lastDataShow = function() {
    var text = [];
    text.push("Local-QuickT = " + this.data.offset.local);
    text.push("QuickT-SlowT = " + this.data.offset.delt);
    if (1) {
        var last = this.lastData();
        var laststatus = "BID(";
        for (var key in last) {
            laststatus += key + "=" + this.grid.getText(0, last[key].bidask[0], this.data.yunit) + " ";
        }
        this.laststatus = laststatus + ")";
    }
    if (!this.data.quick.inquick) {
        var quick = this.data.quick;
        if (quick.start && quick.end) {
            this.lastquick = " ([" + quick.start + ", " + quick.end + "] Point: " + quick.point / 10 + " Time: " + quick.delt + ") "
        }
    }
    return this.lastquick + this.laststatus + text.join(" , ");
}

PlotMLine.prototype.getShowName = function() {
    var text = "";
    var keyarr;
    var name = this.name.split("|", 2)[0];
    for (var key in this.param) {
        if (key.indexOf("_color") !== -1) {
            keyarr = key.split("_");
            text += keyarr[0] + "(" + this.param[key] + ") ";
        }
    }
    var ret = name + " " + text;
    ret = ret.toUpperCase();
    return ret;
}

function PlotOrder(view, grid, name) {
    sup(this, view, grid, name);

    this.arrow = {};
    var conf = this.config.Global.arrow[DataWriterProfit.BUY_OPEN];
    this.arrow[DataWriterProfit.BUY_OPEN] = new ShapeArrow(this.ctx, conf.width, conf.height, conf);

    var conf = this.config.Global.arrow[DataWriterProfit.BUY_CLOSE];
    this.arrow[DataWriterProfit.BUY_CLOSE] = new ShapeArrow(this.ctx, conf.width, conf.height, conf);

    var conf = this.config.Global.arrow[DataWriterProfit.SELL_OPEN];
    this.arrow[DataWriterProfit.SELL_OPEN] = new ShapeArrow(this.ctx, conf.width, conf.height, conf);

    var conf = this.config.Global.arrow[DataWriterProfit.SELL_CLOSE];
    this.arrow[DataWriterProfit.SELL_CLOSE] = new ShapeArrow(this.ctx, conf.width, conf.height, conf);
}
ClassExtend(PlotProfit, Plot);

PlotProfit.prototype.draw = function(data) {
    var x, y, type;
    this.X = data.x;
    this.Y = data.y;
    for (var i = 0; i < data.x.length; i++) {
        for (var j = 0; j < data.y[i].length; j++) {
            y = data.y[i][j];
            type = y[0];
            y = y[1];
            x = this.fixedX(data.x[i], type);
            this.arrow[type].draw(new Point(x, y));
        }
    }
}

PlotProfit.prototype.getShowName = function() {
    return this.controller.c + " " + this.controller.p;
}

PlotProfit.prototype.lastDataShow = function() {
    return "";
}

PlotProfit.prototype.fixedX = function(x, type) {
    x += 0.5;
    var box = this.view.plot[this.config.mainName].getBoxSize();
    var left = this.view.plot[this.config.mainName].getBoxLeft();
    if (type == DataWriterProfit.BUY_OPEN || type == DataWriterProfit.SELL_OPEN) {
        x -= left;
    } else {
        x += box - left;
    }
    return x;
}

PlotProfit.prototype.over = function(x1, y1) {
    if (!this.X) {
        return false;
    }
    var x, y, type, bk = false;
    x1 += 0.5;
    for (var i = 0; i < this.X.length; i++) {
        for (var j = 0; j < this.Y[i].length; j++) {
            y = this.Y[i][j][1];
            type = this.Y[i][j][0];
            x = this.fixedX(this.X[i], type);
            if (this.inarrow(new Point(x, y), type, x1, y1)) {
                bk = true;
                break;
            }
        }
        if (bk) {
            break;
        }
    }
    if (!bk) {
        return false;
    }
    var findTime = this.axis.getXValue(this.X[i], PlotGrid.NEAR);
    if (findTime === false) return;
    var cdata = this.view.model.getDataByTime(this.name, findTime);
    if (!cdata) {
        return false;
    }
    cdata.data = cdata.data[j];
    /*
    var data = cdata.data[2];
    var open_time  = timeToDate(data[1], null, this.config.Global.timezone);
    var close_time = timeToDate(data[8], null, this.config.Global.timezone);
    return "Ticket:     " + data[0] + "<br />" +
           "Open Time:  " + open_time + "<br />" +
           "Close Time: " + close_time + "<br />" +
           "Open Price: " + data[5] + "<br />" +
           "Close Price:" + data[9] + "<br />" +
           "Size:       " + data[3] + "<br />" + 
           "Profit:     " + data[13] + "<br />";
    */

    return "<b>Type</b>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (DataWriterProfit.nameMap[cdata.data[0]]) + "<br/>" +
        "<b>Price</b>: &nbsp;&nbsp;&nbsp;&nbsp;" + cdata.data[1] + "<br/>" +
        "<b>OrderID</b>: " + cdata.data[2] + "<br/>";
}

//某个坐标是否在某个点内部
PlotProfit.prototype.inarrow = function(point, type, x, y) {
    var conf = this.config.Global.arrow[type];
    var cta = conf.incta;
    var len = conf.height;
    var width = conf.width + 5;
    point.y = -point.y;
    y = -y;
    var newpoint = axis_translate(new Point(x, y), cta, point);
    if (newpoint.x >= 0 && newpoint.x <= len && Math.abs(newpoint.y) <= width) {
        return true;
    } else {
        return false;
    }
}

function Plotcombinparam1001(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(Plotcombinparam1001, Plot);

Plotcombinparam1001.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.color) {
        color = this.param.color;
    } else {
        color = this.conf.lineColor;
    }
    var y1 = []
    var y2 = []
    var y3 = []
    var y4 = []
    var y5 = []
    var y6 = []
    for (var i = 0; i < data.y.length; i++) {
        y1[i] = data.y[i][0];
        y2[i] = data.y[i][1];
        y3[i] = data.y[i][2];
        y4[i] = data.y[i][3];
        y5[i] = data.y[i][4];
        y6[i] = data.y[i][5];
    }
    drawLine(this.ctx, data.x, y1, color[0]);
    drawLine(this.ctx, data.x, y2, color[1]);
    drawLine(this.ctx, data.x, y3, color[2]);
    drawLine(this.ctx, data.x, y4, color[3]);
    drawLine(this.ctx, data.x, y5, color[4]);
    drawLine(this.ctx, data.x, y6, color[5]);
}

function PlotProfit(view, grid, name) {
    sup(this, view, grid, name);

    this.arrow = {};
    var conf = this.config.Global.arrow[DataWriterProfit.BUY_OPEN];
    this.arrow[DataWriterProfit.BUY_OPEN] = new ShapeArrow(this.ctx, conf.width, conf.height, conf);

    var conf = this.config.Global.arrow[DataWriterProfit.BUY_CLOSE];
    this.arrow[DataWriterProfit.BUY_CLOSE] = new ShapeArrow(this.ctx, conf.width, conf.height, conf);

    var conf = this.config.Global.arrow[DataWriterProfit.SELL_OPEN];
    this.arrow[DataWriterProfit.SELL_OPEN] = new ShapeArrow(this.ctx, conf.width, conf.height, conf);

    var conf = this.config.Global.arrow[DataWriterProfit.SELL_CLOSE];
    this.arrow[DataWriterProfit.SELL_CLOSE] = new ShapeArrow(this.ctx, conf.width, conf.height, conf);
}
ClassExtend(PlotProfit, Plot);

PlotProfit.prototype.draw = function(data) {
    var x, y, type;
    this.X = data.x;
    this.Y = data.y;
    for (var i = 0; i < data.x.length; i++) {
        for (var j = 0; j < data.y[i].length; j++) {
            y = data.y[i][j];
            type = y[0];
            y = y[1];
            x = this.fixedX(data.x[i], type);
            this.arrow[type].draw(new Point(x, y));
        }
    }
}

PlotProfit.prototype.getShowName = function() {
    return this.controller.c + " " + this.controller.p;
}

PlotProfit.prototype.lastDataShow = function() {
    return "";
}

PlotProfit.prototype.fixedX = function(x, type) {
    x += 0.5;
    var box = this.view.plot[this.config.mainName].getBoxSize();
    var left = this.view.plot[this.config.mainName].getBoxLeft();
    if (type == DataWriterProfit.BUY_OPEN || type == DataWriterProfit.SELL_OPEN) {
        x -= left;
    } else {
        x += box - left;
    }
    return x;
}

PlotProfit.prototype.over = function(x1, y1) {
    if (!this.X) {
        return false;
    }
    var x, y, type, bk = false;
    x1 += 0.5;
    for (var i = 0; i < this.X.length; i++) {
        for (var j = 0; j < this.Y[i].length; j++) {
            y = this.Y[i][j][1];
            type = this.Y[i][j][0];
            x = this.fixedX(this.X[i], type);
            if (this.inarrow(new Point(x, y), type, x1, y1)) {
                bk = true;
                break;
            }
        }
        if (bk) {
            break;
        }
    }
    if (!bk) {
        return false;
    }
    var findTime = this.axis.getXValue(this.X[i], PlotGrid.NEAR);
    if (findTime === false) return;
    var cdata = this.view.model.getDataByTime(this.name, findTime);
    if (!cdata) {
        return false;
    }
    cdata.data = cdata.data[j];
    /*
    var data = cdata.data[2];
    var open_time  = timeToDate(data[1], null, this.config.Global.timezone);
    var close_time = timeToDate(data[8], null, this.config.Global.timezone);
    return "Ticket:     " + data[0] + "<br />" +
           "Open Time:  " + open_time + "<br />" +
           "Close Time: " + close_time + "<br />" +
           "Open Price: " + data[5] + "<br />" +
           "Close Price:" + data[9] + "<br />" +
           "Size:       " + data[3] + "<br />" + 
           "Profit:     " + data[13] + "<br />";
    */

    return "<b>Type</b>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (DataWriterProfit.nameMap[cdata.data[0]]) + "<br/>" +
        "<b>Price</b>: &nbsp;&nbsp;&nbsp;&nbsp;" + cdata.data[1] + "<br/>" +
        "<b>OrderID</b>: " + cdata.data[2] + "<br/>";
}

//某个坐标是否在某个点内部
PlotProfit.prototype.inarrow = function(point, type, x, y) {
    var conf = this.config.Global.arrow[type];
    var cta = conf.incta;
    var len = conf.height;
    var width = conf.width + 5;
    point.y = -point.y;
    y = -y;
    var newpoint = axis_translate(new Point(x, y), cta, point);
    if (newpoint.x >= 0 && newpoint.x <= len && Math.abs(newpoint.y) <= width) {
        return true;
    } else {
        return false;
    }
}

function Plotrsi(view, grid, name) {
    sup(this, view, grid, name);
}

ClassExtend(Plotrsi, Plot);

Plotrsi.prototype.draw = function(data) {
    this.plotBar(data.x, data.y);
}

Plotrsi.prototype.lastDataShow = function() {
    var data = this.lastData();
    return data;
}

Plotrsi.prototype.plotBar = function(x, H) {
    var zero_y = this.axis.getY(50);
    drawRow(this.ctx, { x: this.left, y: zero_y }, this.right - this.left, this.conf.lineColorZero);
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.conf.lineColorH;
    for (var i = 0; i < x.length; i++) {
        try {
            if (isNaN(H[i])) continue;
            this.ctx.moveTo(x[i] + 0.5, zero_y);
            this.ctx.lineTo(x[i] + 0.5, H[i]);
        } catch (e) {
            // console.log(e);
            // console.log(x[i]);
            // console.log(H[i]);
        }
    }
    this.ctx.stroke();
}

function Plotrsisma(view, grid, name) {
    sup(this, view, grid, name);
    //放大缩小尺寸控制更加灵活。采用配置数组的形式
    this.box = [1, 2, 3, 5, 7, 9, 11, 13];
    this.space = [0, 1, 1, 2, 2, 3, 4, 5];
    this.left = [0, 1, 1, 2, 3, 4, 5, 6]
}

ClassExtend(Plotrsisma, Plot);

Plotrsisma.prototype.zoomIn = function() {
    if (this.conf.box_pixel >= 7 && this.conf.space_pixel >= 7) {
        return;
    }
    if (this.conf.box_pixel < this.conf.space_pixel) {
        this.conf.box_pixel++;
    } else if (this.conf.box_pixel > this.conf.space_pixel) {
        this.spaceOffset(1);
    } else {
        this.conf.box_pixel++;
    }
}

Plotrsisma.prototype.spaceOffset = function(offset) {
    var prev = this.space[this.conf.space_pixel];
    this.conf.space_pixel = this.conf.space_pixel + offset;
    var current = this.space[this.conf.space_pixel];
    if (prev == current) {
        this.conf.box_pixel = this.conf.box_pixel + offset;
    }
}

Plotrsisma.prototype.zoomOut = function() {
    if (this.conf.box_pixel <= 0 && this.conf.space_pixel <= 0) {
        return;
    }
    if (this.conf.box_pixel < this.conf.space_pixel) {
        this.spaceOffset(-1);
    } else if (this.conf.box_pixel > this.conf.space_pixel) {
        this.conf.box_pixel--;
    } else {
        this.spaceOffset(-1);
    }
    this.conf.box_pixel = this.conf.box_pixel < 0 ? 0 : this.conf.box_pixel;
}

Plotrsisma.prototype.getOneSize = function() {
    return this.box[this.conf.box_pixel] + 2 * this.space[this.conf.space_pixel];
}

Plotrsisma.prototype.getBoxLeft = function() {
    return this.left[this.conf.box_pixel];
}

Plotrsisma.prototype.getBoxSize = function() {
    return this.box[this.conf.box_pixel];
}
Plotrsisma.prototype.draw = function(data) {
        this.data = data;
        this.X = data.x;
        this.Y = data.y;
        this.xunit = this.data.xunit;
        this.yunit = this.data.yunit;
        var width = this.box[this.conf.box_pixel];
        var left = this.left[this.conf.box_pixel];
        if (width > 2) {
            width--;
        }
        for (var i = 0; i < this.X.length; i++) {
            this.drawOne(this.X[i], this.Y[i], width, left);
        }

        var ySma = []
        for (var i = 0; i < data.y.length; i++) {
            ySma[i] = data.y[i][7];
        }
        drawLine(this.ctx, data.x, ySma, this.conf.SmaColor);
    }
    //鼠标经过十字光标显示的内容框
Plotrsisma.prototype.over = function(x, y) {
    //查找最接近的
   // console.log("1");
    if (!this.X || !this.Y) return;
    var index = find_near(this.X, x);
    if (index == -1) return false;
    if (Math.abs(this.X[index] - x) > this.getOneSize()) {
        return false;
    }
    var ohlc = this.Y[index];
    if (ohlc[Data.HIGH] - this.config.Global.overPadding <= y && ohlc[Data.LOW] + this.config.Global.overPadding >= y) {
        // console.log("Plotrsisma");
        var findTime = this.axis.getXValue(x, PlotGrid.NEAR);
        if (findTime === false) return;
        var cdata = this.view.model.getDataByTime(this.name, findTime, "candle");
        if (!cdata) return false;
        var time = cdata.time;
        var ohlc = cdata.data;
        var yunit = this.axis.viewconfig.y.axis_option.unit;
         var fallOrDegrees=parseFloat(GetText(ohlc[Data.CLOSE], yunit)-GetText(ohlc[Data.OPEN], yunit))/parseFloat(GetText(ohlc[Data.OPEN], yunit)) ;
         var fallOrDegrees=fallOrDegrees.toFixed(3);
        //timeLine Data
       // timelineData(time,GetText(ohlc[Data.OPEN], yunit),GetText(ohlc[Data.HIGH], yunit),GetText(ohlc[Data.LOW], yunit),GetText(ohlc[Data.CLOSE], yunit),fallOrDegrees,GetText(ohlc[Data.VOLUMES], yunit));

        // return time + "<br/>" + "O: " + GetText(ohlc[Data.OPEN], yunit) + "<br />" + "H: " + GetText(ohlc[Data.HIGH], yunit) + "<br />" + "L : " + GetText(ohlc[Data.LOW], yunit) + "<br />" + "C: " + GetText(ohlc[Data.CLOSE], yunit) + "<br />" +
        //     +"V: " + GetText(ohlc[Data.VOLUMES], yunit) + "<br />";

    } else {
        return false;
    }
}

Plotrsisma.prototype.drawOne = function(time, ohlc, width, left) {
    var ctx = this.ctx;
    var open = ohlc[Data.OPEN];
    var high = ohlc[Data.HIGH];
    var low = ohlc[Data.LOW];
    var close = ohlc[Data.CLOSE];
    time += 0.5;
    open += 0.5;
    high += 0.5;
    low += 0.5;
    close += 0.5;

    if (high == low) {
        //画个横线就可以了
        ctx.strokeStyle = this.conf.hx.os_border_color;
        ctx.beginPath();
        ctx.moveTo(time - left, open);
        ctx.lineTo(time + width, open);
        ctx.stroke();
        return;
    }
    if (open < close) {
        var up = open;
        var down = close;
        var fill = this.conf.hx.open_big_color;
        var border = this.conf.hx.ob_border_color;
    } else {
        var up = close;
        var down = open;
        var fill = this.conf.hx.open_small_color;
        var border = this.conf.hx.os_border_color;
    }
    ctx.strokeStyle = border;
    ctx.beginPath();
    ctx.moveTo(time, high);
    ctx.lineTo(time, low);
    ctx.stroke();
    if (this.conf.space_pixel > 0) {
        ctx.fillStyle = fill;
        ctx.fillRect(time - left, up, width, down - up);
        ctx.strokeRect(time - left, up, width, down - up);
    }
}


function PlotTrendLine(view, grid, name) {
    sup(this, view, grid, name);
}

ClassExtend(PlotTrendLine, Plot);

PlotTrendLine.prototype.draw = function(data) {
    this.X = data.x;
    this.Y = data.y;
    var plot_list = this.config.Global.trend_line_selected;
    if (plot_list == null) {
        return;
    }
    for (var i = 0; i < data.x.length; i++) {
        if (plot_list.indexOf("" + data.y[i][2]) == -1) {
            continue;
        }
        this.drawTrendLine(data.x[i], data.y[i][0], data.y[i][1], data.y[i][2], data.y[i]);
    }
}

PlotTrendLine.prototype.drawTrendLine = function(x, y, tan, type, data) {
    //曲线方程 y = ax + b
    var a = -tan;
    var b = y + tan * x;
    var p = [];
    p[0] = {};
    p[1] = {};
    var i = 0;
    var o = this.grid.O;
    var xy = this.grid.xyEnd;
    var plot_point = {};
    if (data[5] == 0 && typeof data[6] !== "undefined") {
        plot_point.x = data[6];
        plot_point.y = data[7];
    } else {
        if (tan != 0) {
            //和坐标轴的交点的计算
            //o 点 ， 和o点的对角点


            //计算曲线与坐标轴的绘图区域的焦点
            //top
            ytop = o.y;
            xtop = (ytop - b) / a;
            if (i < 2 && xtop >= o.x && xtop <= xy.x) {
                p[i].x = xtop;
                p[i].y = ytop;
                i++;
            }
            //bottom
            ybot = xy.y;
            xbot = (ybot - b) / a;
            if (i < 2 && xbot >= o.x && xbot <= xy.x) {
                p[i].x = xbot;
                p[i].y = ybot;
                i++;
            }
            //left
            xleft = o.x;
            yleft = xleft * a + b;
            if (i < 2 && yleft >= o.y && yleft <= xy.y) {
                p[i].x = xleft;
                p[i].y = yleft;
                i++;
            }
            //right
            xright = xy.x;
            yright = xright * a + b;
            if (i < 2 && yright >= o.y && yright <= xy.y) {
                p[i].x = xright;
                p[i].y = yright;
                i++;
            }
        } else {
            p[0].x = o.x;
            p[0].y = y;
            p[1].x = xy.x;
            p[1].y = y;
        }
        //从 x ,y 开始，然后绘制到边界上。
        if (p[0].x > x) {
            plot_point = p[0];
        } else {
            plot_point = p[1];
        }
    }
    plotLine(this.ctx, { x: x, y: y }, plot_point, this.conf.lineColor[type]);
}

PlotTrendLine.prototype.over = function(x1, y1) {
    //console.log(this.X);
    //console.log(this.Y);
    mind = Infinity;
    mini = 0;
    if (typeof this.X === "undefined") {
        return;
    }
    for (var i = 0; i < this.X.length; i++) {
        var d = this.distance(x1, y1, this.X[i], this.Y[i]);
        if (d < mind) {
            mind = d;
            mini = i;
        }
    }
    //i 是最短距离了
    if (mind <= 3) {
        return "<b>index:</b>" + this.Y[mini][3] + "<br/>";
    }
}

PlotTrendLine.prototype.distance = function(x1, y1, x, y) {
    //曲线方程
    A = -y[1];
    B = -1;
    C = y[0] + y[1] * x;
    d = Math.abs(A * x1 + B * y1 + C) / Math.sqrt(A * A + B * B);
    return d;
}

function Plotvolumes(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(Plotvolumes, Plot);

Plotvolumes.prototype.draw = function(data) {
    //偏移量配置  根据function Plotrsisma(view, grid, name)函数的配置
    var left = [0, 1, 1, 2, 3, 4, 5, 6];
    // var left = [ 3, 4, 5, 6,7,9,10,11]
    //建立点
    var color;
    if (this.param.color) {
        color = this.param.color;
    } else {
        color = this.conf.lineColor;
    }
    var zero_y = this.axis.getY(0);
    for (var i = 0; i < data.y.length - 1; i++) {
        if (isNaN(data.y[i][0])) {
            data.y[i][0] = 1;
        }
        /*if (data.y[i][0]>data.y[i+1][0]){
        this.ctx.strokeStyle = color[1]; //green
      }else if (data.y[i][0]<data.y[i+1][0]){
        this.ctx.strokeStyle = color[0]; //red
      }*/
        if (data.y[i].length == 2) {
            if(zero_y>data.y[i][0]){
                var height=zero_y-data.y[i][0];
            }
            else{
                var height=data.y[i][0]-zero_y;
            }
            this.ctx.strokeStyle = color[1]; //green
            //绘制矩形 参考Plotrsisma.prototype.drawOne函数
            this.ctx.closePath();
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = color[1];
            this.ctx.fillRect(data.x[i]+0.5-left[this.config.Global.Candle.public.box_pixel],zero_y-height,this.config.Global.boxwidth,height);
            this.ctx.strokeRect(data.x[i]+0.5-left[this.config.Global.Candle.public.box_pixel],zero_y-height,this.config.Global.boxwidth,height);
            this.ctx.closePath();
            // this.ctx.moveTo(data.x[i] + 0.5, zero_y);
            // this.ctx.lineTo(data.x[i] + 0.5, data.y[i][0]);
            // this.ctx.closePath();
            // this.ctx.lineWidth = this.config.Global.boxwidth;
            // this.ctx.stroke();
            // this.ctx.closePath();
            
        } else {
            this.ctx.strokeStyle = color[0]; //red
             
            this.ctx.closePath();
            this.ctx.beginPath();
            if(zero_y>data.y[i][0]){
                var height=zero_y-data.y[i][0];
            }
            else{
                var height=data.y[i][0]-zero_y;
            }
            this.ctx.lineWidth = 1;
            this.ctx.fillStyle = "#0a0a0a";
            this.ctx.fillRect(data.x[i]+0.5-left[this.config.Global.Candle.public.box_pixel],zero_y-height,this.config.Global.boxwidth,height);
            this.ctx.strokeRect(data.x[i]+0.5-left[this.config.Global.Candle.public.box_pixel],zero_y-height,this.config.Global.boxwidth,height);
            this.ctx.closePath();
//          if(zero_y>data.y[i][0])
//          {
//              var height=zero_y-data.y[i][0];
//              this.ctx.strokeRect(data.x[i] + 0.5-this.config.Global.boxwidth,data.y[i][0],this.config.Global.boxwidth,height)
//              this.ctx.closePath();
//          }
//          else{
//              var height=data.y[i][0]-zero_y;
//              this.ctx.lineWidth=5;
//              if(height!=0){
//                  this.ctx.strokeRect(data.x[i] + 0.5-this.config.Global.boxwidth,data.y[i][0],this.config.Global.boxwidth,height);
//                  this.ctx.closePath();
//              }
//              
//          }
//          this.ctx.closePath();
           
        }
//      this.ctx.beginPath();
//      this.ctx.moveTo(data.x[i] + 0.5, zero_y);
//      this.ctx.lineTo(data.x[i] + 0.5, data.y[i][0]);
//      this.ctx.closePath();
//      this.ctx.lineWidth = this.config.Global.boxwidth;
//      this.ctx.stroke();
//      this.ctx.closePath();
       
    }
    this.ctx.beginPath();
    this.ctx.moveTo(data.x[data.y.length - 1] + 0.5, zero_y);
    this.ctx.lineTo(data.x[data.y.length - 1] + 0.5, data.y[data.y.length - 1][0]);
    this.ctx.closePath();
    //this.ctx.lineWidth = this.config.Global.boxwidth;
    this.ctx.stroke();
}

function Plotvolumes2(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(Plotvolumes2, Plot);

Plotvolumes2.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.color) {
        color = this.param.color;
    } else {
        color = this.conf.lineColor;
    }
    var zero_y = this.axis.getY(0);
    for (var i = 0; i < data.x.length; i++) {
        if (isNaN(data.y[i][0])) continue;
        this.ctx.beginPath();
        this.ctx.moveTo(data.x[i] + 0.5, zero_y);
        if (data.y[i][0] > zero_y) {
            this.ctx.strokeStyle = color[1];
            this.ctx.lineTo(data.x[i] + 0.5, 2 * zero_y - data.y[i][0]);
        } else {
            this.ctx.strokeStyle = color[0];
            this.ctx.lineTo(data.x[i] + 0.5, data.y[i][0]);
        }
        this.ctx.closePath();
        this.ctx.stroke();
    }

}

function PlotWave(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(PlotWave, Plot);

PlotWave.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.color) {
        color = this.param.color;
    } else {
        color = this.conf.lineColor;
    }
    var y1 = []
    for (var i = 0; i < data.y.length; i++) {
        y1[i] = data.y[i][0];
    }
    drawLine(this.ctx, data.x, y1, color[0]);
}

function Plotwdensity(view, grid, name) {
    sup(this, view, grid, name);
}
ClassExtend(Plotwdensity, Plot);

Plotwdensity.prototype.draw = function(data) {
    //建立点
    var color;
    if (this.param.lineColor) {
        color = this.param.lineColor;
    } else {
        color = this.conf.lineColor;
    }

    for (var i = 0; i < data.y.length; i++) {
        for (var j = 0; j < data.y[i].length / 2; j++) {
            if (data.y[i][2 * j] != 0 && data.y[i][j * 2 + 1] != 0) {
                writeText(this.ctx, new Point(data.x[i], data.y[i][2 * j]), "~", color[j], this.param.font)
            }
        }
    }
}

//Node 版本的数据接收
//这里主要针对本地传送数据。[直接一次性加载的策略]

function ModelNode(controller) {
    sup(this, controller);
    this.host = this.config.Global.NodeHost;
    this.port = this.config.Global.NodePort;
    this.isinit = false;
}

ClassExtend(ModelNode, Model);

ModelNode.prototype.initData = function() {
    if (this.isinit) return;
    this.isinit = true;
    var socket = io.connect('http://' + document.domain);
    this.socket = socket;
    var _this = this;
    socket.on("error", function(data) {
        // console.log("error");
    });
    socket.on("init", function(data) {
        // console.log("init");
        _this.updateData(data, "init");
    });
    socket.on("data", function(data) {
        if (data.main && data.main.options.prev_calculated == 0) console.log("data");
        _this.updateData(data, "new");
    });
    var _this = this;
    _this.isconnect = false;
    socket.on("connect", function() {
        _this.isconnect = true;
        _this.subscribe();
    });
    this.socket = socket;
}
ModelNode.prototype.subscribe = function() {
    if (this.isconnect) {
        this.socket.emit("subscribe", { c: this.controller.c, p: this.controller.p });
    }
}
ModelNode.prototype.downloadData = function() {

}

ModelNode.prototype.newData = function() {

}

ModelNode.prototype.updateData = function(data, action_name) {
    // console.log("data.p:"+data.p);
    if (data && data.c && data.p) {
        if (data.c != this.c || data.p != this.p) {
            //$("#symbol li[name="+data.c+"]").click();
            $("#period li[name=" + data.p + "]").click();
            action_name = "init";
        }
    }
    if (action_name == "init") {
        if (data && data.c && data.p) {
            this.flag(Model.INITED, 1, data.c, data.p);
        } else {
            this.flag(Model.INITED, 1);
        }
        hide_loading();
    } else {
        debug("update");
    }
    this.update(data, Model.UPDATE);
}

//采用短连接下载数据的接口，有两个子类，一个子类是poll 采用轮询的方式更新数据。
//还有一个 WS采用websocket 的方式更新数据，
//如果在配置中，指定采用poll，那么我们就采用poll
//如果在配置中 指定采用websokect，但是发现，有些浏览器不支持，我们还是要退回轮询的方式。
//而服务器端 会有两套服务器。
//为了便于扩展。我们没有直接重写 data.set 类。

function ModelShort(controller) {
    sup(this, controller);
    this.controller=controller;
    this.api = this.config.Global.DataAPI;
    this.prevPoint = 0;
}

ClassExtend(ModelShort, Model);
ModelShort.prototype.getAPI = function() {
    console.log($.cookie('symbol'));
    if($.cookie('symbol')=="YCC"){

     return "https://kdata.fxee.com/kdata?datafile=db" + "&c=NYCC&p="+ this.p;
    }
    else{
        return "https://kdata.fxee.com/kdata?datafile=db" + "&c=" + $.cookie('symbol') + "&p=" + this.p;
    }
    // if(this.p==null){
    //     return "https://tick.33.cn:4062/kdata?datafile=db" + "&c=" + $.cookie('symbol') + "&p=H1" ;
    // }
    // else{
    //     return "https://tick.33.cn:4062/kdata?datafile=db" + "&c=" + $.cookie('symbol') + "&p=" + this.p;
    // }
    
//  if(this.c=="ETC"){
//     return etcUrl + "&c=" + this.c + "&p=" + this.p;
//  }
//  else{
//      if (this.api.indexOf("?") == -1) {
//          return this.api + "?" + "c=" + this.c + "&p=" + this.p;
//      } else {
//          return this.api + "&c=" + this.c + "&p=" + this.p;
//      }
//  }
   
}

ModelShort.prototype.download = function(action_name) {
    this.count = this.config.Global.downloadCount;
    if (action_name == "down") {
        if (this.flag(Model.DOWN_END)) return;
        //判断左边是否需要下载(左边的优先下载)
        var down_flag = 0;
        if (this.leftDataCount() < this.config.Global.lowMark) {
            if (this.downOptions.total_size) {
                if (this.getLeftOffset() < this.downOptions.total_size - 1) down_flag = 1;
            } else {
                down_flag = 1; //left
            }
        }
        //判断右边是否需要下载。对于以时间下载的模式，不会消去数据。所以，右边的永远不需要下载。
        if (down_flag == 0 && this.rightDataCount() < this.config.Global.lowMark) {
            if (this.downOptions.total_size) {
                if (this.getRightOffset() > 0) down_flag = -1;
            }
        }
        if (!down_flag) return;
    }
    if (this.config[this.config.mainName].downdata == 0) return;
    var api = this.getAPI();
    if (!api) return;

    var _this = this;
    var ind = this.getIndicatorList();
    //用一个数字，来标记这些状态. init_beg 和 init_end
    //是一对，设置了一个，就会清除另外的一个
    if (this.flag(Model.DOWN) == 1) return; //如果数据正在下载中，那么忽略新的下载任务
    if (this.downOptions.total_size) {
        //以位置分页
        if (this.state.length == '' && action_name == 'down') {
            var offset = this.getDownOffset(down_flag);
            if (offset < 0) return;
        } else if (this.state == 'home') {
            offset = this.downOptions.total_size - this.count;
        } else if (this.state == "end") {
            offset = 0;
        }
        if (this.getRightOffset() <= offset && offset <= this.getLeftOffset()) {
            this.state = '';
            return;
        }
        var baseparam = { action: action_name, offset: offset, count: this.count, 'ind': ind.join(":") }
    } else {
        //以时间分页
        var baseparam = { action: action_name, ts: this.startXValue(), count: this.count, 'ind': ind.join(":") }
    }
    var pollmode = this.config.Global.PollMode;
    baseparam.out = pollmode;
    this.flag(Model.DOWN, 1);
    $.ajax({
        type: "post",
        url: api,
        data: baseparam,
        success: function(data) {
            // console.log("ajax data:"+data);
            if (data) {

                _this.processDown(data, data.action);
            }
        },
        error : function() {    
           // view("异常！");    
           alert("异常！");   
           //光标移至输入用户名框
           $("#loginusername").focus();
           return -1; 
        },  
        complete: function(xhr) {
            _this.flag(Model.DOWN, 0);
            _this.state = '';
        },
        dataType: baseparam.out
    });
}

ModelShort.prototype.processDown = function(data, action_name) {
    if (action_name == "init") {
        if (data && data.c && data.p) {
            this.flag(Model.INITED, 1, data.c, data.p);
        } else {
            this.flag(Model.INITED, 1);
        }
        hide_loading();
    } else {
        debug("down ok");
    }
    this.update(data, Model.DOWN);
    this.flag(Model.DOWN_DATA, 1); //标记下载的数据可用了
    if (action_name == "init") {
        //this.newData();
    }
}

ModelShort.prototype.initData = function() {
    return this.download("init");
}

ModelShort.prototype.downloadData = function() {
    this.download("down");
}


//通过广播的方式得到tick数据。在本地计算出K线的数据。（方案1）
//但是本地计算有些麻烦，比较简单的解决方案是：支持一个new 命令
//把相关的数据下载下来。并注册广播该数据。这个广播服务器需要复杂一点。
//暂时采用第二种方案，个人认为这个方案在不需要tick报价的情况下，客户端
//逻辑最少，数据最不容易出错。
//
//tick广播服务器，只要缓存24小时内的数据，一般就不会有出现断层。【如果new
//命令在的时间是在24小时以外的。可以提醒客户端，刷新。但是不考虑这样的异常。】
//
//下载数据：会收集所有注册指标的名称，一起下载。下载的数据，按照主K线图对齐。
//没有对齐的填上NULL，如果某个点为NULL，那么这个点就直接跳过，不会进行绘制
//function 继承
function ModelShortPoll(controller) {
    sup(this, controller);
    this.interval = new IntervalEvent(Math.round(this.config.Global.PollInterval / this.config.Global.Interval), function(controller) {
        if(controller.model==undefined)return;
        controller.model.newData();
    }, true);
    controller.addIntervalEvent("poll", this.interval);
}

ClassExtend(ModelShortPoll, ModelShort);
ModelShortPoll.prototype.newData = function() {
    var api = this.getAPI();
    if (!api) return;
    //如果是静态图形
    if (this.controller.staticChat) return true;
    var _this = this;
    if (this.isNewing) {
        if (getTime() - this.lastSend > 1000 * this.config.Global.maxConnectAliveTime) {
            //reconnect. may be the connect is error
        } else {
            return false;
        }
    }
    //如果没有初始化，那么返回
    if (!this.flag(Model.INITED)) {
        return;
    }
    this.isNewing = true;
    this.lastSend = getTime();
    var ind = this.getIndicatorList();
    //更新时间按照主图:的最新数据
    var first = this.flag(Model.FIRST_NEW) ? 1 : 0;
    this.c = this.c;
    console.log(this);
    var baseparam = { action: 'new', "ind": ind.join(":"), te: this.endXValue(), first: first, __tmp: Math.random() };
    var pollmode = this.config.Global.PollMode;
    baseparam.out = pollmode;
    this.newDataXHR = $.ajax({
        type: "post",
        url: api,
        data: baseparam,
        success: function(data) {
            _this.processNew(data);
            _this.isNewing = false;
        },
        complete: function(xhr) {
            _this.isNewing = false;
        },
        dataType: baseparam.out
    });
    return true;
}

ModelShortPoll.prototype.processNew = function(data) {
    if (data != null) {
        this.update(data, Model.NEW);
        this.flag(Model.FIRST_NEW, 0, data.c, data.p);
    }
}

//通过广播的方式得到tick数据。在本地计算出K线的数据。（方案1）
//但是本地计算有些麻烦，比较简单的解决方案是：支持一个new 命令
//把相关的数据下载下来。并注册广播该数据。这个广播服务器需要复杂一点。
//暂时采用第二种方案，个人认为这个方案在不需要tick报价的情况下，客户端
//逻辑最少，数据最不容易出错。
//
//tick广播服务器，只要缓存24小时内的数据，一般就不会有出现断层。【如果new
//命令在的时间是在24小时以外的。可以提醒客户端，刷新。但是不考虑这样的异常。】
//
//下载数据：会收集所有注册指标的名称，一起下载。下载的数据，按照主K线图对齐。
//没有对齐的填上NULL，如果某个点为NULL，那么这个点就直接跳过，不会进行绘制
//function 继承

//这个是通过 websocket 广播进行数据更新的模式。数据下载部分不变，只是更新了数据更新的部分。
function ModelShortWS(controller) {
    sup(this, controller);
    this.wsinit = false;
    if (!this.config.Global.WSHost) {
        return;
    }
    this.url = "ws://" + this.config.Global.WSHost + ":" + this.config.Global.WSPort + "/";
    this.interval = new IntervalEvent(Math.round(1000 / this.config.Global.Interval), function(controller) {
        var model = controller.model;
        if (getTime() - model.lastRead > model.config.Global.maxNOData * 1000) {
            model.lastRead = getTime();
            if (model.wsinit) {
                if (model.ws) {
                    model.ws.close();
                }
                model.ws = null;
                model.wsinit = false;
                model.newData();
            } else {
                model.ws = null;
                model.wsinit = false;
                model.newData();
            }
            return;
        }
        if (getTime() - model.lastRead > model.config.Global.pingTime * 1000) {
            if (model.ws) {
                try {
                    model.ws.send("ping");
                } catch (e) {}
            }
        }
    }, true);
    if (!this.config.Global.newDisable) {
        controller.addIntervalEvent("ws", this.interval);
    }
    this.ws = null;
}

ClassExtend(ModelShortWS, ModelShort);

ModelShortWS.prototype.initWS = function() {
    var _this = this;
    if (this.ws) return;
    if (this.url) {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = function() {
            _this.open();
        };
        this.ws.onmessage = function(e) {
            _this.message(e);
        };
        this.ws.onclose = function(e) {
            _this.message(e);
        };
    }
}

ModelShortWS.prototype.newData = function() {
    //如果是静态图形
    if (this.controller.staticChat || this.config.Global.newDisable) return true;
    if (!this.flag(Model.INITED)) {
        return;
    }
    //货币对+指标列表
    var ind = this.getIndicatorList();
    this.cmd = [];
    var hasmain = false;
    var super_ind = [];
    for (var i = 0; i < ind.length; i++) {
        if (ind[i] == this.config.mainName) {
            hasmain = true;
            break;
        }
    }
    if (!hasmain) ind.push(this.config.mainName);
    for (var i = 0; i < ind.length; i++) {
        var mycmd = this.dataObj[ind[i]].reader.getWSCmd();
        if (mycmd) {
            this.cmd.push(mycmd);
        } else {
            super_ind.push(ind[i]);
        }
    }
    if (super_ind.length != 0) {
        super_ind = super_ind.join(',');
        this.cmd.push("super_sub:" + this.c + "_" + this.p + ";" + super_ind + ":" + this.endXValue());
    }
    this.initWS();
    if (this.wsinit) {
        this.sendcmd();
        this.cmd = null;
    }
}

ModelShortWS.prototype.sendcmd = function() {
    if (this.cmd) {
        try {
            for (var i = 0; i < this.cmd.length; i++) {
                this.ws.send(this.cmd[i]);
            }
        } catch (e) {}
    }
}

ModelShortWS.prototype.open = function() {
    this.wsinit = true;
    this.sendcmd();
}

ModelShortWS.prototype.message = function(e) {
    this.lastRead = getTime();
    if (e.data == "here") {
        return;
    }
    var data = eval("(" + e.data + ")");
    this.update(data, Model.NEW);
}

ModelShortWS.prototype.close = function(e) {
    this.ws = null;
    this.wsinit = false;
    this.initWS();
}

//一般任务reader是一个很简单的东西，但是它实际上也不是非常简单，它涉及预处理。定位等。
//现在我们考虑一般的情况，那就是main 图 和 这个指标图并不是时间对齐的。
//我们需要通过time查找。这里，我们采用二分查找。
//
//基本的reader会提供两个函数，一个是通过一个start值和number 读取数据
//一个是通过一个时间范围。读取这个时间范围内的数据。
//
//通过精心的组织代码，我们发现这个代码还是可以控制的。虽然，你很难想像用Javascript
//写这样大型的绘图程序到底能否成功。
//
function DataReader(model, writer, name) {
    //每个datreader 对象建立的时候。有一个data write 对象
    this.model = model;
    this.controller = this.model.controller;
    /*if (name!="volumes"){
     this.setParam(this.controller.ind[name].param);
    }*/
    this.writer = writer;
    this.name = name;
    this.config = Config.getInstance();
    this.shift = 0;
}

DataReader.EXTEND = 1;
DataReader.MAIN = 1 << 1;

DataReader.prototype.setWriter = function(writer) {
    this.writer = writer;
}

DataReader.prototype.setParam = function(param) {
    this.param = param;
}

DataReader.prototype.getShift = function() {
    //为了计算精确，  从图表中多读取这样多的数据。同时，兼容K线这一端对齐的 和 非对齐的情况，这样，指标的计算只和图表数据相关 和原始数据无关。
    //为了不影响画图，最好不要影响画图
    //时间刻度一般以主图为准。
    return this.shift;
}

DataReader.prototype.getStart = function(number) {
    //数据指针
    var start = this.model.point();
    var endpos = this.getEndPos();
    if (endpos < 0) {
        return -1;
    }
    //alert(start);
    if (start < 0) {
        start = 0;
    }
    if (start > endpos) {
        start = endpos;
    }
    if (!number) return start;

    if (endpos - start < number) {
        start = endpos - number + 1;
    }
    if (start < 0) {
        start = 0;
    }
    if (start > endpos) {
        start = endpos - number + 1;
    }
    //修正
    this.model.point(start);
    return start;
}

DataReader.prototype.getEndPos = function() {
    var x = this.main.getX(this.c, this.p);
    return x.length - 1;
}

DataReader.prototype.startXValue = function() {
    var x = this.main.getX(this.c, this.p);
    return x[x.length - 1];
}

DataReader.prototype.endXValue = function() {
    var x = this.main.getX(this.c, this.p);
    return x[0];
}

DataReader.prototype.set = function() {
    this.c = this.model.c;
    // console.log("this.model.p:"+this.model.p);
    this.p = this.model.p;
    this.xunit = this.config.Global.xunit[this.p] * 60; //这个是根据时间决定其单位

    if (this.config[this.name] && this.config[this.name].yunit) {
        this.yunit = this.config[this.name].yunit;
    } else {
        this.yunit = this.config.get("Global.yunit." + this.c, this.config.Global.yunit.default_value); //这个是根据货币对决定其单位
    }
    if (this.writer) {
        this.store = this.writer.getStore(this.c, this.p);
    }
    this.config = Config.getInstance();
    // this.config.mainName="main";
    this.main = this.model.dataObj[this.config.mainName].writer; //这个对main是引用关系，所以只要c,p 没有切换
    this.mainData = this.model.data[this.config.mainName]; //main刚刚读取的数据


    this.step = this.xunit;
    this.maxstep = this.config.Global.maxstep; //(5个小时没有数据,那么不进行补充)
    //这个数据，依然是引用了main的最新的数据。
}

DataReader.prototype.getMainData = function() {
    this.mainData = this.model.data[this.config.mainName];
    return this.mainData;
}

DataReader.prototype.getYminmax = function(y) {
    return minmax(y);
}

DataReader.prototype.getWSCmd = function() {
    return false;
}

//抽象函数，不提供任何的功能。//主图数据
DataReader.prototype.getDataByMain = function(readconfig) {
    this.mainData = this.getMainData();
    var nLen = this.mainData.x.length;
    if (nLen > this.model.plotnum) {
        nLen = this.model.plotnum
    }
    var start = this.mainData.x[nLen - 1];
    var end = this.mainData.x[0];
    var x = new Array();
    var y = new Array();
    var xdata = this.writer.getX(this.c, this.p);
    var ydata = this.writer.getY(this.c, this.p);
    //这个部分是数据，首先查找xdata，当然还要判断是否扩展。
    //这里的扩展方式是扩展K线图。其他的扩展，在其他的图里面表示。
    //先获取数据:

    var count = 0;
    var index = find_first_big_r(xdata, end); //查找到第一个点
    if (index == -1) {
        index = 0;
    }
    if (xdata[index] > end) index++; //去掉第一个大于的点
    for (var i = index; i < xdata.length; i++) {
        if (xdata[i] >= start) {
            x[count] = xdata[i];
            y[count] = ydata[i];
            count++;
        } else {
            break;
        }
    }
    if (readconfig & DataReader.EXTEND) {
        //多添加一个最后时间的数据，这个数据如果不存在，那么就复制前一个数据的 open 值,这个时间值肯定小于 start
        if (xdata[i]) {
            x.push(xdata[i]);
            y.push(ydata[i]);
        } else if (x[x.length - 1] > start) {
            x.push(start);
            var ylast = y[y.length - 1][Data.OPEN];
            y.push([ylast, ylast, ylast, ylast, y[y.length - 1][Data.VOLUMES]]);
        }
        return this.extendByMain(x, y);
    }
    //深度拷贝
    y = array_copy(y);
    // }
    return { x: x, y: y };
}

DataReader.prototype._formatData = function(x, y) {

    var data = {};
    data.x = x;
    data.y = y;
    data.xunit = this.xunit;
    data.yunit = this.yunit;
    data.maxX = x[0];
    data.minX = x[x.length - 1];
    data.maxIndex=0;
    data.minIndex=0;

    var _minmax = this.getYminmax(y);
    data.maxY = _minmax[1];
    data.minY = _minmax[0];
    data.maxIndex=_minmax[3];
    data.minIndex=_minmax[2];
    return data;
}

DataReader.prototype.formatData = function(x, y) {
    return this._formatData(x, y);
}

DataReader.prototype.last = function(index) {
    if (!index || index < 0) index = 0;
    var y = this.writer.getY(this.c, this.p);
    return y[index];
}

function DataWriter(model, name) {
    this.model = model;
    this.name = name;
    this.config = this.model.config;
    this.storeSet = {};
}

DataWriter.prototype.getStore = function(c, p) {
    this.storeSet = init_obj(this.storeSet, c, p, { x: [], y: [] });
    return this.storeSet[c][p];
}

DataWriter.prototype.clear = function() {
    this.storeSet = {};
}

DataWriter.prototype.setNewData = function(c, p, data) {
    //do nothing.
}

DataWriter.prototype.setDownloadData = function(c, p, data) {
    //do nothing.
}

DataWriter.prototype.getX = function(c, p) {
    var store = this.getStore(c, p);
    return store.x;
}

DataWriter.prototype.getY = function(c, p) {
    var store = this.getStore(c, p);
    return store.y;
}

function DataWriterbdensity(model, name) {
    sup(this, model, name);
}
ClassExtend(DataWriterbdensity, DataWriter);


DataWriterbdensity.prototype.setNewData = function(c, p, data) {
    if (!is_array(data) || data.length == 0) {
        return;
    }
    var store = this.getStore(c, p);
}

DataWriterbdensity.prototype.notify = function(items) {
    if (items && items.length) {
        /*var typename = DataWriterProfit.nameMap[items[items.length - 1][0]];
        typename = typename.replace("/", "_").toLowerCase();
        var url = $("#music_list select[name="+typename+"]").val();
        playmusic(url);
        */
    }
}

DataWriterbdensity.prototype.parseItem = function(items) {
    var newarr = [];
    var type = null;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item[0] == "buy" && item[1] == "open") {
            type = DataWriterProfit.BUY_OPEN;
        } else if (item[0] == "buy" && item[1] == "close") {
            type = DataWriterProfit.BUY_CLOSE;
        } else if (item[0] == "sell" && item[1] == "open") {
            type = DataWriterProfit.SELL_OPEN;
        } else if (item[0] == "sell" && item[1] == "close") {
            type = DataWriterProfit.SELL_CLOSE;
        }
        if (type) {
            newarr[i] = [type, parseFloat(item[2]), item[3]];
        }
    }

    if (newarr.length == 0) {
        return false;
    }
    newarr = this.formatItem(newarr);
    return newarr;
}

DataWriterbdensity.prototype.formatItem = function(arr) {
    for (var i = 0; i < arr.length; i++) {}
    return arr;
}

DataWriterbdensity.prototype.setDownloadData = function(c, p, data) {
    //数据按照时间倒序序进行排列
    var beg, end;
    //处理指标
    if (!is_array(data.x)) {
        return;
    }
    var store = this.getStore(c, p);
    var item;
    for (var i = 0; i < data.x.length; i++) {
        //format time
        var time = formatTime(data.x[i], p);
        store.x.push(time);
        item = data.y[i]; //this.parseItem(data[i][1]);
        if (item) store.y.push(item);
    }

}

function DataWriterCandle(model, name) {
    sup(this, model, name);
    this.chunks = []; //数据在服务器端的[开始,结束,total,在本地数组中的，开始位置，长度，方便删除]
}

ClassExtend(DataWriterCandle, DataWriter);
//重写父类.
//写类不能像读类一样，直接读取model.c 个 model.p 
//因为，数据属于什么类，由服务器端返回的值决定
//
DataWriterCandle.prototype.getStore = function(c, p) {
    this.storeSet = init_obj(this.storeSet, c, p, { time: [], ohlc: [], v: [] });
    return this.storeSet[c][p];
}

DataWriterCandle.prototype.setDownloadDataByOffset = function(c, p, data, options) {
    //数据按照时间倒序序进行排列
    var beg, end;
    //处理指标
    if (!is_array(data.x)) {
        return;
    }
    this.c = c;
    this.p = p;
    var store = this.getStore(c, p);
    data.x = data.x.reverse();
    data.y = data.y.reverse();
    //判断offset 是否衔接，如果不衔接，那么重置所有的数据。
    //如果衔接。要判断一下左衔接 还是 右衔接。
    //如果是左衔接，并且缓存数目超过一个配置的值，那么删除一部分数据
    //每个数据用一个chunks来表示
    options.astart = 0;
    options.alen = data.x.length;
    if (this.chunks.length && options.end + 1 == this.chunks[0].start) { //右衔接[在头部加入数据]
        var len = data.x.length;
        store.time = data.x.concat(store.time);
        store.ohlc = data.y.concat(store.ohlc);
        this.shiftLeftChunk(store, options); //把chunk往左移
    } else if (this.chunks.length && this.chunks[this.chunks.length - 1].end + 1 == options.start) { //左衔接
        var len = data.x.length;
        store.time = store.time.concat(data.x);
        store.ohlc = store.ohlc.concat(data.y);
        this.shiftRightChunk(store, options);
    } else { //不衔接
        store.time = data.x;
        store.ohlc = data.y;
        this.chunks = [];
        this.chunks[0] = options;
    }
    //更新数据offset 的范围
    this.model.leftoffset = this.chunks[this.chunks.length - 1].end;
    this.model.rightoffset = this.chunks[0].start;
}

DataWriterCandle.prototype.shiftLeftChunk = function(store, options) {
    //update chunk data
    for (var i = 0; i < this.chunks.length; i++) {
        this.chunks[i].astart += options.alen;
    }
    this.chunks.unshift(options);
    //更新数据指针，头部数据被加入
    this.model.point(this.model.point() + options.alen);
    if (store.time.length > this.config.Global.maxStoreChunk * this.config.Global.downloadCount) {
        var chunk = this.chunks.pop();
        store.time.splice(chunk.astart);
        store.ohlc.splice(chunk.astart);
    }
}

DataWriterCandle.prototype.shiftRightChunk = function(store, options) {
    //处理chunk
    var lastchunk = this.chunks[this.chunks.length - 1];
    options.astart += lastchunk.astart + lastchunk.alen;
    this.chunks.push(options);

    if (store.time.length > this.config.Global.maxStoreChunk * this.config.Global.downloadCount) {
        var chunk = this.chunks.shift();
        for (var i = 0; i < this.chunks.length; i++) {
            this.chunks[i].astart -= chunk.alen;
        }
        //头部数据被删除
        store.time.splice(0, chunk.alen);
        store.ohlc.splice(0, chunk.alen);
        //更新数据指针
        var point = this.model.point();
        point -= chunk.alen;
        this.model.point(point);
    }
}

DataWriterCandle.prototype.setUpdateData = function(c, p, data) {
        //更新第一个数据
        if (!is_array(data.x) || data.x.length == 0) {
            return;
        }
        var store = this.getStore(c, p);
        var mintime = data.x[0];
        data.x = data.x.reverse();
        data.y = data.y.reverse();

        if (store.time.length == 0 || parseInt(data.options.prev_calculated) == 0) {
            store.time = data.x;
            store.ohlc = data.y;
            //console.log(store.time);
            return;
        }
        var i = 0;
        while (i < store.time.length && store.time[i] >= mintime) {
            i++;
        }
        if (i == store.time.length) {
            store.time = data.x;
            store.ohlc = data.y;
        } else {
            store.time.splice(0, i);
            store.ohlc.splice(0, i);
            store.time = data.x.concat(store.time);
            store.ohlc = data.y.concat(store.ohlc);
        }
    }
    /*
    DataWriterCandle.prototype.setNewData = function(c, p, data)
    {
       console.log("newdata=",data,is_array(data),data.length);
        //更新第一个数据
        if (!is_array(data) || data.length == 0)
        {
            return;
        }
        data = data.reverse();
        var store = this.getStore(c, p);
        var time = parseInt(data[0][0]);
        while (data.length && time < store.time[0])
        {
            data.shift();
            time = parseInt(data[0][0]);
        }
        if (data.length == 0)
        {
            return;
        }
        //
        for (var i = 1; i < data[0].length; i++)
        {
            data[0][i] = parseFloat(data[0][i]);
        }
        var first = data[0].slice(1);
        if (time == store.time[0])
        {
            store.time[0] = time;
            store.ohlc[0] = first;
        } else {
            store.time.unshift(time);
            store.ohlc.unshift(first);
        }
        if (isNaN(store.ohlc[0][0]))
        {
            alert("update new NaN");
        }
        //store.v[0]  = parseFloat(data[0][5]);
        for (var i =  1; i < data.length; i++)
        {
            if (!is_array(data[i]))
            {
                continue;
            }
            for (var j = 1; j < data[i].length; j++)
            {
                data[i][j] = parseFloat(data[i][j]);
            }
            store.time.unshift(parseInt(data[i][0]));
            var newdata = data[i].slice(1);
            store.ohlc.unshift(newdata);
        }
    }*/
DataWriterCandle.prototype.setNewData = function(c, p, data) {
    //更新第一个数据
    if (!is_array(data.x) || data.x.length == 0) {
        return;
    }
    var store = this.getStore(c, p);
    var time = parseInt(data.x[0]);
    while (data.x.length && time < store.time[0]) {
        data.x.shift();
        data.y.shift();
        time = parseInt(data.x[0]);
    }
    if (data.x.length == 0) {
        return;
    }
    var first = data.y[0];
    if (time == store.time[0]) {
        store.time[0] = time;
        store.ohlc[0] = data.y[0]
    } else {
        store.time.unshift(time);
        store.ohlc.unshift(data.y[0]);
    }
    if (isNaN(store.ohlc[0][0])) {
        alert("update new NaN");
    }
    for (var i = 1; i < data.x.length; i++) {
        store.time.unshift(data.x[i]);
        store.ohlc.unshift(data.y[i]);
    }
}


DataWriterCandle.prototype.getX = function(c, p) {
    var store = this.getStore(c, p);
    return store.time;
}

DataWriterCandle.prototype.getY = function(c, p) {
    var store = this.getStore(c, p);
    return store.ohlc;
}

DataWriterCandle.prototype.setDownloadData = function(c, p, data) {
    //数据按照时间倒序序进行排列
    var beg, end;
    //处理指标
    if (!is_array(data)) {
    if (is_array(data.x) && is_array(data.y)) {
        var newdata = [];
            for (var i = data.x.length -1; i >= 0; i--) {
                var item = [];
                item.push(data.x[i]);
                item = item.concat(data.y[i]);
        newdata.push(item);
        }
            data = newdata;
    } else {
        return;
    }
    }
    var store = this.getStore(c, p);
    for (var i = 0; i < data.length; i++) {
        if (!is_array(data[i])) {
            continue;
        }
        for (var j = 1; j < data[i].length; j++) {
            data[i][j] = parseFloat(data[i][j]);
        }
        store.time.push(parseInt(data[i][0]));
        store.ohlc.push(data[i].slice(1));
    }
}

function DataWriterFractals(model, name) {
    sup(this, model, name);
}
ClassExtend(DataWriterFractals, DataWriter);


DataWriterFractals.prototype.setNewData = function(c, p, data) {
    if (!is_array(data) || data.length == 0) {
        return;
    }
    //data = data.reverse();
    var store = this.getStore(c, p);
    /*
    for (var i =  0; i < data.length; i++)
    {
        if (!is_array(data[i]))
        {
            continue;
        }
        var item = this.parseItem(data[i][1]);
        var newitem;
        if (item) {} else {continue;}
        var time = formatTime(data[i][0], p);
        if (store.x[0] == time) {
            //可能会有新的买卖点
            newitem = array_diff(item, store.y[0]);
            store.y[0] = item;
        } else {
            store.x.unshift(time);
            store.y.unshift(item);
            newitem = item;
        }
        this.notify(newitem);
    }
    */
}

DataWriterFractals.prototype.notify = function(items) {
    if (items && items.length) {
        /*var typename = DataWriterProfit.nameMap[items[items.length - 1][0]];
        typename = typename.replace("/", "_").toLowerCase();
        var url = $("#music_list select[name="+typename+"]").val();
        playmusic(url);
        */
    }
}

DataWriterFractals.prototype.parseItem = function(items) {
    var newarr = [];
    var type = null;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item[0] == "buy" && item[1] == "open") {
            type = DataWriterProfit.BUY_OPEN;
        } else if (item[0] == "buy" && item[1] == "close") {
            type = DataWriterProfit.BUY_CLOSE;
        } else if (item[0] == "sell" && item[1] == "open") {
            type = DataWriterProfit.SELL_OPEN;
        } else if (item[0] == "sell" && item[1] == "close") {
            type = DataWriterProfit.SELL_CLOSE;
        }
        if (type) {
            newarr[i] = [type, parseFloat(item[2]), item[3]];
        }
    }

    if (newarr.length == 0) {
        return false;
    }
    newarr = this.formatItem(newarr);
    return newarr;
}

DataWriterFractals.prototype.formatItem = function(arr) {
    for (var i = 0; i < arr.length; i++) {}
    return arr;
}

DataWriterFractals.prototype.setDownloadData = function(c, p, data) {
    //数据按照时间倒序序进行排列
    var beg, end;
    //处理指标
    if (!is_array(data.x)) {
        return;
    }
    var store = this.getStore(c, p);
    var item;
    for (var i = 0; i < data.x.length; i++) {
        //format time
        var time = formatTime(data.x[i], p);
        store.x.push(time);
        item = data.y[i]; //this.parseItem(data[i][1]);
        if (item) store.y.push(item);
    }
}


function DataWriterKshape(model, name) {
    sup(this, model, name);
}
ClassExtend(DataWriterKshape, DataWriter);


DataWriterKshape.prototype.setNewData = function(c, p, data) {
    if (!is_array(data) || data.length == 0) {
        return;
    }
    //data = data.reverse();
    var store = this.getStore(c, p);
    /*
    for (var i =  0; i < data.length; i++)
    {
        if (!is_array(data[i]))
        {
            continue;
        }
        var item = this.parseItem(data[i][1]);
        var newitem;
        if (item) {} else {continue;}
        var time = formatTime(data[i][0], p);
        if (store.x[0] == time) {
            //可能会有新的买卖点
            newitem = array_diff(item, store.y[0]);
            store.y[0] = item;
        } else {
            store.x.unshift(time);
            store.y.unshift(item);
            newitem = item;
        }
        this.notify(newitem);
    }
    */
}

DataWriterKshape.prototype.notify = function(items) {
    if (items && items.length) {
        /*var typename = DataWriterProfit.nameMap[items[items.length - 1][0]];
        typename = typename.replace("/", "_").toLowerCase();
        var url = $("#music_list select[name="+typename+"]").val();
        playmusic(url);
        */
    }
}

DataWriterKshape.prototype.parseItem = function(items) {
    var newarr = [];
    var type = null;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item[0] == "buy" && item[1] == "open") {
            type = DataWriterProfit.BUY_OPEN;
        } else if (item[0] == "buy" && item[1] == "close") {
            type = DataWriterProfit.BUY_CLOSE;
        } else if (item[0] == "sell" && item[1] == "open") {
            type = DataWriterProfit.SELL_OPEN;
        } else if (item[0] == "sell" && item[1] == "close") {
            type = DataWriterProfit.SELL_CLOSE;
        }
        if (type) {
            newarr[i] = [type, parseFloat(item[2]), item[3]];
        }
    }

    if (newarr.length == 0) {
        return false;
    }
    newarr = this.formatItem(newarr);
    return newarr;
}

DataWriterKshape.prototype.formatItem = function(arr) {
    for (var i = 0; i < arr.length; i++) {}
    return arr;
}

DataWriterKshape.prototype.setDownloadData = function(c, p, data) {
    //数据按照时间倒序序进行排列
    var beg, end;
    //处理指标
    if (!is_array(data.x)) {
        return;
    }
    var store = this.getStore(c, p);
    var item;
    for (var i = 0; i < data.x.length; i++) {
        //format time
        var time = formatTime(data.x[i], p);
        store.x.push(time);
        item = data.y[i]; //this.parseItem(data[i][1]);
        if (item) store.y.push(item);
    }
}


function DataWriterMath(model, name) {
    sup(this, model, name);
}
ClassExtend(DataWriterMath, DataWriter);

function DataWriterProfit(model, name) {
    sup(this, model, name);
}
ClassExtend(DataWriterProfit, DataWriter);

DataWriterProfit.BUY_OPEN = 1;
DataWriterProfit.BUY_CLOSE = 2;
DataWriterProfit.SELL_OPEN = 3;
DataWriterProfit.SELL_CLOSE = 4;

DataWriterProfit.nameMap = {
    1: "Open/Buy",
    2: "Close/Buy",
    3: "Open/Sell",
    4: "Close/Sell"
};

DataWriterProfit.prototype.setNewData = function(c, p, data) {
    if (!is_array(data) || data.length == 0) {
        return;
    }
    data = data.reverse();
    var store = this.getStore(c, p);
    for (var i = 0; i < data.length; i++) {
        if (!is_array(data[i])) {
            continue;
        }
        var item = this.parseItem(data[i][1]);
        var newitem;
        if (item) {} else {
            continue;
        }
        var time = formatTime(data[i][0], p);
        if (store.x[0] == time) {
            //可能会有新的买卖点
            newitem = array_diff(item, store.y[0]);
            store.y[0] = item;
        } else {
            store.x.unshift(time);
            store.y.unshift(item);
            newitem = item;
        }
        this.notify(newitem);
    }
}

DataWriterProfit.prototype.notify = function(items) {
    if (items && items.length) {
        var typename = DataWriterProfit.nameMap[items[items.length - 1][0]];
        typename = typename.replace("/", "_").toLowerCase();
        var url = $("#music_list select[name=" + typename + "]").val();
        // playmusic(url);
    }
}

DataWriterProfit.prototype.parseItem = function(items) {

    var newarr = [];
    var type = null;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item[0] == "buy" && item[1] == "open") {
            type = DataWriterProfit.BUY_OPEN;
        } else if (item[0] == "buy" && item[1] == "close") {
            type = DataWriterProfit.BUY_CLOSE;
        } else if (item[0] == "sell" && item[1] == "open") {
            type = DataWriterProfit.SELL_OPEN;
        } else if (item[0] == "sell" && item[1] == "close") {
            type = DataWriterProfit.SELL_CLOSE;
        }
        if (type) {
            newarr[i] = [type, parseFloat(item[2]), item[3]];
        }
    }

    if (newarr.length == 0) {
        return false;
    }
    newarr = this.formatItem(newarr);
    return newarr;
}

DataWriterProfit.prototype.formatItem = function(arr) {
    for (var i = 0; i < arr.length; i++) {}
    return arr;
}

DataWriterProfit.prototype.setDownloadData = function(c, p, data) {
    //数据按照时间倒序序进行排列
    var beg, end;
    //处理指标
    if (!is_array(data)) {
        return;
    }
    var store = this.getStore(c, p);
    var item;
    for (var i = 0; i < data.length; i++) {
        if (!is_array(data[i])) {
            continue;
        }
        //format time
        var time = formatTime(data[i][0], p);
        store.x.push(time);
        item = this.parseItem(data[i][1]);
        if (item) store.y.push(item);
    }
}

function DataWriterTickSource(model, name) {
    sup(this, model, name);
    this.lastSource = null;
}
ClassExtend(DataWriterTickSource, DataWriter);

DataWriterTickSource.prototype.setNewData = function(c, type, data) {
    if (!is_array(data) || !is_array(data[0])) return;
    this.lastSource = type;
    var store = this.getStore(c, type);
    for (var i = 0; i < data.length; i++) {
        store.x.push(parseInt(data[i][0]) * 1000 + parseInt(data[i][1]));
        store.y.push([parseFloat(data[i][2]), parseFloat(data[i][3])]);
    }

    if (store.x.length > this.maxdata) {
        store.x = store.x.slice(this.maxdata / 2);
        store.y = store.y.slice(this.maxdata / 2);
    }
}


function DataReaderadx(model, writer, name) {
    sup(this, model, writer, name);
}
ClassExtend(DataReaderadx, DataReader);


function DataReaderAjax(model, writer, name) {
    this.isinit = false;
    sup(this, model, writer, name);
    this.data = {};
    this.lastdata = {};


}

ClassExtend(DataReaderAjax, DataReader);

DataReaderAjax.prototype.setParam = function(param) {
    if (this.isinit) return;
    this.isinit = true;
    var url = param[1];
    var _this = this;
    $.get(url, function(data) {
        _this.setAjaxData(data);
    }, "json");
}

DataReaderAjax.prototype.setAjaxData = function(data) {
    this.data = data;
    this.model.ready = true;
    this.model.controller.flag("down");
    //this.model.ready = false; //不更新图表了
    this.main = this;
    return this;
}

DataReaderAjax.prototype.getX = function() {
    return this.data.x;
}

DataReaderAjax.prototype.getY = function() {
    return this.data.y;
}


DataReaderAjax.prototype.getData = function(number, readconfig) {
    var start = this.getStart(number);
    this.lastdata = this.data.y[0];
    start = this.getStart(number);
    index = 0;
    var x = [];
    var y = [];
    for (var i = start; i < this.data.x.length; i++) {
        x[index] = this.data.x[i];
        y[index] = this.data.y[i];
        index++;
        if (index >= number) {
            break;
        }
    }
    var data = {};
    data.x = x;
    data.y = array_copy2d(y);
    return data;
}

DataReaderAjax.prototype.last = function() {
    return this.lastdata;
}

DataReaderAjax.prototype.close = function(index) {
    if (!index || index < 0) index = 0;
    return this.data.y[index][Data.CLOSE];
}


DataReaderAjax.prototype.getEndPos = function() {
    var x = this.data.x;
    return x.length - 1;
}

DataReaderAjax.prototype.startXValue = function() {
    var x = this.data.x;
    return x[x.length - 1];
}

DataReaderAjax.prototype.endXValue = function() {
    var x = this.data.x;
    return x[0];
}

//现在，这样处理，一旦指标被注册了，
//就会首先在已知K线上进行初始化操作。这个初始化操作是已有K线时间范围的数据
//后面的数据，就会绑定在K线的下载结果里面
//在指标初始化未结束的时候，如果这个时候，指标绑定下载了数据，那么就会保存在一个缓冲区里面。
//指标初始化过程类似K线的初始化过程如下：先下载第一个1000个K线的指标。显示出来，
//然后下载后面的指标,下载结束以后，合并缓冲区里面的指标，最后，初始化结束。

function DataReaderatr(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderatr, DataReader);


//���ڣ�����������һ��ָ�걻ע���ˣ�
//�ͻ���������֪K���Ͻ��г�ʼ��������������ʼ������������K��ʱ�䷶Χ������
//���������ݣ��ͻ�������K�ߵ����ؽ�������
//��ָ����ʼ��δ������ʱ������������ʱ����ָ���������������ݣ���ô�ͻᱣ����һ�����������档
//ָ����ʼ����������K�ߵĳ�ʼ���������£������ص�һ��1000��K�ߵ�ָ�ꡣ��ʾ������
//Ȼ�����غ�����ָ��,���ؽ����Ժ󣬺ϲ�������������ָ�꣬���󣬳�ʼ��������

//
//��ȡ����ͼ������
//
function DataReaderbdensity(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderbdensity, DataReader);

DataReaderbdensity.prototype.getYminmax = function(y) {
    var ymax = -Infinity;
    var ymin = Infinity;
    var maxIndex=0;
    var minIndex=0;
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    var nIndex = 0;
    for (var i = 0; i < y.length; i++) {
        for (var j = 0; j < y[i].length; j++) {
            nIndex = (j / 4) * 4 + 2
            if (j % 4 <= 1 && y[i][nIndex] != 0) {
                var value = y[i][j];
                if (value > ymax) {
                    ymax = value;
                    maxIndex=i;
                }
                if (value < ymin) {
                    ymin = value;
                    minIndex=i;
                }
            }
        }
    }
   console.log("ymin:"+ymin+",ymax:"+ymax);
    return [ymin, ymax,minIndex,maxIndex];
}

//现在，这样处理，一旦指标被注册了，
//就会首先在已知K线上进行初始化操作。这个初始化操作是已有K线时间范围的数据
//后面的数据，就会绑定在K线的下载结果里面
//在指标初始化未结束的时候，如果这个时候，指标绑定下载了数据，那么就会保存在一个缓冲区里面。
//指标初始化过程类似K线的初始化过程如下：先下载第一个1000个K线的指标。显示出来，
//然后下载后面的指标,下载结束以后，合并缓冲区里面的指标，最后，初始化结束。

function DataReaderBolling(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderBolling, DataReader);


//现在，这样处理，一旦指标被注册了，
//就会首先在已知K线上进行初始化操作。这个初始化操作是已有K线时间范围的数据
//后面的数据，就会绑定在K线的下载结果里面
//在指标初始化未结束的时候，如果这个时候，指标绑定下载了数据，那么就会保存在一个缓冲区里面。
//指标初始化过程类似K线的初始化过程如下：先下载第一个1000个K线的指标。显示出来，
//然后下载后面的指标,下载结束以后，合并缓冲区里面的指标，最后，初始化结束。

function DataReaderBollingDesity(model, writer, name) {
    sup(this, model, writer, name);
    this.sourcedata = null;
}

ClassExtend(DataReaderBollingDesity, DataReader);

DataReaderBollingDesity.prototype.formatData = function(x, y) {
    var data = {};
    data.x = x;
    data.y = y;
    data.xunit = this.xunit;
    data.yunit = this.yunit;
    data.maxX = x[0];
    data.minX = x[x.length - 1];
    data.maxIndex=0;
    data.minIndex=0;

    var min = Infinity
    var max = -Infinity;
    for (var i = 0; i < y.length; i++) {
        for (var j = 0; j < y.length; j += 2) {
            if (y[i][j] == -1) {
                continue;
            }
            if (max < y[i][j]) {
                max = y[i][j];
                data.maxIndex=i;
            }

            if (min > y[i][j]) {
                min = y[i][j];
                data.minIndex=i;
            }
        }
    }
    data.maxY = max;
    data.minY = min;
    return data;
}

//
//读取蜡烛图的数据
//

function DataReaderCandle(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderCandle, DataReader);
//抽象函数，不提供任何的功能。
DataReaderCandle.prototype.getDataByNumber = function(number, readconfig) {
    if (readconfig & DataReader.EXTEND) {
        //以扩展的方式读取
        return this.getDataByNumberExtend(number, readconfig);
    }
    //普通的读取方式
    //这里，如果读取到末尾了，要修正start
    var x = new Array(number);
    var y = new Array(number);;
    var index = 0;
    start = this.getStart(number);
    for (var i = start; i < this.store.time.length; i++) {
        x[index] = this.store.time[i];
        y[index] = this.store.ohlc[i];
        index++;
        if (index >= number) {
            break;
        }
    }
    if (index < number) {
        x = x.slice(0, index - 1);
        y = y.slice(0, index - 1);
    }
    //深度复制
    y = array_copy2d(y);
    return { x: x, y: y };
}

DataReaderCandle.prototype.getData = function(number, readconfig) {
    return this.getDataByNumber(number, readconfig);
}

DataReaderCandle.prototype.getDataByNumberExtend = function(number, readconfig) {
    // console.log("number:"+number);
    var x = new Array(number);
    var y = new Array(number);
    var index = 0;
    //普通的读取方式
    //这里，如果读取到末尾了，要修正start
    var start = this.getStart(number);
    var xdata = this.writer.getX(this.c, this.p);
    var ydata = this.writer.getY(this.c, this.p);
    var length = xdata.length;
    if (length == 0) {
        return { x: [], y: [] };
    }
    x[index] = xdata[start];
    y[index] = ydata[start];
    for (var i = start; i < length - 1; i++) {
        var ctime = xdata[i]; //当前时间
        var ptime = xdata[i + 1]; //前一个时间
        //1. 
        if (ctime - ptime == this.step || ctime - ptime > this.maxstep) { //连续，或者相差太大。加入
            index++;
            x[index] = xdata[i + 1];
            y[index] = ydata[i + 1];
        } else { //需要补全，x值每次 加step y用 ptime对应的值
            var close = ydata[i + 1][Data.CLOSE];
            var candle = [close, close, close, close, ydata[i + 1][Data.VOLUMES]];
            for (var newtime = xdata[i] - this.step; newtime > xdata[i + 1]; newtime -= this.step) {
                index++;
                x[index] = newtime;
                y[index] = candle;
            }
            index++;
            x[index] = xdata[i + 1];
            y[index] = ydata[i + 1];
        }
        if (index + 1 >= number) {
            break;
        }
    }
    index++;
    if (index < number) {
        x = x.slice(0, index);
        y = y.slice(0, index);
    }
    y = array_copy2d(y);
    return { x: x, y: y };
}

//和main的时间进行对齐，对于稀疏的数据，这个非常重要
DataReaderCandle.prototype.extendByMain = function(xdata, ydata) {
    var mainX = this.getMainData().x;
    var x = new Array();
    var y = new Array();
    var j = 0;
    //1. 如果时间值超过了Main[0]，那么直接忽略
    //2. 如果某个值开始小于main[0]，那么,main 开始加。直到main[i] < 这个值。
    //3. 我们的索引加
    if (xdata.length == 0 || xdata[xdata.length - 1] > mainX[mainX.length - 1]) {
        //无效,这样的情况无法进行补全。
        return { x: [], y: [] };
    }
    //计算第一个数据
    var current = 0,
        count = 0;
    var close = ydata[current][Data.CLOSE];
    candle = [close, close, close, close, ydata[current][Data.VOLUMES]];
    for (var i = 0; i < mainX.length; i++) {
        if (xdata[current] > mainX[i]) //这样的情况是无效的，从程序的条件可以看出，current 不会越界。
        {
            while (xdata[current] > mainX[i]) {
                current++;
            }
            if (!ydata[current]) {
                alert(current); //debug 的信息
            }
            close = ydata[current][Data.CLOSE];
            candle = [close, close, close, close, ydata[current][Data.VOLUMES]];
        }
        if (mainX[i] > xdata[current]) {
            y[count++] = candle;
        } else if (mainX[i] == xdata[current]) {
            y[count++] = ydata[current];
        }
    }
    x = array_copy1d(mainX);
    y = array_copy2d(y);
    return { x: x, y: y };
}

DataReaderCandle.prototype.close = function(index) {
    if (!index || index < 0) index = 0;
    return this.store.ohlc[index][Data.CLOSE];
}

DataReaderCandle.prototype.formatData = function(x, y) {
    var data = {};
    data.x = x;
    data.y = y;
    data.xunit = this.xunit;
    data.yunit = this.yunit;
    data.maxX = x[0];
    var nLen = y.length;
    if (nLen > this.model.plotnum) {
        nLen = this.model.plotnum;
    }
    data.minX = x[nLen - 1];
    data.maxIndex=0;
    data.minIndex=0;

    var min = Infinity
    var max = -Infinity;
    //console.log("model=",this.model.plotnum,x);
    for (var i = 0; i < y.length && i < this.model.plotnum; i++)
    //for(var i=y.length-1;i>=0&& (y.length-i)<=this.model.plotnum;i--)
    {
        if (y[i][Data.HIGH] > max) {
            max = y[i][Data.HIGH];
            data.maxIndex=i;
        }
        if (y[i][Data.LOW] < min) {
            min = y[i][Data.LOW];
            data.minIndex=i;
        }
    }
    data.maxY = max;
    data.minY = min;
    return data;
}

DataReaderCandle.prototype.getYminmax = function(y) {
    var ymax = -Infinity;
    var ymin = Infinity;
    var minIndex=0;
    var maxIndex=0;
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    //for(var i=y.length-1;i>=0&& (y.length-i)<=this.model.plotnum;i--)
    for (var i = 0; i < y.length && i < this.model.plotnum; i++) {
        for (var j = 0; j < 4; j++) {
            var value = y[i][j];
            if (value > ymax) {
                ymax = value;
                maxIndex=i;
            }
            if (value < ymin) {
                ymin = value;
                minIndex=i;
            }
        }
    }
     return [ymin, ymax,minIndex,maxIndex];
}

function PlotEasyforex(plot, canvas) {
    this.plot = plot;
    this.canvas = canvas;
    this.last = last;
    this.initMyPlot();
}

//X Y 轴都要根据数据，绘制图形。
//分离 主绘图区域 的数据 和 candle的 绘制。
//使得数据 和 绘图分离，提高复用能力。
// 
PlotEasyforex.prototype.initMyPlot = function() {

}


//���ڣ�����������һ��ָ�걻ע���ˣ�
//�ͻ���������֪K���Ͻ��г�ʼ��������������ʼ������������K��ʱ�䷶Χ������
//���������ݣ��ͻ�������K�ߵ����ؽ�������
//��ָ����ʼ��δ������ʱ������������ʱ����ָ���������������ݣ���ô�ͻᱣ����һ�����������档
//ָ����ʼ����������K�ߵĳ�ʼ���������£������ص�һ��1000��K�ߵ�ָ�ꡣ��ʾ������
//Ȼ�����غ�����ָ��,���ؽ����Ժ󣬺ϲ�������������ָ�꣬���󣬳�ʼ��������

//
//��ȡ����ͼ������
//
function DataReaderFractals(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderFractals, DataReader);

DataReaderFractals.prototype.getYminmax = function(y) {
    var ymax = -Infinity;
    var ymin = Infinity;
    var minIndex=0;
    var maxIndex=0;
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    for (var i = 0; i < y.length; i++) {
        var value = y[i][1];
        if (value > ymax) {
            ymax = value;
            maxIndex=i;
        }
        if (value < ymin) {
            ymin = value;
            minmax=i;
        }
    }
     return [ymin, ymax,minIndex,maxIndex];
}

function DataReaderIndicators(model, writer, name) {
    sup(this, model, writer, name);
    this.data = {};
    this.lastdata = {};
}

ClassExtend(DataReaderIndicators, DataReader);

DataReaderIndicators.prototype.minmax = function(start, n) {
    var high = -Infinity;
    var low = Infinity;
    for (var i = start; i < start + n && i < this.y.length; i++) {
        if (this.y[i][Data.HIGH] > high) {
            high = this.y[i][Data.HIGH];
        }

        if (this.y[i][Data.LOW] < low) {
            low = this.y[i][Data.LOW];
        }
    }
    // console.log(this.name, high, low);
    return [high, low];
}

DataReaderIndicators.prototype.sum = function(start, length) {
    if (this.y.length < start + length) {
        return false;
    }
    var sum = 0;
    for (var i = start; i < start + length; i++) {
        sum += this.y[i][Data.CLOSE];
    }
    return sum;
}

DataReaderIndicators.prototype.setParam = function(param) {
    this.param = param;
}

DataReaderIndicators.prototype.setDependData = function(name, data) {
    this.data[name] = data;
}

//大多数指标可以这样初始化。如果子类初始化不一样，可以做处理
DataReaderIndicators.prototype.dataInit = function(name) {
    //init 先计算前n个值
    //y是一个二维数组
    if (!name) {
        name = this.param[0][0];
    }
    if (this.data[name] && this.data[name].y) {
        //[read only] 如果需要修改，请先复制。否则会改动原始数据。
        this.y = this.data[name].y;
        this.x = this.data[name].x;
    } else {
        return false;
    }
    //默认数据源是倒序排列的
    if (this.n > this.y.length) {
        return false;
    }
    if (!this.y) {
        return false;
    }
    if (this.y && this.y.length == 0) {
        return false;
    }
    return true;
}

//常用指标的实现
DataReaderIndicators.prototype.wpr = function(n) {
    var data = [];
    var minmax = this.minmax(0, n);
    var low = minmax[1];
    var high = minmax[0];
    var wr;
    if (low == high) {
        wr = 0;
    } else {
        wr = 100 * (this.y[0][Data.CLOSE] - high) / (high - low);
    }
    data.push(wr);
    var index = 0;
    for (var i = 1; i < this.y.length - n; i++) {
        index = i + n - 1; //from i to index, total n number data.
        if (this.y[index][Data.LOW] > low && this.y[index][Data.HIGH] < high && this.y[i][Data.LOW] > low && this.y[i][Data.HIGH] < high) {
            //do nothing, high and low 不会变化
        } else {
            minmax = this.minmax(i, n);
            low = minmax[1];
            high = minmax[0];
        }
        if (low == high) {
            wr = 0;
        } else {
            wr = 100 * (this.y[i][Data.CLOSE] - high) / (high - low);
        }
        data.push(wr);
    }
    //后面为空的补零，这样和时间才能对齐。
    for (var i = 0; i < n; i++) {
        data.push(0);
    }
    return data;
}

DataReaderIndicators.prototype.ma = function(n) {
    var avg = [];
    var sum = this.sum(0, n);
    avg.push(sum / n);
    for (var i = 1; i < this.y.length - n; i++) {
        sum -= this.y[i - 1][Data.CLOSE];
        sum += this.y[i + n - 1][Data.CLOSE];
        avg.push(sum / n);
    }
    for (var i = 0; i < n; i++) {
        avg.push(0);
    }
    return avg;
}

DataReaderIndicators.prototype.strength = function(n) {
    var data = [];
    var high = -Infinity;
    var low = Infinity;
    var index, item;
    for (var i = 0; i < this.y.length - n; i++) {
        index = i + n - 1;
        item = this.y[i][Data.CLOSE] - this.y[index][Data.CLOSE];
        if (high < item) {
            high = item;
        }
        if (low > item) {
            low = item;
        }
        data.push(item);
    }
    for (var i = 0; i < data.length; i++) {
        data[i] = (data[i] / (high - low)) * 100;
    }
    //后面为空的补零，这样和时间才能对齐。
    for (var i = 0; i < n; i++) {
        data.push(0);
    }
    return data;
}

DataReaderIndicators.prototype.last = function() {
    return this.lastdata;
}

//���ڣ�����������һ��ָ�걻ע���ˣ�
//�ͻ���������֪K���Ͻ��г�ʼ��������������ʼ������������K��ʱ�䷶Χ������
//���������ݣ��ͻ�������K�ߵ����ؽ�������
//��ָ����ʼ��δ������ʱ������������ʱ����ָ���������������ݣ���ô�ͻᱣ����һ�����������档
//ָ����ʼ����������K�ߵĳ�ʼ���������£������ص�һ��1000��K�ߵ�ָ�ꡣ��ʾ������
//Ȼ�����غ�����ָ��,���ؽ����Ժ󣬺ϲ�������������ָ�꣬���󣬳�ʼ��������

//
//��ȡ����ͼ������
//
function DataReaderKshape(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderKshape, DataReader);

DataReaderKshape.prototype.getYminmax = function(y) {
    var ymax = -Infinity;
    var ymin = Infinity;
    var maxIndex=0;
    var minIndex=0;
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    for (var i = 0; i < y.length; i++) {
        var value = y[i][0];
        if (value > ymax) {
            ymax = value;
            maxIndex=i;
        }
        if (value < ymin) {
            ymin = value;
            minIndex=i;
        }

    }
    //console.log(ymax)
    //console.log(ymin)
    return [ymin, ymax,minIndex,maxIndex];
}

function DataReaderMa(data, period, shift) {
    if (!period) {
        period = 14;
    }

    if (!shift) {
        shift = 0;
    }
    this.data = data;
    this.period = period;
     $.cookie('period',period);
    this.shift = shift;
    this.X = [];
    this.Y = [];
}
ClassExtend(DataReaderMa, DataReader);
DataReaderMa.prototype.calc = function(start, count, time, data) {
    //计算移动平均线
    //start:
    var sum = 0;
    var i, j;
    for (i = start, j = 0; j < count; i++, j++) {
        this.X[j] = time[i];
    }
}

//现在，这样处理，一旦指标被注册了，
//就会首先在已知K线上进行初始化操作。这个初始化操作是已有K线时间范围的数据
//后面的数据，就会绑定在K线的下载结果里面
//在指标初始化未结束的时候，如果这个时候，指标绑定下载了数据，那么就会保存在一个缓冲区里面。
//指标初始化过程类似K线的初始化过程如下：先下载第一个1000个K线的指标。显示出来，
//然后下载后面的指标,下载结束以后，合并缓冲区里面的指标，最后，初始化结束。

function DataReaderMacd(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderMacd, DataReader);



function DataReaderMaex(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderMaex, DataReader);

function DataReaderMath(model, writer, name) {

    this.data = {};
    this.lastdata = {};
    sup(this, model, writer, name);
    this.start = 0;
    this.end = 0;
    this.number = 0;
    this.xunit = 0;
    this.yunit = 0;
}

ClassExtend(DataReaderMath, DataReader);

//对数学公式来说，只要设置一个 x轴的区间 和 要划分的 数目就可以了

DataReaderMath.prototype.setXArea = function(start, end, number) {
    this.start = start;
    this.end = end;
    this.number = number;
    if (number <= 0) {
        return;
    }
    var x = [];
    var step = (this.end - this.start) / this.number;
    var i = this.start;
    while (i <= this.end) {
        x.push(i);
        i += step;
    }
    this.data.x = x.reverse();
}

DataReaderMath.prototype.setParam = function(param) {
    if (param.length >= 2) {
        param = param[1].split(",");
        for (var i = 0; i < param.length; i++) {
            param[i] = parseInt(param[i]);
        }
        this.setXArea(param[0], param[1], param[2]);
    }
}

DataReaderMath.prototype.last = function() {
    return this.lastdata;
}

DataReaderMath.prototype.getEndPos = function() {
    var x = this.data.x;
    return x.length - 1;
}

DataReaderMath.prototype.startXValue = function() {
    var x = this.data.x;
    return x[x.length - 1];
}

DataReaderMath.prototype.endXValue = function() {
    var x = this.data.x;
    return x[0];
}


DataReaderMath.prototype.formatData = function(x, y) {
    var data = {};
    data.x = x;
    data.y = y;
    data.maxX = x[0];
    data.minX = x[x.length - 1];
    data.maxIndex=0;
    data.minIndex=0;

    var _minmax = minmax(y);
    data.maxY = _minmax[1];
    data.minY = _minmax[0];
    data.maxIndex=_minmax[3];
    data.minIndex=_minmax[2];

    data.xunit = this.getUnit(data.minX, data.maxX);
    data.yunit = this.getUnit(data.minY, data.maxY);
    return data;
}

DataReaderMath.prototype.getUnit = function(min, max) {
        var step = (max - min) / this.number;
        return Math.pow(10, Math.floor(Math.log(step) / Math.LN10));
    }
    //现在，这样处理，一旦指标被注册了，
    //就会首先在已知K线上进行初始化操作。这个初始化操作是已有K线时间范围的数据
    //后面的数据，就会绑定在K线的下载结果里面
    //在指标初始化未结束的时候，如果这个时候，指标绑定下载了数据，那么就会保存在一个缓冲区里面。
    //指标初始化过程类似K线的初始化过程如下：先下载第一个1000个K线的指标。显示出来，
    //然后下载后面的指标,下载结束以后，合并缓冲区里面的指标，最后，初始化结束。

function DataReaderOrder(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderOrder, DataReader);


//
//读取蜡烛图的数据
//
function DataReaderProfit(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderProfit, DataReader);

DataReaderProfit.prototype.getYminmax = function(y) {
    var ymax = -Infinity;
    var ymin = Infinity;
    var maxIndex=0;
    var minIndex=0;
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    for (var i = 0; i < y.length; i++) {
        for (var j = 0; j < y[i].length; j++) {
            var value = y[i][j][1];
            if (value > ymax) {
                ymax = value;
                maxIndex=i;
            }
            if (value < ymin) {
                ymin = value;
                minIndex=i;
            }
        }
    }
    return [ymin, ymax,minIndex,maxIndex];
}

function DataReaderTickSource(model, writer, name) {
    sup(this, model, writer, name);
    this.maxdata = this.config[name].maxdata;
    this.data = {};
    this.cmd = "";
    this.number = 60;
    this.nameToId = { 'FXDD': 0, 'FXPRO': 1, 'EXNESS': 2, 'IRONFX': 3, "FXCM": 4 };
    this.idToName = ['FXDD', 'FXPRO', 'EXNESS', 'IRONFX', "FXCM"];
    this.microsecond = 0;
    this.lastStatus = { width: {}, offset: {}, time: {}, quick: { queue: {}, inquick: false } };
    this.lastdata;
}

ClassExtend(DataReaderTickSource, DataReader);

DataReaderTickSource.prototype.setParam = function(param) {
    this.param = param;
    var cmd = this.param[1].split(",");
    var tmp = cmd.shift();
    tmp = tmp.split("/");
    this.bidask = tmp[0];
    this.number = parseInt(tmp[1]);
    this.microsecond = parseInt(tmp[2]);
    if (!this.c) {
        return;
    }
    var r = [];
    for (var i = 0; i < cmd.length; i++) {
        r.push(this.c + "_" + cmd[i]);
    }
    this.cmd = "tick_source:" + r.join(",");
}

DataReaderTickSource.prototype.getWSCmd = function() {
    this.setParam(this.param);
    return this.cmd;
}

DataReaderTickSource.prototype.getData = function() {
    var type, id;
    var store, len;
    var x, y, bidask;
    var data = { x: [], y: {} };
    this.lastdata = {};
    this.lastStatus.time[this.writer.lastSource] = now();
    for (var i = 0; i < this.idToName.length; i++) {
        x = [];
        y = [];
        type = this.idToName[i];
        id = this.nameToId[type];
        store = this.writer.getStore(this.c, type);
        len = store.x.length;
        if (len == 0) {
            continue;
        }
        if (this.bidask == "bid") {
            bidask = 0;
        } else if (this.bidask == "bid-ask") {
            bidask = -1;
        } else {
            bidask = 1;
        }
        this.lastdata[type] = {};
        this.lastdata[type].bidask = store.y[len - 1];
        for (var j = 0; j < this.number && j < len; j++) {
            var second = store.x[len - 1 - j];
            if (this.microsecond) {
                x[j] = second;
            } else {
                x[j] = parseInt(second / 1000) * 1000;
            }
            if (bidask < 0) {
                y[j] = (store.y[len - 1 - j][0] + store.y[len - 1 - j][1]) / 2;
            } else {
                y[j] = store.y[len - 1 - j][bidask];
            }
        }
        this.lastdata[type].x = x[0];
        this.lastdata[type].y = y[0];
        data.y[type] = { x: x, y: y };
    }
    return data;
}

DataReaderTickSource.prototype.formatData = function(x, y) {
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var hasdata = false;
    var len = 0;
    for (var type in y) {
        if (!is_object(y[type])) continue;
        len = y[type].x.length;
        if (len == 0) {
            continue;
        }
        hasdata = true;
        var data = this._formatData(y[type].x, y[type].y);
        if (minX > data.minX) minX = data.minX;
        if (minY > data.minY) minY = data.minY;
        if (maxX < data.maxX) maxX = data.maxX;
        if (maxY < data.maxY) maxY = data.maxY;
    }
    if (!hasdata) {
        return { x: [], y: [] };
    }
    var data = this.lastInfo();
    data.x = [minX, maxX];
    data.xunit = 1;
    data.yunit = this.yunit;
    data.minX = minX;
    data.minY = minY;
    data.maxY = maxY;
    data.maxX = maxX;
    data.y = [minY, maxY]
    data.data = y;
    return data;
}

DataReaderTickSource.prototype.last = function() {
    return this.lastdata;
}

DataReaderTickSource.prototype.lastInfo = function() {
    //计算平均值
    var avg = 0;
    var num = 0;
    var timemax = -Infinity;
    var timemin = Infinity;

    var tick_timemax = -Infinity;
    var tick_timemin = Infinity;
    var maxname, minname;
    var tick_maxname, tick_minname;
    var last = this.lastdata;
    for (var key in last) {
        if (!is_object(last[key])) {
            continue;
        }
        if (this.lastStatus.time[key] > timemax) {
            timemax = this.lastStatus.time[key];
            maxname = key;
        }
        if (this.lastStatus.time[key] < timemin) {
            timemin = this.lastStatus.time[key];
            minname = key;
        }
        if (last[key].x > tick_timemax) {
            tick_timemax = last[key].x;
            tick_maxname = key;
        }
        if (last[key].x < tick_timemin) {
            tick_timemin = last[key].x;
            tick_minname = key;
        }
        if (typeof this.lastStatus.width[key] === "undefined") {
            this.lastStatus.width[key] = 3;
        }
        num++;
        avg += last[key].y;
    }
    avg = avg / num;
    this.lastStatus.offset.local = now() - tick_timemax;
    this.lastStatus.offset.delt = timemax - timemin;
    //存在突破，要显示最后的bid ask 时间
    if (this.lastStatus.quick.inquick == true) {
        var quick = this.lastStatus.quick;
        quick.queue[this.writer.lastSource] = 1;
        qnumber = 0;
        for (var key in quick.queue) {
            if (quick.queue[key] === 1) {
                qnumber++;
            }
        }
        if (qnumber == num) {
            quick.end = maxname;
            quick.inquick = false;
            quick.delt = this.lastStatus.time[quick.end] - this.lastStatus.time[quick.start];
        }
    }
    var show = false;
    var point = Math.abs(Math.floor(last[maxname].y / this.yunit) - Math.floor(avg / this.yunit));
    if (this.lastStatus.quick.inquick == false && point >= 4) {
        show = true;
        this.lastStatus.quick = {};
        this.lastStatus.quick.bidask = {};
        this.lastStatus.quick.start = maxname;
        this.lastStatus.quick.inquick = true;
        this.lastStatus.quick.queue = {};
        this.lastStatus.quick.point = point;
        this.lastStatus.quick.queue[maxname] = 1;
        for (var key in this.lastStatus.width) {
            if (this.lastStatus.width[key] === 6) this.lastStatus.width[key] = 3;
            this.lastStatus.quick.bidask[key] = this.lastdata[key] ? this.lastdata[key].bidask : [];
        }
        this.lastStatus.width[maxname] = 6;
    }
    if (Math.abs(Math.floor(last[minname].y / this.yunit) - Math.floor(avg / this.yunit)) >= 4) {
        show = true;
        for (var key in this.lastStatus.width) {
            if (this.lastStatus.width[key] === 0.5) this.lastStatus.width[key] = 3;
        }
        this.lastStatus.width[minname] = 0.5;
    }
    this.lastStatus.show = show;
    return this.lastStatus;
    //计算最快值和最慢值
}

function PlotCandleBollingDesity(plot, canvas) {
    this.name = "BollingDesity";
    this.plot = plot;
    this.grid = this.plot.grid;
    this.api = plot.api;
    this.time = [];
    this.data = []; //所有的数据
    this.cdata = new Point([], []); //当前要绘制的点

    this.config = {
        Long: { Up: 0, Low: 2, Color: "Yellow" },
        Mid1: { Up: 4, Low: 6, Color: "Red" },
        Mid2: { Up: 8, Low: 10, Color: "Purple" },
        Short1: { Up: 12, Low: 14, Color: "Green" },
        Short2: { Up: 16, Low: 18, Color: "LightSeaGreen" }
    };

    this.init = false;
    this.databuf = [];
}

//PlotCandle 有一个指标列表，在相应的处理上，加上这个这些接口
//提供下面的接口，用于下载数据，更新数据: 先更新time_start 和 mid_time 
//再更新剩下来的部分

PlotCandleBollingDesity.prototype.init = function(time_start, mid_time, time_end) {

    if (time_start == mid_time) {
        this.initComplete();
        return;
    }
    var _this = this;
    $.get(this.api, { action: 'indicator', name: this.name, 'ts': time_start, 'te': mid_time }, function(data) {
        _this.processHistoryData(data);
        if (mid_time == time_end) {
            this.initComplete();
        }
    }, 'json');

    if (mid_time < time_end) {
        $.get(this.api, { action: 'indicator', name: this.name, 'ts': mid_time + 1, 'te': time_end }, function(data) {
            _this.processHistoryData(data);
            //处理原来下载的数据
            this.initComplete();
        }, 'json');
    }
}

PlotCandleBollingDesity.prototype.initComplete = function() {
    for (var i = 0; i < this.databuf.length; i++) {
        this.processHistoryData(this.databuf[i]);
    }
    this.databuf = [];
    this.init = true;
}

PlotCandleBollingDesity.prototype.draw = function() {
    var X = array_copy(this.cdata.x);
    var Y = array_copy(this.cdata.y);
    //分成5种线来绘制
    var yset = {};
    for (var i = 0; i < X.length; i++) {
        for (var key in this.config) {
            if (typeof key == "string" && key != "undefined") {
                var max_index = this.config[key].Up;
                var min_index = this.config[key].Low;
                var color = this.config[key].Color;
                if (yset[key] === undefined) {
                    yset[key] = {};
                }
                if (Y[i][max_index] != 0) {
                    if (yset[key].Up === undefined) {
                        yset[key].Up = new Point([], [], []);
                    }
                    yset[key].Up.x.push(X[i]);
                    yset[key].Up.y.push(Y[i][max_index]);
                    yset[key].Up.z.push(Y[i][max_index + 1]);
                }
                if (Y[i][min_index] != 0) {
                    if (yset[key].Low === undefined) {
                        yset[key].Low = new Point([], [], []);
                    }
                    yset[key].Low.x.push(X[i]);
                    yset[key].Low.y.push(Y[i][min_index]);
                    yset[key].Low.z.push(Y[i][min_index + 1]);
                }
            }
        }
    }
    var minmax = this.getMinMaxDensity();
    for (var key in yset) {
        if (typeof key == "string" && key != "undefined") {
            if (yset[key].Up) {
                this.drawOne(yset[key].Up, this.config[key].Color, minmax);
            }
            if (yset[key].Low) {
                this.drawOne(yset[key].Low, this.config[key].Color, minmax);
            }
        }
    }
}

PlotCandleBollingDesity.prototype.getLineHeight = function(min, max, data) {
    for (var i = 0; i < data.length; i++) {
        data[i] = Math.floor(((data[i] - min) / (max - min)) * 5) + 1;
    }
    return data;
}

PlotCandleBollingDesity.prototype.drawOne = function(data, color, minmax) {
    data.y = this.grid.getY(data.y);
    data.z = this.getLineHeight(minmax[0], minmax[1], data.z);

    var ctx = this.grid.ctx;
    ctx.fillStyle = color;
    for (var i = 0; i < data.x.length; i++) {
        ctx.fillRect(data.x[i] - this.plot.box_pixel, data.y[i] - data.z[i], 2 * this.plot.box_pixel + 1, data.z[i]);
    }
}

PlotCandleBollingDesity.prototype.updateNew = function(time) {
    //do nothing
}

PlotCandleBollingDesity.prototype.down = function(time_start, time_end) {
    var _this = this;
    $.get(this.api, { action: 'indicator', name: this.name, 'ts': time_start, 'te': time_end }, function(data) {
        if (this.init) {
            _this.processHistoryData(data);
        } else {
            _this.databuf.push(data);
        }
    }, 'json');
}

PlotCandleBollingDesity.prototype.processHistoryData = function(data) {
    var newdata = data[this.name];
    if (!is_array(newdata) || newdata.length == 0) {
        return;
    }
    for (var i = 0; i < newdata.length; i++) {
        var item = newdata[i];
        this.time.push(parseInt(item.pop()));
        var flag = item.shift();
        if (flag == null) {
            item = null;
        } else {
            for (var j = 0; j < item.length; j++) {
                item[j] = parseFloat(item[j]);
            }
        }
        this.data.push(item);
    }
}

PlotCandleBollingDesity.prototype.getDrawData = function(start_index, end_index) {
    var y = this.data.slice(start_index, end_index + 1);
    this.cdata.y = [];
    this.cdata.x = [];
    for (var i = 0; i < y.length - 1; i++) {
        if (y[i] != null) {
            this.cdata.y.push(y[i]);
            this.cdata.x.push(this.plot.X[i]);
        }
    }
    return this.cdata;
}

PlotCandleBollingDesity.prototype.getMinMax = function() {
    var data = this.cdata.y;
    var max = -Infinity;
    var min = Infinity;
    for (var i = 0; i < data.length; i++) {
        for (var key in this.config) {
            if (typeof key == "string" && key != "undefined") {
                var max_index = this.config[key].Up;
                var min_index = this.config[key].Low;

                if (data[i][max_index] > 0 && max < data[i][max_index]) {
                    max = data[i][max_index]
                }
                if (data[i][min_index] > 0 && min > data[i][min_index]) {
                    min = data[i][min_index];
                }
            }
        }
    }
    return [min, max];
}

PlotCandleBollingDesity.prototype.getMinMaxDensity = function() {
        var data = this.cdata.y;
        var max = -Infinity;
        var min = Infinity;
        for (var i = 0; i < data.length; i++) {
            for (var key in this.config) {
                if (typeof key == "string" && key != "undefined") {
                    var max_index = this.config[key].Up;
                    var min_index = this.config[key].Low;
                    max = Math.max(max, data[i][max_index + 1], data[i][min_index + 1]);
                    min = Math.min(min, data[i][max_index + 1], data[i][min_index + 1]);
                }
            }
        }
        return [min, max];
    }
    //arr 从小到大
    //reverse = true arr 从大到小
function bsearch(arr, match, reverse) {
    var start = 0;
    var end = arr.length - 1;
    if (!reverse) {
        reverse = false;
    }
    while (start <= end) {
        mid = Math.floor((end - start) / 2) + start;
        if (arr[mid] > match) {
            if (reverse) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        } else if (arr[mid] < match) {
            if (reverse) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else { //macth
            return mid;
        }
    }
    return -1;
}

//
//读取蜡烛图的数据
//
function DataReaderTrendLine(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderTrendLine, DataReader);

DataReaderTrendLine.prototype.getYminmax = function(y) {
    var ymax = -Infinity;
    var ymin = Infinity;
    var maxIndex=0;
    var minIndex=0;
    //console.log("DataReaderTrendLine.prototype.getYminmax");
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    for (var i = 0; i < y.length; i++) {
        var value = y[i][0];
        if (value > ymax) {
            ymax = value;
            maxIndex=i;
        }
        if (value < ymin) {
            ymin = value;
            minIndex=i;
        }
    }
    return [ymin, ymax,minIndex,maxIndex];
}

//���ڣ�����������һ��ָ�걻ע���ˣ�
//�ͻ���������֪K���Ͻ��г�ʼ��������������ʼ������������K��ʱ�䷶Χ������
//���������ݣ��ͻ�������K�ߵ����ؽ�������
//��ָ����ʼ��δ������ʱ������������ʱ����ָ���������������ݣ���ô�ͻᱣ����һ�����������档
//ָ����ʼ����������K�ߵĳ�ʼ���������£������ص�һ��1000��K�ߵ�ָ�ꡣ��ʾ������
//Ȼ�����غ�����ָ��,���ؽ����Ժ󣬺ϲ�������������ָ�꣬���󣬳�ʼ��������

//
//��ȡ����ͼ������
//
function DataReadervolumes(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReadervolumes, DataReader);

DataReadervolumes.prototype.getDataByMain = function(readconfig) {
    this.mainData = this.getMainData();
    //var start = this.mainData.x[this.mainData.x.length - 1];
    //var end   = this.mainData.x[0];
    var x = new Array();
    var y = new Array();
    for (var i = 0; i < this.mainData.x.length && i < this.model.plotnum; i++) {
        x.push(this.mainData.x[i]);
        if (this.mainData.y[i][Data.OPEN] <= this.mainData.y[i][Data.CLOSE]) {
            y.push([this.mainData.y[i][4]]);
        } else {
            y.push([this.mainData.y[i][4], 0]);
        }
    }
    y = array_copy(y);
    return { x: x, y: y };
}

DataReadervolumes.prototype.getYminmax = function(y) {
    var ymax = -Infinity;
    var ymin = 0;
    var minIndex=0;
    var maxIndex=0;
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    for (var i = 0; i < y.length && i < this.model.plotnum; i++)
    //for(var i=y.length-1;i>=0&& (y.length-i)<=this.model.plotnum;i--)
    {
        var value = y[i][0];
        if (value > ymax) {
            ymax = value;
            maxIndex=i;
        }
    }
    return [0, ymax,minIndex,maxIndex];
}

//���ڣ�����������һ��ָ�걻ע���ˣ�
//�ͻ���������֪K���Ͻ��г�ʼ��������������ʼ������������K��ʱ�䷶Χ������
//���������ݣ��ͻ�������K�ߵ����ؽ�������
//��ָ����ʼ��δ������ʱ������������ʱ����ָ���������������ݣ���ô�ͻᱣ����һ�����������档
//ָ����ʼ����������K�ߵĳ�ʼ���������£������ص�һ��1000��K�ߵ�ָ�ꡣ��ʾ������
//Ȼ�����غ�����ָ��,���ؽ����Ժ󣬺ϲ�������������ָ�꣬���󣬳�ʼ��������

//
//��ȡ����ͼ������
//
function DataReadervolumes2(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReadervolumes2, DataReader);

DataReadervolumes2.prototype.getDataByMain = function(readconfig) {
    this.mainData = this.getMainData();
    var x = new Array();
    var y = new Array();
    for (var i = 0; i < this.mainData.x.length && i < this.model.plotnum; i++) {
        x.push(this.mainData.x[i]);
        y.push([this.mainData.y[i][5]]);
    }
    y = array_copy(y);
    return { x: x, y: y };
}

DataReadervolumes2.prototype.getYminmax = function(y) {
    var ymax = -Infinity;
    var ymin = Infinity;
    var minIndex=0;
    var maxIndex=0;
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    //for(var i=y.length-1;i>=0&& (y.length-i)<=this.model.plotnum;i--)
    for (var i = 0; i < y.length && i < this.model.plotnum; i++) {
        var value = y[i][0];
        if (value > ymax) {
            ymax = value;
            maxIndex=i;
        }
        if (value < ymin) {
            ymin = value;
            minIndex=i;
        }
    }
    return [0, ymax,minIndex,maxIndex];
}


function DataReaderWave(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderWave, DataReader);
//���ڣ�����������һ��ָ�걻ע���ˣ�
//�ͻ���������֪K���Ͻ��г�ʼ��������������ʼ������������K��ʱ�䷶Χ������
//���������ݣ��ͻ�������K�ߵ����ؽ�������
//��ָ����ʼ��δ������ʱ������������ʱ����ָ���������������ݣ���ô�ͻᱣ����һ�����������档
//ָ����ʼ����������K�ߵĳ�ʼ���������£������ص�һ��1000��K�ߵ�ָ�ꡣ��ʾ������
//Ȼ�����غ�����ָ��,���ؽ����Ժ󣬺ϲ�������������ָ�꣬���󣬳�ʼ��������

//
//��ȡ����ͼ������
//
function DataReaderwdensity(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderwdensity, DataReader);

DataReaderwdensity.prototype.getYminmax = function(y) {
    var ymax = -Infinity;
    var ymin = Infinity;
    var minIndex=0;
    var maxIndex=0;
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    for (var i = 0; i < y.length; i++) {
        for (var j = 0; j < y[i].length / 2; j++) {
            if (y[i][j * 2] != 0 && y[i][j * 2 + 1] != 0) {
                var value = y[i][j * 2];
                if (value > ymax) {
                    ymax = value;
                    maxIndex=i;
                }
                if (value < ymin) {
                    ymin = value;
                    minIndex=i;
                }
            }
        }
    }
    return [ymin, ymax,minIndex,maxIndex];
}

//现在，这样处理，一旦指标被注册了，
//就会首先在已知K线上进行初始化操作。这个初始化操作是已有K线时间范围的数据
//后面的数据，就会绑定在K线的下载结果里面
//在指标初始化未结束的时候，如果这个时候，指标绑定下载了数据，那么就会保存在一个缓冲区里面。
//指标初始化过程类似K线的初始化过程如下：先下载第一个1000个K线的指标。显示出来，
//然后下载后面的指标,下载结束以后，合并缓冲区里面的指标，最后，初始化结束。

function DataReaderWpr(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderWpr, DataReader);

function DataReaderMathCos(model, writer, name) {
    sup(this, model, writer, name);
    this.setXArea(-10, 10, 100);
}

ClassExtend(DataReaderMathCos, DataReaderMath);

DataReaderMathCos.prototype.getData = function() {
    if (this.number <= 0 || this.start == this.end) {
        return { x: [], y: [] };
    }
    var y = [];
    var x = this.data.x;
    for (var i = 0; i < x.length; i++) {
        y.push(Math.cos(x[i]));
    }
    this.lastdata = y[0];
    this.data.y = y;
    return this.data;
}

function DataReaderMathSin(model, writer, name) {
    sup(this, model, writer, name);
    this.setXArea(-10, 10, 100);
}

ClassExtend(DataReaderMathSin, DataReaderMath);


DataReaderMathSin.prototype.getData = function() {
    if (this.number <= 0 || this.start == this.end) {
        return { x: [], y: [] };
    }
    var x = this.data.x;
    var y = [];
    for (var i = 0; i < x.length; i++) {
        y.push(Math.sin(x[i]));
    }
    this.lastdata = y[0];
    this.data.y = y;
    return this.data;
}

function DataReaderIndicatorsBolling(model, writer, name) {
    sup(this, model, writer, name);
    this.nPeriod = 12;
    this.nDev = 2;
    this.vlast = [0, 0, 0];
}

ClassExtend(DataReaderIndicatorsBolling, DataReaderIndicators);

DataReaderIndicatorsBolling.prototype.setParam = function(param) {
    //这个函数里面做一定的初始化工作。特别是shift
    this.param = param;
    n = param[1].split(",");
    this.nPeriod = parseInt(n[0]);
    this.nDev = parseInt(n[1]);
    this.shift = this.nPeriod;
}

DataReaderIndicatorsBolling.prototype.getData = function() {
    var mx = this.model.maindata.x;
    var my = this.model.maindata.y
    if (mx.length < this.nPeriod) {
        return { x: [], y: [] };
    }
    var sum = 0;
    for (var i = 0; i < this.nPeriod; i++) {
        sum += my[i][Data.CLOSE];
    }
    var avg = [];
    var matime = [];
    var sma = 0.0,
        dev = 0.0;
    sma = sum / this.nPeriod;
    for (var i = 0; i < this.nPeriod; i++) {
        dev += Math.pow((my[i][Data.CLOSE] - sma), 2);
    }
    dev = Math.sqrt(dev / this.nPeriod);
    avg.push([sma, (sma + this.nDev * dev), (sma - this.nDev * dev)]);
    matime.push(mx[0]);
    for (var i = 1; i <= (mx.length - this.nPeriod) && i < this.model.plotnum; i++) {
        sum -= my[i - 1][Data.CLOSE];
        sum += my[i + this.nPeriod - 1][Data.CLOSE];
        sma = sum / this.nPeriod;
        dev = 0;
        for (var j = 0; j < this.nPeriod; j++) {
            dev += Math.pow((my[i + j][Data.CLOSE] - sma), 2);
        }
        dev = Math.sqrt(dev / this.nPeriod);
        avg.push([sma, (sma + this.nDev * dev), (sma - this.nDev * dev)]);
        matime.push(mx[i]);
    }
    this.vlast = [sma, (sma + this.nDev * dev), (sma - this.nDev * dev)];
    return { x: matime, y: avg };
}

DataReaderIndicatorsBolling.prototype.last = function() {
    return this.vlast;
}

function DataReaderIndicatorsDWPR(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderIndicatorsDWPR, DataReaderIndicators);

//对指标，数据部分由
DataReaderIndicatorsDWPR.prototype.setN = function(n) {
    this.n = parseInt(n);
    this.shift = parseInt(n);
}

DataReaderIndicatorsDWPR.prototype.setParam = function(param) {
    //这个函数里面做一定的初始化工作。特别是shift
    this.param = param;
    this.n = param[1].split(",");
    this.n[0] = parseInt(this.n[0]);
    this.n[1] = parseInt(this.n[1]);
    this.reffer = this.param[0];
    this.shift = Math.max(this.n[0], this.n[1]);
}

DataReaderIndicatorsDWPR.prototype.getData = function() {
    //
    if (!this.dataInit(this.reffer[0])) {
        return { x: [], y: [] };
    }
    var data1 = this.wpr(this.n[0]);
    if (!this.dataInit(this.reffer[1])) {
        return { x: [], y: [] };
    }
    var data2 = this.wpr(this.n[1]);

    if (data1.length != data2.length) {
        return { x: [], y: [] };
    }
    var data = [];
    for (var i = 0; i < data1.length; i++) {
        data[i] = data1[i] - data2[i];
    }
    this.lastdata = data[0];
    return { x: this.x, y: data };
}

function DataReaderIndicatorsKDJ(model, writer, name) {
    sup(this, model, writer, name);
    this.nPeriod = 9;
    this.factor_1 = 2.0 / 3.0;
    this.factor_2 = 1.0 / 3.0;
    this.vlast = [0, 0, 0];
}

ClassExtend(DataReaderIndicatorsKDJ, DataReaderIndicators);


DataReaderIndicatorsKDJ.prototype.setParam = function(param) {
    //这个函数里面做一定的初始化工作。特别是shift
    this.param = param;
    n = param[1].split(",");
    this.nPeriod = parseInt(n[0]);
    this.shift = this.nPeriod;
}

DataReaderIndicatorsKDJ.prototype.getData = function() {
    var mx = this.model.maindata.x.reverse();
    var my = this.model.maindata.y.reverse();
    if (mx.length < this.nPeriod) {
        return { x: [], y: [] };
    }
    var k, d, j, rsv;
    var yvalue = [];
    var matime = [];
    var cn, ln, hn;
    var kpre = 50;
    var dpre = 50;
    for (i = this.nPeriod - 1; i < mx.length; i++) {
        ln = Infinity;
        hn = -Infinity;
        cn = my[i][Data.CLOSE];
        for (j = 0; j < this.nPeriod; j++) {
            if (ln > my[i - j][Data.LOW]) {
                ln = my[i - j][Data.LOW];
            }
            if (hn < my[i - j][Data.HIGH]) {
                hn = my[i - j][Data.HIGH];
            }
        }
        if ((hn - ln) == 0) {
            rsv = 50;
        } else {
            rsv = (cn - ln) / (hn - ln) * 100;
        }
        k = this.factor_1 * kpre + this.factor_2 * rsv;
        d = this.factor_1 * dpre + this.factor_2 * k;
        j = 3 * d - 2 * k;
        kpre = k;
        dpre = d;
        yvalue.push([k, d, j]);
        matime.push(mx[i]);
    }
    matime = matime.reverse();
    yvalue = yvalue.reverse();
    this.vlast = [k, d, j];
    return { x: matime, y: yvalue };
}

DataReaderIndicatorsKDJ.prototype.last = function() {
    return this.vlast;
}

function DataReaderIndicatorsMa(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderIndicatorsMa, DataReaderIndicators);

//对指标，数据部分由
DataReaderIndicatorsMa.prototype.setN = function(n) {
    this.n = parseInt(n);
    this.shift = parseInt(n);
}

DataReaderIndicatorsMa.prototype.setParam = function(param) {
    //这个函数里面做一定的初始化工作。特别是shift
    this.param = param;
    this.setN(this.param[1]);
}

DataReaderIndicatorsMa.prototype.getData = function() {
    var mx = this.model.maindata.x;
    var my = this.model.maindata.y
    if (mx.length < this.n) {
        return { x: [], y: [] };
    }
    var sum = 0;
    //---- initial accumulation
    //移动平均线的做法：前n个平均数目，那可以从 0 遍历到 length - this.n
    //和一般求解指标不同，我这里采用倒过来求解的办法
    //先初始化平均值
    for (var i = 0; i < this.n; i++) {
        sum += my[i][Data.CLOSE];
    }
    var avg = [];
    var matime = [];
    avg.push(sum / this.n);
    matime.push(mx[0]);
    for (var i = 1; i <= (mx.length - this.n) && i < this.model.plotnum; i++) {
        sum -= my[i - 1][Data.CLOSE];
        sum += my[i + this.n - 1][Data.CLOSE];
        avg.push(sum / this.n);
        matime.push(mx[i]);
    }
    //后面为空的补零，这样和时间才能对齐。
    /*for (var i = 0; i < this.n; i++)
    {
        avg.push(0);
    }*/
    this.lastdata = avg[0];
    return { x: matime, y: avg };
}

function DataReaderIndicatorsMacd(model, writer, name) {
    sup(this, model, writer, name);
    this.nFastPeriod = 12;
    this.nSlowPeriod = 26;
    this.nSignalPeriod = 9;
    this.vlast = [0, 0];
}

ClassExtend(DataReaderIndicatorsMacd, DataReaderIndicators);

DataReaderIndicatorsMacd.prototype.setParam = function(param) {
    //这个函数里面做一定的初始化工作。特别是shift
    this.param = param;
    n = param[1].split(",");
    this.nFastPeriod = parseInt(n[0]);
    this.nSlowPeriod = parseInt(n[1]);
    if (this.nFastPeriod > this.nSlowPeriod) {
        nTmp = this.nFastPeriod;
        this.nFastPeriod = this.nSlowPeriod;
        this.nSlowPeriod = nTmp;
    }
    this.nSignalPeriod = parseInt(n[2]);
    this.shift = this.nSlowPeriod + this.nSignalPeriod;
}

DataReaderIndicatorsMacd.prototype.getData = function() {
    var mx = this.model.maindata.x;
    var my = this.model.maindata.y
    if (mx.length < this.shift) {
        return { x: [], y: [] };
    }
    var sumfast = 0.0;
    for (var i = 1; i <= this.nFastPeriod; i++) {
        sumfast += my[mx.length - i][Data.CLOSE];
    }
    var sumslow = sumfast;
    var vfast = sumfast / this.nFastPeriod;
    var prfast = 2.0 / (this.nFastPeriod + 1.0);
    for (var i = this.nFastPeriod + 1; i <= this.nSlowPeriod; i++) {
        sumslow += my[mx.length - i][Data.CLOSE];
        vfast = vfast * (1 - prfast) + prfast * my[mx.length - i][Data.CLOSE];
    }
    var vslow = sumslow / this.nSlowPeriod;
    var prslow = 2.0 / (this.nSlowPeriod + 1.0);

    var matime = [];
    var macdy = [];
    matime.push(mx[mx.length - this.nSlowPeriod]);
    macdy.push([vfast - vslow, NaN]);
    var summacd = vfast - vslow;
    for (var i = this.nSlowPeriod + 1; i < this.nSlowPeriod + this.nSignalPeriod; i++) {
        vfast = vfast * (1 - prfast) + prfast * my[mx.length - i][Data.CLOSE];
        vslow = vslow * (1 - prslow) + prslow * my[mx.length - i][Data.CLOSE];
        summacd += vfast - vslow;
        matime.push(mx[mx.length - i]);
        if (i < (this.nSlowPeriod + this.nSignalPeriod - 1)) {
            macdy.push([vfast - vslow, NaN]);
        } else {
            macdy.push([vfast - vslow, summacd / this.nSignalPeriod]);
        }
    }

    for (var i = this.nSlowPeriod + this.nSignalPeriod; i <= mx.length; i++) {
        vfast = vfast * (1 - prfast) + prfast * my[mx.length - i][Data.CLOSE];
        vslow = vslow * (1 - prslow) + prslow * my[mx.length - i][Data.CLOSE];
        summacd += vfast - vslow;
        summacd -= macdy[macdy.length - this.nSignalPeriod][0];
        matime.push(mx[mx.length - i]);
        macdy.push([vfast - vslow, summacd / this.nSignalPeriod]);
    }
    this.vlast = [vfast - vslow, summacd / this.nSignalPeriod]
    return { x: matime, y: macdy };
}

DataReaderIndicatorsMacd.prototype.last = function() {
    return this.vlast;
}

// DataReaderIndicatorsMacd.prototype.getYminmax = function(y) {

//     var ymax = -Infinity;
//     var ymin = Infinity;
//     if (!y) {
//         return [ymin, ymax];
//     }
//     for (var i = 1; i <= y.length && i <= this.model.plotnum; i++) {
//         for (var j = 0; j < y[y.length - i].length; j++) {
//             var value = y[y.length - i][j];
//             if (!isNaN(value)) {
//                 if (value > ymax) {
//                     ymax = value;
//                 }
//                 if (value < ymin) {
//                     ymin = value;
//                 }
//             }
//         }
//     }
//     return [ymin, ymax];
// }
DataReaderIndicatorsMacd.prototype.getYminmax = function(y) {

    var ymax = -Infinity;
    var maxIndex=0;
    var minIndex=0;
    var ymin = Infinity;
    if (!y) {
        return [ymin, ymax,minIndex,maxIndex];
    }
    for (var i = 1; i <= y.length && i <= this.model.plotnum; i++) {
        for (var j = 0; j < y[y.length - i].length; j++) {
            var value = y[y.length - i][j];
            if (!isNaN(value)) {
                if (value > ymax) {
                    maxIndex=i;
                    ymax = value;
                }
                if (value < ymin) {
                    minIndex=i;
                    ymin = value;
                }
            }
        }
    }
    return [ymin, ymax,minIndex,maxIndex];
}

function DataReaderIndicatorsMaTrend(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderIndicatorsMaTrend, DataReaderIndicators);

DataReaderIndicatorsMaTrend.prototype.setParam = function(param) {
    //这个函数里面做一定的初始化工作。特别是shift
    this.param = param;
    this.n = param[1].split(",");
    for (var i = 0; i < this.n.length; i++) {
        this.n[i] = parseInt(this.n[i]);
    }
    this.n = this.n.sort(function(a, b) {
        return a - b
    });
    this.reffer = this.param[0];
    this.shift = Math.max.apply(this, this.n);
}

DataReaderIndicatorsMaTrend.prototype.getData = function() {
    var ma = [];
    var trend = [];
    if (!this.dataInit()) {
        return { x: [], y: [] };
    }
    for (var i = 0; i < this.n.length; i++) {
        // alert(this.n[i]);
        ma[i] = this.ma(this.n[i]);
    }
    var num, delt;
    for (var i = 0; i < this.y.length - 1; i++) {
        num = 0;
        delt = 0;
        for (var j = 0; j < this.n.length; j++) {
            if (ma[j][i] > ma[j][i + 1]) {
                num++;
            } else if (ma[j][i] < ma[j][i + 1]) {
                num--;
            }
            delt++;
            for (var k = j + 1; k < this.n.length; k++) {
                if (ma[j][i] > ma[k][i]) {
                    num++;
                } else if (ma[j][i] < ma[k][i]) {
                    num--;
                }
                delt++;
            }
        }
        num = num / delt;
        trend[i] = num;
    }
    trend[this.y.length - 1] = 0;
    this.lastdata = trend[0];
    return { x: this.x, y: trend };
}

function DataReaderIndicatorsRSI(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderIndicatorsRSI, DataReaderIndicators);

//对指标，数据部分由
DataReaderIndicatorsRSI.prototype.setN = function(n) {
    this.n = parseInt(n);
    this.shift = parseInt(n);
}

DataReaderIndicatorsRSI.prototype.setParam = function(param) {
    //这个函数里面做一定的初始化工作。特别是shift
    this.param = param;
    this.reffer = this.param[0];
    this.setN(param[1]);
}

DataReaderIndicatorsRSI.prototype.empty = function() {
    return {
        x: [],
        y: []
    };
}

DataReaderIndicatorsRSI.prototype.getData = function() {
    if (!this.dataInit(this.reffer[1])) {
        return this.empty();
    }
    var K = this.strength(this.n);
    if (!this.dataInit(this.reffer[0])) {
        return this.empty();
    }
    var E = this.strength(this.n);
    if (K.length != E.length) {
        return this.empty();
    }
    var H = [];
    for (var i = 0; i < K.length; i++) {
        H[i] = (K[i] - E[i] + 200) / 4;
    }
    this.lastdata = H[0];
    return { x: this.x, y: H };
}

function DataReaderIndicatorsWPR(model, writer, name) {
    sup(this, model, writer, name);
}

ClassExtend(DataReaderIndicatorsWPR, DataReaderIndicators);

//对指标，数据部分由

DataReaderIndicatorsWPR.prototype.setN = function(n) {
    this.n = parseInt(n);
    this.shift = parseInt(n);
}

DataReaderIndicatorsWPR.prototype.setParam = function(param) {
    //这个函数里面做一定的初始化工作。特别是shift
    this.param = param;
    this.setN(this.param[1]);
}

DataReaderIndicatorsWPR.prototype.getData = function() {
    if (!this.dataInit()) {
        return { x: [], y: [] };
    }
    var data = this.wpr(this.n);
    this.lastdata = data[0];
    return { x: this.x, y: data };
}

function html5chart(api,type,period) {
    if (type&&period) {
        $('#'+type.toLowerCase()).addClass('active');
        //$.clearCookie();
        api.initPair(type, period);
        $.cookie('symbol', type);
        $.cookie('period',period);
         // $.cookie('period',period);
        // var indstr="main:ma|main|5|color=black:ma|main|10|color=yellow:ma|main|20|color=red:ma|main|30|color=green:";
        // api.setInd(indstr);
        api.initInd('MAC');
        // console.log($('li[name="ETH"]'));
    } else {
        $.cookie('symbol', 'BCCBTC');
        $.cookie('period', 'H1');
        // sessionStorage.setItem('period','H1');
        api.initPair('BCCBTC', "H1");
        api.initInd('MAC');
    }
    return;
}