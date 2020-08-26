// import http from "../http-common";

// class Adjustdataservice {
//   getAll() {
//     //return http.get("/tutorials");
//     return http.get("/Adjusts");
//   }

//   getBigID() {
//     return http.get("/Adjusts/BigID/BigID")
//   }

//   get(id) {
//     return http.get(`/Adjusts/${id}`);
//   }

//   gettype(type) {
//     return http.get(`/Adjusts/${type}`);
//   }

//   create(data) {
//     console.log(data)
//     return http.post("/Adjusts", data);
//   }

//   update(id, data) {
//     return http.put(`/Adjusts/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/Adjusts/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/Adjusts`);
//   }

//   findByTitle(adjust_id) {
//     return http.get(`/Adjusts?adjust_id=${adjust_id}`);
//   }
// }

// export default new Adjustdataservice();