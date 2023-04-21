function setCanvas() {

    // basic setting
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 508;
    canvas.height = 719;

    // draw text area in canvas
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.strokeRect(38, 43, 431, 66);
    ctx.moveTo(38, 76);
    ctx.lineTo(127, 76);
    ctx.moveTo(127, 43);
    ctx.lineTo(127, 109);
    ctx.stroke();
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
uploadImage();
setCanvas();