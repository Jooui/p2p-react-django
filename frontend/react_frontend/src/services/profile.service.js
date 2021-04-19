import ApiService from "./api.service";

const ProfileService = {
  update(params) {
    return new Promise((resolve) => {
      ApiService.auth()
      ApiService.put("user", params)
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve(response.data));
    });
  },

  getProfile(username) {
    return new Promise((resolve) => {
      ApiService.get("profile/"+username)
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve(response));
    });
  },

  getProfiles(username) {
    return new Promise((resolve) => {
      ApiService.get("profiles/"+username)
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve(response));
    });
  },

  follow(username) {
    return new Promise((resolve) => {
      ApiService.auth()
      ApiService.post(`profiles/${username}/follow`)
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve(response));
    });
  },

  unfollow(username) {
    return new Promise((resolve) => {
      ApiService.auth()
      ApiService.delete(`profiles/${username}/follow`)
        .then(({ data }) => resolve(data))
        .catch(({ response }) => resolve(response));
    });
  }
  
};

export default ProfileService;
