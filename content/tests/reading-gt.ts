import type { PracticeTest } from "../practice-types";

const TFNG = ["TRUE", "FALSE", "NOT GIVEN"];
const LETTERS = ["A", "B", "C", "D", "E"];

export const test: PracticeTest = {
  slug: "general-reading-evening-classes",
  skill: "reading",
  title: "General Training Reading: Evening Classes and a Staff Notice",
  description: "Everyday and workplace texts in the General Training style: matching information and True/False/Not Given. 12 questions, 15 minutes.",
  minutes: 15,
  table: "generalReading",
  level: "Band 4–6",
  passage: `
## Text 1: Westbridge Adult Learning Centre: Evening Classes

**A. Beginners' Photography**
Learn to use your camera (or phone) with confidence. Covers light, composition and basic editing. Eight Monday evenings. Cameras can be borrowed free of charge. £85.

**B. Conversational Spanish**
For complete beginners planning a holiday. Small groups of no more than ten. Ten Thursday evenings. Course book included in the price. £110.

**C. Furniture Restoration**
Bring an old chair or small table and learn to repair and refinish it. All tools supplied; materials charged separately at cost. Six Saturday mornings. £140.

**D. Introduction to Spreadsheets**
Ideal for job seekers and anyone returning to work. Includes a certificate recognised by local employers. Five Tuesday evenings. Free for people currently unemployed; otherwise £60.

**E. Creative Writing**
Develop short stories and poems in a friendly group. Each student receives individual written feedback from a published author. Eight Wednesday evenings. £95.

## Text 2: Notice to all staff: New expenses procedure

From 1 March, all claims for work-related expenses must be submitted through the online portal rather than on paper forms. Paper forms received after this date will be returned unprocessed.

Claims should be submitted within 30 days of the expense. Receipts must be photographed or scanned and attached to the claim; claims without receipts will only be accepted for amounts under £10, such as parking meters, and must be approved by a line manager.

Travel by train should be booked in standard class. First-class travel is permitted only for journeys over three hours, or where a medical reason has been agreed in advance with Human Resources.

Approved claims will be paid with the following month's salary. Staff who need help using the portal can attend a short training session on 24 or 26 February; places can be booked through the staff intranet.
`,
  groups: [
    {
      title: "Questions 1–6",
      instructions: "Look at the five evening classes, A–E, in Text 1. For which class are the following statements true? You may use any letter more than once.",
      display: "select",
      questions: [
        { kind: "choice", id: 1, text: "Some students will not have to pay for this course.", options: LETTERS, answer: "D", explanation: "Spreadsheets: “Free for people currently unemployed”." },
        { kind: "choice", id: 2, text: "Students may need to pay an extra amount for supplies.", options: LETTERS, answer: "C", explanation: "Furniture restoration: “materials charged separately at cost”." },
        { kind: "choice", id: 3, text: "Equipment is available to lend.", options: LETTERS, answer: "A", explanation: "Photography: “Cameras can be borrowed free of charge”." },
        { kind: "choice", id: 4, text: "This course takes place in the daytime.", options: LETTERS, answer: "C", explanation: "Furniture restoration runs on “Saturday mornings”; all others are evenings." },
        { kind: "choice", id: 5, text: "Students get personal comments on their work from a professional.", options: LETTERS, answer: "E", explanation: "Creative writing: “individual written feedback from a published author”." },
        { kind: "choice", id: 6, text: "The class size is limited.", options: LETTERS, answer: "B", explanation: "Spanish: “Small groups of no more than ten”." },
      ],
    },
    {
      title: "Questions 7–12",
      instructions: "Do the following statements agree with the information given in Text 2? Choose TRUE, FALSE or NOT GIVEN.",
      questions: [
        { kind: "choice", id: 7, text: "Paper expense forms can still be used until the end of March.", options: TFNG, answer: "FALSE", explanation: "From 1 March, paper forms “will be returned unprocessed”." },
        { kind: "choice", id: 8, text: "A claim for £8 without a receipt may be accepted.", options: TFNG, answer: "TRUE", explanation: "Claims without receipts are accepted under £10 with a line manager's approval." },
        { kind: "choice", id: 9, text: "Staff may travel first class on any journey longer than two hours.", options: TFNG, answer: "FALSE", explanation: "First class is permitted for journeys over three hours, not two." },
        { kind: "choice", id: 10, text: "Taxi fares can no longer be claimed.", options: TFNG, answer: "NOT GIVEN", explanation: "Taxis are not mentioned in the notice." },
        { kind: "choice", id: 11, text: "Approved expenses are paid together with salary.", options: TFNG, answer: "TRUE", explanation: "“Approved claims will be paid with the following month's salary.”" },
        { kind: "choice", id: 12, text: "Training on the portal is compulsory for all staff.", options: TFNG, answer: "FALSE", explanation: "Training is for “Staff who need help” and places can be booked, so it is optional, not compulsory." },
      ],
    },
  ],
};
