import PropTypes from "prop-types";
import SelectGAC from "@/framework/SelectGAC";
import InputGAC from "@/framework/InputGAC";
import { useEffect, useState, useRef } from "react";
import armors from "@json/armor.json";
import FieldSetGAC from "@/framework/FieldSetGAC";

const ArmorExtension = ({ armor, handleSetArmor }) => {
  const [type, setType] = useState("cloth");
  const [slot, setSlot] = useState("head");
  const [pDefense, setPDefense] = useState(0);
  const [sDefense, setSDefense] = useState(0);
  const [durability, setDurability] = useState(0);
  const [requirements, setRequirements] = useState({});
  const [cons, setCons] = useState({});
  // Refuerzos
  const [reinforcement, setReinforcement] = useState("");
  const [reinforcementPDefense, setReinforcementPDefense] = useState(0);
  const [reinforcementSDefense, setReinforcementSDefense] = useState(0);
  const [reinforcementDurability, setReinforcementDurability] = useState(0);
  const [reinforcementRequirements, setReinforcementRequirements] = useState(
    {}
  );
  const [reinforcementCons, setReinforcementCons] = useState({});

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && armor?.type !== undefined) {
      setType(armor.type);
      setSlot(armor.slot);
      setPDefense(armor.pDefense);
      setSDefense(armor.sDefense);
      setDurability(armor.durability);
      setTimeout(() => {
        setReinforcement(armor.reinforcement);
      }, 100);

      initialized.current = true;
    }
  }, [armor]);

  useEffect(() => {
    setRequirements({});
    setCons({});
    setReinforcement("");
    const armorData = armors.type[type];
    setPDefense(armorData.pDefense);
    setSDefense(armorData.sDefense);
    setDurability(armorData.durability);
    if (armorData.requirements) {
      setRequirements((before) => ({
        ...before,
        ...armorData.requirements[slot],
      }));
    }
    if (armorData.cons) {
      setCons((before) => ({ ...before, ...armorData.cons[slot] }));
    }
  }, [type, slot]);

  useEffect(() => {
    onResetReinforcement();
    if (reinforcement.length === 0) return;
    let armorData = {};
    if (reinforcement.includes("-")) {
      const reinforcementValue = reinforcement.split("-")[1];
      armorData = armors.reinforcement[reinforcementValue];
    } else {
      armorData = armors.type[reinforcement];
    }

    setReinforcementPDefense(armorData.pDefense);
    setReinforcementSDefense(armorData.sDefense);
    setReinforcementDurability(armorData.durability);
    if (armorData.requirements) {
      if (reinforcement.includes("-")) {
        setReinforcementRequirements((before) => ({
          ...before,
          ...armorData.requirements,
        }));
      } else {
        setReinforcementRequirements((before) => ({
          ...before,
          ...armorData.requirements[slot],
        }));
      }
    }
    if (armorData.cons) {
      if (reinforcement.includes("-")) {
        setReinforcementCons((before) => ({ ...before, ...armorData.cons }));
      } else {
        setReinforcementCons((before) => ({
          ...before,
          ...armorData.cons[slot],
        }));
      }
    }
  }, [reinforcement]);

  useEffect(() => {
    const reqs = flatRequirements(requirements, reinforcementRequirements);
    const co = flatCons(cons, reinforcementCons);
    const totalPDefense = pDefense + reinforcementPDefense;
    const totalSDefense = sDefense + reinforcementSDefense;
    const totalDurability = durability + reinforcementDurability;
    handleSetArmor({
      type,
      slot,
      pDefense: totalPDefense,
      sDefense: totalSDefense,
      durability: totalDurability,
      reinforcement,
      requirements: reqs,
      cons: co,
    });
  }, [
    type,
    slot,
    pDefense,
    reinforcementPDefense,
    sDefense,
    reinforcementSDefense,
    durability,
    reinforcementDurability,
    reinforcement,
    requirements,
    reinforcementRequirements,
    cons,
    reinforcementCons,
  ]);

  const flatRequirements = (requirements, reinforcementRequirements) => {
    const reqs = new Map();
    for (const [key, value] of Object.entries(requirements)) {
      if (reqs.get(key)) {
        reqs.set(key, reqs.get(key) + value);
      } else {
        reqs.set(key, value);
      }
    }
    for (const [key, value] of Object.entries(reinforcementRequirements)) {
      if (reqs.get(key)) {
        reqs.set(key, reqs.get(key) + value);
      } else {
        reqs.set(key, value);
      }
    }
    if (!reinforcement.includes("-")) {
      if (
        (reinforcement === "mail" || reinforcement === "plate") &&
        (type === "plate" || type === "mail")
      ) {
        for (const [key, value] of reqs) {
          reqs.set(key, value * 2);
        }
      }
    }

    return Object.fromEntries(reqs);
  };

  const flatCons = (cons, reinforcementCons) => {
    const co = new Map();
    for (const [key, value] of Object.entries(cons)) {
      if (co.get(key)) {
        co.set(key, co.get(key) + value);
      } else {
        co.set(key, value);
      }
    }
    for (const [key, value] of Object.entries(reinforcementCons)) {
      if (co.get(key)) {
        co.set(key, co.get(key) + value);
      } else {
        co.set(key, value);
      }
    }
    if (!reinforcement.includes("-")) {
      for (const [key, value] of co) {
        co.set(key, value * 2);
      }
    }
    return Object.fromEntries(co);
  };

  const onResetReinforcement = () => {
    setReinforcementPDefense(0);
    setReinforcementSDefense(0);
    setReinforcementDurability(0);
    setReinforcementRequirements({});
    setReinforcementCons({});
  };

  return (
    <section className="p-4 mt-6">
      <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">
        Detalles de Armadura
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="type"
            className="block mb-1 font-semibold tracking-wide text-[#dbc59a]"
          >
            Tipo
          </label>
          <SelectGAC
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="cloth">Tela</option>
            <option value="leather">Cuero</option>
            <option value="mail">Malla</option>
            <option value="plate">Placa</option>
          </SelectGAC>
        </div>

        <div>
          <label
            htmlFor="slotArmor"
            className="block mb-1 font-semibold tracking-wide text-[#dbc59a]"
          >
            Pieza
          </label>
          <SelectGAC
            id="slotArmor"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
          >
            <option value={"head"}>Cabeza</option>
            <option value={"shoulders"}>Hombro</option>
            <option value={"chest"}>Pecho</option>
            <option value={"hands"}>Guantes</option>
            <option value={"legs"}>Piernas</option>
            <option value={"feet"}>Botas</option>
            <option value={"neck"}>Collar</option>
            <option value={"rings"}>Anillos</option>
            <option value={"trinkets"}>Abalorios</option>
          </SelectGAC>
        </div>

        <div>
          <label
            htmlFor="pDefense"
            className="block mb-1 font-semibold tracking-wide text-[#dbc59a]"
          >
            Reducción Física
          </label>
          <InputGAC
            id="pDefense"
            type="number"
            value={pDefense}
            min={0}
            onChange={(e) => setPDefense(e.target.value)}
          />
          {reinforcement.length > 0 && (
            <p>(+{reinforcementPDefense} Refuerzo)</p>
          )}
        </div>

        <div>
          <label
            htmlFor="sDefense"
            className="block mb-1 font-semibold tracking-wide text-[#dbc59a]"
          >
            Reducción Mágica
          </label>
          <InputGAC
            id="sDefense"
            type="number"
            value={sDefense}
            min={0}
            onChange={(e) => setSDefense(e.target.value)}
          />
          {reinforcement.length > 0 && (
            <p>(+{reinforcementSDefense} Refuerzo)</p>
          )}
        </div>

        <div>
          <label
            htmlFor="durability"
            className="block mb-1 font-semibold tracking-wide text-[#dbc59a]"
          >
            Durabilidad
          </label>
          <InputGAC
            id="durability"
            type="number"
            value={durability}
            min={1}
            onChange={(e) => setDurability(e.target.value)}
          />
          {reinforcement.length > 0 && (
            <p>(+{reinforcementDurability} Refuerzo)</p>
          )}
        </div>

        <div>
          <label
            htmlFor="reinforcement"
            className="block mb-1 font-semibold tracking-wide text-[#dbc59a]"
          >
            Refuerzo
          </label>
          <SelectGAC
            id="reinforcement"
            value={reinforcement}
            onChange={(e) => setReinforcement(e.target.value)}
          >
            <option value="">Sin refuerzos</option>
            <option value="reinforcement-leather">Refuerzo de cuero</option>
            <option value="reinforcement-mail">Refuerzo de malla</option>
            <option value="reinforcement-plate">Refuerzo de placa</option>
            {type !== "cloth" && <option value="cloth">(Armadura) Tela</option>}
            {type !== "leather" && (
              <option value="leather">(Armadura) Cuero</option>
            )}
            {type !== "mail" && <option value="mail">(Armadura) Malla</option>}
            {type !== "plate" && (
              <option value="plate">(Armadura) Placa</option>
            )}
          </SelectGAC>
          <p className="italic text-sm">
            Elegir un refuerzo de tipo Armadura conlleva penalizadores
          </p>
        </div>

        <div className="my-5">
          <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">
            Requerimientos
          </h3>
          {Object.entries(requirements).length ? (
            <FieldSetGAC title={"De Armadura"}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
                {Object.entries(requirements).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </FieldSetGAC>
          ) : (
            <p>Sin requerimientos de armadura</p>
          )}
          {Object.entries(reinforcementRequirements).length ? (
            <FieldSetGAC title={"De Refuerzo"}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
                {Object.entries(reinforcementRequirements).map(
                  ([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  )
                )}
              </ul>
            </FieldSetGAC>
          ) : (
            <p>Sin requerimientos de refuerzo</p>
          )}
        </div>
        <div>
          <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">
            Contras
          </h3>
          {Object.entries(cons).length ? (
            <FieldSetGAC title={"De Armadura"}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
                {Object.entries(cons).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </FieldSetGAC>
          ) : (
            <p>Sin contras de armadura</p>
          )}
          {Object.entries(reinforcementCons).length ? (
            <FieldSetGAC title={"De Refuerzo"}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
                {Object.entries(reinforcementCons).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </FieldSetGAC>
          ) : (
            <p>Sin contras de refuerzo</p>
          )}
        </div>
      </div>
    </section>
  );
};

ArmorExtension.propTypes = {
  armor: PropTypes.object.isRequired,
  handleSetArmor: PropTypes.func.isRequired,
};

export default ArmorExtension;
