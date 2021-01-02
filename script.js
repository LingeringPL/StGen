
const IndividualProperty = ["H.DEV","W.DEV","RACE","OCC","OPE","CON","EXT","AGR","NEU"];
const Race = ["Human","Elf","Dwarf","Giant","Dragon","Vampire","Angel","Devil","Fairy","Golem","Android","Slime","Ogre","Vegetative","Small animal","Insect","Dragonewt","Sith","Therian.","Lich"];
const Occ = ["Wayfarer","Bard","Adventurer",
             "Fighter","Sorcerer","Ranger","Priest",
             "Assassin","Prophet","Gunner","Wise",
             "Trainer","Doctor","Engineer","Missionary",             
             "Necromancer","Summoner","Tamer","Exorcist",
             "Merchant","Pharmacist","Alchemist","Scientist"];
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
const _ce = document.getElementById("ce");
const _ee = document.getElementById("ee");

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
        m = m + IndividualProperty[i] + ":" + ((i==2||i==3) ? "\t":"\t\t"+(i>3?"\t\t\t ":"\t")) + (aIndividual[i]>=0 ? " " : "") + (aIndividual[i]<10&&aIndividual[i]>-10 ? " " : "") + aIndividual[i] + "<br>";
    }
    _ie.innerHTML = m;
    m = "";
    //General
    for(let i = 0; i < GP; i++){
        aGeneral[i] = Math.floor(Math.random()*100);
    }
    for(let i = 0; i < GP; i++){
        t = Math.floor(aGeneral[i]/(100/rank.length));
        m = m + GeneralProperty[i] + ":\t" + (aGeneral[i]<10 ? " " : "") + aGeneral[i] + " - " + rank[i!=13 ? t : rank.length-1-t] + "<br>";
        
    }
    _ce.innerHTML = m;
    m = "";
    //Element
    for(let i = 0; i < EP; i++){
        aElement[i] = Math.floor(Math.random()*100);
    }
    for(let i = 0; i < EP; i++){
        m = m + ElementProperty[i] + ":\t" + (aElement[i]<10 ? " " : "") + aElement[i] + " - " + rank[Math.floor(aElement[i]/(100/rank.length))] + "<br>";
    }
    _ee.innerHTML = m;
}


document.body.onload = go;

document.getElementById("generate").onclick = generate;