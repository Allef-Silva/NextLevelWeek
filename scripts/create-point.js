function populateUFs(){
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json() )
    .then(states => {

        for(const state of states){
            ufselect.innerHTML+=`<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res =>  res.json() )
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled=false

    } )
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change",getCities)

// ITENS DE COLETA 

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

const alreadySelected = selectedItems.findIndex(item =>{
    const itemFound = item == itemId //TRUE OR FALSE HERE
    return itemFound
})
if(alreadySelected >= 0){ //VERIFY SELECTION
    const filteredItems = selectedItems.filter(item => {
        const itemIsDifferent = item != itemId
        return false //HAS TO BE REMOVED OF THE ARRAY
    })

    selectedItems = filteredItems
} else{ 
    selectedItems.push(itemId)
}

collectedItems.value = selectedItems


function handleSelectedItem(event){
    const itemLi = event.target
    const itemId = itemLi.dataset.id

    
    
    itemLi.classList.toggle("selected")
}