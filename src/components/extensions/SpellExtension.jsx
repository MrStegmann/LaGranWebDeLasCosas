import { useState, useEffect, useRef } from 'react';
import useSaS from '../../context/SaSContext';
import SpellsSelection from '../SpellsSelection';
import PropTypes from 'prop-types';

const SpellExtension = ({ charSpells, handleSetSpells }) => {
	const { spells: spellList, Spell } = useSaS();
	const [spells, setSpells] = useState([]);

	const initialized = useRef(false);

	useEffect(() => {
		if (!initialized.current && charSpells.length > 0) {
			setSpells(charSpells.map(Spell.fromRaw));

			initialized.current = true;
		}
	}, [charSpells]);

	const handleAddSpell = (e) => {
		e.preventDefault();
		const found = spellList.find((spell) => spell._id === e.target.id);
		if (found) setSpells((before) => [...before, found]);
	};

	const handleRemoveSpell = (e) => {
		e.preventDefault();
		setSpells((before) => [...before.filter((spell) => spell._id !== e.target.id)]);
	};

	useEffect(() => {
		handleSetSpells(spells);
	}, [spells]);
	return (
		<section className="p-1 mt-6">
			<SpellsSelection mainSpells={spells} handleOnAdd={handleAddSpell} handleOnRemove={handleRemoveSpell} spellList={spellList} />
		</section>
	);
};

SpellExtension.propTypes = {
	charSpells: PropTypes.array.isRequired,
	handleSetSpells: PropTypes.func.isRequired,
};

export default SpellExtension;
