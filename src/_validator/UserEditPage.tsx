import * as Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validateInput( data: any ){
    const errors = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    };


    if (Validator.isEmpty(Validator.toString(data.firstName))){
        errors.firstName = "This field is required";
    }

    if (Validator.isEmpty(Validator.toString(data.lastName))){
        errors.lastName = "This field is required";
    }
  
    if (Validator.isEmpty(Validator.toString(data.username))){
      errors.username = "This field is required";
    }

    if (Validator.isEmpty(Validator.toString(data.password))){
      errors.password = "This field is required";
    }
  
    if (Validator.isEmpty(Validator.toString(data.confirmPassword))){
      errors.confirmPassword = "This field is required";
    }
  
    if (!Validator.equals(data.password, data.confirmPassword)){
      errors.confirmPassword = "Passwords must match";
    }
  
    return{
      errors,
      isValid: isEmpty(errors)
    }
  }