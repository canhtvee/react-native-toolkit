export type ResourceStatusType = 'LOADING' | 'ERROR' | 'SUCCESSFUL' | undefined;
export type ResourceType<T> = {
  status?: ResourceStatusType;
  data?: T;
  message?: string;
};
