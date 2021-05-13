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
import { COURSES, STUDENTS } from "../../store/dataTypes";
import { getDatas, insertData, updateData } from "../../store";

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
	student: storeData.stateData.selectedData,
});

const mapDispatchToProps = {
	getCourses: getDatas,
	insertStudent: insertData,
	updateStudent: updateData,
};

function StudentEditor(props) {
	const classes = useStyles();
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			id: props.student.id || "",
			first_name: props.student.first_name || "",
			last_name: props.student.last_name || "",
			course: props.student.course || "BSCS",
		}
	);

	useEffect(() => {
		props.getCourses("api/v1/courses", COURSES);
	}, []);

	const handleChange = (e) => {
		const name = e.target.name;
		const newValue = e.target.value;
		setUserInput({
			[name]: newValue,
		});
	};
	const handleSubmit = () => {
		if (props.isCreating) {
			props.insertStudent("api/v1/students", STUDENTS, userInput);
			props.history.push("/administrator/students");
		} else {
			props.updateStudent(
				`api/v1/students/${props.student.id}`,
				STUDENTS,
				userInput,
				props.student.id
			);
			props.history.push("/administrator/students");
		}
	};

	const handleCancel = () => {
		props.history.push("/administrator/students");
	};

	return (
		<Container maxWidth="xs">
			<div className={classes.paper}>
				{props.isCreating ? (
					<Typography variant="h4">Create new student</Typography>
				) : (
					<Typography variant="h4">Update student details</Typography>
				)}
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="ID Number"
						name="id"
						value={userInput.id}
						onChange={handleChange}
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="First Name"
						name="first_name"
						onChange={handleChange}
						value={userInput.first_name}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Last Name"
						name="last_name"
						onChange={handleChange}
						value={userInput.last_name}
					/>
					<FormControl className={classes.formControl}>
						<InputLabel shrink id="demo-simple-select-placeholder-label-label">
							Course
						</InputLabel>
						<Select
							fullWidth
							className={classes.select}
							value={userInput.course}
							onChange={handleChange}
							name="course"
						>
							{props.courses.map((course) => (
								<MenuItem value={course.course_title} key={course.id}>
									{course.course_title}
								</MenuItem>
							))}
						</Select>
					</FormControl>
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
	connect(mapStateToProps, mapDispatchToProps)(StudentEditor)
);
