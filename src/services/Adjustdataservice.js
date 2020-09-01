import http from "../http-common";

class Adjustdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/Adjusts");
  }

  getBigID() {
    return http.get("/Adjusts/max")
  }

  get(id) {
    return http.get(`/Adjusts/${id}`);
  }

  create(data) {
    console.log(data)
    return http.post("/Adjusts", data);
  }

  update(id, data) {
    return http.put(`/Adjusts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Adjusts/${id}`);
  }
}

export default new Adjustdataservice();