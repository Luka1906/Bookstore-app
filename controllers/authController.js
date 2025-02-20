import bcrypt from "bcrypt";
import * as User from "../models/authModel.js";
import { registerSchema } from "../config/validation.js";

export const getSignIn = (req, res) => {
  res.render("signIn.ejs");
};

export const registerUser = async (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;
  const {error} = registerSchema.validate({name,email,password});
  console.log(error.details)
  const saltRounds = 10;

  try {
    const user = await User.getUser(email);
    if (user.length > 0) {
      res.render("signIn", { error: "Email already exists. Try logging in" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.postUser(name, email, hashedPassword);
      console.log(newUser);
    }
    res.redirect("/signIn");
  } catch (error) {
    console.log(error);
  }
};

export const signInUser = async (req, res) => {
  const { email } = req.body;
  const loginPassword = req.body.password;

  try {
    const user = await User.getUser(email);
    if (user.length > 0) {
      const storedHashedPassword = user[0].password;
      const passMatched = await bcrypt.compare(
        loginPassword,
        storedHashedPassword
      );

      if (passMatched) {
        req.session.user = {
          id: user[0].id,
          username: user[0].name,
          email: user[0].email,
        };

        res.redirect("/addBook");
      } else {
        res.render("signIn.ejs", { error: "Incorrect password. Try again!" });
      }
    } else {
      res.render("signIn.ejs", { error: "Incorrect username. Try again!" });
    }
  } catch (error) {
    console.log(error);
    res.render("signIn.ejs", { error: "An error occurred" });
  }
};

export const signOutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to sign out");
    } else {
      res.clearCookie("connect.sid", {
        path: "/",
        httpOnly: true,
        secure: false, // Set this to true if using HTTPS
      });
      res.redirect("/signIn");
    }
  });
};
