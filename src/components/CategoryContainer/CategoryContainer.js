import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Category from '../Category/Category';
import './CategoryContainer.css';

const CategoryContainer = (props) => (
    <Container className='justify-content-md-center'>
        <Row className='justify-content-md-center'>
            <h3>Categories</h3>
        </Row>
        <Row className='dragNDropRow'>
            {props.categories.map((category, idx) => (
                <Category category={category} key={idx} />
            ))}
        </Row>
    </Container>
);

export default CategoryContainer;
