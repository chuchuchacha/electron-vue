import http from "../http-common";

class Productdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/products");
  }

  getBigID() {
    return http.get("/products/BigID/BigID")
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  gettype(type) {
    return http.get(`/products/${type}`);
  }

  create(data) {
    console.log('create')
    return http.post("/products", data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }

  findByTitle(product_id) {
    return http.get(`/products?product_id=${product_id}`);
  }
}

export default new Productdataservice();