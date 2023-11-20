// Works correctly
export {}

import { VueRouter } from 'vue-router/types/router'

declare module 'vue' {
  interface ComponentCustomProperties {
    $router: VueRouter
  }
}
