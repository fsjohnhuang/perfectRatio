export function toArray(arrayLike, startIndex){
  return Array.prototype.slice.call(arrayLike, startIndex || 0)
}

export function partial(f){
  let presetArgs = toArray(arguments, 1)
  return function(){
    let args = toArray(arguments)
    return f.apply(null, presetArgs.concat(args))
  }
}

export function debounce(delay, f){
  var presetArgs = toArray(arguments, 2)
  var descriptor
  return function(){
    clearTimeout(descriptor)

    var args = toArray(arguments)
    descriptor = setTimeout(function(){
      f.apply(null, presetArgs.concat(args))
    }, delay)
  }
}

export function saveToLocal(key, val){
  localStorage.setItem(key, val)
}

export function getFromLocal(key){
  return localStorage.getItem(key)
}

export const CHROME = 0
export const IE11 = 1
export const EDGE = 2

const rChrome = /Chrome|Chromium/i
const rEdge = /Edge/i
export function getBrowserInfo(){
  let ua = navigator.userAgent
  if (rEdge.test(ua)){
    return EDGE
  }
  else if (rChrome.test(ua)){
    return CHROME
  }
  else{
    return IE11
  }
}

const isFullscreenImpls = ["fullscreen", "mozFullScreen", "webkitIsFullScreen", "msFullscreenElement"]
function isFullscreen(){
  for (var i = 0, l = isFullscreenImpls.length; i < l; i++) {
    let impl = isFullscreenImpls[i]
    if (impl in document){
      return !!document[impl]
    }
  }
}

const onFullscreenchangeImpls = ["onfullscreenchange", "onmozfullscreenchange", "onwebkitfullscreenchange", "onmsfullscreenchange"]
function onFullscreenchange(f){
  for (var i = 0, l = onFullscreenchangeImpls.length; i < l; i++) {
    let impl = onFullscreenchangeImpls[i]
    if (impl in document){
      document.addEventListener(impl.replace(/^on/, ""), f)
      return
    }
  }
}
let fullscreen = isFullscreen()
onFullscreenchange(function(){
  fullscreen = isFullscreen()
})
export function getFullscreen(){
  return fullscreen
}
