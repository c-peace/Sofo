class Source {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
}


// basic setting
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('upload');
canvas.width = 1190;
canvas.height = 1684;


// draw text area in canvas
ctx.fillStyle = "white"; // 색상명
ctx.fillRect(0, 0, 1190, 1684);
function drawTextArea() {
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
    infoImage.textContent = file.name;
    // file input disable시키기
    imageInput.disabled = true;

};

imageInput.addEventListener('change', loadImage);

// keyboard
let i = 0;
const infoText = document.getElementById('info_text');
const keyboard = document.querySelector('#keyboard');
function onTextClick() {
    infoText.textContent = '입력중 . . .';
    drawTextArea();
    keyboard.disabled = false;
    keyboard.placeholder = 'Typing... Enter!';
    i = 0;
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
            keyboard.disabled = true;
            keyboard.placeholder = 'Sofo - 찬양팀 세션을 위한 악보편집 서비스';
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