const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Entrer une nom d'utilisateur"],
  },
  email: {
    type: String,
    required: [true, "Entrer une adresse email"],
    unique: [true, "Cette adresse email est déja utilisée"],
  },
  password: {
    type: String,
    required: [true, "Entrer un mot de passe "],
  },
  role: {
    type: String,
    enum: ['etudiant', 'coordonateur', 'enseignant'],
    required: [true, "Specifier un role"]
  }
},
{
  timestamps: true,
}
)
module.exports = mongoose.model("User", userModel);