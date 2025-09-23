import { mockJamSessions } from './mock';
import type { JamSession } from './types';

export type GetJamQueryResponse = JamSession | undefined;

export const getJam = (id?: string): GetJamQueryResponse => {
  if (!id) {
    throw new Error('id is required');
  }

  return mockJamSessions.find((session) => session.id === id) as JamSession | undefined;
};
