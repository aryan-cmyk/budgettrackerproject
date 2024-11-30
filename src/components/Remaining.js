import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const RemainingBudget = () => {
	// Extracting budget and expenses from context
	const { expenses, budget } = useContext(AppContext);

	// Calculate total expenses
	const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

	// Determine alert type based on budget comparison
	const alertType = totalExpenses > budget ? 'alert-danger' : 'alert-success';

	return (
		<div className={`alert p-4 ${alertType}`}>
			<span>Remaining: £{budget - totalExpenses}</span>
		</div>
	);
};

export default RemainingBudget;
