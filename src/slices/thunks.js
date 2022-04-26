import {createAsyncThunk} from '@reduxjs/toolkit'
import { authHost } from '../http/index.js'

export const fetchAllChatData = createAsyncThunk(
    'channels',
    async () => {
        const {data} = await authHost.get('data')
        return data
    }
)