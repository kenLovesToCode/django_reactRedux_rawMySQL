// import { STUDENTS, ATTENDANCES } from "./dataTypes";
import { STORE, UPDATE, DELETE, GET, REMOVE_USING } from "./modelActionTypes";
import { endpoint } from "../constant";
import axios from "axios";

export const getDatas = (uri, dataType) => async (dispatch) => {
	try {
		const { data } = await axios.get(`${endpoint}/${uri}/`);
		dispatch({
			type: GET,
			dataType: dataType,
			payload: data,
		});
	} catch (err) {
		console.log("Error occured : ", err);
	}
};

export const insertData = (uri, dataType, payload) => async (dispatch) => {
	try {
		await axios.post(`${endpoint}/${uri}/`, payload);
		dispatch({
			type: STORE,
			dataType: dataType,
			payload: payload,
		});
	} catch (err) {
		console.log("Error occured : ", err);
	}
};

export const updateData = (uri, dataType, payload, id) => async (dispatch) => {
	try {
		await axios.put(`${endpoint}/${uri}/`, payload);
		var updatedPayload = { ...payload, id: parseInt(payload.id) };
		dispatch({
			type: UPDATE,
			dataType: dataType,
			payload: updatedPayload,
			id: id,
		});
	} catch (err) {
		console.log("Error occured : ", err);
	}
};

export const removeUsingAttendance = (dataType, payload) => (dispatch) => {
	try {
		dispatch({
			type: REMOVE_USING,
			dataType,
			payload: parseInt(payload),
		});
	} catch (err) {
		console.log("Error occured : ", err);
	}
};

export const deleteData = (uri, dataType, payload) => async (dispatch) => {
	try {
		await axios.delete(`${endpoint}/${uri}/${payload}`);
		dispatch({
			type: DELETE,
			dataType: dataType,
			payload: payload,
		});
	} catch (err) {
		console.log("Error occured : ", err);
	}
};
