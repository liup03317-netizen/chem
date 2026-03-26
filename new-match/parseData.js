const fs = require('fs');
const path = require('path');

// Unicode 下标映射表
const SUBSCRIPT_MAP = {
    '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
    '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
};

// 将 Unicode 下标转换为 HTML 标签
function convertSubscripts(formula) {
    let result = '';
    let inSubscript = false;
    let subscriptBuffer = '';
    
    for (let i = 0; i < formula.length; i++) {
        const char = formula[i];
        
        if (SUBSCRIPT_MAP[char]) {
            if (!inSubscript) {
                inSubscript = true;
                subscriptBuffer = SUBSCRIPT_MAP[char];
            } else {
                subscriptBuffer += SUBSCRIPT_MAP[char];
            }
        } else {
            if (inSubscript) {
                result += '<sub>' + subscriptBuffer + '</sub>';
                inSubscript = false;
                subscriptBuffer = '';
            }
            result += char;
        }
    }
    
    if (inSubscript) {
        result += '<sub>' + subscriptBuffer + '</sub>';
    }
    
    return result;
}

// 解析方程式，提取反应物
function parseEquation(equation) {
    if (!equation || equation.length < 3) return null;
    
    // 保存原始方程式（用于显示）
    let originalEquation = equation;
    
    // 清理方程式
    let cleanEquation = equation
        .replace(/点燃/g, '')
        .replace(/加热/g, '')
        .replace(/高温/g, '')
        .replace(/通电/g, '')
        .replace(/光照/g, '')
        .replace(/催化剂/g, '')
        .replace(/MnO₂[、,]*/g, '')
        .replace(/\(熔融\)/g, '')
        .replace(/\(浓\)/g, '')
        .replace(/\(稀\)/g, '')
        .replace(/\(g\)/g, '')
        .replace(/\(少量\)/g, '')
        .replace(/\(足量\)/g, '')
        .replace(/\(过量\)/g, '')
        .replace(/△/g, '')
        .trim();
    
    // 以 = 或 ⇌ 分割
    const parts = cleanEquation.split(/[=⇌]/);
    if (parts.length < 2) return null;
    
    const leftSide = parts[0].trim();
    
    // 按 + 分割反应物
    const reactants = leftSide.split(/\+/).map(r => r.trim()).filter(r => r);
    
    return {
        reactants,
        products: parts[1] ? parts[1].trim() : '',
        originalEquation
    };
}

// 判断特效类型
function determineEffect(equation, phenomenon) {
    const combinedText = (equation + ' ' + (phenomenon || '')).toLowerCase();
    
    // 沉淀特效
    if (combinedText.includes('沉淀') || 
        combinedText.includes('↓') || 
        combinedText.includes('浑浊') ||
        combinedText.includes('白色固体')) {
        return 'ppt';
    }
    
    // 气体特效
    if (combinedText.includes('气泡') || 
        combinedText.includes('气体') || 
        combinedText.includes('↑') ||
        combinedText.includes('烟')) {
        return 'gas';
    }
    
    // 燃烧特效
    if (combinedText.includes('燃烧') || 
        combinedText.includes('火焰') || 
        combinedText.includes('发光') ||
        combinedText.includes('耀眼') ||
        combinedText.includes('火星四射')) {
        return 'fire';
    }
    
    return null;
}

// 判断元素分类
function determineElement(reactants) {
    const allReactants = reactants.join(' ');
    
    // 元素关键词
    const elementKeywords = {
        'sodium': ['Na', 'Na₂O', 'Na₂O₂', 'NaOH', 'Na₂CO₃', 'NaHCO₃', 'NaCl', 'NaH'],
        'aluminum': ['Al', 'Al₂O₃', 'Al(OH)₃', 'AlCl₃', 'Al₂(SO₄)₃'],
        'iron': ['Fe', 'FeO', 'Fe₂O₃', 'Fe₃O₄', 'Fe(OH)₂', 'Fe(OH)₃', 'FeCl₂', 'FeCl₃', 'FeSO₄', 'Fe₂(SO₄)₃'],
        'chlorine': ['Cl₂', 'HCl', 'NaCl', 'FeCl₂', 'FeCl₃', 'AlCl₃', 'CuCl₂', 'CaCl₂', 'BaCl₂', 'AgCl'],
        'sulfur': ['S', 'SO₂', 'SO₃', 'H₂S', 'H₂SO₄', 'H₂SO₃', 'Na₂SO₄', 'CuSO₄', 'FeSO₄', 'Fe₂(SO₄)₃', 'BaSO₄', 'CaSO₄', 'MgSO₄', 'ZnSO₄', 'Al₂(SO₄)₃'],
        'nitrogen': ['N₂', 'NO', 'NO₂', 'N₂O₅', 'NH₃', 'NH₄', 'HNO₃', 'NaNO₃', 'KNO₃', 'NH₄Cl', 'NH₄NO₃', '(NH₄)₂SO₄', 'NH₃·H₂O'],
        'copper': ['Cu', 'CuO', 'Cu₂O', 'Cu(OH)₂', 'CuSO₄', 'CuCl₂', 'Cu(NO₃)₂'],
        'magnesium': ['Mg', 'MgO', 'Mg(OH)₂', 'MgCl₂', 'MgSO₄', 'MgCO₃', 'Mg(NO₃)₂'],
        'zinc': ['Zn', 'ZnO', 'Zn(OH)₂', 'ZnCl₂', 'ZnSO₄', 'Zn(NO₃)₂'],
        'calcium': ['Ca', 'CaO', 'Ca(OH)₂', 'CaCO₃', 'CaCl₂', 'CaSO₄', 'Ca(NO₃)₂', 'Ca(HCO₃)₂'],
        'carbon': ['C', 'CO', 'CO₂', 'H₂CO₃', 'Na₂CO₃', 'NaHCO₃', 'CaCO₃', 'K₂CO₃', 'BaCO₃', 'MgCO₃']
    };
    
    for (const [element, keywords] of Object.entries(elementKeywords)) {
        for (const keyword of keywords) {
            // 检查是否包含该物质
            if (allReactants.includes(keyword)) {
                return element;
            }
        }
    }
    
    return 'other';
}

