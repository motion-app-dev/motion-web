import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import httpClient from '../httpClient'
import {
  type GetVideoListDTO,
  type GetVideoListData,
  type GetVideoDetailData,
  type GetVideoCategoryListData,
  type GetVideoCommentListData,
  type PostVideoCommentDTO
} from './type'

const VIDEO_API_PATH = 'video'

const videoAPI = {
  getVideoList: ({ pageSize = 20, search, categoryId }: GetVideoListDTO = {}) =>
    infiniteQueryOptions({
      queryKey: [VIDEO_API_PATH, { pageSize, search, categoryId }],
      queryFn: ({ pageParam }) => {
        const searchParams = {
          currentPage: pageParam,
          pageSize,
          ...(search && { search }),
          ...(categoryId && { categoryId })
        }

        return httpClient
          .get(VIDEO_API_PATH + '/list', { searchParams })
          .json<GetVideoListData>()
      },
      initialPageParam: 1,
      getPreviousPageParam: firstPage => {
        if (firstPage.currentPage > 0) {
          return firstPage.currentPage - 1
        }
      },
      getNextPageParam: data => {
        if (data.currentPage < data.totalPage) {
          return data.currentPage + 1
        }
      }
    }),
  getVideoDetail: (videoId: string) =>
    queryOptions({
      queryKey: [VIDEO_API_PATH, videoId],
      queryFn: () =>
        httpClient
          .get(VIDEO_API_PATH + '/one', { searchParams: { videoId } })
          .json<GetVideoDetailData>()
    }),
  getPreviousVideoId: (videoId: string) =>
    queryOptions({
      queryKey: [VIDEO_API_PATH, 'previous', videoId],
      queryFn: () =>
        httpClient.get(VIDEO_API_PATH + `/previous/${videoId}`).json<string>()
    }),
  getNextVideoId: (videoId: string) =>
    queryOptions({
      queryKey: [VIDEO_API_PATH, 'next', videoId],
      queryFn: () =>
        httpClient.get(VIDEO_API_PATH + `/next/${videoId}`).json<string>()
    }),
  getVideoCategoryList: () =>
    queryOptions({
      queryKey: [VIDEO_API_PATH, 'category'],
      queryFn: () =>
        httpClient
          .get(VIDEO_API_PATH + `/category`)
          .json<GetVideoCategoryListData>()
    }),
  getVideoCommentList: (videoId: string) =>
    queryOptions({
      queryKey: [VIDEO_API_PATH, 'comment', videoId],
      queryFn: () =>
        httpClient
          .get(VIDEO_API_PATH + `/${videoId}/comment/list`)
          .json<GetVideoCommentListData>()
    }),
  likeVideoComment: () => ({
    mutationFn: (commentId: string) =>
      httpClient.post(VIDEO_API_PATH + `/comment/${commentId}/like`).json()
  }),
  postVideoComment: (videoId: string) => ({
    mutationFn: (params: PostVideoCommentDTO) =>
      httpClient
        .post(VIDEO_API_PATH + `/${videoId}/comment`, { json: params })
        .json()
  })
}

export default videoAPI
