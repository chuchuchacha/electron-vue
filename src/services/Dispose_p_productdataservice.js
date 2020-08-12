import http from "../http-common";

class Dispose_p_productdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/dispose_p_products");
  }

  get(id) {
    return http.get(`/dispose_p_products/${id}`);
  }

  gettype(type) {
    return http.get(`/dispose_p_products/${type}`);
  }

  create(data) {
    console.log(data)
    return http.post("/dispose_p_products", data);
  }

  update(id, data) {
    return http.put(`/dispose_p_products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/dispose_p_products/${id}`);
  }

  deleteAll() {
    return http.delete(`/dispose_p_products`);
  }

  findByTitle(dispose_id) {
    return http.get(`/dispose_p_products?dispose_id=${dispose_id}`);
  }
}

export default new Dispose_p_productdataservice();