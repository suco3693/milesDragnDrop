import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RewardContainer from '../components/RewardContainer/RewardContainer.js';

afterEach(cleanup);

describe('RewardContainer', () => {
    test('RewardContainer be a visable component with class RewardContainer', () => {
        const { container } = render(<RewardContainer rewards={[]} />);
        expect(container.firstChild).toBeVisible();
        expect(container.firstChild.nodeName).toBe('DIV');
        expect(container.firstChild).toHaveClass('RewardContainer');
    });
    test('RewardContainer to have children components with first child h3 and second div', () => {
        const { container } = render(<RewardContainer rewards={[]} />);
        expect(container.firstChild.children[0].nodeName).toBe('H3');
        expect(container.firstChild.children[1].nodeName).toBe('DIV');
    });
    test('RewardContainer first child inner text should be Rewards', () => {
        const { container } = render(<RewardContainer rewards={[]} />);
        expect(container.firstChild.children[0].innerHTML).toBe('Rewards');
    });
    test('RewardContainer should make RewardCards off of rewards prop', () => {
        let rewards = [
            {
                value: 'Reward-1',
                key: '1',
            },
            {
                value: 'Reward-2',
                key: '2',
            },
        ];
        const { container } = render(<RewardContainer rewards={rewards} />);
        let rewardsComponent = container.firstChild.children[1];
        expect(rewardsComponent.childNodes.length).toBe(2);
    });
});
