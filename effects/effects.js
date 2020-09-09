const $filtertemplate = document.querySelector("#filter-template").innerHTML
const $rowtemplatelist = document.querySelector("#table-row-template-list").innerHTML
const $rowtemplatelistMobile = document.querySelector("#table-row-template-list-mobile").innerHTML
const $rowtemplatefilter = document.querySelector("#table-row-template-filter").innerHTML
const $rowtemplatefilterMobile = document.querySelector("#table-row-template-filter-mobile").innerHTML
const $tablelist = document.querySelector('#live-listing-table')
const $tablefilter = document.querySelector('#table-filter')
let numberOfFilters = 0
const maxSeeMore = 4
let filternum = 1
let listcounter = 1 //initial one
let colorindex = 0
let colorindexFilter = 0
const arrColor = ["#C094F6", "#4287f5", "#4fdb7e", "#e8b45f", "#fc92f5", "#0266FF"]
const filterColor = ["#C094F6", "#4287f5", "#4fdb7e", "#e8b45f", "#fc92f5", "#0266FF"]
let phoneLoadedCardsLastIndex = 0
const loadCardsPhone = () => {
    phoneLoadedCardsLastIndex = paginationPhone(phoneLoadedCardsLastIndex)
}

const paginationPhone = (v) => {
    const cont = document.getElementById('list-data-section-mobile')
    let children = [].slice.call(cont.children)
    children = children.slice(v, v + 25)
    console.log(children);
    children.forEach((child) => {
        child.style.display = "flex"
    })
    return v + 25
}

var arrayList = []
var loadedPages = [1]
const loadMorePages = () => {

    let lp = loadedPages[loadedPages.length - 1]
    lp = lp + 1
    console.log(lp)
    loadedPages.push(lp)
    pageArr.forEach((pg) => {
        document.getElementById(pg).style.display = "none"
    })
    console.log(loadedPages);

    loadedPages.forEach((page) => {
        console.log(page);
        if (page > pageArr.length) {
            return
        }
        document.getElementById('page' + page).style.display = "flex"
    })
    if (loadedPages.length === pageArr.length) {
        document.querySelector('#list-section-footer').style.display = "none"
    }
}

const pagecreatorPagination = () => {
    currentPages = currentPages + 1
    const table = document.getElementById('page1')
    const page = table.cloneNode(true)
    page.innerHTML = ""
    page.id = "page" + currentPages
    page.style.display = "none"
    lastpageid = page.id
        // console.log(page)
    pageArr.push(lastpageid)
    pagesdiv.insertAdjacentElement('beforeend', page)


}
const rowsinpagePaginationCount = (val) => {
    const table = document.getElementById(val)
    const arrchild = table.children
    var arr = [].slice.call(arrchild);
    // console.log(arr.length);
    return arr.length

}
var pageArr = ['page1']
let currentPages = 1
const rowsperpage = 25
const pagesdiv = document.querySelector('#pages')
const pagination = (prevpage, lastpage) => {
    // console.log('start', prevpage, lastpage);
    const count = rowsinpagePaginationCount('page' + prevpage)
    if (count > rowsperpage) {
        if (!document.getElementById('page' + (prevpage + 1))) {
            pagecreatorPagination()
            lastpage = lastpage + 1
        }
        if (prevpage === lastpage) {
            return true
        }
        changeRow(prevpage, prevpage + 1)
        pagination(prevpage + 1, lastpage)


    } else {
        // console.log('from else-- page pushed');

    }
}
const changeRow = (x, y) => {
    // console.log(x, y, 'fromchange');
    const pagex = document.getElementById('page' + x)
    const pagey = document.getElementById('page' + y)
    const temp = pagex.children[rowsperpage]
    pagex.removeChild(temp)
    pagey.insertAdjacentElement('afterbegin', temp)
}
var isSeeMore = false
const addingNewRowInList = (info) => {
    let filterInLiveListingCount = 0
    const numFilter = info.filtersNames.length
    const diffF = numFilter - maxSeeMore
    if (numFilter > maxSeeMore) {
        isSeeMore = true
    } else {
        isSeeMore = false
    }
    const filterArr = info.filtersNames
    let contentFilter = ""
    filterArr.forEach((filter) => {
        let contentBuff = ""
        console.log(filterInLiveListingCount, maxSeeMore);
        if (filterInLiveListingCount > maxSeeMore - 1) {
            contentBuff = Mustache.render($filtertemplate, {
                tagname: filter,
                bgcolor: arrColor[colorindex],
                isDisplay: "none"
            })
        } else {
            contentBuff = Mustache.render($filtertemplate, {
                tagname: filter,
                bgcolor: arrColor[colorindex]
            })
        }

        if (colorindex >= arrColor.length - 1) {
            colorindex = 0
        }
        filterInLiveListingCount = filterInLiveListingCount + 1
        colorindex = colorindex + 1
        contentFilter = contentFilter + contentBuff

    })
    if (isSeeMore) {
        contentFilter += `<span class="seeMoreBtn" style="top: 4px;position: relative;color: #0266ff; font-size:12px; margin-left:10px;cursor:pointer;">see more(${diffF})</span> `
    }
    const content = Mustache.render($rowtemplatelist, {
        aucid: info.auctionID,
        auclink: info.acvURL,
        vehicle: info.yearMakeModelTrim,
        miles: info.miles,
        rm: info.reserveMet,
        highbid: info.greatPrice,
        lowretail: info.currentBid,
        diff: info.differencePrice,
        dis: info.distance,
        tr: info.time,
        filters: contentFilter
    })
    const contentMobile = Mustache.render($rowtemplatelistMobile, {
            aucid: info.auctionID,
            auclink: info.acvURL,
            vehicle: info.yearMakeModelTrim,
            miles: info.miles,
            rm: info.reserveMet,
            highbid: info.greatPrice,
            lowretail: info.currentBid,
            diff: info.differencePrice,
            dis: info.distance,
            tr: info.time,
            filters: contentFilter
        })
        // console.log(contentMobile);
    document.getElementById('list-data-section-mobile').insertAdjacentHTML('afterbegin', contentMobile)
    document.getElementById('page1').insertAdjacentHTML('afterbegin', content)
    pagination(1, currentPages)
        // paginationPhone()
};

