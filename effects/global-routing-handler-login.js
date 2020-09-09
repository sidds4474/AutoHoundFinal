const ValidationEndpoint = "http://68.183.105.196:8080/api/validateToken"
const getCookieGlobalHandler = (key) => {
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

const transformUrlEncodedRoutingHandler = (obj) => {
    var arr = []
    for (var p in obj)
        arr.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    return arr.join("&")
}

const clearCookiesGlobalHandler = (key, value) => {
    document.cookie = key + "=" + value + ";path=/"
    document.cookie = 'expires' + "=" + "" + ";path=/"
    localStorage.removeItem('access_token')

}

const createReqValidation = async(url, data) => {
    // console.log(data);
    const res = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data
    })
    const res_data = await res.json()
    const isTokenValid = res_data.tokenValidity;
    console.log(isTokenValid);

    if (!isTokenValid) {
        // alert('FALSE SESSIONS DETECTED PLEASE LOGIN AGAIN')
        clearCookiesGlobalHandler('access_token', "")
        window.location.href = "../logindir/login.html"
    } else {
        window.location.href = "../index.html"

    }

}

const cookie = getCookieGlobalHandler('access_token')

if (cookie === "" || !cookie) {
    console.log(cookie)
    console.log('no session');
} else {
    console.log(cookie);
    const keyPair = {
        storedToken: cookie
    }
    const data = transformUrlEncodedRoutingHandler(keyPair)
        // alert(data)
    createReqValidation(ValidationEndpoint, data)
}