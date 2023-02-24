
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/Table.vue') },
      { path: '', component: () => import('pages/AddProduct.vue') },
    ]
  },
  {
    path: 'products',
    component: () => import('pages/Table.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
