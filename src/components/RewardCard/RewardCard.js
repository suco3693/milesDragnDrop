import React from 'react';
import { Card } from 'react-bootstrap';
import './RewardCard.css';
const RewardCard = (props) => (
    <Card className='RewardCard'>
        <Card.Body>{props.rewardName}</Card.Body>
    </Card>
);
export default RewardCard;
