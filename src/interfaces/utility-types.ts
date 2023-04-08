import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type AppQueryOptions<T, U = T> = UseQueryOptions<
  T,
  unknown,
  U,
  string[]
>;

export type AppInfiniteQueryOptions<T, U = T> = UseInfiniteQueryOptions<
  T,
  unknown,
  U,
  T,
  string[]
>;
