"use strict";
const SubjectManAbl = require("../../abl/subject-man-abl.js");

class SubjectManController {

  load(ucEnv) { 
    return SubjectManAbl.load(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }
  init(ucEnv) {
    return SubjectManAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubjectManController();
