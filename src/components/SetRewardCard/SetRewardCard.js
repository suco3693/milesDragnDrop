import React from 'react';
import { Card } from 'react-bootstrap';
import './SetRewardCard.css';
const SetRewardCard = (props) => (
    <Card id={props.idx}>
        <button>X</button>
        <Card.Body>{`Reward${props.idx + 1}`}</Card.Body>
    </Card>
);
export default SetRewardCard;
