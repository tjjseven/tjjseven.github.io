// document.onkeydown = function () {
//     if (window.event && window.event.keyCode === 123) {
//         event.keyCode = 0;
//         event.returnValue = false;
//         return false;
//     }
// };
tjs.reqAniFrame()


class TS {
    constructor(){

    }
    /*table*/
    tableCom () {
        /*table 更多*/
        var tableTools = document.querySelectorAll('.t-table .t-icon-item'),moreTools = document.querySelectorAll('.t-other-item')
        for (var i = 0; i < tableTools.length; i++) {
            (function (i) {
                tableTools[i].onclick = function () {
                    for (var j = 0; j < moreTools.length; j++) {
                        moreTools[j].style.opacity = 0
                        moreTools[j].style.zIndex = -1
                        tableTools[j].children[0].setAttribute('xlink:href', '#icon-down')
                        // 关闭
                        if(parseInt(tjs.getStyle(moreTools[i], 'opacity'))){
                            moreTools[i].style.zIndex = 0
                            this.children[0].setAttribute('xlink:href', '#icon-down')
                            console.log(1)
                            // 展开
                        }else{
                            moreTools[i].style.cssText += ';z-index:1;opacity:1'
                            // moreTools[i].style.opacity = 1
                            this.children[0].setAttribute('xlink:href', '#icon-up')
                            console.log(2)
                        }
                    }
                }
            }(i))
        }
    }
    /*input*/
    inputCom() {
        var sendCode = document.querySelector('.t-input-verify>label');
        if(!sendCode)return
        sendCode.onclick = function () {
            var flag = 60, that = this;
            if(that.innerHTML !== '获取验证码'){
                return
            }
            that.innerHTML = flag + '秒后重新发送'
            var timer = setInterval(function () {
                flag--;
                that.innerHTML = flag + '秒后重新发送'
                if(flag === 0){
                    clearInterval(timer)
                    that.innerHTML = '获取验证码'
                }
            }, 1000)
        }
        // tjs.throttle()
    }
    /*select*/
    selectCom() {
        var sel = document.querySelectorAll('.t-select>p'), optionItem = document.querySelectorAll('.t-select>ul>li'),
            option = document.querySelectorAll('.t-select>ul'), optionIcon = document.querySelectorAll('.t-select>.t-select-icon');

        for (var j = 0; j < optionItem.length; j++) {
            (function (i) {
                optionItem[i].onclick =  function () {
                    // console.log(i);
                    var that = this
                    this.parentNode.previousElementSibling.innerHTML = this.innerHTML;
                    tjs.removeClass(this.parentNode, 'transitionDropIn')
                    tjs.addClass(this.parentNode, 'transitionDropOut')
                    setTimeout(function () {
                        that.parentNode.style.display = 'none'
                    },500)
                }
            }(j))
        }
        for (var k = 0; k < sel.length; k++) {
            // console.log(option[k])
            sel[k].innerHTML = option[k].firstElementChild.innerHTML;
            (function (i) {
                optionIcon[i].onclick = sel[i].onclick = function () {
                    for (var j = 0; j < sel.length; j++) {
                        option[j].style.display = 'none'
                    }
                    option[i].style.display = 'block'
                    tjs.removeClass(option[i], 'transitionDropOut')
                    tjs.addClass(option[i], 'transitionDropIn')
                }
            }(k))
        }
    }
    /*radio*/
    radioCom() {
        var radio = document.querySelectorAll('.t-radio');
        for (var i = 0; i < radio.length; i++) {
            radio[i].querySelector('label').onclick = function () {
                var use = this.parentNode.parentNode.querySelectorAll('use')
                for (var j = 0; j < use.length; j++) {
                    use[j].setAttribute('xlink:href', '#icon-mxz1')
                }
                this.previousElementSibling.firstElementChild.setAttribute('xlink:href', '#icon-xz1')
            }
        }
    }
    /*checkbox*/
    checkboxCom() {
        var checkbox = document.querySelectorAll('.t-checkbox');
        for (var i = 0; i < checkbox.length; i++) {
            checkbox[i].querySelector('label').onclick = function () {
                // var use = this.parentNode.parentNode.querySelectorAll('use')
                if(this.previousElementSibling.firstElementChild.getAttribute('xlink:href') === '#icon-dmxz'){
                    this.previousElementSibling.firstElementChild.setAttribute('xlink:href', '#icon-dxz')
                }else{
                    this.previousElementSibling.firstElementChild.setAttribute('xlink:href', '#icon-dmxz')
                }
            }
        }
    }

    /**
     * 右键
     */
    keyRight(){
        var box = document.getElementById("keyRight"), keybox = document.querySelector('.key_right');
        if(!keybox) return
        keybox.oncontextmenu = function(ev){
            // console.log(ev)
            box.style.display = "block";
            ev = ev || event;
            box.style.left = ev.pageX+"px";
            box.style.top = ev.pageY+"px";
            return false;
        }
        document.onclick = function(){
            box.style.display = "none";
        }
    }
    /**
     * 倒计时组件
     * @param timer 结束显示区
     * @param hour 小时显示区
     * @param minute 分钟显示区
     * @param second 秒显示区
     * @param date 传入时间 "2017/12/12,1:41"
     */
    backTimers(obj) {
        let clearTime,
            timerEle = document.querySelector(obj.timer),
            dayEle = document.querySelector(obj.day),
            hourEle = document.querySelector(obj.hour),
            minuteEle = document.querySelector(obj.minute),
            secondEle = document.querySelector(obj.second);
        if(!timerEle || !dayEle || !hourEle || !minuteEle || !secondEle){
            return
        }
		let setDate = new Date(obj.date).getTime(), nowDate, newDate, d, h, m, s;
		console.log(obj.date)
        clearTime = setInterval(function () {
            backTime(obj);
        },1000);
        function backTime(obj){
            nowDate = new Date().getTime();
			newDate = (setDate - nowDate)/1000;
			d = parseInt(newDate/(24*60*60));
			h = parseInt(newDate/(60*60)%24);
			m = parseInt((newDate/60)%60);
			s = parseInt(newDate%60);
			// console.log(new Date())
            function addZero(ele, times){
                if(times>= 0 && times< 10){
                    ele.innerHTML = "0" + times;
                }else{
                    ele.innerHTML = times;
                }
            }
            addZero(dayEle, d);
            addZero(secondEle, s);
            addZero(minuteEle, m);
            addZero(hourEle, h);
            if(newDate<= 0){
                timerEle.innerHTML = obj.text || "活动已结束";
                timerEle.style.color = obj.color || "red";
                timerEle.style.fontSize = "16px";
                clearInterval(clearTime)
            }
        }
    }

