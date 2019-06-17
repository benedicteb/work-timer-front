import { isLocalhost } from "./serviceWorker";

const URL_BASE = isLocalhost ? "" : "https://api.work-timer.benedicte.dev";
const SECRET_KEY = "abc123";

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
  return fetch(`${URL_BASE}/category`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ categoryName: name })
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
    .then(json => json as Category);
};

export const getRunningEvents = () => {
  return fetch(`${URL_BASE}/events?running=1`, {
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
    .then(json => json as { events: TimerEvent[] });
};

export const getEvents = (after: Date, before: Date) => {
  return fetch(
    `${URL_BASE}/events?before=${before.toISOString()}&after=${after.toISOString()}`,
    {
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`
      }
    }
  )
    .then(response => {
      if (!response.ok) {
        throw Error("Failed");
      }

      return response;
    })
    .then(response => {
      return response.json();
    })
    .then(json => json as { events: TimerEvent[] });
};

export const startCategoryEvent = (category: Category) => {
  return fetch(`/category/${category.id}/start`, {
    method: "POST",
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
    .then(json => json as TimerEvent);
};

export const stopCategoryEvent = (category: Category) => {
  return fetch(`/category/${category.id}/stop`, {
    method: "POST",
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
    .then(json => json as TimerEvent);
};
