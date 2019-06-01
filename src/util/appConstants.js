export default Object.freeze({
  roles: {
    Admin: {id: 1, authority: "admin"},
    Teacher: {id: 2, authority: "teacher"},
    Student: {id: 3, authority: "student"},
  },
  modes: {
    Admin: "admin",
    Teacher: "teacher",
    Student: "student",
  },
  mistakeStandards: [
    "CompleteRate",
    "AccuracyRate",
  ],
  validateResult:{
    empty:" must not empty",
    notNumber:" is not a positive number",
    mustChoice:" must be chosen",
    mustPercent:" must between 0 and 1000",
    notEmail:"is not an email's format",
  },
  excelType: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
  basicAccessToken: "bXktY2xpZW50Om15LXNlY3JldA==",
})
