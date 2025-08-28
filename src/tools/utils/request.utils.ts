import axios from "axios"
export const createRequest = () => {
  const instance = axios.create({
    headers: {
      Pragma: "no-cache",
      Authorization: process.env.TOKEN_172 || "",
    },
  })
  instance.defaults.baseURL = "https://haokaapi.lot-ml.com/api/"
  return instance
}
