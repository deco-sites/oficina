export interface API {
  "POST /1.0/messages/send": {
    response: unknown;
    body: {
      key: string;
      message: {
        from_email: string;
        subject: string;
        text: string;
        to: [{
          email: string;
          type: "to";
        }];
      };
    };
  };
}
