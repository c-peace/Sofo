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
uploadImage()