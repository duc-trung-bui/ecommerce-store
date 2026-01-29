// Helper to render Section Title
const SectionHeader = ({ badge, title }) => (
  <div className="section-title px-[8%] lg:px-[12%] py-14">
    <span className="text-xl font-semibold bg-orange-400 px-5 py-2 rounded-full text-white">{badge}</span>
    <h1 className="text-5xl font-bold font-bricolage mt-5">{title}</h1>
  </div>
);

export default SectionHeader;