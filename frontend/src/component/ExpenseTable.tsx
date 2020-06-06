import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createOrUpdateExpense, deleteExpense } from '../action/finance';

const ExpenseTable: React.FC<any> = ({
  year,
  month,
  expenseMap,
  financeMap,
  dispatch,
}) => {
  const expenses = expenseMap[`${year}-${month}`];
  if (!expenses) return <div>loading...</div>;
  const [newAmount, setNewAmount] = useState(0);
  const [newTag, setNewTag] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingExpense, setEditingExpense] = useState('');
  const expensesByCategory = formatExpenses(expenses);
  const createExpense = async () => {
    const financeId = financeMap[`${year}-${month}`].id;
    const newExpense = {
      amount: newAmount,
      tag: newTag,
      category: newCategory,
      financeId,
    };
    await dispatch(createOrUpdateExpense({ expense: newExpense, year, month }));
    setIsCreating(false);
  };
  const updateExpense = async (id: string) => {
    const expense = {
      id,
      amount: newAmount,
      tag: newTag,
      category: newCategory,
    };
    await dispatch(createOrUpdateExpense({ expense, year, month }));
    setEditingExpense('');
  };
  const onDeleteExpense = (exp: any) => {
    dispatch(deleteExpense({ expense: exp, year, month }));
  };
  const onEditExpense = (exp: any) => {
    setNewAmount(exp.amount);
    setNewTag(exp.tag);
    setNewCategory(exp.category);
    setEditingExpense(exp.id);
  };
  const renderCreateExpense = () => {
    return (
      <div>
        <div>
          <span>amount: </span>
          <input
            value={newAmount || ''}
            onChange={(e) => setNewAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <span>tag: </span>
          <input value={newTag} onChange={(e) => setNewTag(e.target.value)} />
        </div>
        <div>
          <span>category: </span>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          >
            <option value="" disabled>
              Please choose
            </option>
            {CATEGORY.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button onClick={createExpense}>Create</button>
        <button onClick={() => setIsCreating(false)}>Cancel</button>
      </div>
    );
  };
  const renderOneExpense = (exp: any) => {
    if (editingExpense === exp.id) {
      return (
        <div>
          <div>
            <span>amount: </span>
            <input
              value={newAmount || ''}
              onChange={(e) => setNewAmount(Number(e.target.value))}
            />
          </div>
          <div>
            <span>tag: </span>
            <input value={newTag} onChange={(e) => setNewTag(e.target.value)} />
          </div>
          <div>
            <span>category: </span>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="" disabled>
                Please choose
              </option>
              {CATEGORY.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button onClick={() => updateExpense(exp.id)}>Update</button>
          <button onClick={() => setEditingExpense('')}>Cancel</button>
        </div>
      );
    }
    return (
      <span>
        tag: {exp.tag}; amount: {exp.amount}
        <button onClick={() => onEditExpense(exp)}>Edit</button>
        <button onClick={() => onDeleteExpense(exp)}>Delete</button>
      </span>
    );
  };
  return (
    <div>
      {expensesByCategory.map((cat) => {
        return (
          <div key={cat.category}>
            Category: {cat.category}
            {cat.expenses.map((exp) => {
              return <div key={exp.tag}>{renderOneExpense(exp)}</div>;
            })}
          </div>
        );
      })}
      {isCreating ? (
        renderCreateExpense()
      ) : (
        <button onClick={() => setIsCreating(true)}>Add expense</button>
      )}
    </div>
  );
};

const formatExpenses = (expenses: any): Array<IExpensesByCategory> => {
  const categoryMap: any = {};
  expenses.forEach((exp: any) => {
    if (!exp.tag) {
      exp.tag = 'default';
    }
    if (categoryMap[exp.category]) {
      return categoryMap[exp.category].expenses.push(exp);
    }
    categoryMap[exp.category] = {
      category: exp.category,
      expenses: [exp],
    };
  });
  return Object.values(categoryMap);
};

export default connect((state: any) => {
  return {
    expenseMap: state.finance.expenseMap,
    financeMap: state.finance.financeMap,
  };
})(ExpenseTable);

const CATEGORY = [
  'Business',
  'Cash',
  'Donations',
  'Eating Out',
  'Education',
  'Entertainment',
  'Groceries',
  'Health',
  'Home',
  'Shopping',
  'Transport',
  'Utilities',
  'Uncategorised',
];

interface IExpensesByCategory {
  category: string;
  expenses: Array<{
    id: string;
    amount: number;
    tag: string;
  }>;
}
