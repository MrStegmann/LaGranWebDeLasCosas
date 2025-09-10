import React, { useEffect } from "react";
import IdGenerator from "../../helpers/IdGenerator";
import SelectGAC from "@/framework/SelectGAC";
import TextareaGAC from "@/framework/TextareaGAC";
import SaveButtonCAG from "@/framework/SaveButtonGAC";
import ArmorExtension from "../extensions/ArmorExtension";
import WeaponExtension from "../extensions/WeaponExtension";
import InputGAC from "@/framework/InputGAC";
import useAlert from "@/context/AlertContext";
import ShieldExtension from "../extensions/ShieldExtension";
import FormGAC from "@/framework/FormGAC";
import FieldSetGAC from "@/framework/FieldSetGAC";
import AmmoExtension from "../extensions/AmmoExtension";
import ammos from "@json/ammos.json";
import PropTypes from "prop-types";

const ItemForm = ({ itemData, handleSubmit }) => {
  const { setAlert } = useAlert();
  // states para clase Item
  // id, name, description, wearable, usable, price, max
  const [id, setId] = React.useState(IdGenerator());
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [quality, setQuality] = React.useState("");
  const [code, setCode] = React.useState("item");
  const [wearable, setWearable] = React.useState(false); // debe ser true obligatoriamente para los tipo armor, shield y weapon
  const [usable, setUsable] = React.useState(false); // debe ser true obligatoriamente para los items que se pueden usar y tienen efectos
  const [price, setPrice] = React.useState("1c");
  const [max, setMax] = React.useState(1);

  const [armor, setArmor] = React.useState({});
  const [weapon, setWeapon] = React.useState({});
  const [shield, setShield] = React.useState({});
  const [ammo, setAmmo] = React.useState({});

  useEffect(() => {
    if (itemData?.name) {
      setId(itemData._id || IdGenerator());
      setName(itemData.name);
      setDescription(itemData.description);
      setCode(itemData.code);
      setWearable(itemData.wearable);
      setUsable(itemData.usable);
      setPrice(itemData.price);
      setMax(itemData.max);
      if (itemData.code === "armor") {
        setArmor({
          type: itemData.type,
          slot: itemData.slot,
          pDefense: itemData.pDefense,
          sDefense: itemData.sDefense,
          durability: itemData.durability,
          reinforcement: itemData.reinforcement,
        });
      }
    }
  }, [itemData]);

  useEffect(() => {
    if (["weapon", "shield", "armor"].includes(code)) {
      setWearable(true);
      setUsable(false);
    } else {
      setWearable(false);
      setUsable(false);
    }
    if (code === "ammo") {
      setMax(40);
    } else {
      setMax(1);
    }
  }, [code]);

  useEffect(() => {
    if (ammo?.type) {
      const ammoData = ammos[ammo.type][ammo.material];
      const newPrice = ammoData?.unitCost.length > 0 ? ammoData.unitCost : "1c";
      setPrice(newPrice);
    }
  }, [ammo]);

  const handleSetArmor = (armor) => setArmor(armor);
  const handleSetWeapon = (weapon) => setWeapon(weapon);
  const handleSetShield = (shield) => setShield(shield);
  const handleSetAmmo = (ammo) => setAmmo(ammo);

  const onReset = () => {
    setId(IdGenerator());
    setName("");
    setDescription("");
    setCode("");
    setWearable(false);
    setUsable(false);
    setPrice("1c");
    setMax(1);
    setArmor({});
    setWeapon({});
    setShield({});
    setAmmo({});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setAlert({
        msg: "Debes introducir un nombre para el objeto",
        type: "error",
      });
      return;
    }

    let item = {
      id,
      name,
      description,
      code,
      quality,
      wearable,
      usable,
      price,
      max,
    };
    if (code === "armor") {
      item = { ...item, ...armor };
    }
    if (code === "weapon") {
      item = { ...item, ...weapon };
    }
    if (code === "shield") {
      item = { ...item, ...shield };
    }
    if (code === "ammo") {
      item = { ...item, ...ammo };
    }

    handleSubmit(item);

    onReset();
  };

  return (
    <FormGAC onSubmit={onSubmit}>
      {/* Sección: Información General */}
      <FieldSetGAC title={"Información general"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">
              Nombre
            </label>
            <InputGAC
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="price" className="block mb-1 font-semibold">
              Precio (unidad)
            </label>
            <InputGAC
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block mb-1 font-semibold">
              Descripción
            </label>
            <TextareaGAC
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>
        </div>
      </FieldSetGAC>

      {/* Sección: Atributos comunes */}
      <FieldSetGAC title={"Atributos"}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label htmlFor="code" className="block mb-1 font-semibold">
              Tipo de objeto
            </label>
            <SelectGAC
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            >
              <option value="item">Objeto</option>
              <option value="armor">Armadura</option>
              <option value="weapon">Arma</option>
              <option value="shield">Escudo</option>
              <option value="ammo">Munición</option>
            </SelectGAC>
          </div>

          <div>
            <label htmlFor="quality" className="block mb-1 font-semibold">
              Calidad
            </label>
            <SelectGAC
              id="quality"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
            >
              <option value="poor">Pobre</option>
              <option value="common">Común</option>
              <option value="uncommon">Poco común</option>
              <option value="rare">Raro</option>
              <option value="epic">Épico</option>
              <option value="legendary">Legendario</option>
              <option value="artifact">Artefacto</option>
              <option value="heirloom">Reliquia</option>
            </SelectGAC>
          </div>

          <div>
            <label htmlFor="max" className="block mb-1 font-semibold">
              Máximo
            </label>
            <InputGAC
              id="max"
              type="number"
              value={max}
              min={1}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>

          <div>
            <p className="block mb-1 font-semibold">Propiedad</p>
            <div className="flex flex-wrap gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="neither"
                  checked={!usable && !wearable}
                  onChange={() => {
                    setUsable(false);
                    setWearable(false);
                  }}
                  className="mr-2"
                />
                <span>Ninguna</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="usable"
                  checked={usable && !wearable}
                  onChange={() => {
                    setUsable(true);
                    setWearable(false);
                  }}
                  className="mr-2"
                />
                <span>Usable</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="options"
                  value="wearable"
                  checked={!usable && wearable}
                  onChange={() => {
                    setUsable(false);
                    setWearable(true);
                  }}
                  className="mr-2"
                />
                <span>Equipable</span>
              </label>
            </div>
          </div>
        </div>
      </FieldSetGAC>

      {/* Sección: Atributos dinámicos */}
      {["armor", "weapon", "shield", "ammo"].includes(code) && (
        <FieldSetGAC title={"Atributos específicos"}>
          <div className="mt-4">
            {code === "armor" && (
              <ArmorExtension armor={armor} handleSetArmor={handleSetArmor} />
            )}
            {code === "weapon" && (
              <WeaponExtension
                weapon={weapon}
                handleSetWeapon={handleSetWeapon}
              />
            )}
            {code === "shield" && (
              <ShieldExtension
                shield={shield}
                handleSetShield={handleSetShield}
              />
            )}
            {code === "ammo" && (
              <AmmoExtension ammo={ammo} handleSetAmmo={handleSetAmmo} />
            )}
          </div>
        </FieldSetGAC>
      )}

      {/* Botón de guardado */}

      <div className="text-right">
        <SaveButtonCAG>Guardar</SaveButtonCAG>
      </div>
    </FormGAC>
  );
};

ItemForm.propTypes = {
  itemData: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ItemForm;
