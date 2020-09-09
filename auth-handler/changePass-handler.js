const changePassEndpoint = "http://68.183.105.196:8080/api/users/changePassword?access_token="
const $changePassForm = document.getElementById('changePass-form')
const errorHeading = document.getElementById('error-heading')

const afterAjax = (obj) => {


    if (obj.passwordChanged) {
        $changePassForm.style.display = "none"
        const heading = document.querySelector('.form-container>h1')
        heading.style.color = "#0266ff"
        setTimeout(() => {
            window.location.href = "../index.html"
        }, 2000)
        heading.style.fontSize = "30px"
        heading.style.paddingTop = "100px"
        heading.innerHTML = obj.message
    } else {
        errorHeading.innerHTML = obj.message
        errorHeading.style.visibility = "visible"
    }



}


const createReq = async(url, data) => {
    document.getElementById('l-loader').style.display = "inline-block"
    errorHeading.style.visibility = "hidden"

    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    })
    const res_data = await res.json()
        // console.log(res_data);
    document.getElementById('l-loader').style.display = "none"

    if (!res_data.error) {
        afterAjax(res_data)

    } else {
        alert('ERROR OCCURED PLEASE LOGIN AGAIN')

    }
}


$changePassForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target.elements
    const newPassword = form.newPassword.value
    const isValid = validatePassword(newPassword)
        // console.log(isValid);
    if (isValid) {
        var creds = {
            currentPassword: form.currentPassword.value,
            newPassword: form.newPassword.value,
            newPasswordConfirm: form.newPasswordConfirm.value
        }
        creds = JSON.stringify(creds)
        const token = getCookie('access_token')
        errorHeading.style.visibility = "hidden"
        createReq(changePassEndpoint + token, creds)
    } else {
        errorHeading.innerHTML = "Passwords must contain at least 8 characters, including uppercase, lowercase letters,  numbers and special characters."
        errorHeading.style.visibility = "visible"
    }

})

const getCookie = (key) => {
    const tokenFromStorage = localStorage.getItem('access_token')
    var name = key + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return tokenFromStorage;
}


function validatePassword(str) {
    var result;
    if (str.match(/[a-z]/g) && str.match(
            /[A-Z]/g) && str.match(
            /[0-9]/g) && str.match(
            /[^a-zA-Z\d]/g) && str.length >= 8) {
        result = true;
    } else {
        result = false;
    }
    return result
}