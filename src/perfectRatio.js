/*!
 * @version 0.3.1
 * @author fsjohnhuang
 * @email fsjohnhuang@hotmail.com
 * @homepage fsjohnhuang.cnblogs.com
 * @license MIT
 */
import {debounce, saveToLocal, getFromLocal, on} from "./utils"

// the status of scaling
export const PERFECT = -1
export const ZOOM = 0
export const ZOOM_IN = 1
export const ZOOM_OUT = 2

// supported event types
const EVENT_TYPES = ["ratio-changed"]
    , DEFAULT_PR = 1
    , RATIOS = [1, 1.5, 2]
    , STORAGE_KEY = "perfectRatio.perfect_ratio"

// singleton pattern
let singleton
export function pr(){
  if (!singleton){
    singleton = new PR(DEFAULT_PR, RATIOS, STORAGE_KEY)
  }
  return singleton
}

/* @constructor
 */
class PR{
  static get PERFECT(){return PERFECT}
  static get ZOOM(){return ZOOM}
  static get ZOOM_IN(){return ZOOM_IN}
  static get ZOOM_OUT(){return ZOOM_OUT}

  /* @constructor
   * @param {Number} defaultPR - default perfect ratio
   * @param {Array<Number>} ratios - supposed perfect ratio
   * @param {String} storageKey - local storage record key name
   */
  constructor(defaultPR, ratios, storageKey){
    let self = this
    self.defaultPR = defaultPR // default perfect ratio I suppose
    self.ratios = ratios    // perfect ratio maybe
    self.storageKey = storageKey
    self.__dom = document.createElement("div")
    self.__detecting = false
  }
  /* @description Get the current ratio status
   * @return {PERFECT|ZOOM|ZOOM_IN|ZOOM_OUT}
   */
  getRatioStatus(){
    let self = this
      , storageKey = self.storageKey
      , ratios = self.ratios
      , outerWidth = window.outerWidth
      , innerWidth = window.innerWidth
      , outerHeight = window.outerHeight
      , innerHeight = window.innerHeight
      , devicePixelRatio = window.devicePixelRatio

    let status = getRatioStatus(ratios, outerWidth, innerWidth, outerHeight, innerHeight, devicePixelRatio)

    if (PERFECT === status){
      saveToLocal(storageKey, devicePixelRatio)
    }

    return status
  }
  /* @description Get the perfect ratio
   * @return {Number}
   */
  getPerfectRatio(){
    let self = this
      , storageKey = self.storageKey
      , defaultPR = self.defaultPR

    let ratio = getFromLocal(storageKey) || defaultPR
    return ratio
  }
  /* @description transform the input number to what is fit to current ratio
   * @param {Number}
   * @return {Number}
   */
  calcInRatio(num){
    let self = this
      , perfectRatio = self.getPerfectRatio()
      , currRatio = window.devicePixelRatio
    return perfectRatio/currRatio * num
  }
  addEventListener(eventType, f){
    if (!~EVENT_TYPES.indexOf((String(eventType || "").toLowerCase()))){
      throw Error("PR doesn't support event type " + eventType + ".")
    }
    let self = this
    self.__dom.addEventListener(eventType, f)
  }
  removeEventListener(eventType, f){
    if (!~EVENT_TYPES.indexOf((String(eventType || "").toLowerCase()))){
      throw Error("PR doesn't support event type " + eventType + ".")
    }
    let self = this
    self.__dom.removeEventListener(eventType, f)
  }
  detect(delay=50){
    let self = this

    if (self.__detecting){
      throw Error("Has been detecting!")
    }
    self.__detecting = true

    let ratioChangedDetecter = debounce(delay, function(){
      fireRatioChangedEvent(self.__dom, self.getRatioStatus())
    })
    window.addEventListener("resize", ratioChangedDetecter)
    ratioChangedDetecter()
  }
}

/* @description get the current ratio status
 * @private
 * @param {Array<Number>} ratios
 * @param {Number} outerWidth
 * @param {Number} innerWidth
 * @param {Number} outerHeight
 * @param {Number} innerHeight
 * @param {Number} currRatio
 * @return {PERFECT|ZOOM|ZOOM_IN|ZOOM_OUT}
 */
function getRatioStatus(ratios
                        , outerWidth, innerWidth, outerHeight, innerHeight, currRatio){
  let status
  if (isConsoling()){
    status = isPerfectInConsole(ratios, currRatio, outerWidth, innerWidth, outerHeight, innerHeight) ? PERFECT : ZOOM
  }
  else{
    status = isPerfectInView(ratios, outerWidth, innerWidth, currRatio)
             ? PERFECT
             : isZoomIn(outerWidth, innerWidth) ? ZOOM_IN : ZOOM_OUT
  }
  return status
}

function fireRatioChangedEvent(el, status){
  let evt = document.createEvent("CustomEvent")
  evt.initCustomEvent("ratio-changed", false, false, status)
  el.dispatchEvent(evt)
}

/* @description Console pane is open or not
 * @private
 * @return {Boolean} - true: open, false: close
 */
function isConsoling(){
  let open = false
    , el = document.createElement("div")
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
function isPerfectInConsole(ratios, ratio, outerWidth, innerWidth, outerHeight, innerHeight){
  let dW = Math.abs(outerWidth - innerWidth)
    , dH = Math.abs(outerHeight - innerHeight)
  return !!~ratios.indexOf(ratio) && (dW < 17 || dH < 17)
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
