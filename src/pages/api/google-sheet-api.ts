import { google } from "googleapis";
import { mapRowToArticle, mapRowToClient, mapRowToService, mapRowToTestimonial } from "../../utilities/api-utilities";

//--- Gets the data for the portfolio section
//--- from the google sheet
export async function getPortfolioData() {
  const sheetName = `${process.env.SS_NAME_ARTICLE ?? "Articles"}`;
  const articles = await getSheetData(sheetName, mapRowToArticle);

  const ordered = articles
    .filter(i => !i.isHidden && !!i.url)
    .sort((a, b) => (a.order ?? 999)  - (b.order ?? 999));

  return ordered;
}

//--- Gets the data for the clients section
//--- from the google sheet
export async function getClientData() {
  const sheetName = `${process.env.SS_NAME_CLIENT ?? "Clients"}`;
  const clients = await getSheetData(sheetName, mapRowToClient);

  const ordered = clients
    .sort((a, b) => (a.order ?? 999)  - (b.order ?? 999));

  return ordered;
}

//--- Gets the data for the testimonial section
//--- from the google sheet
export async function getTestimonialData() {
  const sheetName = `${process.env.SS_NAME_TESTIMONIAL ?? "Testimonials"}`;
  const testimonials = await getSheetData(sheetName, mapRowToTestimonial);

  const ordered = testimonials
    .filter(i => !i.isHidden)
    .sort((a, b) => (a.order ?? 999)  - (b.order ?? 999));

  return ordered;
}

//--- Gets the data for the services section
//--- from the google sheet
export async function getServiceData(){
  const sheetName = `${process.env.SS_NAME_SERVICE ?? "Services"}`;
  const services = await getSheetData(sheetName, mapRowToService);
  
  //filter out hidden items
  const visibleServices = services.filter(svc => !svc.isHidden);
  return visibleServices;
}

//===========================
// ====  Private Helpers ====

async function getSheetData<RowType>(sheetName: string, rowMapFunc: (row: any) => RowType) : Promise<RowType[]> {
  try {
    console.log(`[Debug] Attempting to fetch sheet: ${sheetName}`);
    console.log(`[Debug] Using spreadsheet ID: ${process.env.SS_ID}`);
    
    const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    const jwt = new google.auth.JWT(
      process.env.GS_CLIENT_EMAIL,
      undefined,
      (process.env.GS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      target
    );

    console.log(`[Debug] JWT created with client email: ${process.env.GS_CLIENT_EMAIL?.substring(0, 5)}...`);
    
    const sheets = google.sheets({ version: "v4", auth: jwt });
    console.log(`[Debug] Google Sheets client initialized`);
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SS_ID,
      range:`${sheetName}`,
    });

    console.log(`[Debug] API Response received`);
    const rows = response.data.values;

    if (rows?.length) {
      console.log(`[Debug] Found ${rows.length} rows in sheet`);
      const items = rows.slice(1).map(row => rowMapFunc(row));
      return items;
    } else {
      console.log(`[Debug] No rows found in sheet`);
    }
  } catch (error: any) {
    console.error('[Error] Google Sheets API Error:', {
      error: error.message,
      code: error.code,
      status: error.status,
      details: error.errors,
      sheet: sheetName,
      envVarsPresent: {
        SS_ID: !!process.env.SS_ID,
        GS_CLIENT_EMAIL: !!process.env.GS_CLIENT_EMAIL,
        GS_PRIVATE_KEY: !!process.env.GS_PRIVATE_KEY,
      }
    });
  }

  return [];
}