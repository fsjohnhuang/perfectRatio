const DWIDTH = [0, 13, 14]
const DHEIGHT_IN_CONSOLE = [0,65,66,86,89]
const FULLSCREEN_DWIDTH = 0
const FULLSCREEN_DHEIGHT = 0

export function isPerfectInView(dw){
    return !!~DWIDTH.indexOf(dw)
}
export function isPerfectInConsole(dw, dh){
    return !!~DWIDTH.indexOf(dw) || !!~DHEIGHT_IN_CONSOLE.indexOf(dh)
}
export function isPerfectInViewFullscreen(dh){
  return dh == FULLSCREEN_DHEIGHT
}

export function isPerfectInConsoleFullscreen(dw, dh){
  return dw == FULLSCREEN_DWIDTH || dh == FULLSCREEN_DHEIGHT
}

export function isZoomInInView(dw){
  return dw > DWIDTH[1]
}
export function isZoomOutInView(dw){
  return dw < 0
}
