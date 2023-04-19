function uploadImage() {

    const element = document.querySelector('#upload');

    element.addEventListener('change', (event) => {
        const target = event.target;
        const files = target.files;
        const file = files[0]

        const test = document.getElementById('info_img');
        test.textContent = file.name;
    });

}

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

const element = document.querySelector('#upload');

element.addEventListener('change', (event) => {
    const target = event.target;
    const files = target.files;
    const file = files[0]

    const test = document.getElementById('info_img');
    test.textContent = file.name;
});