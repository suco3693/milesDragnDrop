import React from 'react';
import RewardCard from '../RewardCard/RewardCard';
import './RewardContainer.css';
const RewardContainer = (props) => (
    <div>
        <h3>Rewards</h3>
        <div className='RewardContainer'>
            {props.rewards.map((reward) => (
                <RewardCard rewardName={reward.name} key={reward.value} />
            ))}
        </div>
    </div>
);
export default RewardContainer;
