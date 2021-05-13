import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Image from "../../assets/images/comlab.jpeg";
import HomePage from "../../containers/HomePage";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	imageContainer: {
		height: 800,
		backgroundImage: `url(${Image})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
}));

export default function Home() {
	const classes = useStyles();
	return (
		<>
			<HomePage>
				<Paper className={classes.imageContainer}></Paper>
			</HomePage>
		</>
	);
}
