// basic setting
const canvas = document.querySelector('#canvasMain');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('upload');
const infoKeyboard = document.getElementById('info_keyboard');
canvas.width = 1190;
canvas.height = 1684;

const canvasFlag = document.getElementById("canvasFlag");
const ctxFlag = canvasFlag.getContext('2d');
canvasFlag.width = 1190;
canvasFlag.height = 1684;
canvas.backScreen = 'transparent';

const keyboard = document.querySelector('#keyboard');

function reset() {
    clearCanvas();
    drawTextArea();
    resetInfo();
    imageInput.value = '';
    resetFlag();
    resetText();
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
    drawTextHint();
}
clearCanvas();
drawTextArea();

function drawTextHint() {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = '#888888';
    ctx.textAlign = 'center';

    ctx.font = '42px Arial';
    ctx.fillText('1. E', 197, 135);
    ctx.font = '30px Arial';
    ctx.fillText('tempo = ' + '000', 197, 200);
    ctx.font = '40px Arial';
    ctx.fillText('AABCABCC - rit', 651, 165);
    ctx.restore();
}

// Draw Info - Music Score
function drawInfoText(_event) {
    clearInfoText();
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.font = '600 26px Arial';
    ctx.fillText(infoKeyboard.value, 96, 66);
    ctx.restore();
}

function clearInfoText() {
    ctx.fillRect(0, 0, 1190, 76);
}

function resetInfo() {
    clearInfoText();
    infoKeyboard.value = '';
}

infoKeyboard.addEventListener('keyup', drawInfoText);


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

function onFlagClick() {
    infoFlag.textContent = '생성중 . . .';
    infoText.textContent = 'New Text';
    keyboard.disabled = false;
    keyboard.focus();
    keyboard.placeholder = 'Flag의 이름을 입력해주세요. 예시 : I, A, B, C ...';
    i = 4;
}

function resetFlag() {
    infoFlag.textContent = 'New Flag';
    keyboard.value = '';
    clearCanvasFlag();
    shapes.length = 0;
    if (i == 4) {
        keyboard.disabled = true;
        keyboard.placeholder = 'Sofo - 찬양팀 세션을 위한 악보편집 서비스';
    }
}

function clearCanvasFlag() {
    ctxFlag.clearRect(0, 0, canvasFlag.width, canvasFlag.height);
}

function createFlag(nameFlag) {
    shapes.push({ x: Math.floor(Math.random() * 951) + 120, y: Math.floor(Math.random() * 100) + 1500, 
        width: 54, height: 54, strokeStyle: "red", fillStyle: "white", name: nameFlag, isDragging: false });
}



function rect(r) {
    ctxFlag.save();
    ctxFlag.beginPath();
    // inner fill
    ctxFlag.fillStyle = r.fillStyle;
    ctxFlag.fillRect(r.x, r.y, r.width, r.height);
    // outline
    ctxFlag.lineWidth = 3;
    ctxFlag.strokeRect(r.x, r.y, r.width, r.height);
    // text
    ctxFlag.textAlign = 'center';
    ctxFlag.fillStyle = r.strokeStyle;
    ctxFlag.font = '40px Arial';
    ctxFlag.fillText(r.name, r.x + 27, r.y + 41);
    ctxFlag.restore();
}

function draw() {
    clearCanvasFlag();
    for (let i = 0; i < shapes.length; i++) {
        rect(shapes[i]);
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

        if (
            !dragok &&
            mx > s.x &&
            mx < s.x + s.width &&
            my > s.y &&
            my < s.y + s.height
          ) {
            // if yes, set that rects isDragging=true
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

function drawText(i, text) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    switch (i) {
        case 0:
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(96, 82, 202, 71);
            ctx.restore();

            ctx.font = '42px Arial';
            ctx.fillText(text, 197, 135);
            break;

        case 1:
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(96, 157, 202, 61);
            ctx.restore();

            ctx.font = '30px Arial';
            ctx.fillText('tempo = ' + text, 197, 200);
            break;

        default:
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(302, 82, 792, 136);
            ctx.restore();

            ctx.font = '40px Arial';
            ctx.fillText(text, 700, 165);
            break;
    }
    ctx.restore();
}

function resetText() {
    infoText.textContent = 'New Text';
    keyboard.value = '';
    keyboard.disabled = true;
    keyboard.placeholder = 'Sofo - 찬양팀 세션을 위한 악보편집 서비스';
}

const hintText = ['곡 순서와 Key를 입력해주세요. 예시 : 1.E',
    '곡의 템포를 입력해주세요. 예시 : 120',
    'SongForm 을 입력해 주세요. 예시 : AABCABCC-rit'];

const dictText = {}

function enterkey() {

    if (i < 4) {
        drawText(i, keyboard.value);
    }

    if (window.event.keyCode == 13) {
        // 엔터키가 눌렸을 때
        if (i < 3) {
            i++;
            keyboard.placeholder = hintText[i];
        }

        if (i == 3) {
            infoText.textContent = 'New Text';
            keyboard.disabled = true;
            keyboard.placeholder = 'Sofo - 찬양팀 세션을 위한 악보편집 서비스';
        }

        if (i == 4) {
            if (keyboard.value != '') {
                if (keyboard.value.length > 2) {
                    alert('Flag는 최대 두 글자까지 가능합니다.')
                } else {
                    createFlag(keyboard.value);
                    draw();
                }
            } else {
                infoFlag.textContent = 'New Flag'
                keyboard.disabled = true;
                keyboard.placeholder = 'Sofo - 찬양팀 세션을 위한 악보편집 서비스';
            }
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
function btn_view() {
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
function btn_save() {
    combineCanvas();
    const url = canvasSubmit.toDataURL();
    const Fullscreen = document.querySelector("#canvasFullscreen");
    Fullscreen.src = url;
    const a = document.createElement("a");
    a.href = url;
    a.download = "Sofo_Score.png";
    a.click();
    document.body.removeChild(a);
}

function btn_help() {
    window.open('https://chrome-comte-f84.notion.site/Sofo-Guide-64a48649ba6143e4ac3766d161796b86');
}

function btn_feedback() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSegiRFCoM7ZomJR2cIKwV1h_4cxyggZgjNm6Y59r9K8qtfl5A/viewform?usp=sf_link');
}