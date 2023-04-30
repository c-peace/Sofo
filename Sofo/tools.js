// basic setting
const canvas = document.querySelector('#canvasMain');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('upload');
canvas.width = 1190;
canvas.height = 1684;


// draw text area in canvas
ctx.fillStyle = "white"; // 색상명
ctx.fillRect(0, 0, 1190, 1684);
function drawTextArea() {
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.fillRect(94, 80, 1002, 140);
    ctx.strokeRect(94, 80, 1002, 140);
    ctx.moveTo(94, 155);
    ctx.lineTo(300, 155);
    ctx.moveTo(300, 80);
    ctx.lineTo(300, 220);
    ctx.stroke();
}
drawTextArea();


// load Music Score
function loadImage(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    console.dir(file);
    image.src = url;
    image.onload = function () {

        // set image size
        let imageHeight = 0;
        let imageWidth = 0;
        if (image.height > image.width) {
            imageHeight = (canvas.height - 220) * 9 / 10;
            imageWidth = image.width * imageHeight / image.height;
        } else {
            imageWidth = canvas.width * 9 / 10;
            imageHeight = image.height * imageWidth / image.width;
        }
        ctx.drawImage(image, (canvas.width - imageWidth) / 2, (220 + canvas.height - imageHeight) / 2, imageWidth, imageHeight);
    };

    const infoImage = document.getElementById('info_img');
    infoImage.textContent = '선택완료!';
    // file input disable시키기
    imageInput.disabled = true;

};

imageInput.addEventListener('change', loadImage);


// Draw Flag
const canvasFlag = document.getElementById("canvasFlag");
const ctxFlag = canvasFlag.getContext('2d');
canvasFlag.width = 1190;
canvasFlag.height = 1684;
canvas.backScreen = 'transparent';

let dragok = false;
let startX;
let startY;

canvasFlag.addEventListener('mousedown', myDown);
canvasFlag.addEventListener('mouseup', myUp);
canvasFlag.addEventListener('mousemove', myMove);

const shapes = [];
shapes.push({ x: 100, y: 1600, r: 30, strokeStyle: "black", fillStyle: "white", name: "A", isDragging: false });

const infoFlag = document.getElementById('info_flag');
const keyboard = document.querySelector('#keyboard');

function onFlagClick() {
    infoFlag.textContent = '생성중 . . .';
    keyboard.disabled = false;
    keyboard.focus();
    keyboard.placeholder = 'Typing... Enter!';
    i = 4;
}

function createFlag(nameFlag) {
    shapes.push({ x: 25 * i, y: 1600, r: 30, strokeStyle: "black", fillStyle: "white", name: nameFlag, isDragging: false });
}

function circle(c) {
    ctxFlag.save();
    ctxFlag.beginPath();
    // outlind
    ctxFlag.lineWidth = 8;
    ctxFlag.strokeStyle = c.strokeStyle;
    ctxFlag.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctxFlag.stroke();
    // inner fill
    ctxFlag.fillStyle = c.fillStyle;
    ctxFlag.fill();
    // text
    ctxFlag.textAlign = 'center';
    ctxFlag.lineWidth = 1;
    ctxFlag.fillStyle = c.strokeStyle;
    ctxFlag.font = '40px Arial';
    ctxFlag.fillText(c.name, c.x, c.y + c.r * 1 / 3);
    ctxFlag.restore();
}

function clear() {
    ctxFlag.clearRect(0, 0, canvasFlag.width, canvasFlag.height);
}

function draw() {
    clear();
    for (let i = 0; i < shapes.length; i++) {
        circle(shapes[i]);
    }
}

// handle mousedown events
function myDown(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    const mx = (e.offsetX / ((window.innerHeight * 595 * 9) / (969 * 10))) * canvasFlag.width;
    const my = (e.offsetY / ((window.innerHeight * 842 * 9) / (969 * 10))) * canvasFlag.height;

    // test each shape to see if mouse is inside
    dragok = false;
    for (let i = 0; i < shapes.length; i++) {
        let s = shapes[i];
        const dx = s.x - mx;
        const dy = s.y - my;

        // test if the mouse is inside this circle
        if (!dragok && dx * dx + dy * dy < s.r * s.r) {
            dragok = true;
            s.isDragging = true;

        }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
}

// handle mouseup events
function myUp(e) {
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    dragok = false;
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].isDragging = false;
    }
}

// handle mouse moves
function myMove(e) {
    // if we're dragging anything...
    if (dragok) {
        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        const mx = (e.offsetX / ((window.innerHeight * 595 * 9) / (969 * 10))) * canvasFlag.width;
        const my = (e.offsetY / ((window.innerHeight * 842 * 9) / (969 * 10))) * canvasFlag.height;

        // calculate the distance the mouse has moved
        // since the last mousemove
        const dx = mx - startX;
        const dy = my - startY;

        // move each rect that isDragging
        // by the distance the mouse has moved
        // since the last mousemove
        for (let i = 0; i < shapes.length; i++) {
            const s = shapes[i];
            if (s.isDragging) {
                s.x += dx;
                s.y += dy;
            }
        }

        // redraw the scene with the new rect positions
        draw();

        // reset the starting mouse position for the next mousemove
        startX = mx;
        startY = my;
    }
}


// Draw Text
let i = 0;
const infoText = document.getElementById('info_text');
function onTextClick() {
    infoText.textContent = '입력중 . . .';
    drawTextArea();
    keyboard.disabled = false;
    keyboard.focus();
    keyboard.placeholder = 'Typing... Enter!';
    i = 0;
}

function drawText() {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.font = '42px Arial';
    ctx.fillText(dictText[0], 110, 135);
    ctx.font = '30px Arial';
    ctx.fillText('tempo = ' + dictText[1], 110, 200);
    ctx.font = '40px Arial';
    ctx.fillText(dictText[2], 350, 165);
    ctx.restore();
}

const dictText = {}
function enterkey() {
    if (window.event.keyCode == 13) {
        // 엔터키가 눌렸을 때
        if (i < 3) {
            dictText[i] = keyboard.value;
            i++;
        }

        if (i == 3) {
            infoText.textContent = '입력완료!';
            drawText();
            keyboard.disabled = true;
            keyboard.placeholder = 'Sofo - 찬양팀 세션을 위한 악보편집 서비스';
        }

        if (i > 3) {
            if (keyboard.value != '') {
                createFlag(keyboard.value, i);
                draw();
                i++;
            }
        }
        keyboard.value = ''
    }
}

// modal page
function fullScreen() {
    const modal = document.querySelector('#modal');

    const url = canvas.toDataURL();
    console.dir(url);
    const Fullscreen = document.querySelector("#canvasFullscreen");
    Fullscreen.src = url;

    modal.style.display = 'block';
}

function backScreen() {
    const modal = document.querySelector('#modal');

    modal.style.display = 'none';
}


// download
function onSaveClick() {
    const url = canvas.toDataURL();
    console.dir(url);
    const Fullscreen = document.querySelector("#canvasFullscreen");
    Fullscreen.src = url;
    const a = document.createElement("a");
    a.href = url;
    a.download = "musicScore.png";
    a.click();
}