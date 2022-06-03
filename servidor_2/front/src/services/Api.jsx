import axios from "axios";

const api = axios.create({
  baseURL: getBaseURL()
});

export function getBaseURL() {
  return `https://petsdiniz-api.net-apps.info/api/v1/`
  // return `http://localhost:5000/api/v1/`
}
export function getStaticFilesUrl() {
  return `${getBaseURL()}static/`
}

export function loginApi(url, data){
  return api.post(url, data);
}

export function getUserDataApi(id, usertoken){
  return axios.get(`${getBaseURL()}users/${id}`,{
    headers : {
      'Authorization': `Bearer ${usertoken}`
    }
  });
}

export async function getRequest(url,token) {
  if (localStorage.getItem('petdiniz-token') != null) {
    return await api.get(url,{
      headers : {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}

export async function postRequest(url, data,token) {
  if (localStorage.getItem('petdiniz-token') != null) {
    return await api.post(url, data,{
      headers : {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
export async function putRequest(url, data,token) {
  if (localStorage.getItem('petdiniz-token') != null) {
    return await api.put(url, data,{
      headers : {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}

export async function deleteRequest(url, id,token) {
  if (localStorage.getItem('petdiniz-token') != null) {
    return await api.delete(`${url}${id}`,{
      headers : {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}