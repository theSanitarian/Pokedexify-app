// sortiranje po abecedi
function sortByAlpha(pokemonList) {
    pokemonList.sort( (a,b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
    
        if (nameA < nameB){
            return -1
        }
        if (nameA > nameB){
            return 1
        }
        return 0
    })
    return pokemonList
}

//sortiranje po rednom broju
function sortByNumber(pokemonList) {
    pokemonList.sort( (a,b) => {
        if (a.id<b.id){
            return -1
        }
        return 1
    })
    return pokemonList
}

//sortiranje po tipu
function sortByType(pokemonList) {
    pokemonList.sort( (a,b) => {
        const nameA = a.types[0].type.name
        const nameB = b.types[0].type.name
    
        if (nameA < nameB){
            return -1
        }
        if (nameA > nameB){
            return 1
        }
        return 0
    })
    return pokemonList
}

//search bar
function search(pokemonList, content) {
    const newList = pokemonList.filter((pokemon)=>{
        if (pokemon.species.name.startsWith(content.toLowerCase())){
            return pokemon
        }
        else{
            return null
        }
    })
    return newList
}