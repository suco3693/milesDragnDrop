import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Category from '../components/Category/Category.js';

afterEach(cleanup);

describe('Category', () => {
    test('Category is a Col Component with class catCol', () => {
        let categoryProp = {
            value: 'Cat-1',
            header: 'Category-1',
        };
        const { container } = render(<Category category={categoryProp} />);
        expect(container.firstChild).toHaveClass('col', 'catCol');
    });
    test('Category child should be a Row with category prop header as text', () => {
        let categoryProp = {
            value: 'Cat-1',
            header: 'Category-1',
        };
        const { container } = render(<Category category={categoryProp} />);
        expect(container.firstChild.firstChild).toHaveClass('row');
        expect(container.firstChild.firstChild.innerHTML).toBe('Category-1');
    });
});
