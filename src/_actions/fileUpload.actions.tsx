import { fileUploadConstants } from '../_constants';
import { fileUploadService } from '../_services';
import { alertActions } from './';
// import { history } from '../_helpers';

export const fileUploadActions = {
    add,
    getAll,
    delete: _delete,
    // update
};

function add(selectedFile: any) {
    return (dispatch: any) => {
        dispatch(request(selectedFile));

        fileUploadService.add(selectedFile)
            .then(
                () => { 
                    dispatch(success(selectedFile));
                    // history.push('/upload');
                    dispatch(alertActions.success('Upload complete'));
                    dispatch(getAll());
                },
                (error: any) => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(selectedFile: any) { return { type: fileUploadConstants.ADD_REQUEST, selectedFile }; }
    function success(selectedFile: any) { return { type: fileUploadConstants.ADD_SUCCESS, selectedFile }; }
    function failure(error: any) { return { type: fileUploadConstants.ADD_FAILURE, error }; }
}

function getAll() {
    return (dispatch: any) => {
        dispatch(request());

        fileUploadService.getAll()
            .then(
                (files: any) => dispatch(success(files)),
                (error: any) => dispatch(failure(error))
            );
    };

    function request() { return { type: fileUploadConstants.GETALL_REQUEST }; }
    function success(files: any) { return { type: fileUploadConstants.GETALL_SUCCESS, files }; }
    function failure(error: any) { return { type: fileUploadConstants.GETALL_FAILURE, error }; }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id: any) {
    return (dispatch: any) => {
        dispatch(request(id));
        
        fileUploadService.delete(id)
            .then(
                () => { 
                    dispatch(success(id));
                },
                (error: any) => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id: any) { return { type: fileUploadConstants.DELETE_REQUEST, id }; }
    function success(id: any) { return { type: fileUploadConstants.DELETE_SUCCESS, id }; }
    function failure(id: any, error: any) { return { type: fileUploadConstants.DELETE_FAILURE, id, error }; }
}

// function update(employee: any) {
//     return (dispatch: any) => {
//         dispatch(request(employee));

//         employeeService.update(employee)
//             .then(
//                 () => { 
//                     dispatch(success(employee));
//                     dispatch(alertActions.success('Update account successful'));
//                     history.push('/employees');
//                 },
//                 (error: any) => {
//                     dispatch(failure(error));
//                     dispatch(alertActions.error(error));
//                 }
//             );
//     };

//     function request(employee: any) { return { type: employeeConstants.UPDATE_REQUEST, employee }; }
//     function success(employee: any) { return { type: employeeConstants.UPDATE_SUCCESS, employee }; }
//     function failure(error: any) { return { type: employeeConstants.UPDATE_FAILURE, error }; }
// }