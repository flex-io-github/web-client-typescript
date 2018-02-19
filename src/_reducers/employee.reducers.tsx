import { employeeConstants } from '../_constants';

export function employees(state: any = {}, action: any) {
    switch (action.type) {
      case employeeConstants.ADD_REQUEST:
        return { registering: true };
      case employeeConstants.ADD_SUCCESS:
        return {};
      case employeeConstants.ADD_FAILURE:
        return {};
      case employeeConstants.GETALL_REQUEST:
        return {
          loading: true
        };
      case employeeConstants.GETALL_SUCCESS:
        return {
          items: action.employees
        };
      case employeeConstants.GETALL_FAILURE:
        return { 
          error: action.error
        };

        case employeeConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
          ...state,
          items: state.items.map((employee: any) =>
            employee.id === action.id
              ? { ...employee, deleting: true }
              : employee
          )
        };
      case employeeConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
          items: state.items.filter((employee: any) => employee.id !== action.id)
        };
      case employeeConstants.DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
          ...state,
          items: state.items.map((employee: any) => {
            if (employee.id === action.id) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...employeeCopy } = employee;
              // return copy of user with 'deleteError:[error]' property
              return { ...employeeCopy, deleteError: action.error };
            }
  
            return employee;
          })
        };
      case employeeConstants.UPDATE_REQUEST:
        return {
          items: state.items.map((c: any) => c.id === action.employee.id ? { ...c, ...action.employee } : c)
        };
      case employeeConstants.UPDATE_SUCCESS:
        return {
          ...state
        };
      case employeeConstants.UPDATE_FAILURE:
        return { 
          error: action.error
        };
      default:
        return state
    }
  }