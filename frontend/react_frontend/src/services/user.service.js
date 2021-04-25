import ApiService from "./api.service";

const UserService = {

  getUsers() {
    return new Promise((resolve) => {
      ApiService.get("users/all")
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve(response));
    });
  },

  
};

export default UserService;