const addingNewFilter = (info) => {
    if (colorindexFilter >= filterColor.length) {
        colorindexFilter = 0
    }
    const content = Mustache.render($rowtemplatefilter, {
        filterId: info.filterId,
        filterColor: filterColor[colorindexFilter],
        filterNumber: info.filterNumber,
        filterName: info.filterName,
        isActive: info.isActive,
        isInactive: info.isInactive
    });
    const contentMobile = Mustache.render($rowtemplatefilterMobile, {
        filterId: info.filterId,
        filterColor: filterColor[colorindexFilter],
        filterNumber: info.filterNumber,
        filterName: info.filterName,
        isActive: info.isActive,
        isInactive: info.isInactive
    });
    document.getElementById('filter-data-section-mobile').insertAdjacentHTML('beforeend', contentMobile)
    $tablefilter.insertAdjacentHTML('beforeend', content)
    colorindexFilter += 1
        // window.location.href = './filter-management-folders/filter-page.html'
}
const listcontainer = document.querySelector('.list-container')
const filtercontainer = document.querySelector('.filter-container')
const homePage = () => {
    window.location.href = "./index.html"
}
const showFilterCard = () => {
    listcontainer.style.display = "none"
    filtercontainer.style.display = "block"

}
const showListCard = () => {
    filtercontainer.style.display = "none"
    listcontainer.style.display = "block"


}
let lastactivetab = 'live-listing'
const activeTab = function(val) {
    document.querySelectorAll('.' + lastactivetab + '-active').forEach((e) => { e.style.display = "none" })
    document.querySelectorAll('.' + lastactivetab + '-tab').forEach((e) => { e.style.color = "black" })
    document.querySelectorAll('.' + val + '-active').forEach((e) => { e.style.display = "inline" })
    document.querySelectorAll('.' + val + '-tab').forEach((e) => { e.style.color = "#0266ff" })

    lastactivetab = val
        // console.log('called');

}
activeTab('live-listing')
    // const adjustHeight = (head, ft) => {
    //     const footer = document.getElementById(ft)
    //     const top = document.getElementById(head)
    //     const height = footer.offsetTop - top.offsetTop
    //     top.style.height = height + "px"
    // }
let isopen = false
const displayNav = (para) => {
    if (!isopen) {
        document.getElementById(para).classList.add('displayMenu')
            // document.querySelector('header').style.height = "90%"
        document.getElementById('res-drp-bars').style.display = "none"
        document.getElementById('res-drp-close').style.display = "inline"
        if (para === 'responsive-sidebar') {

            document.querySelector("#blurdiv").style.display = "inline"

        }
        isopen = true
    } else {
        document.getElementById(para).classList.remove('displayMenu')
            // document.querySelector('header').style.height = "70px"
        document.getElementById('res-drp-bars').style.display = "inline"
        document.getElementById('res-drp-close').style.display = "none"
        if (para === 'responsive-sidebar') {

            document.querySelector("#blurdiv").style.display = "none"
        }
        isopen = false
    }
}
const bdy = document.getElementById('wrap-bdy')
window.onresize = () => {
    const width = bdy.offsetWidth
    if (width > 750) {
        document.getElementById('blurdiv').style.display = "none"
    }

}

// adjustHeight('list-data-section', 'list-section-footer')

const openFiltermanager = () => {
    window.location.href = "./filter-management-folders/filter-page.html"
}
pagination(1, currentPages)
    // nextPage()
    // addingNewRowInListred()
    // load5()

const logout = document.querySelectorAll('.logouthover')
const logoutwhite = document.querySelectorAll('.logout-white')
const logoutred = document.querySelectorAll('.logout-red')

