import * as Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validateInput( data: any ){
    const errors = {
        code: '',
        given_name: '',
        other_given_name: '',
        surname: '',
        prefix: '',
        suffix: '',
        data_of_birth: '',
        gender_id: '',
        email_address: '',
        mobile_number: '',
        work_type_id: '',
        employee_status_id: '',
    };


    if (Validator.isEmpty(Validator.toString(data.code))){
        errors.code = "This field is required";
    }

    if (Validator.isEmpty(Validator.toString(data.given_name))){
        errors.given_name = "This field is required";
    }
  
    if (Validator.isEmpty(Validator.toString(data.surname))){
      errors.surname = "This field is required";
    }

    if (Validator.isEmpty(Validator.toString(data.data_of_birth))){
        errors.data_of_birth = "This field is required";
    }

    if (Validator.isEmpty(Validator.toString(data.mobile_number))){
        errors.mobile_number = "This field is required";
    }

    if (Validator.isEmpty(Validator.toString(data.email_address))){
        errors.email_address = "This field is required";
    }
  
    return{
        errors,
        isValid: isEmpty(errors.code) && isEmpty(errors.given_name) && isEmpty(errors.surname) &&
            isEmpty(errors.data_of_birth) && isEmpty(errors.mobile_number) && isEmpty(errors.email_address)
    }
  }