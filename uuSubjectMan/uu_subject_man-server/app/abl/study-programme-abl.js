"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/study-programme-error.js");
const { ObjectId } = require("uu_appg01_server");

const {States} = require("../config/states.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  assgnSubjectUnsupportedKeys: {
    code: `${Errors.AssignSubject.UC_CODE}unsupportedKeys`
  },
  removeSubjectUnsupportedKeys: {
    code: `${Errors.RemoveSubject.UC_CODE}unsupportedKeys`
  },
  listSubjectUnsupportedKeys: {
    code: `${Errors.ListSubjectByStudyProgrammeId.UC_CODE}unsupportedKeys`
  }
};

class StudyProgrammeAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("studyProgramme");
  }

  // creation of study programme
  async create(awid, dtoIn, session) {
    // HDS 2
    let validationResult = this.validator.validate("studyProgrammeCreateDtoInType", dtoIn);
    // HDS 2.2, 2.3 A 2.2.1, A. 2.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);


    let dtoOut;
    // HDS 3
    dtoIn.awid = awid;
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    dtoIn.state = States.INIT;

    dtoIn.subjects = [];

    try {
      dtoOut = await this.dao.create(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.StudyProgrammeDaoCreateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Create.StudyProgrammeCustomError({ uuAppErrorMap }, err);
    }
    // HDS 4
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  // list study programme
  async list(awid, dtoIn, getAuthorizationResult) {
    let uuAppErrorMap = {};
    let dtoOut;

    console.debug(dtoIn);

    try {
      dtoOut = await this.dao.list(awid);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.List.StudyProgrammeDaoListFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.List.StudyProgrammeCustomError({ uuAppErrorMap }, err);

    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

  // get study programme by its id
  async get(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("studyProgrammeGetDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.getUnsupportedKeys.code, Errors.Get.InvalidDtoIn);

    let dtoOut;

    try {
      dtoOut = await this.dao.get(dtoIn.id);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Get.StudyProgrammeDaoGetFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Get.StudyProgrammeCustomError({ uuAppErrorMap }, err);

    }

    if (!dtoOut)
      throw new Errors.Get.StudyProgrammeDoNotExist({ uuAppErrorMap });

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

  // update study programme
  async update(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("studyProgrammeUpdateDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.updateUnsupportedKeys.code, Errors.Update.InvalidDtoIn);

    let dtoOut
    try {
      dtoOut = await this.dao.update(dtoIn);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.StudyProgrammeDaoUpdateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Update.StudyProgrammeCustomError({ uuAppErrorMap }, err);

    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  // assign subject to study programme
  async assignSubject(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("assignSubjectDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.assgnSubjectUnsupportedKeys.code, Errors.AssignSubject.InvalidDtoIn);

    let readStdProg;

    try {
      readStdProg = await this.dao.get(dtoIn.id);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.AssignSubject.SubjectGetFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.AssignSubject.StudyProgrammeCustomError({ uuAppErrorMap }, err);
    }

    if (!readStdProg)
      throw new Errors.AssignSubject.StudyProgrammeDoesntExistFailed({ uuAppErrorMap });

    if (readStdProg.subjects.find(element => element.subjectId === dtoIn.subjectId) === dtoIn.subjectId)
      throw new Errors.AssignSubject.SubjecAlreadyAssignedToStudyProgFailed({ uuAppErrorMap });

    readStdProg.subjects.push({
      subjectId: dtoIn.subjectId,
      semester: dtoIn.semester
    });

    let dtoOut
    try {
      dtoOut = await this.dao.update(readStdProg)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.AssignSubject.SubjectDaoUpdateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.AssignSubject.StudyProgrammeCustomError({ uuAppErrorMap }, err);
    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  // unassign subject from study programme
  async removeSubject(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("removeSubjectProgrameDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.removeSubjectUnsupportedKeys.code, Errors.RemoveSubject.InvalidDtoIn);

    let readStdProg;

    try {
      readStdProg = await this.dao.get(dtoIn.id);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.RemoveSubject.SubjectGetFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.RemoveSubject.StudyProgrammeCustomError({ uuAppErrorMap }, err);

    }

    if (!readStdProg)
      throw new Errors.RemoveSubject.StudyProgrammeDoesntExistFailed({ uuAppErrorMap });

    const foundSubject = readStdProg.subjects.findIndex(element => element.subjectId === dtoIn.subjectId)

    if (foundSubject < 0)
      throw new Errors.RemoveSubject.SubjecNotAssignedToStudyProgFailed({ uuAppErrorMap });

    readStdProg.subjects.splice(foundSubject, 1);

    let dtoOut
    try {
      dtoOut = await this.dao.update(readStdProg)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.RemoveSubject.SubjectDaoUpdateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.RemoveSubject.StudyProgrammeCustomError({ uuAppErrorMap }, err);

    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  // list subject by study programme id
  async listSubjectByStudyProgrammeId(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("listSubjectByStudyProgrammeIdDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.listSubjectUnsupportedKeys.code, Errors.ListSubjectByStudyProgrammeId.InvalidDtoIn);

    let dtoOut = {};

    try {
      dtoOut.itemList = await this.dao.getSubjectsByStudyProgrammeId(dtoIn.id);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.ListSubjectByStudyProgrammeId.SubjectListByStudyProgrammeGetFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.ListSubjectByStudyProgrammeId.StudyProgrammeCustomError({ uuAppErrorMap }, err);

    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

}

module.exports = new StudyProgrammeAbl();
