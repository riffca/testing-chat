export let isDevelopment = process.env.NODE_ENV === 'development' 

export function setUrl(url) {
  return this.isDevelopment ? 'http://localhost:3000/' + url  : '' + url
}

export async function request ( type='post', url = '', data = {}) {
  if(isDevelopment) {
    console.log(`req ->> ${url}`)
  }
  return axios({
    url: setUrl(url),
    method: type,
    data,
  }).then(res=>{
    if(isDevelopment) {
      console.log('<--', res)
    }
    return res.data
  })
}