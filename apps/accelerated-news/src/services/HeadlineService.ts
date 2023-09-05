import type { Headline } from '@/models';
import { formatHttpError } from '@/utils';
import type { QueryFunctionContext } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// ---------- fetchHeadlines ----------
export const fetchHeadlines = async (): Promise<Headline[]> => {
  try {
    const resp = await axios.get('/headlines');
    return resp.data as Headline[];
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useHeadlinesQuery = () => useQuery(['headlines'], fetchHeadlines);

// ---------- fetchHeadline ----------
type HeadlineQueryKey = readonly ['headline', string];

export const fetchHeadline = async ({
  queryKey,
}: QueryFunctionContext<HeadlineQueryKey>): Promise<Headline> => {
  try {
    const [, headlineId] = queryKey;
    const resp = await axios.get(`/headlines/${headlineId}`);
    return resp.data as Headline;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useHeadlineQuery = (headlineId: string) =>
  useQuery(['headline', headlineId], fetchHeadline);

// ---------- createHeadline ----------
export const createHeadline = async (headline: Headline) => {
  try {
    const resp = await axios.post('/headlines', headline);
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useHeadlineCreate = () => {
  const queryClient = useQueryClient();

  return useMutation(createHeadline, {
    onSuccess: () => {
      // refetch headlines on success
      queryClient.invalidateQueries(['headlines']);
    },
  });
};

// ---------- updateHeadline ----------
export const updateHeadline = async (headline: Headline) => {
  try {
    const resp = await axios.put(`/headlines/${headline.id}`, headline);
    return resp.data;
  } catch (e) {
    throw new Error(formatHttpError(e));
  }
};

export const useHeadlineUpdate = (headLineId: string) => {
  const queryClient = useQueryClient();

  return useMutation(updateHeadline, {
    onSuccess: () => {
      // refetch headlines on success
      queryClient.invalidateQueries(['headlines']);
      queryClient.invalidateQueries(['headline', headLineId]);
    },
  });
};
