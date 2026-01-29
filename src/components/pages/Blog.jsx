import React from 'react';
import blogImg1 from '../../assets/images/blog-1.jpg';
import blogImg2 from '../../assets/images/blog-2.jpg';
import blogImg3 from '../../assets/images/blog-3.jpg';
import blogImg4 from '../../assets/images/blog-4.jpg';
import blogImg5 from '../../assets/images/blog-5.jpg';

import { Link } from 'react-router-dom';
import {
  Calendar,
  ArrowRight,
  Search,
  Hash,
  Clock,
  Tag,
  ChevronRight
} from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    image: blogImg1,
    title: "The Future of Robotics: Automation in 2024",
    category: "Technology",
    date: "Mar 24, 2024",
    excerpt: "As AI integration becomes seamless, we explore how robotics are reshaping industrial landscapes and what it means for the future workforce."
  },
  {
    id: 2,
    image: blogImg2,
    title: "Designing for Sound: The Audio Experience",
    category: "Design",
    date: "Mar 28, 2024",
    excerpt: "Sound design is often an afterthought. Here is why audio UI is the next frontier in immersive web experiences."
  },
  {
    id: 3,
    image: blogImg3,
    title: "Cinematography in the Digital Age",
    category: "Video",
    date: "April 02, 2024",
    excerpt: "From 8K sensors to AI upscaling, digital tools are changing the way we perceive cinematic storytelling."
  },
  {
    id: 4,
    image: blogImg4,
    title: "Global Summit Announcement 2024",
    category: "News",
    date: "April 05, 2024",
    excerpt: "We are thrilled to announce our upcoming summit. Join industry leaders for a weekend of innovation."
  },
  {
    id: 5,
    image: blogImg5,
    title: "SpaceX Starship: A New Era of Flight",
    category: "Aerospace",
    date: "April 07, 2024",
    excerpt: "A deep dive into the engineering marvels behind the latest Starship prototype and its mission to Mars."
  }
];


const categories = [
  { name: 'Technology', count: 12 },
  { name: 'Design', count: 8 },
  { name: 'Culture', count: 15 },
  { name: 'Business', count: 4 },
  { name: 'Lifestyle', count: 9 },
];

// Helper component for the Category Badge
const CategoryBadge = ({ text }) => (
  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
    {text}
  </span>
);

function Blog() {
  // Separate the first post (Featured) from the rest
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen">

      {/* --- Breadcrumb (Kept Intact) --- */}
      <div className="w-full bg-gray-100 py-4 px-[8%] lg:px-[12%]">
        <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
          <Link to="/" className="hover:underline text-gray-700 font-medium">Home</Link>
          <span className="text-gray-500">&nbsp; / &nbsp;</span>
          <span className="text-orange-700 font-semibold">Blog</span>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="w-full px-[6%] lg:px-[12%] py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT COLUMN: Content Feed */}
          <div className="lg:col-span-8">

            {/* 1. Featured Post (Hero Card) */}
            <div className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 mb-12 border border-gray-100">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <CategoryBadge text={featuredPost.category} />
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={14} className="mr-2" /> {featuredPost.date}
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <Link to="#" className="inline-flex items-center font-bold text-gray-900 hover:text-orange-600 transition-colors">
                    Read Full Story <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Grid for Remaining Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {remainingPosts.map((post) => (
                <div
                  key={post.id}
                  className="group flex flex-col bg-white rounded-md shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full border border-gray-100"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <CategoryBadge text={post.category} />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-gray-400 text-xs mb-3 font-medium uppercase tracking-wide">
                      {post.date}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <Link to="#" className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 flex items-center gap-1 transition-colors">
                        Read Article <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Modern Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-8 sticky top-8">

            {/* Search Widget */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-white py-4 pl-12 pr-4 rounded-md border border-gray-100 shadow-sm text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20} />
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Explore Topics</h4>
              <ul className="space-y-2">
                {categories.map((cat, idx) => (
                  <li key={idx} className="group">
                    <button className="w-full flex items-center justify-between py-2 text-sm text-gray-600 hover:text-orange-600 transition-all border-b border-transparent hover:border-gray-50">
                      <span>{cat.name}</span>
                      <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-sm group-hover:bg-orange-100 group-hover:text-orange-700">
                        {cat.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts Minimal Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-2">
                <Clock size={18} className="text-orange-500" /> Trending Now
              </h4>
              <div className="space-y-6">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex gap-4 group cursor-pointer">
                    <img
                      src={post.image}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity"
                    />
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm leading-tight mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {post.title}
                      </h5>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Cloud */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <Tag size={18} className="text-orange-500" /> Popular Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {["innovation", "robotics", "minimalism", "future", "ui/ux", "dev"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md hover:bg-gray-900 hover:text-white transition-colors cursor-pointer capitalize">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

export default Blog;