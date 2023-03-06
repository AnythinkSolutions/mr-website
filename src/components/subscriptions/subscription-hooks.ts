import { SubscriptionContext } from './subscription-provider';
import { useContext } from "react";

export function useSubscription(){
  const context = useContext(SubscriptionContext);
  
  if(!context){
    throw Error("Subscription hooks and components can only be used inside Subscription Provider");
  }

  return context;
}