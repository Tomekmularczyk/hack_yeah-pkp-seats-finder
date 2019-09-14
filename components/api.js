import superagent from "superagent";

export const postNrSeats = nrOfPeople =>
  superagent
    .post("/api/seats")
    .send({ nrOfPeople })
    .end();
