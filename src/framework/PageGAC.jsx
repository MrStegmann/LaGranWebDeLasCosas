import PropTypes from "prop-types";

const PageGAC = ({ children }) => {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="w-full h-screen flex flex-col justify-center items-center"
    >
      {children}
    </div>
  );
};

PageGAC.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageGAC;
