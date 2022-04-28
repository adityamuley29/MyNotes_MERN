const mongoose = require("mongoose");
const userSchema = require("../models/userSchema");
const md5 = require("md5");

const User = mongoose.model("user", userSchema);

exports.login = (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  // console.log(password);

  User.findOne(
    {
      email: email,
    },
    function (err, user) {
      if (user) {
        console.log(user);
        if (user.password === password) {
          console.log(user);
          res.status(200).send({
            status: 200,
            message: "login successfull",
            user:{
              id:user.id,
              username:user.username,
              email:user.email
            },
          });
        } else {
          res
            .status(404)
            .send({ status: 404, message: "Please enter correct password..." });
        }
      } else {
        res.status(404).send({ status: 404, message: "user not present" });
      }
    }
  );
};

exports.register = (req, res) => {
  if (req.body.password === req.body.confirmPassword) {
    User.findOne({ email: req.body.email }, function (err, email) {
      if (email) {
        res
          .status(404)
          .send({ status: 404, message: "email already taken..." });
      } else {
        User.findOne({ username: req.body.username }, function (err, username) {
          if (username) {
            res
              .status(404)
              .send({ status: 404, message: "username already taken..." });
          } else {
            const newUser = new User({
              email: req.body.email,
              username: req.body.username,
              password: md5(req.body.password),
              confirmPassword: md5(req.body.confirmPassword),
            });

            newUser.save(function name(err) {
              if (err) {
                res
                  .status(404)
                  .send({ status: 404, message: "Somthing went wrong!" });
              } else {
                res.status(200).send({
                  status: 200,
                  message: "Registration Successfull...",
                });
              }
            });
          }
        });
      }
    });
  } else {
    res.send({ status: 404, message: "Please enter same password..." });
  }
};
