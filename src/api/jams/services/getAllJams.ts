import { mockJamSessions } from './mock';
import type { JamSession } from './types';

export type GetAllJamsQueryResponse = JamSession[];

export const getAllJams = (): GetAllJamsQueryResponse => {
  return mockJamSessions;
};
