// basic setting
const canvas = document.getElementById('canvasMain');
const ctx = canvas.getContext('2d');
canvas.width = 1190;
canvas.height = 1684;

const image = new Image();
image.src = '../Sofo/Assets/sheetSlogan.png';
image.onload = function () {
    ctx.drawImage(image, 0, 0);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.moveTo(86, 166);
    ctx.lineTo(1104, 166);
    ctx.stroke();
    ctx.fillStyle = '#888888';
    ctx.textAlign = 'center';
    ctx.font = 'bold 26px Arial';
    ctx.fillText('4 - A - B - 2 - A\' - B - B - B - rit엔딩', 595, 150);
}




const canvasFlag = document.getElementById("canvasFlag");
const ctxFlag = canvasFlag.getContext('2d');
canvasFlag.width = 1190;
canvasFlag.height = 1684;
canvasFlag.backScreen = 'transparent';


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
