import Layout from '@/layout'

export default {
  path: '/permission',
  component: Layout,
  meta: { id: 'permission' },
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: { title: '权限管理', icon: 'lock' }
    }
  ]
}
