// from https://testing-library.com/docs/example-react-redux

import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialState as reducerInitialState, reducer } from '../store/index';

function render(
    ui,
    { initialState = reducerInitialState, store = createStore(reducer, initialState), ...renderOptions } = {},
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
