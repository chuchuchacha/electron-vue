import http from "../http-common";

class Harvestdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/Harvests");
  }

  getBigID() {
    return http.get("/Harvests/max")
  }

  get(id) {
    return http.get(`/Harvests/${id}`);
  }

  create(data) {
    console.log(data)
    return http.post("/Harvests", data);
  }

  update(id, data) {
    return http.put(`/Harvests/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Harvests/${id}`);
  }
}

export default new Harvestdataservice();