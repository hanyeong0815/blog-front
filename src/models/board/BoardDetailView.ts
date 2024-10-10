export default interface boardDetailView {
  username: string;
  nickname: string;
  domain: string;
  boardId: string;
  title: string;
  content: string;
  comments: comment[];
  viewCount: number;
  commentCount: number;
  createdAt: string;
}

export interface boardUpdateData {
  category: string;
  title: string;
  content: string;
}

export interface comment {
  id: string;
  username: string;
  nickname: string;
  content: string;
  createdAt: string;
  replies: reply[];
  deleted: boolean;
}

export interface reply {
  id: string;
  username: string;
  nickname: string;
  content: string;
  createdAt: string;
  replies: reply[];
  deleted: boolean;
}
