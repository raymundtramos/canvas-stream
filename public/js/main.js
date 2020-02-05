const socket = io();
var canvas = document.getElementById('draw-canvas');
var context = canvas.getContext('2d');
var bounds = canvas.getBoundingClientRect();
var drawInProgress = false;
var currentX;
var currentY;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

// Mouse Events
canvas.addEventListener('mousedown', function(e) {
    drawStartEvent(e.clientX, e.clientY);
});
canvas.addEventListener('mousemove', function(e) {
    drawMoveEvent(e.clientX, e.clientY);
});
canvas.addEventListener('mouseup', drawEndEvent, false);
canvas.addEventListener('mouseleave', drawEndEvent, false);

// Touch Events
canvas.addEventListener('touchstart', function(e) {
    drawStartEvent(e.touches[0].clientX, e.touches[0].clientY);
});
canvas.addEventListener('touchmove', function(e) {
    drawMoveEvent(e.touches[0].clientX, e.touches[0].clientY);
});
canvas.addEventListener('touchend', drawEndEvent, false);

function draw(data) {
    // console.log(data);
    context.beginPath();
    context.strokeWidth = data.strokeWidth;
    context.strokeStyle = data.strokeColor;
    context.moveTo(data.startX, data.startY);
    context.lineTo(data.endX, data.endY);
    context.stroke();
    context.closePath();
}

function drawStartEvent(x, y) {
    drawInProgress = true;
    currentX = x - bounds.left;
    currentY = y - bounds.top;
}

function drawMoveEvent(x, y) {
    if (drawInProgress) {
        var data = {
            startX: currentX,
            startY: currentY,
            endX: x - bounds.left,
            endY: y - bounds.top,
            strokeWidth: 1,
            strokeColor: 'rgb(0,0,0)'
        };
        draw(data);
        currentX = data.endX;
        currentY = data.endY;
        socket.emit('draw', data);
    }
}

function drawEndEvent(e) {
    drawInProgress = false;
}

socket.on('draw', function(data) {
    console.log(data);
    draw(data);
});