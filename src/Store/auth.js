import {createSlice} from '@reduxjs/toolkit'

const initialAuthState = {token:'',LoginStatus:false}
const AuthSlice = createSlice({
    name:'Auth',
    initialState:initialAuthState,
    reducers:{
        Login(state,action){
            state.token = action.payload
            state.LoginStatus = true
            localStorage.setItem('Token',state.token)
        },
        Logout(state){
            state.token = ''
            state.LoginStatus = false
            localStorage.removeItem('Token')
        }
    }
})
export const Authaction = AuthSlice.actions
export default AuthSlice