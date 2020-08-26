// import http from "../http-common";

// class Adjust_p_productdataservice {
//   getAll() {
//     //return http.get("/tutorials");
//     return http.get("/adjust_p_products");
//   }

//   get(id) {
//     return http.get(`/adjust_p_products/${id}`);
//   }

//   gettype(type) {
//     return http.get(`/adjust_p_products/${type}`);
//   }

//   create(data) {
//     console.log(data)
//     return http.post("/adjust_p_products", data);
//   }

//   update(id, data) {
//     return http.put(`/adjust_p_products/${id}`, data);
//   }

//   delete(id) {
//     return http.delete(`/adjust_p_products/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/adjust_p_products`);
//   }

//   findByTitle(adjust_id) {
//     return http.get(`/adjust_p_products?adjust_id=${adjust_id}`);
//   }
// }

// export default new Adjust_p_productdataservice();