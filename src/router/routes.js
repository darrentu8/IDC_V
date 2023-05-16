
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/StartNew.vue') }
    ]
  },
  {
    path: '/new',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/StartNew.vue') }
    ]
  },
  {
    path: '/grid',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PickGrid.vue') }
    ]
  }, {
    path: '/hardware',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/HardwarePage.vue') }
    ]
  }, {
    path: '/flow',
    component: () => import('src/layouts/FlowLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/FlowPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
