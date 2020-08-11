import http from "../http-common";

class Purchasedataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/purchases");
  }

  getBigID() {
    return http.get("/purchases/BigID/BigID")
  }

  get(id) {
    return http.get(`/purchases/${id}`);
  }

  gettype(type) {
    return http.get(`/purchases/${type}`);
  }

  create(data) {
    console.log(data)
    return http.post("/purchases", data);
  }

  update(id, data) {
    return http.put(`/purchases/${id}`, data);
  }

  delete(id) {
    return http.delete(`/purchases/${id}`);
  }

  deleteAll() {
    return http.delete(`/purchases`);
  }

  findByTitle(purchase_id) {
    return http.get(`/purchases?purchase_id=${purchase_id}`);
  }
}

export default new Purchasedataservice();