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
        await db.collection("users").doc(id).set({
          displayName: name,
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

Users.updateDisplayName = async (userId, newName) => {
  const id = String(userId);
  const name = String(newName);

  await db
    .collection("users")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        db.collection("users")
          .where("displayName", "==", name)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.exists) {
                console.log("Please choose another displayName");
              } else {
                db.collection("users").doc(id).update({
                  displayName: name,
                });
              }
            });
          });
      } else {
        console.log("ID does not exist");
      }
    });
};

Users.doLogin = async (userNusnet, password) => {
  const nusnet = String(userNusnet);
  const email = nusnet.concat("@u.nus.edu");
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Login successful");
      return true;
    })
    .catch(function (error) {
      let errorMessage = error.message;
      console.error(errorMessage);
      console.log(error);
      console.log("Login fail");
      return false;
    });
};

Users.doLogout = async () => {
  await auth
    .signOut()
    .then(() => {
      console.log("Logout successful");
      return true;
    })
    .catch(function (error) {
      let errorMessage = error.message;
      console.error(errorMessage);
      console.log(error);
      console.log("Logout fail");
      return false;
    });
};

Users.isLoginStatus = async () => {
  await auth.onAuthStateChanged(async (user) => {
    if (user) {
      await console.log("User is logged in");
      return true;
    } else {
      await console.log("User is not logged in");
      return false;
    }
  });
};

module.exports = Users;
