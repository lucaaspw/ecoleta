
function ufState(){
    const ufSelect = document.querySelector('[name=uf]');
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then( states =>{
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
ufState();

document.querySelector('[name=uf]').addEventListener('change', getCities)

function getCities(event){
    const citySelect = document.querySelector('[name=city]');
    const inputState = document.querySelector('[name=state]');
    const ufValue = event.target.value;
    const indexOfState = event.target.selectedIndex
    inputState.value = event.target.options[indexOfState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
    `;
    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true;
 
    fetch(url).then(res => res.json())
    .then( cities => {
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
            citySelect.disabled = false;
    })
}
