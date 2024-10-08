 const FilterBoxSmall = ({color="none"}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="8" height="8" stroke={color} />
    <rect x="11.5" y="0.5" width="8" height="8" stroke={color} />
    <rect x="0.5" y="11.5" width="8" height="8" stroke={color} />
    <rect x="11.5" y="11.5" width="8" height="8" stroke={color} />
  </svg>
);

export default FilterBoxSmall;