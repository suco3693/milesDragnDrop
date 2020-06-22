import React from 'react';
import RewardContainer from '../../components/RewardContainer/RewardContainer';
import CategoryContainer from '../../components/CategoryContainer/CategoryContainer';
import './Board.css';
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rewards: this.makeRewards(5),
        };
    }
    makeRewards(rewardNumber) {
        const rewards = [];
        for (var val = 1; val <= rewardNumber; val++) {
            rewards.push({
                name: `Reward${val}`,
                value: val,
            });
        }
        return rewards;
    }
    render() {
        return (
            <div className='Board'>
                <RewardContainer rewards={this.state.rewards} />
                <CategoryContainer />
            </div>
        );
    }
}
export default Board;
