/* eslint-disable */
const topicCreateDtoInType = shape({
  subjectId: string(64).isRequired(),
  name: string(100).isRequired(),
  description: string(1000)
});

const topicListDtoInType = shape({
  subjectId: string(64).isRequired()
});

const topicUpdateDtoInType = shape({
  id: string(64).isRequired(),
  name: string(100).isRequired(),
  description: string(1000)
});

const topicRemoveDtoInType = shape({
  id: string(64).isRequired()
});