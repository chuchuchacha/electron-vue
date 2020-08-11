import http from "../http-common";

class Purchase_p_productdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/purchase_p_products");
  }

  get(id) {
    return http.get(`/purchase_p_products/${id}`);
  }

  gettype(type) {
    return http.get(`/purchase_p_products/${type}`);
  }

  create(data) {
    console.log(data)
    return http.post("/purchase_p_products", data);
  }

  update(id, data) {
    return http.put(`/purchase_p_products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/purchase_p_products/${id}`);
  }

  deleteAll() {
    return http.delete(`/purchase_p_products`);
  }

  findByTitle(purchase_id) {
    return http.get(`/purchase_p_products?purchase_id=${purchase_id}`);
  }
}

export default new Purchase_p_productdataservice();