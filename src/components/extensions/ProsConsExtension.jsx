import { useEffect, useState } from "react";

import SelectGAC from "@/framework/SelectGAC";
import _ from "../../helpers/Translator";
import useSheet from "@/context/SheetContext";
import PropTypes from "prop-types";

const ProsConsExtension = ({ pros, cons, attributes, handleSpecialsPros }) => {
  const { Attribute } = useSheet();

  const [toAdapt, setToAdapt] = useState("");
  const [talentsToAdapt, setTalentsToAdapt] = useState([]);
  const [toImprove, setToImprove] = useState("");
  const [talentsToImprove, setTalentsToImprove] = useState([]);

  useEffect(() => {
    handleSpecialsPros("adapt", toAdapt);
  }, [toAdapt]);
  useEffect(() => {
    handleSpecialsPros("improvement", toImprove);
  }, [toImprove]);

  // Prepara condicionales únicos para la ficha como la selección de talentos a mejorar por perks o la automatización de pros y contras de raza
  useEffect(() => {
    onReset();
    if (!pros) return;
    const mappedPros = new Map(Object.entries(pros));
    if (mappedPros.get("TALENT:adapt")) {
      let lowests = Attribute.getAllTimeLowestTalents(attributes);
      if (lowests.length === 0) return;

      setTalentsToAdapt(lowests);
    } else {
      setTalentsToAdapt([]);
    }
    if (mappedPros.get("TALENT:improvement")) {
      let highests = Attribute.getAllTimeHighestTalents(attributes);
      if (highests.length === 0) return;

      setTalentsToImprove(highests);
    } else {
      setTalentsToImprove([]);
    }
  }, [pros, attributes]);

  useEffect(() => {
    onReset();
  }, [cons, attributes]);

  const onReset = () => {
    setToAdapt("");
    setToImprove("");
  };

  return (
    <section className="p-1 mt-6">
      {pros && (
        <>
          <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">
            Pros
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {pros &&
              Object.entries(pros).map(([key, value]) => {
                if (["TALENT:adapt", "TALENT:improvement"].includes(key)) {
                  if (key === "TALENT:adapt") {
                    return (
                      <li key={key + "PROS"}>
                        <p>
                          {_("es", key.split(":")[1])}: <span>{value}</span>
                        </p>
                        <SelectGAC
                          value={toAdapt}
                          onChange={(e) => setToAdapt(e.target.value)}
                        >
                          <option value={""}>Sin elegir</option>
                          {talentsToAdapt.map((value) => (
                            <option
                              key={value.code + "PROS"}
                              value={value.code}
                            >
                              {_(
                                "es",
                                value.code.includes(":")
                                  ? value.code.split(":")[1]
                                  : value.code
                              )}
                            </option>
                          ))}
                        </SelectGAC>
                      </li>
                    );
                  }
                  if (key === "TALENT:improvement") {
                    return (
                      <li key={key + "PROS"}>
                        <p>
                          {_("es", key.split(":")[1])}: <span>{value}</span>
                        </p>
                        <SelectGAC
                          value={toImprove}
                          onChange={(e) => setToImprove(e.target.value)}
                        >
                          <option value={""}>Sin elegir</option>
                          {talentsToImprove.map((value) => (
                            <option
                              key={value.code + "PROS"}
                              value={value.code}
                            >
                              {_(
                                "es",
                                value.code.includes(":")
                                  ? value.code.split(":")[1]
                                  : value.code
                              )}
                            </option>
                          ))}
                        </SelectGAC>
                      </li>
                    );
                  }
                }
                return (
                  <li key={key + "PROS"}>
                    <p>
                      {_("es", key.includes(":") ? key.split(":")[1] : key)}:{" "}
                      <span>{value}</span>
                    </p>
                  </li>
                );
              })}
          </ul>
        </>
      )}
      {cons && (
        <>
          <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">
            Contras
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {cons &&
              Object.entries(cons).map(([key, value]) => {
                return (
                  <li key={key + "CONS"}>
                    <p>
                      {_("es", key.includes(":") ? key.split(":")[1] : key)}:{" "}
                      <span>{value}</span>
                    </p>
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </section>
  );
};

ProsConsExtension.propTypes = {
  pros: PropTypes.array.isRequired,
  cons: PropTypes.array.isRequired,
  attributes: PropTypes.array.isRequired,
  handleSpecialsPros: PropTypes.func.isRequired,
};

export default ProsConsExtension;
