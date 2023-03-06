import { NextApiRequest, NextApiResponse } from "next";
import firebaseService from "../../../lib/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>(resolve => {
    if(req.method !== "POST"){
      res.status(404).end();
      resolve();
    }
    else{
      const { body } = req;
      saveData(body).then(result => {
        if(result === true){
          res.statusCode = 201;
          res.end();
        }
        else{
          res.json({error: "invalid request, or error."});
          res.status(400).end();
        }

        resolve();
      })
      .catch(error => {
        res.json(error);
        res.status(500).end();
        resolve();
      });  
    }  
  });
}

const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;


const createSubscriber = (body: any) => {
  
  const { email, name } = body;

  if(!email || !emailRegex.test(email)){
    return null;  //email address is missing or invalid
  }

  const subscriber = {
    email,
    data: {
      email,
      name,
      subscribedOn: (new Date().toUTCString()),
      source: "meghanrabbitt.com",
    }
  };

  return subscriber;
};


const saveData = async (body: any) => {
  const subscriber = createSubscriber(body);

  if(!subscriber) return false;

  try{
    const db = firebaseService().db;

    const result = await db.collection("/subscribers")
      .doc(subscriber.email)
      .set(subscriber.data);

    console.log("subscriber write response: ", result);

    return true;
  }
  catch(ex){
    console.error("error saving to firebase", ex);
    return false;
  }
}