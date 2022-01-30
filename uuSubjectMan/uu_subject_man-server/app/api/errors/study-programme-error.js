"use strict";

const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const STUDY_PROGRAMME_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}studyProgramme/`;

const Create = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  StudyProgrammeDaoCreateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDaoCreateFailed`;
      this.message = "Create studyProgramme by studyProgramme Dao create failed.";
    }
  },
  StudyProgrammeCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeCustomError`;
      this.message = "Some error has occurred.";
    }
  }
}

const Update = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  StudyProgrammeDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDaoUpdateFailed`;
      this.message = "Update studyProgramme by studyProgramme Dao update failed.";
    }
  },
  StudyProgrammeCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

const List = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}list/`,
  StudyProgrammeDaoListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDaoListFailed`;
      this.message = "List studyProgramme by studyProgramme Dao list failed.";
    }
  },
  StudyProgrammeCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

const Get = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  StudyProgrammeDaoGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDaoGetFailed`;
      this.message = "Get studyProgramme by studyProgramme Dao get failed.";
    }
  },
  StudyProgrammeDoesntExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDoesntExist`;
      this.message = "Searched studyProgramme does not exist.";
    }
  },
  StudyProgrammeCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

const AssignSubject = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}assignSubject/`,
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
      this.code = `${Create.UC_CODE}subjectDaoAssignStudyProgramFailed`;
      this.message = "Subject get by subject Dao get failed.";
    }
  },
  SubjectDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoAssignStudyProgramFailed`;
      this.message = "Assign study programme to subject by subject Dao update failed.";
    }
  },
  StudyProgrammeDoesntExistFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDoesntExistFailed`;
      this.message = "StudyProgramme ID you selected does not exist.";
    }
  },
  SubjecAlreadyAssignedToStudyProgFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoAssignStudyProgramFailed`;
      this.message = "Subject is already assigned to this study programme.";
    }
  },
  StudyProgrammeCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

const RemoveSubject = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}removeSubject/`,
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
      this.code = `${Create.UC_CODE}subjectDaoRemoveStudyProgramFailed`;
      this.message = "Subject get by subject Dao get failed.";
    }
  },
  SubjectDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoRemoveStudyProgramFailed`;
      this.message = "Remove study programme from subject by subject Dao update failed.";
    }
  },
  StudyProgrammeDoesntExistFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeDoesntExistFailed`;
      this.message = "StudyProgramme ID you selected does not exist.";
    }
  },
  SubjecNotAssignedToStudyProgFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoRemoveStudyProgramFailed`;
      this.message = "Subject is not assigned to this study programme.";
    }
  },
  StudyProgrammeCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

const ListSubjectByStudyProgrammeId = {
  UC_CODE: `${STUDY_PROGRAMME_ERROR_PREFIX}listSubjectByStudyProgrammeId/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectListByStudyProgrammeGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectListByStudyProgrammeGetFailed`;
      this.message = "List subjects by StudyProgramme ID Dao get failed.";
    }
  },
  StudyProgrammeCustomError: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}studyProgrammeCustomError`;
      this.message = "Some error has occurred.";
    }
  }
};

module.exports = {
  ListSubjectByStudyProgrammeId,
  Get,
  List,
  Update,
  Create,
  AssignSubject,
  RemoveSubject
};
