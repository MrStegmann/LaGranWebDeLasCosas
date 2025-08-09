import PropTypes from 'prop-types';

const Stage = ({ stage }) => {
	if (!stage) return null;
	return (
		<div className="border rounded-xl p-4 mb-6 bg-white shadow-md">
			<h2 className="text-xl font-semibold mb-2">{stage.name}</h2>
			<p>
				<strong>Descripción:</strong> {stage.description}
			</p>
			<p>
				<strong>Objetivo:</strong> {stage.target}
			</p>
			{stage.cluesHooks.length > 0 && (
				<div className="mt-2">
					<strong>Pistas/Ganchos:</strong>
					<ul className="list-disc list-inside">
						{stage.cluesHooks.map((ch) => (
							<li key={`${ch}-stage-cluesHooks`}>{ch}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

Stage.propTypes = {
	stage: PropTypes.object.isRequired,
};

const OneShotInfo = ({ oneshot }) => {
	if (!oneshot) return;
	return (
		<div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl">
			<h1 className="text-3xl font-bold mb-4">{oneshot.title}</h1>
			<p className="text-gray-700 mb-6">{oneshot.flags}</p>

			<Stage stage={oneshot.intro} />
			<Stage stage={oneshot.knot} />
			<Stage stage={oneshot.conclusion} />
		</div>
	);
};

OneShotInfo.propTypes = {
	oneshot: PropTypes.object.isRequired,
};

export default OneShotInfo;
