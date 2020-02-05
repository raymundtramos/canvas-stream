// const socket = io();
var canvas = document.getElementById('draw-canvas');
var context = canvas.getContext('2d');
var bounds = canvas.getBoundingClientRect();
var drawInProgress = false;
var currentX;
var currentY;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

canvas.addEventListener('mousedown', function(e) {
    drawInProgress = true;
    currentX = e.clientX - bounds.left;
    currentY = e.clientY - bounds.top;
});

canvas.addEventListener('mousemove', function(e) {
    if (drawInProgress) {
        var data = {
            startX: currentX,
            startY: currentY,
            endX: e.clientX - bounds.left,
            endY: e.clientY - bounds.top,
            strokeWidth: 1,
            strokeColor: 'rgb(0,0,0)'
        };
        draw(data);
        currentX = data.endX;
        currentY = data.endY;
    }
});

canvas.addEventListener('mouseup', function(e) {
    drawInProgress = false;
});

canvas.addEventListener('mouseleave', function(e) {
    drawInProgress = false;
});

function draw(data) {
    console.log(data);
    context.beginPath();
    context.strokeStyle = data.strokeWidth;
    context.strokeStyle = data.strokeColor;
    context.moveTo(data.startX, data.startY);
    context.lineTo(data.endX, data.endY);
    context.stroke();
    context.closePath();
}