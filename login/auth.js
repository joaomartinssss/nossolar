const express = require("express");
const router = express.Router();
const User = require("../login/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  let { name, email, senha, cep, cpf, data_nascimento, telefone } = req.body;

  //remove os espaços e formata os dados
  name = name.trim();
  email = email.trim();
  cep = cep.replace(/\s+/g, "");
  telefone = telefone.replace(/\s+/g, "");

  //validação adicional pode ser adicionada aqui se necessário

  try {
    let user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).json({ msg: "Usuario já existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    user = await User.create({
      name,
      email,
      senha: hashedPassword,
      cep,
      cpf,
      data_nascimento,
      telefone,
    });

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
    console.error("Erro ao registrar usuário", err);
    res.status(500).send("Erro no servidor");
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ msg: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ msg: "Senha incorreta" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, "segredoDoToken", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          cep: user.cep,
          cpf: user.cpf,
          data_nascimento: user.data_nascimento,
          telefone: user.telefone,
        },
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro no servidor");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.error("Erro ao buscar usuário", err);
    res.status(500).send("Erro no servidor");
  }
});

module.exports = router;
