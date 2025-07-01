// Centralized asset links for images, videos, and other resources

// Example image URLs as an object
export const images = {
    heroimages: [
        'https://ik.imagekit.io/0mx6y4v8p/s2.avif',
        'https://ik.imagekit.io/0mx6y4v8p/s5.webp',
        'https://ik.imagekit.io/0mx6y4v8p/s3.webp',
        'https://ik.imagekit.io/0mx6y4v8p/s7.webp',
        'https://ik.imagekit.io/0mx6y4v8p/s8.webp',
        'https://ik.imagekit.io/0mx6y4v8p/s10.webp',
        'https://ik.imagekit.io/0mx6y4v8p/s9.webp',
        'https://ik.imagekit.io/0mx6y4v8p/image.webp',
    ],
    logoText: 'https://res.cloudinary.com/dfm2w0hov/image/upload/v1751350516/logoT_va8m36.png',
    logo: 'https://ik.imagekit.io/0mx6y4v8p/logo.webp'
    // Add more keys like gallery, thumbnails, etc. as needed
};

// Example video URLs as an object
export const videos = {
    herovideo: 'https://vz-fe419fbf-87f.b-cdn.net/f8b054be-1601-4039-ae21-22da87a55104/playlist.m3u8',
    // Add more keys like nailcardvideo, haircutvideo, etc. as needed
    offercardvideos: [
      {
        key: 'cleaning',
        video: 'https://vz-fe419fbf-87f.b-cdn.net/80c30e66-e3f7-4f7e-8a3e-0154a44b0dba/playlist.m3u8',
        title: 'Upto 50% OFF on Cleaning Services',
        price: '₹499',
        originalPrice: '₹999',
      },
      {
        key: 'hairspa',
        video: 'https://vz-fe419fbf-87f.b-cdn.net/80c30e66-e3f7-4f7e-8a3e-0154a44b0dba/playlist.m3u8',
        title: 'Flat 30% OFF on Hair Spa',
        price: '₹699',
        originalPrice: '₹999',
      },
      {
        key: 'nailart',
        video: 'https://vz-fe419fbf-87f.b-cdn.net/80c30e66-e3f7-4f7e-8a3e-0154a44b0dba/playlist.m3u8',
        title: 'Free Nail Art on Manicure',
        price: '₹299',
        originalPrice: '₹499',
      },
      {
        key: 'combopack',
        video: 'https://vz-fe419fbf-87f.b-cdn.net/80c30e66-e3f7-4f7e-8a3e-0154a44b0dba/playlist.m3u8',
        title: 'Combo: Haircut + Facial at 40% OFF',
        price: '₹899',
        originalPrice: '₹1499',
      },
      {
        key: 'refer',
        video: 'https://vz-fe419fbf-87f.b-cdn.net/80c30e66-e3f7-4f7e-8a3e-0154a44b0dba/playlist.m3u8',
        title: 'Refer & Earn: 20% OFF',
        price: '₹0',
        originalPrice: '₹0',
      },
    ],
    trendingServiceVideos: [
      {
        key: 'keratin',
        video: 'https://vz-fe419fbf-87f.b-cdn.net/979596bc-ea4a-4805-8bb4-87409170e885/playlist.m3u8',
        title: 'Keratin Treatment',
      },
      {
        key: 'bridal',
        video: 'https://vz-fe419fbf-87f.b-cdn.net/979596bc-ea4a-4805-8bb4-87409170e885/playlist.m3u8',
        title: 'Bridal Makeup',
      },
      {
        key: 'coloring',
        video: 'https://vz-fe419fbf-87f.b-cdn.net/979596bc-ea4a-4805-8bb4-87409170e885/playlist.m3u8',
        title: 'Hair Coloring',
      },
      {
        key: 'facial',
        video: 'https://vz-fe419fbf-87f.b-cdn.net/979596bc-ea4a-4805-8bb4-87409170e885/playlist.m3u8',
        title: 'Luxury Facial',
      },
    ],
};

export const typingTexts = [
  'Manicure',
  'Pedicure',
  'Facial',
  'Haircut',
  'Coloring',
  'Styling',
];

// Add more asset arrays or constants as needed, e.g. for icons, audio, etc. 