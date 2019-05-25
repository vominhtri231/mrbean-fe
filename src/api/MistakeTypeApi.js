import ApiCaller from "./ApiCaller";

const baseUrl = "mistakeType";

class MistakeTypeApi {
  static getAll() {
    return ApiCaller.get(`${baseUrl}`);
  }

  static create(name, description) {
    return ApiCaller.post(`${baseUrl}`, {
      name: name,
      description: description
    })
  }

  static update(id, name, description) {
    return ApiCaller.update(`${baseUrl}`, {
      id: id,
      name: name,
      description: description
    })
  }

  static delete(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`)
  }
}

export default MistakeTypeApi;