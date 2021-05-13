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

import { DEPARTMENTS } from "../../store/dataTypes";
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
	departments: storeData.modelData[DEPARTMENTS],
	isCreating: storeData.stateData.isCreating,
	department: storeData.stateData.selectedData,
});

const mapDispatchToProps = {
	insertDepartment: insertData,
	updateDepartment: updateData,
};
function DepartmentEditor(props) {
	const classes = useStyles();
	const [userInput, setUserInput] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		{
			id: props.department.id || 1,
			course_code: props.department.course_code || "",
			title: props.department.title || "",
		}
	);

	const handleCancel = () => {
		props.history.push("/administrator/departments");
	};

	const handleSubmit = () => {
		if (props.isCreating) {
			props.insertDepartment("api/v1/departments", DEPARTMENTS, userInput);
			props.history.push("/administrator/departments");
		} else {
			props.updateDepartment(
				`api/v1/departments/${props.department.id}`,
				DEPARTMENTS,
				userInput,
				props.department.id
			);
			props.history.push("/administrator/departments");
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
					<Typography variant="h4">Create new department</Typography>
				) : (
					<Typography variant="h4">Update department details</Typography>
				)}
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Course Code"
						name="course_code"
						value={userInput.course_code}
						onChange={handleChange}
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						label="Department"
						name="title"
						value={userInput.title}
						onChange={handleChange}
					/>
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
	connect(mapStateToProps, mapDispatchToProps)(DepartmentEditor)
);
