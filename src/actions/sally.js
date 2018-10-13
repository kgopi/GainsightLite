import {
    UPDATE_SALLY
} from './types';

export const updateSallyState = data => {
    return {
      type: UPDATE_SALLY,
      payload: data
    }
  }