// 解析 Markdown 表格行
function parseTableRow(line) {
    if (!line.startsWith('|')) return null;
    
    const cells = line.split('|')
        .map(cell => cell.trim())
        .filter(cell => cell);
    
    // 跳过分隔行
    if (cells.length > 0 && cells[0].match(/^:?-+:?$/)) return null;
    
    return cells;
}

// 解析 MD 文件
function parseMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    const results = {
        doubleReactant: [],
        singleReactant: [],
        complexReactant: []
    };
    
    let currentSection = '';
    let inTable = false;
    let headerCells = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 解析章节标题
        if (line.startsWith('## ')) {
            currentSection = line.replace('## ', '').trim();
            continue;
        }
        
        // 解析表格
        if (line.startsWith('|')) {
            const cells = parseTableRow(line);
            
            if (!cells) continue;
            
            // 如果是表头行
            if (cells.some(c => c.includes('化学方程式') || c.includes('方程式'))) {
                headerCells = cells;
                inTable = true;
                continue;
            }
            
            if (!inTable || cells.length < 2) continue;
            
            // 找到化学方程式列的索引
            const equationIndex = headerCells.findIndex(h => h.includes('化学方程式') || h.includes('方程式'));
            const phenomenonIndex = headerCells.findIndex(h => h.includes('实验现象') || h.includes('现象'));
            
            if (equationIndex === -1) continue;
            
            const equation = cells[equationIndex];
            const phenomenon = phenomenonIndex !== -1 ? cells[phenomenonIndex] : '';
            
            if (!equation || equation.length < 3) continue;
            
            // 解析方程式
            const parsed = parseEquation(equation);
            if (!parsed) continue;
            
            const { reactants, products, originalEquation } = parsed;
            const effect = determineEffect(equation, phenomenon);
            
            // 转换下标
            const convertedReactants = reactants.map(r => convertSubscripts(r));
            
            // 转换完整方程式的下标
            const fullEquation = convertSubscripts(originalEquation);
            
            // 根据反应物数量分类
            if (reactants.length === 1) {
                // 单反应物（分解反应）
                const condition = equation.match(/点燃|加热|高温|通电|光照|△/)?.[0] || '加热';
                results.singleReactant.push({
                    reactant: convertedReactants[0],
                    condition: condition,
                    products: products
                });
            } else if (reactants.length === 2) {
                // 双反应物（核心玩法）
                const element = determineElement(reactants);
                // 格式：[反应物A, 反应物B, 特效(无则为空字符串), 完整方程式]
                const entry = [
                    convertedReactants[0], 
                    convertedReactants[1], 
                    effect || '', 
                    fullEquation
                ];
                
                results.doubleReactant.push({
                    data: entry,
                    element: element
                });
            } else if (reactants.length >= 3) {
                // 复杂反应
                results.complexReactant.push(convertedReactants);
            }
        } else {
            inTable = false;
        }
    }
    
    return results;
}