    /**
     * 提示框组件
     * @param {Object} eleTag 元素
     * @param {Object} attr 需要变动的属性
     * @param {Object} target 目标值
     * @param {Object} speed 每次移动的距离
     * @param {Object} callBack 结束回调
     */
    move(obj) {
        //需要为每一个元素指定一个自己的timer来保存定时器
        var ele = document.querySelector('.t-pop'), that = this;
        if(tjs.getStyle(ele, 'display') === 'block'){
            console.log('点快啦')
            return
        }
        ele.innerHTML = obj.text;
        obj.speed = 30
        obj.target = obj.target || 10
        ele.style.cssText += ';opacity:1;display:block;position:fixed;left:auto;right:auto;top:auto;bottom:auto';
        var popWidth = document.querySelector('.t-pop').offsetWidth,
        popHeight = document.querySelector('.t-pop').offsetHeight; // 不能获取隐藏元素的offsetHeight
        // 判断类型
        console.log(popWidth)
        if(obj.type === 't-success'){
            insertIcon("✔ ")
            obj.speed = 7
            tjs.addClass(ele, 't-success')
        }else if(obj.type === 't-err'){
            insertIcon("× ")
            obj.speed = 5
            tjs.addClass(ele, 't-err')
        }else if(obj.type === 't-info'){
            insertIcon("▪ ")
            tjs.addClass(ele, 't-info')
        }else if(obj.type === 't-warning'){
            insertIcon("! ")
            tjs.addClass(ele, 't-warning')
        }else if(obj.type === 't-alert'){
            obj.speed = 25
            tjs.addClass(ele, 't-alert')
        }

        // 判断方向
        if(obj.attr === 'top'){
            ele.style.left = 'calc(50% - '+ popWidth/2 +'px)'
            ele.style.top = -popHeight + 'px'
        }else if(obj.attr === 'bottom'){
            ele.style.left = 'calc(50% - '+ popWidth/2 +'px)'
            ele.style.bottom = -popHeight + 'px'
        }else if(obj.attr === 'left'){
            ele.style.top = 200 + 'px'
            ele.style.left = -popWidth + 'px'
        }else if(obj.attr === 'right'){
            ele.style.right = -popWidth + 'px'
        }

        clearInterval(ele.timer);
        ele.timer = setInterval(function() {
            var oldValue = parseInt(tjs.getStyle(ele, obj.attr));
            //判断元素的移动方向
            if (oldValue > obj.target) {
                var newValue = oldValue - obj.speed;
                //如果新的值小于目标值，则让新值等于目标值
                if (newValue < obj.target) {
                    newValue = obj.target;
                }
            } else {
                newValue = oldValue + obj.speed;
                //在赋值之前判断
                if (newValue > obj.target) {
                    newValue = obj.target;
                }
            }
            //修改box1的left属性值
            ele.style[obj.attr] = newValue + "px";
            if (newValue === obj.target) {
                //停止定时器
                clearInterval(ele.timer);
                if(obj.time){
                    clearTimeout(ele.timeout)
                    ele.timeout = setTimeout(function () {
                        ele.style.cssText += ';display:none;opacity:0;position:static;left:auto;right:auto;top:auto;bottom:auto'
                        tjs.removeClass(ele, obj.type)
                        //判断是否有回调函数
                        if (obj.callBack) {
                            obj.callBack();
                        }
                    },obj.time)
                }
            }
        }, 10);

        // 插入icon
        function insertIcon(icon) {
            var reg = new RegExp(icon,"g");
            if(!reg.test(ele.childNodes[0].nodeValue)){
                ele.childNodes.item(0).insertData(0,icon)
            }
        }

    }

    /**
     * 联动菜单组件
     */
    linkage(){
        var that = this,linkageArr = document.querySelectorAll('.t-linkage>p')
        // 获取所有兄弟节点
        function getsiblings(myself) {
            var siblingsArr = []
            for (var j = 0; j < myself.parentNode.children.length; j++) {
                if(myself.parentNode.children[j] !== myself){
                    siblingsArr.push(myself.parentNode.children[j])
                }
            }
            return siblingsArr
        }
        // 给子节点添加class
        function addSelfClass(siblings, index, cls, self) {
            for (var k = 0; k < siblings.length; k++) {
                // 判断兄弟的子节点是否有class
                if(tjs.hasClass(siblings[k].children[index], cls)){
                    tjs.removeClass(siblings[k].children[index], cls)
                }
            }
            tjs.addClass(self, cls)
        }
        for (var i = 0; i < linkageArr.length; i++) {
            linkageArr[i].onclick = function () {
                var myself = this.parentNode;
                if(this.nextElementSibling){
                    console.log(tjs.hasClass(this.nextElementSibling, 't-linkage-show'))
                    if(!tjs.hasClass(this.nextElementSibling, 't-linkage-show')){
                        var siblings = getsiblings(myself)
                        addSelfClass(siblings, 0, 't-linkage-select', this)
                        addSelfClass(siblings, 1, 't-linkage-show', this.nextElementSibling)
                    }
                }else{
                    addSelfClass(getsiblings(myself), 0, 't-linkage-select', this)
                }
            }
        }
    }

