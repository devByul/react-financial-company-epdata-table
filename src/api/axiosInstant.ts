import axios from "axios";

class AxiosInstance {
  private TIME_OUT = 60 * 1000;

  public BASE_URL = "http://localhost:4500/api";

  public API = axios.create({
    baseURL: this.BASE_URL,
    timeout: this.TIME_OUT,
    headers: {
      common: { ["Content-Type"]: "application/json; charset=UTF-8" },
    },
  });
}

export default AxiosInstance;
