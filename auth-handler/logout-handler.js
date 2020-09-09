const logoutEndpoint = "http://68.183.105.196:8080/api/logout?access_token="

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

const clearCookies = (key, value) => {
    document.cookie = key + "=" + value + ";path=/"
    document.cookie = 'expires' + "=" + "" + ";path=/"
    localStorage.setItem('access_token', '')

}
const logoutSession = () => {
    const token = getCookie('access_token')
    createReq(logoutEndpoint + token, token)

}



const createReq = async(url, data) => {
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
        params: data
    })
    const res_data = await res.json()
    console.log(res_data);
    if (res_data.status_code === 200 || !res_data.error) {
        // alert('logged out')
        clearCookies('access_token', '')
        window.location.href = "../logindir/login.html"
    } else {
        // alert('error please login again')
        window.location.href = "../logindir/login.html"

    }

}