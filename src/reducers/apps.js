import {
  APPS_REQUEST,
  APPS_SUCCESS,
  APPS_ERROR,
  UPDATE_APP
} from "../actions/apps";

const initialState = {
  requesting: null,
  items: [],
  error: null
};

export default function apps(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case APPS_REQUEST:
      return Object.assign({}, state, { requesting: true });
    case APPS_SUCCESS:
      return Object.assign({}, state, {
        requesting: false,
        items: payload
      });
    case APPS_ERROR:
      return Object.assign({}, state, {
        requesting: false,
        error: true
      });
    case UPDATE_APP:
      const items = state.items.map(item =>
        item.id !== action.id
          ? item
          : Object.assign({}, item, { name: action.name, logo: action.logo })
      );

      return Object.assign({}, state, {
        items
      });
    default:
      return state;
  }
}
