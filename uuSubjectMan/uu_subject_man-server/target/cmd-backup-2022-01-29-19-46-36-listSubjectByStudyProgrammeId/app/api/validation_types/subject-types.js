/* eslint-disable */
const subjectCreateDtoInType = shape({
    name: uu5String(200).isRequired(),
    description: uu5String(5000),
    goal: uu5String(5000).isRequired(),
    credits: integer(1,1000).isRequired(),
    language: oneOf(["CZ", "EN"]).isRequired(),
    guarantor: uu5String(100).isRequired(),
    teachers: array().isRequired()
});

const subjectListByStudyProgrammeDtoInType = shape({
    studyProgrammeId: uu5String(64).isRequired(),
});

const subjectGetDtoInType = shape({
    id: uu5String(64).isRequired(),
});

const subjectUpdateDtoInType = shape({
    id: uu5String(64).isRequired(),
    name: uu5String(200).isRequired(),
    description: uu5String(5000),
    goal: uu5String(5000).isRequired(),
    credits: integer(1,1000).isRequired(),
    language: oneOf(["CZ", "EN"]).isRequired(),
    guarantor: uu5String(200).isRequired(),
    teachers: array().isRequired()
});
