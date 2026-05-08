export type ApiMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
};
