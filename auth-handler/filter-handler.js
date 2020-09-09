const listFiltersEndpoint = "http://68.183.105.196:8080/api/listFilters?access_token="
const cloneFilterEndpoint = "http://68.183.105.196:8080/api/cloneFilter?access_token="
const deleteFilterEndpoint = "http://68.183.105.196:8080/api/deleteFilter?access_token="
const toggleFilterEndpoint = "http://68.183.105.196:8080/api/toggleFilter?access_token="
const fetchFilterEndpoint = "http://68.183.105.196:8080/api/fetchFilter?access_token="

const getCookieFilterHandler = (key) => {
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
const insertFilters = (res_data) => {
    document.getElementById('filter-data-section-mobile').innerHTML = ""
    document.getElementById('table-filter').innerHTML = ""
    if (res_data.message === "Success") {
        const filters = res_data.listFilters
        numberOfFilters = filters.length
        let initNum = 1
            // filters.reverse()
        filters.forEach((filterele) => {
            var f = {}
            f.filterId = filterele.id
            f.filterNumber = initNum
            f.filterName = filterele.filterName
            if (filterele.active) {
                f.isActive = "flex"
                f.isInactive = "none"
            } else {
                f.isActive = "none"
                f.isInactive = "flex"
            }
            addingNewFilter(f)
            initNum = initNum + 1
        })
    }
    duplicatiteFilterEvent()
    addEventListenerToDelete()
        // deleteFilterEvent()
    toggleFilterEvent()
    editFilterEvent()
}
const createReqFilterHandler = async(url) => {
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

        insertFilters(res_data)
    } else {
        // alert('ERROR OCCURED PLEASE LOGIN AGAIN')
        window.location.href = "../logindir/login.html"

    }
}
const getFiltersList = () => {
    const token = getCookieFilterHandler('access_token')
    createReqFilterHandler(listFiltersEndpoint + token)
}
const createReqCloneDelete = async(url, data) => {
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
    console.log(res_data);
    if (res_data.success) {
        getFiltersList()
    }

}
const duplicatiteFilterEvent = () => {
    const btns = document.querySelectorAll('.duplicate-tag-btn')
        // console.log(btns);
    btns.forEach((btn) => {
        const node = btn.parentNode.parentNode
        let id = node.getAttribute('data-id')
        if (!id) {
            id = node.parentNode.getAttribute('data-id')
        }
        btn.addEventListener('click', () => {
            let formData = {
                filterId: id
            }
            formData = transformUrlEncoded(formData)
            const token = getCookieFilterHandler('access_token')
            createReqCloneDelete(cloneFilterEndpoint + token, formData)
            numberOfFilters += 1

        })

    })
}
const deleteFilterEvent = (id) => {
    // const btns = document.querySelectorAll('.delete-tag-btn')
    // console.log(btn);
    // btns.forEach((btn) => {
    // const node = btn.parentNode.parentNode
    // let id = node.getAttribute('data-id')
    // if (!id) {
    // id = node.parentNode.getAttribute('data-id')
    // }
    // btn.addEventListener('click', () => {
    let formData = {
        filterId: id
    }
    formData = transformUrlEncoded(formData)
    const token = getCookieFilterHandler('access_token')
    createReqCloneDelete(deleteFilterEndpoint + token, formData)
    closeModal()
    numberOfFilters -= 1

    // })

    // })
}
const editFilterEvent = () => {
    const btns = document.querySelectorAll('.edit-tag-btn')
        // console.log(btns);
    btns.forEach((btn) => {
        const node = btn.parentNode.parentNode
        let id = node.getAttribute('data-id')
        if (!id) {
            id = node.parentNode.getAttribute('data-id')
        }
        btn.addEventListener('click', () => {
            let url = window.location.origin
            url = url + '/filter-management-folders/filter-page.html?filterId=' + id
                // console.log(url);
            window.location.href = url


        })

    })
}

const toggleFilterEvent = () => {
    const btns = document.querySelectorAll('.activeFilter')
        // console.log(btns);
    btns.forEach((btn) => {
        const isActive = btn.id
        let toggledValue = ""
        if (isActive === "isfilteractive") {
            toggledValue = "false"
        }
        if (isActive === "isfilterinactive") {
            toggledValue = "true"
        }
        const node = btn.parentNode.parentNode
        let id = node.getAttribute('data-id')
        if (!id) {
            id = node.parentNode.getAttribute('data-id')
        }

        btn.addEventListener('click', () => {
            let formData = {
                filterId: id,
                active: toggledValue
            }
            formData = transformUrlEncoded(formData)

            const token = getCookieFilterHandler('access_token')
            createReqCloneDelete(toggleFilterEndpoint + token, formData)

        })

    })
}

const addEventListenerToDelete = () => {
        const btns = document.querySelectorAll('.delete-tag-btn')
        btns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                btn = e.target
                const node = btn.parentNode.parentNode
                let id = node.getAttribute('data-id')
                if (!id) {
                    id = node.parentNode.getAttribute('data-id')
                }
                deleteFilterModal(id)
            })
        })

    }
    //filter handler this part is crucial , hard to do and important

// const fetchFilterDataById = (id) => {
//     const token = getCookieFilterHandler('access_token')
//     let fData = {
//         filterId: id
//     }
//     fData = transformUrlEncoded(fData)
//     createReqCloneDelete(fetchFilterEndpoint + token, fData)

// }