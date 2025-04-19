
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.youtube_client_id,
  process.env.youtube_client_secret,
  process.env.redirect_uri
);


export default oauth2Client;
