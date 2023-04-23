function setCanvas() {
}



function uploadImage() {

    // Image Box에 파일 이름을 업로드 하는 기능
    const element = document.querySelector('#upload');

    element.addEventListener('change', (event) => {
        const target = event.target;
        const files = target.files;
        const file = files[0]

        const test = document.getElementById('info_img');
        test.textContent = file.name;
        // file input disable시키기
        element.disabled = true;
    });
}

// image 삭제시 이미지 삭제

// image 삭제시 disable -> able로 변경


function sizeImage() {

}

function addFlag() {

}

function sizeFlag() {

}

function addText() {

}


class Source {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
}


// test code

// basic setting
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('upload');
canvas.width = 1190;
canvas.height = 1684;


// draw text area in canvas
ctx.fillStyle = "white"; // 색상명
ctx.fillRect(0, 0, 1190, 1684);
ctx.strokeStyle = "#000000";
ctx.lineWidth = 3;
ctx.strokeRect(94, 80, 1002, 140);
ctx.moveTo(94, 155);
ctx.lineTo(300, 155);
ctx.moveTo(300, 80);
ctx.lineTo(300, 220);
ctx.stroke();

const imageRange = document.querySelector('#range_image');
let imageRangeValue = 1;

imageRange.addEventListener('change', (event) => {
    imageRangeValue = event.target.value;
    console.log(imageRangeValue);

});

function loadImage(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    console.dir(file);
    image.src = url;
    image.onload = function () {
        const imageHeight = image.height;
        const imageWidth = image.width;
        ctx.drawImage(image, (canvas.width - imageWidth) / 2, (220 + canvas.height - imageHeight) / 2, imageWidth, imageHeight);
    };

    const test = document.getElementById('info_img');
    test.textContent = file.name;
    // file input disable시키기
    imageInput.disabled = true;

};

imageInput.addEventListener('change', loadImage);

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

function onSaveClick() {
    const url = canvas.toDataURL();
    console.dir(url);
    const Fullscreen = document.querySelector("#canvasFullscreen");
    Fullscreen.src = url;
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}