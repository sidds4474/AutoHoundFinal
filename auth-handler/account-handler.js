const accountDetailsEndpoint = "http://68.183.105.196:8080/api/users/myAccount?access_token="

const getCookieAcc = (key) => {
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

const createReqAcc = async(url) => {
    const res = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
    const res_data = await res.json()
    console.log(res_data);
    if (!res_data.error) {
        insertDetails(res_data)
        document.querySelector('html').style.display = "inherit"
    } else {
        // alert('ERROR OCCURED PLEASE LOGIN AGAIN')
        window.location.href = "../logindir/login.html"

    }

}

const getAccountDetails = () => {
    const token = getCookieAcc('access_token')
    createReqAcc(accountDetailsEndpoint + token)
}