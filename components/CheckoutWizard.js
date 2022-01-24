import { Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import useStyle from '../utils/styles';

const CheckoutWizard = ({ active = 0 }) => {
	const classes = useStyle();
	return (
		<Stepper
			className={classes.transparentBackground}
			activeStep={active}
			alternativeLabel
		>
			{['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
				(step) => (
					<Step key={step}>
						<StepLabel>{step}</StepLabel>
					</Step>
				)
			)}
		</Stepper>
	);
};

export default CheckoutWizard;
