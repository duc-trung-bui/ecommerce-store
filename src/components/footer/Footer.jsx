import React from 'react';
import {
  Truck as TruckIcon,
  RotateCcw as ReturnIcon,
  ShieldCheck as ShieldIcon,
  Headset as SupportIcon,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#ebebeb] text-gray-700 px-[8%] lg:px-[12%] pt-16 mt-20 border-t border-gray-100">
      {/* 1. Trust Bar (Modern Benefit Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
        <BenefitItem
          Icon={TruckIcon}
          title="FREE Delivery"
          desc="On orders above $1000"
        />
        <BenefitItem
          Icon={ReturnIcon}
          title="Easy Returns"
          desc="7-day money back guarantee"
        />
        <BenefitItem
          Icon={SupportIcon}
          title="24/7 Support"
          desc="Support online 24/7"
        />
        <BenefitItem
          Icon={ShieldIcon}
          title="Secure Payment"
          desc="100% payment security"
        />
      </div>

      {/* 2. Main Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-t border-orange-400">

        {/* Branding Column */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-black tracking-tight">
            Osme<span className="text-orange-500">tico</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Leading the way in quality tech and cosmetics. Find your nearest store or shop online.
          </p>
          <div className="space-y-2">
            <p className="text-black font-semibold">support@osmetico.com</p>
            <p className="text-gray-500">+1 (800) 123-4567</p>
          </div>
          <div className="flex gap-4">
            <SocialBtn Icon={Facebook} color="hover:bg-blue-600" />
            <SocialBtn Icon={Twitter} color="hover:bg-sky-500" />
            <SocialBtn Icon={Instagram} color="hover:bg-pink-600" />
            <SocialBtn Icon={Youtube} color="hover:bg-red-600" />
          </div>
        </div>

        {/* Link Columns */}
        <FooterLinks
          title="About Us"
          links={["Our Story", "News & Blog", "Brands", "Press Center", "Advertising", "Investors"]}
        />
        <FooterLinks
          title="Support"
          links={["Support Center", "Manage", "Service", "Haul Away", "Security", "Contact"]}
        />
        <FooterLinks
          title="Orders"
          links={["Check Order", "Delivery & Pickup", "Returns", "Exchanges", "Gift Cards"]}
        />
      </div>

      {/* 3. Bottom Copyright */}
      <div className="border-t border-orange-400 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-base">
          © 2025 Osmetico Inc. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-orange-500">Privacy Policy</a>
          <a href="#" className="hover:text-orange-500">Terms of Service</a>
        </div>
        <p className="text-gray-500 text-base">
          By <a href="#" className="text-orange-500 font-bold hover:underline">TerraNetworks</a>
        </p>
      </div>
    </footer>
  );
}

// Sub-components for cleaner code
const BenefitItem = ({ Icon, title, desc }) => (
  <div className="flex items-center gap-5 p-4 rounded-2xl">
    <div className="bg-orange-100 p-3 rounded-xl">
      <Icon size={28} className="text-orange-600" />
    </div>
    <div>
      <h4 className="font-bold text-black text-lg">{title}</h4>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  </div>
);

const FooterLinks = ({ title, links }) => (
  <div className="space-y-4">
    <h3 className="font-bold text-xl text-black">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, i) => (
        <li key={i}>
          <a href="#" className="text-gray-500 hover:text-orange-600 hover:translate-x-1 transition-all inline-block">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialBtn = ({ Icon, color }) => (
  <a href="#" className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-all ${color} hover:text-white`}>
    <Icon size={18} />
  </a>
);

export default Footer;