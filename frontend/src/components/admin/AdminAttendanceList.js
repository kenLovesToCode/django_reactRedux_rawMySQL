import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";

import Title from "./Title";
import Footer from "../../containers/Footer";
import AdminDashboard from "../admin/AdminDashboard";
import { getDatas } from "../../store/modelActionCreator";
import { ATTENDANCES } from "../../store/dataTypes";

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

const mapStateToProps = (storeData) => ({
	attendances: storeData.modelData[ATTENDANCES],
});
const mapDispatchToProps = {
	getAttendances: getDatas,
};

function AdminAttendanceList(props) {
	useEffect(() => {
		props.getAttendances("api/v1/attendances", ATTENDANCES);
	}, []);
	const classes = useStyles();
	return (
		<React.Fragment>
			<AdminDashboard>
				<Title>Attendances</Title>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Student</TableCell>
							<TableCell>Purpose</TableCell>
							<TableCell>Time In</TableCell>
							<TableCell>Time Out</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.attendances.map((attendance) => (
							<TableRow>
								<TableCell>{attendance.student_id}</TableCell>
								<TableCell>{attendance.purpose}</TableCell>
								<TableCell>{attendance.time_in}</TableCell>
								<TableCell>{attendance.time_out}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</AdminDashboard>
			<Footer />
		</React.Fragment>
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdminAttendanceList);
