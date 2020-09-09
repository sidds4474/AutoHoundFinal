const getAuctionEndpoint = "http://68.183.105.196:8080/api/getAuctions?access_token="
const filterDataSection = document.getElementById('filter-data-section')
const filterSectionFooter = document.getElementById('filter-section-footer')
const filterDataSectionMobile = document.getElementById('filter-data-section-mobile')
const pushAuctionData = (res_data) => {
    document.getElementById('pages').innerHTML = '<div id="page1" class="table-list"></div>'
    document.getElementById('list-data-section-mobile').innerHTML = ""
    pageArr = ['page1']
    currentPages = 1
    setTimeout(function() { console.log('Auction Fetching completed'); }, 1);
    if (res_data.message === "Success" || res_data.auctions.length > 0) {
        const arr = res_data.auctions
        arr.reverse()
        arr.forEach((info) => {
            addingNewRowInList(info)
        })
        document.querySelector('#listing-num').innerHTML = arr.length
        document.querySelector('#listing-num-div').style.display = "inline"
        document.querySelector('#listing-error-messages').style.display = "none"
        document.querySelector('#listing-error-messages-div').innerHTML = res_data.message
        document.querySelector('#list-data-section').style.display = "inherit"
        document.querySelector('#list-data-section-mobile').style.visibility = "visible"
        if (res_data.auctions.length <= 25) {
            document.querySelector('#list-section-footer').style.display = "none"
        }
        document.getElementById('auction-loader').style.visibility = "visible"
        document.getElementById('auction-loader').style.display = "none"
        filterDataSection.style.display = "inherit"
        filterSectionFooter.style.display = "flex"
        filterDataSectionMobile.style.visibility = "visible"
        loadCardsPhone()
        seeMoreEventListener()

    } else if (res_data.auctions.length === 0) {
        document.querySelector('#listing-num').innerHTML = 0
        document.querySelector('#listing-error-messages').style.display = "flex"
        document.querySelector('#listing-error-messages-div').innerHTML = res_data.message
        document.querySelector('#list-data-section').style.display = "none"
        document.querySelector('#list-section-footer').style.display = "none"
        document.getElementById('auction-loader').style.visibility = "visible"
        document.getElementById('auction-loader').style.display = "none"
        filterDataSection.style.display = "inherit"
        filterSectionFooter.style.display = "flex"
        filterDataSectionMobile.style.visibility = "visible"

    } else {
        document.getElementById('auction-loader').style.visibility = "visible"
        document.getElementById('auction-loader').style.display = "none"
        filterDataSection.style.display = "inherit"
        filterSectionFooter.style.display = "flex"
        filterDataSectionMobile.style.visibility = "visible"
        alert('500 BAD SERVER CODE')
    }

}


const getCookieAuc = (key) => {
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
const transformUrlEncoded = (obj) => {
    var arr = []
    for (var p in obj)
        arr.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    return arr.join("&")
}


const createReqAuction = async(url) => {
    document.querySelector('#listing-error-messages').style.display = "none"
    document.querySelector('#listing-num-div').style.display = "none"
    document.querySelector('#list-data-section').style.display = "none"
    document.querySelector('#list-data-section-mobile').style.visibility = "hidden"
    document.querySelector('#list-section-footer').style.display = "none"
    setTimeout(function() { console.log('Auction Fetching Initiated'); }, 1);
    document.getElementById('auction-loader').style.display = "block"
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
    document.querySelector('#list-data-section').style.display = "inherit"
    document.querySelector('#list-section-footer').style.display = "flex"
    document.querySelector('#listing-num-div').style.display = "inline"

    if (!res_data.error) {
        pushAuctionData(res_data)
    } else {
        console.log('some error occured login again')
        window.location.href = "./logindir/login.html"

    }
}

const getAuctionData = () => {
    phoneLoadedCardsLastIndex = 0
    loadedPages = [1]
    document.getElementById('auction-loader').style.visibility = "visible"
    const token = getCookieAuc('access_token')
    createReqAuction(getAuctionEndpoint + token)
}
const getAuctionDataAuto = () => {
    phoneLoadedCardsLastIndex = 0
    loadedPages = [1]
    const token = getCookieAuc('access_token')
    createReqAuction(getAuctionEndpoint + token)
}

setInterval(() => {
    document.getElementById('auction-loader').style.visibility = "hidden"
    getAuctionDataAuto()
}, 120000);