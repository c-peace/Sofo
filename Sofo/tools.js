// basic setting
const canvas = document.querySelector('#canvasMain');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('upload');
canvas.width = 1190;
canvas.height = 1684;

const canvasFlag = document.getElementById("canvasFlag");
const ctxFlag = canvasFlag.getContext('2d');
canvasFlag.width = 1190;
canvasFlag.height = 1684;
canvas.backScreen = 'transparent';

function reset() {
    clearCanvas();
    drawTextArea();
    clearCanvasFlag();
}

// draw text area in canvas
function clearCanvas() {
    ctx.fillStyle = "white"; // 색상명
    ctx.fillRect(0, 0, 1190, 1684);
}
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
clearCanvas();
drawTextArea();


// load Music Score
function loadImage(event) {
    clearImage();
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    console.dir(file);
    image.src = url;
    image.onload = function () {

        // set image size
        let imageHeight = (canvas.height - 220) * 95 / 100;
        let imageWidth = image.width * imageHeight / image.height;

        if (imageWidth > canvas.width * 95 / 100) {
            imageWidth = canvas.width * 95 / 100;
            imageHeight = image.height * imageWidth / image.width;
        }

        ctx.drawImage(image, (canvas.width - imageWidth) / 2, (220 + canvas.height - imageHeight) / 2, imageWidth, imageHeight);
    };
};

function clearImage() {
    ctx.fillRect(0, 230, canvas.width, canvas.height)
}

imageInput.addEventListener('change', loadImage);


// Draw Flag
let dragok = false;
let startX;
let startY;

canvasFlag.addEventListener('mousedown', myDown);
canvasFlag.addEventListener('mouseup', myUp);
canvasFlag.addEventListener('mousemove', myMove);

const shapes = [];

const infoFlag = document.getElementById('info_flag');
const infoText = document.getElementById('info_text');
const keyboard = document.querySelector('#keyboard');

function onFlagClick() {
    infoFlag.textContent = '생성중 . . .';
    infoText.textContent = 'New Text';
    keyboard.disabled = false;
    keyboard.focus();
    keyboard.placeholder = 'Flag의 이름을 입력해주세요. 예시 : I, A, B, C ...';
    i = 4;
}

function deleteAll() {
    infoFlag.textContent = 'New Flag';
    clearCanvasFlag();
    if (i == 4) {
        keyboard.disabled = true;
        keyboard.placeholder = 'Sofo - 찬양팀 세션을 위한 악보편집 서비스';
    }
}

function createFlag(nameFlag) {
    shapes.push({ x: 120, y: 1600, r: 26, strokeStyle: "black", fillStyle: "white", name: nameFlag, isDragging: false });
}

function circle(c) {
    ctxFlag.save();
    ctxFlag.beginPath();
    // outline
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
    ctxFlag.fillText(c.name, c.x, c.y + c.r * 1 / Math.PI + 2);
    ctxFlag.restore();
}

function clearCanvasFlag() {
    ctxFlag.clearRect(0, 0, canvasFlag.width, canvasFlag.height);
}

function draw() {
    clearCanvasFlag();
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
    for (let i = shapes.length - 1; i >= 0; i--) {
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
function onTextClick() {
    infoText.textContent = '입력중 . . .';
    infoFlag.textContent = 'New Flag';
    drawTextArea();
    keyboard.disabled = false;
    keyboard.focus();
    i = 0;
    keyboard.placeholder = hintText[i];
}

function drawText() {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '42px Arial';
    ctx.fillText(dictText[0], 197, 135);
    ctx.font = '30px Arial';
    ctx.fillText('tempo = ' + dictText[1], 197, 200);
    ctx.font = '40px Arial';
    ctx.fillText(dictText[2], 651, 165);
    ctx.restore();
}

const hintText = ['곡 순서와 Key를 입력해주세요. 예시 : 1.E',
    '곡의 템포를 입력해주세요. 예시 : 120',
    'SongForm 을 입력해 주세요. 예시 : AABCABCC-rit'];
const dictText = {}

function enterkey() {
    if (window.event.keyCode == 13) {
        // 엔터키가 눌렸을 때
        if (i < 3) {
            dictText[i] = keyboard.value;
            i++;
            keyboard.placeholder = hintText[i];
        }

        if (i == 3) {
            infoText.textContent = 'New Text';
            drawText();
            keyboard.disabled = true;
            keyboard.placeholder = 'Sofo - 찬양팀 세션을 위한 악보편집 서비스';
        }

        if (i == 4) {
            if (keyboard.value != '') {
                createFlag(keyboard.value);
                draw();
                i++;
            }
            infoFlag.textContent = 'New Flag';
            keyboard.disabled = true;
            keyboard.placeholder = 'Sofo - 찬양팀 세션을 위한 악보편집 서비스';
        }
        keyboard.value = ''
    }
}

const canvasSubmit = document.getElementById('canvasSubmit');
ctxSubmit = canvasSubmit.getContext('2d')
canvasSubmit.width = 1190;
canvasSubmit.height = 1684;

// Combine Canvas
function combineCanvas() {
    ctxSubmit.drawImage(canvas, 0, 0);
    ctxSubmit.drawImage(canvasFlag, 0, 0);
}

// modal page
function fullScreen() {
    combineCanvas();
    const modal = document.querySelector('#modal');

    const url = canvasSubmit.toDataURL();
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
    combineCanvas();
    const url = canvasSubmit.toDataURL();
    const Fullscreen = document.querySelector("#canvasFullscreen");
    Fullscreen.src = url;
    const a = document.createElement("a");
    a.href = url;
    a.download = "musicScore.png";
    a.click();
    document.body.removeChild(a);
}