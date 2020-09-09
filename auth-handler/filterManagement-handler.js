const fetchFilterEndpoint = "http://68.183.105.196:8080/api/fetchFilter?access_token="
const getInitDataEndpoint = "http://68.183.105.196:8080/api/fetchFilterOptions?access_token="
const $plusCheckButtonTemplate = document.getElementById('plus-check-type-btn').innerHTML
const $plusCrossButtonTemplate = document.getElementById('plus-cross-type-btn').innerHTML
let clickNotiC = 0


const userDataFilter = {
    AUCTION: {
        'Name': null,
        'Auction / Inspection Type': [],
        'Auction Color': [],
        'Time Remaining': null,
        'Distance': null,
        'States (EXCLUDE)': []
    },
    VEHICLE: {
        'Body Type': [],
        'Drivetrain': [],
        'Transmission': [],
        'Fuel Type': [],
        'Make': [],
        'Reserve Met': [],
        'Model': [],
        'Years': null,
        'Miles / Odometer': null,
        'Max Bid': null,
        'Profit (Minimum)': null
    },
    CONDITION: {
        'ACV Carfax Announcements': [],
        'Driveability Issues': [],
        'Exterior Damage': [],
        'Interior Damage': [],
        'Frame & Unibody Issues': [],
        'Mechanical Issues': [],
        'Warning Lights Issues': [],
        'OBDII Issues': [],
        'Seller Notes': [],
        'Title Issues': [],
        'Wheels & Tires Issues': [],
        'INCLUDE': []
    },
    NOTIFICATION: {
        istrue: null
    }
}
const afterFetchingFilter = (resData) => {
        // console.log(resData);

        if (resData.success) {
            var filterData = resData.filtersResponse
            const keys = Object.keys(filterData)
            const values = Object.values(filterData)
            const numberOfItems = keys.length
            keys.forEach((key, index) => {
                const valueKey = values[index]
                    // console.log(key, valueKey);

                if (key === "filterName") {
                    userDataFilter.AUCTION['Name'] = valueKey
                    userData.AUCTION['Name'] = valueKey
                    document.getElementById('filter-name').value = valueKey
                    return
                }
                if (key === "inspectionTypes") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.AUCTION['Auction / Inspection Type'] = []
                        return
                    }
                    userDataFilter.AUCTION['Auction / Inspection Type'] = valueKey
                    getDataAndBtn('auc-type-btn', valueKey)
                    return
                }
                if (key === "color") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.AUCTION['Auction Color'] = []
                        return
                    }
                    userDataFilter.AUCTION['Auction Color'] = valueKey
                    getDataAndBtn('color-type-btn', valueKey)
                    return
                }
                if (key === "timeRemainingMax") {
                    let data = valueKey
                    if (valueKey === "") {
                        console.log('here');
                        data = "0"
                    }
                    userDataFilter.AUCTION['Time Remaining'] = data
                    document.getElementById('time-slider').value = data
                    singleRangeAdjust(timeSlider, timeSliderrange, timeSliderthumb)
                    timeVal.innerHTML = data
                    userData.AUCTION['Time Remaining'] = valueKey + " Minutes"
                    return
                }
                if (key === "maxDistance") {
                    let data = valueKey
                    if (valueKey === "") {
                        console.log('here');
                        data = "0"
                    }
                    userDataFilter.AUCTION['Distance'] = data
                    const v = arrayOfDistanceValues.indexOf(data)
                    console.log(v);
                    document.getElementById('distance-slider').value = v + 1
                    singleRangeAdjust(disSlider, disSliderrange, disSliderthumb)
                    disVal.innerHTML = numberWithCommas(data)
                    userData.AUCTION['Distance'] = numberWithCommas(data + ' Miles')
                    return
                }
                if (key === "state") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.AUCTION['States (EXCLUDE)'] = []
                        return
                    }
                    userDataFilter.AUCTION['States (EXCLUDE)'] = valueKey
                    getDataAndBtn('states-exclude-btn', valueKey)
                    return
                }
                if (key === "bodyTypes") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.VEHICLE['Body Type'] = []
                        return
                    }
                    userDataFilter.VEHICLE['Body Type'] = valueKey
                    getDataAndBtn('body-type-btn', valueKey)
                    return
                }
                if (key === "drivetrains") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.VEHICLE['Drivetrain'] = []
                        return
                    }
                    userDataFilter.VEHICLE['Drivetrain'] = valueKey
                    getDataAndBtn('drivertrain-type-btn', valueKey)
                    return
                }
                if (key === "transmissions") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.VEHICLE['Transmission'] = []
                        return
                    }
                    userDataFilter.VEHICLE['Transmission'] = valueKey
                    getDataAndBtn('transmission-type-btn', valueKey)
                    return
                }
                if (key === "fuelTypes") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.VEHICLE['Fuel Type'] = []
                        return
                    }
                    userDataFilter.VEHICLE['Fuel Type'] = valueKey
                    getDataAndBtn('fuel-type-btn', valueKey)
                    return
                }
                if (key === "reserveMet") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.VEHICLE['Reserve Met'] = []
                        return
                    }
                    userDataFilter.VEHICLE['Reserve Met'] = valueKey
                    getDataAndBtn('reserve-type-btn', valueKey)
                    return
                }
                if (key === "makes") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.VEHICLE['Make'] = []
                        return
                    }
                    userDataFilter.VEHICLE['Make'] = valueKey
                    getDataAndBtn('make-type-btn', valueKey)
                    return
                }
                if (key === "models") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.VEHICLE['Model'] = []
                        return
                    }
                    userDataFilter.VEHICLE['Model'] = valueKey
                    getDataAndBtn('model-type-btn', valueKey)
                    return
                }
                if (key === "yearMin") {
                    const data = valueKey.toString()
                    console.log(data);

                    userDataFilter.VEHICLE['Years'] = data
                    inputLeftYear.value = data
                    setLeftYearValue()
                    setLeftValue(inputLeftYear, inputRightYear, thumbLeftYear, thumbRightYear, rangeYear)

                    return
                }
                if (key === "yearMax") {
                    const data = valueKey.toString()
                    userDataFilter.VEHICLE['Years'] = data
                    inputRightYear.value = data
                    setRightYearValue()
                    setRightValue(inputLeftYear, inputRightYear, thumbLeftYear, thumbRightYear, rangeYear)
                    return
                }
                if (key === "milesMin") {
                    let data = valueKey
                    if (valueKey === "") {
                        console.log('here');
                        data = "0"
                    }
                    userDataFilter.VEHICLE['Miles / Odometer'] = data
                    inputLeftDis.value = data
                    setLeftDisValue()
                    setLeftValue(inputLeftDis, inputRightDis, thumbLeftDis, thumbRightDis, rangeDis)
                    return
                }
                if (key === "milesMax") {
                    let data = valueKey
                    if (valueKey === "") {
                        console.log('here');
                        data = "100000"
                    }
                    userDataFilter.VEHICLE['Miles / Odometer'] = data
                    inputRightDis.value = data
                    setRightDisValue()
                    setRightValue(inputLeftDis, inputRightDis, thumbLeftDis, thumbRightDis, rangeDis)
                    return
                }
                if (key === "currentBidMax") {
                    let data = valueKey
                    if (valueKey === "") {
                        console.log('here');
                        data = "0"
                    }
                    userDataFilter.VEHICLE['Max Bid'] = data
                    maxbidSlider.value = data
                    setMaxBidData()
                    singleRangeAdjust(maxbidSlider, maxbidSliderrange, maxbidSliderthumb)
                    return
                }
                if (key === "profitMin") {
                    let data = valueKey
                    if (valueKey === "") {
                        console.log('here');
                        data = "0"
                    }
                    userDataFilter.VEHICLE['Profit (Minimum)'] = data
                    profitslider.value = data
                    setProfitData()
                    singleRangeAdjust(profitslider, profitsliderrange, profitsliderthumb)
                    return
                }
                if (key === "includeNADifference") {
                    console.log('fix this');
                    return
                }
                if (key === "excludeFilters") {
                    const k = Object.keys(valueKey)
                    const v = Object.values(valueKey)
                    k.forEach((key, index) => {
                        // console.log(key, v[index]);
                        const data = v[index]
                        if (key === "acvCarFaxAnnouncements") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['ACV Carfax Announcements'] = []
                                return
                            }
                            userDataFilter.CONDITION['ACV Carfax Announcements'] = data
                            getDataAndBtn('announcement-type-btn', data)
                            return
                        }
                        if (key === "driveabilityIssues") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['Driveability Issues'] = []
                                return
                            }
                            userDataFilter.CONDITION['Driveability Issues'] = data
                            getDataAndBtn('driveability-issues-type-btn', data)
                            return
                        }
                        if (key === "exteriorIssues") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['Exterior Damage'] = []
                                return
                            }
                            userDataFilter.CONDITION['Exterior Damage'] = data
                            getDataAndBtn('exdamage-type-btn', data)
                            return
                        }
                        if (key === "interiorIssues") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['Interior Damage'] = []
                                return
                            }
                            userDataFilter.CONDITION['Interior Damage'] = data
                            getDataAndBtn('indamage-type-btn', data)
                            return
                        }
                        if (key === "frameUnibodyIssues") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['Frame & Unibody Issues'] = []
                                return
                            }
                            userDataFilter.CONDITION['Frame & Unibody Issues'] = data
                            getDataAndBtn('framesandunibodyissues-type-btn', data)
                            return
                        }
                        if (key === "mechanicalIssues") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['Mechanical Issues'] = []
                                return
                            }
                            userDataFilter.CONDITION['Mechanical Issues'] = data
                            getDataAndBtn('mechissues-type-btn', data)
                            return
                        }
                        if (key === "warningLightsIssues") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['Warning Lights Issues'] = []
                                return
                            }
                            userDataFilter.CONDITION['Warning Lights Issues'] = data
                            getDataAndBtn('lightissues-type-btn', data)
                            return
                        }
                        if (key === "obdiiCodes") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['OBDII Issues'] = []
                                return
                            }
                            userDataFilter.CONDITION['OBDII Issues'] = data
                            getDataAndBtn('obdiiissues-type-btn', data)
                            return
                        }
                        if (key === "sellerNotes") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['Seller Notes'] = []
                                return
                            }
                            userDataFilter.CONDITION['Seller Notes'] = data
                            getDataAndBtn('sellernotes-type-btn', data)
                            return
                        }
                        if (key === "titleHistoryNotes") {
                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['Title Issues'] = []
                                return
                            }
                            userDataFilter.CONDITION['Title Issues'] = data
                            getDataAndBtn('tittleissues-type-btn', data)
                            return
                        }
                        if (key === "wheelsTiresIssues") {
                            console.log(data);

                            if (data.length == 1 && data[0] === "") {
                                userDataFilter.CONDITION['Wheels & Tires Issues'] = []
                                return
                            }
                            userDataFilter.CONDITION['Wheels & Tires Issues'] = data
                            getDataAndBtn('wheelandtiresissues-type-btn', data)
                            return
                        }
                    })
                }
                if (key === "includeOptions") {
                    if (valueKey.length == 1 && valueKey[0] === "") {
                        userDataFilter.CONDITION['INCLUDE'] = []
                        return
                    }
                    userDataFilter.CONDITION['INCLUDE'] = valueKey
                    getDataAndBtn('include-type-btn', valueKey)
                    return
                }
                if (key === "receiveNotification") {
                    let isIT = ""
                    if (valueKey) {
                        isIT = "Yes"
                        document.getElementById('yes-notify').children[2].click()
                    } else {
                        isIT = "No"
                    }
                    userDataFilter.NOTIFICATION.istrue = isIT
                    userData.NOTIFICATION.istrue = isIT
                    return
                }
            })
        }
        document.querySelector('html').style.display = "initial"

    }
    // userData = userDataFilter

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

