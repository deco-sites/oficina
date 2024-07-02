// import { AppContext } from "../../apps/site.ts";
import { fetchAPI } from "apps/utils/fetch.ts";

interface Props {
  email: string;
}

export default async function action(
  { email }: Props,
  _req: Request,
  // ctx: AppContext,
) {
  // const { mandrillKeys } = ctx;

  // const apiKey = mandrillKeys?.find((key) =>
  //   key.key === "delete-account-request"
  // );

  // hardcoded for now
  const fromEmail = "sac@oficinareserva.com";
  const toEmail = "sac@oficinareserva.com";

  const subject = `Solicitação de exclusão da conta ${
    encodeURIComponent(email)
  }`;
  const text =
    `Olá,\n\nSou cliente do aplicativo Oficina e gostaria de requisitar a exclusão da conta com o email ${
      encodeURIComponent(email)
    }.`;

  // if (!apiKey?.value.get()) {
  //   throw new Error("API key is required");
  // }

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const response = await fetchAPI(
    "https://mandrillapp.com/api/1.0/messages/send",
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        key: "md-Fy3cRbNNxA57ZmTrsUHJqA",
        message: {
          text,
          from_email: fromEmail,
          subject: subject,
          to: [{ email: toEmail, type: "to" }],
        },
      }),
    },
  );

  return response;
}
