export type ResourceStatusType = 'loading' | 'error' | 'successful' | undefined;
export type ResourceType<T> = {
  status?: ResourceStatusType;
  data?: T;
  message?: string;
};
