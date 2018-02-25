const DWIDTH = 16
const FULLSCREEN_DHEIGHT = 23
const MIN_DHEIGHT_IN_CONSOLE = 92
const MAX_DHEIGHT_IN_CONSOLE = 93

export function isPerfectInView(dw){
    return dw == DWIDTH
}
export function isPerfectInConsole(dw, dh){
    return dw == DWIDTH || (MIN_DHEIGHT_IN_CONSOLE <= dh && dh <= MAX_DHEIGHT_IN_CONSOLE)
}

export function isPerfectInViewFullscreen(dh){
  return dh == FULLSCREEN_DHEIGHT
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