// 去重函数
function uniqueReactions(reactions) {
    const seen = new Set();
    return reactions.filter(item => {
        const key = JSON.stringify(item.data || item);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

// 生成 data.js 文件
function generateDataJS(highSchoolData, middleSchoolData, existingCustomDB) {
    // 合并双反应物数据到 topicDB
    const topicDB = {
        sodium: [],
        aluminum: [],
        iron: [],
        chlorine: [],
        sulfur: [],
        nitrogen: [],
        copper: [],
        magnesium: [],
        zinc: [],
        calcium: [],
        carbon: [],
        other: [],
        middleSchool: []
    };
    
    // 全局反应数据库
    const reactionDB = [];
    
    // Boss 数据库
    const bossDecompDB = [];
    const bossComplexDB = [];
    
    // 处理高中数据
    const uniqueHighSchool = uniqueReactions(highSchoolData.doubleReactant);
    uniqueHighSchool.forEach(item => {
        const element = item.element;
        if (topicDB[element]) {
            topicDB[element].push(item.data);
        } else {
            topicDB.other.push(item.data);
        }
        reactionDB.push(item.data);
    });
    
    // 处理初中数据
    const uniqueMiddleSchool = uniqueReactions(middleSchoolData.doubleReactant);
    uniqueMiddleSchool.forEach(item => {
        topicDB.middleSchool.push(item.data);
        reactionDB.push(item.data);
    });
    
    // 处理分解反应
    highSchoolData.singleReactant.forEach(item => {
        bossDecompDB.push({
            reactant: item.reactant,
            condition: item.condition,
            products: item.products
        });
    });
    
    middleSchoolData.singleReactant.forEach(item => {
        bossDecompDB.push({
            reactant: item.reactant,
            condition: item.condition,
            products: item.products
        });
    });
    
    // 处理复杂反应
    highSchoolData.complexReactant.forEach(item => {
        bossComplexDB.push(item);
    });
    
    middleSchoolData.complexReactant.forEach(item => {
        bossComplexDB.push(item);
    });
    
    // 去重全局数据库
    const uniqueReactionDB = uniqueReactions(reactionDB.map(d => ({ data: d }))).map(d => d.data);
    
    // 生成 JS 代码
    let jsContent = `// ========================================
// 化学反应数据库（自动生成）
// 数据来源：人教版高中+初中化学教材
// 生成时间：${new Date().toISOString()}
// ========================================

// ========================================
// 全局反应数据库（双反应物）
// 格式：[反应物A, 反应物B, 特效, 完整方程式]
// ========================================

const reactionDB = ${JSON.stringify(uniqueReactionDB, null, 4)};

// ========================================
// 元素级靶向训练题库
// ========================================

const topicDB = ${JSON.stringify(topicDB, null, 4)};

// ========================================
// Boss 关卡数据库
// ========================================

// 分解反应（单反应物）
const bossDecompDB = ${JSON.stringify(bossDecompDB, null, 4)};

// 复杂反应（3+反应物）
const bossComplexDB = ${JSON.stringify(bossComplexDB, null, 4)};

// ========================================
// 自定义与拓展题库 (手动维护)
// 格式：[反应物A, 反应物B, 特效, 完整方程式]
// ========================================

${existingCustomDB || `const customDB = [
    // 在此添加自定义反应
];`}

// ========================================
// 合并所有题库到全局数据库
// ========================================

const allReactions = [...reactionDB, ...customDB];
`;
    
    return jsContent;
}

// 主函数
function main() {
    const highSchoolFile = path.join(__dirname, '高中化学方程式_多维标注-66b15fcc78.md');
    const middleSchoolFile = path.join(__dirname, '初中化学方程式_多维标注-efd2ca3059.md');
    const outputFile = path.join(__dirname, 'data.js');
    
    // 读取现有的 customDB（如果存在）
    let existingCustomDB = null;
    try {
        const existingData = fs.readFileSync(outputFile, 'utf-8');
        const customDBMatch = existingData.match(/const customDB\s*=\s*\[[\s\S]*?\];\s*(?=\/\/|const allReactions|$)/);
        if (customDBMatch) {
            existingCustomDB = customDBMatch[0].trim();
            console.log('已读取现有的 customDB，将保留...');
        }
    } catch (e) {
        console.log('未找到现有 data.js，将创建新文件...');
    }
    
    console.log('开始解析高中化学方程式...');
    const highSchoolData = parseMarkdownFile(highSchoolFile);
    console.log(`高中数据: 双反应物 ${highSchoolData.doubleReactant.length}, 单反应物 ${highSchoolData.singleReactant.length}, 复杂反应 ${highSchoolData.complexReactant.length}`);
    
    console.log('开始解析初中化学方程式...');
    const middleSchoolData = parseMarkdownFile(middleSchoolFile);
    console.log(`初中数据: 双反应物 ${middleSchoolData.doubleReactant.length}, 单反应物 ${middleSchoolData.singleReactant.length}, 复杂反应 ${middleSchoolData.complexReactant.length}`);
    
    console.log('生成 data.js 文件...');
    const jsContent = generateDataJS(highSchoolData, middleSchoolData, existingCustomDB);
    
    fs.writeFileSync(outputFile, jsContent, 'utf-8');
    console.log(`数据已写入 ${outputFile}`);
    
    // 统计信息
    console.log('\n=== 数据统计 ===');
    const uniqueHighSchool = uniqueReactions(highSchoolData.doubleReactant);
    const uniqueMiddleSchool = uniqueReactions(middleSchoolData.doubleReactant);
    console.log(`全局反应数据库 (reactionDB): ${uniqueHighSchool.length + uniqueMiddleSchool.length} 条`);
    console.log(`分解反应 (bossDecompDB): ${highSchoolData.singleReactant.length + middleSchoolData.singleReactant.length} 条`);
    console.log(`复杂反应 (bossComplexDB): ${highSchoolData.complexReactant.length + middleSchoolData.complexReactant.length} 条`);
}

main();
