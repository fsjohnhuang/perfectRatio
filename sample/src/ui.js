/*!
 * @version 0.1.0
 * @author fsjohnhuang
 * @email fsjohnhuang@hotmail.com
 * @homepage fsjohnhuang.cnblogs.com
 * @license MIT
 */
import {partial, getBrowserInfo, CHROME, IE11} from "../lib/pr@v0.3.0/utils"
import {pr, PERFECT, ZOOM, ZOOM_IN, ZOOM_OUT} from "../lib/pr@v0.3.0/perfectRatio"

const RIGHT = 60
    , FONT_SIZE = 40
    , WIDTH = 650
    , IMG_WIDTH = 100
    , IMG_HEIGHT = 80
    , MARGIN_TOP = 10

let invoked = false
export function render(text="Hi dear, for better experience.<br>Set the Scaling to 100% please!!"){
  if (invoked) return
  invoked = true

  let mask = renderMask(text)
    , prInst = pr()
    , h = hideTips(mask)
    , s = showTips(prInst, mask)
    , f = partial(onRatioChanged, h, s, s, s)

  prInst.addEventListener("ratio-changed", f)
  prInst.detect()
}

function onRatioChanged(perfectHandler, zoomHandler, zoomInHandler, zoomOutHandler, evt){
  console.log(evt.detail)
  switch(evt.detail){
    case PERFECT:
      perfectHandler()
      break;
    case ZOOM:
      zoomHandler()
      break;
    case ZOOM_IN:
      zoomInHandler()
      break;
    case ZOOM_OUT:
      zoomOutHandler()
      break;
  }
}

function showTips(pr, mask){
  return () => {
    let right = pr.calcInRatio(RIGHT)
      , fontSize = pr.calcInRatio(FONT_SIZE)
      , width = pr.calcInRatio(WIDTH)
      , imgW = pr.calcInRatio(IMG_WIDTH)
      , imgH = pr.calcInRatio(IMG_HEIGHT)
      , marginTop = pr.calcInRatio(MARGIN_TOP)
    updateMask(mask, right, fontSize, width, imgW, imgH, marginTop)
    mask.style.display = "block"
  }
}
function hideTips(mask){
  return () => mask.style.display = "none"
}

/*function tplChrome(right, fontSize, width, imgWidth, imgHeight, marginTop, text){
  return `<div style="position:fixed;height:100%;width:100%;background:rgba(0,0,0,0.2);top:0;left:0;">
    <p style="position:fixed;right:${right}px;top:0;font-size:${fontSize}px;width:${width}px;margin-top:${marginTop}px;text-align:right;">
      <img src="./asset/true.png" width="${imgWidth}" height="${imgHeight}" style="float:right;">
      ${text}
    </p>
   </div>`
}*/

//function tplIE11(right, fontSize, width, imgWidth, imgHeight, marginTop, text){
//
function tplChrome(right, fontSize, width, imgWidth, imgHeight, marginTop, text){
  return `<div style="position:fixed;height:100%;width:100%;background:rgba(0,0,0,0.2);top:0;left:0;">
    <p style="position:fixed;right:${right}px;bottom:0;font-size:${fontSize}px;width:${width}px;margin-top:${marginTop}px;text-align:right;">
      <img src="./asset/true.png" width="${imgWidth}" height="${imgHeight}" style="float:right;transform:rotateX(180deg);position:relative;top:50px;">
      ${text}
    </p>
   </div>`
}

function tpl(text){
  let html
  switch(getBrowserInfo()){
    case CHROME:
      html = tplChrome(RIGHT, FONT_SIZE, WIDTH, IMG_WIDTH, IMG_HEIGHT, MARGIN_TOP, text)
      break;
    case IE11:
      html = tplIE11(RIGHT, FONT_SIZE, WIDTH, IMG_WIDTH, IMG_HEIGHT, MARGIN_TOP, text)
      break;
  }

  return html
}

//function updateMaskIE11(mask, right, fontSize, width, imgWidth, imgHeight, marginTop){
function updateMaskChrome(mask, right, fontSize, width, imgWidth, imgHeight, marginTop){
    mask.firstElementChild.style.right = right + "px"
    mask.firstElementChild.style.width = width + "px"
    mask.firstElementChild.style.fontSize = fontSize + "px"
    mask.firstElementChild.style.marginTop = marginTop + "px"
    mask.querySelector("img").width = imgWidth 
    mask.querySelector("img").height = imgHeight
    mask.querySelector("img").style.top = pr().calcInRatio(50) + "px"
}

/*function updateMaskChrome(mask, right, fontSize, width, imgWidth, imgHeight, marginTop){
    mask.firstElementChild.style.right = right + "px"
    mask.firstElementChild.style.width = width + "px"
    mask.firstElementChild.style.fontSize = fontSize + "px"
    mask.firstElementChild.style.marginTop = marginTop + "px"
    mask.querySelector("img").width = imgWidth 
    mask.querySelector("img").height = imgHeight
}*/

function updateMask(mask, right, fontSize, width, imgWidth, imgHeight, marginTop){
  switch(getBrowserInfo()){
    case CHROME:
      updateMaskChrome(mask, right, fontSize, width, imgWidth, imgHeight, marginTop)
      break;
    case IE11:
      updateMaskIE11(mask, right, fontSize, width, imgWidth, imgHeight, marginTop)
      break;
  }
}

function renderMask(text){
  let html = tpl(text)
    , mask = createDom(html)
  document.body.appendChild(mask)

  return mask
}

function createDom(html){
    let div = document.createElement("div")
    div.innerHTML = html
    return div.firstChild
}
