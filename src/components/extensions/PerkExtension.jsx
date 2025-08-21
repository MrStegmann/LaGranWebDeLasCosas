import { useEffect, useRef, useState } from "react";
import InputGAC from "../../framework/InputGAC";
import _ from "../../helpers/Translator";
import PerkLevelExtension from "./PerkLevelExtension";
import PropTypes from "prop-types";

const PerkExtension = ({ charPerks, handleSetPerks }) => {
  const [searchPosAdded, setSearchPosAdded] = useState("");
  const [searchPosList, setSearchPosList] = useState("");
  const [searchNegAdded, setSearchNegAdded] = useState("");
  const [searchNegList, setSearchNegList] = useState("");
  const [perks, setPerks] = useState([]);

  const initialized = useRef(false);

  // useEffect(() => {
  // 	if (!initialized.current && charPerks.length > 0) {
  // 		setPerks(charPerks.map(Perk.fromRaw));

  // 		initialized.current = true;
  // 	}
  // }, [charPerks]);

  useEffect(() => {
    handleSetPerks([...perks]);
  }, [perks]);

  const handleAddPerk = (e) => {
    // e.preventDefault();
    // const [perkId, perkLvl] = e.target.id.split('-');
    // const perk = perksList.find((perk) => perk.id === perkId);
    // if (!perk) return;
    // const newPerk = Perk.fromRaw({ ...perk, level: Number(perkLvl) });
    // setPerks((before) => [...before, newPerk]);
  };

  const handleRemovePerk = (e) => {
    e.preventDefault();

    setPerks((before) => [...before.filter((perk) => perk.id !== e.target.id)]);
  };

  return (
    <section className="p-4 mt-6">
      <div className="flex flex-col">
        <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">
          Rasgos positivos
        </h3>
        <div className="w-full">
          <div className="w-full border-b-2 pb-5">
            <h3 className="underline font-black">Elegidos</h3>

            <InputGAC
              id="searchPosAdded"
              customClass={"w-full"}
              type="search"
              placeholder="Buscar rasgo por nombre..."
              value={searchPosAdded}
              onChange={(e) => setSearchPosAdded(e.target.value)}
            />

            <ul
              id="charPosPerkList"
              className="w-full mt-5 space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]"
            >
              {perks
                .filter((perk) => perk.type === "positive")
                .filter((perk) =>
                  perk.name.toLowerCase().includes(searchPosAdded.toLowerCase())
                ).length > 0 ? (
                perks
                  .filter((perk) => perk.type === "positive")
                  .filter((perk) =>
                    perk.name
                      .toLowerCase()
                      .includes(searchPosAdded.toLowerCase())
                  )
                  .map((perk) => (
                    <li
                      key={`${perk.id}-${perk.type}-added`}
                      className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200"
                    >
                      <div className="flex flex-row justify-between mb-2">
                        <p className="text-base font-semibold text-yellow-100">
                          {perk.name}
                        </p>
                        <p className="font-normal text-gray-300 capitalize">
                          {_("es", perk.type)}
                        </p>
                      </div>
                      <p>{perk.description}</p>
                      <div className="flex flex-row justify-between mt-2">
                        {perk.levelOne && perk.level === 1 && (
                          <PerkLevelExtension
                            perkLevel={perk.levelOne}
                            type={perk.type}
                          />
                        )}

                        {perk.levelTwo && perk.level === 2 && (
                          <PerkLevelExtension
                            perkLevel={perk.levelTwo}
                            type={perk.type}
                          />
                        )}

                        {perk.levelThree && perk.level === 3 && (
                          <PerkLevelExtension
                            perkLevel={perk.levelThree}
                            type={perk.type}
                          />
                        )}
                      </div>
                      <button
                        id={perk.id}
                        className="mt-2 text-red-500 hover:text-red-400 hover:cursor-pointer hover:underline"
                        onClick={handleRemovePerk}
                      >
                        Quitar
                      </button>
                    </li>
                  ))
              ) : (
                <p className="text-sm text-center text-yellow-200 italic">
                  No se han encontrado Rasgos positivos
                </p>
              )}
            </ul>
          </div>

          <div className="mt-5">
            <h3 className="underline font-black">Disponibles</h3>
            <InputGAC
              id="searchPosList"
              customClass={"w-full"}
              type="search"
              placeholder="Buscar rasgo por nombre..."
              value={searchPosList}
              onChange={(e) => setSearchPosList(e.target.value)}
            />
            <ul
              id="posPerkList"
              className="w-full mt-5 space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]"
            >
              {perksList
                .filter((perk) => perk.type === "positive")
                .filter((perk) => !perks.find((pe) => perk.id === pe.id))
                .filter((perk) =>
                  perk.name.toLowerCase().includes(searchPosList.toLowerCase())
                ).length > 0 ? (
                perksList
                  .filter((perk) => perk.type === "positive")
                  .filter((perk) => !perks.find((pe) => perk.id === pe.id))
                  .filter((perk) =>
                    perk.name
                      .toLowerCase()
                      .includes(searchPosList.toLowerCase())
                  )
                  .map((perk) => (
                    <li
                      key={`${perk.id}-${perk.type}-list`}
                      id={perk.id}
                      className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200"
                    >
                      {perk.id}
                      <div className="flex flex-row justify-between mb-2">
                        <p className="text-base font-semibold text-yellow-100">
                          {perk.name}
                        </p>
                        <p className="font-normal text-gray-300 capitalize">
                          {_("es", perk.type)}
                        </p>
                      </div>
                      <p>{perk.description}</p>
                      <div className="flex flex-row justify-between mt-2">
                        {perk.levelOne && (
                          <div className="min-w-1/3 p-2 flex flex-col">
                            <p className="underline font-black">Nivel 1</p>
                            <PerkLevelExtension
                              perkLevel={perk.levelOne}
                              type={perk.type}
                            />
                            <button
                              id={`${perk.id}-1`}
                              className="mt-2 text-sm text-green-500 hover:text-green-400 hover:cursor-pointer hover:underline"
                              onClick={handleAddPerk}
                            >
                              Añadir nivel 1
                            </button>
                          </div>
                        )}

                        {perk.levelTwo && (
                          <div className="min-w-1/3 p-2 flex flex-col">
                            <p className="underline font-black">Nivel 2</p>
                            <PerkLevelExtension
                              perkLevel={perk.levelTwo}
                              type={perk.type}
                            />
                            <button
                              id={`${perk.id}-2`}
                              className="mt-2 text-sm text-green-500 hover:text-green-400 hover:cursor-pointer hover:underline"
                              onClick={handleAddPerk}
                            >
                              Añadir nivel 2
                            </button>
                          </div>
                        )}
                        {perk.levelThree && (
                          <div className="min-w-1/3 p-2 flex flex-col">
                            <p className="underline font-black">Nivel 3</p>
                            <PerkLevelExtension
                              perkLevel={perk.levelThree}
                              type={perk.type}
                            />
                            <button
                              id={`${perk.id}-3`}
                              className="mt-2 text-sm text-green-500 hover:text-green-400 hover:cursor-pointer hover:underline"
                              onClick={handleAddPerk}
                            >
                              Añadir nivel 3
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))
              ) : (
                <p className="text-sm text-center text-yellow-200 italic">
                  No se han encontrado Rasgos positivos
                </p>
              )}
            </ul>
          </div>
        </div>
        <h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1 mt-8">
          Rasgos Negativos
        </h3>
        <div>
          <div className="border-b-2 pb-5">
            <h3 className="underline font-black">Elegidos</h3>
            <InputGAC
              id="searchNegAdded"
              customClass={"w-full"}
              type="search"
              placeholder="Buscar rasgo por nombre..."
              value={searchNegAdded}
              onChange={(e) => setSearchNegAdded(e.target.value)}
            />
            <ul
              id="charPosPerkList"
              className="w-full mt-5 space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]"
            >
              {perks
                .filter((perk) => perk.type === "negative")
                .filter((perk) =>
                  perk.name.toLowerCase().includes(searchNegAdded.toLowerCase())
                ).length > 0 ? (
                perks
                  .filter((perk) => perk.type === "negative")
                  .filter((perk) =>
                    perk.name
                      .toLowerCase()
                      .includes(searchNegAdded.toLowerCase())
                  )
                  .map((perk) => (
                    <li
                      key={`${perk.id}-${perk.type}-added`}
                      className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200"
                    >
                      <div className="flex flex-row justify-between mb-2">
                        <p className="text-base font-semibold text-yellow-100">
                          {perk.name}
                        </p>
                        <p className="font-normal text-gray-300 capitalize">
                          {_("es", perk.type)}
                        </p>
                      </div>
                      <p>{perk.description}</p>
                      <div className="flex flex-row justify-between mt-2">
                        {perk.levelOne && (
                          <PerkLevelExtension
                            perkLevel={perk.levelOne}
                            type={perk.type}
                          />
                        )}
                      </div>
                      <button
                        id={perk.id}
                        className="mt-2 text-red-500 hover:text-red-400 hover:cursor-pointer hover:underline"
                        onClick={handleRemovePerk}
                      >
                        Quitar
                      </button>
                    </li>
                  ))
              ) : (
                <p className="text-sm text-center text-yellow-200 italic">
                  No se han encontrado Rasgos negativos
                </p>
              )}
            </ul>
          </div>

          <div className="mt-5">
            <h3 className="underline font-black">Disponibles</h3>
            <InputGAC
              id="searchNegList"
              type="search"
              placeholder="Buscar rasgo por nombre..."
              value={searchNegList}
              onChange={(e) => setSearchNegList(e.target.value)}
            />
            <ul
              id="posPerkList"
              className="w-full mt-5 space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#7b5a3c] scrollbar-track-[#2f1f17]"
            >
              {perksList
                .filter((perk) => perk.type === "negative")
                .filter((perk) => !perks.find((pe) => perk.id === pe.id))
                .filter((perk) =>
                  perk.name.toLowerCase().includes(searchNegList.toLowerCase())
                ).length > 0 ? (
                perksList
                  .filter((perk) => perk.type === "negative")
                  .filter((perk) => !perks.find((pe) => perk.id === pe.id))
                  .filter((perk) =>
                    perk.name
                      .toLowerCase()
                      .includes(searchNegList.toLowerCase())
                  )
                  .map((perk) => (
                    <li
                      key={`${perk.id}-${perk.type}-list`}
                      id={perk.id}
                      className="bg-[#2a1c16] border border-[#4a342a] rounded-xl px-4 py-3 cursor-pointer hover:ring-2 hover:ring-yellow-400 transition duration-200"
                    >
                      <div className="flex flex-row justify-between mb-2">
                        <p className="text-base font-semibold text-yellow-100">
                          {perk.name}
                        </p>
                        <p className="font-normal text-gray-300 capitalize">
                          {_("es", perk.type)}
                        </p>
                      </div>
                      <p>{perk.description}</p>
                      <div className="flex flex-row justify-between mt-2">
                        {perk.levelOne && (
                          <PerkLevelExtension
                            perkLevel={perk.levelOne}
                            type={perk.type}
                          />
                        )}
                      </div>
                      <button
                        id={perk.id}
                        className="mt-2 text-green-500 hover:text-green-400 hover:cursor-pointer hover:underline"
                        onClick={handleAddPerk}
                      >
                        Añadir
                      </button>
                    </li>
                  ))
              ) : (
                <p className="text-sm text-center text-yellow-200 italic">
                  No se han encontrado Rasgos negativos
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

PerkExtension.propTypes = {
  charPerks: PropTypes.array.isRequired,
  handleSetPerks: PropTypes.func.isRequired,
};

export default PerkExtension;
