interface Meta {
  pvs: number;
  ups: number;
  comments: number;
}

export interface Article {
  [key: string]: any;
  title: string;
  state: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  content?: string;
  renderedContent?: string;
  keywords?: string[];
  description?: string;
  category?: any;
  tag?: any;
  thumb?: string;
  permalink?: string;
  meta?: Meta;
}

export interface Statistics {
  [key: string]: any;
  article?: number;
  category?: number;
  tag?: number;
  user?: number;
  comment?: number;
  guestComment?: number;
}
