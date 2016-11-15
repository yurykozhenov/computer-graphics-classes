export const canvas = document.getElementById('canvas');

export let canvasXCenter = canvas.width / 2;
export let canvasYCenter = canvas.height / 2;

export function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasXCenter = canvas.width / 2;
  canvasYCenter = canvas.height / 2;
}

setCanvasSize();

export const ctx = canvas.getContext('2d');
