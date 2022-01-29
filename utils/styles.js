import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
	navbar: {
		'backgroundColor': '#203040',
		'& a': {
			color: '#ffffff',
			marginLeft: 10,
		},
	},
	main: {
		minHeight: '80vh',
	},
	brand: {
		fontWeight: 'bold',
		fontSize: '1.5rem',
		color: 'white',
	},
	navLinks: {
		fontWeight: 'bold',
		fontSize: '1.5rem',
		color: 'white',
	},
	grow: {
		flexGrow: 1,
	},
	footer: {
		marginTop: 10,
		textAlign: 'center',
	},
	section: {
		marginTop: 10,
		marginBottom: 10,
	},
	form: {
		maxWidth: 800,
		margin: '0 auto',
	},
	navbarBtn: {
		color: 'white',
		textTransform: 'initial',
	},
	transparentBackground: {
		backgroundColor: 'transparent',
	},
	error: {
		color: '#f04040',
	},
	fullWidth: {
		width: '100%',
	},
});

export default useStyle;
