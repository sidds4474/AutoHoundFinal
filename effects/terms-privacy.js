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
    ///for modal popup