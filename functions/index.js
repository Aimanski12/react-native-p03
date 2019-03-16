

const functions = require("firebase-functions");
const cors = require("cors")({
  origin: true
});
const fs = require("fs");
const UUID = require("uuid-v4");
const admin = require("admin")


const gcconfig = {
  projectId: "rn-places-app",
  keyFilename: "places.json"
};

const gcs = require("@google-cloud/storage")(gcconfig);


// initialise app for the admin function 
// pass the credentials which is stored in this folder
admin.intializeApp({
  credential: admin.credential.cert(require('./places.json'))
})


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {

if( !request.headers.authorization || 
    !request.headers.authorization.startsWith("Bearer ")){
      console.log("No token present!");
      response.status(403)
      .json({error: "Unauthorized!"})
    return 
  }
   
  let idToken;
  idToken = request.headers.authorization.split("Bearer ")[1]

  // after getting the token verify it from the admin 
  // if the token is valid
  // this is asyncfunc and so you can pass in a .then() and .catch()
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      const body = JSON.parse(request.body);
      fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
        console.log(err);
        return response.status(500).json({error: err});
      });
      const bucket = gcs.bucket("rn-places-app.appspot.com");
      const uuid = UUID();
      
      bucket.upload(
        "/tmp/uploaded-image.jpg", {
          uploadType: "media",
          destination: "/places/" + uuid + ".jpg",
          metadata: {
            metadata: {
              contentType: "image/jpeg",
              firebaseStorageDownloadTokens: uuid
            }
          }
        },
        (err, file) => {
          // view the file if not error
          if (!err) {
            response.status(201).json({
              imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
              bucket.name +
              "/o/" +
              encodeURIComponent(file.name) +
              "?alt=media&token=" +
              uuid,
              imagePath: "/places/" + uuid + ".jpg",
            });
          } else {
            // log the error
            console.log(err);
            response.status(500).json({
              error: err
            });
          }
        });
        // return 
      }) 
      .catch(error => {
        console.log("Token is invalid!")
        response.status(403).json({error: "Unauthorized"})
        // return
      })

  });
});


exports.deleteImage = functions.database
  .ref("/places/{placeId}")
  .onDelete(event => {
    const placeData = snapshot.val();
    const imagePath = placeData.imagePath;

    const bucket = gcs.bucket("rn-places-app.appspot.com");
    return bucket.file(imagePath).delete();
  });
