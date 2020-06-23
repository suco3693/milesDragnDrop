import { createStore } from 'redux';

const initialState = {
    'Category-1': {
        rewards: {
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
        },
    },
    'Category-2': {
        rewards: {
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
        },
    },
    'Category-3': {
        rewards: {
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
        },
    },
    'Category-4': {
        rewards: {
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
        },
    },
    'Category-5': {
        rewards: {
            '1': false,
            '2': false,
            '3': false,
            '4': false,
            '5': false,
        },
    },
};

//redux dev tools enabled
const store = createStore(reducer, null, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SAVE':
            return {
                state: action.data,
            };
        default:
            return state;
    }
}

store.dispatch(addSavedCategories());

function addSavedCategories(savedCats) {
    return {
        type: 'Save',
        data: savedCats,
    };
}

export default store;
