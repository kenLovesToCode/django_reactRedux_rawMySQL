import {
	STATE_STUDENT_TIMEIN,
	STATE_IS_CREATING,
	STATE_SET_SELECTED_DATA,
	STATE_IS_TIMEOUT,
} from "./stateActionTypes";
import { initialData } from "./initialData";

export default function (storeData, action) {
	switch (action.type) {
		case STATE_STUDENT_TIMEIN:
			return {
				...storeData,
				currentStudent: parseInt(action.payload),
			};
		case STATE_IS_CREATING:
			return {
				...storeData,
				isCreating: action.payload,
			};
		case STATE_SET_SELECTED_DATA:
			return {
				...storeData,
				selectedData: action.payload,
			};
		case STATE_IS_TIMEOUT:
			return {
				...storeData,
				isTimeOut: action.payload,
			};
		default:
			return storeData || initialData.stateData;
	}
}
