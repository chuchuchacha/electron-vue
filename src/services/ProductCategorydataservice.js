import http from "../http-common";

class ProductCategorydataservice {

  create(data) {
    return http.post("/product_categories/", data);
  }

  getAll() {
    //return http.get("/tutorials");
    return http.get("/product_categories/");
  }

  get(id) {
    return http.get(`/product_categories/${id}`);
  }

  update(id, data) {
    return http.put(`/product_categories/${id}`, data);
  }

  delete(id) {
    return http.delete(`/product_categories/${id}`);
  }

  getBigID() {
    return http.get("/product_categories/max/")
  }
}

export default new ProductCategorydataservice();