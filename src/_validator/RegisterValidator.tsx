import * as Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validateInput( data: any ){
    const errors = {
        username: "",
        password: "",
        confirmPassword: "",
        auth_user_role_id: "",
        employee_id: ""
    };
  
    if (Validator.isEmpty(Validator.toString(data.username))){
      errors.username = "This field is required";
    }

    if (Validator.isEmpty(Validator.toString(data.password))){
      errors.password = "This field is required";
    }
  
    if (Validator.isEmpty(Validator.toString(data.confirmPassword))){
      errors.confirmPassword = "This field is required";
    }
  
    if (!Validator.equals(Validator.toString(data.password), Validator.toString(data.confirmPassword))){
      errors.confirmPassword = "Passwords must match";
    }

    if (Validator.isEmpty(Validator.toString(data.auth_user_role_id))){
      errors.auth_user_role_id = "This field is required";
    }
  
    return{
      errors,
      isValid: isEmpty(errors.username) && isEmpty(errors.password) && isEmpty(errors.confirmPassword) && isEmpty(errors.auth_user_role_id)
    }
  }