const registrationEndpoint = "http://68.183.105.196:8080/api/users/registration"
const $registrationForm = document.getElementById('registration-form')
const errorHeading = document.getElementById('error-heading')
const afterRgistrationAjax = (obj) => {


    if (obj.registrationSuccessfull) {
        $registrationForm.style.display = "none"
        const heading = document.querySelector('.form-container>h1')
        heading.style.color = "#0266ff"
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
        afterRgistrationAjax(res_data)
    } else {
        errorHeading.innerHTML = "ERROR PLEASE TRY AGAIN"
        errorHeading.style.visibility = "visible"
    }
}


$registrationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target.elements
    const Password = form.password.value
    const cPassword = form.confirmPassword.value
    if (Password != cPassword) {
        errorHeading.innerHTML = "The passwords did not match. Please try entering your passwords again."
        errorHeading.style.visibility = "visible"
        return
    }
    const isValid = validatePassword(Password)
        // console.log(isValid);
    if (isValid) {
        var creds = {
            email: form.email.value,
            password: form.password.value,
            confirmPassword: form.confirmPassword.value,
            dealership: form.dealership.value,
            phoneNumber: form.phoneNum.value
        }
        creds = JSON.stringify(creds)
            // console.log(creds);
        errorHeading.style.visibility = "hidden"
        createReq(registrationEndpoint, creds)
    } else {

        errorHeading.innerHTML = "Passwords must contain at least 8 characters, including uppercase, lowercase letters,  numbers and special characters."
            // setFooter
        errorHeading.style.visibility = "visible"
    }


})

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