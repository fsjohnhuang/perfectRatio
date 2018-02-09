/*!
 * @version 0.2.0
 * @author fsjohnhuang
 * @email fsjohnhuang@hotmail.com
 * @homepage fsjohnhuang.cnblogs.com
 * @license MIT
 */
;(function(exports){
  // the status of scaling
  var PERFECT = -1
    , ZOOM = 0
    , ZOOM_IN = 1
    , ZOOM_OUT = 2

  // supported event types
  var EVENT_TYPES = ["ratio-changed"]
  // singleton pattern
  var singleton

  /* @constructor
   * @public
   */
  var PerfectRatio = exports.PR = exports.perfectRatio = function(){
    if (singleton) return singleton

    var self = this
    if (self instanceof PerfectRatio);else return new PerfectRatio()

    self.defaultPerfectRatio = 1 // default perfect ratio I suppose
    self.ratios = [1, 1.5, 2]    // perfect ratio maybe
    self.storageKey = "perfectRatio.perfect_ratio"

    // listen resize event to detect the ratio changing in real time
    var ratioChangedDetecter = debounce(200, function(){
      fireRatioChangedEvent(self.getRatioStatus())
    })

    window.addEventListener("resize", ratioChangedDetecter)

    return (singleton = this)
  }

  /* @description get the current ratio status
   * @public
   * @return {PERFECT|ZOOM|ZOOM_IN|ZOOM_OUT}
   */
  PerfectRatio.prototype.getRatioStatus = function(){
    var self = this
      , outerWidth = window.outerWidth
      , innerWidth = window.innerWidth
      , devicePixelRatio = window.devicePixelRatio

    var status = getRatioStatus(self.ratios, outerWidth, innerWidth, devicePixelRatio)

    if (PERFECT === status){
      savePerfectRatio(self.storageKey, devicePixelRatio)
    }

    return status
  }

  /* @description get the perfect ratio
   * @public
   * @return {Number}
   */
  PerfectRatio.prototype.getPerfectRatio = function(){
    var self = this
      , storageKey = self.storageKey
      , defaultPerfectRatio = self.defaultPerfectRatio

    var ratio = getPerfectRatio(storageKey) || defaultPerfectRatio
    return ratio
  }

  PerfectRatio.prototype.calcInRatio = function(num){
    var self = this
      , perfectRatio = self.getPerfectRatio()
      , currRatio = window.devicePixelRatio
    return perfectRatio/currRatio * num
  }


  PerfectRatio.prototype.addEventListener = function(eventType, f){
    if (!~EVENT_TYPES.indexOf((String(eventType || "").toLowerCase()))){
      throw Error("PR doesn't support event type " + eventType + ".")
    }
    document.addEventListener(eventType, f)
  }

  PerfectRatio.prototype.removeEventListener = function(eventType, f){
    if (!~EVENT_TYPES.indexOf((String(eventType || "").toLowerCase()))){
      throw Error("PR doesn't support event type " + eventType + ".")
    }
    document.removeEventListener(eventType, f)
  }

  PerfectRatio.PERFECT = PERFECT
  PerfectRatio.ZOOM = ZOOM
  PerfectRatio.ZOOM_IN = ZOOM_IN
  PerfectRatio.ZOOM_OUT = ZOOM_OUT


  /* @description get the current ratio status
   * @private
   * @param {Array<Number>} ratios
   * @param {Number} outerWidth
   * @param {Number} innerWidth
   * @param {Number} currRatio
   * @return {PERFECT|ZOOM|ZOOM_IN|ZOOM_OUT}
   */
  function getRatioStatus(ratios
                          , outerWidth, innerWidth, currRatio){
    var status = undefined
    if (isConsoling()){
      status = isPerfectInConsole(ratios, currRatio) ? PERFECT : ZOOM
    }
    else{
      status = isPerfectInView(ratios, outerWidth, innerWidth, currRatio)
               ? PERFECT
               : isZoomIn(outerWidth, innerWidth) ? ZOOM_IN : ZOOM_OUT
    }
    return status
  }

  function fireRatioChangedEvent(status){
    var evt = document.createEvent("CustomEvent")
    evt.initCustomEvent("ratio-changed", false, false, status)
    document.dispatchEvent(evt)
  }

  /* @description Console pane is open or not
   * @private
   * @return {Boolean} - true: open, false: close
   */
  function isConsoling(){
    var open = false
    var el = document.createElement("div")
    Object.defineProperty(el, "id", {get: function(){open = true}})
    console.log("%c", el)
    return open
  }

  /* @description Ratio is perfect or not without opening Console pane
   * @private
   * @param {Array<Number>} ratios - perfect ratios maybe
   * @param {Number} outerWidth - window.outerWidth
   * @param {Number} innerWidth - window.innerWidth
   * @param {Number} ratio - current ratio
   * @return {Boolean}
   */
  function isPerfectInView(ratios, outerWidth, innerWidth, ratio){
    return Math.abs(outerWidth - innerWidth) < 17 // the dVal between outerWidth and innerWidth is 16px in IE11
           && !!~ratios.indexOf(ratio)
  }

  /* @description Ratio is perfect or not with opening Console pane
   * @private
   * @param {Array<Number>} ratios - perfect ratios maybe
   * @param {Number} ratio - current ratio
   * @return {Boolean}
   */
  function isPerfectInConsole(ratios, ratio){
    return !!~ratios.indexOf(ratio)
  }

  /* @description Zoom in or not
   * @private
   * @param {Number} outerWidth - window.outerWidth
   * @param {Number} innerWidth - window.innerWidth
   * @return {Boolean}
   */
  function isZoomIn(outerWidth, innerWidth){
    return outerWidth - innerWidth > 16 // the dVal between outerWidth and innerWidth is 16px in IE11
  }

  /* @description Zoom out or not
   * @private
   * @param {Number} outerWidth - window.outerWidth
   * @param {Number} innerWidth - window.innerWidth
   * @return {Boolean}
   */
  function isZoomOut(outerWidth, innerWidth){
    return innerWidth - outerWidth > -16 // the dVal between outerWidth and innerWidth is 16px in IE11
  }

  /* Utils */
  function savePerfectRatio(key, val){
    localStorage.setItem(key, val)
  }

  function getPerfectRatio(key){
    return localStorage.getItem(key)
  }

  function toArray(arrayLike, startIndex){
    return Array.prototype.slice.call(arrayLike, startIndex || 0)
  }

  function debounce(delay, f){
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
}(window))
