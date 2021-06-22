const routes = [
  { path: '/', component: () => import('./views/Home'), meta: { title: 'Home' } },
  { path: '/:path(.*)', component: () => import('./views/NotFound'), meta: { title: 'This Is Not The Page You\'re Looking For' } }
]

export default routes
