export const NOT_RECOGNIZED = 'NOT_RECOGNIZED';
export const START_RECOGNIZING = 'START_RECOGNIZING'

export default (newPhoto) => {
    console.log('start recognizing')
    return (dispatch) => {
      dispatch({type: START_RECOGNIZING})
    }
  }