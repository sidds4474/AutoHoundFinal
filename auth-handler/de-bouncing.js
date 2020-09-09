const obdiiSearchEndpoint = "http://68.183.105.196:8080/api/searchOBDII?access_token="

const createSearchReq = async(url, data) => {
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
    console.log(res_data);
    const arr = res_data.obdiiOptions.slice(0, 31)
    const c = btnDivContentCreatorCross('obdiiissues-type-btn', arr)
    document.getElementById('obdiiOptions').innerHTML = c
    document.querySelectorAll('.obdiiissues-type-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            const parentDiv = e.target.parentElement
            if (parentDiv.className === "btn-div obdiiissues-type-btn") {
                const isclicked = parentDiv.getAttribute('data-isclicked')
                if (isclicked === "no") {
                    parentDiv.style.backgroundColor = "#E73E3E"
                    parentDiv.style.color = "white"
                    parentDiv.children[0].style.display = "none"
                    parentDiv.children[1].style.display = "inline"
                    userData.CONDITION['OBDII Issues'].push(parentDiv.children[2].innerHTML)
                    parentDiv.setAttribute("data-isclicked", "yes");
                } else {
                    parentDiv.style.backgroundColor = "#EAEAEA"
                    parentDiv.style.color = "black"
                    parentDiv.children[0].style.display = "inline"
                    parentDiv.children[1].style.display = "none"
                    userData.CONDITION['OBDII Issues'].remove(parentDiv.children[2].innerHTML)
                    parentDiv.setAttribute("data-isclicked", "no");
                }

            }
        })
    })
}



const dothis = () => {
    const queryVal = document.getElementById('obdii-searchbar').value
    const token = getCookieFilterHandler('access_token')
    let bdy = {
        query: queryVal
    }
    bdy = JSON.stringify(bdy)
    createSearchReq(obdiiSearchEndpoint + token, bdy)
}
let interval;
const dbQuery = () => {
    clearInterval(interval)
    interval = setTimeout(dothis, 300)
}