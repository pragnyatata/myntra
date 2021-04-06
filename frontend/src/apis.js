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
