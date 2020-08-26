import http from "../http-common";

class Supplierdataservice {
  create(data) {
    console.log(data)
    return http.post("/suppliers", data);
  }

  getAll() {
    return http.get("/suppliers/");
  }

  getBigID() {
    return http.get("/suppliers/max/")
  }

  get(id) {
    return http.get(`/suppliers/${id}`);
  }

  update(id, data) {
    return http.put(`/suppliers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/suppliers/${id}`);
  }
}

export default new Supplierdataservice();