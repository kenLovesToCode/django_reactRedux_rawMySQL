import { createStore, combineReducers, applyMiddleware } from "redux";
import modelReducer from "./modelReducer";
import stateReducer from "./stateReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = [thunk];

export default createStore(
	combineReducers({
		modelData: modelReducer,
		stateData: stateReducer,
	}),
	composeWithDevTools(applyMiddleware(...middleware))
);

export {
	getDatas,
	insertData,
	updateData,
	deleteData,
	removeUsingAttendance,
} from "./modelActionCreator";
export {
	setStudent,
	setCreating,
	setSelectedData,
	setTimeOut,
} from "./stateActions";
