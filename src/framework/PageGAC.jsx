import PropTypes from "prop-types";

const PageGAC = ({ children }) => {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="w-full flex flex-col p-6 "
    >
      {children}
    </div>
  );
};

PageGAC.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageGAC;
