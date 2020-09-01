import http from "../http-common";

class Disposedataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/Disposes");
  }

  getBigID() {
    return http.get("/Disposes/max")
  }

  get(id) {
    return http.get(`/Disposes/${id}`);
  }

  create(data) {
    console.log(data)
    return http.post("/Disposes", data);
  }

  update(id, data) {
    return http.put(`/Disposes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Disposes/${id}`);
  }
}

export default new Disposedataservice();