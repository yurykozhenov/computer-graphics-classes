export const canvas = document.getElementById('canvas');

const SIDEBAR_WIDTH_RATIO = 1.22;
const SCROLLBAR_OFFSET = 25;

export function setCanvasSize() {
  canvas.width = window.innerWidth / SIDEBAR_WIDTH_RATIO;
  canvas.height = window.innerHeight - SCROLLBAR_OFFSET;
}

setCanvasSize();

export const ctx = canvas.getContext('2d');
