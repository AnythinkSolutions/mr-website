import { NextApiRequest, NextApiResponse } from "next";
import { Subscriber } from "../../../components/subscriptions/subscription-types";
import firebaseService from "../../../lib/firebase";
import { isValidEmail } from "../../../utilities/string-utilities";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(resolve => {
    if(req.method !== "POST"){
      res.status(404).end();
      resolve();
    }
    else{
      const { body } = req;      
      
      saveData(body).then(result => {
        if(result === ""){
          res.statusCode = 201;
          res.end();
        }
        else if(result === "duplicate"){
          // res.json({error: "You are already subscribed!"});
          res.status(422).end();
        }
        else{
          res.json({error: result});
          res.statusCode = 400;
          res.end();
        }

        resolve();
      })
      .catch(error => {
        res.json({error: error.toString()});
        res.status(500).end();
        resolve();
      });  
    }  
  });
}


const createSubscriber = (body: any) : {email: string, data: Subscriber} | null => {
  
  const { email, firstName, lastName, subscribedOn } = body;

  //email address is missing or invalid
  if(!isValidEmail(email)) return null;

  const subscriber = {
    email,
    data: {
      email,
      firstName,
      lastName,
      subscribedOn, //: (new Date().toUTCString()),
      source: "meghanrabbitt.com",
    }
  };

  return subscriber;
};

//-- Does the work of validating and saving the data.
const saveData = async (body: any) : Promise<string> => {
  
  const subscriber = createSubscriber(body);
  if(!subscriber) return "invalid subscriber data";
  if(await isAlreadySubscribed(subscriber)) return "duplicate";
      
  try{
    const db = firebaseService().db;

    const result = await db.collection("/subscribers")
      .doc(subscriber.email)
      .set(subscriber.data);

    console.log("subscriber write response: ", result);

    return "";
  }
  catch(ex){
    console.error("error saving data", ex);
    return "unexpected error";
  }
}

//-- Checks to see if this email address is already subscribed.
const isAlreadySubscribed = async (subscriber: Subscriber) => {
  try{
    const db = firebaseService().db;

    const docRef = db.collection("/subscribers").doc(subscriber.email);
    const docSnapshot = await docRef.get();
    if(docSnapshot.exists){
      console.log(`subscriber ${subscriber.email} attempted to re-subscribe.`);
      return true;
    }

    return false;
  }
  catch(ex){
    console.error("error checking for dupe email", ex);
    return "unexpected error";
  }
}