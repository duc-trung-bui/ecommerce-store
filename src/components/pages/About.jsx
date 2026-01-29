import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveRight } from 'lucide-react';

// Assets
import aboutImg1 from '../../assets/images/about--card-1.jpg';
import aboutImg2 from '../../assets/images/about--card-2.jpg';
import aboutImg3 from '../../assets/images/about--card-3.jpg';
import bgImage from '../../assets/images/blog-1.jpg';
import aboutImage from '../../assets/images/blog-4.jpg';

import member1 from '../../assets/images/team-1.jpg';
import member2 from '../../assets/images/team-2.jpg';
import member3 from '../../assets/images/team-3.jpg';
import member4 from '../../assets/images/team-4.jpg';
import member5 from '../../assets/images/team-5.jpg';

function About() {
  return (
    <div className="bg-white">
      {/* --- Breadcrumb --- */}
      <div className="w-full bg-gray-100 py-4 px-[8%] lg:px-[12%]">
        <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
          <Link to="/" className="hover:underline text-gray-700 font-medium">Home</Link>
          <span className="text-gray-500">&nbsp; / &nbsp;</span>
          <span className="text-orange-700 font-semibold">About</span>
        </div>
      </div>

      {/* --- Editorial Hero Section (Centered & Blurred) --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Hero Background"
            // Added blur-sm here
            className="w-full h-full object-cover scale-105 blur-sm"
          />
          <div className="absolute inset-0 bg-gray-900/70 backdrop-brightness-75"></div>
        </div>

        {/* Centered Content */}
        <div className="relative z-10 px-[8%] lg:px-[12%] w-full flex flex-col items-center text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-orange-500"></span>
              <span className="text-orange-500 uppercase tracking-[0.3em] text-xs font-bold">Who We Are</span>
              <span className="w-8 h-[2px] bg-orange-500"></span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 font-bricolage leading-[1.1]">
              Engineering the <br /> <span className="text-orange-500">Next Digital Era.</span>
            </h1>
            {/* Removed border-l-2 and pl-6 for centered look */}
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              At Osmetico, we believe technology should empower, inspire, and simplify everyday life. We blend high-performance engineering with modern design.
            </p>
          </div>
        </div>
      </section>

      {/* --- Vision & Strategic Values --- */}
      <section className="py-24 px-[8%] lg:px-[12%]">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-gray-400 mb-2">Our Foundation</h2>
          <h3 className="text-4xl font-bold font-bricolage text-gray-900">Strategic Vision</h3>
          <div className="w-12 border-b-2 border-orange-600 mt-2 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: aboutImg1,
              title: 'Core Purpose',
              text: 'Technology should be accessible. We work to offer devices that meet the needs of students, professionals, and creators.'
            },
            {
              img: aboutImg2,
              title: 'Global Vision',
              text: 'We believe technology should empower, inspire, and simplify everyday life through durability and modern design.'
            },
            {
              img: aboutImg3,
              title: 'Our Heritage',
              text: 'Osmetico started as a small passion project by a group of tech enthusiasts exploring new gadgets and innovations.'
            }
          ].map((card, index) => (
            // Changed rounded-sm to rounded-md. Kept border-gray-100.
            <div key={index} className="group border border-gray-200 rounded-md overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="h-64 overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  // Removed grayscale classes
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 bg-white">
                <h4 className="text-xl font-bold text-gray-900 font-bricolage mb-3 group-hover:text-orange-600 transition-colors">
                  {card.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {card.text}
                </p>
                <Link to="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 group-hover:text-orange-600 transition-all">
                  Learn More <MoveRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- The Leadership Team (Colorful & Rounded-md) --- */}
      <section className="py-24 bg-gray-50 px-[8%] lg:px-[12%]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] font-bold text-gray-400 mb-2">The Architects</h2>
            <h3 className="text-4xl font-bold font-bricolage text-gray-900">Leadership Team</h3>
            <div className="w-12 border-b-2 border-orange-600 mt-2"></div>
          </div>
        </div>
        <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-3xl">
          Our diverse team of experts is dedicated to pushing the boundaries of what's possible in consumer electronics.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { img: member1, name: "Henry McLauren", role: "CEO / Founder" },
            { img: member2, name: "Clare Sinclair", role: "President" },
            { img: member3, name: "Bob Cloudman", role: "CTO" },
            { img: member4, name: "Kate Rossman", role: "Inventory Manager" },
            { img: member5, name: "Ursula Vitalyti", role: "Logistics VP" }
          ].map((member, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Changed rounded-sm to rounded-md */}
              <div className="aspect-[3/4] overflow-hidden rounded-md mb-4 border border-gray-200">
                <img
                  src={member.img}
                  alt={member.name}
                  // Removed grayscale classes so they are colorful by default
                  className="w-full h-full object-cover transition-all duration-600 group-hover:scale-105"
                />
              </div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tighter group-hover:text-orange-600 transition-colors">{member.name}</h4>
              <p className="text-[11px] uppercase font-bold text-orange-500 tracking-widest">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Performance Section (Updated Rounding) --- */}
      <section className="py-32 px-[8%] lg:px-[12%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            {/* Changed rounded-sm to rounded-md */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-50 rounded-md -z-10"></div>
            {/* Changed rounded-sm to rounded-md */}
            <div className="rounded-md overflow-hidden shadow-2xl">
              <img src={aboutImage} alt="Performance" className="w-full h-[600px] object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            {/* Changed rounded-sm to rounded-md */}
            <div className="absolute bottom-8 right-8 bg-orange-600 text-white p-8 rounded-md shadow-xl hidden md:block">
              <p className="text-4xl font-bold font-bricolage">99.9%</p>
              <p className="text-xs uppercase tracking-widest font-bold opacity-80">Reliability Rate</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-orange-500"></span>
              <h2 className="text-orange-600 uppercase tracking-[0.3em] text-xs font-bold">
                Quality Assurance
              </h2>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-8 font-bricolage leading-tight">
              We Believe In <br /> <span className="text-slate-500">Superior Products.</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Our performance isn't just measured by speed, but by the lasting impact our devices have on your daily workflow. We source only the highest grade components to ensure longevity.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-10">
              <div>
                <p className="text-2xl font-bold text-gray-900 font-bricolage">150k+</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Devices Sold</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 font-bricolage">4.9/5</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About;