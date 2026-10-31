import type { PracticeTest } from "../practice-types";

export const test: PracticeTest = {
  slug: "listening-part-4-lecture-coral-reefs",
  skill: "listening",
  title: "Listening Part 4: Lecture on Restoring Coral Reefs",
  description: "An academic lecture with note completion and multiple choice. Follow the signposts to keep your place. 10 questions.",
  minutes: 12,
  table: "listening",
  level: "Band 6–8",
  script: [
    { speaker: "Lecturer", voice: "female", text: "Good afternoon, everyone. Today I want to look at a question that marine scientists are increasingly asking: can we actively restore damaged coral reefs, rather than simply protecting the ones that remain?" },
    { speaker: "Lecturer", voice: "female", text: "Let's start with why this matters. Coral reefs cover less than one per cent of the ocean floor, yet they support roughly a quarter of all marine species. They also protect coastlines by breaking the force of waves, which is especially important during storms." },
    { speaker: "Lecturer", voice: "female", text: "The main threat, as you know, is rising sea temperature. When the water becomes too warm, corals expel the tiny algae that live inside them and give them their colour. This process is called bleaching. A bleached coral is not dead, but if high temperatures continue for several weeks, it is likely to die." },
    { speaker: "Lecturer", voice: "female", text: "So, moving on to restoration methods. The most widely used technique is known as coral gardening. Small fragments of healthy coral are grown in underwater nurseries, often hanging from structures that look rather like trees made of plastic pipe. After six to twelve months, when the fragments have grown large enough, divers attach them to the damaged reef." },
    { speaker: "Lecturer", voice: "female", text: "A second approach focuses on reproduction. Many corals spawn only once a year, releasing eggs and sperm into the water on a single night. Researchers collect this material, raise the young corals, called larvae, in tanks, and then release them onto the reef. The advantage here is genetic diversity: because the larvae come from many parents, the new population is more varied, and therefore potentially more resilient." },
    { speaker: "Lecturer", voice: "female", text: "Now, a third and more controversial idea is sometimes described as assisted evolution. Scientists identify individual corals that survived previous heatwaves and breed from them, in the hope of producing heat-tolerant reefs. Critics worry that this could reduce diversity in other ways, and it is still at an experimental stage." },
    { speaker: "Lecturer", voice: "female", text: "That brings me to the limitations. The biggest one is scale. Even the most successful projects have restored areas measured in hectares, while reef damage is measured in thousands of square kilometres. Cost is another issue: restoring a single hectare can cost hundreds of thousands of dollars. And, crucially, none of these methods works if the underlying cause, warming water, is not addressed. Restored corals bleach just as easily as the originals." },
    { speaker: "Lecturer", voice: "female", text: "So, is restoration worthwhile? Most researchers would say yes, but not as a substitute for reducing emissions. Its real value, in my view, is to buy time, keeping key species and genetic material alive in particular locations until conditions improve. In the next session, we'll look at a case study from the Caribbean where local fishing communities have taken charge of reef nurseries." },
  ],
  groups: [
    {
      title: "Questions 1–6",
      instructions: "Complete the notes below. Write ONE WORD ONLY for each answer.",
      questions: [
        { kind: "gap", id: 1, text: "Reefs support about a ____ of marine species.", accept: ["quarter"], explanation: "“they support roughly a quarter of all marine species”." },
        { kind: "gap", id: 2, text: "Reefs protect coasts by reducing the force of ____.", accept: ["waves"], explanation: "“They also protect coastlines by breaking the force of waves.”" },
        { kind: "gap", id: 3, text: "Bleaching: corals lose the ____ that give them colour.", accept: ["algae"], explanation: "“corals expel the tiny algae that live inside them and give them their colour”." },
        { kind: "gap", id: 4, text: "Coral gardening: fragments grow in underwater ____.", accept: ["nurseries", "nursery"], explanation: "“grown in underwater nurseries”." },
        { kind: "gap", id: 5, text: "Young corals raised in tanks are called ____.", accept: ["larvae"], explanation: "“raise the young corals, called larvae, in tanks”." },
        { kind: "gap", id: 6, text: "Breeding from heat survivors is known as assisted ____.", accept: ["evolution"], explanation: "“sometimes described as assisted evolution”." },
      ],
    },
    {
      title: "Questions 7–10",
      instructions: "Choose the correct letter, A, B or C.",
      display: "list",
      questions: [
        {
          kind: "choice", id: 7, text: "What is the main advantage of the reproduction method?",
          options: ["A. It is cheaper than coral gardening.", "B. It produces more genetically varied corals.", "C. It works faster than other methods."],
          answer: "B. It produces more genetically varied corals.",
          explanation: "“The advantage here is genetic diversity… the new population is more varied.”",
        },
        {
          kind: "choice", id: 8, text: "What does the lecturer say about assisted evolution?",
          options: ["A. It has already restored large reefs.", "B. It is widely accepted by scientists.", "C. It is still experimental and has critics."],
          answer: "C. It is still experimental and has critics.",
          explanation: "“Critics worry… and it is still at an experimental stage.”",
        },
        {
          kind: "choice", id: 9, text: "According to the lecturer, the biggest limitation of restoration is",
          options: ["A. the small area that can be restored.", "B. a lack of trained divers.", "C. opposition from fishing communities."],
          answer: "A. the small area that can be restored.",
          explanation: "“The biggest one is scale.” Hectares are restored, but thousands of square kilometres are damaged.",
        },
        {
          kind: "choice", id: 10, text: "What is the lecturer's view of restoration?",
          options: ["A. It can replace cutting emissions.", "B. It is useful mainly to buy time.", "C. It is too expensive to continue."],
          answer: "B. It is useful mainly to buy time.",
          explanation: "“Its real value, in my view, is to buy time.” She says it is not a substitute for reducing emissions.",
        },
      ],
    },
  ],
};
