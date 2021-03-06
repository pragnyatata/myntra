const apiUrl = "/api";
export const slotform = (scheduleId, userId, body) => {
  return fetch(`${apiUrl}/user/slotbook/${scheduleId}/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      details: body.details,
      phoneNumber: body.phoneNumber,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};
export const createSlot = (values) => {
  return fetch(`${apiUrl}/schedule/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: values.date,
      beginTime: values.beginTime,
      endTime: values.endTime,
      influencerEmail: values.emailInfluencer,
      slots: values.slots,
      insiderPoints: values.points,
      url: values.url,
      influencerName: values.name,
      restreamUrl: values.restreamUrl,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};
export const modifySlot = (values, id) => {
  return fetch(`${apiUrl}/schedule/update/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: values.date,
      beginTime: values.beginTime,
      endTime: values.endTime,
      influencerEmail: values.emailInfluencer,
      slots: values.slots,
      insiderPoints: values.points,
      url: values.url,
      influencerName: values.name,
      restreamUrl: values.restreamUrl,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};

export const slotLists = (values) => {
  return fetch(`${apiUrl}/schedule/list`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};
export const deleteSlot = (scheduleId) => {
  return fetch(`${apiUrl}/schedule/delete/${scheduleId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};
export const register = (email, name, role) => {
  return fetch(`${apiUrl}/user/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      role: role,
      email: email,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};

export const login = (email) => {
  return fetch(`${apiUrl}/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};
export const getUserInfo = (id) => {
  return fetch(`${apiUrl}/user/userinfo/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};

export const buddyPush = (id) => {
  return fetch(`${apiUrl}/user/buddyQueue/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};
export const buddyCount = (id) => {
  return fetch(`${apiUrl}/user/buddyCount`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};

export const getLiveInfo = (id) => {
  return fetch(`${apiUrl}/schedule/slotsInfo/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};
export const sendEmailToInfluencer = (id) => {
  return fetch(`${apiUrl}/schedule/mailToInfluencer/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.log(err));
};
