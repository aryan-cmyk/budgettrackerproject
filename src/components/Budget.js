import React, { useState, useContext, useEffect } from 'react';
import ViewBudget from './ViewBudget';
import EditBudget from './EditBudget';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { income, savings, budget, dispatch } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);

    // Automatically update budget when income or savings change
    useEffect(() => {
        const calculatedBudget = income - savings;
        dispatch({ type: 'SET_BUDGET', payload: calculatedBudget });
    }, [income, savings, dispatch]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (value) => {
        dispatch({
            type: 'SET_BUDGET',
            payload: value,
        });
        setIsEditing(false);
    };

    return (
        <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
            {isEditing ? (
                <EditBudget handleSaveClick={handleSaveClick} budget={budget} />
            ) : (
                <ViewBudget handleEditClick={handleEditClick} budget={budget} />
            )}
        </div>
    );
};

export default Budget;
