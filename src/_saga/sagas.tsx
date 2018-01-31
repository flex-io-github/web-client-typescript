import { takeEvery, call, fork } from 'redux-saga/effects';
import { config } from '../_helpers';
import { userConstants } from '../_constants'

// 1. our worker saga
function* createLessonAsync(action: any) {
    try {
        // trying to call our api
        const api = config.apiUrl + '/users'
        console.log(api)
        const response = yield call(fetch, api)
        console.log(response)
    } catch (error) {
        // act on the error
        console.log('error')
    }
}

// 2. our watcher saga
//Our watcher saga! spawn a new task on each ACTION
export function* watchCreateLesson() {
    yield takeEvery(userConstants.GETALL_REQUEST, createLessonAsync)
}

// 3. our root saga
// sigle entry point to start sagas at once.
export default function* rootSaga() {
    yield [
        fork(watchCreateLesson),
    ]
}