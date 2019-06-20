import { createReducer } from 'redux-starter-kit';
import { courses } from '../../res/demo/res';

import { setCourseData } from '../actions/actions';

const initialState = {};
export const courseReducer = createReducer(initialState, {
	[setCourseData]: (state) => {
		state.courses = courses;
	},
});
