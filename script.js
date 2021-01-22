
const IndividualProperty = ["H.DEV","W.DEV","RACE","OCC","OPE","CON","EXT","AGR","NEU"];
const Race = ["Human","Elf","Dwarf","Giant","Dragon","Vampire","Angel","Devil","Fairy","Golem","Android","Slime","Ogre","Vegetative","Animal","Insect","Dragonewt","Sith","Therian.","Lich"];
const Occ = ["Wanderer","Bard","Adventurer","Shepherd","Hermit",
             "Fighter","Sorcerer","Ranger","Priest",
             "Assassin","Prophet","Gunner","Wise",
             "Warlord","Caster","Seeker","Oracle",
             "Trainer","Doctor","Engineer","Missionary",
             "Necromancer","Summoner","Tamer","Exorcist",
             "Pedlar","Pharmacist","Alchemist","Scientist",
             "Blacksmith","Enhancer","Astrologist","Bakery"];
const GeneralProperty = ["STR","DEF","DEX","PIE",
                         "VIT","MIND","AGI","INT",
                         "P.RE","M.RE",
                         "LUCK","PER",
                         "CHR","KAR"];
const ElementProperty = ["IGN.E","IGN.P",
                         "GEL.E","GEL.P",
                         "TON.E","TON.P",
                         "TER.E","TER.P",
                         "EQU","STA"];

const rank = ["E","D","C","B","A","S"];
const aIndividual = [];
const aGeneral = [];
const aElement = [];
const IP = IndividualProperty.length;
const GP = GeneralProperty.length;
const EP = ElementProperty.length;

const _ie = document.getElementById("ie");
const _ies = document.getElementById("ies");
const _iev = document.getElementById("iev");
const _ce = document.getElementById("ce");
const _ces = document.getElementById("ces");
const _cev = document.getElementById("cev");
const _ee = document.getElementById("ee");
const _ees = document.getElementById("ees");
const _eev = document.getElementById("eev");

let LAn = [0,0];
let Ln = 0;

async function go(){
    Race.forEach(function(value){
        LAn[0] = LAn[0]<value.length?value.length:LAn[0];
    });
    Occ.forEach(function(value){
        LAn[1] = LAn[1]<value.length?value.length:LAn[1];
    });
    LAn.forEach(function(value){
        Ln = Ln<value?value:Ln;
    });
}
function rNorm(){//https://stabucky.com/wp/archives/9263 参考
    let s = 0;
    for(let i = 0; i < 12; i++){
        s += Math.random();
    }
    return s-6;
}
function generate(){
    let m = "";
    let n = "";
    let t;
    //Individual
    for(let i = 0; i < IP; i++){
        switch(i){
            case 0:
            case 1: {
                aIndividual[i] = (Math.round(rNorm()*120)/100).toFixed(2);
                break;
            }
            case 2: {
                aIndividual[i] = Race[Math.round(Math.random()*(Race.length-1))].padStart(Ln, " ");
                break;
            }
            case 3: {
                aIndividual[i] = Occ[Math.round(Math.random()*(Occ.length-1))].padStart(Ln, " ");
                break;
            }
            default: {
                let j = Math.floor(Math.random()*200-100);
                aIndividual[i] = (j==100)?99:((j==-100)?-99:j);
                break;
            }
        }  
    }
    for(let i = 0; i < IP; i++){
        m = m + IndividualProperty[i] + ": " + "<br>";
        n = n + aIndividual[i] + "<br>";
    }
    _ies.innerHTML = m;
    _iev.innerHTML = n;
    m = "", n = "";
    //General
    for(let i = 0; i < GP; i++){
        aGeneral[i] = Math.floor(Math.random()*100);
    }
    for(let i = 0; i < GP; i++){
        t = Math.floor(aGeneral[i]/(100/rank.length));
        m = m + GeneralProperty[i] + ": " + "<br>";
        n = n + (aGeneral[i]<10 ? " " : "") + aGeneral[i] + " - " + rank[i!=13 ? t : rank.length-1-t] + "<br>";
        
    }
    _ces.innerHTML = m;
    _cev.innerHTML = n;
    m = "", n = "";
    //Element
    for(let i = 0; i < EP; i++){
        aElement[i] = Math.floor(Math.random()*100);
    }
    for(let i = 0; i < EP; i++){
        m = m + ElementProperty[i] + ": " + "<br>";
        n = n + (aElement[i]<10 ? " " : "") + aElement[i] + " - " + rank[Math.floor(aElement[i]/(100/rank.length))] + "<br>";
    }
    _ees.innerHTML = m;
    _eev.innerHTML = n;
    m = "", n = "";

}


document.body.onload = go;

document.getElementById("generate").onclick = generate;