import http from "../http-common";

class Plantdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/plants");
  }

  getBigID() {
    return http.get("/plants/max")
  }

  get(id) {
    return http.get(`/plants/${id}`);
  }

  create(data) {
    console.log(data)
    return http.post("/plants", data);
  }

  update(id, data) {
    return http.put(`/plants/${id}`, data);
  }

  delete(id) {
    return http.delete(`/plants/${id}`);
  }
}

export default new Plantdataservice();