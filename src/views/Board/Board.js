import React from 'react';
import { connect } from 'react-redux';
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
        this.saveRewards = this.saveRewards.bind(this);
        this.getRewardCardCount = this.getRewardCardCount.bind(this);
        this.updateRewardCardCount = this.updateRewardCardCount.bind(this);
    }
    makeRewards(rewardNumber) {
        const rewards = [];
        for (var val = 1; val <= rewardNumber; val++) {
            rewards.push({
                name: `Reward${val}`,
                value: `RC-${val}`,
                count: 0,
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
            if (!this.checkRewardInCol(e.currentTarget.id, baseCard)) {
                let cloneCard = this.createCloneReward(baseCard);
                e.currentTarget.appendChild(cloneCard);
                this.addToQueue(cloneCard.id, e.currentTarget.id, startCol);
            }
        } else {
            if (!this.checkRewardInCol(e.currentTarget.id, baseCard)) {
                e.currentTarget.appendChild(document.getElementById(baseCard));
                this.removeRewardInState(baseCard, startCol);
                this.addToQueue(baseCard, e.currentTarget.id, startCol);
            }
        }
    }
    getRewardCardCount(baseCardID) {
        baseCardID = parseInt(baseCardID.substr(-1)) - 1;
        return this.state.rewards[baseCardID].count;
    }
    updateRewardCardCount(baseCardID, direction) {
        baseCardID = parseInt(baseCardID.substr(-1)) - 1;
        let rewards = this.state.rewards;
        if (direction === 'up') {
            rewards[baseCardID].count++;
        } else if (direction === 'down') {
            rewards[baseCardID].count--;
        }
        this.setState({ rewards });
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
        this.updateRewardCardCount(baseID, 'up');
        let cloneCard = document.getElementById(baseID).cloneNode(true);
        let removeButton = this.createRemoveButton();
        let copyID = this.getRewardCardCount(baseID);
        cloneCard.insertAdjacentElement('afterbegin', removeButton);
        cloneCard.ondragstart = this.startDrag;
        cloneCard.id = `C-${copyID}-${cloneCard.id}`;
        cloneCard.style.position = 'absolute';
        cloneCard.style.top = this.addPositionToCloneCard(parseInt(cloneCard.id.substr(-1)));

        return cloneCard;
    }
    createRemoveButton() {
        let removeButton = document.createElement('button');
        removeButton.innerHTML = 'X';
        removeButton.onclick = this.removeReward;
        return removeButton;
    }
    addPositionToCloneCard(offsetIdx) {
        let offset = 105 * (offsetIdx - 1) + 25;
        return `${offset}px`;
    }
    removeReward(e) {
        let rewardID = e.currentTarget.parentElement.id;
        let catID = e.currentTarget.parentElement.parentElement.id;
        this.removeRewardInState(rewardID, catID);
        this.addToQueue(rewardID, '', catID);
        this.updateRewardCardCount(rewardID.substr(-4), 'down');
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
    addToBackQueue(action) {
        let backQueue = this.state.backQueue;
        backQueue.push(action);
        this.setState({ backQueue });
    }
    undoMove() {
        let queue = this.state.queue;
        if (queue.length) {
            let recentAction = queue.pop();
            let [rewardID, fromCatID, toCatID] = recentAction;
            // no toCatID means move from rewards col to board
            if (!toCatID) {
                this.removeRewardFromCat(rewardID, fromCatID);
            } else {
                //for delete and board moves just need to add piece back
                this.buttonMoveCard(rewardID, fromCatID, toCatID);
            }
            this.addToBackQueue(recentAction);
        }
    }
    redoMove() {
        let backQueue = this.state.backQueue;
        if (backQueue.length) {
            let redoAction = backQueue.pop();
            if (!this.checkRedo(redoAction)) {
                let [rewardID, fromCatID, toCatID] = redoAction;
                // Rewrite as move piece if both fromCatID, toCatID
                if (!fromCatID) {
                    //if no fromCatID then remove from board
                    this.removeRewardFromCat(rewardID, toCatID);
                } else {
                    this.buttonMoveCard(rewardID, toCatID, fromCatID);
                }

                // // add redoAction to queue
                this.addToQueue(rewardID, fromCatID, toCatID);
            }
        }
    }
    checkRedo(action) {
        let queueLastAction = this.state.queue[this.state.queue.length - 1];
        if (!queueLastAction || !action) {
            return false;
        }
        return action[0] === queueLastAction[0] && action[1] === queueLastAction[1] && action[2] === queueLastAction[2];
    }
    removeRewardFromCat(rewardID, fromCatID) {
        let category = document.getElementById(fromCatID);
        category.childNodes.forEach((node) => {
            if (node.id === rewardID) {
                node.remove();
                this.removeRewardInState(rewardID, fromCatID);
                this.updateRewardCardCount(rewardID.substr(-4), 'down');
            }
        });
    }
    buttonMoveCard(rewardID, fromCatID, toCatID) {
        let category = document.getElementById(toCatID);
        let rewardCard = document.getElementById(rewardID);
        if (!rewardCard) {
            rewardCard = this.createCloneReward(rewardID.substr(-4));
        }
        if (!this.checkRewardInCol(toCatID, rewardID)) {
            category.appendChild(rewardCard);
            if (fromCatID) {
                this.removeRewardInState(rewardID, fromCatID);
            }
        }
    }
    saveRewards() {
        let rewardMap = this.createCatRewardMap();
        this.props.dispatch({ type: 'Save', data: rewardMap });
    }
    createCatRewardMap() {
        let rewardMap = {};

        this.state.categories.forEach((category) => {
            rewardMap[category.header] = category.rewards;
        });
        return rewardMap;
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
                    <Button className='button' onClick={this.saveRewards}>
                        Save Rewards
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    state,
});
export default connect(mapStateToProps)(Board);
