import { ChangeEvent, createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { Subscriber } from "./subscription-types";

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

//TODO: add a cookie so we know when someone has already subscribed

const SubscriptionProvider = ({children}: ISubscriptionProviderProps) => {

  const [values, setValues] = useState<Subscriber>({ email: "", name: ""});
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

    if(values.email && values.email.length > 3){
      setWorking(true);

      try{
        const result = await fetch(subscribeUrl, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          }
        });

        if(result.status === 201){
          setValues({email: "", name: ""});
          setSubscribed(true);
          //TODO: add a cookie so we know when they're returning?
        }
        else{
          setError(result);
        }
      }
      catch(error){
        setError(error);
      }

      setWorking(false);
    }
  }, [values]);

  const ctx: SubscriptionContext= {
    onInputChange,
    onSubscribe,
    values,
    error,
    isSubscribed,
    isWorking,
  };

  return (
    <SubscriptionContext.Provider value={ctx}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionProvider;
