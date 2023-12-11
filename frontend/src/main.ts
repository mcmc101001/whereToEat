import { createApp } from 'vue'
import App from '@/App.vue'
import '@/index.css'
import router from '@/router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
