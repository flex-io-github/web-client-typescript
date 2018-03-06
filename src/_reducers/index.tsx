import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { employees } from './employee.reducers';
import { files } from './fileUpload.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  employees,
  files
});

export default rootReducer;