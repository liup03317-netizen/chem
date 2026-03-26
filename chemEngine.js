// ========================================
// 化学规则推演引擎
// ========================================

// 1. 金属活动性顺序表 (越靠前越活泼)
const METAL_ACTIVITY = ['K', 'Ca', 'Na', 'Mg', 'Al', 'Zn', 'Fe', 'Sn', 'Pb', 'H', 'Cu', 'Hg', 'Ag', 'Pt', 'Au'];

// 2. 常见沉淀组合 (阳离子 + 阴离子)
const PPT_RULES = [
    { cation: 'Ag', anion: 'Cl' },
    { cation: 'Ba', anion: 'SO4' },
    { cation: 'Ca', anion: 'CO3' },
    { cation: 'Ba', anion: 'CO3' },
    { cation: 'Mg', anion: 'OH' },
    { cation: 'Al', anion: 'OH' },
    { cation: 'Cu', anion: 'OH' },
    { cation: 'Fe', anion: 'OH' }
];

// 3. 氧化剂特征库 (强氧化性物质及常见金属氧化物)
const OXIDIZERS = [
    'kmno4', 'hno3', 'cl2', 'o2', 'o3', 'h2o2',
    'fecl3', 'fe2(so4)3', 'fe(no3)3',
    'k2cr2o7', 'naclo', 'hclo', 'mno2', 'kclo3',
    'cuo', 'fe2o3', 'fe3o4'
];
// 4. 还原剂特征库
const REDUCERS = [
    'ki', 'nai', 'hi',
    'fecl2', 'feso4', 'fe(no3)2',
    'so2', 'na2so3', 'k2so3', 'h2so3',
    'h2s', 'na2s',
    'co', 'c', 'h2', 'nh3',
    'mg', 'al', 'zn', 'fe', 'cu', 'na', 'k', 'ca'
];
// 5. 碱性氧化物库
const BASIC_OXIDES = ['na2o', 'k2o', 'mgo', 'cao', 'bao', 'cuo', 'fe2o3', 'fe3o4', 'al2o3', 'zno'];
// 辅助函数：判断是不是纯金属单质 (剥离数字和标签后，恰好在顺序表里)
function getSingleMetal(formula) {
    let clean = formula.replace(/<[^>]+>/g, '').replace(/[0-9]/g, '').trim();
    let match = METAL_ACTIVITY.find(m => m.toLowerCase() === clean.toLowerCase());
    return match || null;
}
// 辅助函数：从化合物中粗略提取金属阳离子或 H
function getCationForDisplacement(formula) {
    let clean = formula.replace(/<[^>]+>/g, '').replace(/[0-9]/g, '').trim();
    for (let m of METAL_ACTIVITY) {
        if (clean.toLowerCase().startsWith(m.toLowerCase())) {
            return m;
        }
    }
    return null;
}
// 粗略提取核心元素的辅助函数（去掉数字和标签，只留大写开头的元素组合）
function extractElements(formula) {
    let textOnly = formula.replace(/<[^>]+>/g, '');
    let clean = textOnly.replace(/[0-9]/g, '');
    let elements = clean.match(/[A-Z][a-z]?/g) || [];
    
    // 【修复点】：必须用保留了数字的 textOnly 来匹配原子团！
    if (textOnly.includes('SO4')) elements.push('SO4');
    if (textOnly.includes('CO3')) elements.push('CO3');
    if (textOnly.includes('OH')) elements.push('OH');
    if (textOnly.includes('NO3')) elements.push('NO3');
    return elements;
}
// 辅助函数：识别物质的氧化还原身份
function getRedoxRole(formula) {
    let clean = formula.replace(/<[^>]+>/g, '').toLowerCase().trim();
    if (OXIDIZERS.includes(clean)) return 'ox';
    if (REDUCERS.includes(clean)) return 'red';
    return null;
}
// 规则引擎的主入口函数
export function checkByRuleEngine(formulaA, formulaB) {
    let elementsA = extractElements(formulaA);
    let elementsB = extractElements(formulaB);
    
    // 规则1：酸碱中和 (包含 H 和 OH)
    let hasH = elementsA.includes('H') || elementsB.includes('H');
    let hasOH = elementsA.includes('OH') || elementsB.includes('OH');
    if (hasH && hasOH && formulaA !== formulaB) {
        return { effect: '', equation: `${formulaA} + ${formulaB} → 盐 + H₂O (规则推演)` };
    }
    // 规则2：沉淀判定 (交叉组合阳离子和阴离子)
    for (let rule of PPT_RULES) {
        let aHasCation = elementsA.includes(rule.cation);
        let bHasAnion = elementsB.includes(rule.anion);
        let aHasAnion = elementsA.includes(rule.anion);
        let bHasCation = elementsB.includes(rule.cation);
        
        if ((aHasCation && bHasAnion) || (aHasAnion && bHasCation)) {
            return { effect: 'ppt', equation: `${formulaA} + ${formulaB} → 包含 ${rule.cation}${rule.anion}↓ (规则推演)` };
        }
    }
    
    // 规则3：简单产气 (H + CO3)
    let hasCO3 = elementsA.includes('CO3') || elementsB.includes('CO3');
    if (hasH && hasCO3) {
        return { effect: 'gas', equation: `${formulaA} + ${formulaB} → 盐 + H₂O + CO₂↑ (规则推演)` };
    }
    // 规则4：金属置换反应 (单质 + 盐/酸)
    let metalA = getSingleMetal(formulaA);
    let metalB = getSingleMetal(formulaB);
    let cationA = getCationForDisplacement(formulaA);
    let cationB = getCationForDisplacement(formulaB);
    // 如果 A 是单质，B 是化合物
    if (metalA && !metalB && cationB) {
        let indexA = METAL_ACTIVITY.indexOf(metalA);
        let indexB = METAL_ACTIVITY.indexOf(cationB);
        if (indexA > -1 && indexB > -1 && indexA < indexB && indexA > 2) {
            // 【化学防坑拦截】：如果是硝酸或浓硫酸，不能简单置换出氢气
            let textB = formulaB.replace(/<[^>]+>/g, '').toLowerCase();
            if (cationB === 'H' && (textB.includes('no3') || textB.includes('h2so4'))) {
                // 拦截，不做置换处理
            } else {
                let product = cationB === 'H' ? 'H₂↑' : `${cationB}↓`;
                let effect = cationB === 'H' ? 'gas' : '';
                return { effect: effect, equation: `${formulaA} + ${formulaB} → ${product} + 盐 (置换推演)` };
            }
        }
    }
    
    // 如果 B 是单质，A 是化合物
    if (metalB && !metalA && cationA) {
        let indexB = METAL_ACTIVITY.indexOf(metalB);
        let indexA = METAL_ACTIVITY.indexOf(cationA);
        if (indexB > -1 && indexA > -1 && indexB < indexA && indexB > 2) {
            // 【化学防坑拦截】
            let textA = formulaA.replace(/<[^>]+>/g, '').toLowerCase();
            if (cationA === 'H' && (textA.includes('no3') || textA.includes('h2so4'))) {
                // 拦截
            } else {
                let product = cationA === 'H' ? 'H₂↑' : `${cationA}↓`;
                let effect = cationA === 'H' ? 'gas' : '';
                return { effect: effect, equation: `${formulaB} + ${formulaA} → ${product} + 盐 (置换推演)` };
            }
        }
    }
    // 规则5：氧化还原反应 (强氧化剂 + 强还原剂)
    let roleA = getRedoxRole(formulaA);
    let roleB = getRedoxRole(formulaB);
    
    if (roleA && roleB && roleA !== roleB) {
        let effect = (elementsA.includes('O') || elementsB.includes('O') || elementsA.includes('Cl') || elementsB.includes('Cl')) ? 'fire' : '';
        return { effect: effect, equation: `${formulaA} + ${formulaB} → 氧化产物 + 还原产物 (氧化还原推演)` };
    }
    // 规则6：强酸 + 碱性氧化物 → 盐 + 水
    let textA = formulaA.replace(/<[^>]+>/g, '').toLowerCase();
    let textB = formulaB.replace(/<[^>]+>/g, '').toLowerCase();
    let isBasicOxideA = BASIC_OXIDES.includes(textA.replace(/[0-9]/g, ''));
    let isBasicOxideB = BASIC_OXIDES.includes(textB.replace(/[0-9]/g, ''));
    
    if ((isBasicOxideA && hasH && !isBasicOxideB) || (isBasicOxideB && hasH && !isBasicOxideA)) {
        if (!hasOH) {
            return { effect: '', equation: `${formulaA} + ${formulaB} → 盐 + H₂O (规则推演)` };
        }
    }
    return null;
}
