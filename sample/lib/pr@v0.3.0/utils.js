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

const rChrome = /Chrome|Chromium/i
export function getBrowserInfo(){
  let ua = navigator.userAgent
  if (rChrome.test(ua)){
    return CHROME
  }
  else{
    return IE11
  }
}