    /**
     * 选项卡
     */
    tabs(){
        var li = document.querySelectorAll('.t-tabs>ul>li'), div = document.querySelectorAll('.t-tabs>div');
        for(var i=0;i<li.length;i++){
            (function(i){
                li[i].onmouseover = function(){
                    for(var j = 0; j < li.length; j++){
                        li[j].className = "";
                        div[j].className = "t-hide";
                    }
                    this.className = "t-tabs-hover";
                    div[i].className = "";
                }
            })(i)
        }
    }

    /**
     * 卡号复制
     */
    copyNum(){
        const copyObj = document.querySelector(".t-copy>p")
        const copySpan = document.querySelector(".t-copy>span")
        const objText = copyObj.innerText;
        // objText.substring(3,7).replace(/^4/g,'*')
        var objRep = objText.slice(0, 3) + "****" + objText.substr(-3)
        copySpan.innerText = objText
        copyObj.innerText = objRep

        copyObj.onmouseover = () => {
            copySpan.style.display = 'block'
        }
        copyObj.onmouseout = function() {
            copySpan.style.display = 'none'
        }
        copyObj.onclick = function() {
            var oInput = document.createElement('input');
            oInput.value = copySpan.innerText;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display='none';
            alert('复制成功');
        }
    }

    /**
     * 轮播组件，同时支持多个
     * @param ele 触屏元素
     * @param index 轮播元素对应的索引,默认为0，避免干扰
     */
    autoPlay(obj){
        var ele = document.querySelector(obj.ele),
            ele_ul = document.querySelector(obj.ele + '>ul'),
            ele_li = document.querySelectorAll(obj.ele + '>ul li'),
            ele_img = document.querySelectorAll(obj.ele + '>ul img');
        clearInterval(ele_ul.auto);
        for (var i = 0; i < ele_li.length; i++) {
            ele_li[i].style.width = ele.offsetWidth + 'px'
        }
        ele_ul.style.width = ele.offsetWidth * ele_li.length + 'px'
        /*定义定时器参数*/
        // var auto;
        // var timer;
        /*定义自适应参数*/
        var screenWidth;//获取可视屏幕的宽度
        var maxWidth = ele.offsetWidth;
        var minWidth = 320;
        var imgscreenWidth = 0;//轮播图的适应宽度
        //1 轮播图自适应
        screenWidth=window.innerWidth;
        for(var i=0;i<ele_img.length;i++){
            if(screenWidth>maxWidth){
                ele_img[i].style.width=maxWidth+"px";
                imgscreenWidth=maxWidth;
            }else if(screenWidth<=maxWidth && screenWidth>=minWidth){
                ele_img[i].style.width=screenWidth+"px";
                imgscreenWidth=screenWidth;
            }else if(screenWidth<minWidth){
                ele_img[i].style.width=minWidth+"px";
                imgscreenWidth=minWidth;
            }
        }

        //2 动态添加轮播导航
        var nav = ele.querySelector(".t-banner-nav");
        for(var j=0;j<ele_img.length-1;j++){
            if(nav.children.length < ele_img.length-1){
                nav.innerHTML+="<a href='javascript:;'></a>";
            }
        }
        nav.style.left=(ele.offsetWidth-nav.offsetWidth)/2+"px";

        //3 图片触屏轮播
        var startPageX;
        var movePageX;
        //触屏开始
        ele.addEventListener("touchstart",function(event){
            clearInterval(ele_ul.auto);
            var touch=event.targetTouches;//获取触摸信息

            if(touch.length===1){//一个手指触摸
                startPageX=touch[0].pageX;
                movePageX=0;
            }
        },false);

        //触屏移动
        ele.addEventListener("touchmove",function(event){
            var touch=event.targetTouches;
            if(touch.length===1){
                movePageX=touch[0].pageX;
            }
        },false);

        //触屏结束
        ele.addEventListener("touchend",function(){
            console.log(event);
            if(movePageX===0){
                return;
            }
            if(movePageX>startPageX){
                console.log("右划");
                obj.index--;//步骤1
                if(obj.index===-1){//步骤2
                    obj.index=ele_img.length-2;
                    ele_ul.style.transition="none";
                    ele_ul.style.marginLeft=-(ele_img.length-1)*imgscreenWidth+"px";
                }
                ele_ul.timer = setTimeout(function () {//步骤3
                    ele_ul.style.marginLeft = -imgscreenWidth * obj.index + "px";
                    ele_ul.style.transition = "1s linear";
                }, 100);
                navMove();
            }else{
                console.log("左划");
                runAuto();
            }
            ele_ul.auto=setInterval(runAuto,2000);
        },false);

        //4 自动轮播
        function runAuto(){
            if(obj.index===ele_img.length-2){//步骤3
                ele_ul.timer = setTimeout(
                    function(){
                        obj.index=0;
                        ele_ul.style.transition="none";
                        ele_ul.style.marginLeft=0+"px";
                    },1000
                )
            }
            obj.index++;//步骤1
            ele_ul.style.marginLeft=-imgscreenWidth*obj.index+"px";//步骤2
            ele_ul.style.transition="1s linear";
            navMove();
        }
        ele_ul.auto=setInterval(function () {
            runAuto();
        },2000);

        //5 导航点移动
        var nav_a=document.querySelectorAll('.t-banner-nav a');
        nav_a[0].style.backgroundColor="white";
        function navMove(){
            for (var i = 0; i <nav_a.length; i++) {
                nav_a[i].style.backgroundColor="";
            }
            if(obj.index<=5){
                nav_a[obj.index].style.backgroundColor="white";
            }
            if(obj.index===6){
                nav_a[0].style.backgroundColor="white";
            }
        }
    }

