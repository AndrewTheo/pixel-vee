import { swatches } from "../Context/swatch.js"
import { toolbox } from "../Context/toolbox.js" //Must be imported for event listeners

//State (TODO: not yet a true state)
export const state = {
  //timeline
  points: [],
  undoStack: [],
  redoStack: [],
  //tool settings
  tool: null, //needs to be initialized
  mode: "draw", //TODO: modes should allow multiple modes at once
  brushStamp: [{ x: 0, y: 0, w: 1, h: 1 }], //default 1 pixel
  brushType: "circle",
  options: {
    perfect: false,
    erase: false,
    contiguous: false,
  },
  //touchscreen?
  touch: false,
  //dragging target
  dragging: false,
  dragX: null,
  dragY: null,
  dragTarget: null,
  //active variables for canvas
  shortcuts: true,
  clipMask: null,
  clickDisabled: false,
  clicked: false,
  clickedColor: null,
  cursorX: null, //absolute cursor coordinates relative to drawing area
  cursorY: null,
  previousX: null,
  previousY: null,
  cursorWithCanvasOffsetX: null, //absolute cursor coords with offset relative to viewable canvas area
  cursorWithCanvasOffsetY: null,
  onscreenX: null, //coordinates based on viewable canvas area relative to zoom (deprecated? always double cursorWithCanvasOffsetX)
  onscreenY: null,
  previousOnscreenX: null,
  previousOnscreenY: null,
  //x2/y2 for line tool
  lineX: null,
  lineY: null,
  //for curve tool
  clickCounter: 0,
  px1: null,
  py1: null,
  px2: null,
  py2: null,
  px3: null,
  py3: null,
  //for perfect pixels
  lastDrawnX: null,
  lastDrawnY: null,
  waitingPixelX: null,
  waitingPixelY: null,
  //for replace
  colorLayerGlobal: null,
  localColorLayer: null,
  //functions
  addToTimeline,
}

/**
 * command pattern. TODO: Look into saving app-state instead
 * @param {string} tool - tool to be recorded for history. Not necessarily the same as state.tool.name
 * @param {*} x
 * @param {*} y
 * @param {*} layer - layer that history should be applied to
 * @param {*} image - only for replace tool
 * @param {*} width - only for replace tool
 * @param {*} height - only for replace tool
 * @param
 */
function addToTimeline(tool, x, y, layer, image, width, height) {
  //use current state for variables
  state.points.push({
    //x/y are sometimes objects with multiple values
    x: x,
    y: y,
    width: width,
    height: height,
    image: image,
    layer: layer,
    brush: state.brushStamp,
    weight: state.tool.brushSize,
    color: { ...swatches.primary.color },
    tool: tool,
    action: state.tool.fn,
    mode: state.mode,
  })
}
