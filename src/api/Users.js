const { auth, db } = require("../firebase/index.firebase");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require("unique-names-generator");

const Users = () => {};

const isValidUser = async (roomId, userNusnet) => {
  const doc = new GoogleSpreadsheet(
    "1OrAkkc0ZwB3qROmwcojP5_uftxAfW-oz58lGs1uuL_k"
  );
  const creds = require("../../secret/hosper-57632-a0ddbb63f4e0.json");
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  await sheet.loadCells();

  for (let i = 0; i < sheet.rowCount; i++) {
    let roomNumber = String(sheet.getCell(i, 0).value);
    let nusnet = String(sheet.getCell(i, 1).value);
    if (roomNumber === roomId && nusnet === userNusnet) {
      return true;
    }
  }
  return false;
};

Users.createUser = async (userId, userNusnet, password) => {
  const id = String(userId);
  const nusnet = String(userNusnet);
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 3,
  });

  const isValid = await isValidUser(id, nusnet);

  if (isValid) {
    const email = nusnet.concat("@u.nus.edu");

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (credential) => {
        credential.user.updateProfile({
          displayName: name,
        });
        await db.collection("users").add({
          displayName: name,
          roomNumber: id,
          createdAt: new Date().toISOString(),
        });
        console.log("Account is created");
      })
      .catch(function (error) {
        let errorMessage = error.message;
        console.error(errorMessage);
        console.log(error);
      });
  } else {
    console.log(
      "Your email is not in our record or you have had an account already"
    );
  }
};

module.exports = Users;
