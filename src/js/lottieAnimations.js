import Lottie from 'lottie-web'

const mainAvatarContainer = document.querySelector('#main-avatar')
const aboutAvatarContainer = document.querySelector('#about-avatar')

export const mainAvatar = () => {
  Lottie.loadAnimation({
    container: mainAvatarContainer,
    path: 'assets/animations/mainAvatar.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
    name: 'Main avatar'
  })
}

export const aboutAvatar = () => {
  Lottie.loadAnimation({
    container: aboutAvatarContainer,
    path: 'assets/animations/aboutAvatar.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
    name: 'Main avatar'
  })
}
