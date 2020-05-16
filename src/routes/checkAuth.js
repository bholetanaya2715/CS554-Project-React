const admin = require("firebase-admin");

var serviceAccount = require("./cs-554-project-firebase-adminsdk-k8wmd-ccd7fa09f4.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

function checkAuth(req, res, next) {
    if (req.headers.authtoken) {
        admin
            .auth()
            .verifyIdToken(req.headers.authtoken)
            .then((authObj) => {
                console.log("Auth TOken Object", authObj)
                req.authToken = { email: authObj.email }
                next();
            })
            .catch(() => {
                res.status(403).send("Unauthorized");
            });
    } else {
        res.status(403).send("Unauthorized");
    }
}

module.exports = {
    checkAuth
}