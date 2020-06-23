import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Category.css';

const Category = (props) => (
    <Col className='catCol' onDrop={props.dropCard} onDragOver={props.preventDragDrop} id={props.category.value}>
        <Row>{props.category.header}</Row>
    </Col>
);

export default Category;
