import { createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name : 'user',
    initialState: {
        user: null
    },
    reducers:{
        changeUser(state,{ payload }){
            return { ...state, user: payload}
        },
        logout(state){
            return { ...state, user: null}
        }
    }
})

export const { changeUser, logout } = slice.actions

export const selectUser = state => state.user

export default slice.reducer