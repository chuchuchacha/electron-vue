import http from "../http-common";

class Memberdataservice {
  getAll() {
    //return http.get("/tutorials");
    return http.get("/members");
  }
  
  getMaxID() {
    return http.get("/members/BigID/BigID")
  }

  get(id) {
    return http.get(`/members/${id}`);
  }

  gettype(type) {
    return http.get(`/members/${type}`);
  }

  create(data) {
    return http.post("/members", data);
  }

  update(id, data) {
    return http.put(`/members/${id}`, data);
  }

  delete(id) {
    return http.delete(`/members/${id}`);
  }

  deleteAll() {
    return http.delete(`/members`);
  }

  findByTitle(member_id) {
    return http.get(`/members?member_id=${member_id}`);
  }
}

export default new Memberdataservice();