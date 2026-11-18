import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  Package,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  section: string;
}

interface FAQSectionMeta {
  id: string;
  title: string;
  description: string;
}

const FAQ_SECTIONS: FAQSectionMeta[] = [
  {
    id: "shipping",
    title: "Shipping & Delivery",
    description: "Coverage across the United States, dispatch timelines, and live tracking.",
  },
  {
    id: "pickup-account",
    title: "Pickup & Accounts",
    description: "Local New York pickup availability and guest checkout options.",
  },
  {
    id: "returns-warranty",
    title: "Returns & Support",
    description: "30-day return eligibility, warranty assistance, and product care.",
  },
];

const faqData: FAQItem[] = [
  {
    id: "where-ship",
    section: "shipping",
    question: "Where do you ship?",
    answer:
      "We ship electronics throughout the United States, including all five boroughs of New York City. Available delivery options and rates are shown at checkout.",
  },
  {
    id: "when-arrive",
    section: "shipping",
    question: "When will my order arrive?",
    answer:
      "Most orders are prepared within 1–2 business days. Delivery time depends on your location and the shipping option you choose, and your confirmation email will include an estimated arrival date.",
  },
  {
    id: "track-order",
    section: "shipping",
    question: "How can I track my order?",
    answer:
      "Once your order ships, we’ll email you a tracking link. Tracking updates may take a little time to appear after the carrier receives the package.",
  },
  {
    id: "local-pickup",
    section: "pickup-account",
    question: "Can I pick up my order in New York?",
    answer:
      "If local pickup is available for an item, you’ll see that option during checkout. Please wait for a pickup-ready confirmation before heading to the selected location.",
  },
  {
    id: "need-account",
    section: "pickup-account",
    question: "Do I need an account to shop?",
    answer:
      "No. You can check out as a guest. Creating an account is optional and makes it easier to review your order history and save your details for next time.",
  },
  {
    id: "return-policy",
    section: "returns-warranty",
    question: "What is your return policy?",
    answer:
      "Eligible items can be returned within 30 days of delivery, provided they are in their original condition and packaging. Review the return details for your item or contact our support team before sending it back.",
  },
  {
    id: "warranty-help",
    section: "returns-warranty",
    question: "What if I need help with a product or warranty?",
    answer:
      "Our support team can help with product questions, order issues, and warranty information. Keep your order number handy so we can assist you more quickly.",
  },
];

const STORE_HIGHLIGHTS = [
  {
    title: "Fast NYC & US Dispatch",
    detail: "Most electronics ship within 1–2 business days.",
    icon: Package,
  },
  {
    title: "Local NY Pickup",
    detail: "Wait for your ready email before heading in.",
    icon: MapPin,
  },
  {
    title: "30-Day Returns",
    detail: "Original condition & packaging required.",
    icon: RotateCcw,
  },
];

interface FAQProps {
  onOpenSupport?: () => void;
}

