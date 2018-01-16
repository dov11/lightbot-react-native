import { APP_LOADING, APP_DONE_LOADING } from '../actions/loading'

export default (state = true, { type } = {}) => {
  switch(type) {
    case APP_LOADING :
      return true

    case APP_DONE_LOADING :
      return false

    default :
      return state
  }
}