import './SectionTitle.css';

function SectionTitle({modifier, children}) {
  return (
    <h2 className={`section-title ${modifier}`}>{children}</h2>
  );
}

export default SectionTitle;
