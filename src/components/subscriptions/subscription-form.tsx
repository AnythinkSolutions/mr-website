import { ChangeEvent, useState } from "react";
import { useSubscription } from "./subscription-hooks";

function SubscribeForm(){
  const { onInputChange, onSubscribe, values, error, isSubscribed, isWorking } = useSubscription();
  // const [values, setValues] = useState<Subscriber>({ email: "", name: ""});
  // const [message, setMessage] = useState<StatusMessage | null>(null);
  // const [isWorking, setWorking] = useState(false);

  // const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   var key = e.target.id;
  //   var value = e.target.value;
  //   setValues({...values, [key]: value});
  // }

  // const onSubscribe = async () => {
  //   if(values.email && values.email.length > 3){
  //     setWorking(true);

  //     try{
  //       const result = await fetch(url, {
  //         method: "POST",
  //         body: JSON.stringify(values),
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       });

  //       if(result.status === 201){
  //         setValues({email: "", name: ""});
  //         setMessage({ status: "success", value: "You've been successfully added. Thank you for subscribing, and look for updates and content soon!", isSubscribed: true});
  //         //TODO: add a cookie so we know when they're returning?
  //       }
  //       else{
  //         setMessage({ status: "error", value: `${result.status}: ${result.statusText ?? "Failed to add your email. Please verify your email address."}`});
  //       }
  //     }
  //     catch(error){
  //       setMessage({ status: "error", value: (error as any).toString()});        
  //     }

  //     setWorking(false);
  //   }
  // }

  return (
    <div className="flex flex-col items-center w-full my-4 py-4 px-16 border rounded-lg bg-slate-50">
      {!isSubscribed && (
        <span>Subscribe to my email list to receive updates</span>
      )}

      {isSubscribed && (
        <span className="my-2 text-green-600">
          You have been successfully added. Thank you for subscribing, I appreciate your support!  
        </span>
      )}
      
      {error && (
        <span className="my-2 text-red-600">
          {error.toString()}
        </span>
      )}
      
      {!isSubscribed && (
        <div className="flex my-2 w-full">
          <input id="email" value={values.email} placeholder="Email Address" onChange={onInputChange} disabled={isWorking} className="border-2 rounded px-4 py-2 mr-2 w-full"/>
          <input id="name" value={values.name} placeholder="Full Name" onChange={onInputChange} disabled={isWorking} className="border-2 rounded px-4 py-2 mr-2 w-full"/>
          <button onClick={onSubscribe} disabled={isWorking} className="border rounded bg-neutral-500 text-white mr-2 px-4 py-2 min-w-[150px]">
            {isWorking ? "Working..." : "Subscribe"}
          </button>
        </div>  
      )}
    </div>
  );

}

export default SubscribeForm;