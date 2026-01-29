import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Mail,
  Send,
  ArrowRight
} from 'lucide-react';

function Contact() {
  const [selectedTopic, setSelectedTopic] = useState('General');
  const topics = ["General Inquiry", "Order Support", "Wholesale", "Careers"];

  return (
    <div className="min-h-screen font-sans text-gray-900">

      {/* 1. Header / Breadcrumb */}
      <div className="w-full bg-gray-100 py-4 px-[8%] lg:px-[12%]">
        <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
          <Link to="/" className="hover:underline text-gray-700 font-medium">Home</Link>
          <span className="text-gray-500"> / </span>
          <span className="text-orange-700 font-semibold">Contact</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">

        {/* 2. Main Layout: Split Design */}
        {/* Changed rounded-3xl to rounded-lg for sharper corners */}
        <div className="grid grid-cols-1 lg:grid-cols-5 bg-white rounded-lg shadow-lg overflow-hidden mb-20">

          {/* Left Column: Contact Information */}
          {/* bg-gray-200 requires DARK text to be readable */}
          <div className="lg:col-span-2 bg-gray-200 p-10 lg:p-12 relative overflow-hidden">

            {/* Decoration */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-100 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

            <h2 className="text-3xl font-bold font-bricolage mb-6 text-gray-900">Get in touch</h2>
            <p className="text-gray-600 mb-12 leading-relaxed">
              We'd love to hear from you. Our team is always here to chat.
            </p>

            <div className="space-y-8 relative z-10">
              {/* Address */}
              <div className="flex items-start space-x-4">
                {/* Changed bg to pure white for better contrast on gray-200 */}
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">Our Office</h4>
                  <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                    350 5th Avenue, Suite 4210<br />
                    New York, NY 10118
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">Working Hours</h4>
                  <p className="text-gray-600 mt-1 text-sm">Mon-Fri: 12 PM - 6 PM</p>
                  <p className="text-gray-600 text-sm">Sat: 12 PM - 4 PM</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <Mail className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">Email Us</h4>
                  <a href="mailto:trung@osmetico.com" className="text-gray-600 mt-1 text-sm hover:text-orange-600 transition-colors block">
                    trung@osmetico.com
                  </a>
                  <a href="mailto:support@osmetico.com" className="text-gray-600 text-sm hover:text-orange-600 transition-colors block">
                    support@osmetico.com
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-20 pt-8 border-t border-gray-300">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                Looking for careers? <Link to="/careers" className="text-gray-900 font-semibold underline underline-offset-4 decoration-orange-500 decoration-2">Join the team <ArrowRight size={14} className="inline" /> </Link>
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3 p-10 lg:p-16 bg-white">
            <form className="space-y-8">

              {/* Topic Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">I'm interested in...</label>
                <div className="flex flex-wrap gap-3">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      // Changed rounded-full to rounded-md
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${selectedTopic === topic
                        ? 'bg-orange-600 text-white border-orange-100 shadow-md'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input - Changed rounded-xl to rounded-md */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-5 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-400 outline-none"
                  />
                </div>
                {/* Email Input - Changed rounded-xl to rounded-md */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-5 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-400 outline-none"
                  />
                </div>
              </div>

              {/* Message Input - Changed rounded-xl to rounded-md */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project or inquiry..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-5 py-3 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-400 resize-none outline-none"
                ></textarea>
              </div>

              {/* Submit Button - Changed rounded-xl to rounded-md */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="group w-full md:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-bold transition-all duration-300 shadow-lg hover:shadow-orange-500/30 active:scale-95"
                >
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3. The Map Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-bricolage">Find us on the map</h2>
              <p className="text-gray-500 mt-2">Visit our HQ in the heart of New York.</p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-2"
            >
              Get Directions <ArrowRight size={18} />
            </a>
          </div>

          {/* Changed rounded-3xl to rounded-lg */}
          <div className="w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg border border-gray-200 relative">
            <iframe
              title="Osmetico Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617546045543!2d-73.98785842408365!3d40.74844037138814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1709923847528!5m2!1sen!2sus"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0" // Removed 'filter grayscale' classes
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Contact;