import sgMail from "@sendgrid/mail";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationToken = async (data: {
  email: string;
  name: string;
  token: string;
}) => {
  const msg = {
    to: data.email,
    from: process.env.EMAIL_SENDGRID,
    subject: "Confirmação de Cadastro",
    text: `Link para confirmação`,
    html: `<h1>Olá ${data.name}</h1>
      <p>Clique no link abaixo para o próximo passo do seu cadastro:</p>
      <a target="_blank" href="${process.env.WEB_URL}/session/confirmation?email=${data.email}&token=${data.token}"> Seguir com meu cadastro </a>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.log("Email doesn't sent = ", error.message);
    const userRepository = getCustomRepository(UserRepository);
    await userRepository.delete({ email: data.email });
    throw new Error(`Sendgrid: ${error.message}`);
  }
};

export { sendConfirmationToken };
