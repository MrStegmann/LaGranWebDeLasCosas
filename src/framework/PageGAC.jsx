import PropTypes from "prop-types";
import MinimalGlowingBtn from "@/framework/MinimalGlowingBtn";

/** Componente para las páginas exceptuando MainMenu. Situa los componentes a la izquierda y distribuye el espacio para que la derecha quede libre. Además, tiene implícito el botón para volver que funciona con la propiedad obligatoria de "navigate".
 *
 * @param vanishContent Default = false; permite crear una animación de aparecer y desaparecer desde el componente padre.
 * @param navigate Proporciona una función para regresar o navegar a través de la página recibiendo la función desde el componente padre. Si es null o undefined, no aparecerá.
 *
 */
const PageGAC = ({ vanishContent = false, navigate, children }) => {
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="w-full h-full relative flex items-center"
    >
      {navigate && (
        <div className="absolute top-0 left-0">
          <MinimalGlowingBtn id="backToMainMenu" onClick={navigate}>
            Volver
          </MinimalGlowingBtn>
        </div>
      )}
      <div
        className={`w-1/2 h-3/4 transition-opacity duration-300 delay-700 ${vanishContent ? "opacity-0" : "opacity-100"}`}
      >
        {children}
      </div>
    </div>
  );
};

PageGAC.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageGAC;