function FAQ({ onOpenSupport }: FAQProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string>("all");
  const [heroImageError, setHeroImageError] = useState(false);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return faqData.filter((item) => {
      const matchesTopic = activeTopic === "all" || item.section === activeTopic;
      const matchesQuery =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesTopic && matchesQuery;
    });
  }, [activeTopic, searchQuery]);

  const allVisibleExpanded =
    filteredQuestions.length > 0 &&
    filteredQuestions.every((item) => openIds.includes(item.id));

  const handleToggleAll = () => {
    if (allVisibleExpanded) {
      const visibleIds = new Set(filteredQuestions.map((q) => q.id));
      setOpenIds((prev) => prev.filter((id) => !visibleIds.has(id)));
    } else {
      const merged = new Set([...openIds, ...filteredQuestions.map((q) => q.id)]);
      setOpenIds(Array.from(merged));
    }
  };

  const visibleSections = useMemo(() => {
    return FAQ_SECTIONS.map((section) => ({
      ...section,
      items: filteredQuestions.filter((item) => item.section === section.id),
    })).filter((section) => section.items.length > 0);
  }, [filteredQuestions]);

  return (
    <main className="relative isolate -mb-20 min-h-screen overflow-x-clip bg-[#f7f6f4] text-[#1d1d1f]">
      {/* Breadcrumb styled consistently with the other pages */}
      <div className="w-full bg-gray-100 px-[8%] py-4 lg:px-[12%]">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center justify-center space-x-2 text-lg text-gray-600"
        >
          <Link to="/" className="font-medium text-gray-700 hover:underline">
            Home
          </Link>
          <span aria-hidden="true" className="text-gray-500">
            &nbsp; / &nbsp;
          </span>
          <span className="font-semibold text-orange-700">FAQ</span>
        </nav>
      </div>

      {/* Apple iPad-style Editorial Hero */}
      <section className="px-[6%] pt-12 pb-8 sm:pt-16 sm:pb-12 lg:px-[12%]">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-[0_20px_50px_rgba(71,55,43,0.035)] ring-1 ring-inset ring-white/60">
            <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-7 lg:p-14">
                <p className="mb-3 text-sm font-semibold tracking-wide text-orange-700">
                  Support &amp; Answers
                </p>
                <h1 className="font-bricolage text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                  Frequently asked questions.
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                  Clear answers about shipping, New York City pickup, guest checkout,
                  returns, and warranty support for your devices.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleToggleAll}
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-slate-300/60 bg-white/60 px-5 py-2.5 text-sm font-semibold text-[#1d1d1f] transition-colors duration-200 hover:bg-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                  >
                    {allVisibleExpanded ? "Collapse all answers" : "Expand all answers"}
                  </button>

                  <span className="text-sm tabular-nums text-slate-500">
                    {filteredQuestions.length}{" "}
                    {filteredQuestions.length === 1 ? "question" : "questions"} shown
                  </span>
                </div>
              </div>

              <div className="relative min-h-[220px] overflow-hidden border-t border-white/60 bg-orange-500/90 lg:col-span-5 lg:border-l lg:border-t-0">
                {!heroImageError ? (
                  <img
                    src="/src/assets/images/apple_ipad_studio_support_1794993697589.jpg"
                    alt="Minimalist aluminum tablet and stylus resting on a frosted glass pedestal"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImageError(true)}
                    className="h-full w-full object-cover lg:absolute lg:inset-0"
                  />
                ) : (
                  <div className="flex h-full min-h-[220px] flex-col items-center justify-center p-8 text-center">
                    <HelpCircle className="mb-3 h-10 w-10 text-white" />
                    <p className="font-bricolage text-lg font-semibold text-gray-100">
                      Osmetico Support
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 12-Column Editorial Layout */}
      <section className="px-[6%] pt-4 pb-14 lg:px-[12%]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* LEFT COLUMN: Spaced Topic Sections & Individual Question Containers */}
          <div className="lg:col-span-8">
            {visibleSections.length > 0 ? (
              visibleSections.map((section) => (
                <section
                  key={section.id}
                  aria-labelledby={`section-heading-${section.id}`}
                  className="mb-14 last:mb-0"
                >
                  <div className="mb-6 flex flex-col justify-between gap-2 px-1 sm:flex-row sm:items-end">
                    <div>
                      <h2
                        id={`section-heading-${section.id}`}
                        className="font-bricolage text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
                      >
                        {section.title}
                      </h2>
                      <p className="mt-1.5 text-sm text-gray-600 sm:text-base">
                        {section.description}
                      </p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap text-xs font-medium tabular-nums text-slate-500">
                      {section.items.length}{" "}
                      {section.items.length === 1 ? "topic" : "topics"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {section.items.map((faq) => {
                      const isOpen = openIds.includes(faq.id);
                      const answerId = `faq-answer-${faq.id}`;

                      return (
                        <article
                          key={faq.id}
                          className={`overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-200 ${
                            isOpen
                              ? "border-white/60 bg-white/60 shadow-[0_14px_38px_rgba(71,55,43,0.04)] ring-1 ring-inset ring-white/60"
                              : "border-white/60 bg-white/50 shadow-[0_6px_24px_rgba(71,55,43,0.02)] hover:bg-white/65 hover:shadow-[0_10px_28px_rgba(71,55,43,0.035)]"
                          }`}
                        >
                          <h3>
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              aria-controls={answerId}
                              onClick={() => toggleFAQ(faq.id)}
                              className="group flex w-full items-center justify-between gap-6 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500/60 sm:px-8 sm:py-6"
                            >
                              <span
                                className={`text-base font-semibold leading-snug transition-colors sm:text-lg ${
                                  isOpen
                                    ? "text-orange-700"
                                    : "text-gray-900 group-hover:text-orange-700"
                                }`}
                              >
                                {faq.question}
                              </span>

                              <span
                                aria-hidden="true"
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                                  isOpen
                                    ? "rotate-180 border-orange-500/90 bg-orange-500/90 text-white"
                                    : "border-slate-300/60 bg-white/60 text-slate-600 group-hover:border-orange-300/60 group-hover:text-orange-700/80"
                                }`}
                              >
                                <Plus size={18} strokeWidth={2} />
                              </span>
                            </button>
                          </h3>

                          <div
                            id={answerId}
                            aria-hidden={!isOpen}
                            className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                              isOpen
                                ? "visible grid-rows-[1fr] opacity-100"
                                : "invisible grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="min-h-0 overflow-hidden">
                              <div className="mx-6 border-t border-slate-300/60 pt-4 pb-6 sm:mx-8 sm:pt-5 sm:pb-7">
                                <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-7">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))
            ) : (
              <div className="rounded-2xl border border-white/60 bg-white/60 p-10 text-center sm:p-12">
                <p className="font-bricolage text-xl font-semibold text-[#1d1d1f]">
                  No matching questions found
                </p>
                <p className="mt-2 text-sm text-slate-600 sm:text-base">
                  Try clearing your search or selecting another topic in the sidebar.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveTopic("all");
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-700/80 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-700/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Bottom Support Card */}
            <div className="mt-14 rounded-3xl border border-white/60 bg-white/60 p-8 shadow-[0_12px_36px_rgba(71,55,43,0.03)] ring-1 ring-inset ring-white/60 sm:p-10">
              <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-bricolage text-2xl font-semibold text-[#1d1d1f]">
                    Still need a hand?
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                    Our New York-based support team can help with product questions,
                    order tracking, and warranty coverage.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenSupport}
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-orange-500/90 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-orange-700/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2"
                >
                  <Mail size={16} aria-hidden="true" />
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <aside className="space-y-8 lg:col-span-4 lg:h-fit lg:self-start">
            {/* Search Widget */}
            <div className="group relative">
              <label htmlFor="faq-search" className="sr-only">
                Search questions
              </label>
              <input
                id="faq-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full rounded-2xl border border-white/60 bg-white/60 py-4 pl-12 pr-10 text-sm text-[#1d1d1f] shadow-[0_6px_24px_rgba(71,55,43,0.025)] transition-colors placeholder:text-slate-500 focus:bg-white/75 focus:outline-none focus:ring-2 focus:ring-orange-500/60"
              />
              <Search
                aria-hidden="true"
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-orange-700/80"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-200/60 hover:text-slate-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Explore Topics Widget */}
            <div className="rounded-2xl border border-white/60 bg-white/60 p-6 shadow-[0_8px_28px_rgba(71,55,43,0.03)] ring-1 ring-inset ring-white/60 sm:p-7">
              <h2 className="font-bricolage mb-5 text-lg font-semibold text-[#1d1d1f]">
                Explore Topics
              </h2>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTopic("all")}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                      activeTopic === "all"
                        ? "bg-white/60 text-orange-700/80"
                        : "text-slate-600 hover:bg-white/50 hover:text-[#1d1d1f]"
                    }`}
                  >
                    <span>All Questions</span>
                    <span className="text-xs font-semibold tabular-nums text-slate-500">
                      {faqData.length}
                    </span>
                  </button>
                </li>
                {FAQ_SECTIONS.map((sec) => {
                  const count = faqData.filter((q) => q.section === sec.id).length;
                  const isSelected = activeTopic === sec.id;
                  return (
                    <li key={sec.id}>
                      <button
                        type="button"
                        onClick={() => setActiveTopic(sec.id)}
                        className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-white/60 text-orange-700/80"
                            : "text-slate-600 hover:bg-white/50 hover:text-[#1d1d1f]"
                        }`}
                      >
                        <span>{sec.title}</span>
                        <span className="text-xs font-semibold tabular-nums text-slate-500">
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Store Highlights Card */}
            <div className="rounded-2xl border border-white/60 bg-white/60 p-6 shadow-[0_8px_28px_rgba(71,55,43,0.03)] ring-1 ring-inset ring-white/60 sm:p-7">
              <h2 className="font-bricolage mb-5 flex items-center gap-2 text-lg font-semibold text-[#1d1d1f]">
                <Clock size={18} className="text-orange-700/80" aria-hidden="true" />
                At a Glance
              </h2>
              <div className="space-y-5">
                {STORE_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/60 bg-white/60 text-orange-700/80">
                        <Icon size={18} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#1d1d1f]">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-600">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-2 border-t border-slate-200/70 pt-5">
                <Link
                  to="/shop"
                  className="flex items-center justify-between rounded-xl px-2 py-2 text-sm font-semibold text-[#1d1d1f] transition-colors hover:text-orange-700/80"
                >
                  <span>Browse Electronics Shop</span>
                  <ChevronRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center justify-between rounded-xl px-2 py-2 text-sm font-semibold text-[#1d1d1f] transition-colors hover:text-orange-700/80"
                >
                  <span>Read Tech Journal</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Warranty Assurance Note */}
            <div className="rounded-2xl border border-white/60 bg-white/60 p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-orange-700/80"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Keep your order confirmation number handy when contacting support so
                  our New York specialists can locate your shipment or warranty details
                  right away.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default FAQ;