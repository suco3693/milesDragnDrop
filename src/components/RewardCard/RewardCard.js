import React from 'react';
import { Card } from 'react-bootstrap';
import './RewardCard.css';
const RewardCard = (props) => (
    <Card id={props.value} className='RewardCard' draggable='true' onDragStart={props.startDrag}>
        <button>X</button>
        <Card.Body>{props.rewardName}</Card.Body>
    </Card>
);
export default RewardCard;
