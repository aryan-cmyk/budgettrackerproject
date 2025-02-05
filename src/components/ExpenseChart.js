import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses, budget, savings }) => {
    // Calculate total expenses
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingBudget = Math.max(budget - totalExpenses - savings, 0); // Prevents negative values

    // Chart Data
    const data = {
        labels: ['Expenses', 'Savings', 'Remaining Budget'],
        datasets: [
            {
                label: 'Budget Allocation',
                data: [totalExpenses, savings, remainingBudget],
                backgroundColor: ['#FF6384', '#4CAF50', '#36A2EB'],
                hoverBackgroundColor: ['#FF4561', '#3D8C55', '#3D8CFF'],
            },
        ],
    };

    // Chart Options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const value = context.raw;
                        const total = totalExpenses + savings + remainingBudget;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${context.label}: £${value.toLocaleString()} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h3>Budget Allocation</h3>
            <Pie data={data} options={options} />
            <p><strong>Total Budget:</strong> £{budget.toLocaleString()}</p>
        </div>
    );
};

export default ExpenseChart;
