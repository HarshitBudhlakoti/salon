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
    herovideo: 'https://res.cloudinary.com/dfm2w0hov/video/upload/v1751391836/heroVideo_kejldw.mp4',
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

export const serviceCards = [
  {
    serviceKey: 'bridal-makeup',
    image: 'https://img.freepik.com/free-photo/beautiful-woman-getting-makeup-salon_155003-28213.jpg',
    title: 'Bridal Makeup',
    subPackages: [
      { key: 'hd-makeup-airbrush', image: '', title: 'HD Makeup (Airbrush)', price: 4999, discountedPrice: 3999 },
      { key: 'hd-makeup-traditional', image: '', title: 'HD Makeup (Traditional)', price: 4999, discountedPrice: 3999 },
      { key: 'engagement-day', image: '', title: 'Engagement Makeup (Day)', price: 2999, discountedPrice: 2499 },
      { key: 'engagement-evening', image: '', title: 'Engagement Makeup (Evening)', price: 2999, discountedPrice: 2499 },
    ],
  },
  {
    serviceKey: 'hair-color',
    image: 'https://img.freepik.com/free-photo/hairdresser-making-hairstyle-young-woman-beauty-salon_155003-28219.jpg',
    title: 'Hair Color',
    subPackages: [
      { key: 'global-ammonia-free', image: '', title: 'Global (Ammonia Free)', price: 1999, discountedPrice: 1499 },
      { key: 'global-with-ammonia', image: '', title: 'Global (With Ammonia)', price: 1999, discountedPrice: 1499 },
      { key: 'highlights-balayage', image: '', title: 'Highlights (Balayage)', price: 2499, discountedPrice: 1999 },
      { key: 'highlights-ombre', image: '', title: 'Highlights (Ombre)', price: 2499, discountedPrice: 1999 },
      { key: 'highlights-streaks', image: '', title: 'Highlights (Streaks)', price: 2499, discountedPrice: 1999 },
    ],
  },
  {
    serviceKey: 'hair-wash',
    image: 'https://www.saberhealth.com/uploaded/blog/images/wash-hair.jpg',
    title: 'Hair Wash',
    subPackages: [
      { key: 'basic', image: '', title: 'Basic Wash', price: 399, discountedPrice: 299 },
      { key: 'spa-wash', image: '', title: 'Spa Wash', price: 699, discountedPrice: 499 },
    ],
  },
  {
    serviceKey: 'pedicure',
    image: 'https://cosmeticclinic.net.au/wp-content/uploads/2024/11/reduced_image_smaller.jpg',
    title: 'Pedicure',
    subPackages: [
      { key: 'classic', image: '', title: 'Classic Pedicure', price: 799, discountedPrice: 599 },
      { key: 'spa', image: '', title: 'Spa Pedicure', price: 1199, discountedPrice: 899 },
    ],
  },
  {
    serviceKey: 'makeup',
    image: 'https://img.freepik.com/free-photo/visagiste-applying-makeup-brush-model-face_155003-28218.jpg',
    title: 'Makeup',
    subPackages: [
      { key: 'party', image: '', title: 'Party Makeup', price: 1499, discountedPrice: 999 },
      { key: 'fashion', image: '', title: 'Fashion Makeup', price: 1799, discountedPrice: 1299 },
    ],
  },
  {
    serviceKey: 'hair-spa',
    image: 'https://blog.buywow.in/wp-content/uploads/2024/06/jpeg-optimizer_soothing-shampoo-experience-prior-to-stem-cell-hai-2024-04-01-20-00-49-utc-scaled.jpg',
    title: 'Hair Spa',
    subPackages: [
      { key: 'keratin', image: '', title: 'Keratin Spa', price: 1999, discountedPrice: 1499 },
      { key: 'smoothening', image: '', title: 'Smoothening Spa', price: 1799, discountedPrice: 1299 },
    ],
  },
];

export const carouselCards = [
  {
    serviceKey: 'nail-refeling',
    image: 'https://www.relaxationhubatyourplace.com.decideprecisetechnologies.com/assets/images/services/gel-refilling.png',
    title: 'Nail Refilling',
    subPackages: [
      { key: 'gel', image: '', title: 'Gel Refilling', price: 999, discountedPrice: 799 },
      { key: 'acrylic', image: '', title: 'Acrylic Refilling', price: 1199, discountedPrice: 899 },
    ],
  },
  {
    serviceKey: 'hair-styling',
    image: 'https://www.mbmmakeupstudio.com/wp-content/uploads/2021/10/hair-styling-course-in-Delhi.jpg',
    title: 'Hair Styling',
    subPackages: [
      { key: 'curls', image: '', title: 'Curls Styling', price: 799, discountedPrice: 599 },
      { key: 'straightening', image: '', title: 'Straightening', price: 999, discountedPrice: 799 },
    ],
  },
  {
    serviceKey: 'cleanup',
    image: 'https://www.hopscotch.in/blog/wp-content/uploads/2020/01/Here%E2%80%99s-how-I-do-a-face-clean-up-at-home-by-myself_3.jpg',
    title: 'Cleanup',
    subPackages: [
      { key: 'basic', image: '', title: 'Basic Cleanup', price: 499, discountedPrice: 349 },
      { key: 'advanced', image: '', title: 'Advanced Cleanup', price: 899, discountedPrice: 699 },
    ],
  },
  {
    serviceKey: 'party-makeup',
    image: 'https://www.fiestaservices.co.in/cdn/shop/files/SangeetMakeupLook.png',
    title: 'Party Makeup',
    subPackages: [
      { key: 'cocktail', image: '', title: 'Cocktail Makeup', price: 1799, discountedPrice: 1299 },
      { key: 'reception', image: '', title: 'Reception Makeup', price: 1999, discountedPrice: 1499 },
    ],
  },
];

// Add more asset arrays or constants as needed, e.g. for icons, audio, etc. 