"use strict";

const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoCreateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoCreateFailed`;
      this.message = "Create subject by subject Dao create failed.";
    }
  },
  SubjectCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

const List = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}list/`,
  SubjectListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoListFailed`;
      this.message = "Subject list by subject Dao list failed.";
    }
  },
  SubjectListDoesntExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectListDoesntExist`;
      this.message = "Searched subject does not exist.";
    }
  },
  SubjectCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

const ListByStudyProgramme = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}listByStudyProgramme/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoListByStudyProgrammeFailed`;
      this.message = "Subject list by study programme ID by subject Dao list failed.";
    }
  },
};

const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoGetFailed`;
      this.message = "Subject get by subject Dao get failed.";
    }
  },
  SubjectGetDoesntExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectGetDoesntExist`;
      this.message = "Searched subject do not exist.";
    }
  },
  SubjectCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

const Update = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoUpdateFailed`;
      this.message = "Update subject by subject Dao update failed.";
    }
  },
  SubjectCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

module.exports = {
  ListByStudyProgramme,
  Update,
  Create,
  List,
  Get
};
