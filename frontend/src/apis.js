const apiUrl = "http://localhost:8000/api";
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
