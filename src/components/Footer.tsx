import React from 'react';

const address = `Vijay Tower, GMS Road, Near Park avenue, Dehradun, Uttarakhand 248007`;
const email = "taryasalonstudio@gmail.com";

const socialLinks = [
  {
    href: '#',
    label: 'Facebook',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkLcBrDHgOj0B_qrNTygXlcjOPlRfGOBqZrw&s',
  },
  {
    href: '#',
    label: 'Instagram',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpNPYBLb6Z4PIJSlr6qXbUy8VZ0w2w4BPPVQ&s',
  },
  {
    href: '#',
    label: 'X',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/1690643591twitter-x-logo-png.webp/2000px-1690643591twitter-x-logo-png.webp.png',
  },
];

const Footer: React.FC = () => (
  <footer className="bg-white mt-8 pt-0 pb-4 px-4 text-gray-700">
    {/* Green line at the top */}
    <div className="w-full h-0.5 bg-green-600 mb-8 rounded-2xl" />
    <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
      <div className="flex flex-col md:flex-row w-full items-center gap-4">
        {/* Logo first on md+ screens */}
        <div className="flex flex-col items-center order-2 md:order-1 md:flex-1 md:items-center">
          <img src="https://ik.imagekit.io/0mx6y4v8p/logo.webp" alt="Tarya Logo" className="w-24 h-24 object-contain mb-2" />
        </div>
        {/* Address/Email center on md+ screens, fixed width and centered */}
        <div className="text-center order-1 md:order-2 md:w-[340px] md:flex-none md:self-stretch flex flex-col justify-center items-center md:items-center">
          <div className="font-semibold">Address:</div>
          <div>{address}</div>
          <div className="font-semibold mt-2">Email:</div>
          <div>{email}</div>
        </div>
        {/* Social icons last on md+ screens */}
        <div className="flex flex-row gap-4 items-center justify-center order-3 md:order-3 md:flex-1 md:justify-center">
          {socialLinks.map((icon) => (
            <a key={icon.label} href={icon.href} aria-label={icon.label} className="transition-transform hover:scale-110" target="_blank" rel="noopener noreferrer">
              <img src={icon.img} alt={icon.label + ' icon'} className="w-10 h-10 object-contain" />
            </a>
          ))}
        </div>
      </div>
      <div className="w-full border-t border-gray-100 mt-6 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Tarya Salon and Studio. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
