import { createSlice } from '@reduxjs/toolkit'

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

/* export const showTimedNotification = createAsyncThunk(
  'notification/showTimed',
  async (message, { dispatch }) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
) */

export const setTimedNotification = (message, duration) => {
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, duration * 1000)
  }
} 

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer