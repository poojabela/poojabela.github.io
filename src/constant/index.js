export const profile = {
  name: "Pooja Belaramani",
  role: "Software Engineer",
  company: "Bruno",
  location: "India",
  timeZone: "Asia/Kolkata",
  email: "poojabelaramani51@gmail.com",
  bio: "Software engineer at Bruno, building tools developers use to test their APIs. After work, I trade code for books. Both have plot twists. Only one comes with tests.",
};

export const experiences = [
  {
    company: "Bruno",
    role: "Software Engineer",
    site: "https://www.usebruno.com",
    duration: "2025 - Present",
    description:
      "Bruno is an open-source app developers use to test APIs, the connections apps use to talk to each other.",
    highlights: [
      {
        title: "Building GraphQL queries by picking fields",
        description:
          "A query builder that lets you choose the fields you want from a list, so you don't have to write the GraphQL query by hand.",
      },
      {
        title: "Live connections with WebSockets",
        description:
          "Some apps keep a connection open to send messages back and forth, like a chat. I made it possible to save many messages and reuse them, and to connect to servers that need security certificates.",
      },
      {
        title: "Auto save",
        description: "Your work saves as you type, so you don't lose changes.",
      },
      {
        title: "Moving over from Postman",
        description:
          "Many people switch to Bruno from tools like Postman. I worked on importing their existing work, including translating their scripts so they keep working in Bruno.",
      },
      {
        title: "Running many requests at once",
        description:
          "The collection runner sends a whole list of requests in one go, for example to test an app end to end. I added a detailed timeline of each run and support for richer test data files.",
      },
      {
        title: "Bruno from the terminal",
        description:
          "Teams run Bruno in automated pipelines without opening the app. I added login methods like OAuth 2.0 and made scripts run in safe mode by default.",
      },
      {
        title: "Keeping passwords and keys safe",
        description:
          "Companies keep passwords and API keys in vaults like Azure Key Vault, AWS and HashiCorp Vault. I connected Bruno to these, and added support for company proxy settings.",
      },
      {
        title: "Scripting",
        description:
          "Bruno lets you write small JavaScript snippets that run before or after a request. I added new functions for these scripts, like reading cookies or checking the size of a response.",
      },
      {
        title: "Settings that apply everywhere",
        description:
          "Set login details once for a whole folder, see which headers Bruno sends by default, give environments like dev and production their own color, and edit variables right where you use them.",
      },
    ],
  },
  {
    company: "Dukaan",
    role: "Software Engineer",
    site: "https://mydukaan.io",
    duration: "2024",
    description:
      "Dukaan helps small businesses open an online store in a few minutes.",
    highlights: [
      {
        title: "The shopping side of the app",
        description:
          "The buyer side is what shoppers see when they visit a Dukaan store, browse products and place an order. I built features and fixed issues across that flow.",
      },
      {
        title: "An invoice app with AI",
        description:
          "An internal tool I built from scratch. You upload an invoice and AI reads it and pulls out details like amounts, dates and items, so nobody has to type them in by hand.",
      },
      {
        title: "Bot9 integrations",
        description:
          "Bot9 is Dukaan's AI chatbot for customer support. I connected it to platforms like Discord, so businesses can reply to customers where they already talk.",
      },
    ],
  },
  {
    company: "Ellenox",
    role: "Full Stack Developer, started as Frontend Intern",
    site: "https://ellenox.com",
    duration: "2023 - 2024",
    description:
      "Ellenox builds apps for startups. This is where I learned to build mobile apps.",
    highlights: [
      {
        title: "A golf app",
        description:
          "A mobile app for golfers, built with React Native so it runs on both iPhone and Android from one codebase.",
      },
      {
        title: "A peer support health app",
        description:
          "An app that connects people going through similar health challenges, so they can talk to and support each other.",
      },
      {
        title: "From intern to full stack",
        description:
          "I joined as a frontend intern working on app screens, and grew into a full stack role building the backend behind them too.",
      },
    ],
  },
];

export const shipped = [];

export const books = [
  {
    title: "The Big Four",
    author: "Agatha Christie",
    coverId: 12996529,
    status: "reading",
  },
  {
    title: "Crown of Midnight",
    author: "Sarah J. Maas",
    coverId: 14348029,
    status: "want",
  },
  {
    title: "The Lost Hero",
    author: "Rick Riordan",
    coverId: 12848687,
    status: "want",
  },
  {
    title: "Dark Matter",
    author: "Blake Crouch",
    coverId: 7436634,
    status: "want",
  },
];

export const links = [
  { label: "Email", href: "mailto:poojabelaramani51@gmail.com" },
  { label: "GitHub", href: "https://github.com/poojabela" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pooja-belaramani" },
  { label: "X", href: "https://x.com/PBelaramani" },
];
