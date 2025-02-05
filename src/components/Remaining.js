import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const RemainingBudget = () => {
    // Extract budget, expenses, and savings from context
    const { expenses, budget, savings } = useContext(AppContext);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

    // Calculate remaining budget (excluding savings)
    const remainingBudget = budget - totalExpenses - savings;

    // Determine alert type based on budget comparison
    let alertType = 'alert-success';
    if (remainingBudget < 0) {
        alertType = 'alert-danger'; // Overspent
    } else if (remainingBudget < budget * 0.2) {
        alertType = 'alert-warning'; // Less than 20% of the budget left
    }

    return (
        <div className={`alert p-4 ${alertType}`}>
            <span>
                Remaining: {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(remainingBudget)}
            </span>
        </div>
    );
};

export default RemainingBudget;