logout.forEach((ele) => {
    ele.addEventListener('mouseover', () => {
        logoutred.forEach((e) => {
            e.style.display = "none"
        })

        logoutwhite.forEach((e) => {
            e.style.display = "inline"
        })


    })
    ele.addEventListener('mouseout', () => {
        logoutred.forEach((e) => {
            e.style.display = "inline"
        })

        logoutwhite.forEach((e) => {
            e.style.display = "none"
        })
    })
})
const body = document.querySelector('.body-wrapper')

const manageNav = () => {
    const location = (document.location.href)
    const arr = location.split('?')
    if (arr.length === 2 && arr[1] === "livelisting") {
        body.style.display = "flex"
        showListCard()
        activeTab('live-listing')
    } else if (arr.length === 2 && arr[1] === "filter") {
        body.style.display = "flex"

        showFilterCard()
        activeTab('filter')
    } else {
        body.style.display = "flex"

        showListCard()
        activeTab('live-listing')

    }

}
const buttons = document.querySelectorAll('button')
    // console.log(buttons);
buttons.forEach((button) => {
    button.addEventListener('mouseover', () => {
        if (body.offsetWidth > 550) {
            button.style.opacity = "0.75"
        }
    })
    button.addEventListener('mouseout', () => {
        if (body.offsetWidth > 550) {
            button.style.opacity = "1"
        }
    })
})

const getOffsetTop = (elem) => {
    var offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while (elem = elem.offsetParent);
    return offsetTop;
}


const tableheaderList = document.querySelector('#table-head-list')

const scrollCheckSection = document.getElementsByClassName('list-container')[0]

scrollCheckSection.onscroll = () => {
    if ((scrollCheckSection.scrollTop) > getOffsetTop(tableheaderList)) {
        tableheaderList.classList.add('sticky')
        const widthele = document.getElementById('list-data-section').offsetWidth
        tableheaderList.style.width = widthele + 'px'

    } else {
        tableheaderList.classList.remove('sticky')

    }
}

let isNormalMenuOpen = false
const displayMenu = () => {
    const menu = document.getElementById('normal-dropdown')
    const normalMenu = document.getElementById('normal-sidebar')
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        menu.addEventListener('click', () => {
            if (!isNormalMenuOpen) {
                normalMenu.style.display = "flex"
                isNormalMenuOpen = true
            } else {
                normalMenu.style.display = "none"
                isNormalMenuOpen = false
            }
        })
    } else {
        menu.addEventListener('mouseover', () => {
            normalMenu.style.display = "flex"
        })
        menu.addEventListener('mouseout', () => {
            normalMenu.style.display = "none"
        })
    }
}
displayMenu()
const closeMenu = () => {

    document.getElementById('normal-sidebar').style.display = "none"
    isNormalMenuOpen = false
}


const toFilterPage = () => {
    if (numberOfFilters >= 10) {
        maxOf10()

    } else {
        window.location.href = "./filter-management-folders/filter-page.html"
    }

}


const modaltemplate = document.querySelector('#modal-template').innerHTML
const modalcontainer = document.querySelector('#modal-container')
const modal = document.querySelector('#modal-popup')
const deleteFilterModal = (id) => {
    // removeprevlistener(modal)
    const head = "Are you sure you want to delete this filter?"
    const foot = "Your filter cannot be restored."
    const classleft = 'yes-cancel'
    const classright = 'back-btn'
    const rightbtndata = "CANCEL"
    const leftbtndata = '<span>DELETE</span><img  style="margin-left: 5px;" src="../assets/cross.svg">'
    const rightbtnaction = 'closeModal()'
    const leftbtnaction = 'deleteFilterEvent(' + id + ')'
    const push = Mustache.render(modaltemplate, {
        headdata: head,
        footdata: foot,
        classleftbtn: classleft,
        classrightbtn: classright,
        btnleftdata: leftbtndata,
        btnrightdata: rightbtndata,
        leftbtn: leftbtnaction,
        rightbtn: rightbtnaction
    })
    modalcontainer.innerHTML = push
    openModal()


}
const maxOf10 = () => {
    // removeprevlistener(modal)
    const head = "Filters Limit exceeded. Please delete some filters to add more."
    const classright = 'back-btn'
    const rightbtndata = "OKAY"
    const rightbtnaction = 'closeModal()'
    const push = Mustache.render(modaltemplate, {
        headdata: head,
        classrightbtn: classright,
        btnrightdata: rightbtndata,
        displayval: "none",
        rightbtn: rightbtnaction
    })
    modalcontainer.innerHTML = push
    openModal()


}


const openModal = () => {
    modalcontainer.children[0].style.display = "block"
}
const closeModal = () => {
    modalcontainer.children[0].style.display = "none"
}

const seeMoreEventListener = () => {
    const btns = document.querySelectorAll('.seeMoreBtn')
    btns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const filterTd = btn.parentNode
            var childs = filterTd.children
            childs = [].slice.call(childs)
            console.log(childs);
            childs.forEach((ch) => {
                ch.style.display = "initial"
            })
            childs[childs.length - 1].style.display = "none"

        })

    })
}