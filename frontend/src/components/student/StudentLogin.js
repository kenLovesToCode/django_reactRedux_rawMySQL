import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import {
	getDatas,
	setStudent,
	setTimeOut,
	removeUsingAttendance,
} from "../../store";
import { ATTENDANCE_USING, STUDENTS } from "../../store/dataTypes";
import HomePage from "../../containers/HomePage";

function Alerta(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const mapStateToProps = (storeData) => ({
	students: storeData.modelData[STUDENTS],
	isTimeOut: storeData.stateData.isTimeOut,
	attendance_using: storeData.modelData[ATTENDANCE_USING],
});

const mapDispatchToProps = {
	getStudents: getDatas,
	setStudentID: setStudent,
	setTimeOut: setTimeOut,
	getUsingAttendances: getDatas,
	removeUsingAttendance,
};

function StudentLogin({
	getStudents,
	setStudentID,
	students,
	history,
	attendance_using,
	getUsingAttendances,
	removeUsingAttendance,
}) {
	const classes = useStyles();
	const [idNumber, setIdNumber] = useState("");
	const [error, setError] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		getStudents("api/v1/students", STUDENTS);
		getUsingAttendances("api/v1/attendances/using", ATTENDANCE_USING);
	}, [getStudents, getUsingAttendances]);

	const handleChange = (e) => {
		setIdNumber(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		let enrolled = students.find(
			(student) => parseInt(student.id) === parseInt(idNumber)
		);

		let attendance = attendance_using.find(
			(au) => au.student_id === parseInt(idNumber)
		);
		if (enrolled === undefined) {
			setError(true);
		} else {
			setError(false);
			if (attendance === undefined) {
				setStudentID(idNumber);
				history.push("/student/purpose");
			} else {
				setOpen(true);
				setTimeout(() => {
					setOpen(false);
					removeUsingAttendance(ATTENDANCE_USING, idNumber);
					axios.put("http://localhost:8000/api/v1/attendances/", {
						student_id: idNumber,
					});
					setIdNumber("");
				}, 1000);
			}
		}
	};

	return (
		<>
			<HomePage>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={classes.paper}>
						{error ? (
							<Alert variant="outlined" severity="error">
								Invalid credentials, try again!
							</Alert>
						) : null}
						<Avatar className={classes.avatar}>
							<AccountCircleRoundedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Student Attendance Time In/Time Out
						</Typography>
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="id_number"
								label="ID Number"
								name="id_number"
								autoComplete="id_number"
								type="number"
								autoFocus
								value={idNumber}
								onChange={handleChange}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={onSubmit}
							>
								CONFIRM
							</Button>
						</form>
					</div>
				</Container>
				<Snackbar open={open} autoHideDuration={1000}>
					<Alerta severity="success">
						<Typography variant="h4">
							{`Hey ${idNumber}! You have successfully logged-out`}
						</Typography>
					</Alerta>
				</Snackbar>
			</HomePage>
		</>
	);
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(StudentLogin)
);
