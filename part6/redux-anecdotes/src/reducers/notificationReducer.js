import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const showTimedNotification = createAsyncThunk(
  'notification/showTimed',
  async (message, { dispatch }) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
)

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer