import React, { useEffect, useState, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { COURSES, DEPARTMENTS } from "../../store/dataTypes";
import { insertData, updateData, getDatas } from "../../store";

const useStyles = makeStyles((theme) => ({
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	paper: {
		marginTop: theme.spacing(5),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	select: {
		margin: theme.spacing(4, 0, 4),
	},
	formControl: {
		margin: theme.spacing(2, 0, 3),
		minWidth: 390,
	},
	button: {
		margin: theme.spacing(1),
		minWidth: 180,
	},
}));

const mapStateToProps = (storeData) => ({
	courses: storeData.modelData[COURSES],
	isCreating: storeData.stateData.isCreating,
	course: storeData.stateData.selectedData,
	departments: storeData.modelData[DEPARTMENTS],
});

const mapDispatchToProps = {
	insertCourse: insertData,
	updateCourse: updateData,
	getDepartments: getDatas,
};
function CourseEditor(props) {
	const classes = useStyles();
	useEffect(() => {
		props.getDepartments("api/v1/departments", DEPARTMENTS);
	}, []);
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			id: props.course.id || 1,
			course_title: props.course.course_title || "",
			department_title: props.course.department_title || "",
		}
	);

	const handleCancel = () => {
		props.history.push("/administrator/courses");
	};

	const handleSubmit = () => {
		if (props.isCreating) {
			props.insertCourse("api/v1/courses", COURSES, userInput);
			props.history.push("/administrator/courses");
		} else {
			props.updateCourse(
				`api/v1/courses/${props.course.id}`,
				COURSES,
				{ ...userInput, id: props.course.id },
				props.course.id
			);
			props.history.push("/administrator/courses");
		}
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const newValue = e.target.value;
		setUserInput({
			[name]: newValue,
		});
	};
	return (
		<Container maxWidth="xs">
			<div className={classes.paper}>
				{props.isCreating ? (
					<Typography variant="h4">Create new course</Typography>
				) : (
					<Typography variant="h4">Update course details</Typography>
				)}
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Course"
						name="course_title"
						value={userInput.course_title}
						onChange={handleChange}
					/>
					<Select
						fullWidth
						className={classes.select}
						value={userInput.department_title}
						name="department_title"
						onChange={handleChange}
					>
						{props.departments.map((d) => (
							<MenuItem key={d.id} value={d.title}>
								{d.title}
							</MenuItem>
						))}
					</Select>
					<Button
						className={classes.button}
						onClick={handleSubmit}
						variant="outlined"
						color="primary"
					>
						Submit
					</Button>
					<Button
						className={classes.button}
						variant="outlined"
						color="secondary"
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CourseEditor)
);
