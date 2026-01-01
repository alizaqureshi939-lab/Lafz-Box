export enum StoryGenre {
  ROMANCE = 'Romance',
  MYSTERY = 'Mystery',
  EMOTIONAL = 'Emotional',
  GL = 'Girls Love'
}

export interface Story {
  id: string;
  title: string;
  genre: StoryGenre;
  isPaid: boolean;
  price?: string;
  coverUrl: string;
  description: string;
  sales: number; 
  pdfUrl?: string; // Link to the PDF file (Google Drive/Dropbox)
}

export interface PaymentConfig {
  upiId: string;
  qrCodeUrl: string;
  instructionText: string;
}

export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
}