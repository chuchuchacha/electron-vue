// import http from "../http-common";

// class Harvestdataservice {
//   getAll() {
//     //return http.get("/tutorials");
//     return http.get("/Harvests");
//   }

//   getBigID() {
//     return http.get("/Harvests/BigID/BigID")
//   }

//   get(id) {
//     return http.get(`/Harvests/${id}`);
//   }

//   gettype(type) {
//     return http.get(`/Harvests/${type}`);
//   }

//   create(data) {
//     console.log(data)
//     return http.post("/Harvests", data);
//   }

//   update(id, data) {
//     return http.put(`/Harvests/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/Harvests/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/Harvests`);
//   }

//   findByTitle(harvest_id) {
//     return http.get(`/Harvests?harvest_id=${harvest_id}`);
//   }
// }

// export default new Harvestdataservice();