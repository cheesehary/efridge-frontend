import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../../action/user';

const ProfilePage: React.FC<any> = ({
  dispatch,
  defaultIncome,
  savingsGoal,
  history,
}) => {
  const [newIncome, setNewIncome] = useState(defaultIncome);
  const [newSavingsGoal, setNewSavingsGoal] = useState(savingsGoal);
  const saveProfile = async () => {
    await dispatch(updateProfile({ income: newIncome, savingsGoal }));
    history.push('/app');
  };
  return (
    <div>
      <div>
        income:
        <input
          value={newIncome}
          onChange={(e) => setNewIncome(Number(e.target.value))}
        />
      </div>
      <div>
        savings goal:
        <input
          value={newSavingsGoal}
          onChange={(e) => setNewSavingsGoal(Number(e.target.value))}
        />
      </div>
      <button onClick={saveProfile}>Save</button>
    </div>
  );
};

export default connect((state: any) => ({
  defaultIncome: state.finance.defaultIncome,
  savingsGoal: state.finance.savingsGoal,
}))(ProfilePage);
