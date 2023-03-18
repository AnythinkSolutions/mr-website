import { ChangeEvent, createContext, ReactNode, useCallback, useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import { Subscriber } from "./subscription-types";
import { validateInputs } from "./subscription-utils";

export type SubscriptionContext = {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubscribe: () => void;
  values: Subscriber;
  isSubscribed: boolean;
  error: any;
  isWorking: boolean;
}

export const SubscriptionContext = createContext<SubscriptionContext | null>(null);

export interface ISubscriptionProviderProps {
  children: ReactNode;
}

const subscribeUrl = "/api/subscribers";
const subscribedCookie = "mr-subscribed";

const SubscriptionProvider = ({children}: ISubscriptionProviderProps) => {
  const [values, setValues] = useState<Subscriber>({ email: "", firstName: "", lastName: ""});
  const [error, setError] = useState<any>(null);
  const [isSubscribed, setSubscribed] = useState(false);
  const [isWorking, setWorking] = useState(false);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    var key = e.target.id;
    var value = e.target.value;
    setValues({...values, [key]: value});
  }, [values]);

  const onSubscribe = useCallback(async () => {
    setError(null);

    if(values.email){

      const invalid = validateInputs(values);
      if(invalid){
        setError(invalid);
        return;
      }

      setWorking(true);

      try{
        const result = await fetch(subscribeUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          }
        });

        //422 means this is a duplicate, so just show them we got it!
        if(result.status === 201 || result.status === 422){
          setValues({email: "", firstName: "", lastName: ""});
          setError("");
          setSubscribed(true);
          //use a cookie to track that they're a subscriber
          cookieCutter.set(subscribedCookie, new Date().toISOString());
        }
        else{
          console.error("Fetch error adding to subscriber list", result);
          setError(`Unfortunately, we had a problem adding you to our subscriber list. Please confirm your email address and try again.`);
        }
      }
      catch(error: any){
        console.error("Unhandled error adding to subscriber list", error);
        setError(`Unfortunately, we had an unexpected problem adding you to our subscriber list. Please try again.`);
      }

      setWorking(false);
    }
  }, [values]);

  //Check to see if they're already subscribed.
  useEffect(() => {
    const alreadySubscribed = cookieCutter.get(subscribedCookie);
    if(!!alreadySubscribed) setSubscribed(true);
  }, []);

  const ctx: SubscriptionContext= {
    onInputChange,
    onSubscribe,
    values,
    error,
    isSubscribed: isSubscribed,
    isWorking,
  };

  return (
    <SubscriptionContext.Provider value={ctx}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionProvider;
