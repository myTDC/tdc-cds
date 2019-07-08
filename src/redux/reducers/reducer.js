import { createReducer } from 'redux-starter-kit';
import { courses } from '../../res/demo/res';

import { setCourseData, updateCourseData } from '../actions/actions';

const initialState = { courses: {} };
export const courseReducer = createReducer(initialState, {
	[setCourseData]: (state) => {
		state.courses = { ...courses };
	},
	[updateCourseData]: (state, action) => {
		state.courses[action.course][action.module] = {
			heading: [...action.heading],
			metaData: [action.date, action.author],
			sectionData: {
				subHeading: [...action.subHeading],
				content: [...action.content],
				media: [...action.media],
			},
		};
	},
});
