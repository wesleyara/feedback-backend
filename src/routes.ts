import express from "express";
import { prisma } from "./utils/prisma";
import { transport } from "./services/sendMail";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type: type,
      comment: comment,
      screenshot: screenshot,
    },
  });

  await transport.sendMail({
    from: "Equipe Feedget <feedget@feedget.com>",
    to: "Wesley Araújo <weleyara.contato@gmail.com>",
    subject: "Novo feedback",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Novo feedback de ${type}</p>`,
      `<p>${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });

  return res.status(201).json({
    data: feedback,
    status: "Success",
  });
});
