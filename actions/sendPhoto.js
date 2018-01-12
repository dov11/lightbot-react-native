import API from '../api/client'
export const SEND_PHOTO = 'SEND_PHOTO'

const api = new API()

export default (newPhoto) => {
  return (dispatch) => {
    api.post('recognize', {photo: newPhoto})
      .then((result) => {
        console.log(result)
          dispatch({
            type: SEND_PHOTO,
            payload: result.body
          })
      })
      .catch((error) => console.log(error))
  }
}