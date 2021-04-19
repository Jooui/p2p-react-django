import ApiService from "./api.service";

const LoginService = {
  login(params) {
    return new Promise((resolve) => {
      ApiService.post("users/login", params)
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve(response.data));
    });
  },

  register(params) {
    return new Promise((resolve) => {
      ApiService.post("users", params)
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve(response));
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
