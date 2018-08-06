import { CREATE_GROUP, JOIN_GROUP} from '../actions/types'

export default function(state = {},action){
    switch (action.type){
        case CREATE_GROUP:
            return action.payload;
        case JOIN_GROUP:
            return action.payload;
        default:
            return state;
    }
}