import {SEND_PHOTO} from '../actions/sendPhoto'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case SEND_PHOTO:
      const message = { ...payload }
      return state.concat([message])
    default:
      return state
  }}