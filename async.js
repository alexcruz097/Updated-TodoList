const submitBTN = document.querySelector(".submitBTN");
const pokemonName = document.querySelector(".pokemon-name");
async function getData(url) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${url}`);
    if (!response.ok) {
      throw new Error("Could not fetch resources");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error("error Fetching Pokemon: ", error));
  }
}

submitBTN.addEventListener("click", (e) => {
  e.preventDefault();
  getData(pokemonName.value.trim().toLowerCase());
  pokemonName.value = "";
});
