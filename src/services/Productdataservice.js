import http from "../http-common";

class Productdataservice {
  
  create(data) {
    return http.post("/products", data);
  }

  getAll() {
    //return http.get("/tutorials");
    return http.get("/products/");
  }

  getBigID() {
    return http.get("/products/max/")
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  gettype(type) {
    return http.get(`/products?product_category_id=${type}`);
  }

  // findByTitle(product_id) {
  //   return http.get(`/products?product_id=${product_id}`);
  // }
}

export default new Productdataservice();