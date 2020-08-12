import http from "../http-common";

class Disposedataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/Disposes");
  }

  getBigID() {
    return http.get("/Disposes/BigID/BigID")
  }

  get(id) {
    return http.get(`/Disposes/${id}`);
  }

  gettype(type) {
    return http.get(`/Disposes/${type}`);
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

  deleteAll() {
    return http.delete(`/Disposes`);
  }

  findByTitle(dispose_id) {
    return http.get(`/Disposes?dispose_id=${dispose_id}`);
  }
}

export default new Disposedataservice();