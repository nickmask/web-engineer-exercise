import { getAccessToken } from "./sign-in";

export const APPS_REQUEST = "APPS_REQUEST";
export const APPS_SUCCESS = "APPS_SUCCESS";
export const APPS_ERROR = "APPS_ERROR";
export const UPDATE_APP = "UPDATE_APP";

function appsRequesting() {
  return { type: APPS_REQUEST };
}

function appsSuccess(payload) {
  return { type: APPS_SUCCESS, payload };
}

function appsError() {
  return { type: APPS_ERROR };
}

function updateApp(id, name, logo) {
  return {
    type: UPDATE_APP,
    id,
    name,
    logo
  };
}

export function updateAppDetails(id, data) {
  return async function(dispatch) {
    try {
      await fetch(`https://guarded-thicket-22918.herokuapp.com/apps/${id}`, {
        method: "PUT",
        headers: {
          Authorization: getAccessToken(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      dispatch(updateApp(id, data.name, data.logo));
    } catch (error) {
      throw new Error(error);
    }
  };
}

export function fetchApps() {
  return async function(dispatch) {
    dispatch(appsRequesting());

    const response = await fetch(
      "https://guarded-thicket-22918.herokuapp.com/apps",
      {
        headers: {
          Authorization: getAccessToken(),
          "Content-Type": "application/json"
        }
      }
    );

    if (!response.ok) return dispatch(appsError());

    const { apps } = await response.json();

    return dispatch(appsSuccess(apps));
  };
}
