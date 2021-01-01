import { SET_CURRENT_USER, REMOVE_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: true,
        user: action.payload,
      };

    case REMOVE_CURRENT_USER:
      return {
        ...state,
        validToken: false,
        user: action.payload,
      };

    default:
      return state;
  }
}
