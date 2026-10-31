// Original prompts for the writing timer and the AI feedback tools.

export type WritingPrompt = { id: string; task: "task1-gt" | "task2"; text: string };

export const writingPrompts: WritingPrompt[] = [
  { id: "t2-remote", task: "task2", text: "Some people believe that working from home benefits both employees and employers, while others think it harms productivity and team spirit. Discuss both views and give your own opinion." },
  { id: "t2-uni-free", task: "task2", text: "Some people think university education should be free for everyone. Others believe students should pay for their own studies. Discuss both views and give your own opinion." },
  { id: "t2-tourism", task: "task2", text: "International tourism has grown rapidly in recent decades. Do the advantages of this development outweigh the disadvantages?" },
  { id: "t2-phones-school", task: "task2", text: "Some schools have banned mobile phones in classrooms. To what extent do you agree or disagree with this policy?" },
  { id: "t2-city-traffic", task: "task2", text: "Traffic congestion is a growing problem in many cities. What are the causes of this problem, and what measures could be taken to solve it?" },
  { id: "t2-elderly", task: "task2", text: "In many countries, the proportion of older people is increasing. Is this a positive or negative development for society?" },
  { id: "t2-online-learning", task: "task2", text: "Online courses are becoming more popular than traditional classes. Why is this happening? Is it a positive or negative development?" },
  { id: "t2-sugar-tax", task: "task2", text: "Some people believe that governments should tax unhealthy foods and drinks to improve public health. To what extent do you agree or disagree?" },
  { id: "t2-children-chores", task: "task2", text: "Some parents believe children should be given household chores from a young age, while others think children should spend that time studying or playing. Discuss both views and give your opinion." },
  { id: "t2-ai-jobs", task: "task2", text: "Artificial intelligence may replace many jobs in the future. What problems could this cause, and how can governments and individuals prepare?" },
  { id: "t1-noise", task: "task1-gt", text: "Your neighbours have been making a lot of noise late at night. Write a letter to your neighbours. In your letter: describe the problem, explain how it affects you, and suggest what they could do." },
  { id: "t1-course", task: "task1-gt", text: "You want to take an evening course at a local college. Write a letter to the college. In your letter: say which course you are interested in, explain why you want to take it, and ask for information about the course." },
  { id: "t1-friend-visit", task: "task1-gt", text: "A friend from another country is planning to visit your city. Write a letter to your friend. In your letter: suggest a good time to visit, recommend places to see, and offer to help with accommodation." },
  { id: "t1-lost-bag", task: "task1-gt", text: "You left a bag on a train. Write a letter to the railway company. In your letter: give details of your journey, describe the bag and its contents, and say what you would like the company to do." },
];

export type CueCard = { id: string; topic: string; points: string[] };

export const cueCards: CueCard[] = [
  { id: "skill", topic: "Describe a skill you learned that took a long time.", points: ["what the skill is", "when and why you started learning it", "how you learned it", "and explain how you feel about it now."] },
  { id: "place", topic: "Describe a place in your city where you like to relax.", points: ["where it is", "how often you go there", "what you do there", "and explain why it helps you relax."] },
  { id: "person", topic: "Describe a person who has had a positive influence on you.", points: ["who this person is", "how you know them", "what they have done", "and explain why they influenced you."] },
  { id: "decision", topic: "Describe an important decision you made.", points: ["what the decision was", "when you made it", "how you made it", "and explain whether you think it was the right decision."] },
  { id: "book", topic: "Describe a book or film that made you think.", points: ["what it was", "when you read or watched it", "what it was about", "and explain why it made you think."] },
  { id: "trip", topic: "Describe a memorable journey you have taken.", points: ["where you went", "who you went with", "what happened during the journey", "and explain why it was memorable."] },
  { id: "technology", topic: "Describe a piece of technology you find useful.", points: ["what it is", "when you started using it", "how you use it", "and explain why it is useful to you."] },
  { id: "goal", topic: "Describe a goal you hope to achieve in the future.", points: ["what the goal is", "why you want to achieve it", "what you are doing to achieve it", "and explain how you will feel when you achieve it."] },
];

export const speakingPart1: string[] = [
  "Do you work or are you a student?",
  "What do you like most about the area where you live?",
  "How do you usually spend your weekends?",
  "Do you prefer cooking at home or eating out? Why?",
  "What kind of music do you enjoy?",
  "How often do you use public transport?",
  "Did you enjoy your school days? Why or why not?",
  "Is there a sport you would like to try in the future?",
];
