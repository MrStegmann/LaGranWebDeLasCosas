import { createContext, useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import AzulitoDrake from "../components/AzulitoDrake";

const AlertContext = createContext();

export default () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({});

  const { msg, destroy, type = "", deathTime = 5000 } = alert;
  // info, error, warning,
  useEffect(() => {
    if (msg) {
      if (destroy) setTimeout(() => setAlert({}), deathTime);
    }
  }, [msg]);

  const contextValue = useMemo(
    () => ({
      alert,
      setAlert,
    }),
    [alert]
  );

  return (
    <AlertContext.Provider value={contextValue}>
      {children}

      <div className="relative w-full">
        <div className={`absolute bottom-[25vh] right-[15vw]`}>
          <AzulitoDrake
            overSomething={`${alert?.msg ? "true" : ""}`}
            dragonSpeech={msg}
            dragonType={type}
          />
        </div>
      </div>
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
