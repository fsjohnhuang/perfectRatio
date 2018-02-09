;(function(exports, PR){

  exports.PRUI = function(){
    var self = this
    self.pr = PR()
    self.el = createEl(tpl)
    document.body.appendChild(self.el)

    var zoomHandler = function(){ 
      var right = pr.calcInRatio(100)
        , fontSize = pr.calcInRatio(40)
        , width = pr.calcInRatio(650)
        , imgW = pr.calcInRatio(100)
        , imgH = pr.calcInRatio(80)
        , marginTop = pr.calcInRatio(10)
      showTips(self.el, right, fontSize, width, imgW, imgH, marginTop)
    }
    var perfectHandler = partial(hideTips, self.el)

    if (PR.PERFECT === pr.getRatioStatus()){
      perfectHandler()
    }
    else{
      zoomHandler()
    }
    pr.addEventListener("ratio-changed", partial(onRatioChanged, perfectHandler, zoomHandler, zoomHandler, zoomHandler))
  }

  function onRatioChanged(perfectHandler, zoomHandler, zoomInHandler, zoomOutHandler, evt){
    switch(evt.detail){
      case PR.PERFECT:
        perfectHandler()
        break;
      case PR.ZOOM:
        zoomHandler()
        break;
      case PR.ZOOM_IN:
        zoomInHandler()
        break;
      case PR.ZOOM_OUT:
        zoomOutHandler()
        break;
    }
  }

  function showTips(tips, right, fontSize, width, imgWidth, imgHeight, marginTop){
    tips.style.display = "block"
    tips.firstChild.style.right = right + "px"
    tips.firstChild.style.width = width + "px"
    tips.firstChild.style.fontSize = fontSize + "px"
    tips.firstChild.style.marginTop = marginTop + "px"
    tips.querySelector("img").width = imgWidth 
    tips.querySelector("img").height = imgHeight
  }
  function hideTips(tips){
    tips.style.display = "none"
  }

  var tpl = '<div style="position:fixed;height:100%;width:100%;background:rgba(0,0,0,0.2);top:0;left:0;"><p style="position:fixed;right:100px;top:0;font-size:40px;width:650px;margin-top:10px;text-align:right;">'
          +   '<img src="./asset/true.png" width="100" height="80" style="float:right;">'
          +   '亲，为了更好的体验，<br>'
          +   '请将页面缩放比设置为100%!!'
          + '</p><div>'
  function createEl(html){
    var div = document.createElement("div")
    div.innerHTML = html
    return div.firstChild
  }

  /* Utils */
  function toArray(arrayLike, startIndex){
    return Array.prototype.slice.call(arrayLike, startIndex || 0)
  }

  function partial(f){
    var presetArgs = toArray(arguments, 1)
    return function(){
      var args = toArray(arguments)
      return f.apply(null, presetArgs.concat(args))
    }
  }
}(window, window.PR))
