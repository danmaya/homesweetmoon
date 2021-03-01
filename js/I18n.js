class I18n 
{
	/**
	* El mètode static print() retorna la traducció d'un text sense haver d'instanciar la classe.
	* Si no existeix l'idioma desitjat, agafarà el català per defecte.
	* Es podria controlar què passa si no existeix l'entrada de la clau al nostre diccionari.
	* JavaScript, per defecte, si no troba quelcom retorna el tipus de dada 'undefined', per tant
	* quan algun text no existeixi, veurem 'undefined' per pantalla i ja sabrem què passa.
	*
	* @param key: clau per buscar en el diccionari d'entrades.
	* @param lang: navigator.userLanguage for IE, navigator.language for others
	*
	* @return txt: valor de la clau (key)
	*/
	static print(key, lang  = navigator.language || navigator.userLanguage)
	{
		var dictionary = dictionary();
		
		if (dictionary[lang]) {
			return dictionary[lang][key];
		} else {
			return dictionary["en"][key];
		}
		
		// Aquesta funció només em retorna el diccionari creat. Ho posoen una funció en comptes de fer
		// servir una variable per aïllar una mica la funcionalitat del mètode print().
		// Com que és un mètode 'static' no puc posar les variables fora d'aquest mètode perquè sinó
		// no hipodria accedir.
		function dictionary()
		{
			var dictionary = {
				ca: {
					load1: "Una transmissió del enginyer Isaac",
					load2: "ens explica que ell, el seu company robot Raybury,",
					load3: "i el viatger Cassius han aterrat a la lluna",
					load4: "només per trobar-se en greu perill.",
					load5: "Basat en la intel·ligència que va proporcionar,",
					load6: "aviat es posarà en marxa una operació de rescat.",
					load7: "Tingues en compte que l’Enemic també podria suposar una amenaça.",
					load8: "S'ha confirmat que han estat en moviment",
					load9: "últimament, i podrien estar planejant sabotejar",
					load10: "l'operació d'una manera o altra.",
					load11: "Procedeix amb la màxima precaució",
					load12: "mentre realitzis la teva missió.",
					load13: "Prem ENTER",
					load14: "per començar el teu",
					load15: "viatge a la lluna",
					load16: "Score",
					load17: "Lives",
					load18: "Victory",
					load19: "Game Over",
					error_context: "Error. El context no s'ha inicialitzat."
				},
				es: {
					load1: "Una transmisión del ingeniero Isaac",
					load2: "nos dice que él, su compañero robot Raybury,",
					load3: "y el viajero Cassius han aterrizado en la luna",
					load4: "solo para encontrarse en grave peligro.",
					load5: "Basado en la inteligencia proporcionada,",
					load6: "pronto se llevará a cabo una operación de rescate.",
					load7: "Ten en cuenta que el Enemigo también podría representar una amenaza.",
					load8: "Se ha confirmado que han estado en movimiento",
					load9: "últimamente, y podrían estar planeando sabotear",
					load10: "la operación de una manera u otra.",
					load11: "Procede con la máxima precaución",
					load12: "mientras llevas a cabo tu misión.",
					load13: "Pulsa INTRO",
					load14: "para empezar tu",
					load15: "viaje a la luna",
					load16: "Score",
					load17: "Lives",
					load18: "Victory",
					load19: "Game Over",
					error_context: "Error. El contexto no ha sido inicializado."
				},
				en: {
					load1: "A transmission from the engineer Isaac",
					load2: "tells us that he, his robot companion Raybury,",
					load3: "and the traveler Cassius have landed on the moon",
					load4: "only to find themselves in grave danger.",
					load5: "Based on the intelligence he provided,",
					load6: "a rescue operation is soon to be underway.",
					load7: "Note that the Foe may also pose a threat.",
					load8: "They've been confirmed to be on the move as of",
					load9: "late, and may be plotting to sabotage the",
					load10: "operation in one way or another.",
					load11: "Proceed with utmost caution",
					load12: "as you carry out your mission.",
					load13: "Press ENTER",
					load14: "to begin your",
					load15: "journey to the moon",
					load16: "Score",
					load17: "Lives",
					load18: "Victory",
					load19: "Game Over",
					error_context: "Error. The context has not been initialized."
				}
			};
			
			return dictionary;
		}
	}
}