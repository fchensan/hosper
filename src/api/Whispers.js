const { db } = require("../firebase/index.firebase");

const Whispers = () => {};

Whispers.createWhispers = async (senderId, receiverId, content, isAnon) => {
  const sender = String(senderId);
  const receiver = String(receiverId);

  await db.collection("whispers").add({
    sender: sender,
    receiver: receiver,
    isAnon: isAnon,
    content: content,
    timestamp: new Date().toISOString(),
  });
};

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

Whispers.getReceivedWhispers = async (userId, callback) => {
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

  return callback(whispers);
};

module.exports = Whispers;
