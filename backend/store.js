import { createStore } from 'redux';
import _ from 'lodash';

const initialState = {
    messages: [
        {
            sender: "User1",
            text: "Hello!",
            image: `https://picsum.photos/seed/${_.uniqueId()}/50`,
        },
        {
            sender: "User2",
            text: "Hi there!",
            image: `https://picsum.photos/seed/${_.uniqueId()}/50`,
        },
    ],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;