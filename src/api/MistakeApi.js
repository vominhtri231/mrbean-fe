import ApiCaller from "./ApiCaller";

const baseUrl = "mistake";

class MistakeApi {
  static getAllOfKlass(klassId) {
    return ApiCaller.get(`${baseUrl}?klassId=${klassId}`);
  }

  static getAllOfKlassAndStudent(klassId, studentId) {
    return ApiCaller.get(`${baseUrl}/student?klassId=${klassId}&studentId=${studentId}`);
  }

  static create(studentId, mistakeTypeId, lessonId) {
    return ApiCaller.post(`${baseUrl}`, {
      student: {
        id: studentId
      },
      mistakeType: {
        id: mistakeTypeId
      },
      lesson: {
        id: lessonId
      }
    })
  }

  static update(id, studentId, mistakeTypeId, lessonId) {
    return ApiCaller.update(`${baseUrl}`, {
      id: id,
      student: {
        id: studentId
      },
      mistakeType: {
        id: mistakeTypeId
      },
      lesson: {
        id: lessonId
      }
    })
  }

  static delete(id) {
    ApiCaller.delete(`${baseUrl}/${id}`)
  }
}

export default MistakeApi;