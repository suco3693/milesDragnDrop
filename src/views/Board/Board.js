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
        if (baseCard[0] !== 'C') {
            let cloneCard = this.createCloneReward(baseCard);

            if (!this.checkRewardInCol(e.currentTarget.id, baseCard)) {
                e.currentTarget.appendChild(cloneCard);
            }
        } else {
            if (!this.checkRewardInCol(e.currentTarget.id, baseCard)) {
                e.currentTarget.appendChild(document.getElementById(baseCard));
            }
        }
    }
    checkRewardInCol(targetID, rewardID) {
        let categories = this.state.categories;
        let colNum = parseInt(targetID.substr(-1)) - 1;

        let rewardNum = rewardID.substr(-1);
        console.log(colNum);
        if (categories[colNum].rewards[rewardNum]) {
            return true;
        } else {
            categories[colNum].rewards[rewardNum] = true;
            return false;
        }
    }
    createCloneReward(baseID) {
        let cloneCard = document.getElementById(baseID).cloneNode(true);
        let removeButton = this.createRemoveButton();
        cloneCard.insertAdjacentElement('afterbegin', removeButton);
        cloneCard.ondragstart = this.startDrag;
        cloneCard.id = 'C-' + cloneCard.id;
        return cloneCard;
    }
    createRemoveButton() {
        let removeButton = document.createElement('button');
        removeButton.innerHTML = 'X';
        removeButton.onclick = function () {
            console.log(this.parentElement.parentElement.id, this.parentElement.id);
            // this.parentElement.remove();
        };
        return removeButton;
    }
    removeRewardStateInCol(targetID, rewardID) {
        console.log(targetID, rewardID);
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
