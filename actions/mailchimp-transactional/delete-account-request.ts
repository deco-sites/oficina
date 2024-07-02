import { AppContext } from "../../apps/site.ts";
import { createHttpClient } from "apps/utils/http.ts";
import { API } from "../../sdk/mailchimp-transactional/client.ts";

interface Props {
  fromEmail: string;
  subject: string;
  text: string;
  toEmail: string;
}

export default async function action(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const { mandrillKeys } = ctx;
  const apiKey = mandrillKeys?.find((key) =>
    key.key === "delete-account-request"
  );
  console.log({ mandrillKeys, apiKey, ctx });

  if (!apiKey?.value.get()) {
    throw new Error("API key is required");
  }

  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  const api = createHttpClient<API>({
    base: "https://mandrillapp.com/api/",
    headers,
  });

  const { fromEmail, subject, toEmail, text } = props;

  const response = await api["POST /1.0/messages/send"]({}, {
    body: {
      key: apiKey?.value.get()!,
      message: {
        text,
        from_email: fromEmail,
        subject: subject,
        to: [{ email: toEmail, type: "to" }],
      },
    },
  }).then((res) => res.json());

  console.log({ response });

  return response;
}
