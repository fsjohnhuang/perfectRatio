export function toArray(arrayLike, startIndex){
  return Array.prototype.slice.call(arrayLike, startIndex || 0)
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
