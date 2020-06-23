import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CategoryContainer from '../components/CategoryContainer/CategoryContainer.js';

afterEach(cleanup);

describe('CategoryContainer', () => {
    test('CategoryContainer be a visable component', () => {
        const { container } = render(<CategoryContainer categories={[]} />);
        expect(container.firstChild).toBeVisible();
    });
    test('CategoryContainer is a centered Container with two children', () => {
        const { container } = render(<CategoryContainer categories={[]} />);
        expect(container.firstChild).toHaveClass('container', 'justify-content-md-center');
        expect(container.firstChild.childNodes.length).toBe(2);
    });
    test('CategoryContainer first child should be a Row with h3 header Categoires', () => {
        const { container } = render(<CategoryContainer categories={[]} />);
        expect(container.firstChild.firstChild).toHaveClass('row', 'justify-content-md-center');
        expect(container.firstChild.firstChild.firstChild.innerHTML).toBe('Categories');
    });
    test('CategoryContainer second child should be a Row that is filled with Category elements', () => {
        let categories = [
            {
                value: 'Cat-1',
                header: 'Category-1',
            },
            {
                value: 'Cat-2',
                header: 'Category-2',
            },
        ];
        const { container } = render(<CategoryContainer categories={categories} />);
        expect(container.firstChild.children[1]).toHaveClass('row', 'dragNDropRow');
        expect(container.firstChild.children[1].childNodes.length).toBe(2);
        container.firstChild.children[1].childNodes.forEach((node) => {
            expect(node).toHaveClass('col', 'catCol');
        });
    });
});
