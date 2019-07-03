import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  let token = Cookies.get(TokenKey);
  if(typeof token == "string" && token == "undefined"){
    token = "";
  }
  return token;
}

export function setToken(token) {
  if(typeof token == "string" && token == "undefined"){
    token = "";
  }
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
