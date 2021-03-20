import PropTypes from 'prop-types';
import s from './Section.module.scss';

const Section = ({ title, children }) => (
  <section className={s.section}>
    <h2 className={s.sectionTitle}>{title}</h2>
    {children}
  </section>
);

Section.protoType = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Section;
