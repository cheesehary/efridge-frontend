import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchFinanceWithExpenses,
  createOrUpdateFinance,
} from '../../action/finance';
import ExpenseTable from '../ExpenseTable';

const HomePage: React.FC<any> = ({
  firstName,
  match,
  history,
  dispatch,
  finance,
  balance,
  defaultIncome,
}) => {
  useEffect(() => {
    if (finance) return;
    const d = new Date();
    dispatch(
      fetchFinanceWithExpenses({ year: d.getFullYear(), month: d.getMonth() })
    );
  }, []);
  const [showCreateFinance, setShowCreateFinance] = useState(false);
  const gotoProfile = () => history.push(`${match.url}/profile`);
  const createFinance = async (inputIncome: number) => {
    const d = new Date();
    await dispatch(
      createOrUpdateFinance({
        income: inputIncome,
        year: d.getFullYear(),
        month: d.getMonth(),
      })
    );
    setShowCreateFinance(false);
  };
  const renderFinance = () => {
    if (!finance) return <div>loading...</div>;
    if (!finance.id)
      return (
        <button onClick={() => setShowCreateFinance(true)}>
          Create Finance for Current Month
        </button>
      );
    const d = new Date();
    return (
      <div>
        <div>Monthly Finance</div>
        <div>income: {finance.income}</div>
        <div>spending: </div>
        <ExpenseTable year={d.getFullYear()} month={d.getMonth()} />
      </div>
    );
  };
  const renderCreateFinanceDialog = () => {
    if (!showCreateFinance) return null;
    console.log(defaultIncome);
    return (
      <CreateFinanceDialog
        defaultIncome={defaultIncome}
        onCreate={createFinance}
      />
    );
  };
  return (
    <div>
      <button onClick={gotoProfile}>Profile, {firstName}</button>
      <div>Balance: {balance}</div>
      {renderFinance()}
      {renderCreateFinanceDialog()}
    </div>
  );
};

export default connect((state: any) => {
  const d = new Date();
  return {
    firstName: state.user.firstName,
    finance: state.finance.financeMap[`${d.getFullYear()}-${d.getMonth()}`],
    balance: state.finance.balance,
    defaultIncome: state.finance.defaultIncome,
  };
})(HomePage);

const CreateFinanceDialog: React.FC<any> = ({ defaultIncome, onCreate }) => {
  const [income, setIncome] = useState(defaultIncome);
  return (
    <div>
      <span>income: </span>
      <input
        value={income}
        onChange={(e) => setIncome(Number(e.target.value))}
      />
      <button onClick={() => onCreate(income)}>Create</button>
    </div>
  );
};
