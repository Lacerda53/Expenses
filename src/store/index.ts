import {configureStore, } from '@reduxjs/toolkit'
import authReducer from './Auth.store'
import renderReducer from './Render.store'

const store = configureStore({
    reducer: {
        auth: authReducer,
        render: renderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store; 