const DWIDTH = 13
const FULLSCREEN_DWIDTH = 0
const FULLSCREEN_DHEIGHT = 0
const MIN_DHEIGHT_IN_CONSOLE = 87
const MAX_DHEIGHT_IN_CONSOLE = 93

export function isPerfectInView(dw){
    return dw == DWIDTH
}
export function isPerfectInConsole(dw, dh){
    return dw == DWIDTH || (MIN_DHEIGHT_IN_CONSOLE <= dh && dh <= MAX_DHEIGHT_IN_CONSOLE)
}

export function isPerfectInViewFullscreen(dw, dh){
  return dw == FULLSCREEN_DWIDTH && dh == FULLSCREEN_DHEIGHT
}

export function isPerfectInConsoleFullscreen(dw, dh){
  throw Error()
}

export function isZoomInInView(dw){
  return dw < DWIDTH
}
export function isZoomOutInView(dw){
  return dw > DWIDTH
}
