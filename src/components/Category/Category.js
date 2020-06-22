import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Category.css';

const Category = (props) => (
    <Col className='catCol'>
        <Row>{props.category.header}</Row>
        {props.category.rewards.map((row, idx) => (
            <Row key={idx}>I am row</Row>
        ))}
    </Col>
);

export default Category;
