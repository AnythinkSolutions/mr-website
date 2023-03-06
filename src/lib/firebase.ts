
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  process.env.FB_SERVICE_ACCOUNT as string
);

export type FirebaseService = {
  admin: admin.app.App;
  db: admin.firestore.Firestore;
}

//Service as a singleton
const firebaseService = () => {
  let adminApp;

  if(admin.apps.length === 0){
    //first time here, initialize the service
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  else{
    adminApp = admin.apps[0];
  }
    
  return {
    admin: adminApp,
    db: getFirestore(adminApp!),
  };  
};

export default firebaseService;