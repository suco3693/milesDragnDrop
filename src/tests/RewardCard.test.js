import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RewardCard from '../components/RewardCard/RewardCard.js';

afterEach(cleanup);

describe('Reward Card', () => {
    test('Reward Card is a Card Component', () => {
        const { container } = render(<RewardCard />);
        expect(container.firstChild).toHaveClass('card');
    });
    test('Reward Card to have class RewardCard', () => {
        const { container } = render(<RewardCard />);
        expect(container.firstChild).toHaveClass('RewardCard');
    });
    test('Reward Card should be draggable', () => {
        const { container } = render(<RewardCard />);
        expect(container.firstChild).toHaveAttribute('draggable');
    });
    test('Reward Card should include Card.Body as first child with class card-body', () => {
        const { container } = render(<RewardCard />);
        expect(container.firstChild.firstChild).toHaveClass('card-body');
    });
    test('Reward Card should have props value which sets id', () => {
        const { container } = render(<RewardCard value={1} />);
        expect(container.firstChild).toHaveAttribute('id', '1');
        expect(container.firstChild).not.toHaveAttribute('id', '2');
    });
    test('Reward Card.Body innerHTML is set by prop value rewardName', () => {
        let { container } = render(<RewardCard rewardName={'Reward-1'} />);
        expect(container.firstChild.firstChild).toContainHTML('Reward-1');
    });
    //Test onDragStart
});
