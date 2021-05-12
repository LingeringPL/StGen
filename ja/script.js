
const IndividualProperty = ["身長偏差","体重偏差","齢差偏差","種族","職業","開放性","誠実性","外向性","協調性","情動性","人間性"];
const Race = ["人間","エルフ","ドワーフ","巨人","竜","吸血鬼","天使","悪魔","妖精","ゴーレム","人造生物","粘体生物","鬼人","植物生物","哺乳生物","爬虫生物","両生生物","節足生物","竜人","獣精","獣人","呪屍","無形","人魚"];
const Occ = ["放浪者","吟遊詩人","冒険者","牧者","隠者",
             "戦士","魔法使い","レンジャー","プリースト",
             "暗殺者","予言者","ガンナー","賢者",
             "騎士","魔法剣士","斥候","聖騎士",
             "将軍","魔術士","偵察者","神託者",
             "トレーナー","医者","エンジニア","宣教師",
             "死霊術師","召喚術師","魔物飼い","祈祷師",
             "考古学者","薬剤師","錬金術師","科学者",
             "鍛冶屋","強化術師","占星術師","付加術師",
             "ストラテジスト","クロノマンサー","戦術家","ジオマンサー",
             "醸造屋","パン屋","菓子屋","調理師",
             "行商人","情報屋","商人","斡旋者"
            ];
const GeneralProperty = ["攻撃","防御","器用","敬虔",
                         "生命","精神","敏捷","知力",
                         "耐物","耐魔",
                         "運","知覚",
                         "カリスマ","カルマ"];
const ElementProperty = ["効力／火","純度／火",
                         "効力／氷","純度／氷",
                         "効力／雷","純度／雷",
                         "効力／地","純度／地",
                         "効力／空","純度／空",
                         "平衡性","安定性"];

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

const _e = document.getElementsByClassName("e");

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
    _ees.innerHTML = m;
    _eev.innerHTML = n;
    m = "", n = "";

}

document.body.onload = go;

document.getElementById("generate").onclick = generate;