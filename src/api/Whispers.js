const { db } = require("../firebase/index.firebase");

const Whispers = () => {};

Whispers.getSentWhispers = async (userId) => {
  const id = String(userId);

  const snapshot = await db
    .collection("whispers")
    .where("sender", "==", id)
    .get();

  const whispers = [];

  snapshot.forEach((doc) => {
    let data = doc.data();
    whispers.push(data);
  });

  return whispers;
};

Whispers.getReceivedWhispers = async (userId) => {
  const id = String(userId);

  const snapshot = await db
    .collection("whispers")
    .where("receiver", "==", id)
    .get();

  const whispers = [];

  snapshot.forEach((doc) => {
    let data = doc.data();
    whispers.push(data);
  });

  return whispers;
};

module.exports = Whispers;
