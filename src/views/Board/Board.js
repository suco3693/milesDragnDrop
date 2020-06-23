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
        this.startDrag = this.startDrag.bind(this);
        this.preventDragDrop = this.preventDragDrop.bind(this);
        this.dropCard = this.dropCard.bind(this);
    }
    makeRewards(rewardNumber) {
        const rewards = [];
        for (var val = 1; val <= rewardNumber; val++) {
            rewards.push({
                name: `Reward${val}`,
                value: `RC-${val}`,
            });
        }
        return rewards;
    }
    makeCategories(numOfCats) {
        const categories = [];
        for (var val = 1; val <= numOfCats; val++) {
            categories.push({
                header: `Category-${val}`,
                value: `Cat-${val}`,
                rewards: {
                    '1': false,
                    '2': false,
                    '3': false,
                    '4': false,
                    '5': false,
                },
            });
        }
        return categories;
    }

    startDrag(e) {
        e.dataTransfer.setData('card', e.target.id);
    }

    preventDragDrop(e) {
        e.preventDefault();
    }

    dropCard(e) {
        e.preventDefault();
        let baseCard = e.dataTransfer.getData('card');
        let cloneCard = document.getElementById(baseCard).cloneNode(true);
        if (!this.checkRewardInCol(e.currentTarget.id, baseCard)) {
            e.currentTarget.appendChild(cloneCard);
        }
    }
    checkRewardInCol(targetID, rewardID) {
        let categories = this.state.categories;
        let colNum = targetID.substr(-1);

        let rewardNum = rewardID.substr(-1);
        if (categories[colNum].rewards[rewardNum]) {
            return true;
        } else {
            categories[colNum].rewards[rewardNum] = true;
            return false;
        }
    }
    render() {
        return (
            <div className='Board'>
                <RewardContainer rewards={this.state.rewards} startDrag={this.startDrag} />
                <CategoryContainer
                    categories={this.state.categories}
                    preventDragDrop={this.preventDragDrop}
                    dropCard={this.dropCard}
                />
            </div>
        );
    }
}
export default Board;
