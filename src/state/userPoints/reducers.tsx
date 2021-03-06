import {ACTIONS} from "./actions";

export const incrementPointsReducer = (state = 0, action: any) => {
    switch (action.type) {
        case ACTIONS.INCREMENT_USER_POINTS: {
            return state + action.payload;
        }
        default: {
            return state;
        }
    }
}