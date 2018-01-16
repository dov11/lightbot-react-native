import API from '../api/client'
import { APP_LOADING, APP_DONE_LOADING } from './loading'
import { NOT_RECOGNIZED } from './recognizing'
export const SEND_PHOTO = 'SEND_PHOTO'

const api = new API()

export default (newPhoto) => {
  return (dispatch) => {
    dispatch({type: APP_LOADING})
    api.post('recognize', {photo: newPhoto})
      .then((result) => {
        if (!result.body.message) {
          dispatch({type: NOT_RECOGNIZED})
        }
        console.log(result)
        dispatch({
          type: SEND_PHOTO,
          payload: result.body
        })
        dispatch({type: APP_DONE_LOADING})
      })
      .catch((error) => console.log(error))
  }
}