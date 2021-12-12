"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  }
};
const AUTHORITIES_PROFILE = "Authorities"

class SubjectAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
  }

  async create(awid, dtoIn, session, authorizationResult) {
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
    dtoIn.state = "init";
    // HDS 4
    dtoIn.studyProgrammeIds = [];
    // HDS 5
    try {
      dtoOut = await this.dao.create(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.SubjectDaoCreateFailed({ uuAppErrorMap }, err);
      }
      return err
    }
    // HDS 6
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  async list(awid, dtoIn) {

    // HDS 1
    let validationResult = this.validator.validate("subjectListDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    let dtoOut;

    try {
      dtoOut = await this.dao.list(dtoIn.studyProgrammeId);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Get.SubjectGetFailed({ uuAppErrorMap }, err);
      }
      return err
    }

    if (!dtoOut)
      throw new Errors.Get.SubjectGetDontExist({ uuAppErrorMap });

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

  async get(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    let dtoOut;

    try {
      dtoOut = await this.dao.get(dtoIn.id);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Get.SubjectGetFailed({ uuAppErrorMap }, err);
      }
      return err
    }

    if (!dtoOut)
      throw new Errors.Get.SubjectGetDontExist({ uuAppErrorMap });

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut
  }

  async update(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("subjectUpdateDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Update.InvalidDtoIn);

    let dtoOut
    try {
      dtoOut = await this.dao.update(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.SubjectDaoUpdateFailed({ uuAppErrorMap }, err);
      }
      return err
    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

}

module.exports = new SubjectAbl();
