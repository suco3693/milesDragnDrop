import React from 'react';
import RewardContainer from '../../components/RewardContainer/RewardContainer';
import CategoryContainer from '../../components/CategoryContainer/CategoryContainer';
import './Board.css';
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rewards: this.makeRewards(5),
            categories: this.makeCategories(5),
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
    makeCategories(numOfCats) {
        const categories = [];
        for (var val = 1; val <= numOfCats; val++) {
            categories.push({
                header: `Category-${val}`,
                value: val,
                rewards: [null, null, null, null, null],
            });
        }
        return categories;
    }
    render() {
        return (
            <div className='Board'>
                <RewardContainer rewards={this.state.rewards} />
                <CategoryContainer categories={this.state.categories} />
            </div>
        );
    }
}
export default Board;
