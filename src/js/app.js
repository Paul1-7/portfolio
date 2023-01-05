import JSConfetti from 'js-confetti'
import { aboutAvatar, mainAvatar } from './lottieAnimations.js'
import { JSValidator } from './validator.js'

mainAvatar()
aboutAvatar()
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

const metaTheme = document.querySelector('meta[name="theme-color"]')
const metaThemeNavButton = document.querySelector(
  'meta[name="msapplication-navbutton-color"]'
)
const metaThemeApple = document.querySelector(
  'meta[name="apple-mobile-web-app-status-bar-style"]'
)

const menutoggle = document.querySelector('.toggle-menu')
const menuToggleItem = document.querySelector('#toggle-item')

const btnDarkMode = document.querySelectorAll('.toggle-dark')
const btnDarkModeContainer = document.querySelectorAll('.toggleWrapper')

const html = document.documentElement.classList
const themeStoraged = localStorage.getItem('theme')
let isDark = themeStoraged === 'dark' ? true : false

const sections = document.querySelectorAll('section')
const menuItem = document.querySelectorAll('.menu-item')

const metaThemeLight = () => {
  metaTheme.setAttribute('content', '#fff')
  metaThemeApple.setAttribute('content', '#fff')
  metaThemeNavButton.setAttribute('content', '#fff')
}

const metaThemeDark = () => {
  metaTheme.setAttribute('content', '#282828')
  metaThemeApple.setAttribute('content', '#282828')
  metaThemeNavButton.setAttribute('content', '#282828')
}

const changeTheme = (index) => {
  if (isDark) {
    html.remove('dark')
    metaThemeLight()
    localStorage.setItem('theme', 'light')
    btnDarkMode.forEach((btnDark, i) => {
      if (i !== index) btnDark.checked = false
    })
  } else {
    html.add('dark')
    localStorage.setItem('theme', 'dark')
    metaThemeDark()
    btnDarkMode.forEach((btnDark, i) => {
      if (i !== index) btnDark.checked = true
    })
  }
  isDark = !isDark
}

if (themeStoraged === 'dark') {
  html.add('dark')
  metaThemeDark()
  btnDarkMode.forEach((btnDark) => {
    btnDark.checked = true
  })
} else {
  html.remove('dark')
  metaThemeLight()
  btnDarkMode.forEach((btnDark) => {
    btnDark.checked = false
  })
}

btnDarkMode.forEach((btnDark, index) => {
  btnDark.addEventListener('click', () => changeTheme(index))

  btnDark.removeEventListener('click', () => changeTheme(index))
})

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

//dark mode
window.addEventListener('load', () => {
  btnDarkModeContainer.forEach((btnDark) => {
    btnDark.classList.remove('not-visible')
  })
})
