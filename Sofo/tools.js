const canvas = document.getElementById('canvasMain');
const ctx = canvas.getContext('2d');
canvas.width = 1190;
canvas.height = 1684;

const imageInput = document.getElementById('upload');

function startForm() {
    const image = new Image();
    image.src = '../Sofo/Assets/Sofo_Score.png';
    image.onload = function () {
        ctx.drawImage(image, 0, 0);
        // ctx.font = 'bold 21px Times';
        // ctx.fillText('SongForm', 90, 154);
        
        // ctx.textAlign = 'center';
        // ctx.strokeStyle = "#000000";
        // ctx.fillStyle = '#EAEAEA';
        // ctx.roundRect(56, 40, 384, 50, 8);
        // ctx.fill();
        // ctx.font = 'bold 24px Times';
        // ctx.fillStyle = '#000000';
        // ctx.fillText('Num : 1    Key : E    Tempo = 000', 248, 73);

    }
}
startForm();

function reset() {
    startForm();
    imageInput.value = '';
    resetFlag();
}

// Info Sheet
function drawInfoSheet(value) {
    ctx.fillStyle = 'white';
    ctx.fillRect(800,40,1134,73);
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'right';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(value, 1134, 73);
}

function inputInfoSheet() {
    let today = new Date();
    let info = prompt("악보 정보를 입력하세요.",today.toLocaleDateString());
    if (info != null) {
        drawInfoSheet(info);
    }

}

// load Music Score
function loadImage(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    console.dir(file);
    image.src = url;
    image.onload = function () {
        clearImage();
        // set image size
        let imageHeight = (canvas.height - 166) * 98 / 100;
        let imageWidth = image.width * imageHeight / image.height;

        if (imageWidth > canvas.width * 98 / 100) {
            imageWidth = canvas.width * 98 / 100;
            imageHeight = image.height * imageWidth / image.width;
        }

        ctx.drawImage(image, (canvas.width - imageWidth) / 2, (166 + canvas.height - imageHeight) / 2, imageWidth, imageHeight);
    };
};

function clearImage() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 170, canvas.width, canvas.height)
}

imageInput.addEventListener('change', loadImage);


// Draw Flag
const canvasFlag = document.getElementById("canvasFlag");
const ctxFlag = canvasFlag.getContext('2d');
canvasFlag.width = 1190;
canvasFlag.height = 1684;
canvasFlag.backScreen = 'transparent';

let dragok = false;
let startX;
let startY;

canvasFlag.addEventListener('mousedown', myDown);
canvasFlag.addEventListener('mouseup', myUp);
canvasFlag.addEventListener('mousemove', myMove);

const shapes = [];


function resetFlag() {
    clearCanvasFlag();
    shapes.length = 0;
}

function clearCanvasFlag() {
    ctxFlag.clearRect(0, 0, canvasFlag.width, canvasFlag.height);
}

function createFlag(name) {
    if (name != 'Flag') {
        shapes.push({ x: Math.floor(Math.random() * 951) + 120, y: Math.floor(Math.random() * 100) + 1500, 
            width: 54, height: 54, strokeStyle: "red", fillStyle: "white", name: name, isDragging: false });
        draw();
        document.querySelector('select').value = 'flag';
    }
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
    const mx = (e.offsetX / ((window.innerHeight * 595) / 969)) * canvasFlag.width;
    const my = (e.offsetY / ((window.innerHeight * 842) / 969)) * canvasFlag.height;

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
        const mx = (e.offsetX / ((window.innerHeight * 595) / 969)) * canvasFlag.width;
        const my = (e.offsetY / ((window.innerHeight * 842) / 969)) * canvasFlag.height;

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



// sheetSlide 안에는 이미지 파일들을 저장해 두는 것으로 설계를 한다.
const sheetSlide = [];

const a = document.createElement('p');
  a.innerHTML = '안녕';
  document.querySelector('#toolbox').appendChild(a);

function addSlide(source) {
    sheetSlide.push({
        img: source
    })
}


// AREA --- canvasSubmit ---
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


// btn Box url
function btn_home() {
    window.open('https://chrome-comte-f84.notion.site/Sofo-addef1adf0f0467fb5d56046929a4f46');
}

function btn_sample() {
    window.open('https://chrome-comte-f84.notion.site/Sofo-Sample-0db933d61f64495590bb3e80c7cd3960');
}

function btn_feedback() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSegiRFCoM7ZomJR2cIKwV1h_4cxyggZgjNm6Y59r9K8qtfl5A/viewform?usp=sf_link');
}
