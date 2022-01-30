"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");
const {States} = require("../config/states.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  },
  removeUnsupportedKeys: {
    code: `${Errors.Remove.UC_CODE}unsupportedKeys`
  },
  digitalContentAddUnsupportedKeys: {
    code: `${Errors.DigitalContentAdd.UC_CODE}unsupportedKeys`
  },
  digitalContentRemoveUnsupportedKeys: {
    code: `${Errors.DigitalContentRemove.UC_CODE}unsupportedKeys`
  },
};

//generates random id (custom uid generation for topic id - because topic is stored in array in topic);
function guid() {
  let s4 = () => {
    return Math.floor(((1 + Math.random()) * 0x10000) + Date.now())
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4();
}

class TopicAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("topic");
    this.subjectDao = DaoFactory.getDao("subject");
  }

  // create topic
  async create(awid, dtoIn, session) {
    // HDS 2
    let validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);
    // HDS 2.2, 2.3 A 2.2.1, A. 2.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    let dtoOut
    // HDS 3
    dtoIn.awid = awid
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.uuIdentityName = session.getIdentity().getName();
    dtoIn.state = States.INIT;
    dtoIn.digitalContents = [];

    try {
      if (!await this.subjectDao.get(dtoIn.subjectId))
        throw new Errors.Create.SubjectDoesntExist({ uuAppErrorMap });
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.SubjectFindFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Create.TopicCustomError({ uuAppErrorMap }, err);
    }
    // HDS 4
    try {
      dtoOut = await this.dao.create(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.TopicDaoCreateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Create.TopicCustomError({ uuAppErrorMap }, err);

    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  // list topics by subject id
  async list(awid, dtoIn) {
    //HDS 1.1
    let validationResult = this.validator.validate("topicListDtoInType", dtoIn);
    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.listUnsupportedKeys.code, Errors.List.InvalidDtoIn);
    let dtoOut;
    //HDS 3
    try {
      dtoOut = await this.dao.listBySubjectId(dtoIn.subjectId)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.List.TopicListFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.List.TopicCustomError({ uuAppErrorMap }, err);
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  // update topic
  async update(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("topicUpdateDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.updateUnsupportedKeys.code, Errors.Update.InvalidDtoIn);

    let dtoOut
    try {
      dtoOut = await this.dao.update(dtoIn)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.TopicDaoUpdateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Update.TopicCustomError({ uuAppErrorMap }, err);
    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  // remove topic
  async remove(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("topicRemoveDtoInType", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.removeUnsupportedKeys.code, Errors.Remove.InvalidDtoIn);
    let result = false;

    let dtoOut = {};
    try {
      await this.dao.remove(dtoIn.id);
      result = true;
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Remove.TopicDaoRemoveFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.Remove.TopicCustomError({ uuAppErrorMap }, err);
    }
    // HDS 5
    dtoOut.result = result;
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  // add digital content to subject
  async digitalContentAdd(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("digitalContentAdd", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.digitalContentAddUnsupportedKeys.code, Errors.DigitalContentAdd.InvalidDtoIn);

    let readTopic;

    try {
      readTopic = await this.dao.get(dtoIn.id);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.DigitalContentAdd.TopicGetFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.DigitalContentAdd.TopicCustomError({ uuAppErrorMap }, err);
    }

    if (!readTopic)
      throw new Errors.DigitalContentAdd.TopicDoesntExist({ uuAppErrorMap });

    readTopic.digitalContents.push({
      id: guid(),
      name: dtoIn.name,
      link: dtoIn.link,
      type: dtoIn.type
    });

    let dtoOut
    try {
      dtoOut = await this.dao.update(readTopic)
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.DigitalContentAdd.TopicDaoUpdateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.DigitalContentAdd.TopicCustomError({ uuAppErrorMap }, err);

    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  // remove digital content from subject 
  async digitalContentRemove(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("digitalContentRemove", dtoIn);
    // HDS 1.2, 1.3 A 1.2.1, A. 1.3.1
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.digitalContentRemoveUnsupportedKeys.code, Errors.DigitalContentRemove.InvalidDtoIn);

    let readTopic;

    try {
      readTopic = await this.dao.get(dtoIn.id);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.DigitalContentRemove.TopicGetFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.DigitalContentRemove.TopicCustomError({ uuAppErrorMap }, err);

    }

    if (!readTopic)
      throw new Errors.DigitalContentRemove.TopicDoesntExist({ uuAppErrorMap });

    const foundIndex = readTopic.digitalContents.findIndex(element => element.id === dtoIn.digitalContentId);

    if (foundIndex < 0)
      throw new Errors.DigitalContentRemove.DigitalContentDoesntExist({ uuAppErrorMap });

    readTopic.digitalContents.splice(foundIndex, 1);

    let dtoOut
    try {
      dtoOut = await this.dao.update(readTopic);
    }
    catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.DigitalContentRemove.TopicDaoUpdateFailed({ uuAppErrorMap }, err);
      }
      else
        throw new Errors.DigitalContentRemove.TopicCustomError({ uuAppErrorMap }, err);
    }
    // HDS 5
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }


}

module.exports = new TopicAbl();
