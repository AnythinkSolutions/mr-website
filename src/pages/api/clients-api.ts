import { google } from "googleapis";
import { mapRowToClient } from "../../utilities/portfolio-utilties";

export async function getClientData() {
  try {
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GS_CLIENT_EMAIL,
      undefined,
      (process.env.GS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      target
    );

    const sheets = google.sheets({ version: "v4", auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SS_ID,
      range:`${process.env.SS_NAME_CLIENT}`,
    });

    const rows = response.data.values;

    if (rows?.length) {
      const clientItems = rows.slice(1).map(row => mapRowToClient(row));
      const ordered = clientItems.filter(i => !i.isHidden).sort((a, b) => (a.order ?? 999)  - (b.order ?? 999));
      return ordered;
    }
  } catch (err) {
    console.log(err);
  }

  return [];
}

