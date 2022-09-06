import Layout from '@/layout'
export default {
  path: '/permission',
  meta: { id: 'permissions' },
  component: Layout,
  children: [{
    path: '',
    name: 'permissions',
    component: () => import('@/views/permission/index'),
    meta: { title: '权限管理', icon: 'lock' }
  }]
}
