export const canvas = document.getElementById('canvas');

const sidebarWidthRatio = 1.4;
const scrollbarOffset = 25;

canvas.width = window.innerWidth / sidebarWidthRatio;
canvas.height = window.innerHeight - scrollbarOffset;

export const ctx = canvas.getContext('2d');
