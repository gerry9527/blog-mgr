import { login} from '@/api/login';
import { getToken, setToken} from '@/utils/auth';

const user = {
    state:{
        token:getToken(),
        name:'',
        avatar:'',
        roles:[]
    },


    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions:{
        //登录
        Login({ commit }, userInfo) {
            debugger
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
              debugger
              login(username, userInfo.password).then(response => {
                debugger
                const data = response.data;
                setToken(data.token)
                commit('SET_TOKEN', data.token);
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          },
    }
}

export default user