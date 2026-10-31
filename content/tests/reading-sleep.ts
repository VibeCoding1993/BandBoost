import type { PracticeTest } from "../practice-types";

const YNNG = ["YES", "NO", "NOT GIVEN"];

export const test: PracticeTest = {
  slug: "academic-reading-sleep-and-memory",
  skill: "reading",
  title: "Academic Reading: Sleep and the Learning Brain",
  description: "An original academic passage with multiple choice, Yes/No/Not Given and summary completion questions. 13 questions, 20 minutes.",
  minutes: 20,
  table: "academicReading",
  level: "Band 6–8",
  passage: `
## Sleep and the Learning Brain

For most of the twentieth century, sleep was regarded as a passive state: a period in which the body rested and the brain, in effect, switched off. That view has been overturned. Researchers now believe that sleep plays an active and essential role in learning, and that a night of poor sleep can undo much of the effort a student puts in during the day.

The key process is known as consolidation. When we learn something new, such as a list of words or a sequence of movements, the memory is initially fragile and easily disrupted. During sleep, and particularly during the deep, slow-wave stage that dominates the first half of the night, the brain appears to replay recent experiences. Recordings from the hippocampus, a region essential for forming new memories, show patterns of activity during sleep that closely resemble those recorded while the person was learning. Over time, this replay is thought to transfer memories to the cortex, where they are stored more permanently.

Experiments with students have produced striking results. In a typical study, two groups learn the same material in the evening. One group sleeps normally; the other is kept awake. Both groups then sleep normally for two further nights before being tested. Even after this recovery sleep, the group deprived of sleep on the first night usually remembers significantly less. The lost night, it seems, cannot simply be made up later.

Sleep may also help us to find hidden patterns. In one well-known experiment, participants solved a series of number problems that contained a concealed shortcut. Those who slept between two sessions were more than twice as likely to discover the shortcut as those who stayed awake for the same length of time. The writer of a popular science book on the subject goes further, claiming that sleep is "the single most effective thing we can do" for our brains. This may be an overstatement, since diet, exercise and social contact also matter, but the scientific consensus clearly supports the importance of sleep.

These findings sit uncomfortably with the habits of many students. Surveys in several countries report that a large proportion of university students sleep less than seven hours a night during term, and that the problem becomes worse before examinations, precisely when memory matters most. The so-called all-nighter, in which a student studies through the night before a test, is particularly counterproductive: it reduces the brain's ability to absorb new information the following day, and it removes the opportunity to consolidate what has just been learned.

What, then, should learners do? The evidence suggests a few simple rules. Regular sleep and wake times help the body regulate the different stages of sleep. Reviewing difficult material in the evening, followed by a full night's rest, appears more effective than cramming in the early morning. Short daytime naps of twenty to thirty minutes can also aid learning, although longer naps may leave people feeling groggy. None of this replaces study itself, of course: sleep consolidates what has been learned, but it cannot create knowledge that was never acquired.
`,
  groups: [
    {
      title: "Questions 1–4",
      instructions: "Choose the correct letter, A, B, C or D.",
      display: "list",
      questions: [
        {
          kind: "choice", id: 1, text: "According to the first paragraph, scientists used to believe that sleep",
          options: ["A. damaged the memory.", "B. was a time when the brain was inactive.", "C. was more important than study.", "D. helped the body to grow."],
          answer: "B. was a time when the brain was inactive.",
          explanation: "Sleep was regarded as “a passive state… the brain, in effect, switched off”.",
        },
        {
          kind: "choice", id: 2, text: "What happens in the hippocampus during sleep?",
          options: ["A. It creates entirely new memories.", "B. It becomes completely silent.", "C. Its activity resembles activity during learning.", "D. It deletes memories that are not needed."],
          answer: "C. Its activity resembles activity during learning.",
          explanation: "Patterns during sleep “closely resemble those recorded while the person was learning”.",
        },
        {
          kind: "choice", id: 3, text: "In the experiment described in paragraph 3, the students who were kept awake",
          options: ["A. recovered fully after two nights of sleep.", "B. learned the material more quickly.", "C. still remembered less after recovery sleep.", "D. were tested on the same evening."],
          answer: "C. still remembered less after recovery sleep.",
          explanation: "“Even after this recovery sleep, the group deprived of sleep… usually remembers significantly less.”",
        },
        {
          kind: "choice", id: 4, text: "The number-problem experiment showed that sleep",
          options: ["A. made people solve problems faster in general.", "B. doubled participants' intelligence.", "C. increased the chance of noticing a hidden shortcut.", "D. had no measurable effect."],
          answer: "C. increased the chance of noticing a hidden shortcut.",
          explanation: "Sleepers were “more than twice as likely to discover the shortcut”.",
        },
      ],
    },
    {
      title: "Questions 5–8",
      instructions:
        "Do the following statements agree with the claims of the writer? Choose YES if the statement agrees with the claims of the writer, NO if it contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.",
      questions: [
        { kind: "choice", id: 5, text: "The popular science book exaggerates the importance of sleep.", options: YNNG, answer: "YES", explanation: "The writer says the claim “may be an overstatement”." },
        { kind: "choice", id: 6, text: "Most students sleep less than seven hours a night all year round.", options: YNNG, answer: "NOT GIVEN", explanation: "The surveys refer to “a large proportion” of students “during term”; nothing is said about the whole year or about most students." },
        { kind: "choice", id: 7, text: "Studying all night before an exam is an effective strategy.", options: YNNG, answer: "NO", explanation: "The all-nighter is described as “particularly counterproductive”." },
        { kind: "choice", id: 8, text: "Universities should change their examination timetables.", options: YNNG, answer: "NOT GIVEN", explanation: "The writer gives advice to learners, but says nothing about universities changing timetables." },
      ],
    },
    {
      title: "Questions 9–13",
      instructions: "Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      questions: [
        { kind: "gap", id: 9, text: "The process by which new memories become stable is called ____.", accept: ["consolidation"], explanation: "“The key process is known as consolidation.”" },
        { kind: "gap", id: 10, text: "Replay is strongest during the deep, ____ stage of sleep.", accept: ["slow-wave", "slow wave"], explanation: "“the deep, slow-wave stage that dominates the first half of the night”." },
        { kind: "gap", id: 11, text: "Memories are thought to move to the ____ for long-term storage.", accept: ["cortex", "the cortex"], explanation: "“transfer memories to the cortex, where they are stored more permanently”." },
        { kind: "gap", id: 12, text: "Going over difficult material in the ____ and then sleeping is better than early-morning cramming.", accept: ["evening", "the evening"], explanation: "“Reviewing difficult material in the evening, followed by a full night's rest, appears more effective than cramming in the early morning.”" },
        { kind: "gap", id: 13, text: "Naps longer than about thirty minutes may make people feel ____.", accept: ["groggy"], explanation: "“longer naps may leave people feeling groggy”." },
      ],
    },
  ],
};
