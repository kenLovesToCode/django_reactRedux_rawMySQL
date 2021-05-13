import {
	STUDENTS,
	ATTENDANCES,
	PURPOSES,
	COURSES,
	DEPARTMENTS,
	ATTENDANCE_USING,
} from "./dataTypes";

export const initialData = {
	modelData: {
		[STUDENTS]: [
			{
				id: 1,
				id_number: 465996,
				first_name: "Joe",
				last_name: "Mama",
				course: "Bachelor of Engineering and Network Technology",
			},
		],
		[ATTENDANCES]: [
			{
				id: 1,
				time_in: "7:30 AM May 29, 20201",
				time_out: "USING",
				purpose: "Object Oriented Programming",
				student_id: 999999,
				staff: "jovanne",
			},
		],
		[ATTENDANCE_USING]: [
			{
				id: 1,
				time_in: "7:30 AM May 29, 20201",
				time_out: "USING",
				purpose: "Object Oriented Programming",
				student_id: 999999,
				staff: "jovanne",
			},
		],
		[PURPOSES]: [
			{ id: 1, title: "purpose 1", description: "purpose description 1" },
		],
		[COURSES]: [
			{
				id: 1,
				course_title: "BSCS",
				department_title: "CCE",
			},
		],
		[DEPARTMENTS]: [{ id: 1, course_code: 30, title: "CCE" }],
	},
	stateData: {
		currentStudent: 0,
		isCreating: false,
		selectedData: {},
		isTimeOut: false,
	},
};
