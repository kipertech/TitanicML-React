import { createGlobalState } from 'react-hooks-global-state';

const {
    setGlobalState,
    getGlobalState,
    useGlobalState
} = createGlobalState({ windowWidth: 0, windowHeight: 0 });

export {
    setGlobalState,
    getGlobalState,
    useGlobalState
};
