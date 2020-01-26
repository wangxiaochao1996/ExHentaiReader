function hideElement(element) {
    if (element.style.opacity > 0) {
        element.style.opacity -= 0.05
        requestAnimationFrame(function () {
            hideElement(element)
        })
    }
}

function barComplete(i) {
    hideElement(window.reader.progressBars[i].dom)
}
function imgLoadSuccess() {
    window.reader.loaded++
    var order = this.getAttribute('order')
    window.reader.image[order].complete = true
    barComplete(order)
    if (window.reader.loaded >= window.reader.page.length) {
        hideElement(document.getElementById('titleBar'))
    }
}
function imgLoadFailed() {
    this.setAttribute('src', this.src)
}
function loadImg(pageurl, i, first) {

    // 通过pageurl获取图片url，并绑定到对应图片标签上
    var xhr = new XMLHttpRequest()
    xhr.open('GET', pageurl, true)
    xhr.onload = function () {
        if (this.status === 200) {
            var imgUrl = this.responseText.match(/<img id=\"img\" src=\"(.+?)\"/i)[1]
            var nl = this.responseText.match(/onclick=\"return nl\(\'(.+?)\'\)\"/i)[1]
            window.reader.image[i].url = imgUrl
            window.reader.image[i].nl = nl
            window.reader.image[i].complete = false
            var img = document.getElementById('img' + i)
            if (first) {
                var h = document.createElement('hr')
                h.setAttribute('style', 'width:100%;height:8px;background-color:yellow;margin:0px;')
                img.parentElement.insertBefore(h, img)
            }
            img.setAttribute('src', imgUrl)
        }
    }
    xhr.send()
}

function toTop() {
    window.scrollTo({
        top: window.reader.image[0].dom.offsetTop,
        behavior: "smooth"
    });
}
function toBottom() {
    window.scrollTo({
        top: window.reader.image[window.reader.size - 1].dom.offsetTop,
        behavior: "smooth"
    });

}
function changeResource() {
    console.log('changeResource')
    window.reader.loaded = 0
    for (var i = 0; i < window.reader.page.length; i++) {
        if (!window.reader.image[i].complete) {
            window.reader.progressBars[i].dom.style.backgroundColor = '#ffa502'
            if (!window.reader.image[i].url) {
                loadImg(window.reader.page.url, i, false)
            } else {
                loadImg(window.reader.page[i].url + '?nl=' + window.reader.image[i].nl, i, false)
            }
        } else {
            window.reader.loaded++
        }
    }
    if (window.reader.loaded >= window.reader.page.length) {
        hideElement(document.getElementById('titleBar'))
    }
}
function recoverPosition() {
    var position = parseInt(document.cookie.match(/mrp=(.+?);/i)[1])
    if (position) {
        window.scrollTo({
            top: position,
            behavior: "smooth"
        });
    }
}

function showToolBar() {
    document.getElementById('toolBar').style.transform = 'translateX(0)'
}
function hidenToolBar() {
    document.getElementById('toolBar').style.transform = 'translateX(-100%)'
}
function setPositionRecord(position) {
    var exp = new Date()
    exp.setTime(exp.getTime() + 20 * 24 * 60 * 60 * 1000)
    var cookie = 'mrp=' + position.toString() + ';path=' + window.location.pathname + ';expires=' + exp.toGMTString()
    document.cookie = cookie
}

function initReaderStructure() {
    window.reader = {}
    window.reader.scrollTop = window.pageYOffset
    window.reader.scrollDirection = -1
    window.reader.page = new Array()
    window.reader.image = new Array()
    window.reader.progressBars = new Array()
    window.reader.loaded = 0

}
function initImageStructure() {
    //获取exhentai页面的容器
    var container = document.getElementById('gdt')
    var pageElements = container.getElementsByTagName('a')
    // 把自定义的reader容器嵌入页面
    var readerContainer = document.createElement('div')
    readerContainer.setAttribute('id', 'readerContainer')
    container.parentElement.insertBefore(readerContainer, container)
    var barBox = document.createElement('div')
    barBox.setAttribute('id', 'titleBar')
    barBox.setAttribute('style', 'opacity:1;background-color: #7bed9f;z-index: 99; position: fixed; border-radius: 5px; border: none; width: 100%; height: 10px; left: 0px; top: 0px; display: flex; flex-flow: row nowrap; justify-content: start; align-items: center;')
    readerContainer.appendChild(barBox)
    // 从exhentai原始容器中读取每个页面的url添加到pageUrl，并生成对应的自定义图像标签
    for (var i = 0; i < pageElements.length; i++) {
        window.reader.page[i] = {}
        window.reader.image[i] = {}
        window.reader.page[i].url = pageElements[i].href
        var img = document.createElement('img')
        img.setAttribute('id', 'img' + i)
        img.setAttribute('name', 'anchor' + i)
        img.setAttribute('order', i)
        img.setAttribute('style', 'width:100%')
        img.onload = imgLoadSuccess
        img.onerror = imgLoadFailed
        readerContainer.append(img)
        window.reader.image[i].dom = img
        var bar = document.createElement('a')
        bar.setAttribute('href', '#anchor' + i)
        bar.setAttribute('style', 'opacity:1;z-index: 100;display: flex; flex-grow: 1; background-color: #ff6b81;height: 100%;')
        barBox.appendChild(bar)
        window.reader.progressBars[i] = {}
        window.reader.progressBars[i].dom = bar
    }
    window.reader.size = window.reader.page.length
    // 删除原始容器
    container.parentElement.removeChild(container)
}


function initToolBarStructure() {
    var bar = document.createElement('div')
    bar.id = 'toolBar'
    bar.style.opacity = 1

    window.reader.standardSize = document.getElementById('exReader').getAttribute('toolbar_size') || Math.round(Math.min(window.screen.availWidth, window.screen.availHeight) / 6) * window.devicePixelRatio
    bar.style.width = window.reader.standardSize.toString() + 'px'
    var top = document.createElement('div')
    var bottom = document.createElement('div')
    var recover = document.createElement('div')
    var reload = document.createElement('div')
    var topIcon = document.createElement('i')
    var bottomIcon = document.createElement('i')
    var recoverIcon = document.createElement('i')
    var reloadIcon = document.createElement('i')
    topIcon.className = 'iconfont icon-up'
    topIcon.style.fontSize = Math.round(window.reader.standardSize * 0.6).toString() + 'px'
    bottomIcon.className = 'iconfont icon-down'
    bottomIcon.style.fontSize = Math.round(window.reader.standardSize * 0.6).toString() + 'px'
    recoverIcon.className = 'iconfont icon-huifu'
    recoverIcon.style.fontSize = Math.round(window.reader.standardSize * 0.6).toString() + 'px'
    reloadIcon.className = 'iconfont icon-change'
    reloadIcon.style.fontSize = Math.round(window.reader.standardSize * 0.6).toString() + 'px'
    top.appendChild(topIcon)
    bottom.appendChild(bottomIcon)
    recover.appendChild(recoverIcon)
    reload.appendChild(reloadIcon)
    bar.appendChild(top)
    bar.appendChild(bottom)
    bar.appendChild(recover)
    bar.appendChild(reload)
    document.body.appendChild(bar)

    top.onclick = toTop
    bottom.onclick = toBottom
    reload.onclick = changeResource
    recover.onclick = recoverPosition
}
function initStyleLink() {
    var readerStyle = document.createElement('link');
    readerStyle.rel = 'stylesheet';
    readerStyle.type = 'text/css';
    readerStyle.href = 'https://manakanemu.oss-cn-beijing.aliyuncs.com/vscode/exhentai/reader.css?' + parseInt(Date.parse(new Date()) / 100);
    document.body.appendChild(readerStyle);
    var iconStyle = document.createElement('link');
    iconStyle.rel = 'stylesheet';
    iconStyle.type = 'text/css';
    iconStyle.href = 'https://at.alicdn.com/t/font_1345377_wn98j672mcn.css?' + parseInt(Date.parse(new Date()) / 100);
    document.body.appendChild(iconStyle);
}
function reframeWebpage() {
    var switchBox = document.getElementsByClassName('ptb')[0]
    switchBox.style = 'width:100%;'
    var switchBar = switchBox.getElementsByTagName('tr')[0]
    switchBar.style = 'display: flex; flex-flow: row nowrap; justify-content: center;'
    var switchButton = switchBar.getElementsByTagName('td')
    var boxSize = Math.floor(window.screen.availWidth * window.devicePixelRatio / 11)
    var fontSize = Math.floor(boxSize * 0.7)
    for (var i = 0; i < switchButton.length; i++) {
        switchButton[i].style = 'display: flex; height:' + fontSize.toString() + 'px;width:' + fontSize.toString() + 'px;justify-content: center;font-size:' + fontSize.toString() + 'px;'
        if (switchButton[i].getElementsByTagName('a')[0]) {
            switchButton[i].getElementsByTagName('a')[0].style = 'font-size:' + fontSize.toString() + 'px'
        }

    }

}

var tag_font_size = document.getElementById('exReader').getAttribute('tag_font_size')
if (tag_font_size) {
        var style = document.createElement('style')
        style.innerHTML = '.gt,.gtl,.gtw{font-size: ' + tag_font_size.toString() + 'px;}'
        document.head.appendChild(style)
}

if (document.location.href.indexOf('https://exhentai.org/g/') > -1) {
    if (!window.reader) {
        console.log('first')
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        initStyleLink()
        initReaderStructure()
        initImageStructure()
        initToolBarStructure()
        reframeWebpage()

        for (var i = 0; i < window.reader.page.length; i++) {
            loadImg(window.reader.page[i].url, i, true)
        }
    }
}
window.onscroll = function () {
    var currentScroll = window.pageYOffset
    var direction = currentScroll - window.reader.scrollTop
    if (this.Math.abs(direction) > 50) {
        if (direction * window.reader.scrollDirection < 0) {
            if (direction > 0) {
                window.reader.scrollDirection = 1
                this.hidenToolBar()

            } else {
                window.reader.scrollDirection = -1
                this.showToolBar()
            }
        }
        window.reader.scrollTop = currentScroll
    }
}
window.onbeforeunload = function () {
    window.setPositionRecord(window.pageYOffset)
}
window.onunload = function(){
    window.setPositionRecord(window.pageYOffset)
}
window.onblur = function () {
    window.setPositionRecord(window.pageYOffset)
}
