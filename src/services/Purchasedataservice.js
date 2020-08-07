import http from "../http-common";

class Purchasedataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/purchase");
  }

  get(id) {
    return http.get(`/purchase/${id}`);
  }

  create(data) {
    return http.post("/purchase", data);
  }

  getID() {
    return http.get("/purchase/last_id")
  }
}

export default new Purchasedataservice();