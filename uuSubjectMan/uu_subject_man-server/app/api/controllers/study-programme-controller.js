"use strict";
const StudyProgrammeAbl = require("../../abl/study-programme-abl.js");

class StudyProgrammeController {

  listSubjectByStudyProgrammeId(ucEnv) {
    return StudyProgrammeAbl.listSubjectByStudyProgrammeId(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return StudyProgrammeAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return StudyProgrammeAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    return StudyProgrammeAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return StudyProgrammeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  removeSubject(ucEnv) {
    return StudyProgrammeAbl.removeSubject(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  
  assignSubject(ucEnv) {
    return StudyProgrammeAbl.assignSubject(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new StudyProgrammeController();
