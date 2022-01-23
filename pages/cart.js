import {
	Button,
	Card,
	Grid,
	Link,
	List,
	ListItem,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';

const CartScreen = () => {
	const router = useRouter();
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;

	const updateCartHandler = async (quantity, item) => {
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.countInStock < quantity) {
			window.alert('Sorry. product out of stock');
			return;
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
	};

	const removeItemHandler = async (item) => {
		dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
	};

	const checkoutHandler = () => {
		router.push('/shipping');
	};

	return (
		<Layout>
			<Typography component='h1' variant='h1'>
				Shopping Cart
			</Typography>
			{cartItems <= 0 ? (
				<div>
					Cart is Empty <NextLink href='/'>Go Shopping</NextLink>
				</div>
			) : (
				<Grid container spacing={1}>
					<Grid item md={9} xs={12}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell>Name</TableCell>
										<TableCell align='right'>Quantity</TableCell>
										<TableCell align='right'>Price</TableCell>
										<TableCell align='right'>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{cartItems.map((item) => (
										<TableRow key={item._id}>
											<TableCell>
												<NextLink href={`/product/${item.slug}`} passHref>
													<Link>
														<Image
															src={item.image}
															alt={item.name}
															width={50}
															height={50}
														></Image>
													</Link>
												</NextLink>
											</TableCell>
											<TableCell>
												<NextLink href={`/product/${item.slug}`} passHref>
													<Link>
														<Typography>{item.name}</Typography>
													</Link>
												</NextLink>
											</TableCell>
											<TableCell align='right'>
												<Select
													value={item.quantity}
													onChange={(e) =>
														updateCartHandler(e.target.value, item)
													}
												>
													{[...Array(item.countInStock).keys()].map((x) => (
														<MenuItem key={x + 1} value={x + 1}>
															{x + 1}
														</MenuItem>
													))}
												</Select>
											</TableCell>
											<TableCell align='right'>
												<Typography>{item.price}</Typography>
											</TableCell>
											<TableCell align='right'>
												<Button
													variant='contained'
													color='secondary'
													onClick={() => removeItemHandler(item)}
												>
													x
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item md={3} xs={12}>
						<Card>
							<List>
								<ListItem>
									<Typography variant='h2'>
										Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :{' '}
										$ {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
									</Typography>
								</ListItem>
								<ListItem>
									<Button
										onClick={checkoutHandler}
										variant='contained'
										color='primary'
										fullWidth
									>
										Check out
									</Button>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			)}
		</Layout>
	);
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
