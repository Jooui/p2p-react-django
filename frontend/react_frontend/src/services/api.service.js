import createHttp from './http'

let http = createHttp(false);

const ApiService = {

  //se llama cuando quieres alguna petición con usuario (envia el token por headers)
  auth(){
    http = createHttp(true);
  },

  query(resource, params) {
    return http.get(resource, params).catch(error => {
      throw new Error(`[RVD] ApiService ${error}`);
    });
  },

  get(resource, slug = "") {
    return http.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RVD] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return http.post(`${resource}`, params)
  },

  update(resource, slug, params) {
    return http.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return http.put(`${resource}`, params);
  },

  delete(resource) {
    return http.delete(resource).catch(error => {
      throw new Error(`[RVD] ApiService ${error}`);
    });
  }
};

export default ApiService;