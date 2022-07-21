import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ce3d51c4e37280",
    pass: "2e18162c28108d",
  },
});

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
