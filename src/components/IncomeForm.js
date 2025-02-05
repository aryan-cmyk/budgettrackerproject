import React, { useState } from 'react';

const IncomeForm = ({ onIncomeUpdate }) => {
    const [income, setIncome] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onIncomeUpdate(Number(income));
        setIncome('');
    };

    return (
        <div className="income-form mt-3">
            <h3>Income Tracker</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Enter Monthly Income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="form-control"
                />
                <button type="submit" className="btn btn-success mt-2">Update Income</button>
            </form>
        </div>
    );
};

export default IncomeForm;
