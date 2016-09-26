export const canvas = document.getElementById('canvas');

const SIDEBAR_WIDTH_RATIO = 1.2;

export function setCanvasSize() {
  canvas.width = window.innerWidth / SIDEBAR_WIDTH_RATIO;
  canvas.height = window.innerHeight;
}

setCanvasSize();

export const ctx = canvas.getContext('2d');
