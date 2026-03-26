/**
 * 元素转化关系数据（按物质类别定义节点，按化学方程式定义边）
 */

// 物质类别颜色映射（与连连看保持一致）
export const NODE_COLORS = {
  acid: '#ef5350',     // 酸：红
  base: '#66bb6a',     // 碱：绿
  salt: '#42a5f5',     // 盐：蓝
  oxide: '#ab47bc',    // 氧化物：紫
  element: '#90a4ae',  // 单质：灰
  organic: '#ffa726',  // 有机物：橙
  other: '#78909c'     // 其他：蓝灰
};

export const ELEMENT_FAMILIES = {
  // ========================
  // 碳家族 (Carbon)
  // ========================
  C: {
    name: '碳家族', 
    symbol: 'C',
    icon: '💎', 
    color: NODE_COLORS.element,
    nodes: [
      { id: 'C', label: 'C', name: '碳', type: 'element', isCenter: true },
      { id: 'CO', label: 'CO', name: '一氧化碳', type: 'oxide' },
      { id: 'CO2', label: 'CO₂', name: '二氧化碳', type: 'oxide' },
      { id: 'H2CO3', label: 'H₂CO₃', name: '碳酸', type: 'acid' },
      { id: 'CaCO3', label: 'CaCO₃', name: '碳酸钙', type: 'salt' },
      { id: 'Na2CO3', label: 'Na₂CO₃', name: '碳酸钠', type: 'salt' }
    ],
    edges: [
      {
        id: 'c-001', from: 'C', to: 'CO2',
        equation: 'C + O₂ = CO₂', condition: '点燃', type: '化合反应',
        description: '碳在氧气中充分燃烧'
      },
      {
        id: 'c-002', from: 'C', to: 'CO',
        equation: '2C + O₂ = 2CO', condition: '点燃', type: '化合反应',
        description: '碳在氧气中不充分燃烧'
      },
      {
        id: 'c-003', from: 'CO', to: 'CO2',
        equation: '2CO + O₂ = 2CO₂', condition: '点燃', type: '化合反应',
        description: '一氧化碳燃烧'
      },
      {
        id: 'c-004', from: 'CO2', to: 'CO',
        equation: 'CO₂ + C = 2CO', condition: '高温', type: '化合反应',
        description: '二氧化碳与炽热的碳反应'
      },
      {
        id: 'c-005', from: 'CO2', to: 'H2CO3',
        equation: 'CO₂ + H₂O = H₂CO₃', condition: '', type: '化合反应',
        description: '二氧化碳溶于水'
      },
      {
        id: 'c-006', from: 'H2CO3', to: 'CO2',
        equation: 'H₂CO₃ = H₂O + CO₂↑', condition: '', type: '分解反应',
        description: '碳酸不稳定分解'
      },
      {
        id: 'c-007', from: 'CO2', to: 'CaCO3',
        equation: 'CO₂ + Ca(OH)₂ = CaCO₃↓ + H₂O', condition: '', type: '复分解反应',
        description: '二氧化碳通入澄清石灰水，石灰水变浑浊'
      },
      {
        id: 'c-008', from: 'CaCO3', to: 'CO2',
        equation: 'CaCO₃ + 2HCl = CaCl₂ + H₂O + CO₂↑', condition: '', type: '复分解反应',
        description: '实验室制取二氧化碳'
      },
      {
        id: 'c-009', from: 'CaCO3', to: 'CO2_calcine',
        equation: 'CaCO₃ = CaO + CO₂↑', condition: '高温', type: '分解反应',
        description: '高温煅烧石灰石'
      },
      {
        id: 'c-010', from: 'Na2CO3', to: 'CO2',
        equation: 'Na₂CO₃ + 2HCl = 2NaCl + H₂O + CO₂↑', condition: '', type: '复分解反应',
        description: '碳酸钠与盐酸反应制取二氧化碳'
      },
      {
        id: 'c-011', from: 'CO2', to: 'Na2CO3',
        equation: '2NaOH + CO₂ = Na₂CO₃ + H₂O', condition: '', type: '复分解反应',
        description: '氢氧化钠溶液吸收二氧化碳'
      }
    ]
  },

  // ========================
  // 氢家族 (Hydrogen)
  // ========================
  H: {
    name: '氢家族',
    symbol: 'H',
    icon: '💧',
    color: NODE_COLORS.element,
    nodes: [
      { id: 'H2', label: 'H₂', name: '氢气', type: 'element', isCenter: true },
      { id: 'H2O', label: 'H₂O', name: '水', type: 'oxide' },
      { id: 'HCl', label: 'HCl', name: '盐酸', type: 'acid' },
      { id: 'H2SO4', label: 'H₂SO₄', name: '硫酸', type: 'acid' }
    ],
    edges: [
      {
        id: 'h-001', from: 'H2', to: 'H2O',
        equation: '2H₂ + O₂ = 2H₂O', condition: '点燃', type: '化合反应',
        description: '氢气燃烧'
      },
      {
        id: 'h-002', from: 'H2O', to: 'H2',
        equation: '2H₂O = 2H₂↑ + O₂↑', condition: '通电', type: '分解反应',
        description: '电解水产生氢气和氧气'
      },
      {
        id: 'h-003', from: 'H2', to: 'H2O_reduce',
        equation: 'H₂ + CuO = Cu + H₂O', condition: '加热', type: '置换反应',
        description: '氢气还原氧化铜'
      },
      {
        id: 'h-004', from: 'HCl', to: 'H2',
        equation: 'Zn + 2HCl = ZnCl₂ + H₂↑', condition: '', type: '置换反应',
        description: '实验室用锌和稀盐酸制氢气'
      },
      {
        id: 'h-005', from: 'H2SO4', to: 'H2',
        equation: 'Zn + H₂SO₄ = ZnSO₄ + H₂↑', condition: '', type: '置换反应',
        description: '锌和稀硫酸反应生成氢气'
      },
      {
        id: 'h-006', from: 'HCl', to: 'H2O',
        equation: 'NaOH + HCl = NaCl + H₂O', condition: '', type: '复分解反应',
        description: '酸碱中和反应生成水'
      },
      {
        id: 'h-007', from: 'H2SO4', to: 'H2O',
        equation: '2NaOH + H₂SO₄ = Na₂SO₄ + 2H₂O', condition: '', type: '复分解反应',
        description: '酸碱中和反应生成水'
      }
    ]
  },

  // ========================
  // 氧家族 (Oxygen)
  // ========================
  O: {
    name: '氧家族',
    symbol: 'O',
    icon: '🌬️',
    color: NODE_COLORS.element,
    nodes: [
      { id: 'O2', label: 'O₂', name: '氧气', type: 'element', isCenter: true },
      { id: 'H2O', label: 'H₂O', name: '水', type: 'oxide' },
      { id: 'H2O2', label: 'H₂O₂', name: '过氧化氢', type: 'oxide' },
      { id: 'CO2', label: 'CO₂', name: '二氧化碳', type: 'oxide' },
      { id: 'KClO3', label: 'KClO₃', name: '氯酸钾', type: 'salt' },
      { id: 'KMnO4', label: 'KMnO₄', name: '高锰酸钾', type: 'salt' }
    ],
    edges: [
      {
        id: 'o-001', from: 'H2O2', to: 'O2',
        equation: '2H₂O₂ = 2H₂O + O₂↑', condition: 'MnO₂', type: '分解反应',
        description: '过氧化氢在二氧化锰催化下分解制氧气'
      },
      {
        id: 'o-002', from: 'H2O', to: 'O2',
        equation: '2H₂O = 2H₂↑ + O₂↑', condition: '通电', type: '分解反应',
        description: '电解水产生氧气'
      },
      {
        id: 'o-003', from: 'KClO3', to: 'O2',
        equation: '2KClO₃ = 2KCl + 3O₂↑', condition: 'MnO₂, 加热', type: '分解反应',
        description: '加热氯酸钾制氧气'
      },
      {
        id: 'o-004', from: 'KMnO4', to: 'O2',
        equation: '2KMnO₄ = K₂MnO₄ + MnO₂ + O₂↑', condition: '加热', type: '分解反应',
        description: '加热高锰酸钾制氧气'
      },
      {
        id: 'o-005', from: 'O2', to: 'H2O',
        equation: '2H₂ + O₂ = 2H₂O', condition: '点燃', type: '化合反应',
        description: '氢气与氧气燃烧生成水'
      },
      {
        id: 'o-006', from: 'O2', to: 'CO2',
        equation: 'C + O₂ = CO₂', condition: '点燃', type: '化合反应',
        description: '碳与氧气反应生成二氧化碳'
      }
    ]
  },

  // ========================
  // 铁家族 (Iron)
  // ========================
  Fe: {
    name: '铁家族',
    symbol: 'Fe',
    icon: '⚙️',
    color: NODE_COLORS.element,
    nodes: [
      { id: 'Fe', label: 'Fe', name: '铁', type: 'element', isCenter: true },
      { id: 'Fe2O3', label: 'Fe₂O₃', name: '氧化铁(铁锈)', type: 'oxide' },
      { id: 'Fe3O4', label: 'Fe₃O₄', name: '四氧化三铁', type: 'oxide' },
      { id: 'FeSO4', label: 'FeSO₄', name: '硫酸亚铁', type: 'salt' },
      { id: 'FeCl2', label: 'FeCl₂', name: '氯化亚铁', type: 'salt' },
      { id: 'FeCl3', label: 'FeCl₃', name: '氯化铁', type: 'salt' },
      { id: 'FeOH3', label: 'Fe(OH)₃', name: '氢氧化铁', type: 'base' }
    ],
    edges: [
      {
        id: 'fe-001', from: 'Fe', to: 'Fe3O4',
        equation: '3Fe + 2O₂ = Fe₃O₄', condition: '点燃', type: '化合反应',
        description: '铁丝在氧气中剧烈燃烧，火星四射'
      },
      {
        id: 'fe-002', from: 'Fe2O3', to: 'Fe',
        equation: 'Fe₂O₃ + 3CO = 2Fe + 3CO₂', condition: '高温', type: '置换反应',
        description: '一氧化碳还原氧化铁（炼铁原理）'
      },
      {
        id: 'fe-003', from: 'Fe', to: 'FeSO4',
        equation: 'Fe + H₂SO₄ = FeSO₄ + H₂↑', condition: '', type: '置换反应',
        description: '铁与稀硫酸反应，溶液由无色变浅绿色'
      },
      {
        id: 'fe-004', from: 'Fe', to: 'FeCl2',
        equation: 'Fe + 2HCl = FeCl₂ + H₂↑', condition: '', type: '置换反应',
        description: '铁与稀盐酸反应，溶液由无色变浅绿色'
      },
      {
        id: 'fe-005', from: 'FeSO4', to: 'Fe',
        equation: 'Zn + FeSO₄ = ZnSO₄ + Fe', condition: '', type: '置换反应',
        description: '锌置换出硫酸亚铁中的铁'
      },
      {
        id: 'fe-006', from: 'Fe2O3', to: 'FeCl3',
        equation: 'Fe₂O₃ + 6HCl = 2FeCl₃ + 3H₂O', condition: '', type: '复分解反应',
        description: '盐酸除铁锈，溶液变为黄色'
      },
      {
        id: 'fe-007', from: 'FeCl3', to: 'FeOH3',
        equation: 'FeCl₃ + 3NaOH = Fe(OH)₃↓ + 3NaCl', condition: '', type: '复分解反应',
        description: '氯化铁溶液与氢氧化钠反应，生成红褐色沉淀'
      }
    ]
  },

  // ========================
  // 钙家族 (Calcium)
  // ========================
  Ca: {
    name: '钙家族',
    symbol: 'Ca',
    icon: '🦴',
    color: NODE_COLORS.element,
    nodes: [
      { id: 'CaO', label: 'CaO', name: '氧化钙(生石灰)', type: 'oxide', isCenter: true },
      { id: 'CaOH2', label: 'Ca(OH)₂', name: '氢氧化钙(熟石灰)', type: 'base' },
      { id: 'CaCO3', label: 'CaCO₃', name: '碳酸钙(石灰石)', type: 'salt' },
      { id: 'CaCl2', label: 'CaCl₂', name: '氯化钙', type: 'salt' }
    ],
    edges: [
      {
        id: 'ca-001', from: 'CaCO3', to: 'CaO',
        equation: 'CaCO₃ = CaO + CO₂↑', condition: '高温', type: '分解反应',
        description: '高温煅烧石灰石制取生石灰'
      },
      {
        id: 'ca-002', from: 'CaO', to: 'CaOH2',
        equation: 'CaO + H₂O = Ca(OH)₂', condition: '', type: '化合反应',
        description: '生石灰溶于水，放出大量热（用来煮鸡蛋）'
      },
      {
        id: 'ca-003', from: 'CaOH2', to: 'CaCO3',
        equation: 'Ca(OH)₂ + CO₂ = CaCO₃↓ + H₂O', condition: '', type: '复分解反应',
        description: '澄清石灰水检验二氧化碳'
      },
      {
        id: 'ca-004', from: 'CaOH2', to: 'CaCO3_na2co3',
        equation: 'Ca(OH)₂ + Na₂CO₃ = CaCO₃↓ + 2NaOH', condition: '', type: '复分解反应',
        description: '氢氧化钙与碳酸钠反应，生成白色沉淀（工业制烧碱）'
      },
      {
        id: 'ca-005', from: 'CaCO3', to: 'CaCl2',
        equation: 'CaCO₃ + 2HCl = CaCl₂ + H₂O + CO₂↑', condition: '', type: '复分解反应',
        description: '石灰石与盐酸反应制取二氧化碳'
      },
      {
        id: 'ca-006', from: 'CaOH2', to: 'CaCl2',
        equation: 'Ca(OH)₂ + 2HCl = CaCl₂ + 2H₂O', condition: '', type: '复分解反应',
        description: '氢氧化钙与盐酸的中和反应'
      },
      {
        id: 'ca-007', from: 'CaO', to: 'CaCl2',
        equation: 'CaO + 2HCl = CaCl₂ + H₂O', condition: '', type: '复分解反应',
        description: '氧化钙与盐酸反应'
      }
    ]
  }
};
