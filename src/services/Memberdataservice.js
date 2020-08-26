import http from "../http-common";

class Memberdataservice {
  create(data) {
    return http.post("/members", data);
  }

  getAll() {
    //return http.get("/tutorials");
    return http.get("/members/");
  }

  getBigID() {
    return http.get("/members/max/")
  }

  get(id) {
    return http.get(`/members/${id}`);
  }

  update(id, data) {
    return http.put(`/members/${id}`, data);
  }

  delete(id) {
    return http.delete(`/members/${id}`);
  }
}

export default new Memberdataservice();