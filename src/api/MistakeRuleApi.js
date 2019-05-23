import ApiCaller from "./ApiCaller";

const baseUrl = "mistakeRule";

class MistakeRuleApi {
  static getAll() {
    return ApiCaller.get(`${baseUrl}`);
  }

  static create(mistakeStandard, mistakeTypeId, threshold) {
    return ApiCaller.post(`${baseUrl}`, {
      mistakeStandard: mistakeStandard,
      mistakeType: {
        id: mistakeTypeId
      },
      threshold: threshold,
    })
  }

  static update(id, mistakeStandard, mistakeTypeId, threshold, number) {
    return ApiCaller.update(`${baseUrl}`, {
      id: id,
      mistakeStandard: mistakeStandard,
      mistakeType: {
        id: mistakeTypeId
      },
      threshold: threshold,
      number: number
    })
  }

  static delete(id) {
    ApiCaller.delete(`${baseUrl}/${id}`)
  }
}

export default MistakeRuleApi;