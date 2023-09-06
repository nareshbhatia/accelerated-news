import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TeamStanding } from './TeamStanding';

// ---------- fetchStandings ----------
const fetchStandings = async (): Promise<Array<TeamStanding>> => {
  const resp = await axios.get('/standings');
  return resp.data as Array<TeamStanding>;
};

export const useStandingsQuery = () => {
  return useQuery<Array<TeamStanding>>(['standings'], fetchStandings);
};
