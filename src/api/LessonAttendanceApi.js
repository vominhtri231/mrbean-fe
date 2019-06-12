import ApiCaller from "./ApiCaller";

const baseUrl = "lessonAttendance";

class LessonAttendanceApi {
  static getAllOfLesson(lessonId) {
    return ApiCaller.get(`${baseUrl}?lessonId=${lessonId}`);
  }

  static getAllOfKlass(klassId) {
    return ApiCaller.get(`${baseUrl}/klass?klassId=${klassId}`);
  }

  static update(lessonAttendances) {
    return ApiCaller.update(`${baseUrl}`, lessonAttendances)
  }
}

export default LessonAttendanceApi;
