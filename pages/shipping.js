import {
	Button,
	List,
	ListItem,
	TextField,
	Typography,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import useStyle from '../utils/styles';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/checkoutWizard';

const Shipping = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm();
	const router = useRouter();

	const { redirect } = router.query; //login?redirect=shipping
	const { state, dispatch } = useContext(Store);
	const {
		userInfo,
		cart: { shippingAddress },
	} = state;

	useEffect(() => {
		if (!userInfo) {
			router.push('/login?redirect=/shipping');
		}
		setValue('fullName', shippingAddress.fullName);
		setValue('fullName', shippingAddress.address);
		setValue('fullName', shippingAddress.city);
		setValue('fullName', shippingAddress.postalCode);
		setValue('fullName', shippingAddress.country);
	}, []);

	const classes = useStyle();

	const submitHandler = ({ fullName, address, city, postalCode, country }) => {
		dispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: { fullName, address, city, postalCode, country },
		});

		Cookies.set(
			'shippingAddress',
			JSON.stringify({
				fullName,
				address,
				city,
				postalCode,
				country,
			})
		);
		router.push('/payment');
	};

	return (
		<Layout title='Shipping'>
			<CheckoutWizard activeStep={1} />
			<form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
				<Typography component='h1' variant='h1'>
					Shipping To
				</Typography>
				<List>
					<ListItem>
						<Controller
							name='fullName'
							control={control}
							defaultValue=''
							rules={{
								required: true,
								minLength: 2,
							}}
							render={({ field }) => (
								<TextField
									variant='outlined'
									fullWidth
									id='fullName'
									label='Full Name'
									inputProps={{ type: 'text' }}
									error={Boolean(errors.fullName)}
									helperText={
										errors.fullName
											? errors.fullName.type === 'minLength'
												? 'Full Name length is more than 1'
												: 'Full Name is required'
											: ''
									}
									{...field}
								></TextField>
							)}
						></Controller>
					</ListItem>

					<ListItem>
						<Controller
							name='address'
							control={control}
							defaultValue=''
							rules={{
								required: true,
								minLength: 2,
							}}
							render={({ field }) => (
								<TextField
									variant='outlined'
									fullWidth
									id='address'
									label='Address'
									inputProps={{ type: 'text' }}
									error={Boolean(errors.address)}
									helperText={
										errors.address
											? errors.address.type === 'minLength'
												? 'Address length is more than 1'
												: 'Address Name is required'
											: ''
									}
									{...field}
								></TextField>
							)}
						></Controller>
					</ListItem>

					<ListItem>
						<Controller
							name='city'
							control={control}
							defaultValue=''
							rules={{
								required: true,
								minLength: 2,
							}}
							render={({ field }) => (
								<TextField
									variant='outlined'
									fullWidth
									id='city'
									label='City'
									inputProps={{ type: 'text' }}
									error={Boolean(errors.city)}
									helperText={
										errors.city
											? errors.city.type === 'minLength'
												? 'City length is more than 1'
												: 'City is required'
											: ''
									}
									{...field}
								></TextField>
							)}
						></Controller>
					</ListItem>

					<ListItem>
						<Controller
							name='postalCode'
							control={control}
							defaultValue=''
							rules={{
								required: true,
								minLength: 2,
							}}
							render={({ field }) => (
								<TextField
									variant='outlined'
									fullWidth
									id='postalCode'
									label='Postal Code'
									inputProps={{ type: 'text' }}
									error={Boolean(errors.postalCode)}
									helperText={
										errors.postalCode
											? errors.postalCode.type === 'minLength'
												? 'Postal Code length is more than 1'
												: 'Postal Code is required'
											: ''
									}
									{...field}
								></TextField>
							)}
						></Controller>
					</ListItem>

					<ListItem>
						<Controller
							name='country'
							control={control}
							defaultValue=''
							rules={{
								required: true,
								minLength: 2,
							}}
							render={({ field }) => (
								<TextField
									variant='outlined'
									fullWidth
									id='country'
									label='Country'
									inputProps={{ type: 'text' }}
									error={Boolean(errors.country)}
									helperText={
										errors.country
											? errors.country.type === 'minLength'
												? 'Country length is more than 1'
												: 'Country is required'
											: ''
									}
									{...field}
								></TextField>
							)}
						></Controller>
					</ListItem>

					<ListItem>
						<Button variant='contained' type='submit' fullWidth color='primary'>
							Continue
						</Button>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
};

export default Shipping;
