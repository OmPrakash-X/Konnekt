export interface Review {
  id: string;
  reviewer: {
    id: string;
    name: string;
    avatar?: string;
  };
  expert: {
    id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewData {
  expertId: string;
  sessionId: string;
  rating: number;
  comment: string;
}
