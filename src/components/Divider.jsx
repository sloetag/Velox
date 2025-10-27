


const Divider = ({ className = "" }) => {
  return (
    <hr 
      className={`border-gray-700 ${className}`}
      aria-hidden="true"
    />
  );
};

export default Divider;
