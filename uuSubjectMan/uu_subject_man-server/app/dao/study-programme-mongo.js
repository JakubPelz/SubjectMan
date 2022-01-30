"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class StudyProgrammeMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({awid: 1, _id: 1}, {unique: true});
  }

  async create(studyProgramme) {
    return await super.insertOne(studyProgramme);
  }

  async list() {
    return await super.find({});
  }

  async get(studyProgrammeId) {
    let filter = {id: studyProgrammeId};
    return await super.findOne(filter);
  }

  async getSubjectsByStudyProgrammeId(studyProgrammeId){
    let aggregation = [
      {
        "$unwind":{"path": "$subjects"}
      },
      {
        "$addFields": {
          "subjectIdAsObjectId": {"$toObjectId": "$subjects.subjectId"},
          "studyProgrammeAsStringId": {"$toString": "$_id"},
        }
      },
      {
        "$match":{"studyProgrammeAsStringId": studyProgrammeId}
      },
      {
        "$lookup":{
          "from": "subject",
          "localField": "subjectIdAsObjectId",
          "foreignField": "_id",
          "as": "subjectsNew"
        }
      },
      {
        "$unwind":{"path": "$subjectsNew"}
      },
      {
        "$addFields": {
          "subjectsNew.semester": "$subjects.semester",
        }
      },
      {
        "$group":{"_id": '$_id',
        "subjects": {
            "$push": '$subjectsNew'
        }}
      },
      {
        "$unwind":{"path": "$subjects"}
      },
      {
        "$replaceRoot":{"newRoot": "$subjects"}
      }
    ];

    return await super.aggregate(aggregation);
  }

  async update(studyProgramme){
    let filter = { id: studyProgramme.id };
    return await super.findOneAndUpdate(filter, studyProgramme, "NONE");
  }
}

module.exports = StudyProgrammeMongo;
