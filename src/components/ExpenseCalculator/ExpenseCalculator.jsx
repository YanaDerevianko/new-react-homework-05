import React, { useReducer, useState } from 'react';

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.expense] };
    default:
      return state;
  }
};

export const ExpenseCalculator = () => {
  const initialExpenseData = {
    expenses: [],
  };

  const [expenseData, dispatch] = useReducer(expenseReducer, initialExpenseData);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const addExpense = () => {
    if (expenseName && expenseAmount) {
      const newExpense = {
        name: expenseName,
        amount: parseFloat(expenseAmount),
      };
      dispatch({ type: 'ADD_EXPENSE', expense: newExpense });
      setExpenseName('');
      setExpenseAmount('');
    }
  };

  const totalExpenses = expenseData.expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      <h2>Expenses Calculator</h2>
      <div>
        <input
          type="text"
          placeholder="the name of the expense ... "
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="amount ... "
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add expense</button>
      </div>
      <div>
        <h3>List of expenses</h3>
        <ul>
          {expenseData.expenses.map((expense, index) => (
            <li key={index}>
              {expense.name}: ${expense.amount.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total cost: ${totalExpenses}</p>
      </div>
    </div>
  );
}
