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
ctx.strokeStyle = "#000000";
ctx.lineWidth = 3;
ctx.strokeRect(94, 80, 1002, 142);
ctx.moveTo(94, 155);
ctx.lineTo(300, 155);
ctx.moveTo(300, 80);
ctx.lineTo(300, 220);
ctx.stroke();

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    console.dir(file);
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, (canvas.width - image.width) / 2, (canvas.height - image.height) / 2, image.width, image.height);
    };

    const test = document.getElementById('info_img');
    test.textContent = file.name;
    // file input disable시키기
    imageInput.disabled = true;
});