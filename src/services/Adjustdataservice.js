import http from "../http-common";

class Adjustdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/adjust");
  }

  get(id) {
    return http.get(`/adjust/${id}`);
  }

  create(data) {
    return http.post("/adjust", data);
  }

  getID() {
    return http.get("/adjust/last_id")
  }

  getAllp() {
    //return http.get("/tutorials");
    return http.get("/adjust_p");
  }

  getp(id) {
    return http.get(`/adjust_p/${id}`);
  }

  createp(data) {
    return http.post("/adjust_p", data);
  }

  getIDp() {
    return http.get("/adjust_p/last_id")
  }
}

export default new Adjustdataservice();