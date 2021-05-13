import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ComputerRoundedIcon from "@material-ui/icons/ComputerRounded";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getDatas } from "../../store/modelActionCreator";
import { PURPOSES } from "../../store/dataTypes";
import AuthToken from "../../store/AuthToken";

import axios from "axios";

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
	select: {
		marginTop: theme.spacing(4),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = (storeData) => ({
	purposes: storeData.modelData[PURPOSES],
	current_student: storeData.stateData.currentStudent,
	isTimeOut: storeData.stateData.isTimeOut,
});

const mapDispatchToProps = {
	getPurposes: getDatas,
};

function StudentPurpose(props) {
	const classes = useStyles();

	const [purpose, setPurpose] = useState("");
	const [open, setOpen] = useState(false);

	useEffect(() => {
		props.getPurposes("api/v1/purposes", PURPOSES);
	}, []);

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = () => {
		axios
			.post("http://localhost:8000/api/v1/attendances/", {
				purpose: purpose,
				student: props.current_student,
				user: AuthToken.getUserID(),
			})
			.then((res) => console.log(res));
		setOpen(true);
		setTimeout(() => {
			props.history.push("/student");
		}, 1000);
	};

	const handleChange = (e) => {
		setPurpose(e.target.value);
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<ComputerRoundedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Select Purpose of Using Computer Laboratory
				</Typography>
				<FormControl className={classes.form}>
					<Select
						className={classes.select}
						value={purpose}
						onChange={handleChange}
					>
						{props.purposes.map((p) => (
							<MenuItem value={p.id} key={p.id}>
								{p.title}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={onSubmit}
				>
					Time-in
				</Button>
				<Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="success">
						<Typography variant="h4">Successfully logged-in</Typography>
					</Alert>
				</Snackbar>
			</div>
		</Container>
	);
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(StudentPurpose)
);
