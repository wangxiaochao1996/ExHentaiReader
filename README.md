# ExHentaiReader  
## 插件版(正式版)  
基于浏览器的exHentai阅读器，通过js重构页面，主要为了解决iOS用户重签的问题，无需下载应用。
###
* [0 更新](#0-更新)  
* [1 使用效果](#1-使用效果)  
* [2 安装方法](#2-安装方法)  
* [3 使用方法](#3-使用方法)  
* [4 说明](#4-说明)  
* [5 已知问题](#5-已知问题)  

唠叨两句，今天刚看见熊猫书签决定停止更新了，感觉就仿佛身后坚强的后盾倒塌了一样，不是滋味。

### 0 更新  
1、等待标识更加直观，改用顶部热力条的形式显示加载成功与未成功的图片  
2、添加了重新加载和图片换源功能，再次执行标签即可对未加载的图片进行换源  
3、将功能集成到了侧边栏  
4、实现了标签翻译功能

### 1 使用效果
**使用前：**  
<img align=center src='https://raw.githubusercontent.com/manakanemu/ExHentaiReader/master/describe/1.png' width='220px' height='480px'>  
**使用后：**  

|图片铺满|侧边功能栏|标签翻译|自定义按钮尺寸|
|-------|---------|--------|------------|
|<img src='https://raw.githubusercontent.com/manakanemu/ExHentaiReader/master/describe/2.png' width='220px'>|<img src='https://raw.githubusercontent.com/manakanemu/ExHentaiReader/master/describe/3.png' width='220px'>|<img src='https://raw.githubusercontent.com/manakanemu/ExHentaiReader/master/describe/5.png' width='220px'>|<img src='https://raw.githubusercontent.com/manakanemu/ExHentaiReader/master/describe/4.png' width='220px'>|


### 2 安装方法  
手机浏览器随便打开一个网页，添加书签，然后用下面**代码生成器**中生成的代码替换掉书签的地址

[代码生成器(点这里)](https://manakanemu.github.io/ExHentaiReader/)  
  
### 3 使用方法
* 打开本子页面，点击书签即可运行。  
* 运行脚本后，页面上方会浮动显示加载热力条，绿色部分为加载完成部分，红色部分为加载未完成部分。消失或全部变绿表示图片全部加载完成。
* 下滑出现功能栏，功能栏中四个按钮从上到下分别为“转到第一张图”、“转到最后一张图”、“恢复之前的观看位置”、“图片换源”
* 页面刷新或推出会自动记录观看位置，下次观看可使用“恢复之前的观看位置”恢复
* 如果图片长时间未全部加载完成，可以点击工具栏第四个“图片换源”更滑图片来源



### 4 说明
* 下滑功能栏的呼出尝试模仿Safari的惯性检测，稍用力下滑后手指离屏才会呼功能栏。缓慢下滑或手指不离屏快速下滑不会呼出功能栏。
* 如果有任何意见、建议或其他想说的，请直接发issue。  
* 由于本人学习研究方向和web以及移动端app并不相关，想进一步优化但苦于缺乏相关UI设计经验，如果您知道任何优秀的案例，也可以发到issue里，感谢。

### 5 已知问题
*  iPad等类5:4屏幕的显示错位问题

## ~~框架版(测试版)~~ 
### 1 使用效果  
一键注入脚本，重构网站，无需多次使用，目前正在优化逻辑，以及手机端Gui的适配  
<img align=center src='https://raw.githubusercontent.com/manakanemu/ExHentaiReader/master/describe/test.GIF' width='220px' height='480px'>     
### 2 安装方法   
手机浏览器随便打开一个网页，添加书签，然后用**下面这段代码**替换掉书签的地址
```
javascript:var s = document.createElement('script');s.setAttribute('src','https://manakanemu.github.io/ExHentaiReader/ReloadStructure.js?'+parseInt(Date.parse(new Date())/1000)); s.setAttribute('id','exReader'); document.body.appendChild(s);
```  
### 3 使用方法
1、打开exhentai主页，点击书签运行脚本
2、运行书签后页面会刷新，刷新后点击预览本子即可
### 4 说明  
框架版目前只是测试版，只有在直接点击本子的时候会自动进入阅读模式，在新标签打开的无效。脚本注入后无法搜索关键词，目前只能先搜索关键词之后再使用脚本。还可能有其他bug。我目前正在继续优化代码逻辑，并且正在编写能够适应手机的GUI，如果您有任何意见建议或bug反馈，请直接发issue。
 
