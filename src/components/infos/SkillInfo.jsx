import _ from '../../helpers/Translator';
import PropTypes from 'prop-types';

const SkillInfo = ({ skill }) => {
	if (!skill) return null;

	return (
		<div className="space-y-6 bg-[#3c291f]/80 p-6 rounded-2xl shadow-lg shadow-black/50 border-2 border-[#5a3b2e] text-[#f0d9b5] w-full max-w-2xl mx-auto">
			<h2 className="text-3xl font-bold text-center border-b border-[#f0d9b5] pb-2">{skill.name}</h2>

			<div className="space-y-2">
				<p className="italic text-yellow-100 text-center">
					Tipo: <span className="capitalize">{_('es', skill.type)}</span>
				</p>

				<p className="whitespace-pre-line">{skill.description}</p>

				<div className="grid grid-cols-2 gap-4 mt-4">
					<div>
						<span className="font-semibold">Acciones:</span> {skill.actions}
					</div>
					<div>
						<span className="font-semibold">Turnos:</span> {skill.turns}
					</div>
				</div>
			</div>
		</div>
	);
};

SkillInfo.propTypes = {
	skill: PropTypes.object.isRequired,
};

export default SkillInfo;
