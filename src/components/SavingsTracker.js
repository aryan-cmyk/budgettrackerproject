import React, { useState } from 'react';

const SavingsTracker = ({ income, onSavingsUpdate }) => {
    const [savings, setSavings] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Number(savings) > income) {
            alert("Savings cannot be more than income!");
            return;
        }
        onSavingsUpdate(Number(savings));
        setSavings('');
    };

    return (
        <div className="savings-tracker mt-3">
            <h3>Savings Tracker</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Enter Savings Amount"
                    value={savings}
                    onChange={(e) => setSavings(e.target.value)}
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary mt-2">Update Savings</button>
            </form>
        </div>
    );
};

export default SavingsTracker;
