import { Order } from "../../components/blog/BlogTable";
import { IBlog } from "../model/IBlog";

export interface GetBlogRequestDto {
  search: string;
  orderBy: string;
  order: Order;
  pageIndex: number;
  countPerPage: number;
}

export interface ResultGetBlogRequestDto {
  data: IBlog[];
  totalCount: number;
}

export interface GetBlogDetailRequestDto {
  id: string;
}

export interface CreateBlogRequestDto {
  title: string;
  content: string;
  creator: string;
}
