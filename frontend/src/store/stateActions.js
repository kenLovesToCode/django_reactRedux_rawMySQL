import {
	STATE_STUDENT_TIMEIN,
	STATE_IS_CREATING,
	STATE_SET_SELECTED_DATA,
	STATE_IS_TIMEOUT,
} from "./stateActionTypes";

export const setStudent = (student) => ({
	type: STATE_STUDENT_TIMEIN,
	payload: student,
});

export const setCreating = (payload) => ({
	type: STATE_IS_CREATING,
	payload: payload,
});

export const setSelectedData = (payload) => ({
	type: STATE_SET_SELECTED_DATA,
	payload: payload,
});

export const setTimeOut = (payload) => ({
	type: STATE_IS_TIMEOUT,
	payload,
});
