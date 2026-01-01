import { Story, StoryGenre, Review, PaymentConfig } from './types';

export const STORIES: Story[] = [
  {
    id: '1',
    title: 'Whispers in the Rain',
    genre: StoryGenre.ROMANCE,
    isPaid: false,
    sales: 120,
    coverUrl: 'https://images.unsplash.com/photo-1515549832467-8783363e19b6?q=80&w=1200&auto=format&fit=crop',
    description: 'A chance encounter under a stormy sky leads to a lifetime of secrets.'
  },
  {
    id: '2',
    title: 'The Silent Letter',
    genre: StoryGenre.MYSTERY,
    isPaid: true,
    price: '₹49',
    sales: 45,
    coverUrl: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=1200&auto=format&fit=crop',
    description: 'An anonymous letter arrives, changing everything she thought she knew.'
  },
  {
    id: '3',
    title: 'Velvet Shadows',
    genre: StoryGenre.GL,
    isPaid: true,
    price: '₹99',
    sales: 82,
    coverUrl: 'https://images.unsplash.com/photo-1518136267866-5d464cb3c013?q=80&w=1200&auto=format&fit=crop',
    description: 'Soft glances and hidden touches in the corridors of an old estate.'
  },
  {
    id: '4',
    title: 'Fading Echoes',
    genre: StoryGenre.EMOTIONAL,
    isPaid: false,
    sales: 200,
    coverUrl: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=1200&auto=format&fit=crop',
    description: 'Learning to let go of the memories that hold us captive.'
  },
  {
    id: '5',
    title: 'Midnight Bloom',
    genre: StoryGenre.ROMANCE,
    isPaid: true,
    price: '₹29',
    sales: 15,
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    description: 'Love blossoms in the darkest hour of the night.'
  },
  {
    id: '6',
    title: 'The Glass Heart',
    genre: StoryGenre.EMOTIONAL,
    isPaid: false,
    sales: 340,
    coverUrl: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=1200&auto=format&fit=crop',
    description: 'Fragile emotions shatter and reform in this touching narrative.'
  },
  {
    id: '7',
    title: 'Ocean Eyes',
    genre: StoryGenre.GL,
    isPaid: false,
    sales: 90,
    coverUrl: 'https://images.unsplash.com/photo-1516239482977-b550ba7253f2?q=80&w=1200&auto=format&fit=crop',
    description: 'Two souls meeting by the shore, finding solace in the waves.'
  }
];

export const PAYMENT_CONFIG: PaymentConfig = {
  upiId: 'lafzbox@upi',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=lafzbox@upi',
  instructionText: 'Scan the QR code or use the UPI ID to pay. Enter the Transaction ID below to verify.'
};

export const REVIEWS: Review[] = [
  {
    id: '1',
    user: 'Aisha K.',
    comment: 'The stories here touch the soul. "Velvet Shadows" made me cry in the best way possible.',
    rating: 5
  },
  {
    id: '2',
    user: 'Rahul M.',
    comment: 'I love that the writers are anonymous. It feels so raw and authentic. The mystery collection is top-notch.',
    rating: 5
  },
  {
    id: '3',
    user: 'Sana Z.',
    comment: 'Beautiful website and even more beautiful words. The free reads are a blessing!',
    rating: 4
  }
];