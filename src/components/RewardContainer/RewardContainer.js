import React from 'react';
import RewardCard from '../RewardCard/RewardCard';
import './RewardContainer.css';

function setContainerHeight(rewardsCount) {
    return {
        height: `${75 + rewardsCount * 105}px`,
    };
}

const RewardContainer = (props) => (
    <div className='RewardContainer' style={setContainerHeight(props.rewards.length)}>
        <h3>Rewards</h3>
        <div className='RewardContainer'>
            {props.rewards.map((reward) => (
                <RewardCard
                    startDrag={props.startDrag}
                    rewardName={reward.name}
                    value={reward.value}
                    key={reward.value}
                />
            ))}
        </div>
    </div>
);
export default RewardContainer;
