import { isLocalhost } from "./serviceWorker";

const URL_BASE = isLocalhost ? "" : "https://api.work-timer.benedicte.dev";
const SECRET_KEY = "duerkul";

export const getCategories = () => {
  return fetch(`${URL_BASE}/categories`, {
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw Error("Failed");
      }

      return response;
    })
    .then(response => {
      return response.json();
    })
    .then(json => json as { categories: Category[] });
};

export const createCategory = (name: string) => {
  return fetch(`${URL_BASE}/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`
    },
    body: JSON.stringify({ categoryName: name })
  }).then(response => {
    if (!response.ok) {
      throw Error("Failed");
    }

    return response;
  });
};
