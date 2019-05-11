import ApiCaller from "./ApiCaller"

const baseUrl = "klassTemplate";

class KlassTemplateApi {
  static createKlassTemplate(name) {
    return ApiCaller.post(`${baseUrl}`, {
      "name": name,
    })
  }

  static getKlassTemplates() {
    return ApiCaller.get(`${baseUrl}`)
  }

  static updateKlassTemplate(id, name) {
    return ApiCaller.update(`${baseUrl}`, {
      "id": id,
      "name": name,
    })
  }

  static deleteKlassTemplate(id) {
    return ApiCaller.delete(`${baseUrl}/${id}`)
  }
}

export default KlassTemplateApi