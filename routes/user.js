const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();
const Cryptr = require('cryptr');


router.get("/", (req, res) => {
    const decryptedResponse = []
    UserModel.find().sort({ $natural: -1 }).limit(10)
        .then(response => {
            response.forEach((item) => {
                decryptedResponse.push(decryptResponse(item,req.headers.userssecretkey))
            })
            res.json(decryptedResponse)
        })
        .catch(error => console.log(error));
})

router.get("/get-user-by-id", (req, res) => {
    const usersSecretKey = req.headers.userssecretkey;
    UserModel.findById(req.query.id)
        .then(response => {
            try {
                res.json(decryptResponse(response, usersSecretKey))
            }
            catch {
                res.json({ "error": "Bad Authenticate data" })
                res.statusCode = "401"
            }

        })
        .catch(error => console.log(error))
})

router.post("/", (req, res) => {
    const usersSecretKey = req.headers.userssecretkey;
    const user = new UserModel(encryptBody(req.body, usersSecretKey))
    console.log('Save :', req.body);
    user.save()
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            console.log(error);
            res.statusCode = "404"
        })
})

const decryptResponse = (response, usersSecretKey) => {
    const cryptr = new Cryptr(usersSecretKey);
    const decryptedResponse = {
        name: cryptr.decrypt(response.name),
        surname: cryptr.decrypt(response.surname),
        email: cryptr.decrypt(response.email),
        image: cryptr.decrypt(response.file),
        totalWorkTime: cryptr.decrypt(response.totalWorkTime),
        university: cryptr.decrypt(response.university),
        previousJob: cryptr.decrypt(response.previousJob),
        skills: cryptr.decrypt(response.skills),
        description: cryptr.decrypt(response.description),
    }
    return decryptedResponse
}
const encryptBody = (body, usersSecretKey) => {
    const cryptr = new Cryptr(usersSecretKey);
    const encryptedBody = {
        name: cryptr.encrypt(body.name),
        surname: cryptr.encrypt(body.surname),
        email: cryptr.encrypt(body.email),
        image: cryptr.encrypt(body.image),
        firstJobDay: body.firstJobDay,
        totalWorkTime: cryptr.encrypt(body.totalWorkTime),
        university: cryptr.encrypt(body.university),
        graduationTime: body.graduationTime,
        previousJob: cryptr.encrypt(body.previousJob),
        skills: cryptr.encrypt(body.skills),
        description: cryptr.encrypt(body.description),
        createdAt: body.createdAt
    }
    return encryptedBody
}

module.exports = router