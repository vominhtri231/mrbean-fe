const apiUrl = "http://localhost:8080/api/";

class ApiCaller {
  static post(url, body) {
    return this.sendRequest(url, body, "POST")
  }

  static update(url, body) {
    return this.sendRequest(url, body, "PUT")
  }

  static get(url, body) {
    return this.sendRequest(url, body, "GET")
  }

  static delete(url, body) {
    return this.sendRequest(url, body, "DELETE")
  }

  static sendRequest(url, body, method) {
    return fetch(apiUrl + url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined
    }).then(rawResult => rawResult.json())
      .then(result => {
        if (result.error) {
          return Promise.reject({error: result.message})
        }
        return Promise.resolve({data: result})
      })
  }
}

export default ApiCaller;
