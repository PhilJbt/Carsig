var arrFoodList = [
    { category: `Matins`, title: `Flocons d'avoine`, glucides: '61', portion: '70' },
    { category: `Matins`, title: `Flocons de millet`, glucides: '64.5', portion: '70' },

    { category: `Autres`, title: `Miel`, glucides: '83', portion: '12' },
    { category: `Autres`, title: `Sirop d'érable`, glucides: '90', portion: '12' },
    { category: `Autres`, title: `Poudre de cacao cru`, glucides: '25.5', portion: '12' },
    { category: `Autres`, title: `Pain essène`, glucides: '45.1', portion: '83.3' },

    { category: `Féculents`, title: `Pdt Mona Lisa`, glucides: '18', portion: '270' },
    { category: `Féculents`, title: `Pâtes blé`, glucides: '71', portion: '65' },
    { category: `Féculents`, title: `Quinoa`, glucides: '67.5', portion: '60' },
    { category: `Féculents`, title: `Riz`, glucides: '80', portion: '60' },
    { category: `Féculents`, title: `Pâtes maïs`, glucides: '77', portion: '65' },

    { category: `Légumes`, title: `Carotte`, glucides: '15', portion: '125' },
    { category: `Légumes`, title: `Navet violet`, glucides: '4.63', portion: '125' },
    { category: `Légumes`, title: `Radis blanc`, glucides: '5.5', portion: '125' },
];

function fnd(_name) {
    for (let i = 0; i < arrFoodList.length; ++i)
        if (arrFoodList[i].title === _name)
            return arrFoodList[i];
}

function slc(_val) {
    let e = fnd(_val);
    
    if (e !== undefined) {
        const elementString = `<div class="ui segment secondary choix aliment"><div class="alimtitle">${e.title}</div> <div class="ui input"><input class="" type="text" oninput="calc()" value="${e.portion}"/></div></div>`;
        document.querySelector('#calc_list').insertAdjacentHTML("beforeend", elementString);

        calc();
        
        $('.ui.search')
        .search('hide results', function() {
            $('.ui.search').search('set value', '');
        });
    }
}

function calc() {
    let glucides = 0;
    document.querySelectorAll('.choix').forEach((e) => {
        const elem = fnd(e.getElementsByClassName('alimtitle')[0].innerText);
        glucides += (elem.glucides / 100.0) * parseFloat(e.getElementsByTagName('input')[0].value);
        
    });
    document.querySelector('#resultat').innerHTML = `Glucides : ${glucides.toFixed(1)} gr`;
}

document.addEventListener("DOMContentLoaded", function(){
    $('.ui.search')
    .search({
        type: 'category',
        source: arrFoodList,
        onSelect: function (result, response) {
            slc(result.title);
            return false;
        },
    });

    $('#input_select').on('input', function() {
        slc(document.querySelector('#input_select').value);
    });

    $('.ui.search').search('set value', '');
});