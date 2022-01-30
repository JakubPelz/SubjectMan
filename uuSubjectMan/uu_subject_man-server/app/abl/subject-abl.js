"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError, ObjectStore } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");
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
  }
};
const AUTHORITIES_PROFILE = "Authorities"

class SubjectAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
    this.studyProgrammeDao = DaoFactory.getDao("studyProgramme")
  }

  // create subject
  async create(awid, dtoIn, session) {
    // HDS 1
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    let dtoOut
    dtoIn.awid = awid
    // HDS 2
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    // HDS 3
    dtoIn.state = States.INIT;
    // HDS 5
    try {
      dtoOut = await this.dao.create(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.SubjectDaoCreateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Create.SubjectCustomError({ uuAppErrorMap }, err);

    }
    // HDS 6
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  // list all subjects
  async list(awid, dtoIn) {

    let uuAppErrorMap = {};
    let dtoOut;

    try {
      dtoOut = await this.dao.list();
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.List.SubjectListFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.List.SubjectCustomError({ uuAppErrorMap }, err);

    }

    //if (!dtoOut)
    // throw new Errors.List.SubjectListDoesntExist({ uuAppErrorMap });

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

  // get subject by its id
  async get(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.getUnsupportedKeys.code, Errors.Get.InvalidDtoIn);

    let dtoOut;

    try {
      dtoOut = await this.dao.get(dtoIn.id);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Get.SubjectGetFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Get.SubjectCustomError({ uuAppErrorMap }, err);
    }

    if (!dtoOut)
      throw new Errors.Get.SubjectGetDoesntExist({ uuAppErrorMap });

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

  // update subject
  async update(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("subjectUpdateDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.updateUnsupportedKeys.code, Errors.Update.InvalidDtoIn);

    let dtoOut
    try {
      dtoOut = await this.dao.update(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.SubjectDaoUpdateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Update.SubjectCustomError({ uuAppErrorMap }, err);
    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

}

module.exports = new SubjectAbl();
