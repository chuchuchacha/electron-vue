// import http from "../http-common";

// class Harvest_p_productdataservice {
//   getAll() {
//     //return http.get("/tutorials");
//     return http.get("/harvest_p_products");
//   }

//   get(id) {
//     return http.get(`/harvest_p_products/${id}`);
//   }

//   gettype(type) {
//     return http.get(`/harvest_p_products/${type}`);
//   }

//   create(data) {
//     console.log(data)
//     return http.post("/harvest_p_products", data);
//   }

//   update(id, data) {
//     return http.put(`/harvest_p_products/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/harvest_p_products/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/harvest_p_products`);
//   }

//   findByTitle(harvest_id) {
//     return http.get(`/harvest_p_products?harvest_id=${harvest_id}`);
//   }
// }

// export default new Harvest_p_productdataservice();