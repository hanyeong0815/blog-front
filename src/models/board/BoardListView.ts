export default interface boardList {
  boardList: boardListView[];
  totalPage: number;
  totalElement: number;
}

export interface boardListView {
  boardId: string | null;
  sequence: number | null;
  title: string | null;
  content: string | null;
  domain: string | null;
  commentCount: number | null;
  username: string | null;
  nickname: string | null;
  createdAt: string;
  viewCount: number | null;
  ogThumbnailFileName: string | null;
}
