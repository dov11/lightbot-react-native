import { NOT_RECOGNIZED } from '../actions/recognizing'

export default (state = 0, { type } = {}) => {
  switch(type) {
    case NOT_RECOGNIZED :
      return 1 + state

    // case APP_DONE_LOADING :
    //   return false

    default :
      return state
  }
}