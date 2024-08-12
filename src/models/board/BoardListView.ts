export default interface boardList {
  boardList: boardListView[];
  totalPage: number;
  totalElement: number;
}

export interface boardListView {
  boardId: string | null;
  boardNumber: number | null;
  title: string | null;
  commentCount: number | null;
  username: string | null;
  nickname: string | null;
  createdAt: string;
  viewCount: number | null;
}
