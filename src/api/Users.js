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

Users.createUser = async (userId, userNusnet, password, callback) => {
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
        return callback(null, { msg: "Account is created" });
      })
      .catch(function (error) {
        let errorMessage = error.message;
        return callback(null, { msg: errorMessage });
      });
  } else {
    return callback({
      msg: "Your email is not in our record or you have had an account already",
      status: false,
    });
  }
};

Users.updateDisplayName = async (userId, newName, callback) => {
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
                return callback({
                  msg: "Please choose another name",
                  status: false,
                });
              } else {
                db.collection("users").doc(id).update({
                  displayName: name,
                });
                return callback({
                  msg: "Success",
                  status: true,
                });
              }
            });
          });
      } else {
        return callback({
          msg: "ID DOES NOT EXIST",
          status: false,
        });
      }
    });
};

Users.doLogin = async (userNusnet, password, callback) => {
  const nusnet = String(userNusnet);
  const email = nusnet.concat("@u.nus.edu");
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      return callback({
        msg: "Login successful",
        status: true,
      });
    })
    .catch(function (error) {
      let errorMessage = error.message;
      return callback({
        msg: "Login fail",
        status: false,
        err: errorMessage,
      });
    });
};

Users.doLogout = async (callback) => {
  await auth
    .signOut()
    .then(() => {
      console.log("Logout successful");
      return callback({
        msg: "Logout successful",
        status: true,
      });
    })
    .catch(function (error) {
      let errorMessage = error.message;
      return callback({
        msg: "Logout fail",
        status: false,
        err: errorMessage,
      });
    });
};

Users.isLoginStatus = async (callback) => {
  await auth.onAuthStateChanged(async (user) => {
    if (user) {
      return callback({
        msg: "User is logged in",
        status: true,
      });
    } else {
      return callback({
        msg: "User is not logged in",
        status: false,
      });
    }
  });
};

module.exports = Users;
