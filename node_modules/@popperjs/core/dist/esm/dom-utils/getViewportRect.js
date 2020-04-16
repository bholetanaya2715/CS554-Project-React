import getWindow from "./getWindow.js";
export default function getViewportRect(element) {
  var win = getWindow(element);
  var visualViewport = win.visualViewport || {};
  return {
    width: visualViewport.width || win.innerWidth,
    height: visualViewport.height || win.innerHeight,
    x: visualViewport.offsetLeft || 0,
    y: visualViewport.offsetTop || 0
  };
}