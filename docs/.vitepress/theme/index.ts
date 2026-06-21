import DefaultTheme from 'vitepress/theme'
import Esp32Flasher from './components/Esp32Flasher.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Esp32Flasher', Esp32Flasher)
  }
}
