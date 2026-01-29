import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown as ArrowDownIcon } from 'lucide-react';

const faqData = [
  {
    question: "What Shipping Methods are Available?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "How Long Will it Take To Get My Package?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "How Do I Track my Order?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    question: "How Do I Track my Order?",
    answer: "Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus."
  },
  {
    question: "Do I Need an Account to Place Order?",
    answer: "Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus."
  },
  {
    question: "How Do I Place Order?",
    answer: "Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc."
  },
  {
    question: "How Should I Contact the Shop in Case Of Issues or Queries?",
    answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

function FAQ() {

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* BreadCrumb */}
      <div className="w-full bg-gray-100 py-4 px-[8%] lg:px-[12%]">
        <div className="text-lg text-gray-600 flex justify-center items-center space-x-2">
          <Link to="/" className="hover:underline text-gray-700 font-medium">Home</Link>
          <span className="text-gray-500">&nbsp; / &nbsp;</span>
          <span className="text-orange-700 font-semibold">FAQ</span>
        </div>
      </div>
      {/* Shipping Information Section */}
      <section className="w-full px-[8%] lg:px-[12%] py-16 bg-white text-gray-800">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-3 mb-2 text-gray-800 font-bricolage">
            Frequently Asked Questions
          </h1>
          <div className="text-sm text-gray-500">
            This Agreement Was Last Modified on the 18th February 2025
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold relative inline-block mb-10 after:content-[''] after:block after:w-24 after:h-[3px]  after:bg-orange-400 after:mt-1">
            Shipping Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {faqData.slice(0, 4).map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-lg font-semibold text-gray-900">{item.question}</h4>
                <div className="text-sm text-gray-600 leading-relaxed">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Accordion Section */}
      <section className="w-full px-[8%] lg:px-[12%] py-16 bg-white text-gray-900">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-extrabold mt-3 mb-2 text-gray-800 font-bricolage">
            FAQ Second Version
          </h1>
          <div className="text-sm text-gray-500">
            This Agreement Was Last Modified on the 23rd February 2025
          </div>
        </div>
        <div className="mx-auto space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`border border-gray-200 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isOpen ? "bg-orange" : "bg-white"}`}>
                <button onClick={() => toggleFAQ(index)} className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none group transition duration-300">
                  <h4 className={`text-lg font-medium transition-colors duration-300 ${isOpen ? "text-orange-600" : "text-gray-800"} group-hover:text-orange-600`}>
                    {faq.question}
                  </h4>
                  <ArrowDownIcon size={20} className={`text-2xl transition-transform duration-300 ${isOpen ? "rotate-180 text-orange-600" : "text-gray-400"}`} />
                </button>
                <div className={`px-6 bg-white overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 py-3 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="text-sm text-gray-600 leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default FAQ
