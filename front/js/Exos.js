/* 
    Faire un fonction qui prend un objet en entré et qui renvoi un objet avec toute ces vleurs doublé
    L'objet d'entré prendra toujours des Number dans ses clé
    function double(obj);
    Bonus (ici l'objet d'entré change pas)
*/ 

/*
    faire une fonction qui renvoie true si l'array contien que des Number sinon flase
    function isArrayOfNumber(arr);
*/

/* 
    faire une fonction qui trie dans l'ordre décroisant tout les number d'un array
    l'array d'entré contien que des Number
    function sortArrayDesc(arr);
    ici la fonction retourne rien et l'array d'entré change 
    Bonus faire l'exercice sans fonction de trie déjà exsitante et faire la sienne soit même
*/

// function regarder (a,b) {
//     return a*b;
// }
// console.log(regarder(5,4))

/////////// EXO1 //////////////////// CORIGIER PAR JIM

function double(obj) {
    let myNewObj = {};
    for (const property in obj) {
        myNewObj[property] = obj[property] * 2;
    }
    return myNewObj;
}

//////////EXO2///////////////////       
function objets2(tableau){
    var tab =[1,"moineau,",2,"hirondelle",3,"cerf",4,"veau"];

    if (tab.length=='number'){
        console.log(true);
    }
    else (console.log(false));
}
//////////EXO3/////////////////

    function sortArrayDesc() {
        var tableau = [1,3,6,9,13,2,4,8,12];

        for (i = 0; i < tableau.length; i++) {
            var result = tableau.reverse();
        }
        return result;
        
    }



/* Main pas besoin de toucher */
function mainExo1() {
    let flagFaux = false; 
    let myObj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
    }
    let myObj2 = {
        z: 44,
    }
    console.log("Le test 1 avec pour entré obj = ", myObj);
    let result = double(myObj);
    console.log("as pour résultat ", result);
    if (result.a == 2 && result.b == 4 && result.c == 6 && result.d == 8) {
        console.log("test 1 Validé")
    } else {
        console.log("Exo Faux");
        flagFaux = true;
        let shouldBe = {
            a: 2,
            b: 4,
            c: 6,
            d: 8,
        };
        console.log("Le résultat aurais du être", shouldBe);
    }
    console.log("Le test 2 avec pour entré obj = ", myObj2);
    result = double(myObj2);
    console.log("as pour résultat ", result);
    if (result.z == 88) {
        console.log("Test 2 Validé")
    } else {
        flagFaux = true;
        console.log("Exo Faux");
        shouldBe = {
            z: 88,
        };
        console.log("Le résultat aurais du être", shouldBe);
    }
    if (flagFaux) {
        console.log("L'exo EST FAUX ");
    } else {
        console.log("L'exo EST BON ET VALIDER ");
    }
    if (myObj.a == 1 && myObj.b == 2 && myObj.c == 3 && myObj.d == 4) {
        console.log("Bonus Validé l'entré change pas ", myObj)
    } else {
        console.log("Bonus Faux l'entré a été modifié", myObj);
    }
}
// mainExo1();

/* Fin ne pas ecrire en desous*/