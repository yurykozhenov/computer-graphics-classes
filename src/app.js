import app from './app.module';
import './components';

// import drawCube from './functions/draw-cube';

const canvas = document.getElementById('canvas');

canvas.width = window.innerWidth / 1.4;
canvas.height = window.innerHeight - 25;

window.ctx = canvas.getContext('2d');
