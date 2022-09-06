import store from '../store'
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        component: () => import('pages/Agreement.vue'),
        name: 'agreement',
        path: 'agreement'
      },
      {
        component: () => import('pages/Contacts.vue'),
        name: 'contacts',
        path: 'contacts'
      },
      {
        component: () => import('pages/Faq.vue'),
        name: 'faq',
        path: 'faq'
      },
      {
        component: () => import('pages/FillingInRequisites.vue'),
        name: 'fillingInRequisites',
        path: 'filling-in-requisites'
      },
      {
        component: () => import('pages/Index.vue'),
        name: 'index',
        path: ''
      },
      {
        component: () => import('pages/Login.vue'),
        name: 'login',
        path: 'login'
      },
      {
        beforeEnter (to, from, next) {
          // console.log(store)
          store.dispatch('auth/destroyToken')
            .then(() => {
              next('/login')
            })
        },
        name: 'logout',
        path: 'logout'
      },
      {
        component: () => import('pages/Partners.vue'),
        name: 'partners',
        path: 'partners'
      },
      {
        component: () => import('pages/Payment.vue'),
        name: 'payment',
        path: 'payment'
      },
      {
        component: () => import('pages/PasswordRecovery.vue'),
        name: 'passwordRecovery',
        path: 'password-recovery'
      },
      {
        component: () => import('pages/PersonalArea.vue'),
        meta: {
          requiresAuth: true
        },
        name: 'personalArea',
        path: 'personal-area/:section?'
      },
      {
        component: () => import('pages/Registration.vue'),
        name: 'registration',
        path: 'registration'
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
    // component: () => import('layouts/Main.vue'),
    // children: [
    //   {
    //     component: () => import('pages/Error404.vue'),
    //     name: 'error404',
    //     path: ''
    //   }
    // ]
  })
}

export default routes
