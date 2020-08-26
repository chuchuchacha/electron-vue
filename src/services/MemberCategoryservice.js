import http from "../http-common";

class MemberCategoryservice {
  create(data) {
    return http.post("/member_categories", data);
  }

  getAll() {
    //return http.get("/tutorials");
    return http.get("/member_categories/");
  }

  getBigID() {
    return http.get("/member_categories/max/")
  }

  get(id) {
    return http.get(`/member_categories/${id}`);
  }

  update(id, data) {
    return http.put(`/member_categories/${id}`, data);
  }

  delete(id) {
    return http.delete(`/member_categories/${id}`);
  }
}

export default new MemberCategoryservice();