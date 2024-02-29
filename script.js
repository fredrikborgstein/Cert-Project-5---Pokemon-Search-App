const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const specificPokemonAPI =
  "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const elements = document.querySelector(".elements-box");
const elementHeader = document.querySelector(".elements-header");

// All the elements I need to change in the DOM

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonImage = document.getElementById("sprite");

// Removing the display of the grid of elements
elements.style.display = "none";

// Grabbing the search input, and fetching the data

const grabSpecificPokemon = async (pokeName) => {
  try {
    const lowerName = pokeName.toLowerCase();
    const spesRes = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${lowerName}`
    );
    const spesData = await spesRes.json();
    console.log(spesData); // logging the response

    const { id, height, name, sprites, stats, types, weight } = spesData;
    const { front_default } = sprites;
    const getPokemonTypes = () => {
      const typesArray = [];
      for (let i = 0; i < types.length; i++) {
        if (types[i] && types[i].type) {
          const { name } = types[i].type;
          typesArray.push(name);
          pokemonTypes.innerHTML += `<element id="${name}">${name}</element>`;
        }
      }
    };

    const getPokemonStats = () => {
      const statsObj = {};
      for (let i = 0; i < stats.length; i++) {
        if (stats[i] && stats[i].stat) {
          const { base_stat } = stats[i];
          const { name } = stats[i].stat;
          statsObj[name] = base_stat;
        }
      }
      console.log(statsObj);
      return statsObj;
    };

    if (spesData) {
      pokemonImage.src = front_default;
      pokemonName.textContent = name;
      pokemonId.textContent = id;
      pokemonWeight.textContent = weight;
      pokemonHeight.textContent = height;
      elements.style.display = "grid";
      const typesArray = getPokemonTypes();
      const statsObj = getPokemonStats();
      pokemonHp.textContent = statsObj.hp;
      pokemonSpeed.textContent = statsObj.speed;
      pokemonAttack.textContent = statsObj.attack;
      pokemonDefense.textContent = statsObj.defense;
      pokemonSpecialAttack.textContent = statsObj["special-attack"];
      pokemonSpecialDefense.textContent = statsObj["special-defense"];
    }
  } catch (err) {
    alert("Pokémon not found");
    elements.style.display = "none";
    searchInput.value = "";
  }
};

// Clearing elements between searches

const updateUi = () => {
  elements.style.display = "none";
  searchInput.value = "";
  pokemonTypes.innerHTML = "";
  pokemonImage.src = "";
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  pokemonWeight.textContent = "";
  pokemonHeight.textContent = "";
  pokemonHp.textContent = "";
  pokemonSpeed.textContent = "";
  pokemonAttack.textContent = "";
  pokemonDefense.textContent = "";
  pokemonSpecialAttack.textContent = "";
  pokemonSpecialDefense.textContent = "";
};

searchBtn.addEventListener("click", () => {
  const inputValue = searchInput.value;
  grabSpecificPokemon(inputValue);
  updateUi();
});

searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    const inputValue = searchInput.value;
    grabSpecificPokemon(inputValue);
    updateUi();
  }
});
