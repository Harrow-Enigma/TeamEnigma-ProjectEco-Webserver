let dtile = document.querySelector(".about-step-card-1")
let atile = document.querySelector(".about-step-card-2")
let wtile = document.querySelector(".about-step-card-3")
let ctile = document.querySelector(".about-step-card-4")

let stepnum1 = document.querySelector(".about-step-number-1")
let stepnum2 = document.querySelector(".about-step-number-2")
let stepnum3 = document.querySelector(".about-step-number-3")
let stepnum4 = document.querySelector(".about-step-number-4")

let content1 = document.querySelector(".about-pc-content-1")
let content2 = document.querySelector(".about-pc-content-2")
let content3 = document.querySelector(".about-pc-content-3")
let content4 = document.querySelector(".about-pc-content-4")

var width = window.innerWidth
var height = window.innerHeight

window.addEventListener('resize', () => {
  if (typeof (window.innerWidth) == 'number') {
    width = window.innerWidth;
    height = window.innerHeight;
  } else {
    if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
    } else {
      if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        width = document.body.clientWidth;
        height = document.body.clientHeight;
      }
    }
  }
})

const toA = () => {
  window.scrollTo(0, (height * 2 + 10))
}
const toW = () => {
  window.scrollTo(0, (height * 3 + 10))
}
const toC = () => {
  window.scrollTo(0, (height * 4 + 10))
}
const toTop = () => {
  window.scrollTo(0, height)
}

const toggleD = () => {
  dtile.style.cssText = `
    grid-column: 1 / 5;
    grid-row: 1 / 5;
    padding: 30px;
  `
  atile.style.cssText = `
    grid-column: 5 / 6;
    grid-row: 1 / 5;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  wtile.style.cssText = `
    grid-column: 5 / 6;
    grid-row: 5 / 6;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  ctile.style.cssText = `
    grid-column: 1 / 5;
    grid-row: 5 / 6;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  stepnum1.style.opacity = 1
  stepnum2.style.opacity = 0.3
  stepnum3.style.opacity = 0.3
  stepnum4.style.opacity = 0.3

  content1.style.display = "block"
  content2.style.display = "none"
  content3.style.display = "none"
  content4.style.display = "none"
}
const toggleA = () => {
  dtile.style.cssText = `
    grid-column: 1 / 2;
    grid-row: 1 / 5;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  atile.style.cssText = `
    grid-column: 2 / 6;
    grid-row: 1 / 5;
    padding: 30px;
  `
  wtile.style.cssText = `
    grid-column: 2 / 6;
    grid-row: 5 / 6;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  ctile.style.cssText = `
    grid-column: 1 / 2;
    grid-row: 5 / 6;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  stepnum1.style.opacity = 0.3
  stepnum2.style.opacity = 1
  stepnum3.style.opacity = 0.3
  stepnum4.style.opacity = 0.3

  content1.style.display = "none"
  content2.style.display = "block"
  content3.style.display = "none"
  content4.style.display = "none"
}
const toggleW = () => {
  dtile.style.cssText = `
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  atile.style.cssText = `
    grid-column: 2 / 6;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  wtile.style.cssText = `
    grid-column: 2 / 6;
    grid-row: 2 / 6;
    padding: 30px;
  `
  ctile.style.cssText = `
    grid-column: 1 / 2;
    grid-row: 2 / 6;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  stepnum1.style.opacity = 0.3
  stepnum2.style.opacity = 0.3
  stepnum3.style.opacity = 1
  stepnum4.style.opacity = 0.3

  content1.style.display = "none"
  content2.style.display = "none"
  content3.style.display = "block"
  content4.style.display = "none"
}
const toggleC = () => {
  dtile.style.cssText = `
    grid-column: 1 / 5;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  atile.style.cssText = `
    grid-column: 5 / 6;
    grid-row: 1 / 2;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  wtile.style.cssText = `
    grid-column: 5 / 6;
    grid-row: 2 / 6;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  ctile.style.cssText = `
    grid-column: 1 / 5;
    grid-row: 2 / 6;
    padding: 30px;
  `

  stepnum1.style.opacity = 0.3
  stepnum2.style.opacity = 0.3
  stepnum3.style.opacity = 0.3
  stepnum4.style.opacity = 1

  content1.style.display = "none"
  content2.style.display = "none"
  content3.style.display = "none"
  content4.style.display = "block"
}

if (width < 900) {
  window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    
    let mobile1 = document.querySelector(".about-mobile-1")
    let mobile2 = document.querySelector(".about-mobile-2")
    let mobile3 = document.querySelector(".about-mobile-3")
    let mobile4 = document.querySelector(".about-mobile-4")

    let arrow1 = document.querySelector("#arrow1")
    let arrow2 = document.querySelector("#arrow2")
    let arrow3 = document.querySelector("#arrow3")
    let arrow4 = document.querySelector("#arrow4")

    if (scroll <= height * 2) {
      mobile1.style.cssText = `
        opacity: 1;
        z-index: 99;
      `
      mobile2.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      mobile3.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      mobile4.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      stepnum1.style.opacity = 1
      stepnum2.style.opacity = 0.3
      stepnum3.style.opacity = 0.3
      stepnum4.style.opacity = 0.3
      arrow1.style.display = "block"
      arrow2.style.display = "none"
      arrow3.style.display = "none"
      arrow4.style.display = "none"
    } else if ((scroll > height * 2) && (scroll <= height * 3)) {
      mobile1.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      mobile2.style.cssText = `
        opacity: 1;
        z-index: 99;
      `
      mobile3.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      mobile4.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      stepnum1.style.opacity = 0.3
      stepnum2.style.opacity = 1
      stepnum3.style.opacity = 0.3
      stepnum4.style.opacity = 0.3
      arrow1.style.display = "none"
      arrow2.style.display = "block"
      arrow3.style.display = "none"
      arrow4.style.display = "none"
    } else if ((scroll > height * 3) && (scroll <= height * 4)) {
      mobile1.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      mobile2.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      mobile3.style.cssText = `
        opacity: 1;
        z-index: 99;
      `
      mobile4.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      stepnum1.style.opacity = 0.3
      stepnum2.style.opacity = 0.3
      stepnum3.style.opacity = 1
      stepnum4.style.opacity = 0.3
      arrow1.style.display = "none"
      arrow2.style.display = "none"
      arrow3.style.display = "block"
      arrow4.style.display = "none"
    } else if (scroll > height * 4) {
      mobile1.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      mobile2.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      mobile3.style.cssText = `
        opacity: 0;
        pointer-events: none;
      `
      mobile4.style.cssText = `
        opacity: 1;
        z-index: 99;
      `
      stepnum1.style.opacity = 0.3
      stepnum2.style.opacity = 0.3
      stepnum3.style.opacity = 0.3
      stepnum4.style.opacity = 1
      arrow1.style.display = "none"
      arrow2.style.display = "none"
      arrow3.style.display = "none"
      arrow4.style.display = "block"
    }
  })
} else {
  content1.style.display = "block"

  window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY

    if (scroll <= height * 2) {
      toggleD()
    } else if ((scroll > height * 2) && (scroll <= height * 3)) {
      toggleA()
    } else if ((scroll > height * 3) && (scroll <= height * 4)) {
      toggleW()
    } else if (scroll > height * 4) {
      toggleC()
    }
  })
}