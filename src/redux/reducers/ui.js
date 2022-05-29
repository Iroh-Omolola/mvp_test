import _ from 'lodash';
import { UI_ERROR, UI_LOADING, UI_SET_PAGINATION, UI_RESET } from '../actions';


const defaultState = {
    errors: {},
    loading: {},
    pagination: {
        total: 0,
        per_page: 10,
        current_page: 1,
    }
};

const uiReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UI_RESET: {
            return _.assign({}, state, {
                error: {},
                loading: {},
            });
        }
        case UI_LOADING.START:
            return getNewLoadingState(state, action, true);
        case UI_LOADING.END:
            return getNewLoadingState(state, action, false);
        case UI_ERROR: {
            return _.assign({}, state, {
                errors: { ...state.errors, [action.key]: action.value }
            });
        }
        case UI_SET_PAGINATION.START:
            const { key, payload } = action.meta;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                },
                [key]: payload,
            }
        default:
            return state;
    }
}

const getNewLoadingState = (currentState = {}, action, value) => {
    const { key } = action;
    return _.assign({}, currentState, {
        loading: { ...currentState.loading, [key]: value },
    })
}
export default uiReducer;