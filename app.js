let form = document.getElementById('form');
let popup = document.getElementById('popup');
let popup_image = document.getElementById('popup_image');

emailjs.init("CPyUyvvACKP5yraVL");

// отправка

// функция очистки
function cleanForm() {
    // загоняем все поля в переменную
    let clean = document.querySelectorAll('.clean');
    //циклом проходимся по ним и обнуляем значение
    for (let item of clean) {
        item.value = '';
    }
}

    form.addEventListener('submit', function (event) {
        // запрещаем стандартное действие
        event.preventDefault();
        // создаем объект новый
        let data = new FormData(form);
        var templateParams = {
            from_name: data.get('from_name'),
            from_email: data.get('from_email'),
            message: data.get('message')
        };
        emailjs.send('service_qnfuj4r', 'template_jbs9mzn', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
        cleanForm();

    })

let isHidden = true;
function ShowImagePopup(image) {
    popup_image.src = image;
    popup.style = isHidden ? "visibility:visible;" :"visibility:hidden;"
    isHidden = !isHidden;
}

function HidePopup() {
    popup.style = "visibility:hidden;"
    isHidden = true;
}

function RunToDoApp() {
    window.open('./todo/index.html', '_blank', 'location=yes,scrollbars=yes,status=yes');
}

function RunCalcApp() {
    window.open('./calc/index.html', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
}

function RunSstApp() {
    params = [
        'height=' + screen.height,
        'width=' + screen.width,
        'location=yes',
        'scrollbars=yes',
        'status=yes',
        'fullscreen=yes' // only works in IE, but here for completeness
    ].join(',');
    window.open('./sst/index1.html', '_blank');
}
