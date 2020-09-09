const $loginForm = document.querySelector('#login-form')
const $authUsername = auth.username
const $authPassword = auth.password
const loginEndpoint = "http://68.183.105.196:8080/oauth/token"
const errorHeading = document.getElementById('error-heading')



const afterEndpointRes = (res, username) => {
    console.log(res);
    if (res.access_token) {
        setCookie('access_token', res.access_token, 30) //expires in 30 days
            // alert('Success \n Welcome ' + username)
        window.location.href = "../index.html"

    } else {
        errorHeading.innerHTML = "Incorrect Username or Password"
        errorHeading.style.visibility = "visible"
    }
}


const transformUrlEncoded = (obj) => {
    var arr = []
    for (var p in obj)
        arr.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    return arr.join("&")
}


const createReq = async(url, data, authHeader, username) => {
    document.getElementById('l-loader').style.display = "inline-block"
    errorHeading.style.visibility = "hidden"
        // console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    })
    const res_data = await res.json()
    document.getElementById('l-loader').style.display = "none"

    afterEndpointRes(res_data, username)
}


$loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const $email = e.target.elements.email.value
    const $password = e.target.elements.password.value
    const creds = {
        username: $email,
        grant_type: 'password',
        password: $password
    }
    const authHeader = 'Basic ' + window.btoa($authUsername + ":" + $authPassword)
    const data = transformUrlEncoded(creds)
    createReq(loginEndpoint, data, authHeader, creds.username)

})


const setCookie = (key, value, exdays) => {
    localStorage.setItem(key, value)
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = key + "=" + value + ";path=/"
    document.cookie = expires + ";path=/"
}