import { mockJamSessions } from './mock';
import type { JamSession } from './types';

export type GetJamsQueryResponse = JamSession[];

export const getAllJams = (): GetJamsQueryResponse => {
  return mockJamSessions;
};
