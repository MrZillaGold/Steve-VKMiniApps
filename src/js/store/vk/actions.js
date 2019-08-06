import {
    SET_COLOR_SCHEME
} from './actionTypes';

export const setColorScheme = (scheme) => (
    {
        type: SET_COLOR_SCHEME,
        payload: scheme
    }
);