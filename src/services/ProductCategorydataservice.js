import http from "../http-common";

class Productdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/product_category");
  }

  getBigID() {
    return http.get("/product_category/BigID/BigID")
  }

  get(id) {
    return http.get(`/product_category/${id}`);
  }

  gettype(type) {
    return http.get(`/product_category/${type}`);
  }

  create(data) {
    return http.post("/product_category", data);
  }

  update(id, data) {
    console.log(id,data)
    return http.put(`/product_category/${id}`, data);
  }

  delete(id) {
    return http.delete(`/product_category/${id}`);
  }

  deleteAll() {
    return http.delete(`/product_category`);
  }

  findByTitle(product_category_id) {
    return http.get(`/product_category?product_category_id=${product_category_id}`);
  }
}

export default new Productdataservice();