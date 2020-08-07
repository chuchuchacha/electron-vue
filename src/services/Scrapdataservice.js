import http from "../http-common";

class Scrapdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/scrap");
  }

  get(id) {
    return http.get(`/scrap/${id}`);
  }

  create(data) {
    return http.post("/scrap", data);
  }

  getID() {
    return http.get("/scrap/last_id")
  }
}

export default new Scrapdataservice();