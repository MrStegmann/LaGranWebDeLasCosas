import FieldSetGAC from '../../framework/FieldSetGAC';
import PropTypes from 'prop-types';

const ArmorView = ({ armor }) => {
	const { type, slot, pDefense, sDefense, durability, reinforcement, requirements, cons } = armor; // Atributos de armadura
	return (
		<FieldSetGAC title={'Estadísticas de Armadura'}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<p>
					<b>Tipo:</b> {type}
				</p>
				<p>
					<b>Slot:</b> {slot}
				</p>
				<p>
					<b>Defensa Física:</b> {pDefense}
				</p>
				<p>
					<b>Defensa Mágica:</b> {sDefense}
				</p>
				<p>
					<b>Durabilidad:</b> {durability}
				</p>
				<p>
					<b>Refuerzo:</b> {reinforcement ? '' : 'No tiene refuerzo'}
				</p>
			</div>
			{reinforcement && (
				<>
					<ItemInfo item={reinforcement} />
					{(reinforcement.type === 'mail' || reinforcement.type === 'plate') && (type === 'plate' || type === 'mail') && (
						<p className="italic">Esta armadura tiene los requerimientos y penalizadores duplicados</p>
					)}
					{reinforcement.type === 'leather' && (type === 'plate' || type === 'mail') && <p className="italic">Esta armadura tiene los penalizadores duplicados</p>}
				</>
			)}

			<div>
				<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Requerimientos</h3>
				{requirements && Object.entries(requirements).length ? (
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
						{Object.entries(requirements).map(([key, value]) => (
							<li key={key}>
								{key}: {value}
							</li>
						))}
					</ul>
				) : (
					<p>Sin requerimientos de armadura</p>
				)}
			</div>
			<div>
				<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Penalizadores</h3>
				{cons && Object.entries(cons).length ? (
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
						{Object.entries(cons).map(([key, value]) => (
							<li key={key}>
								{key}: {value}
							</li>
						))}
					</ul>
				) : (
					<p>Sin requerimientos de armadura</p>
				)}
			</div>
		</FieldSetGAC>
	);
};
ArmorView.propTypes = {
	armor: PropTypes.object.isRequired,
};

const WeaponView = ({ weapon }) => {
	const { damage, talent, slot } = weapon; // Atributos de arma
	return (
		<FieldSetGAC title={'Detalles de Arma'}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<p>
					<b>Talento:</b> {talent}
				</p>
				<p>
					<b>Daño (físico):</b> {damage}
				</p>
				<p>
					<b>Slot:</b> {slot}
				</p>
			</div>
		</FieldSetGAC>
	);
};
WeaponView.propTypes = {
	weapon: PropTypes.object.isRequired,
};

const ShieldView = ({ shield }) => {
	const { type, slot, pDefense, durability, requirements, cons } = shield; // Atributos de escudo
	return (
		<FieldSetGAC title={'Detalles de Escudo'}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<p>
					<b>Tipo:</b> {type}
				</p>
				<p>
					<b>Slot:</b> {slot}
				</p>
				<p>
					<b>Defensa Física:</b> {pDefense}
				</p>
				<p>
					<b>Durabilidad:</b> {durability}
				</p>
			</div>
			<div className="my-5">
				<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Requerimientos</h3>
				{requirements && Object.entries(requirements).length ? (
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
						{Object.entries(requirements).map(([key, value]) => (
							<li key={key}>
								{key}: {value}
							</li>
						))}
					</ul>
				) : (
					<p>Sin requerimientos</p>
				)}
			</div>
			<div>
				<h3 className="text-[#e0cda9] font-semibold text-lg mb-4 border-b border-[#6f553e] pb-1">Penalizadores</h3>
				{cons && Object.entries(cons).length ? (
					<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc px-5">
						{Object.entries(cons).map(([key, value]) => (
							<li key={key}>
								{key}: {value}
							</li>
						))}
					</ul>
				) : (
					<p>Sin penalizadores</p>
				)}
			</div>
		</FieldSetGAC>
	);
};
ShieldView.propTypes = {
	shield: PropTypes.object.isRequired,
};

const AmmoView = ({ ammo }) => {
	const { material, type, damage } = ammo;
	return (
		<FieldSetGAC title={'Detalles de Munición'}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<p>
					<b>Tipo:</b> {type}
				</p>
				<p>
					<b>Daño (físico):</b> {damage}
				</p>
				<p>
					<b>Material:</b> {material}
				</p>
			</div>
		</FieldSetGAC>
	);
};
AmmoView.propTypes = {
	ammo: PropTypes.object.isRequired,
};

const ItemInfo = ({ item }) => {
	if (!item) return null;
	const { name, description, quality, code, usable, wearable, price, max } = item; //Atributos básicos;

	return (
		<>
			{/* Datos básicos */}
			<FieldSetGAC title={'Información general'}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					<p>
						<b>Nombre:</b> {name}
					</p>
					<p className="md:col-span-2">
						<b>Descripción:</b> {description}
					</p>
					<p>
						<b>Calidad:</b> {quality}
					</p>
					<p>
						<b>Usable:</b> {usable ? 'Sí' : 'No'}
					</p>
					<p>
						<b>Wearable:</b> {wearable ? 'Sí' : 'No'}
					</p>
					<p>
						<b>Precio:</b> {price}
					</p>
					<p>
						<b>Máximo:</b> {max}
					</p>
				</div>
			</FieldSetGAC>

			{/* Armor */}
			{wearable && code === 'armor' && <ArmorView armor={item} />}

			{/* Weapon */}
			{wearable && code === 'weapon' && <WeaponView weapon={item} />}

			{/* Shield */}
			{wearable && code === 'shield' && <ShieldView shield={item} />}

			{/* Ammo */}
			{code === 'ammo' && <AmmoView ammo={item} />}
		</>
	);
};

ItemInfo.propTypes = {
	item: PropTypes.object.isRequired,
};

export default ItemInfo;
