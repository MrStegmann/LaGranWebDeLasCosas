import _ from '../../helpers/Translator';
import PropTypes from 'prop-types';

const SpellInfo = ({ spell }) => {
	if (!spell) return null;

	const { name, category, attribute, talent, description, cost, power, actions, turns, level } = spell;

	return (
		<div className="space-y-6 bg-[#3c291f]/80 p-6 rounded-2xl shadow-lg shadow-black/50 border-2 border-[#5a3b2e] text-[#f0d9b5] w-full max-w-2xl mx-auto">
			<h2 className="text-3xl font-bold text-center border-b border-[#f0d9b5] pb-2">{name}</h2>

			<div className="grid grid-cols-2 gap-4 text-yellow-100 text-sm">
				<p>
					<span className="font-semibold">Categoría:</span> {_('es', category)}
				</p>
				<p>
					<span className="font-semibold">Atributo:</span> {_('es', attribute)}
				</p>
				<p>
					<span className="font-semibold">Talento:</span> {_('es', talent)}
				</p>
				<p>
					<span className="font-semibold">Nivel:</span> {level}
				</p>
				<p>
					<span className="font-semibold">Coste:</span> {cost}
				</p>
				<p>
					<span className="font-semibold">Poder:</span> {power}
				</p>
				<p>
					<span className="font-semibold">Acciones:</span> {actions}
				</p>
				<p>
					<span className="font-semibold">Turnos:</span> {turns}
				</p>
			</div>

			<div>
				<h3 className="font-semibold text-yellow-100 mb-1">Descripción</h3>
				<p className="whitespace-pre-line">{description}</p>
			</div>
		</div>
	);
};

SpellInfo.propTypes = {
	spell: PropTypes.object.isRequired,
};

export default SpellInfo;
