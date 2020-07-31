import http from "../http-common";

class Supplierdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/suppliers");
  }

  get(id) {
    return http.get(`/suppliers/${id}`);
  }

  gettype(type) {
    return http.get(`/suppliers/${type}`);
  }

  create(data) {
    return http.post("/suppliers", data);
  }

  update(id, data) {
    console.log('nooo')
    return http.put(`/suppliers/${id}`, data);
  }

  delete(id) {
    return http.delete(`/suppliers/${id}`);
  }

  deleteAll() {
    return http.delete(`/suppliers`);
  }

  findByTitle(supplier_id) {
    return http.get(`/suppliers?supplier_id=${supplier_id}`);
  }
}

export default new Supplierdataservice();