const express = require("express");
const router = express.Router();
const User = require("../login/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, senha, cep, cpf, data_nascimento } = req.body;

  try {
    let user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ msg: "Usuario já existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);
    // user.password = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      senha: hashedPassword,
      cep,
      cpf,
      data_nascimento,
    });

    // user = new User({
    //   name,
    //   email,
    //   senha,
    //   cep,
    //   cpf,
    //   data_nascimento,
    // });

    // await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "segredoDoToken", // Você deve usar uma variável de ambiente em um ambiente de produção
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
