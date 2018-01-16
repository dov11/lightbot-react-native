import { NOT_RECOGNIZED, START_RECOGNIZING } from '../actions/recognizing'

export default (state = 0, { type } = {}) => {
  switch(type) {
    case NOT_RECOGNIZED :
      return 1 + state

    case START_RECOGNIZING :
      return 0

    default :
      return state
  }
}