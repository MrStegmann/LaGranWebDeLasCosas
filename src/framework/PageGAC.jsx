import PropTypes from "prop-types";

const PageGAC = ({ children }) => {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="h-full w-full flex flex-col justify-center items-center p-6 antialiased"
    >
      {children}
    </div>
  );
};

PageGAC.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageGAC;
