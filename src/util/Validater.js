import appConstants from "./appConstants";

class Validater {

  static validateHomework(name, questions) {
    const validateResult = appConstants.validateResult;
    if (Validater.isEmpty(name)) return "Name" + validateResult.empty;
    if (Validater.isEmpty(questions)) return "Need at least one question";
  }

  static validateLesson(lessonNumber, description, content,) {
    const validateResult = appConstants.validateResult;
    if (Validater.isEmpty(lessonNumber)) return "Lesson number" + validateResult.empty;
    if (Validater.isNotNumber(lessonNumber)) return "Lesson number " + validateResult.notNumber;
    if (Validater.isEmpty(description)) return "Description" + validateResult.empty;
    if (Validater.isEmpty(content)) return "Content" + validateResult.empty;
  }

  static validateAddLesson(selectedStudents) {
    const validateResult = appConstants.validateResult;
    if (Validater.isEmpty(selectedStudents)) return "Selected students" + validateResult.empty;
  }

  static validateKlass(name, description, chosenTeacherId, files) {
    const validateResult = appConstants.validateResult;
    if (Validater.isEmpty(name)) return "Name" + validateResult.empty;
    if (Validater.isEmpty(description)) return "Description" + validateResult.empty;
    if (!chosenTeacherId) return "Teacher" + validateResult.mustChoice;
    if (Validater.isInvalidFile(files)) return "List student" + validateResult.mustChoice;
  }

  static validateMistake(student, lesson, mistakeType) {
    const validateResult = appConstants.validateResult;
    if (!student) return "Student" + validateResult.mustChoice;
    if (!lesson) return "Lesson" + validateResult.mustChoice;
    if (!mistakeType) return "Mistake type" + validateResult.mustChoice;
  }

  static validateMistakeRule(standard, mistakeTypeId, threshold) {
    const validateResult = appConstants.validateResult;
    if (!standard) return "Standard" + validateResult.mustChoice;
    if (!mistakeTypeId) return "Mistake type" + validateResult.mustChoice;
    if (!Validater.isPercent(threshold)) return "Threshold " + validateResult.mustPercent;
  }

  static validateMistakeType(name, description) {
    const validateResult = appConstants.validateResult;
    if (Validater.isEmpty(name)) return "Name" + validateResult.empty;
    if (Validater.isEmpty(description)) return "Description" + validateResult.empty;
  }

  static validateLogin(email, password) {
    const validateResult = appConstants.validateResult;
    if (Validater.isEmpty(email)) return "Email" + validateResult.empty;
    if (!Validater.isEmail(email)) return "Email" + validateResult.notEmail;
    if (Validater.isEmpty(password)) return "Password" + validateResult.empty;
  }

  static validateUser(role, email, name, phoneNumber, workspace) {
    const validateResult = appConstants.validateResult;
    if (Validater.isEmpty(email)) return "Email" + validateResult.empty;
    if (!Validater.isEmail(email)) return "Email" + validateResult.notEmail;
    if (Validater.isEmpty(name)) return "Name" + validateResult.empty;
    if (role !== appConstants.roles.Admin) {
      if (Validater.isEmpty(phoneNumber)) return "Phone number" + validateResult.empty;
      if (Validater.isNotNumber(phoneNumber)) return "Phone number" + validateResult.notNumber;
      if (role !== appConstants.roles.Teacher) {
        if (Validater.isEmpty(workspace)) return "Workspace" + validateResult.empty;
      }
    }
  }

  static isEmpty(value) {
    return !value || value.length === 0;
  }

  static isNotNumber(value) {
    return !/^[0-9]+$/.exec(value)
  }

  static isInvalidFile(files) {
    return !files || !files[0]
  }

  static isPercent(value) {
    return value <= 100 && value >= 0;
  }

  static isEmail(value) {
    return /\S+@\S+\.\S+/.exec(value);
  }
}

export default Validater;