const createReqFE = async(url, data) => {
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
    afterFetchingFilter(res_data)

}
const getInitialDataPromise = (url) => {
    return new Promise((res, rej) => {
        const data = getInitialData(url)
        if (data) {
            res(data)
        } else {
            rej('failed to fetch')
        }
    })
}
const getInitialData = async(url) => {
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        const res_data = await res.json()
        if (res_data.status && res_data.message === "Success") {
            return initializeBtns(res_data)
        } else {
            alert('ERROR:CANT FETCH INITIALS')
        }
    }
    //filter handler this part is crucial , hard to do and important

const fetchFilterDataById = async() => {
    let url = window.location.href
    const fData = url.split('?')[1]
    console.log(fData);
    const token = getCookieFilterHandler('access_token')
    if (fData) {
        const data = await getInitialDataPromise(getInitDataEndpoint + token)
        console.log(data);
        createReqFE(fetchFilterEndpoint + token, fData)
    } else {
        const data = await getInitialDataPromise(getInitDataEndpoint + token)
        console.log(data);
        clickNotiC = 1

    }
}
const getDataAndBtn = (clsname, values) => {
    // console.log(values, typeof values);
    clsname = "." + clsname
    const btns = document.querySelectorAll(clsname)
    btns.forEach((btn) => {
        const value = btn.children[2].innerHTML
        const isPresentInd = values.indexOf(value)
        if (isPresentInd != -1) {
            // console.log(isPresentInd, btn);
            btn.children[2].click()
        }
    })
}