    /**
     * 滚动信息
     * @param height高度
     * @param speed速度
     * @param delay时间
     * @param index
     */
    startmarquee(obj){
        var t, p = false, o = document.querySelector(obj.ele), li = document.querySelectorAll(obj.ele + ' li')[0];
        // console.log(o)
        o.style.cssText += ';width:' + obj.width + 'px;height:' + obj.height + 'px;line-height:' + obj.height + 'px';
        li.style.cssText += ';height:' + obj.height + 'px;line-height:' + obj.height + 'px';
        o.innerHTML += o.innerHTML;
        o.onmouseover = function(){p = true}
        o.onmouseout = function(){p = false}
        o.scrollTop = 0;
        function start(){
            t = setInterval(scrolling, obj.speed);
            if(!p){ o.scrollTop += 1;}
        }
        function scrolling(){
            if(o.scrollTop % obj.height !== 0){
                o.scrollTop += 1;
                if(o.scrollTop >= o.scrollHeight/2){
                    o.scrollTop = 0;
                }
            }else{
                clearInterval(t);
                setTimeout(start, obj.delay);
            }
        }
        setTimeout(start, obj.delay);
    }

    /**
     * 回到顶部
     */
    toTop(obj){
        var bodyScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; // 可滚动区域/元素的滚动距离
        //  window.scrollTo(0, 0)
        console.log(bodyScroll)

        if(bodyScroll>obj.target){
            console.log('向上滚')
            var raf = requestAnimationFrame(function fn(){
                bodyScroll -= obj.speed
                
                window.pageYOffset = bodyScroll
                document.body.scrollTop = bodyScroll
                document.documentElement.scrollTop = bodyScroll
                raf = requestAnimationFrame(fn)
                if(bodyScroll < obj.target){
                    cancelAnimationFrame(raf)
                    window.pageYOffset = obj.target
                    document.body.scrollTop = obj.target
                    document.documentElement.scrollTop = obj.target
                }
            })
        }else{
            console.log('向下滚')
            var rafs = requestAnimationFrame(function fn(){
                bodyScroll += obj.speed

                window.pageYOffset = bodyScroll
                document.body.scrollTop = bodyScroll
                document.documentElement.scrollTop = bodyScroll

                // console.log(document.documentElement.scrollTop)
                rafs = requestAnimationFrame(fn)
                if(bodyScroll > obj.target){
                    cancelAnimationFrame(rafs)
                    window.pageYOffset = obj.target
                    document.body.scrollTop = obj.target
                    document.documentElement.scrollTop = obj.target
                }
            })
        }

    }
    /**
     * 进度条
     */
    pmgressbar(obj){
        var pmgressbar = document.querySelector(obj.ele), pmgressbarWidth = tjs.getStyle(pmgressbar, 'width'), speed = 0,
        raf = requestAnimationFrame(function fn(){
            speed += 5
            pmgressbar.style.width = speed + 'px'
            console.log(window.innerWidth)
            // console.log(tjs.getStyle(pmgressbar, 'width'))
            raf = requestAnimationFrame(fn)
            if(parseInt(tjs.getStyle(pmgressbar, 'width')) >= window.innerWidth){
                cancelAnimationFrame(raf)
                pmgressbar.style.width = window.innerWidth + 'px'
            }
        })

    }

