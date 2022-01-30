"use strict";

const SubjectManUseCaseError = require("./subject-man-use-case-error.js");
const TOPIC_ERROR_PREFIX = `${SubjectManUseCaseError.ERROR_PREFIX}topic/`;

const Create = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TopicDaoCreateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoCreateFailed`;
      this.message = "Create topic by topic Dao create failed.";
    }
  },
  SubjectFindFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectFindFailed`;
      this.message = "Subject find filed.";
    }
  },
  SubjectDoesntExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDoesntExist`;
      this.message = "Subject does not exist.";
    }
  },
};

const List = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TopicListFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoListFailed`;
      this.message = "Topic list by topic Dao list failed.";
    }
  },
  TopicListDontExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicListDontExist`;
      this.message = "Searched topics do not exist.";
    }
  }
};
const Update = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TopicDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoUpdateFailed`;
      this.message = "Update topic by topic Dao update failed.";
    }
  }
};

const Remove = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}remove/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TopicDaoRemoveFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoRemoveFailed`;
      this.message = "Remove topic by topic Dao remove failed.";
    }
  }
};

const DigitalContentAdd = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}digitalContentAdd/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TopicGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoGetFailed`;
      this.message = "Topic get by topic Dao get failed.";
    }
  },
  TopicDoesntExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDoesntExist`;
      this.message = "Searched topic does not exist.";
    }
  },
  TopicDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoUpdateFailed`;
      this.message = "Update topic by topic Dao update failed.";
    }
  }
};

const DigitalContentRemove = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}digitalContentRemove/`,
  InvalidDtoIn: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TopicGetFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoGetFailed`;
      this.message = "Topic get by topic Dao get failed.";
    }
  },
  TopicDoesntExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDoesntExist`;
      this.message = "Searched topic does not exist.";
    }
  },
  TopicDaoUpdateFailed: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicDaoUpdateFailed`;
      this.message = "Update topic by topic Dao update failed.";
    }
  },
  DigitalContentDoesntExist: class extends SubjectManUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}digitalContentDontExist`;
      this.message = "Searched digital content does not exist.";
    }
  }
};

module.exports = {
  DigitalContentRemove,
  DigitalContentAdd,
  Update,
  Remove,
  List,
  Create
};
