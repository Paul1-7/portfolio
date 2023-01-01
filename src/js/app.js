import JSConfetti from 'js-confetti'
import { JSValidator } from './validator.js'

const myFormValidator = new JSValidator('#contact_form').init().setAjax()
myFormValidator.setSubmittedCallback(() => {
  const confetti = new JSConfetti()
  confetti.addConfetti({
    confettiColors: [
      '#d42b56',
      '#f79533',
      '#ef9070',
      '#b3287e',
      '#a166ab',
      '#5073b8',
      '#1098ad',
      '#07b39b',
      '#6fba82'
    ],
    confettiRadius: 6,
    confettiNumber: 300
  })
})

const menutoggle = document.querySelector('.toggle')
const menuToggleItem = document.querySelector('#toggle-item')

const logo = document.querySelector('#logo')

const btnDarkMode = document.querySelector('#btn-dark')
const html = document.documentElement.classList
const mode = localStorage.getItem('theme')
let isDark = true

const sections = document.querySelectorAll('section')
const menuItem = document.querySelectorAll('.menu-item')

const functionObserver = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const actualItem = Array.from(menuItem).find(
        (item) => item.dataset.url === entry.target.id
      )
      actualItem.children[0].classList.add('activeLine')
      for (const item of menuItem) {
        if (item !== actualItem) {
          item.children[0].classList.remove('activeLine')
        }
      }
    }
  })
}
const observer = new IntersectionObserver(functionObserver, {
  root: null,
  rootMargin: '0px',
  threshold: 0.4
})
sections.forEach((section) => observer.observe(section))

menutoggle.onclick = function () {
  menutoggle.classList.toggle('active')
  menuToggleItem.classList.toggle('-translate-x-[40rem]')
}

// //form
// form[0].addEventListener('submit', (e) => {
//   e.preventDefault()
//   console.log(e)
// })

//dark mode
btnDarkMode.addEventListener('click', (e) => {
  if (isDark) {
    html.add('dark')
    btnDarkMode.src = 'assets/svg/sun.svg'
    logo.src = 'assets/svg/logo-dark.svg'
    localStorage.setItem('theme', 'dark')
    isDark = false
  } else {
    html.remove('dark')
    btnDarkMode.src = 'assets/svg/moon.svg'
    logo.src = 'assets/svg/logo.svg'
    localStorage.setItem('theme', 'light')
    isDark = true
  }
})

if (mode === 'dark') {
  html.add('dark')
  btnDarkMode.src = 'assets/svg/sun.svg'
  logo.src = 'assets/svg/logo-dark.svg'
} else {
  html.remove('dark')
  btnDarkMode.src = 'assets/svg/moon.svg'
  logo.src = 'assets/svg/logo.svg'
}
