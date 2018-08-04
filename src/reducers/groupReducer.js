import { CREATE_GROUP} from '../actions/types'

export default function(state = {},action){
    switch (action.type){
        case CREATE_GROUP:
            return action.payload;
        default:
            return state;
    }
}