import axios from '../axios/config'

const UserApi = {
  // 获取用户信息
  getUserInfo () {
    return axios.post('/user/userinfo')
  },
  // 获取用户资产接口
  getUserAssetsList () {
    return axios.post('/user/assets')
  }
}

export default UserApi
