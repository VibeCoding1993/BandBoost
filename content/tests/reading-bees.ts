import type { PracticeTest } from "../practice-types";

const TFNG = ["TRUE", "FALSE", "NOT GIVEN"];

export const test: PracticeTest = {
  slug: "academic-reading-urban-beekeeping",
  skill: "reading",
  title: "Academic Reading: The Rise of Urban Beekeeping",
  description: "An original academic passage with True/False/Not Given, matching headings and sentence completion questions. 13 questions, 20 minutes.",
  minutes: 20,
  table: "academicReading",
  level: "Band 5–7",
  passage: `
## The Rise of Urban Beekeeping

**A** Twenty years ago, the idea of keeping bees on the roof of an office block would have struck most city planners as eccentric, if not dangerous. Today, hives can be found on hotels, railway stations, museums and corporate headquarters in cities from Paris to Melbourne. In some European capitals, the number of registered urban hives has more than doubled within a decade. Supporters describe the trend as a small but meaningful act of environmental care, a way of bringing nature back into landscapes dominated by concrete.

**B** The movement was initially driven by alarm. From the mid-2000s, beekeepers in North America and Europe reported unusually heavy losses of honeybee colonies, and newspapers warned of a pollination crisis that could threaten food supplies. City dwellers who wanted to "do something" saw hives as a practical response. Companies, meanwhile, discovered that rooftop beekeeping offered attractive publicity: a jar of honey labelled with the company logo became a popular gift for clients.

**C** Cities can, in fact, be surprisingly good places for bees. Urban areas are often warmer than the surrounding countryside, which extends the season during which flowers bloom. Parks, private gardens, street trees and balcony plants provide a remarkable variety of food sources, and they are frequently treated with fewer pesticides than large commercial farms. Several studies have found that colonies kept in cities produce as much honey as rural colonies, and occasionally more.

**D** Yet a growing number of ecologists argue that the boom may be doing more harm than good. Their concern is not the honeybee itself, which is a domesticated species and in no danger of extinction, but the hundreds of species of wild bees that share the same flowers. Wild bees, many of which live alone rather than in colonies, are far more important pollinators of some plants than honeybees are, and several species are genuinely declining. Because a single honeybee colony can contain tens of thousands of workers, a high density of hives may leave little pollen and nectar for these wild competitors.

**E** Research in one European capital illustrated the problem. Over an eight-year period during which the number of hives in the city rose sharply, scientists recorded a fall in the number of wild bee visits to flowers in the study area. They also found that the amount of honey each urban hive produced had dropped, suggesting that the colonies were beginning to compete with one another for the same limited resources. The researchers stressed that their results did not prove that honeybees were the only cause of the decline, but they called for caution.

**F** For this reason, some cities have started to change their approach. Rather than encouraging more hives, they are investing in habitat: planting native wildflowers, leaving areas of grass uncut, and installing so-called "bee hotels", bundles of hollow stems in which solitary bees can lay their eggs. A few local authorities now require new hives to be registered, so that their density can be monitored. Ecologists argue that the most effective way for an individual to help pollinators is not to keep bees at all, but to grow a diverse range of flowering plants that bloom from early spring to late autumn.
`,
  groups: [
    {
      title: "Questions 1–5",
      instructions:
        "Do the following statements agree with the information given in the passage? Choose TRUE if the statement agrees with the information, FALSE if it contradicts the information, NOT GIVEN if there is no information on this.",
      questions: [
        { kind: "choice", id: 1, text: "In some European capitals, the number of urban hives has risen by more than 100% in ten years.", options: TFNG, answer: "TRUE", explanation: "Paragraph A: the number “has more than doubled within a decade”, which is an increase of over 100%." },
        { kind: "choice", id: 2, text: "Companies keep hives mainly because they want to reduce their energy costs.", options: TFNG, answer: "NOT GIVEN", explanation: "Paragraph B mentions publicity and honey as gifts; energy costs are never mentioned." },
        { kind: "choice", id: 3, text: "Flowers in cities may bloom for a longer period than in the countryside.", options: TFNG, answer: "TRUE", explanation: "Paragraph C: warmer cities extend “the season during which flowers bloom”." },
        { kind: "choice", id: 4, text: "Urban colonies always produce less honey than rural ones.", options: TFNG, answer: "FALSE", explanation: "Paragraph C: city colonies produce “as much honey as rural colonies, and occasionally more”." },
        { kind: "choice", id: 5, text: "The honeybee is at risk of disappearing completely.", options: TFNG, answer: "FALSE", explanation: "Paragraph D: the honeybee is “in no danger of extinction”." },
      ],
    },
    {
      title: "Questions 6–9",
      instructions: "The passage has six paragraphs, A–F. Choose the correct heading for paragraphs B, C, E and F from the list of headings below.",
      display: "select",
      box: [
        "i. Evidence of competition for food",
        "ii. Why bees can thrive among buildings",
        "iii. The cost of starting a hive",
        "iv. A shift in local policy",
        "v. The original motives behind the trend",
        "vi. Honeybees as a threat to farming",
        "vii. Public fear of bee stings",
      ],
      questions: [
        { kind: "choice", id: 6, text: "Paragraph B", options: ["i", "ii", "iii", "iv", "v", "vi", "vii"], answer: "v", explanation: "B explains why the movement began: alarm about colony losses and corporate publicity." },
        { kind: "choice", id: 7, text: "Paragraph C", options: ["i", "ii", "iii", "iv", "v", "vi", "vii"], answer: "ii", explanation: "C explains why cities are good places for bees (warmth, varied flowers, fewer pesticides)." },
        { kind: "choice", id: 8, text: "Paragraph E", options: ["i", "ii", "iii", "iv", "v", "vi", "vii"], answer: "i", explanation: "E describes falling wild bee visits and falling honey per hive, signs of competition." },
        { kind: "choice", id: 9, text: "Paragraph F", options: ["i", "ii", "iii", "iv", "v", "vi", "vii"], answer: "iv", explanation: "F describes cities changing their approach: habitat, registration, monitoring." },
      ],
    },
    {
      title: "Questions 10–13",
      instructions: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      questions: [
        { kind: "gap", id: 10, text: "Many wild bees live ____ instead of in large colonies.", accept: ["alone"], explanation: "Paragraph D: “many of which live alone rather than in colonies”." },
        { kind: "gap", id: 11, text: "In the European study, the amount of ____ from each hive went down.", accept: ["honey"], explanation: "Paragraph E: “the amount of honey each urban hive produced had dropped”." },
        { kind: "gap", id: 12, text: "Solitary bees can lay eggs in structures known as ____.", accept: ["bee hotels", "bee hotel"], explanation: "Paragraph F: “so-called bee hotels”." },
        { kind: "gap", id: 13, text: "Some authorities insist that new hives are ____ so that numbers can be tracked.", accept: ["registered"], explanation: "Paragraph F: “require new hives to be registered”." },
      ],
    },
  ],
};
