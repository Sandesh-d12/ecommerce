import axios from 'axios'

 export async function apiBase({apiDetails, path={}, query={}, body={}, headers={}}) {
  try {
    // console.log(body)
    Object.entries(path).map((data)=>{
      apiDetails.url= (apiDetails.url).replace(`:${data[0]}`, data[1]);
  })
  console.log(apiDetails)
    const instance = axios.create({
      baseURL: "http://localhost:5001/api/",
      timeout: 5000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': 'origin-list',
        ...headers
    }
    });
    console.log(apiDetails)

    const res = await instance({
        url: apiDetails.url,
        method: apiDetails.method,
        data: body,
        params:query
      })
      return res
  } catch (err) {
    throw err;
  }
}

// export default apiBase;