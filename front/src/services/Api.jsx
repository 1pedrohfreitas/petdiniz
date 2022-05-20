import axios from "axios"

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('petdiniz-token')}`
  }
});
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
export function getBaseURL(){
  return `https://api.net-apps.info/api/v1/`
}
export function getStaticFilesUrl(){
  return`${getBaseURL()}static/`
}

export function getRequest(url) {
  return api.get(url)
}

export function postRequest(url, data) {
    return api.post(url, data)
}
export function putRequest(url, data) {
  return api.put(url, data)
}

export function deleteRequest(url, id) {
  return api.delete(`${url}${id}`)
}