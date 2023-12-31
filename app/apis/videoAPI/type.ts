export interface VideoData {
  category: {
    categoryId: string
    categoryName: string
  }
  creator: {
    userId: string
    userName: string
  }
  cover: {
    videoCoverUrl: string
    width: number
    height: number
  }
  videoCommentCount: number
  videoId: string
  url: string
  description: string
  tags: string
  likeCount: number
  views: number
  createAt: null
  updateAt: null
}

export interface VideoCategoryData {
  categoryId: string
  categoryName: string
}

export interface VideoCommentData {
  id: string
  content: string
  userId: string
  userName: string
  likeCount: number
  avatar: string | null
  createAt: string
  updateAt: string
  liked: boolean
}

export interface GetVideoListDTO {
  pageSize?: number
  search?: string | null
  categoryId?: string | null
}

export interface GetVideoListData {
  total: number
  pageSize: number
  totalPage: number
  currentPage: number
  list: VideoData[]
}

export type GetVideoDetailData = VideoData

export type GetVideoCategoryListData = VideoCategoryData[]

export interface GetVideoCommentListData {
  commentCount: number
  list: VideoCommentData[]
}

export interface PostVideoCommentDTO {
  content: string
}
