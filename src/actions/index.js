import {CREATE_GROUP} from './types';

export function createGroup(group){
    return{
        type:CREATE_GROUP,
        payload:group
    }
}