import React from 'react';
import { render, cleanup } from './test-utils';
import Board from '../views/Board/Board.js';

afterEach(cleanup);

describe('Board', () => {
    test('Board be a visable component', () => {
        const { container } = render(<Board />);
        expect(container.firstChild).toBeVisible();
        expect(container.firstChild.nodeName).toBe('DIV');
    });
    test('Board is a div with class Board', () => {
        const { container } = render(<Board />);
        expect(container.firstChild.nodeName).toBe('DIV');
        expect(container.firstChild).toHaveClass('Board');
    });
    test('Board children should be RewardContainer, CategoryContainer, div with class buttonContainer, respectively ', () => {
        const { container } = render(<Board />);
        let rewardContainer = container.firstChild.firstChild;
        let categoryContainer = container.firstChild.childNodes[1];
        let buttonContainer = container.firstChild.childNodes[2];
        expect(container.firstChild.childNodes.length).toBe(3);
        expect(rewardContainer).toHaveClass('RewardContainer');
        expect(categoryContainer).toHaveClass('justify-content-md-center', 'container');
        expect(buttonContainer).toHaveClass('buttonContainer');
    });
    test('Board third child should have Undo, Redo, Save Rewards buttons', () => {
        const { container } = render(<Board />);
        let buttonContainer = container.firstChild.childNodes[2];
        expect(buttonContainer.childNodes.length).toBe(3);
        buttonContainer.childNodes.forEach((node) => {
            expect(node).toHaveClass('button', 'btn', 'btn-primary');
            expect(node).toHaveAttribute('type', 'button');
        });
        expect(buttonContainer.childNodes[0]).toContainHTML('Undo');
        expect(buttonContainer.childNodes[1]).toContainHTML('Redo');
        expect(buttonContainer.childNodes[2]).toContainHTML('Save Rewards');
    });
});
