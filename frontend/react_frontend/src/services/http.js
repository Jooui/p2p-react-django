import axios from "axios";
import { DJANGO_URL } from "common/config";
import JwtService from "./jwt.service";


//esta funcion crea el baseURL y si le indicamos que es seguro añade el token de local storage
export default function createHttp(secured = true) {
  if (secured) {
    return axios.create({
      headers: { "Authorization": `Token ${JwtService.getToken()}` },
      baseURL: DJANGO_URL
    });
  } else {
    return axios.create({
      baseURL: DJANGO_URL
    });
  }
}