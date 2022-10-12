const { ObjectId } = require("bson");

const usernamesPartOne = [
  "Max",
  "Checo",
  "Lewis",
  "George",
  "Lando",
  "Daniel",
  "Fernando",
  "Esteban",
  "Charles",
  "Carlos",
  "Lance",
  "Sebastien",
  "Pierre",
  "Yuki",
  "Mick",
  "Kevin",
  "Alex",
  "Nicolas",
  "Valtteri",
  "Zhou",
];

const usernamesPartTwo = [
  "Verstappen",
  "Perez",
  "Hamilton",
  "Russell",
  "Norris",
  "Ricciardo",
  "Alonso",
  "Ocon",
  "Leclerc",
  "Sainz",
  "Stroll",
  "Vettel",
  "Gasly",
  "Tsunoda",
  "Schumacher",
  "Magnussen",
  "Albon",
  "Latifi",
  "Bottas",
  "Guanyu",
];

const possibleThoughts = [
  "I am the fastest driver around!",
  "My team is the best in all of Formula One.",
  "Has anyone seen what Lewis is wearing?",
  "If it wasn't for poor strategy I would have won last week!",
  "I really hope Max doesn't win again this week.",
  "I need a nap!",
  "How old is Fernando?!",
  "Ayrton Senna is still the GOAT!",
];

const possibleReactions = [
  "I've got you next week.",
  "That was a brutal race.",
  "Your'e lucky that I had a mechanical.",
  "Who are you again?",
  "NOOOOOOOOO!",
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsername = () =>
  `${getRandomArrItem(usernamesPartOne)}${getRandomArrItem(usernamesPartTwo)}`;

const users = [];

for (let i = 0; i < 10; i++) {
  const username = getRandomUsername();
  const email = `${username}@email.com`;

  users.push({
    username: username,
    email: email,
  });
}

const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(possibleThoughts),
      username: getRandomArrItem(users).username,
      reactions: [...getRandomReactions(2)],
    });
  }
  return results;
};

const getRandomReactions = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionId: new ObjectId(),
      reactionBody: getRandomArrItem(possibleReactions),
      username: getRandomArrItem(users).username,
    });
  }
  return results;
};

module.exports = { users, getRandomThoughts, getRandomReactions };
