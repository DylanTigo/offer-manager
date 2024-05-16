import { asyncHandler } from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

//Inscription d'un utilisateur
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, role, password } = req.body;
  if (!username || !email || !role) {
    res.status(403);
    throw new Error('Veuillez remplir tous les champs');
  }
  const userAvailaible = await User.findOne({ email });
  if (userAvailaible) {
    res.status(400)
    throw new Error('Cet Email est déja utilisée');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    role,
    password: hashedPassword
  });
  if (!user) {
    res.status(400)
    throw new Error('Erreur lors de l\'inscription');
  }
  res.status(200).json({message: "Inscription reussit"})
})


// Connexion d'un utilisateur
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let expiresIn;
    rememberMe ? (expiresIn = 30 * 24) : (expiresIn = 24);

    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user.id,
      },
      process.env.SECRET_ACCESS_TOKEM,
      {
        expiresIn: expiresIn+"h",
      }
    );
    res.status(200).json({ token });
  } else {
    res.status(401);
    throw new Error("Email ou Mot de passe incorrect");
  }
})
