import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const CategoryContainer = (props) => (
    <Container className='justify-content-md-center'>
        <Row className='justify-content-md-center'>
            <h3>Categories</h3>
        </Row>
        <Row>
            <Col>Header</Col>
        </Row>
        <Row>
            <Col>I am col</Col>
        </Row>
    </Container>
);

export default CategoryContainer;
