const routes = [
  { path: '/', component: () => import('./views/Home'), meta: { title: 'Home' } },
  { path: '/auctions', component: () => import('./views/Auctions'), meta: { title: 'All Auctions' } },
  { path: '/auctions/new', component: () => import('./views/AuctionNew'), meta: { title: 'New Auction' } },
  { path: '/auction/:id', component: () => import('./views/AuctionDetail'), meta: { title: 'Auction Detail' } },
  { path: '/create', component: () => import('./views/CreateAccount'), meta: { title: 'Create Account' } },
  { path: '/settings', component: () => import('./views/Settings'), meta: { title: 'Settings' } },
  { path: '/:path(.*)', component: () => import('./views/NotFound'), meta: { title: 'This Is Not The Page You\'re Looking For' } }
]

export default routes