const showAllFiltersSeemore = (key) => {
    let childs = document.getElementById(key).children
    childs = [].slice.call(childs)
    childs.forEach((ele) => {
        ele.style.display = "inline-flex"
    })
    childs[childs.length - 1].style.display = "none"
}

const seeMoreMax = 3
const setSeeMoreFiltersAccToSeeMax = (key) => {
    let childs = document.getElementById(key).children
    childs = [].slice.call(childs)
    const al = childs.length
    childs = childs.slice(seeMoreMax, childs.length)
        // console.log(childs);
    childs.forEach((ele) => {
        ele.style.display = "none"
    })
    const diffF = al - seeMoreMax
    const seeMoreHtml = `<span onclick=showAllFiltersSeemore('${key}') class="seeMoreBtn" style="top: 14px;position: relative;color: #0266ff; font-size:12px; margin-left:10px;cursor:pointer; font-weight:bold;">see more(${diffF})</span> `
    return seeMoreHtml

}

const initializeBtns = (data) => {
    const filterOptionObj = data.filterOptions
    console.log(filterOptionObj);
    const keys = Object.keys(filterOptionObj)
    const valuesOfFilter = Object.values(filterOptionObj)
    keys.forEach((key, index) => {
        // console.log(key);
        if (key === "auctionInspectionType") {
            const c = btnDivContentCreatorCheck('auc-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "auctionColor") {
            const c = btnDivContentCreatorCheck('color-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)

            return
        }
        if (key === "states") {
            const c = btnDivContentCreatorCross('states-exclude-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "bodyTypes") {
            const c = btnDivContentCreatorCheck('body-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "drivetrain") {
            const c = btnDivContentCreatorCheck('drivertrain-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "transmission") {
            const c = btnDivContentCreatorCheck('transmission-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "fuelType") {
            const c = btnDivContentCreatorCheck('fuel-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "acvCarfaxAnnouncements") {
            const c = btnDivContentCreatorCross('announcement-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "driveabilityIssues") {
            const c = btnDivContentCreatorCross('driveability-issues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "exteriorDamages") {
            const c = btnDivContentCreatorCross('exdamage-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "interiorDamages") {
            const c = btnDivContentCreatorCross('indamage-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "frameUnibodyIssues") {
            const c = btnDivContentCreatorCross('framesandunibodyissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "mechanicalIssues") {
            const c = btnDivContentCreatorCross('mechissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "warningLightsIssues") {
            const c = btnDivContentCreatorCross('lightissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "sellerNotes") {
            const c = btnDivContentCreatorCross('sellernotes-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            const sm = setSeeMoreFiltersAccToSeeMax(key)
            document.getElementById(key).insertAdjacentHTML('beforeend', sm)
            return
        }
        if (key === "titleIssues") {
            const c = btnDivContentCreatorCross('tittleissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }
        if (key === "wheelsAndTiresIssues") {
            const c = btnDivContentCreatorCross('wheelandtiresissues-type-btn', valuesOfFilter[index])
            document.getElementById(key).innerHTML = c
            return
        }

    })
    initBtnSelection()
    if (!data.smsallowed) {
        console.log('no noti');

        document.getElementById('no-notification').click()
    }
    document.querySelector('html').style.display = "initial"
    return true
}
const popModalOnNoti = () => {
    console.log('clik');
    const btn = document.getElementById('yes-notify')
    const clickData = btn.getAttribute('data-isclicked')
    console.log(clickData);

    if (clickData === "yes") {
        console.log('already notified for sms');
    } else {
        if (clickNotiC >= 1) {
            modalVerifyNumber()
        }
        clickNotiC += 1

    }
}

const btnDivContentCreatorCheck = (classNm, data) => {
    let inHtml = ""
    data.forEach((val) => {
        const content = Mustache.render($plusCheckButtonTemplate, {
            classType: classNm,
            name: val
        })
        inHtml = inHtml + content
    })
    return inHtml
}
const btnDivContentCreatorCross = (classNm, data) => {
    let inHtml = ""
    data.forEach((val) => {
        const content = Mustache.render($plusCrossButtonTemplate, {
            classType: classNm,
            name: val
        })
        inHtml = inHtml + content
    })
    return inHtml
}