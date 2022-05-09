const lang = "ja";
const langf = fetch("../lang.csv");
let langt = "";
let langa = [];

var IndividualProperty = [];
var Race = [];
var Occ = [];
var GeneralProperty = [];
var ElementProperty = [];

const rank = ["E","D","C","B","A","S"];
const aIndividual = [];
const aGeneral = [];
const aElement = [];
var IP = 0;
var GP = 0;
var EP = 0;

const _ie = document.getElementById("ie");
const _ies = document.getElementById("ies");
const _iev = document.getElementById("iev");
const _ce = document.getElementById("ce");
const _ces = document.getElementById("ces");
const _cev = document.getElementById("cev");
const _ee = document.getElementById("ee");
const _ees = document.getElementById("ees");
const _eev = document.getElementById("eev");
const _bce = document.getElementById("bce");
const _bee = document.getElementById("bee");

const _e = document.getElementsByClassName("e");
const _be = document.getElementsByClassName("be");
const _bbce = document.getElementsByClassName("bbce");
const _bbee = document.getElementsByClassName("bbee");

let LAn = [0,0];
let Ln = 0;

async function AnalyzeLangFile(text){
    langt = text.replaceAll(" ","").replaceAll('\r',"").split("\n");
    langa = langt.slice(1).map(element=>{return (element.split(",")[langt[0].split(",").indexOf(lang)])});

    let i = langa.indexOf("~");
    IndividualProperty = langa.slice(0,i);
    langa = langa.slice(i+1);
    i = langa.indexOf("~");
    Race = langa.slice(0,i);
    langa = langa.slice(i+1);
    i = langa.indexOf("~");
    Occ = langa.slice(0,i);
    langa = langa.slice(i+1);
    i = langa.indexOf("~");
    GeneralProperty = langa.slice(0,i);
    langa = langa.slice(i+1);
    i = langa.indexOf("~");
    ElementProperty = langa.slice(0,i);

    IP = IndividualProperty.length;
    GP = GeneralProperty.length;
    EP = ElementProperty.length;
    
}

async function go(){
    await langf.then(res=>res.text().then(text=>AnalyzeLangFile(text)));
    
    Race.forEach(function(value){
        LAn[0] = LAn[0]<value.length?value.length:LAn[0];
    });
    Occ.forEach(function(value){
        LAn[1] = LAn[1]<value.length?value.length:LAn[1];
    });
    LAn.forEach(function(value){
        Ln = Ln<value?value:Ln;
    });
    for(let i = 0; i < GP; i++){
        o = document.createElement("div");
        o.className = "bbce";
        o.id = "bc"+i;
        _bce.appendChild(o);
    }
    for(let i = 0; i < EP; i++){
        o = document.createElement("div");
        o.className = "bbee";
        o.id = "be"+i;
        _bee.appendChild(o);
    }
}
function rNorm(){//https://stabucky.com/wp/archives/9263 参考
    let s = 0;
    for(let i = 0; i < 8; i++){
        s += Math.random();
    }
    return s-4;
}
function generate(){
    _bce.style.display = "inline-flex";
    _bee.style.display = "inline-flex";
    let m = "";
    let n = "";
    let t;
    let o;
    //Individual
    for(let i = 0; i < IP; i++){
        switch(i){
            case 0:
            case 1: 
            case 2: {
                aIndividual[i] = (Math.round(rNorm()*120)/100).toFixed(2);
                break;
            }
            case 3: {
                aIndividual[i] = Race[Math.round(Math.random()*(Race.length-1))]/*.padStart(Ln, " ");*/
                break;
            }
            case 4: {
                aIndividual[i] = Occ[Math.round(Math.random()*(Occ.length-1))]/*.padStart(Ln, " ");*/
                break;
            }
            case 10: {
                aIndividual[i] = Math.floor(Math.random()*100);
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
    for(let i = 0; i < GP; i++){
        switch(i){
            case 13:
                _bbce[i].style.width = 99-aGeneral[i]+"%";
                break;
            default:
                _bbce[i].style.width = aGeneral[i]+"%";
                break;
        }
    }
    _ces.innerHTML = m;
    _cev.innerHTML = n;
    m = "", n = "";
    //Element
    for(let i = 0; i < EP; i++){
        aElement[i] = Math.floor(Math.random()*100);
    }
    for(let i = 0; i < EP; i++){
        t = Math.floor(aElement[i]/(100/rank.length));
        m = m + ElementProperty[i] + ": " + "<br>";
        n = n + (aElement[i]<10 ? " " : "") + aElement[i] + " - " + rank[t] + "<br>";
    }
    for(let i = 0; i < EP; i++){
        switch(i){
            default:
                _bbee[i].style.width = aElement[i]+"%";
                break;
        }
    }
    _ees.innerHTML = m;
    _eev.innerHTML = n;
    m = "", n = "";

}

document.body.onload = go;

document.getElementById("generate").onclick = generate;