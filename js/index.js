console.time('time')
// init
var ts = new TS()
    ts.keyRight()

ts.tableCom()
ts.inputCom()
ts.selectCom()
ts.radioCom()
ts.checkboxCom()

/**
 * 倒计时组件
 * @param timer 结束显示区
 * @param hour 小时显示区
 * @param minute 分钟显示区
 * @param second 秒显示区
 * @param date 传入时间 "2017/12/12,1:41"
 */
ts.backTimers({
    timer: '.t-timer',
    day: '.t-d',
    hour: '.t-h',
    minute: '.t-m',
    second: '.t-s',
    date: '2023-12-31 24:00',
    text: '结束提示',
    color: 'red'
});


/**
 * 元素动态效果
 * @param {Object} obj 元素
 * @param {Object} attr 需要变动的属性
 * @param {Object} target 目标值
 * @param {Object} callBack 结束回调
 */
var btn1 = document.querySelectorAll('.pop-btns>button')[0], btn2 = document.querySelectorAll('.pop-btns>button')[1],
    btn3 = document.querySelectorAll('.pop-btns>button')[2], btn4 = document.querySelectorAll('.pop-btns>button')[3],
    btn5 = document.querySelectorAll('.pop-btns>button')[4];
if(btn1 || btn2 || btn3 || btn4 || btn5){
    btn1.onclick = function () {
        ts.move({
            type: 't-alert',
            attr: 'top',
            target: 300,
            text: '我是弹窗',
            time: 1000,
            callBack: function () {
                // alert('O(∩_∩)O哈哈~')
            }
        })
    }
    btn2.onclick = function () {
        ts.move({
            type: 't-success',
            attr: 'top',
            target: 50,
            text: '我是成功',
            time: 1000,
            callBack: function () {
                // console.log(1)
            }
        })
    }
    btn3.onclick = function () {
        ts.move({
            type: 't-err',
            attr: 'bottom',
            target: 50,
            text: '我是err',
            time: 1000,
            callBack: function () {
                // console.log(1)
            }
        })
    }
    btn4.onclick = function () {
        ts.move({
            type: 't-info',
            attr: 'left',
            target: 100,
            text: '我是info',
            time: 1000,
            callBack: function () {
                // console.log(1)
            }
        })
    }
    btn5.onclick = function () {
        ts.move({
            type: 't-warning',
            attr: 'right',
            target: 100,
            text: '我是warning',
            time: 1000,
            callBack: function () {
                console.log(1)
            }
        })
    }
}


/**
 *  联动组件
 */
ts.linkage()

/**
 *  选项卡
 */
ts.tabs()

/**
 * 复制卡号
 */
if(document.querySelector(".t-copy")){
    ts.copyNum()
}

/**
 * 轮播组件，同时支持多个
 * @param ele 触屏元素
 * @param index 轮播元素对应的索引,默认为0，避免干扰
 */

if(document.querySelector(".t-banner")){
    ts.autoPlay({
        ele: '.t-banner',
        index: 0,
    })
}


/**
 * @param height高度
 * @param speed速度
 * @param delay时间 为0则不间断滚动
 * @param index
 */
if(document.querySelector(".t-marqueebox")){
    ts.startmarquee({
        ele: '.marqueebox1',
        width: 300,
        height: 30,
        speed:30,
        delay:1000,
    })
    ts.startmarquee({
        ele: '.marqueebox2',
        width: 300,
        height: 30,
        speed:20,
        delay:0,
    })

}


/**
 * 回到顶部
 */
if(document.querySelector('.t-top')){
    document.querySelector('.t-top').onclick = function () {
        ts.toTop({
            speed: 100, // 速度
            target: 0// 目标位置
        })
    }
}

/**
 * 进度条
 */
if(document.querySelector('.pmgressbar')){
    document.querySelector('.pmgressbar').onclick = function () {
        ts.pmgressbar({
            ele: '.t-pmgressbar'
        })
    }
}

/**
 *  获取内网IP地址
 */
// ts.getUserIP(function(ip){
// 	console.log(ip)
	
//     document.querySelector('.nip').innerHTML = ip;
// });


/**
 *  当前日期
 */
setInterval(function () {
    document.querySelector('.newTime').innerHTML = tjs.timeFormat(new Date(), 'yyyy年MM月dd日 hh:mm:ss 星期w')
},1000)



/**
 * 滚动监听
 */
ts.listenScroll({
    nav: 'aside', // 导航条
    item: '#page h2', // 对应内容
    top: 60 // 暂停位置
})

/**
 * 城市联动
 */
/*require*/
if(document.querySelector('.t-china-linkage')){
    ts.chinaLinkage()
}

/**
 * 文件上传
 */
if(document.querySelector('.t-input-file')){
    ts.upLoad()
}

/**
 * 分页
 */

var ele = document.querySelector('.pagData')
var arr = [];
for (var i = 1; i < 171; i++) {
    arr.push(i)
}
// var n = 15
// console.log(n - 4 * Math.ceil( n/4 - 1 ))


if(document.querySelector('.t-paging')){
    ts.paging({
        pageSize: 7, // 每页显示的数量
        totalSize: arr.length, // 总数量
        limit: false, // 是否开启范围选择框
        assign: true, // 是否开启跳转指定页
        callBack: function (arg) { // 回调
            if(ele){
                ele.innerHTML = ''
                arg.forEach(function (item, index) {
                    ele.innerHTML += '<li>'+ item + '</li>'
                })
            }
        }
    })
}

ts.rangeSelect()

console.timeEnd('time')


