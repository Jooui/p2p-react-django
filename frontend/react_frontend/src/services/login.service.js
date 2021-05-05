import ApiService from "./api.service";

const LoginService = {
  login(params) {
    return new Promise((resolve) => {
      ApiService.post("users/login", params)
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve( response ? response.data : {errors:"Server Error 500"}));
    });
  },

  register(params) {
    return new Promise((resolve) => {
      ApiService.post("users", params)
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve( response ? response.data : {errors:"Server Error 500"}));
    });
  },

  getLoggedUser() {
    return new Promise((resolve) => {
      ApiService.auth()
      ApiService.get("user")
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve(response));
    });
  }
  
};

export default LoginService;
