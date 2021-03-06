//Get broad url for actual data extraction
const baseURL = "https://pokeapi.co/api/v2/pokemon/";

const fullUrl = window.location.href;

//Gets just what is after the question mark
const urlParams = fullUrl.split("?")[1];
const pokId = urlParams.split("=")[1];

const urlID = `https://pokeapi.co/api/v2/pokemon/${pokId}/`;

// create urls for the next and previous buttons
const prevPage = parseInt(pokId) - 1
const nextPage = parseInt(pokId) + 1
const urlNext = fullUrl.replace(/(?<=id=)[0-9]*/, nextPage);
const urlPrevious = fullUrl.replace(/(?<=id=)[0-9]*/, prevPage);


const urlPokemons = "https://pokeapi.co/api/v2/pokemon/";
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const pokeSprite = document.getElementById("pokeSprite");
const pokeID = document.getElementById("idNo");
const pokeName = document.getElementById("pokeName");
const pokeType1 = document.getElementById("type1");
const pokeType2 = document.getElementById("type2");
const pokeDescription = document.getElementById("description");


////////////////////////////////////////////////////////////////////////////////
window
	.fetch(urlID)
	//Fetch the url of the pokemon
	.then(response => {
		return response.json();
	})

	.then(data => {
		// console.log(data);

		//So, rather than just logging this data, why don't we use it to define some variables
		let pokemonID = data.id;
		let pokemonName = data.name;
		//Use that trick Jay showed you for if the pokemon has more than a single 'type'
		let pokemonPrimaryType = data.types[0].type.name;
		let pokemonSecondaryType = "";
		//test to see if there is more than a single type attribute for the pokemon
		let pokemonSprite = data.sprites.front_default;

		console.log(pokemonSprite);
		if (data.types.length === 2) {
			pokemonSecondaryType = data.types[1].type.name;
		} else {
			pokemonSecondaryType = "";
		}

		//Another time :<
		previous.href = urlPrevious
		next.href = urlNext;
		pokeSprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`;
		pokeID.innerHTML = `No. ${pokemonID}`;
		pokeName.innerHTML = pokemonName;
		pokeType1.innerHTML = pokemonPrimaryType;
		pokeType2.innerHTML = pokemonSecondaryType;

		let pokemonFlavorURL = data.species.url;

		window
			.fetch(pokemonFlavorURL)
			.then(response2 => {
				return response2.json();
			})
			.then(data2 => {
				let flavorTextArray = data2.flavor_text_entries;
				// console.log(flavorTextArray)
				//evaulate for which entries are in english, because that's all I can personally read
				for (object of flavorTextArray) {
					let language = object.language.name;
					if (language === "en") {
						console.log(object.flavor_text);
						pokeDescription.innerHTML = object.flavor_text;
						//break away once I find one, or I will get so many
						break;
					}
				}
			});
	});
