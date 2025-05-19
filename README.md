# Website Info

Custom Website for Meghan Rabbitt, Inc. with a Google Sheet as the CMS/Database.

- Built in [Next.js](https://nextjs.org/)
- Bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- Built by Brian Schwalm at [Anythink Solutions](https://anythinksolutions.com)
- Deployed to [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
- Data served from a Google Sheet for a simple, no-config ad-hoc headless CMS

## Getting Started

Make sure you have setup a `.env.development` file to provide the environment variables for the project. If you don't have one, see below.

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**API**: All items under the `/api` folder in the project will be processed separate by NextJS, and kept on the server. So they can access server-only environment variables, and make API requests to external services with private keys, etc.

## Setup and Configuration

**Source Code**: the [mr-website](https://github.com/AnythinkSolutions/mr-website) repository in `Github/AnythinkSolutions`.

**Hosting**: the [mr-website](https://vercel.com/swift-agency/mr-website) in project `Vercel`.

### Cloud Projects

NOTE: there are **TWO** google cloud console projects, one for Google Sheets Integration, and one related to the Firebase Project. This is because the Firebase integration was added later to support the email subscription functionality. They are named the same thing (`mr-website`) so difficult to differentiate in the google cloud console.

- [mr-webiste](https://console.cloud.google.com/home/dashboard?authuser=0&hl=en&inv=1&invt=Abx0Cg&orgonly=true&project=mr-website-345812&supportedpurview=organizationId) Google Sheets API project on Google Cloud Console. This project contains the Google Sheets API Integration confirmation, including the `service account` and the `API key` used to access the google sheet as an API.
- [mr-website](https://console.firebase.google.com/project/mr-website-fb6db) Firebase Project. This is where the email subscriber list is saved
- [mr-website](https://console.cloud.google.com/home/dashboard?authuser=0&hl=en&inv=1&invt=Abx0Cg&orgonly=true&project=mr-website-fb6db&supportedpurview=organizationId) Google Cloud Console project. This was automatically created by Firebase.
  
**Deployment**: via github actions, and vercel integration. Deploys automatically when changes are pushed to the `main` branch in the [github repository](https://github.com/AnythinkSolutions/mr-website).

### Environment Variables

- `NEXT_PUBLIC_FB_SERVICE_ACCOUNT`: the [Firebase service account credentials](https://console.firebase.google.com/project/mr-website-fb6db/settings/serviceaccounts/adminsdk) for the Firebase Project.
-`GS_CLIENT_EMAIL`: The service account defined in the (Google Sheets API) google cloud console project.
- `GS_PRIVATE_KEY`: The private key for the service account defined above.
- `SS_ID`: The spreadsheet id of the google sheet used for the back end. The spreadsheet URL will look like: `https://docs.google.com/spreadsheets/d/{id}`, so this just the `{id}` part.

NOTE: The Environment Variables prefixed with `NEXT_PUBLIC_` will be passed to the client application in the browser by NextJS, so they must not contain any sensitive information, or private keys. The remaining  items will be used on the server by NextJS and the items under the `/api` folder, so can can contain sensitive information.

### Google Drive & Google Sheet

- The Google Sheet and all assets used by the website are located here: [MR Website](https://drive.google.com/drive/folders/1FdObXegaTflAGl42K8z-4exw_E3oDJrX).
- The Google Sheet that serves as the data source for this website (`MR Portfolio`) must be shared with the `Service Account` from the `mr-website` google cloud project. This serivce account is the `GS_CLIENT_EMAIL` environment variable, found in the Google Cloud Project (for the google sheets api, not the project for firebase).
- The items in the `portfolio-images` sub-folder are shared with `Anyone with the link`, however I'm not sure if this is required, as other assets in the various sub-folders are not shared. TODO: figure out if this is necessary.



## Resources

For instructions on integrating with Google Sheets, see the following article: [NEXT 14 Google Sheets Integration](https://medium.com/@kewinf271/next-14-google-sheets-integration-5225f8e9b7c8). This is not the one I originally used, but it is similar.
