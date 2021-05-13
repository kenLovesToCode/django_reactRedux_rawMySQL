import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Title from "./Title";
import Footer from "../../containers/Footer";
import AdminDashboard from "../admin/AdminDashboard";
import { getDatas, setCreating, setSelectedData } from "../../store";
import { DEPARTMENTS } from "../../store/dataTypes";

const useStyles = makeStyles((theme) => ({
	createButton: {
		margin: theme.spacing(2, 0, 4),
	},
}));

const mapStateToProps = (storeData) => ({
	departments: storeData.modelData[DEPARTMENTS],
});
const mapDispatchToProps = {
	getDepartments: getDatas,
	createDepartment: setCreating,
	setEditingDepartment: setSelectedData,
};

function AdminDepartmentList(props) {
	useEffect(() => {
		props.getDepartments("api/v1/departments", DEPARTMENTS);
	}, []);
	const classes = useStyles();

	const handleButtonClick = (flag, payload) => {
		props.createDepartment(flag);
		props.setEditingDepartment(payload);
		props.history.push("/administrator/departments/editor");
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
					Create new college department
				</Button>
				<Divider />
				<Title>College Departments</Title>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Course Code</TableCell>
							<TableCell>Department</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.departments.map((department) => (
							<TableRow key={department.id}>
								<TableCell>{department.course_code}</TableCell>
								<TableCell>{department.title}</TableCell>
								<TableCell>
									<Tooltip title="EDIT">
										<IconButton
											color="primary"
											onClick={() => handleButtonClick(false, department)}
										>
											<EditIcon />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</AdminDashboard>
			<Footer />
		</React.Fragment>
	);
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AdminDepartmentList)
);
