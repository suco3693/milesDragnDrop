import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SetRewardCard from '../SetRewardCard/SetRewardCard';
import { Card } from 'react-bootstrap';
import './Category.css';

const Category = (props) => (
    <Col className='catCol' onDrop={props.dropCard} onDragOver={props.preventDragDrop} id={props.category.value}>
        <Row>{props.category.header}</Row>
        {props.category.rewards.map((row, idx) => {
            if (row) {
                return <SetRewardCard key={`SetCard${idx}`} idx={idx} />;
            } else {
                return (
                    <Card key={`Empty${idx}`}>
                        <Card.Body></Card.Body>
                    </Card>
                );
            }
        })}
    </Col>
);

export default Category;
