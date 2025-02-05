import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';
import Budget from './components/Budget';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import RemainingBudget from './components/Remaining';
import LoginPage from './components/Login';
import ExpenseChart from './components/ExpenseChart'; // Import the chart
import './components/App.css';
import './components/Login.css';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [budget, setBudget] = useState(1000);  // Default budget
    const navigate = useNavigate();

    // Fetch expenses after login
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
            setAuthToken(token);
            // Fetch expenses (simplified version)
            fetchExpenses();
        }
    }, []);

    const fetchExpenses = async () => {
        // Dummy API call simulation to get expenses
        // Replace with actual API call
        setExpenses([
            { id: 1, name: 'Groceries', amount: 200 },
            { id: 2, name: 'Rent', amount: 500 },
            { id: 3, name: 'Utilities', amount: 100 },
        ]);
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.access);
                setAuthToken(data.access);
                setIsLoggedIn(true);
                navigate('/');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setIsLoggedIn(false);
        navigate('/login');
    };

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingBudget = budget - totalExpenses;

    return (
        <div className={isDarkMode ? 'app dark-mode' : 'app'}>
            {isLoggedIn ? (
                <>
                    <header className="app-header">
                        <button onClick={toggleDarkMode} className="btn btn-secondary">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </button>
                        <button onClick={handleLogout} className="btn btn-danger ml-2">
                            Logout
                        </button>
                    </header>
                    <AppProvider>
                        <div className="container">
                            <h1 className="mt-3">My Budget Planner</h1>
                            <div className="row mt-3">
                                <div className="col-sm">
                                    <Budget />
                                </div>
                                <div className="col-sm">
                                    <RemainingBudget remainingBudget={remainingBudget} />
                                </div>
                                <div className="col-sm">
                                    <ExpenseTotal totalExpenses={totalExpenses} />
                                </div>
                            </div>
                            <h3 className="mt-3">Expenses</h3>
                            <div className="row">
                                <div className="col-sm">
                                    <ExpenseList expenses={expenses} />
                                </div>
                            </div>
                            <h3 className="mt-3">Add Expense</h3>
                            <div className="row mt-3">
                                <div className="col-sm">
                                    <AddExpenseForm setExpenses={setExpenses} />
                                </div>
                            </div>

                            {/* Add ExpenseChart below */}
                            <h3 className="mt-3">Expense Overview</h3>
                            <div className="row mt-3">
                                <div className="col-sm">
                                    <ExpenseChart expenses={expenses} budget={budget} />
                                </div>
                            </div>
                        </div>
                    </AppProvider>
                </>
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
