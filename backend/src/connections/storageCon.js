
import dotenv from "dotenv";
dotenv.config({path:"../.././.env"});
import B2 from "backblaze-b2";

export const authorizeB2 = async () => {
  const b2 = new B2({
    applicationKeyId: process.env.B2_KEYID,
    applicationKey: process.env.B2_APPKEY,
  });

   

  await b2.authorize();
  console.log(b2);
  return b2;
};
