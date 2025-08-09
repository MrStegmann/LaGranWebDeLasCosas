class Advantage {
	constructor() {
		this.flanking = false; // Indica si el personaje tiene ventaja por flanqueo
		this.behinding = false; // Indica si el personaje tiene ventaja por estar detrás
		this.overFalled = false; // Indica si el personaje tiene la ventaja sobre alguien derribado
		this.theHight = false; // Indica si el personaje tiene la ventaja de la altura
		this.inDarkness = false; // Indica si el personaje está en la oscuridad o con visión reducida
		this.isAmbushing = false; // Indica si el personaje está en una posición de emboscada
		this.opportunityAttack = false; // Indica si el personaje puede realizar un ataque de oportunidad
		this.tactical = false; // Indica si el personaje puede empezar su turno en el orden que quiera
		this.novice = false; // Indica si el personaje tiene el rasgo de aprendiz. Con dicho rasgo, gana un extra de experiencia
		this.lucky = false; //Indica si el jugador se beneficia de suertudo (Si saca critíco, puede volver a tirar un dado para la misma acción de forma gratuita)
	}

	setFlanking(bool) {
		this.flanking = bool;
	}
	setBehinding(bool) {
		this.behinding = bool;
	}
}

export { Advantage };
