import React from 'react';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import {
	Button,
	Card,
	Grid,
	Link,
	List,
	ListItem,
	Typography,
} from '@material-ui/core';
import useStyle from '../../utils/styles';
import Image from 'next/image';
import db from '../../utils/db';
import Product from '../../models/Product';

const ProductScreen = (props) => {
	const { product } = props;
	// const router = useRouter();
	const classes = useStyle();
	// const { slug } = router.query;
	// const product = data.products.find((a) => a.slug === slug);
	// if (!product) {
	// 	return <div>Product not found</div>;
	// }
	return (
		// <div>
		// 	{!product ? <div>Product not found </div> : <h1>{product.name}</h1>}
		// </div>
		<Layout title={product.name} description={product.description}>
			<div className={classes.section}>
				<NextLink href='/' passHref>
					<Link>back to products</Link>
				</NextLink>
			</div>
			<Grid container spacing={1}>
				<Grid item md={6} xs={12}>
					<Image
						src={product.image}
						alt={product.name}
						width={340}
						height={340}
						layout='responsive'
					></Image>
				</Grid>
				<Grid item md={3} xs={12}>
					<List>
						<ListItem>
							<Typography component='h1' variant='h1'>
								{product.name}
							</Typography>
						</ListItem>
						<ListItem>
							{' '}
							<Typography> Category: {product.category}</Typography>
						</ListItem>
						<ListItem>
							{' '}
							<Typography> Brand: {product.brand}</Typography>
						</ListItem>
						<ListItem>
							<Typography>
								Rating: {product.rating} stars ({product.numReviews} reviews)
							</Typography>
						</ListItem>
						<ListItem>
							<Typography> Description: {product.description}</Typography>
						</ListItem>
					</List>
				</Grid>
				<Grid item md={3} xs={12}>
					<Card>
						<List>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										<Typography>Price: </Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography> ${product.price}</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Grid container>
									<Grid item xs={6}>
										<Typography>Status </Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography>
											{' '}
											${product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
										</Typography>
									</Grid>
								</Grid>
							</ListItem>
							<ListItem>
								<Button fullWidth variant='contained' color='primary'>
									Add to cart
								</Button>
							</ListItem>
						</List>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default ProductScreen;

export const getServerSideProps = async (ctx) => {
	const { params } = ctx;
	const { slug } = params;
	await db.connect();
	const product = await Product.findOne({ slug }).lean();
	await db.disconnect();
	return {
		props: {
			product: db.convertDocToObj(product),
		},
	};
};
