import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Title from "./Title";
import Footer from "../../containers/Footer";
import AdminDashboard from "../admin/AdminDashboard";
import {
	getDatas,
	setCreating,
	setSelectedData,
	deleteData,
} from "../../store";
import { PURPOSES } from "../../store/dataTypes";

const useStyles = makeStyles((theme) => ({
	createButton: {
		margin: theme.spacing(2, 0, 4),
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const mapStateToProps = (storeData) => ({
	purposes: storeData.modelData[PURPOSES],
});
const mapDispatchToProps = {
	getPurposes: getDatas,
	createPurpose: setCreating,
	setEditingPurpose: setSelectedData,
	deletePurpose: deleteData,
};

function AdminPurposeList(props) {
	useEffect(() => {
		props.getPurposes("api/v1/purposes", PURPOSES);
	}, []);
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const handleButtonClick = (flag, payload) => {
		props.setEditingPurpose(payload);
		props.createPurpose(flag);
		props.history.push("/administrator/purposes/editor");
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleDelete = (payload) => {
		props.deletePurpose(`api/v1/purposes`, PURPOSES, payload);
		setOpen(true);
	};
	return (
		<React.Fragment>
			<AdminDashboard>
				<Button
					variant="outlined"
					color="primary"
					className={classes.createButton}
					onClick={() => handleButtonClick(true, {})}
				>
					Create new purpose
				</Button>
				<Divider />
				<Title>Purposes</Title>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Description</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.purposes.map((purpose) => (
							<TableRow key={purpose.id}>
								<TableCell>{purpose.title}</TableCell>
								<TableCell>{purpose.description}</TableCell>
								<TableCell>
									<Tooltip title="EDIT">
										<IconButton
											color="primary"
											onClick={() => handleButtonClick(false, purpose)}
										>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="DELETE">
										<IconButton
											color="secondary"
											onClick={() => handleDelete(purpose.id)}
										>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</AdminDashboard>
			<Footer />
			<Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
					<Typography variant="h5">{`Successfully removed selected purpose`}</Typography>
				</Alert>
			</Snackbar>
			;
		</React.Fragment>
	);
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AdminPurposeList)
);
