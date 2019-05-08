import appConstants from "../util/appConstants";
import * as qs from "qs";

const baseUrl = "oauth";

class OauthApi {
  static login(email, password) {
    return fetch(`http://localhost:8080/api/${baseUrl}/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: `Basic ${appConstants.basicAccessToken}`,
        },
        body: qs.stringify({
          grant_type: 'password',
          username: `${email}`,
          password: `${password}`
        })
      }).then(rawResult => {
      const result = rawResult.json();
      return Promise.resolve(result)
    })
      .then(result => {
        if (result.error) {
          return Promise.reject({error: result.message})
        }
        return Promise.resolve({data: result});
      })
  }
}

export default OauthApi