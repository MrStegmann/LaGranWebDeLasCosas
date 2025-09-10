import { useState, useEffect, useRef } from "react";
import useItem from "@/context/ItemsContext";
import SelectGAC from "@/framework/SelectGAC";
import ItemsSelection from "../ItemsSelection";
import useAlert from "@/context/AlertContext";
import useSheet from "@/context/SheetContext";
import _ from "../../helpers/Translator";
import PropTypes from "prop-types";

const GearExtension = ({
  charGear,
  charInventory,
  handleSetGear,
  handleSetInventory,
}) => {
  const { items, Item } = useItem();
  const { Gear } = useSheet();
  const { setAlert } = useAlert();
  // "head": Armor, "shoulders": Armor, "chest": Armor, "hands": Armor,  "legs": Armor, "feet": Armor, "neck": Armor, "ring": [Armor], "trinket": [Amor], "firstHand": Weapon, "secondHand": Weapon | Shield
  const [head, setHead] = useState({});
  const [shoulders, setShoulders] = useState({});
  const [chest, setChest] = useState({});
  const [hands, setHands] = useState({});
  const [legs, setLegs] = useState({});
  const [feet, setFeet] = useState({});
  const [necks, setNecks] = useState([]);
  const [rings, setRings] = useState([]);
  const [trinkets, setTrinkets] = useState([]);
  const [firstHand, setFirstHand] = useState({});
  const [secondHand, setSecondHand] = useState({});
  const [inventory, setInventory] = useState([]);

  const [headList, setHeadList] = useState([]);
  const [shouldersList, setShouldersList] = useState([]);
  const [chestList, setChestList] = useState([]);
  const [handsList, setHandsList] = useState([]);
  const [legsList, setLegsList] = useState([]);
  const [feetList, setFeetList] = useState([]);
  const [neckList, setNeckList] = useState([]);
  const [ringList, setRingList] = useState([]);
  const [trinketList, setTrinketList] = useState([]);
  const [firstHandList, setFirstHandList] = useState([]);
  const [secondHandList, setSecondHandList] = useState([]);
  const [othersList, setOthersList] = useState([]);

  const initializedGear = useRef(false);
  const initializedInventory = useRef(false);

  useEffect(() => {
    if (!initializedGear.current && Object.entries(charGear).length > 0) {
      Object.entries(charGear).forEach(([slot, item]) => {
        if (item?._id) {
          setters[slot](Item.fromRaw(item));
        }
      });

      initializedGear.current = true;
    }
  }, [charGear]);

  useEffect(() => {
    if (!initializedInventory.current && charInventory.length > 0) {
      setInventory(charInventory.map(Item.fromRaw));

      initializedInventory.current = true;
    }
  }, [charInventory]);

  useEffect(() => {
    onResetLists();
    const amorSetters = {
      head: setHeadList,
      shoulders: setShouldersList,
      chest: setChestList,
      hands: setHandsList,
      legs: setLegsList,
      feet: setFeetList,
      neck: setNeckList,
      ring: setRingList,
      trinket: setTrinketList,
    };

    const armorItems = items.filter((item) => item.code === "armor");
    armorItems.forEach((item) => {
      amorSetters[item.slot]((before) => [...before, item]);
    });

    const weaponSetters = {
      firstHand: setFirstHandList,
      secondHand: setSecondHandList,
    };
    const weaponItems = items.filter(
      (item) => item.code === "weapon" || item.code === "shield"
    );
    weaponItems.forEach((item) => {
      weaponSetters[item.slot]((before) => [...before, item]);
    });

    const otherItems = items.filter(
      (item) =>
        item.code !== "weapon" &&
        item.code !== "armor" &&
        item.code !== "shield"
    );
    otherItems.forEach((item) => setOthersList((before) => [...before, item]));
  }, []);

  useEffect(() => {
    handleSetGear(
      new Gear(
        head,
        shoulders,
        chest,
        hands,
        legs,
        feet,
        necks,
        rings,
        trinkets,
        firstHand,
        secondHand
      )
    );
  }, [
    head,
    shoulders,
    chest,
    hands,
    legs,
    feet,
    necks,
    rings,
    trinkets,
    firstHand,
    secondHand,
  ]);
  useEffect(() => {
    handleSetInventory(inventory);
  }, [inventory]);

  const onResetLists = () => {
    setHeadList([]);
    setShouldersList([]);
    setChestList([]);
    setHandsList([]);
    setLegsList([]);
    setFeetList([]);
    setNeckList([]);
    setRingList([]);
    setTrinketList([]);
    setFirstHandList([]);
    setSecondHandList([]);
    setOthersList([]);
  };

  const setGearSlot = (e) => {
    if (e.target.value.length === 0) return setters[e.target.id]({});
    const found = lists[e.target.id].find(
      (item) => item._id === e.target.value
    );
    if (found) {
      setters[e.target.id](found);
    }
  };

  const onAddItem = (e) => {
    e.preventDefault();
    if (inventory.length >= 10) {
      setAlert({
        msg: "No puedes tener más de 10 objetos en el inventario",
        type: "error",
      });
      return;
    }
    const [id, max] = e.currentTarget.id.split("-");
    let item = items.find((item) => item._id === id);
    if (item) {
      setInventory((before) => {
        let temp = [...before];
        let haveBeenAdded = false;
        if (!max) {
          for (let itm of temp) {
            if (item._id !== itm._id) continue;
            if (itm.max < itm.quantity + 1) continue;
            const newItem = Item.fromRaw(itm);
            temp = temp.filter((it) => it.inventoryId !== newItem.inventoryId);
            newItem.addQuantity(1);
            temp.push(newItem);
            haveBeenAdded = true;
            break;
          }
        }

        if (!haveBeenAdded) {
          const newItem = Item.fromRaw(item);
          newItem.generateNewTempId();
          if (max) newItem.setMaxQuantity();
          temp.push(newItem);
        }

        return temp;
      });
    }
  };

  const onRemoveItem = (e) => {
    e.preventDefault();
    setInventory((before) => {
      const temp = [
        ...before.filter((item) => item.inventoryId !== e.target.id),
      ];
      return temp;
    });
  };

  const setters = {
    head: setHead,
    shoulders: setShoulders,
    chest: setChest,
    hands: setHands,
    legs: setLegs,
    feet: setFeet,
    necks: setNecks,
    rings: setRings,
    trinkets: setTrinkets,
    firstHand: setFirstHand,
    secondHand: setSecondHand,
  };
  const values = {
    head: head,
    shoulders: shoulders,
    chest: chest,
    hands: hands,
    legs: legs,
    feet: feet,
    necks: necks,
    rings: rings,
    trinkets: trinkets,
    firstHand: firstHand,
    secondHand: secondHand,
  };
  const lists = {
    head: headList,
    shoulders: shouldersList,
    chest: chestList,
    hands: handsList,
    legs: legsList,
    feet: feetList,
    necks: neckList,
    rings: ringList,
    trinkets: trinketList,
    firstHand: firstHandList,
    secondHand: secondHandList,
  };
  return (
    <section className="p-1 mt-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {[
          "head",
          "shoulders",
          "chest",
          "hands",
          "legs",
          "feet",
          "firstHand",
          "secondHand",
        ].map((slot) => (
          <div key={slot} className="flex flex-col md:flex-row items-center">
            <label htmlFor={slot} className="block mb-1 font-semibold w-1/5">
              {_("es", slot)}
            </label>
            <SelectGAC
              customClass={"w-1/2"}
              id={slot}
              value={values[slot]._id}
              onChange={setGearSlot}
            >
              <option value={""}>Sin equipo</option>
              {lists[slot].map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </SelectGAC>
          </div>
        ))}
      </div>
      {/*Quizás añadir en el futuro, por ahora, en fichas recién creadas no tendrán ningún objeto como anillos, collares y abalorios */}
      {/* <ItemsSelection title="Collares" mainItems={neck} setMainItems={setNeck} listItems={neckList} setListItems={setNeckList} />
			<ItemsSelection title="Anillos" mainItems={ring} setMainItems={setRing} listItems={ringList} setListItems={setRingList} />
			<ItemsSelection title="Abalorios" mainItems={trinket} setMainItems={setTrinket} listItems={trinketList} setListItems={setTrinketList} /> */}

      <ItemsSelection
        title="Inventario"
        atUsed={"inventoryId"}
        mainItems={inventory}
        handleOnAdd={onAddItem}
        handleOnRemove={onRemoveItem}
        listItems={othersList}
      />
    </section>
  );
};

GearExtension.propTypes = {
  charGear: PropTypes.object.isRequired,
  charInventory: PropTypes.array.isRequired,
  handleSetGear: PropTypes.func.isRequired,
  handleSetInventory: PropTypes.func.isRequired,
};

export default GearExtension;
