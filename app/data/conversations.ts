export type Message = {
  id: string;
  text: string;
  sender: "employer" | "jobseeker";
  timestamp: number;
};

export type Conversation = {
  id: string;
  participants: {
    employer: string;
    jobseeker: string;
  };
  messages: Message[];
};

const conversations: Conversation[] = [
  {
    id: "1",
    participants: {
      employer: "Jollibee",
      jobseeker: "Juan Dela Cruz",
    },
    messages: [
      {
        id: "m1",
        text: "Hi Juan — we reviewed your application.",
        sender: "employer",
        timestamp: Date.now() - 1000 * 60 * 60,
      },
      {
        id: "m2",
        text: "Thanks! I'd love to discuss more.",
        sender: "jobseeker",
        timestamp: Date.now() - 1000 * 60 * 30,
      },
    ],
  },
  {
    id: "2",
    participants: {
      employer: "McBurger",
      jobseeker: "Ana Santos",
    },
    messages: [
      {
        id: "m1",
        text: "Good morning Ana — are you available for an interview?",
        sender: "employer",
        timestamp: Date.now() - 1000 * 60 * 20,
      },
    ],
  },
];

export default conversations;
