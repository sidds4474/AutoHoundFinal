let lastactivetab = 'live-listing'
const activeTab = function(val) {
        document.querySelectorAll('.' + lastactivetab + '-active').forEach((e) => { e.style.display = "none" })
        document.querySelectorAll('.' + lastactivetab + '-tab').forEach((e) => { e.style.color = "black" })
        document.querySelectorAll('.' + val + '-active').forEach((e) => { e.style.display = "inline" })
        document.querySelectorAll('.' + val + '-tab').forEach((e) => { e.style.color = "#0266ff" })

        lastactivetab = val
            // console.log('called');

    }
    // activeTab('live-listing')

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

const tooltips = document.querySelectorAll('.tooltiptext')

const closeToolTip = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        tooltips.forEach((ele) => {
            const isopen = ele.getAttribute('data-clicked')
            console.log(isopen);
            if (isopen === "yes") {
                ele.style.display = "none"
                ele.setAttribute('data-clicked', 'no')

            }

        })
    }

}

const tooltip = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelectorAll('.tooltipimg').forEach((ele) => {

            ele.addEventListener('click', (e) => {

                const isopen = e.target.parentNode.children[2].getAttribute('data-clicked')
                    // console.log(isopen);
                if (isopen === "no") {
                    e.target.parentNode.children[2].style.display = "inline";
                    const offset = e.target.parentNode.children[0].offsetWidth
                    const height = e.target.parentNode.children[2].offsetHeight
                    e.target.parentNode.children[2].style.left = offset / 3 + 'px'
                    e.target.parentNode.children[2].style.top = -height + 'px'
                    setTimeout(() => {
                        e.target.parentNode.children[2].setAttribute('data-clicked', 'yes')

                    }, 50)

                } else {
                    e.target.parentNode.children[2].style.display = "none"
                    e.target.parentNode.children[2].setAttribute('data-clicked', 'no')
                }
            })


        })
    } else {
        document.querySelectorAll('.tooltipimg').forEach((ele) => {
            ele.addEventListener('mouseover', (e) => {
                e.target.parentNode.children[2].style.display = "inline";
                const offset = e.target.parentNode.children[0].offsetWidth
                const height = e.target.parentNode.children[2].offsetHeight
                e.target.parentNode.children[2].style.left = offset / 3 + 'px'
                e.target.parentNode.children[2].style.top = -height + 'px'

            })

            ele.addEventListener('mouseout', (e) => {
                e.target.parentNode.children[2].style.display = "none";

            })
        })
    }
}
tooltip()

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
const bdy = document.getElementById('wrap-bdy')

// var state = 1
window.onresize = () => {
    const width = bdy.offsetWidth
        // console.log(width);
    if (width > 750) {
        document.getElementById('blurdiv').style.display = "none"
            // state = state + 1
    }
    // if (state === 2) {
    //     displayNav('responsive-sidebar')
    // }
}

const body = document.querySelector('.body-wrapper')
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
});
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
    ///for modal poopup


const modaltemplate = document.querySelector('#modal-template').innerHTML
const modalcontainer = document.querySelector('#modal-container')
const modal = document.querySelector('#modal-popup')
const deleteAccount = (hrefTo) => {
    // removeprevlistener(modal)
    const head = "Are you sure you want to delete account?"
    const foot = "Your account cannot be restored."
    const classleft = 'yes-cancel'
    const classright = 'back-btn'
    const rightbtndata = "CANCEL"
    const leftbtndata = '<span>YES DELETE</span><img  style="margin-left: 5px;" src="../assets/cross.svg">'
    const rightbtnaction = 'closeModal()'
    const leftbtnaction = 'closeModal()'
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


const openModal = () => {
    modalcontainer.children[0].style.display = "block"
}
const closeModal = () => {
    modalcontainer.children[0].style.display = "none"
}



const insertDetails = (obj) => {
    const accountForm = document.querySelector('#account-form')
    accountForm.elements.name.value = obj.userName
    accountForm.elements.dealership.value = obj.dealership
    accountForm.elements.address.value = obj.address
    accountForm.elements.zipcode.value = obj.zipcode
    accountForm.elements.phone.value = obj.phoneNumber
    var timesArr = document.querySelectorAll('.minimal')
    timesArr = [].slice.call(timesArr)
    timesArr.splice(4, 1);
    timesArr.splice(8, 1);
    var timeInputs = Object.values(obj)
    timeInputs = timeInputs.slice(7, timeInputs.length)
        // console.log(timesArr, timeInputs);
    let c = 0
    timesArr.forEach((field) => {
        var val = timeInputs[c]
        field.value = val
        c = c + 1
    })
}
const getDetails = (obj) => {
    const accountForm = document.querySelector('#account-form')
    obj.userName = accountForm.elements.name.value
    obj.dealership = accountForm.elements.dealership.value
    obj.address = accountForm.elements.address.value
    obj.zipcode = accountForm.elements.zipcode.value
    obj.phoneNumber = accountForm.elements.phone.value
    var timesArr = document.querySelectorAll('.minimal')
    timesArr = [].slice.call(timesArr)
    timesArr.splice(4, 1);
    timesArr.splice(8, 1);
    timesArr.forEach((e) => {
        var name = e.id
        obj[name] = e.value
    })

    return obj
}