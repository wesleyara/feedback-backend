import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ce3d51c4e37280",
    pass: "2e18162c28108d",
  },
});
