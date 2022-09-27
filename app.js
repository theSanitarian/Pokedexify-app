
//state za pokemone
function usePokemonState() {
    let _stateAll = null
    let _stateFiltered = null

    function getStateAll() {
        return _stateAll
    }

    function setStateAll(data) {
        _stateAll = [...data]
    }

    function getStateFiltered() {
        return _stateFiltered
    }

    function setStateFiltered(data) {
        _stateFiltered = [...data]
    }

    return [getStateAll, setStateAll, getStateFiltered, setStateFiltered]
}

//random number generator: 1 - 898
function randomNumberGenerator (array) {
    while (true){
        const num = Math.floor(Math.random() * 897 + 1)
        if (!array.includes(num)){
            array.push(num)
            break
        }
    }
}

//fetch i zamjena broja za pokemona
async function getPokemon(arrayNum) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${arrayNum}`)
    const pokemon = await response.json()
    return pokemon
}

//generiranje liste pokemona
const generatePokemon = async () => {
    let pokemonList = []

    for(let i=0; i<30; i++){
        randomNumberGenerator(pokemonList)
    }
    setStateAll(pokemonList)

    for(const arrayNum in pokemonList){
        const pokemon = await getPokemon(pokemonList[arrayNum])
        pokemonList.splice(arrayNum,1,pokemon)
    }
    setStateAll(pokemonList)
}

//prikazivanje kartica pokemona
const displayPokemon = function () {
    const displayDiv = document.querySelector('.pokemon')
    const pokemonList = getStateFiltered()
    pokemonList.forEach((pokemon) => {
        const card = document.createElement('div')
        card.innerHTML=(`
            <div class="card">
                <div class="card-element" >${pokemon.species.name}</div>
                <a href="https://www.pokemon.com/us/pokedex/${pokemon.species.name}">
                    <img class="card-element" src="${pokemon.sprites.front_default}">
                </a>
                <div class="pokemon-description">
                    <div class="description-1">
                        <div>HP: ${pokemon.stats[0].base_stat}</div>
                        <div>ATK: ${pokemon.stats[1].base_stat}</div>
                        <div>DEF: ${pokemon.stats[2].base_stat}</div>
                    </div>
                    <div class="description-2">
                        <div>SPD: ${pokemon.stats[5].base_stat}</div>
                        <div>Type: ${pokemon.types[0].type.name}</div>
                        <div>No. ${pokemon.id}</div>
                    </div>
                </div>
            </div>
        `)
        displayDiv.appendChild(card)
    })
}

const [getStateAll, setStateAll, getStateFiltered, setStateFiltered] = usePokemonState()
const resetButton = document.querySelector('.pokemon-reset')
const sortByAlphaButton = document.querySelector('.sort-by-alpha')
const sortByNumberButton = document.querySelector('.sort-by-number')
const sortByTypeButton = document.querySelector('.sort-by-type')
const searchBar = document.querySelector('.pokemon-search')
const displayDiv = document.querySelector('.pokemon')

async function initialLoad() {
    await generatePokemon()
    setStateFiltered(getStateAll())
    displayDiv.innerHTML = ""
    displayPokemon()
}

initialLoad()

resetButton.addEventListener('click', async ()=>{
    document.querySelector('.pokemon').innerHTML = `<div class="lds-dual-ring"></div>`
    await initialLoad()
})

sortByAlphaButton.addEventListener('click', ()=>{
    document.querySelector('.pokemon').innerHTML = ""
    sortByAlpha(getStateFiltered())
    console.log(getStateFiltered());
    displayPokemon()
})

sortByNumberButton.addEventListener('click', ()=>{
    document.querySelector('.pokemon').innerHTML = ""
    sortByNumber(getStateFiltered())
    console.log(getStateFiltered());
    displayPokemon()
})

sortByTypeButton.addEventListener('click', ()=>{
    document.querySelector('.pokemon').innerHTML = ""
    sortByType(getStateFiltered())
    console.log(getStateFiltered());
    displayPokemon()
})

searchBar.addEventListener('input', (e)=>{
    document.querySelector('.pokemon').innerHTML = ""
    setStateFiltered(search(getStateAll(), e.target.value))
    displayPokemon()
})