import React from 'react';
import { Button } from 'react-bootstrap';
import RewardContainer from '../../components/RewardContainer/RewardContainer';
import CategoryContainer from '../../components/CategoryContainer/CategoryContainer';
import './Board.css';
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rewards: this.makeRewards(5),
            categories: this.makeCategories(5),
            queue: [],
            backQueue: [],
        };
        this.startDrag = this.startDrag.bind(this);
        this.preventDragDrop = this.preventDragDrop.bind(this);
        this.dropCard = this.dropCard.bind(this);
        this.removeReward = this.removeReward.bind(this);
        this.removeRewardInState = this.removeRewardInState.bind(this);
        this.addToQueue = this.addToQueue.bind(this);
        this.undoMove = this.undoMove.bind(this);
        this.redoMove = this.redoMove.bind(this);
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
        e.dataTransfer.setData('cat', e.currentTarget.parentElement.id);
    }

    preventDragDrop(e) {
        e.preventDefault();
    }

    dropCard(e) {
        e.preventDefault();
        let baseCard = e.dataTransfer.getData('card');
        let startCol = e.dataTransfer.getData('cat');
        if (baseCard[0] !== 'C') {
            let cloneCard = this.createCloneReward(baseCard);

            if (!this.checkRewardInCol(e.currentTarget.id, baseCard)) {
                e.currentTarget.appendChild(cloneCard);
            }
            this.addToQueue(cloneCard.id, e.currentTarget.id, startCol);
        } else {
            if (!this.checkRewardInCol(e.currentTarget.id, baseCard)) {
                e.currentTarget.appendChild(document.getElementById(baseCard));
                this.removeRewardInState(baseCard, startCol);
            }
            this.addToQueue(baseCard, e.currentTarget.id, startCol);
        }
    }
    checkRewardInCol(targetID, rewardID) {
        let categories = this.state.categories;
        let colNum = parseInt(targetID.substr(-1)) - 1;

        let rewardNum = rewardID.substr(-1);
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
        removeButton.onclick = this.removeReward;
        return removeButton;
    }
    removeReward(e) {
        let rewardID = e.currentTarget.parentElement.id;
        let catID = e.currentTarget.parentElement.parentElement.id;
        this.removeRewardInState(rewardID, catID);
        this.addToQueue(rewardID, '', catID);
        e.currentTarget.parentElement.remove();
    }
    removeRewardInState(rewardID, catID) {
        let categories = this.state.categories;
        let colNum = parseInt(catID.substr(-1)) - 1;
        let rewardNum = rewardID.substr(-1);
        categories[colNum].rewards[rewardNum] = false;
    }
    addToQueue(rewardID, toCatId, fromCatID) {
        let queue = this.state.queue;
        queue.push([rewardID, toCatId, fromCatID]);
        this.setState({ queue });
    }
    undoMove() {
        let queue = this.state.queue;
        if (queue.length) {
            let recentAction = queue.pop();
            let [rewardID, fromCatID, toCatID] = recentAction;
            console.log('reward', rewardID, 'fromcat', fromCatID, 'tocat', toCatID);
            if (fromCatID) {
                this.removeRewardFromCat(rewardID, fromCatID);
            }

            if (toCatID) {
                this.addRewardToCat(rewardID, toCatID);
            }
            this.addToBackQueue(recentAction);
            //add recentAction to backQueue
        }
    }
    redoMove() {
        let backQueue = this.state.backQueue;
        if (backQueue.length) {
            let redoAction = backQueue.pop();
            let [rewardID, fromCatID, toCatID] = redoAction;
            //remove reward from toCatID
            console.log(rewardID, fromCatID, toCatID);
            if (toCatID) {
                this.removeRewardFromCat(rewardID, toCatID);
            }
            //add reward to fromCatID
            if (fromCatID) {
                this.addRewardToCat(rewardID, fromCatID);
            }

            // // add redoAction to queue
            this.addToQueue(rewardID, fromCatID, toCatID);
        }
    }
    addToBackQueue(action) {
        let backQueue = this.state.backQueue;
        backQueue.push(action);
        this.setState({ backQueue });
    }
    removeRewardFromCat(rewardID, fromCatID) {
        let category = document.getElementById(fromCatID);
        category.childNodes.forEach((node) => {
            if (node.id === rewardID) {
                node.remove();
                this.removeRewardInState(rewardID, fromCatID);
            }
        });
    }
    addRewardToCat(rewardID, toCatID) {
        let category = document.getElementById(toCatID);
        let rewardCard = this.createCloneReward(rewardID.substr(-4));
        if (!this.checkRewardInCol(toCatID, rewardID)) {
            category.appendChild(rewardCard);
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
                <div className='buttonContainer'>
                    <Button className='button' onClick={this.undoMove}>
                        Undo
                    </Button>
                    <Button className='button' onClick={this.redoMove}>
                        Redo
                    </Button>
                </div>
            </div>
        );
    }
}
export default Board;
