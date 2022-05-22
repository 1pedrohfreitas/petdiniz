import axios from "axios"

const api = axios.create({
  baseURL: getBaseURL()
});

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('petdiniz-token')}`

export function getBaseURL() {
  return `http://api.petdiniz.net-apps.info/api/v1/`
}
export function getStaticFilesUrl() {
  return `${getBaseURL()}static/`
}

export function loginApi(url, data){
  return api.post(url, data);
}

export async function getRequest(url) {
  if (localStorage.getItem('petdiniz-token') != null) {
    return await api.get(url)
  }
}

export async function postRequest(url, data) {
  if (localStorage.getItem('petdiniz-token') != null) {
    return await api.post(url, data)
  }
}
export async function putRequest(url, data) {
  if (localStorage.getItem('petdiniz-token') != null) {
    return await api.put(url, data)
  }
}

export async function deleteRequest(url, id) {
  if (localStorage.getItem('petdiniz-token') != null) {
    return await api.delete(`${url}${id}`)
  }
}