import {CREATE_GROUP,JOIN_GROUP} from './types';

export function createGroup(group){
    return{
        type:CREATE_GROUP,
        payload:group
    }
}
export function joinGroup(group){
    return{
        type:JOIN_GROUP,
        payload:group
    }
}