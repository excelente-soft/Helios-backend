import { Test } from '@models/test.model';

const toPassingTest = (test: Test) => {
  return {
    ...test,
    quests: test.quests.map((quest) => ({
      ...quest,
      answers: quest.answers.map((quest) => {
        return { id: quest.id, answer: quest.answer, questId: quest.questId };
      }),
    })),
  };
};

export default {
  toPassingTest,
};
