import bcrypt from "bcrypt";
import * as User from "../models/authModel.js";

export const getSignIn = (req, res) => {
  res.render("signIn.ejs");
};

export const registerUser = async (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { password } = req.body;
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
  console.log(req.isAuthenticated);

  try {
    const user = await User.getUser(email);
    if (user.length > 0) {
      const storedHashedPassword = await user[0].password;
      const passMatched = await bcrypt.compare(
        loginPassword,
        storedHashedPassword
      );
      console.log(passMatched);
      if (passMatched) {
        req.session.user = {
          id: user[0].id,
          username: user[0].name,
          email: user[0].email,
        };
        req.session.user_id = user[0].id; 
        console.log("Session user ID: ", req.session.user_id); 
        res.redirect("/addBook");
      } else {
        res.render("signIn", { error: "Incorrect password" });
      }
    } else {
      res.render("signIn", { error: "User not found" });
    }
  } catch (error) {}
};
