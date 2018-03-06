import { fileUploadConstants } from '../_constants';

export function files(state: any = {}, action: any) {
    switch (action.type) {
      case fileUploadConstants.ADD_REQUEST:
        return {...state};
      case fileUploadConstants.ADD_SUCCESS:
        return {...state};
      case fileUploadConstants.ADD_FAILURE:
        return {...state};

      case fileUploadConstants.GETALL_REQUEST:
        return {
          loading: true
        };
      case fileUploadConstants.GETALL_SUCCESS:
        return {
          items: action.files
        };
      case fileUploadConstants.GETALL_FAILURE:
        return { 
          error: action.error
        };

      //DELETE
        case fileUploadConstants.DELETE_REQUEST:
        return {
          ...state,
          items: state.items.map((file: any) =>
            file.id === action.id
              ? { ...file, deleting: true }
              : file
          )
        };
      case fileUploadConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
          items: state.items.filter((file: any) => file.id !== action.id)
        };
      case fileUploadConstants.DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        return {
          ...state,
          items: state.items.map((file: any) => {
            if (file.id === action.id) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...fileCopy } = file;
              // return copy of user with 'deleteError:[error]' property
              return { ...fileCopy, deleteError: action.error };
            }
  
            return file;
          })
        };
    //   case fileUploadConstants.UPDATE_REQUEST:
    //     return {
    //       items: state.items.map((c: any) => c.id === action.employee.id ? { ...c, ...action.employee } : c)
    //     };
    //   case fileUploadConstants.UPDATE_SUCCESS:
    //     return {
    //       ...state
    //     };
    //   case fileUploadConstants.UPDATE_FAILURE:
    //     return { 
    //       error: action.error
    //     };
      default:
        return state
    }
  }