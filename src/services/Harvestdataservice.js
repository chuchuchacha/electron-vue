import http from "../http-common";

class Harvestdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/harvest");
  }

  get(id) {
    return http.get(`/harvest/${id}`);
  }

  create(data) {
    return http.post("/harvest", data);
  }

  getID() {
    return http.get("/harvest/last_id")
  }
}

export default new Harvestdataservice();