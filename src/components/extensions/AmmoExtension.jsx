import { useState, useRef, useEffect } from "react";
import SelectGAC from "@/framework/SelectGAC";
import ammos from "@json/ammos.json";
import InputGAC from "@/framework/InputGAC";
import PropTypes from "prop-types";

const AmmoExtension = ({ ammo, handleSetAmmo }) => {
  const [type, setType] = useState("arrow");
  const [material, setMaterial] = useState("wood");
  const [damage, setDamage] = useState(0);

  const [materialList, setMaterialList] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && ammo?.type !== undefined) {
      setType(ammo.type);
      setMaterial(ammo.material);
      setDamage(ammo.damage);

      initialized.current = true;
    }
  }, [ammo]);

  useEffect(() => {
    if (!type) return;
    const ammoData = ammos[type];
    if (!ammoData) return;
    const materials = Object.keys(ammoData);
    setMaterialList(materials);
    if (materials.find((mat) => mat === "wood")) setMaterial("wood");
    else setMaterial("lead");
  }, [type]);

  useEffect(() => {
    const ammoData = ammos[type][material];
    if (!ammoData) return;
    setDamage(ammoData.damage);
  }, [type, material]);

  useEffect(() => {
    handleSetAmmo({ type, material, damage });
  }, [type, material, damage]);
  return (
    <section className="p-4 mt-6">
      <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">
        Detalles de Munición
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
            <option value="arrow">Flecha</option>
            <option value="crossbowBolt">Virote</option>
            <option value="bullet">Bala</option>
          </SelectGAC>
        </div>
        <div>
          <label
            htmlFor="material"
            className="block mb-1 font-semibold tracking-wide text-[#dbc59a]"
          >
            Material
          </label>
          <SelectGAC
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            {materialList.map((mat) => (
              <option key={mat} value={mat}>
                {mat}
              </option>
            ))}
          </SelectGAC>
        </div>
        <div>
          <label
            htmlFor="damage"
            className="block mb-1 font-semibold tracking-wide text-[#dbc59a]"
          >
            Daño (físico)
          </label>
          <InputGAC
            id="damage"
            type="number"
            value={damage}
            min={0}
            onChange={(e) => setDamage(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};

AmmoExtension.propTypes = {
  ammo: PropTypes.object.isRequired,
  handleSetAmmo: PropTypes.func.isRequired,
};

export default AmmoExtension;
