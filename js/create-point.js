
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

// Items de coleta
// Pegando todos os items de coleta

const items = document.querySelectorAll('.itens li');

for(const item of items){
    item.addEventListener('click', selectedItem)
}
const itemsCollected = document.querySelector('[name=items]')
let itemsSelected = []

function selectedItem(event){
    const itemLi = event.target;
    // Adicionar ou remover classes com javascript
    itemLi.classList.toggle('active');

    const itemId = itemLi.dataset.id

    // Verificar se existe algum item selecionado
    // Se sim, pegar os itens selecionados
    const alreadySelected = itemsSelected.findIndex(function(item){
        const itemFound = item == itemId; //Isso retornará true ou false
        return itemFound;
    })

    //Não deixar que o item se repita
    if(alreadySelected >= 0){
        //tirar-lo da seleção
        const filteredItems = itemsSelected.filter(function(item){
            const itemsIsDifferent = item != itemId; // item falso
            return itemsIsDifferent;
        })
        itemsSelected = filteredItems;
    }else{
        //Se não estiver selecionado, adicionar na seleção
        itemsSelected.push(itemId);
    }

   console.log(itemsSelected); 
    // Atualizar o campo escondido com os itens selecionados

    itemsCollected.value = itemsSelected;
}