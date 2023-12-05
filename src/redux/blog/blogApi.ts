import { basicApi } from "../basicApi";
import { GetBlogRequestDto, GetBlogDetailRequestDto, ResultGetBlogRequestDto } from "../dto/blog";
import { IBlog } from "../model/IBlog";

const apiWithTag = basicApi.enhanceEndpoints({
  addTagTypes: ["Blog"],
});

export const blogApi = apiWithTag.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query<ResultGetBlogRequestDto, GetBlogRequestDto>({
      query: (params) => ({
        url: "/blogs/list/",
        params: {
          search: params.search,
          order: params.order,
          orderBy: params.orderBy,
          pageIndex: params.pageIndex,
          countPerPage: params.countPerPage,
        },
      }),
      transformResponse: (rawData: ResultGetBlogRequestDto) => {
        return {
          data: rawData.data.map((item: any) => ({
            ...item,
            publicationDate: item.created_at
          })),
          totalCount: rawData.totalCount
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Blog" as const,
                id: id,
              })),
              { type: "Blog", id: "LIST" },
            ]
          : [{ type: "Blog", id: "LIST" }],
    }),
    getBlogDetail: build.query<IBlog, GetBlogDetailRequestDto>({
      query: (params) => ({
        url:`/blogs/detail/${params.id}`,
      }),
      providesTags: (result, error, queryArgs) =>
        [{
          type: "Blog" as const,
          id: queryArgs.id,
        }]
    }),
  }),
});

export const { useGetBlogsQuery, useGetBlogDetailQuery } = blogApi;
