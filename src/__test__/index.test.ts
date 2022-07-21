import { describe, expect, it } from "vitest";
import { transport } from "../services/sendMail";
import { prisma } from "../utils/prisma";

describe("sum 2 + 2", () => {
  it("create new feedback", async () => {
    await expect(
      prisma.feedback.create({
        data: {
          type: "bug",
          comment: "comment",
          screenshot: "screenshot",
        },
      }),
    ).resolves.not.toThrow();
  });

  it("send new email with feedback", async () => {
    await expect(
      transport.sendMail({
        from: "Equipe Feedget <feedget@feedget.com>",
        to: "Wesley Araújo <weleyara.contato@gmail.com>",
        subject: "Novo feedback",
        html: [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<p>Novo feedback de BUG</p>`,
          `<p>Comentário</p>`,
          `</div>`,
        ].join("\n"),
      }),
    ).resolves.not.toThrow();
  });
});
