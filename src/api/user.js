import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUuserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

export function logout() {}
