import { botSubscribe } from '../../lib/gtag';
import { isValidEmail } from './../../utilities/string-utilities';
import { Subscriber } from "./subscription-types";

//--
// Validates the user inputs for the subscription and returns an error if there's
// something wrong.
export const validateInputs = (values: Subscriber): string | null => {

  if(!isValidEmail(values.email)){
    return "Please enter a valid email address";
  }

  if(!values.firstName){
    return "Please enter your first name.";
  }

  if(!!values.nonHumans){
    botSubscribe();
    return "Humans shouldn't enter a value in the hidden field.";
  }

  return null;
}