    /**
     * 获取iP地址
     */
    getUserIP(onNewIP) {
        // onNewIp - your listener function for new IPs
        // compatibility for firefox and chrome
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var pc = new myPeerConnection({
                iceServers: []
            }),
            noop = function() {},
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
            key;

        function iterateIP(ip) {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
        }

        //create a bogus data channel
        pc.createDataChannel("");

        // create offer and set local description
        pc.createOffer().then(function(sdp) {
            sdp.sdp.split('\n').forEach(function(line) {
				console.log(line)
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }).catch(function(reason) {
            // An error occurred, so handle the failure to connect
        });

        //sten for candidate events
        pc.onicecandidate = function(ice) {
			console.log(ice)
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    }

    /**
     * 滚动监听
     */
    listenScroll(obj){
        var aside = document.querySelector(obj.nav), asideItem = document.querySelectorAll(obj.item), asideTop = aside.offsetTop,
            beforeScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop, that = this;
        window.onscroll = function () {
            var afterScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
            scrollDir = afterScroll - beforeScroll;
            // 元素距离document顶部距离 - 滚动条滚动距离 = 元素距离浏览器顶部距离
            // console.log(asideTop - document.documentElement.scrollTop)
            if(asideTop - document.documentElement.scrollTop < obj.top){
                aside.style.cssText = ';position:fixed;top:'+ obj.top + 'px;'
            }
            // 判断滚动条方向
            if(scrollDir>0){
                // console.log('下')
                addColor()
            }else{
                // console.log('上')
                if(afterScroll <= asideTop){
                    aside.style.cssText = ';position:static;top:auto'
                }
                addColor()
            }
            beforeScroll = afterScroll
        }

        function addColor() {
            for (var i = 0; i < asideItem.length; i++) {
                var scroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                asideItemTop = asideItem[i].parentNode.offsetTop - scroll
                // console.log(asideItemTop)
                if(asideItemTop <= 0 && asideItemTop > -parseInt(tjs.getStyle(asideItem[i].parentNode, 'height'))){
                    tjs.addClass(aside.children[0].children[i], 't-color')
                }else{
                    tjs.removeClass(aside.children[0].children[i], 't-color')
                }
            }
        }
        /*锚点定位*/
        for (var i = 0; i < aside.children[0].children.length; i++) {
            (function (j) {
                aside.children[0].children[j].onclick = function () {
                    that.toTop({
                        speed: 50, // 速度
                        target: asideItem[j].parentNode.offsetTop// 目标位置
                    })
                }
            }(i))
        }


    }

    /**
     * 城市联动
     */
    chinaLinkage() {
        var province = document.querySelector('.t-china-linkage .province'), city = document.querySelector('.t-china-linkage .city'),
            area = document.querySelector('.t-china-linkage .area'), street = document.querySelector('.t-china-linkage .street'),
            cp = document.querySelector('.city').previousElementSibling, ap = document.querySelector('.area').previousElementSibling,
            sp = document.querySelector('.street').previousElementSibling, cselects = document.querySelectorAll('.t-china-linkage .t-select');
        require.config({
            paths : {
                text : 'https://cdn.bootcss.com/require-text/2.0.12/text',
                json : 'https://cdn.bootcss.com/requirejs-plugins/1.0.3/json' //alias to plugin
            }
        });
        require(['json!./utils/china.json'], function (dataJson) {
            // console.log(dataJson)
            for (var i = 0; i < dataJson.length; i++) {
                province.innerHTML += '<li>'+ dataJson[i].name + '</li>'
            }
            // 省
            var pliIndex, cliIndex;
            province.onclick = function (event) {
                var e = event || window.event;
                cp.innerHTML = '请选择城市';
                ap.innerHTML = '请选择区县';
                sp.innerHTML = '请选择乡镇';
                if(e.target.nodeName.toLowerCase() === "li"){
                    var pliArr = e.target.parentNode.children;
                    pliIndex = Array.prototype.indexOf.call(pliArr, e.target);
                    console.log(pliIndex)
                    city.innerHTML = '<li>请选择城市</li>'
                    area.innerHTML = '<li>请选择区县</li>'
                    street.innerHTML = '<li>请选择乡镇</li>'
                    if(pliIndex){
                        var thisCityArr = dataJson[pliIndex - 1].children;
                        if(thisCityArr.length > 6){
                            city.style.cssText += ';height:266px; overflow-y:auto'
                        }else{
                            city.style.cssText += ';height:auto;'
                        }
                        for (var j = 0; j < thisCityArr.length; j++) {
                            city.innerHTML += '<li>'+ thisCityArr[j].name + '</li>'
                        }
                    }
                    tjs.removeClass(this, 'transitionDropIn')
                    tjs.addClass(this, 'transitionDropOut')
                    var that = this
                    setTimeout(function () {
                        that.style.display = 'none'
                    },500)
                    this.previousElementSibling.innerHTML = e.target.innerHTML
                }
            }
            // 市
            city.onclick = function (event) {
                var e = event || window.event;
                ap.innerHTML = '请选择区县';
                sp.innerHTML = '请选择乡镇';
                if(e.target.nodeName.toLowerCase() === "li"){
                    var cliArr = e.target.parentNode.children;
                    cliIndex = Array.prototype.indexOf.call(cliArr, e.target);
                    area.innerHTML = '<li>请选择区县</li>'
                    street.innerHTML = '<li>请选择乡镇</li>'
                    if(cliIndex){
                        var thisAreaArr = dataJson[pliIndex - 1].children[cliIndex - 1].children;
                        if(thisAreaArr.length > 6){
                            area.style.cssText += ';height:266px; overflow-y:auto'
                        }else{
                            area.style.cssText += ';height:auto'
                        }
                        for (var j = 0; j < thisAreaArr.length; j++) {
                            area.innerHTML += '<li>'+ thisAreaArr[j].name + '</li>'
                        }
                    }
                    tjs.removeClass(this, 'transitionDropIn')
                    tjs.addClass(this, 'transitionDropOut')
                    var that = this
                    setTimeout(function () {
                        that.style.display = 'none'
                    },500)
                    this.previousElementSibling.innerHTML = e.target.innerHTML
                }
            }
            // 县
            area.onclick = function (event) {
                var e = event || window.event;
                sp.innerHTML = '请选择乡镇';
                if(e.target.nodeName.toLowerCase() === "li"){
                    var aliArr = e.target.parentNode.children;
                    var aliIndex = Array.prototype.indexOf.call(aliArr, e.target);
                    street.innerHTML = '<li>请选择乡镇</li>'
                    if(aliIndex){
                        var thisStreetArr = dataJson[pliIndex - 1].children[cliIndex - 1].children[aliIndex - 1].children;
                        if(thisStreetArr.length > 6){
                            street.style.cssText += ';height:266px; overflow-y:auto'
                        }else{
                            street.style.cssText += ';height:auto;'
                        }
                        for (var j = 0; j < thisStreetArr.length; j++) {
                            street.innerHTML += '<li>'+ thisStreetArr[j].name + '</li>'
                        }
                    }
                    tjs.removeClass(this, 'transitionDropIn')
                    tjs.addClass(this, 'transitionDropOut')
                    var that = this
                    setTimeout(function () {
                        that.style.display = 'none'
                    },500)
                    this.previousElementSibling.innerHTML = e.target.innerHTML
                }
            }
            // 乡
            street.onclick = function (event) {
                var e = event || window.event;
                if(e.target.nodeName.toLowerCase() === "li"){
                    tjs.removeClass(this, 'transitionDropIn')
                    tjs.addClass(this, 'transitionDropOut')
                    var that = this
                    setTimeout(function () {
                        that.style.display = 'none'
                    },500)
                    this.previousElementSibling.innerHTML = e.target.innerHTML
                }
            }

            for (var j = 0; j < cselects.length; j++) {
                cselects[j].onclick = function () {
                    if(this.querySelector('ul').children.length < 8){
                        this.querySelector('ul').style.cssText += ';height:auto'
                    }
                };
            }
        })
    }

    /**
     * 文件上传
     */
    upLoad(){
        document.querySelector('.t-input-file').onchange = function (event) {
            // var e = event || window.event
            console.log(this.files)
            var fr = new FileReader(), file = this.files[0];
            //判断文件的类型
            if (file.type.match(/^text\//) !== null) {
                //读取文本文件
                // readText(fr, file);
            } else if (file.type.match(/^image\//) !== null) {
                //读取图片
                readImage(fr, file);
            } else {
                alert("你上传的文件格式无法读取");
            }
            console.log(fr)
            document.querySelector('.t-upload span').innerHTML = this.files[0].name
        }

        // * 读取图片
        function readImage(frObj, fileObj) {
            frObj.onload = function(){
                var img = document.querySelector('.t-upload-div img')
                if(img){
                    img.src = frObj.result
                }else{
                    img = document.createElement("img");
                    img.src = frObj.result;
                }
                document.querySelector(".t-upload-div").insertBefore(img, document.querySelector(".t-upload"));
            }
            frObj.readAsDataURL(fileObj);
        }

        // * 读取文本
        function readText(frObj, fileObj) {
            frObj.onload = function(){
                var pre = document.createElement("pre");
                pre.innerHTML = frObj.result;
                // document.querySelector(".t-upload").appendChild(pre);
                document.querySelector(".t-upload-div").insertBefore(pre, document.querySelector(".t-upload"))
            };
            frObj.readAsText(fileObj);
        }
    }

    /**
     * 分页
     * @param obj
     */
    paging(obj) {
        var pagEle = document.querySelector('.t-paging'), dataArr, targetBgNum, pageSize = obj.pageSize || 10, pageNum = Math.ceil(obj.totalSize/pageSize);
        pagEle.onclick = function (event) {
            var e = event || window.event, pagEleA = document.querySelectorAll('.t-paging a'), pagingNext = document.querySelector('.paging-next');
            if(e.target.nodeName === 'A'){ // 点击数字btn
                var pagingPre = document.querySelector('.paging-pre'),
                    targetIndex;
                for (var j = 0; j < pagEleA.length; j++) {
                    // 找到有bg的a
                    if (tjs.hasClass(pagEleA[j], 't-bg')) {
                        targetBgNum = parseInt(pagEleA[j].innerText)
                        targetIndex = j
                    }
                }
                // console.log(targetIndex)
                if(tjs.hasClass(e.target, 'paging-pre')){ // 上一页
                    if(tjs.hasClass(pagEleA[targetIndex].previousElementSibling, 'not-allowed-first')){
                        setPag(pagEleA[targetIndex], pagEleA, pagingNext)
                        // console.log('点击上一页（当前页的前面是···）')
                    }else{
                        if(targetBgNum !== 1){
                            // console.log('点击上一页（当前页的前面不是first···也不是1）')
                            setPag(pagEleA[targetIndex].previousElementSibling, pagEleA, pagingNext)
                        }
                    }
                }else if(tjs.hasClass(e.target, 'paging-next')){ // 下一页
                    if(tjs.hasClass(pagEleA[targetIndex].nextElementSibling, 'not-allowed-last')){
                        setPag(pagEleA[targetIndex], pagEleA, pagingNext)
                        // console.log('点击下一页（当前页的后面是···）')
                    }else{
                        if(targetBgNum !== pageNum){
                            // console.log('点击下一页（当前页的后面不是last···也不是尾页）')
                            setPag(pagEleA[targetIndex].nextElementSibling, pagEleA, pagingNext)
                        }
                    }
                }else{
                    setPag(e.target, pagEleA, pagingNext)
                    // console.log('点击其他数字页')
                }

                obj.callBack(dataArr)
                // 判断当前页是否为首尾页
                for (var q = 0; q < pagEleA.length; q++) {
                    // 找到有bg的a
                    if(tjs.hasClass(pagEleA[q], 't-bg')){
                        targetBgNum = parseInt(pagEleA[q].innerText)
                        // console.log(targetBgNum)
                        if(targetBgNum === 1){
                            tjs.addClass(pagingPre, 't-not-allowed')
                        }else{
                            if(tjs.hasClass(pagingPre, 't-not-allowed')){
                                tjs.removeClass(pagingPre, 't-not-allowed')
                            }
                        }
                        if(targetBgNum === pageNum){
                            tjs.addClass(pagingNext, 't-not-allowed')
                        }else{
                            if(tjs.hasClass(pagingNext, 't-not-allowed')){
                                tjs.removeClass(pagingNext, 't-not-allowed')
                            }
                        }
                    }
                }

            }
            // 定点跳转
            if(obj.assign){
                var assign = document.querySelector('.t-paging>input').value, hasArr = [];

                if(e.target.nodeName === 'BUTTON'){
                    for (var i = 0; i < pagEleA.length; i++) {
                        // console.log(parseInt(pagEleA[i].innerText))
                        hasArr.push(pagEleA[i].innerText)
                    }
                    if(assign !==1){
                        tjs.removeClass(document.querySelector('.paging-pre'), 't-not-allowed')
                    }
                    // console.log(hasArr.indexOf(assign)=== -1)
                    if(hasArr.indexOf(assign) === -1){
                        if(assign > pageNum){
                            alert('查无此页')
                            return
                        }
                        for (var i = 0; i < pagEleA.length; i++) { // 此处重点
                            tjs.removeClass(pagEleA[i], 't-bg')
                        }
                        var naFirst = document.querySelector('.not-allowed-first'),
                            naLast = document.querySelector('.not-allowed-last'),
                            firstItem = document.querySelector('.first-item'),
                            target = document.createElement('a');
                        target.innerHTML = assign
                        // console.log(target)
                        if(naLast){
                            var allA = tjs.prevAllUntil(naLast, 'not-allowed-first'); // 获取两个···中间的a
                        }
                        lastBefore(allA, target, pagingNext, firstItem, naFirst, naLast)
                        if(assign <= pageNum - 5){
                            naLast.style.display = 'inline-block'
                            pagingNext.previousElementSibling.style.display = 'inline-block'
                        }
                    }else{
                        setPag(pagEleA[hasArr.indexOf(assign)], pagEleA, pagingNext)
                    }
                    obj.callBack(dataArr)
                    // seag(pagEleA[i], pagEleA, pagingNext)

                }
            }

        }
        if(obj.limit){
            pagEle.onchange = function (event) {
                var e = event || window.event;
                if(e.target.nodeName === 'SELECT'){
                    var selVal = document.querySelector('.t-paging>select')
                    // console.log(selVal)
                    pageSize = selVal.options[selVal.selectedIndex].value
                    pageNum = Math.ceil(obj.totalSize/pageSize)
                    console.log(pageSize)
                    dataArr = showData(1, true)
                    obj.callBack(dataArr)
                    document.querySelector('.t-paging>select').options[selVal.options[selVal.selectedIndex].index].setAttribute('selected', 'selected')
                }
            }
        }

        function setPag(target, pagEleA, pagingNext) {
            if(tjs.hasClass(target, 't-not-allowed'))return
            for (var i = 0; i < pagEleA.length; i++) { // 此处重点
                tjs.removeClass(pagEleA[i], 't-bg')
            }
            var isLastPre = tjs.hasClass(target.nextElementSibling, 'not-allowed-last'),
                isFirstNext = tjs.hasClass(target.previousElementSibling, 'not-allowed-first'),
                // isFirstPre = tjs.hasClass(target.nextElementSibling, 'not-allowed-first'),
                naFirst = document.querySelector('.not-allowed-first'),
                naLast = document.querySelector('.not-allowed-last'),
                firstItem = document.querySelector('.first-item');
            if(naLast){
                var allA = tjs.prevAllUntil(naLast, 'not-allowed-first'); // 获取两个···中间的a
            }
            if(isLastPre && tjs.getStyle(naLast, 'display') === 'inline-block'){ // 判断是否是last···前一位a
                lastBefore(allA, target, pagingNext, firstItem, naFirst, naLast)
            }else if(isFirstNext && tjs.getStyle(naFirst, 'display') === 'inline-block'){// 判断是否是first···后一位a
                console.log('是前面省略号的后一位,并且省略号显示')
                // 判断是否翻页到开头
                if(parseInt(target.innerText) - 5 < 1){
                    // 隐藏first···
                    firstItem.style.display = 'none'
                    naFirst.style.display = 'none'
                }
                // 显示隐藏的a
                console.log(parseInt(target.innerText))
                if(parseInt(target.innerText) !== 1){
                    for (var p = allA.length - 1; p >= 0; p--) {
                        // 自动页数--
                        allA[p].innerHTML = target.innerHTML--
                        if(tjs.getStyle(allA[p], 'display') === 'none'){
                            allA[p].style.display = 'inline-block'
                        }
                        if(parseInt(allA[p].innerText) <= 0){
                            // console.log(parseInt(allA[p].innerText))
                            allA[p].style.display = 'none'
                            // console.log(allA[p])
                        }else{
                            allA[p].style.display = 'inline-block'
                            // console.log('bug')
                        }
                    }
                }
                pagingNext.previousElementSibling.style.display = 'inline-block'
                naLast.style.display = 'inline-block'
                console.log(allA)
                // 设置bg
                tjs.addClass(allA[allA.length - 1], 't-bg')
                dataArr = showData(allA[allA.length - 1].innerHTML)

            }else{ // 其他class的a
                console.log('是其他a')
                // console.log(target.innerHTML)
                if(parseInt(target.innerText) === 1){
                    if(pageNum <= 7){
                        tjs.addClass(pagEleA[3], 't-bg')
                        dataArr = showData(target.innerHTML)
                        return
                    }
                    console.log('首位a')
                    // 隐藏first···
                    firstItem.style.display = 'none'
                    naFirst.style.display = 'none'
                    for (var q = 0; q < allA.length; q++) {
                        allA[q].innerHTML = q + 1
                        if(parseInt(allA[q].innerHTML) === 1){
                            tjs.addClass(allA[q], 't-bg')
                        }
                        // 显示隐藏的a
                        if(tjs.getStyle(allA[q], 'display') === 'none'){
                            allA[q].style.display = 'inline-block'
                        }
                    }
                    pagingNext.previousElementSibling.style.display = 'inline-block'
                    naLast.style.display = 'inline-block'
                }
                if(parseInt(target.innerText) === pageNum){
                    if(pageNum <= 7){
                        tjs.addClass(pagingNext.previousElementSibling, 't-bg')
                        dataArr = showData(target.innerHTML)
                        return
                    }
                    console.log('末位a')
                    firstItem.style.display = 'inline-block'
                    naFirst.style.display = 'inline-block'
                    naLast.style.display = 'none'
                    pagingNext.previousElementSibling.style.display = 'none'
                    // 显示first···
                    // 隐藏last
                    // console.log(pagEndingArr)
                    var length = pageNum - 4 * Math.ceil( pageNum/4 - 1 )
                    var arr1 = []
                    for (var x = 0; x < length; x++) {
                        arr1.unshift(pageNum--)
                    }
                    console.log(arr1)
                    pageNum = Math.ceil(obj.totalSize/pageSize)
                    for (var y = 0; y < arr1.length; y++) {
                        allA[y].innerHTML = arr1[y]
                        if(parseInt(allA[y].innerHTML) === pageNum){
                            tjs.addClass(allA[y], 't-bg')
                            var hideA = tjs.nextAllUntil(allA[y], 't-not-allowed')
                            for (var z = 0; z < hideA.length; z++) {
                                hideA[z].style.display = 'none';
                            }
                        }
                    }
                }
                if(parseInt(target.innerText) !== pageNum && parseInt(target.innerText) !== 1){
                    tjs.addClass(target, 't-bg') //bug
                    console.log(target.innerText)
                }
                dataArr = showData(target.innerHTML)
            }
        }

        function lastBefore(allA, target, pagingNext, firstItem, naFirst, naLast) {
            console.log('是后面省略号的前一位,并且省略号显示')
            // 自动页数++
            // 5    09    13    17    21    25    29       1
            // 6    10    14    18    22    26    30       2
            // 7    11    15    19    23    27    31       3
            // 8    12    16    20    24    28    32       4
            // 9    13    17    21    25    29    33       5
            var tarText = target.innerText
            if(target.innerText%4 === 2){
                console.log('第二位')
                setLocation(1)
            }else if(target.innerText%4 === 3){
                setLocation(2)
            }else if(target.innerText%4 === 0){
                setLocation(3)
            }else{
                console.log('第一位')
                setLocation(0)
            }
            function setLocation(num) {
                for (var k = num; k < allA.length; k++) {
                    if(parseInt(allA[k].innerText) <= 0){
                        allA[k].style.display = 'none'
                    }else{
                        allA[k].style.display = 'inline-block'
                    }
                    if(num === 1){
                        allA[0].innerText = tarText - 1
                    }else if(num ===2){
                        allA[0].innerText = tarText - 2
                        allA[1].innerText = tarText - 1
                    }else if(num ===3){
                        allA[0].innerText = tarText - 3
                        allA[1].innerText = tarText - 2
                        allA[2].innerText = tarText - 1
                    }
                    allA[k].innerText = target.innerText++
                }
                tjs.addClass(allA[num], 't-bg')
                dataArr = showData(allA[num].innerText)
            }

            // 显示first···
            firstItem.style.display = 'inline-block'
            naFirst.style.display = 'inline-block'
            console.log(parseInt(target.innerText))
            if(parseInt(target.innerText) === pageNum){
                naLast.style.display = 'none'
                naLast.previousElementSibling.style.display = 'none'
            }

            // 判断是否翻页到结尾
            if(parseInt(target.innerText) > pageNum){
                var pagEndingArr = tjs.prevAllUntil(naLast, 't-bg')
                // 隐藏多余的a
                for (var m = 0; m < pagEndingArr.length; m++) {
                    if(parseInt(pagEndingArr[m].innerText) > pageNum){
                        var hideAArr = tjs.nextAllUntil(pagEndingArr[m], 'paging-next');
                        for (var n = 0; n < hideAArr.length; n++) {
                            pagEndingArr[m].style.display = 'none';
                        }
                    }
                }
                naLast.style.display = 'none'
                pagingNext.previousElementSibling.style.display = 'none'
                // console.log(parseInt(target.innerText) - pageNum)
            }
        }




        // 初始化
        dataArr = showData()
        obj.callBack(dataArr)
        // 渲染数据
        function showData(arg, flag) { // arg 第几页数据
            // console.log(arg)
            //currentPage 为当前页数，pageSize为每页显示的数据量数，totalSize为总数据量数，startIndex开始条数，endIndex结束条数
            var pagArr = [], currentPage = arg || 1,
                startIndex = (currentPage - 1) * pageSize + 1,
                endIndex = currentPage * pageSize,
                aEles = '<a href="javascript:;" class="paging-pre t-not-allowed">上一页</a><a href="javascript:;" class="first-item">1</a>' +
                    '<a href="javascript:;" class="t-not-allowed not-allowed-first">···</a>';
            pagArr = arr.slice(startIndex - 1, endIndex)
            // console.log(pagEle.hasChildNodes())
            // 判断首次加载
            if(flag){ // 切换显示数量
                pagEle.innerHTML = ''
            }else{ // 正常翻页
                if(pagEle.hasChildNodes()) return pagArr
            }
            // 首次加载执行
            var aLength = obj.totalSize > 7*pageSize ? 5 : pageNum;
            for (var i = 1; i <= aLength; i++) {
                if(i===1){
                    aEles += '<a href="javascript:;" class="t-bg">'+ i + '</a>'
                    // console.log(currentPage)
                }else{
                    aEles += '<a href="javascript:;">'+ i + '</a>'
                }
            }
            if(obj.totalSize > 7*pageSize){
                aEles += '<a href="javascript:;" class="t-not-allowed not-allowed-last">···</a><a href="javascript:;">'+ pageNum +'</a>'
            }
            aEles += '<a href="javascript:;" class="paging-next">下一页</a>'
            if(obj.limit){
                aEles += '<select>\n' +
                    '<option value="10">10条/页</option>\n' +
                    '<option value="20">20条/页</option>\n' +
                    '<option value="30">30条/页</option>\n' +
                    '<option value="40">40条/页</option>\n' +
                    '<option value="50">50条/页</option>\n' +
                    '</select>';
            }
            if(obj.assign){
                aEles += '跳到第<input type="text" value=' + pageNum +' />页' + '<button class="t-btn">确定</button>';
            }
            pagEle.innerHTML += aEles
            // console.log(document.querySelector('select').selectedIndex)
            return pagArr
        }
    }
	
	/**
	 * 范围选择器
	 * @param {Object} obj
	 */
	rangeSelect(obj) {
		if(document.querySelector('#range-box')){
			tjs.bind(document.querySelector('#range-box'), 'input', function(e){
				console.log(e.target.value)
				document.querySelector('.t-range label').innerHTML = e.target.value
			})
		}
		
	}
}