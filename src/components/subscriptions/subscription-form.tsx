import { useSubscription } from "./subscription-hooks";

interface ISubscribeFormProps {
  title: string;
  sectionHeader?: boolean;
}

function SubscribeForm({title, sectionHeader}: ISubscribeFormProps){
  const { onInputChange, onSubscribe, values, error, isSubscribed, isWorking } = useSubscription();

  return (
    <div className="flex flex-col w-full items-center">
      {!isSubscribed && sectionHeader && (
          <>
            <div className="w-full flex flex-col items-center justify-center my-4 ml-4 section-header">
              <h2>{title}</h2>
              <div className="gradient_line lg" />
            </div>
            <span className="text-2xl font-light text-center mb-4">Be the first to get information about the book, my writing and other exciting news.</span>
          </>
        )
      }
      {!isSubscribed && !sectionHeader && (
          <div className="flex flex-col items-center w-3/5">
            <span className="text-4xl text-center mb-4">{title}</span>
            <span className="text-2xl font-light text-center mb-4">Be the first to get information about the book, my writing and other exciting news.</span>
          </div>
        )
      }

      {isSubscribed && (
        <span className="my-2 text-xl w-full px-8 text-center">
          Thank you for being a subscriber.<br/>Look for some exciting updates soon!
        </span>
      )}
      
      {error && (
        <span className="my-2 text-red-600">
          {error.toString()}
        </span>
      )}
      
      {!isSubscribed && (
        <div className="flex flex-col my-2 w-1/2 gap-y-2 items-center">
          <input id="email" value={values.email} placeholder="Enter your email address*" onChange={onInputChange} disabled={isWorking} className="border-2 rounded px-4 py-2 w-full text-xl"/>
          <div className="flex justify-between w-full">
            <input id="firstName" value={values.firstName} placeholder="First name*" onChange={onInputChange} disabled={isWorking} className="border-2 rounded px-4 py-2 w-full text-xl mr-2"/>  
            <input id="lastName" value={values.lastName} placeholder="Last name" onChange={onInputChange} disabled={isWorking} className="border-2 rounded px-4 py-2 w-full text-xl"/>
          </div>
          <input id="nonHumans" value={values.nonHumans} placeholder="this is not for people" onChange={onInputChange} className="hidden" />
          <button onClick={onSubscribe} disabled={isWorking} className="border rounded bg-neutral-500 text-white text-2xl font-light py-2 min-w-[200px] mt-4">
            {isWorking ? "Working..." : "Subscribe"}
          </button>
          <span className="text-sm font-light text-center">We promise never to sell your information or send you spam.</span>
        </div>  
      )}
    </div>
  );

}

export default SubscribeForm;