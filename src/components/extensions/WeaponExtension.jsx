import { useState, useEffect, useRef } from 'react';
import SelectGAC from '../../framework/SelectGAC';
import atts from '../../../../json/atts.json';
import InputGAC from '../../framework/InputGAC';
import weapons from '../../../../json/weapons.json';
import PropTypes from 'prop-types';

const WeaponExtension = ({ weapon, handleSetWeapon }) => {
	const [talent, setTalent] = useState('thinWeapons');
	const [damage, setDamage] = useState(3);
	const [slot, setSlot] = useState('firstHand');

	const [talentsList, setTalentsList] = useState([]);

	const initialized = useRef(false);

	useEffect(() => {
		if (!initialized.current && weapon?.talent !== undefined) {
			setTalent(weapon.talent);
			setSlot(weapon.slot);
			setDamage(weapon.damage);

			initialized.current = true;
		}
	}, [weapon]);

	useEffect(() => {
		const talents = atts
			.map((at) => {
				let toReturn;
				if (at.code === 'dexterity') {
					toReturn = at.talents;
				}
				if (at.code === 'strength') {
					toReturn = at.talents;
				}

				if (at.code === 'willpower') {
					toReturn = at.talents;
				}
				return toReturn;
			})
			.flat()
			.filter((tal) => tal !== null && tal !== undefined)
			.filter((tal) => ['lrw', 'thinWeapons', 'hlw', 'twoHandsWeapons', 'oneHandWeapons', 'faith', 'elementalConnection', 'chi'].includes(tal.code))
			.concat(
				atts
					.map((at) => {
						let toReturn;
						if (at.code === 'intelligence') {
							toReturn = at.talents;
						}
						return toReturn;
					})
					.flat()
					.filter((tal) => tal !== null && tal !== undefined)
			);

		setTalentsList(talents);
	}, []);

	useEffect(() => {
		const weaponDamage = weapons[talent];
		if (weaponDamage) {
			setDamage(weaponDamage);
		} else {
			setDamage(0);
		}
	}, [talent]);

	useEffect(() => {
		handleSetWeapon({ talent, damage, slot });
	}, [talent, damage, slot]);
	return (
		<section className=" p-4 mt-6 ">
			<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Detalles de Arma</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="talent" className="block mb-1 font-semibold tracking-wide text-[#dbc59a]">
						Talento
					</label>
					<SelectGAC id="talent" value={talent} onChange={(e) => setTalent(e.target.value)}>
						<option value="">Selecciona un talento</option>
						{talentsList.map((tal) => (
							<option key={tal.code} value={tal.code}>
								{tal.label}
							</option>
						))}
					</SelectGAC>
				</div>

				<div>
					<label htmlFor="damage" className="block mb-1 font-semibold tracking-wide text-[#dbc59a]">
						Daño (físico)
					</label>
					<InputGAC id="damage" type="number" value={damage} min={0} onChange={(e) => setDamage(e.target.value)} />
				</div>

				<div>
					<label htmlFor="slotWeapon" className="block mb-1 font-semibold tracking-wide text-[#dbc59a]">
						Mano
					</label>
					<SelectGAC id="slotWeapon" value={slot} onChange={(e) => setSlot(e.target.value)}>
						<option value={'firstHand'}>Mano principal</option>
						<option value={'secondHand'}>Mano secundaria</option>
					</SelectGAC>
				</div>
			</div>
		</section>
	);
};

WeaponExtension.propTypes = {
	weapon: PropTypes.object.isRequired,
	handleSetWeapon: PropTypes.func.isRequired,
};

export default WeaponExtension;
