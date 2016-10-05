export const canvas = document.getElementById('canvas');

export function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

setCanvasSize();

export const ctx = canvas.getContext('2d');
