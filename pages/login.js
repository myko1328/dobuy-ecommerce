import {
	Button,
	Link,
	List,
	ListItem,
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import useStyle from '../utils/styles';

const Login = () => {
	const classes = useStyle();
	return (
		<Layout title='login'>
			<form className={classes.form}>
				<Typography component='h1' variant='h1'>
					Login
				</Typography>
				<List>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='email'
							label='Email'
							inputProps={{ type: 'email' }}
						></TextField>
					</ListItem>
					<ListItem>
						<TextField
							variant='outlined'
							fullWidth
							id='password'
							label='password'
							inputProps={{ type: 'password' }}
						></TextField>
					</ListItem>
					<ListItem>
						<Button variant='contained' type='submit' fullWidth color='primary'>
							Login
						</Button>
					</ListItem>
					<ListItem>
						Don't have an account?
						<NextLink href='/register' passHref>
							<Link>Register</Link>
						</NextLink>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
};

export default Login;
