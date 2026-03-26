// ========================================
// 化学反应数据库（自动生成）
// 数据来源：人教版高中+初中化学教材
// 生成时间：2026-03-22T09:31:50.548Z
// ========================================

// ========================================
// 全局反应数据库（双反应物）
// 格式：[反应物A, 反应物B, 特效, 完整方程式]
// ========================================

const reactionDB = [
    [
        "4Na",
        "O<sub>2</sub>",
        "",
        "4Na + O<sub>2</sub> = 2Na<sub>2</sub>O"
    ],
    [
        "2Na",
        "2H<sub>2</sub>O",
        "gas",
        "2Na + 2H<sub>2</sub>O = 2NaOH + H<sub>2</sub>↑"
    ],
    [
        "2Na",
        "2H⁺",
        "gas",
        "2Na + 2H⁺ = 2Na⁺ + H<sub>2</sub>↑"
    ],
    [
        "4Na",
        "TiCl<sub>4</sub>",
        "",
        "4Na + TiCl<sub>4</sub>(熔融) = 4NaCl + Ti"
    ],
    [
        "Na",
        "KCl",
        "gas",
        "Na + KCl(熔融) = NaCl + K↑"
    ],
    [
        "Na<sub>2</sub>O",
        "H<sub>2</sub>O",
        "",
        "Na<sub>2</sub>O + H<sub>2</sub>O = 2NaOH"
    ],
    [
        "Na<sub>2</sub>O",
        "CO<sub>2</sub>",
        "",
        "Na<sub>2</sub>O + CO<sub>2</sub> = Na<sub>2</sub>CO<sub>3</sub>"
    ],
    [
        "Na<sub>2</sub>O",
        "2HCl",
        "ppt",
        "Na<sub>2</sub>O + 2HCl = 2NaCl + H<sub>2</sub>O"
    ],
    [
        "Na<sub>2</sub>O",
        "SO<sub>2</sub>",
        "",
        "Na<sub>2</sub>O + SO<sub>2</sub> = Na<sub>2</sub>SO<sub>3</sub>"
    ],
    [
        "2Na<sub>2</sub>O<sub>2</sub>",
        "2H<sub>2</sub>O",
        "gas",
        "2Na<sub>2</sub>O<sub>2</sub> + 2H<sub>2</sub>O = 4NaOH + O<sub>2</sub>↑"
    ],
    [
        "2Na<sub>2</sub>O<sub>2</sub>",
        "2CO<sub>2</sub>",
        "gas",
        "2Na<sub>2</sub>O<sub>2</sub> + 2CO<sub>2</sub> = 2Na<sub>2</sub>CO<sub>3</sub> + O<sub>2</sub>↑"
    ],
    [
        "2Na<sub>2</sub>O<sub>2</sub>",
        "2HCl",
        "gas",
        "2Na<sub>2</sub>O<sub>2</sub> + 2HCl = 4NaCl + O<sub>2</sub>↑ + H<sub>2</sub>O"
    ],
    [
        "Na<sub>2</sub>O<sub>2</sub>",
        "SO<sub>2</sub>",
        "",
        "Na<sub>2</sub>O<sub>2</sub> + SO<sub>2</sub> = Na<sub>2</sub>SO<sub>4</sub>"
    ],
    [
        "2Na<sub>2</sub>O<sub>2</sub>",
        "2H<sub>2</sub>SO<sub>4</sub>",
        "gas",
        "2Na<sub>2</sub>O<sub>2</sub> + 2H<sub>2</sub>SO<sub>4</sub> = 2Na<sub>2</sub>SO<sub>4</sub> + O<sub>2</sub>↑ + 2H<sub>2</sub>O"
    ],
    [
        "NaHCO<sub>3</sub>",
        "NaOH",
        "",
        "NaHCO<sub>3</sub> + NaOH = Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O"
    ],
    [
        "Na<sub>2</sub>CO<sub>3</sub>",
        "HCl",
        "gas",
        "Na<sub>2</sub>CO<sub>3</sub> + HCl = NaHCO<sub>3</sub> + NaCl"
    ],
    [
        "Na<sub>2</sub>CO<sub>3</sub>",
        "2HCl",
        "gas",
        "Na<sub>2</sub>CO<sub>3</sub> + 2HCl = 2NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑"
    ],
    [
        "NaHCO<sub>3</sub>",
        "HCl",
        "gas",
        "NaHCO<sub>3</sub> + HCl = NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑"
    ],
    [
        "Na<sub>2</sub>CO<sub>3</sub>",
        "CaCl<sub>2</sub>",
        "ppt",
        "Na<sub>2</sub>CO<sub>3</sub> + CaCl<sub>2</sub> = CaCO<sub>3</sub>↓ + 2NaCl"
    ],
    [
        "Na<sub>2</sub>CO<sub>3</sub>",
        "BaCl<sub>2</sub>",
        "ppt",
        "Na<sub>2</sub>CO<sub>3</sub> + BaCl<sub>2</sub> = BaCO<sub>3</sub>↓ + 2NaCl"
    ],
    [
        "NaHCO<sub>3</sub>",
        "Ca(OH)<sub>2</sub>",
        "ppt",
        "NaHCO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + NaOH + H<sub>2</sub>O"
    ],
    [
        "2NaHCO<sub>3</sub>",
        "Ca(OH)<sub>2</sub>",
        "ppt",
        "2NaHCO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + Na<sub>2</sub>CO<sub>3</sub> + 2H<sub>2</sub>O"
    ],
    [
        "Na<sub>2</sub>CO<sub>3</sub>",
        "Ca(OH)<sub>2</sub>",
        "ppt",
        "Na<sub>2</sub>CO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + 2NaOH"
    ],
    [
        "NaH",
        "H<sub>2</sub>O",
        "gas",
        "NaH + H<sub>2</sub>O = NaOH + H<sub>2</sub>↑"
    ],
    [
        "4Al",
        "3O<sub>2</sub>",
        "",
        "4Al + 3O<sub>2</sub> = 2Al<sub>2</sub>O<sub>3</sub>"
    ],
    [
        "2Al",
        "3H<sub>2</sub>SO<sub>4</sub>",
        "gas",
        "2Al + 3H<sub>2</sub>SO<sub>4</sub> = Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>↑"
    ],
    [
        "2Al",
        "6HCl",
        "gas",
        "2Al + 6HCl = 2AlCl<sub>3</sub> + 3H<sub>2</sub>↑"
    ],
    [
        "Al<sub>2</sub>O<sub>3</sub>",
        "6HCl",
        "ppt",
        "Al<sub>2</sub>O<sub>3</sub> + 6HCl = 2AlCl<sub>3</sub> + 3H<sub>2</sub>O"
    ],
    [
        "Al<sub>2</sub>O<sub>3</sub>",
        "3H<sub>2</sub>SO<sub>4</sub>",
        "ppt",
        "Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>SO<sub>4</sub> = Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>O"
    ],
    [
        "Al<sub>2</sub>O<sub>3</sub>",
        "2NaOH",
        "ppt",
        "Al<sub>2</sub>O<sub>3</sub> + 2NaOH = 2NaAlO<sub>2</sub> + H<sub>2</sub>O"
    ],
    [
        "Al(OH)<sub>3</sub>",
        "3HCl",
        "ppt",
        "Al(OH)<sub>3</sub> + 3HCl = AlCl<sub>3</sub> + 3H<sub>2</sub>O"
    ],
    [
        "Al(OH)<sub>3</sub>",
        "NaOH",
        "ppt",
        "Al(OH)<sub>3</sub> + NaOH = Na[Al(OH)<sub>4</sub>]"
    ],
    [
        "Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>",
        "6NH<sub>3</sub>·H<sub>2</sub>O",
        "ppt",
        "Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6NH<sub>3</sub>·H<sub>2</sub>O = 2Al(OH)<sub>3</sub>↓ + 3(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>"
    ],
    [
        "AlCl<sub>3</sub>",
        "3NaOH",
        "ppt",
        "AlCl<sub>3</sub> + 3NaOH(少量) = Al(OH)<sub>3</sub>↓ + 3NaCl"
    ],
    [
        "AlCl<sub>3</sub>",
        "4NaOH",
        "ppt",
        "AlCl<sub>3</sub> + 4NaOH(过量) = Na[Al(OH)<sub>4</sub>] + 3NaCl"
    ],
    [
        "Na[Al(OH)<sub>4</sub>]",
        "HCl",
        "ppt",
        "Na[Al(OH)<sub>4</sub>] + HCl(少量) = Al(OH)<sub>3</sub>↓ + NaCl + H<sub>2</sub>O"
    ],
    [
        "Na[Al(OH)<sub>4</sub>]",
        "4HCl",
        "ppt",
        "Na[Al(OH)<sub>4</sub>] + 4HCl(过量) = AlCl<sub>3</sub> + NaCl + 4H<sub>2</sub>O"
    ],
    [
        "2Na[Al(OH)<sub>4</sub>]",
        "CO<sub>2</sub>",
        "ppt",
        "2Na[Al(OH)<sub>4</sub>] + CO<sub>2</sub>(少量) = 2Al(OH)<sub>3</sub>↓ + Na<sub>2</sub>CO<sub>3</sub> + 2H<sub>2</sub>O"
    ],
    [
        "Na[Al(OH)<sub>4</sub>]",
        "CO<sub>2</sub>",
        "ppt",
        "Na[Al(OH)<sub>4</sub>] + CO<sub>2</sub>(过量) = Al(OH)<sub>3</sub>↓ + NaHCO<sub>3</sub> + H<sub>2</sub>O"
    ],
    [
        "AlCl<sub>3</sub>",
        "3NaHCO<sub>3</sub>",
        "ppt",
        "AlCl<sub>3</sub> + 3NaHCO<sub>3</sub> = Al(OH)<sub>3</sub>↓ + 3NaCl + 3CO<sub>2</sub>↑"
    ],
    [
        "3Na[Al(OH)<sub>4</sub>]",
        "AlCl<sub>3</sub>",
        "ppt",
        "3Na[Al(OH)<sub>4</sub>] + AlCl<sub>3</sub> = 4Al(OH)<sub>3</sub>↓ + 3NaCl"
    ],
    [
        "2Fe",
        "3Br<sub>2</sub>",
        "",
        "2Fe + 3Br<sub>2</sub> = 2FeBr<sub>3</sub>"
    ],
    [
        "Fe",
        "I<sub>2</sub>",
        "",
        "Fe + I<sub>2</sub> = FeI<sub>2</sub>"
    ],
    [
        "Fe",
        "2HCl",
        "gas",
        "Fe + 2HCl = FeCl<sub>2</sub> + H<sub>2</sub>↑"
    ],
    [
        "Fe",
        "H<sub>2</sub>SO<sub>4</sub>",
        "gas",
        "Fe + H<sub>2</sub>SO<sub>4</sub> = FeSO<sub>4</sub> + H<sub>2</sub>↑"
    ],
    [
        "Fe",
        "CuSO<sub>4</sub>",
        "",
        "Fe + CuSO<sub>4</sub> = FeSO<sub>4</sub> + Cu"
    ],
    [
        "Fe",
        "2AgNO<sub>3</sub>",
        "",
        "Fe + 2AgNO<sub>3</sub> = Fe(NO<sub>3</sub>)<sub>2</sub> + 2Ag"
    ],
    [
        "FeO",
        "2HCl",
        "",
        "FeO + 2HCl = FeCl<sub>2</sub> + H<sub>2</sub>O"
    ],
    [
        "Fe<sub>2</sub>O<sub>3</sub>",
        "6HCl",
        "",
        "Fe<sub>2</sub>O<sub>3</sub> + 6HCl = 2FeCl<sub>3</sub> + 3H<sub>2</sub>O"
    ],
    [
        "Fe<sub>2</sub>O<sub>3</sub>",
        "3H<sub>2</sub>SO<sub>4</sub>",
        "",
        "Fe<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>SO<sub>4</sub> = Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>O"
    ],
    [
        "Fe<sub>3</sub>O<sub>4</sub>",
        "8HCl",
        "",
        "Fe<sub>3</sub>O<sub>4</sub> + 8HCl = FeCl<sub>2</sub> + 2FeCl<sub>3</sub> + 4H<sub>2</sub>O"
    ],
    [
        "FeCl<sub>2</sub>",
        "2NaOH",
        "ppt",
        "FeCl<sub>2</sub> + 2NaOH = Fe(OH)<sub>2</sub>↓ + 2NaCl"
    ],
    [
        "FeSO<sub>4</sub>",
        "2NaOH",
        "ppt",
        "FeSO<sub>4</sub> + 2NaOH = Fe(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>"
    ],
    [
        "FeCl<sub>3</sub>",
        "3NaOH",
        "ppt",
        "FeCl<sub>3</sub> + 3NaOH = Fe(OH)<sub>3</sub>↓ + 3NaCl"
    ],
    [
        "Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>",
        "6NaOH",
        "ppt",
        "Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6NaOH = 2Fe(OH)<sub>3</sub>↓ + 3Na<sub>2</sub>SO<sub>4</sub>"
    ],
    [
        "2FeCl<sub>2</sub>",
        "Cl<sub>2</sub>",
        "",
        "2FeCl<sub>2</sub> + Cl<sub>2</sub> = 2FeCl<sub>3</sub>"
    ],
    [
        "2FeCl<sub>3</sub>",
        "Fe",
        "",
        "2FeCl<sub>3</sub> + Fe = 3FeCl<sub>2</sub>"
    ],
    [
        "2FeCl<sub>3</sub>",
        "Cu",
        "",
        "2FeCl<sub>3</sub> + Cu = 2FeCl<sub>2</sub> + CuCl<sub>2</sub>"
    ],
    [
        "2FeCl<sub>3</sub>",
        "2KI",
        "",
        "2FeCl<sub>3</sub> + 2KI = 2FeCl<sub>2</sub> + 2KCl + I<sub>2</sub>"
    ],
    [
        "2FeCl<sub>3</sub>",
        "H<sub>2</sub>S",
        "ppt",
        "2FeCl<sub>3</sub> + H<sub>2</sub>S = 2FeCl<sub>2</sub> + 2HCl + S↓"
    ],
    [
        "FeCl<sub>3</sub>",
        "3KSCN",
        "",
        "FeCl<sub>3</sub> + 3KSCN = Fe(SCN)<sub>3</sub> + 3KCl"
    ],
    [
        "Fe³⁺",
        "3SCN⁻",
        "",
        "Fe³⁺ + 3SCN⁻ ⇌ Fe(SCN)<sub>3</sub>"
    ],
    [
        "Al³⁺",
        "3H<sub>2</sub>O",
        "",
        "Al³⁺ + 3H<sub>2</sub>O ⇌ Al(OH)<sub>3</sub> + 3H⁺"
    ],
    [
        "2KMnO<sub>4</sub>",
        "16HCl",
        "gas",
        "2KMnO<sub>4</sub> + 16HCl(浓) = 2KCl + 2MnCl<sub>2</sub> + 5Cl<sub>2</sub>↑ + 8H<sub>2</sub>O"
    ],
    [
        "Cl<sub>2</sub>",
        "H<sub>2</sub>O",
        "",
        "Cl<sub>2</sub> + H<sub>2</sub>O ⇌ HCl + HClO"
    ],
    [
        "Cl<sub>2</sub>",
        "2NaOH",
        "",
        "Cl<sub>2</sub> + 2NaOH = NaCl + NaClO + H<sub>2</sub>O"
    ],
    [
        "2Cl<sub>2</sub>",
        "2Ca(OH)<sub>2</sub>",
        "",
        "2Cl<sub>2</sub> + 2Ca(OH)<sub>2</sub> = CaCl<sub>2</sub> + Ca(ClO)<sub>2</sub> + 2H<sub>2</sub>O"
    ],
    [
        "Ca(ClO)<sub>2</sub>",
        "2HCl",
        "",
        "Ca(ClO)<sub>2</sub> + 2HCl = CaCl<sub>2</sub> + 2HClO"
    ],
    [
        "AgNO<sub>3</sub>",
        "HCl",
        "ppt",
        "AgNO<sub>3</sub> + HCl = AgCl↓ + HNO<sub>3</sub>"
    ],
    [
        "AgNO<sub>3</sub>",
        "NaCl",
        "ppt",
        "AgNO<sub>3</sub> + NaCl = AgCl↓ + NaNO<sub>3</sub>"
    ],
    [
        "AgNO<sub>3</sub>",
        "KCl",
        "ppt",
        "AgNO<sub>3</sub> + KCl = AgCl↓ + KNO<sub>3</sub>"
    ],
    [
        "Cl<sub>2</sub>",
        "2NaBr",
        "",
        "Cl<sub>2</sub> + 2NaBr = 2NaCl + Br<sub>2</sub>"
    ],
    [
        "Cl<sub>2</sub>",
        "2KI",
        "",
        "Cl<sub>2</sub> + 2KI = 2KCl + I<sub>2</sub>"
    ],
    [
        "Br<sub>2</sub>",
        "2KI",
        "",
        "Br<sub>2</sub> + 2KI = 2KBr + I<sub>2</sub>"
    ],
    [
        "Cl<sub>2</sub>",
        "2FeBr<sub>2</sub>",
        "",
        "Cl<sub>2</sub> + 2FeBr<sub>2</sub> = 2FeCl<sub>3</sub> + 2Br<sub>2</sub>"
    ],
    [
        "CuSO<sub>4</sub>",
        "5H<sub>2</sub>O",
        "",
        "CuSO<sub>4</sub> + 5H<sub>2</sub>O = CuSO<sub>4</sub>·5H<sub>2</sub>O"
    ],
    [
        "CuSO<sub>4</sub>",
        "2NaOH",
        "ppt",
        "CuSO<sub>4</sub> + 2NaOH = Cu(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>"
    ],
    [
        "CuCl<sub>2</sub>",
        "2NaOH",
        "ppt",
        "CuCl<sub>2</sub> + 2NaOH = Cu(OH)<sub>2</sub>↓ + 2NaCl"
    ],
    [
        "CuSO<sub>4</sub>",
        "Fe",
        "",
        "CuSO<sub>4</sub> + Fe = FeSO<sub>4</sub> + Cu"
    ],
    [
        "SO<sub>2</sub>",
        "H<sub>2</sub>O",
        "",
        "SO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>SO<sub>3</sub>"
    ],
    [
        "SO<sub>2</sub>",
        "2NaOH",
        "",
        "SO<sub>2</sub> + 2NaOH = Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O"
    ],
    [
        "SO<sub>2</sub>",
        "NaOH",
        "",
        "SO<sub>2</sub> + NaOH = NaHSO<sub>3</sub>"
    ],
    [
        "SO<sub>2</sub>",
        "Ca(OH)<sub>2</sub>",
        "ppt",
        "SO<sub>2</sub> + Ca(OH)<sub>2</sub> = CaSO<sub>3</sub>↓ + H<sub>2</sub>O"
    ],
    [
        "SO<sub>3</sub>",
        "H<sub>2</sub>O",
        "",
        "SO<sub>3</sub> + H<sub>2</sub>O = H<sub>2</sub>SO<sub>4</sub>"
    ],
    [
        "SO<sub>3</sub>",
        "Na<sub>2</sub>O",
        "",
        "SO<sub>3</sub> + Na<sub>2</sub>O = Na<sub>2</sub>SO<sub>4</sub>"
    ],
    [
        "SO<sub>3</sub>",
        "Ca(OH)<sub>2</sub>",
        "",
        "SO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaSO<sub>4</sub> + H<sub>2</sub>O"
    ],
    [
        "Zn",
        "2H<sub>2</sub>SO<sub>4</sub>",
        "gas",
        "Zn + 2H<sub>2</sub>SO<sub>4</sub>(浓) = ZnSO<sub>4</sub> + SO<sub>2</sub>↑ + 2H<sub>2</sub>O"
    ],
    [
        "C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>",
        "浓H<sub>2</sub>SO<sub>4</sub>",
        "",
        "C<sub>12</sub>H<sub>22</sub>O<sub>11</sub> + 浓H<sub>2</sub>SO<sub>4</sub> = 12C + 11H<sub>2</sub>O"
    ],
    [
        "NH<sub>3</sub>",
        "H<sub>2</sub>O",
        "",
        "NH<sub>3</sub> + H<sub>2</sub>O ⇌ NH<sub>3</sub>·H<sub>2</sub>O ⇌ NH<sub>4</sub>⁺ + OH⁻"
    ],
    [
        "NH<sub>3</sub>",
        "HCl",
        "gas",
        "NH<sub>3</sub> + HCl = NH<sub>4</sub>Cl"
    ],
    [
        "NH<sub>3</sub>",
        "HNO<sub>3</sub>",
        "",
        "NH<sub>3</sub> + HNO<sub>3</sub> = NH<sub>4</sub>NO<sub>3</sub>"
    ],
    [
        "NH<sub>3</sub>",
        "CH<sub>3</sub>COOH",
        "",
        "NH<sub>3</sub> + CH<sub>3</sub>COOH = CH<sub>3</sub>COONH<sub>4</sub>"
    ],
    [
        "2NO",
        "O<sub>2</sub>",
        "gas",
        "2NO + O<sub>2</sub> = 2NO<sub>2</sub>"
    ],
    [
        "3NO<sub>2</sub>",
        "H<sub>2</sub>O",
        "gas",
        "3NO<sub>2</sub> + H<sub>2</sub>O = 2HNO<sub>3</sub> + NO"
    ],
    [
        "3Cu",
        "8HNO<sub>3</sub>",
        "gas",
        "3Cu + 8HNO<sub>3</sub>(稀) = 3Cu(NO<sub>3</sub>)<sub>2</sub> + 2NO↑ + 4H<sub>2</sub>O"
    ],
    [
        "Cu",
        "4HNO<sub>3</sub>",
        "gas",
        "Cu + 4HNO<sub>3</sub>(浓) = Cu(NO<sub>3</sub>)<sub>2</sub> + 2NO<sub>2</sub>↑ + 2H<sub>2</sub>O"
    ],
    [
        "C",
        "4HNO<sub>3</sub>",
        "gas",
        "C + 4HNO<sub>3</sub>(浓) = CO<sub>2</sub>↑ + 4NO<sub>2</sub>↑ + 2H<sub>2</sub>O"
    ],
    [
        "S",
        "6HNO<sub>3</sub>",
        "gas",
        "S + 6HNO<sub>3</sub>(浓) = H<sub>2</sub>SO<sub>4</sub> + 6NO<sub>2</sub>↑ + 2H<sub>2</sub>O"
    ],
    [
        "CO<sub>2</sub>",
        "H<sub>2</sub>O",
        "",
        "CO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub>"
    ],
    [
        "CO<sub>2</sub>",
        "Ca(OH)<sub>2</sub>",
        "ppt",
        "CO<sub>2</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + H<sub>2</sub>O"
    ],
    [
        "CO<sub>2</sub>",
        "NaOH",
        "",
        "CO<sub>2</sub> + NaOH(少量) = NaHCO<sub>3</sub>"
    ],
    [
        "CO<sub>2</sub>",
        "2NaOH",
        "",
        "CO<sub>2</sub> + 2NaOH(过量) = Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O"
    ],
    [
        "SiO<sub>2</sub>",
        "4HF",
        "gas",
        "SiO<sub>2</sub> + 4HF = SiF<sub>4</sub>↑ + 2H<sub>2</sub>O"
    ],
    [
        "SiO<sub>2</sub>",
        "2NaOH",
        "",
        "SiO<sub>2</sub> + 2NaOH = Na<sub>2</sub>SiO<sub>3</sub> + H<sub>2</sub>O"
    ],
    [
        "C<sub>2</sub>H<sub>4</sub>",
        "Br<sub>2</sub>",
        "",
        "C<sub>2</sub>H<sub>4</sub> + Br<sub>2</sub> = CH<sub>2</sub>BrCH<sub>2</sub>Br"
    ],
    [
        "2CH<sub>3</sub>CH<sub>2</sub>OH",
        "2Na",
        "gas",
        "2CH<sub>3</sub>CH<sub>2</sub>OH + 2Na = 2CH<sub>3</sub>CH<sub>2</sub>ONa + H<sub>2</sub>↑"
    ],
    [
        "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>(葡萄糖)",
        "6O<sub>2</sub>",
        "",
        "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>(葡萄糖) + 6O<sub>2</sub> = 6CO<sub>2</sub> + 6H<sub>2</sub>O"
    ],
    [
        "H⁺",
        "OH⁻",
        "",
        "H⁺ + OH⁻ = H<sub>2</sub>O"
    ],
    [
        "Ba²⁺",
        "SO<sub>4</sub>²⁻",
        "ppt",
        "Ba²⁺ + SO<sub>4</sub>²⁻ = BaSO<sub>4</sub>↓"
    ],
    [
        "Ag⁺",
        "Cl⁻",
        "ppt",
        "Ag⁺ + Cl⁻ = AgCl↓"
    ],
    [
        "Fe³⁺",
        "3OH⁻",
        "ppt",
        "Fe³⁺ + 3OH⁻ = Fe(OH)<sub>3</sub>↓"
    ],
    [
        "CO<sub>3</sub>²⁻",
        "2H⁺",
        "gas",
        "CO<sub>3</sub>²⁻ + 2H⁺ = CO<sub>2</sub>↑ + H<sub>2</sub>O"
    ],
    [
        "HCO<sub>3</sub>⁻",
        "H⁺",
        "gas",
        "HCO<sub>3</sub>⁻ + H⁺ = CO<sub>2</sub>↑ + H<sub>2</sub>O"
    ],
    [
        "Fe³⁺",
        "3H<sub>2</sub>O",
        "",
        "Fe³⁺ + 3H<sub>2</sub>O ⇌ Fe(OH)<sub>3</sub> + 3H⁺"
    ],
    [
        "NH<sub>4</sub>⁺",
        "H<sub>2</sub>O",
        "",
        "NH<sub>4</sub>⁺ + H<sub>2</sub>O ⇌ NH<sub>3</sub>·H<sub>2</sub>O + H⁺"
    ],
    [
        "CO<sub>3</sub>²⁻",
        "H<sub>2</sub>O",
        "",
        "CO<sub>3</sub>²⁻ + H<sub>2</sub>O ⇌ HCO<sub>3</sub>⁻ + OH⁻"
    ],
    [
        "HCO<sub>3</sub>⁻",
        "H<sub>2</sub>O",
        "",
        "HCO<sub>3</sub>⁻ + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub> + OH⁻"
    ],
    [
        "CH<sub>3</sub>COO⁻",
        "H<sub>2</sub>O",
        "",
        "CH<sub>3</sub>COO⁻ + H<sub>2</sub>O ⇌ CH<sub>3</sub>COOH + OH⁻"
    ],
    [
        "Zn",
        "2H⁺",
        "gas",
        "Zn + 2H⁺ = Zn²⁺ + H<sub>2</sub>↑"
    ],
    [
        "2H<sub>2</sub>",
        "O<sub>2</sub>",
        "",
        "2H<sub>2</sub> + O<sub>2</sub> = 2H<sub>2</sub>O"
    ],
    [
        "CH<sub>4</sub>",
        "2O<sub>2</sub>",
        "",
        "CH<sub>4</sub> + 2O<sub>2</sub> = CO<sub>2</sub> + 2H<sub>2</sub>O"
    ],
    [
        "4Al",
        "3O<sub>2</sub>",
        "ppt",
        "4Al + 3O<sub>2</sub> = 2Al<sub>2</sub>O<sub>3</sub>"
    ],
    [
        "2Na",
        "O<sub>2</sub>",
        "fire",
        "2Na + O<sub>2</sub> = Na<sub>2</sub>O<sub>2</sub>"
    ],
    [
        "CO<sub>2</sub>",
        "H<sub>2</sub>O",
        "",
        "CO<sub>2</sub> + H<sub>2</sub>O = H<sub>2</sub>CO<sub>3</sub>"
    ],
    [
        "CaO",
        "H<sub>2</sub>O",
        "ppt",
        "CaO + H<sub>2</sub>O = Ca(OH)<sub>2</sub>"
    ],
    [
        "Zn",
        "H<sub>2</sub>SO<sub>4</sub>",
        "gas",
        "Zn + H<sub>2</sub>SO<sub>4</sub> = ZnSO<sub>4</sub> + H<sub>2</sub>↑"
    ],
    [
        "Mg",
        "H<sub>2</sub>SO<sub>4</sub>",
        "gas",
        "Mg + H<sub>2</sub>SO<sub>4</sub> = MgSO<sub>4</sub> + H<sub>2</sub>↑"
    ],
    [
        "Zn",
        "2HCl",
        "gas",
        "Zn + 2HCl = ZnCl<sub>2</sub> + H<sub>2</sub>↑"
    ],
    [
        "Mg",
        "2HCl",
        "gas",
        "Mg + 2HCl = MgCl<sub>2</sub> + H<sub>2</sub>↑"
    ],
    [
        "Zn",
        "CuSO<sub>4</sub>",
        "",
        "Zn + CuSO<sub>4</sub> = ZnSO<sub>4</sub> + Cu"
    ],
    [
        "Cu",
        "2AgNO<sub>3</sub>",
        "",
        "Cu + 2AgNO<sub>3</sub> = Cu(NO<sub>3</sub>)<sub>2</sub> + 2Ag"
    ],
    [
        "HCl",
        "NaOH",
        "",
        "HCl + NaOH = NaCl + H<sub>2</sub>O"
    ],
    [
        "H<sub>2</sub>SO<sub>4</sub>",
        "2NaOH",
        "",
        "H<sub>2</sub>SO<sub>4</sub> + 2NaOH = Na<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O"
    ],
    [
        "2HCl",
        "Ca(OH)<sub>2</sub>",
        "",
        "2HCl + Ca(OH)<sub>2</sub> = CaCl<sub>2</sub> + 2H<sub>2</sub>O"
    ],
    [
        "H<sub>2</sub>SO<sub>4</sub>",
        "Ca(OH)<sub>2</sub>",
        "",
        "H<sub>2</sub>SO<sub>4</sub> + Ca(OH)<sub>2</sub> = CaSO<sub>4</sub> + 2H<sub>2</sub>O"
    ],
    [
        "HCl",
        "KOH",
        "",
        "HCl + KOH = KCl + H<sub>2</sub>O"
    ],
    [
        "H<sub>2</sub>SO<sub>4</sub>",
        "2KOH",
        "",
        "H<sub>2</sub>SO<sub>4</sub> + 2KOH = K<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O"
    ],
    [
        "HNO<sub>3</sub>",
        "NaOH",
        "",
        "HNO<sub>3</sub> + NaOH = NaNO<sub>3</sub> + H<sub>2</sub>O"
    ],
    [
        "CaCO<sub>3</sub>",
        "2HCl",
        "gas",
        "CaCO<sub>3</sub> + 2HCl = CaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"
    ],
    [
        "MgCO<sub>3</sub>",
        "2HCl",
        "gas",
        "MgCO<sub>3</sub> + 2HCl = MgCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"
    ],
    [
        "BaCO<sub>3</sub>",
        "2HCl",
        "gas",
        "BaCO<sub>3</sub> + 2HCl = BaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"
    ],
    [
        "HCl",
        "AgNO<sub>3</sub>",
        "ppt",
        "HCl + AgNO<sub>3</sub> = AgCl↓ + HNO<sub>3</sub>"
    ],
    [
        "H<sub>2</sub>SO<sub>4</sub>",
        "BaCl<sub>2</sub>",
        "ppt",
        "H<sub>2</sub>SO<sub>4</sub> + BaCl<sub>2</sub> = BaSO<sub>4</sub>↓ + 2HCl"
    ],
    [
        "CuO",
        "2HCl",
        "",
        "CuO + 2HCl = CuCl<sub>2</sub> + H<sub>2</sub>O"
    ],
    [
        "CuO",
        "H<sub>2</sub>SO<sub>4</sub>",
        "",
        "CuO + H<sub>2</sub>SO<sub>4</sub> = CuSO<sub>4</sub> + H<sub>2</sub>O"
    ],
    [
        "MgO",
        "H<sub>2</sub>SO<sub>4</sub>",
        "",
        "MgO + H<sub>2</sub>SO<sub>4</sub> = MgSO<sub>4</sub> + H<sub>2</sub>O"
    ],
    [
        "CaO",
        "2HCl",
        "",
        "CaO + 2HCl = CaCl<sub>2</sub> + H<sub>2</sub>O"
    ],
    [
        "2NaOH",
        "CuSO<sub>4</sub>",
        "ppt",
        "2NaOH + CuSO<sub>4</sub> = Cu(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>"
    ],
    [
        "3NaOH",
        "FeCl<sub>3</sub>",
        "ppt",
        "3NaOH + FeCl<sub>3</sub> = Fe(OH)<sub>3</sub>↓ + 3NaCl"
    ],
    [
        "2NaOH",
        "MgCl<sub>2</sub>",
        "ppt",
        "2NaOH + MgCl<sub>2</sub> = Mg(OH)<sub>2</sub>↓ + 2NaCl"
    ],
    [
        "2NaOH",
        "CuCl<sub>2</sub>",
        "ppt",
        "2NaOH + CuCl<sub>2</sub> = Cu(OH)<sub>2</sub>↓ + 2NaCl"
    ],
    [
        "Ca(OH)<sub>2</sub>",
        "Na<sub>2</sub>CO<sub>3</sub>",
        "ppt",
        "Ca(OH)<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> = CaCO<sub>3</sub>↓ + 2NaOH"
    ],
    [
        "Ca(OH)<sub>2</sub>",
        "CuSO<sub>4</sub>",
        "ppt",
        "Ca(OH)<sub>2</sub> + CuSO<sub>4</sub> = Cu(OH)<sub>2</sub>↓ + CaSO<sub>4</sub>↓"
    ],
    [
        "NaCl",
        "AgNO<sub>3</sub>",
        "ppt",
        "NaCl + AgNO<sub>3</sub> = AgCl↓ + NaNO<sub>3</sub>"
    ],
    [
        "Na<sub>2</sub>SO<sub>4</sub>",
        "BaCl<sub>2</sub>",
        "ppt",
        "Na<sub>2</sub>SO<sub>4</sub> + BaCl<sub>2</sub> = BaSO<sub>4</sub>↓ + 2NaCl"
    ],
    [
        "CuSO<sub>4</sub>",
        "BaCl<sub>2</sub>",
        "ppt",
        "CuSO<sub>4</sub> + BaCl<sub>2</sub> = BaSO<sub>4</sub>↓ + CuCl<sub>2</sub>"
    ],
    [
        "2NaOH",
        "CO<sub>2</sub>",
        "",
        "2NaOH + CO<sub>2</sub> = Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O"
    ],
    [
        "Ca(OH)<sub>2</sub>",
        "CO<sub>2</sub>",
        "ppt",
        "Ca(OH)<sub>2</sub> + CO<sub>2</sub> = CaCO<sub>3</sub>↓ + H<sub>2</sub>O"
    ],
    [
        "2NaOH",
        "SO<sub>2</sub>",
        "",
        "2NaOH + SO<sub>2</sub> = Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O"
    ],
    [
        "Ca(OH)<sub>2</sub>",
        "SO<sub>2</sub>",
        "ppt",
        "Ca(OH)<sub>2</sub> + SO<sub>2</sub> = CaSO<sub>3</sub>↓ + H<sub>2</sub>O"
    ],
    [
        "2NaOH",
        "SO<sub>3</sub>",
        "",
        "2NaOH + SO<sub>3</sub> = Na<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O"
    ]
];

// ========================================
// 元素级靶向训练题库
// ========================================

const topicDB = {
    "sodium": [
        [
            "4Na",
            "O<sub>2</sub>",
            "",
            "4Na + O<sub>2</sub> = 2Na<sub>2</sub>O"
        ],
        [
            "2Na",
            "2H<sub>2</sub>O",
            "gas",
            "2Na + 2H<sub>2</sub>O = 2NaOH + H<sub>2</sub>↑"
        ],
        [
            "2Na",
            "2H⁺",
            "gas",
            "2Na + 2H⁺ = 2Na⁺ + H<sub>2</sub>↑"
        ],
        [
            "4Na",
            "TiCl<sub>4</sub>",
            "",
            "4Na + TiCl<sub>4</sub>(熔融) = 4NaCl + Ti"
        ],
        [
            "Na",
            "KCl",
            "gas",
            "Na + KCl(熔融) = NaCl + K↑"
        ],
        [
            "Na<sub>2</sub>O",
            "H<sub>2</sub>O",
            "",
            "Na<sub>2</sub>O + H<sub>2</sub>O = 2NaOH"
        ],
        [
            "Na<sub>2</sub>O",
            "CO<sub>2</sub>",
            "",
            "Na<sub>2</sub>O + CO<sub>2</sub> = Na<sub>2</sub>CO<sub>3</sub>"
        ],
        [
            "Na<sub>2</sub>O",
            "2HCl",
            "ppt",
            "Na<sub>2</sub>O + 2HCl = 2NaCl + H<sub>2</sub>O"
        ],
        [
            "Na<sub>2</sub>O",
            "SO<sub>2</sub>",
            "",
            "Na<sub>2</sub>O + SO<sub>2</sub> = Na<sub>2</sub>SO<sub>3</sub>"
        ],
        [
            "2Na<sub>2</sub>O<sub>2</sub>",
            "2H<sub>2</sub>O",
            "gas",
            "2Na<sub>2</sub>O<sub>2</sub> + 2H<sub>2</sub>O = 4NaOH + O<sub>2</sub>↑"
        ],
        [
            "2Na<sub>2</sub>O<sub>2</sub>",
            "2CO<sub>2</sub>",
            "gas",
            "2Na<sub>2</sub>O<sub>2</sub> + 2CO<sub>2</sub> = 2Na<sub>2</sub>CO<sub>3</sub> + O<sub>2</sub>↑"
        ],
        [
            "2Na<sub>2</sub>O<sub>2</sub>",
            "2HCl",
            "gas",
            "2Na<sub>2</sub>O<sub>2</sub> + 2HCl = 4NaCl + O<sub>2</sub>↑ + H<sub>2</sub>O"
        ],
        [
            "Na<sub>2</sub>O<sub>2</sub>",
            "SO<sub>2</sub>",
            "",
            "Na<sub>2</sub>O<sub>2</sub> + SO<sub>2</sub> = Na<sub>2</sub>SO<sub>4</sub>"
        ],
        [
            "2Na<sub>2</sub>O<sub>2</sub>",
            "2H<sub>2</sub>SO<sub>4</sub>",
            "gas",
            "2Na<sub>2</sub>O<sub>2</sub> + 2H<sub>2</sub>SO<sub>4</sub> = 2Na<sub>2</sub>SO<sub>4</sub> + O<sub>2</sub>↑ + 2H<sub>2</sub>O"
        ],
        [
            "NaHCO<sub>3</sub>",
            "NaOH",
            "",
            "NaHCO<sub>3</sub> + NaOH = Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O"
        ],
        [
            "Na<sub>2</sub>CO<sub>3</sub>",
            "HCl",
            "gas",
            "Na<sub>2</sub>CO<sub>3</sub> + HCl = NaHCO<sub>3</sub> + NaCl"
        ],
        [
            "Na<sub>2</sub>CO<sub>3</sub>",
            "2HCl",
            "gas",
            "Na<sub>2</sub>CO<sub>3</sub> + 2HCl = 2NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑"
        ],
        [
            "NaHCO<sub>3</sub>",
            "HCl",
            "gas",
            "NaHCO<sub>3</sub> + HCl = NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑"
        ],
        [
            "Na<sub>2</sub>CO<sub>3</sub>",
            "CaCl<sub>2</sub>",
            "ppt",
            "Na<sub>2</sub>CO<sub>3</sub> + CaCl<sub>2</sub> = CaCO<sub>3</sub>↓ + 2NaCl"
        ],
        [
            "Na<sub>2</sub>CO<sub>3</sub>",
            "BaCl<sub>2</sub>",
            "ppt",
            "Na<sub>2</sub>CO<sub>3</sub> + BaCl<sub>2</sub> = BaCO<sub>3</sub>↓ + 2NaCl"
        ],
        [
            "NaHCO<sub>3</sub>",
            "Ca(OH)<sub>2</sub>",
            "ppt",
            "NaHCO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + NaOH + H<sub>2</sub>O"
        ],
        [
            "2NaHCO<sub>3</sub>",
            "Ca(OH)<sub>2</sub>",
            "ppt",
            "2NaHCO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + Na<sub>2</sub>CO<sub>3</sub> + 2H<sub>2</sub>O"
        ],
        [
            "Na<sub>2</sub>CO<sub>3</sub>",
            "Ca(OH)<sub>2</sub>",
            "ppt",
            "Na<sub>2</sub>CO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + 2NaOH"
        ],
        [
            "NaH",
            "H<sub>2</sub>O",
            "gas",
            "NaH + H<sub>2</sub>O = NaOH + H<sub>2</sub>↑"
        ],
        [
            "Al<sub>2</sub>O<sub>3</sub>",
            "2NaOH",
            "ppt",
            "Al<sub>2</sub>O<sub>3</sub> + 2NaOH = 2NaAlO<sub>2</sub> + H<sub>2</sub>O"
        ],
        [
            "Al(OH)<sub>3</sub>",
            "NaOH",
            "ppt",
            "Al(OH)<sub>3</sub> + NaOH = Na[Al(OH)<sub>4</sub>]"
        ],
        [
            "AlCl<sub>3</sub>",
            "3NaOH",
            "ppt",
            "AlCl<sub>3</sub> + 3NaOH(少量) = Al(OH)<sub>3</sub>↓ + 3NaCl"
        ],
        [
            "AlCl<sub>3</sub>",
            "4NaOH",
            "ppt",
            "AlCl<sub>3</sub> + 4NaOH(过量) = Na[Al(OH)<sub>4</sub>] + 3NaCl"
        ],
        [
            "Na[Al(OH)<sub>4</sub>]",
            "HCl",
            "ppt",
            "Na[Al(OH)<sub>4</sub>] + HCl(少量) = Al(OH)<sub>3</sub>↓ + NaCl + H<sub>2</sub>O"
        ],
        [
            "Na[Al(OH)<sub>4</sub>]",
            "4HCl",
            "ppt",
            "Na[Al(OH)<sub>4</sub>] + 4HCl(过量) = AlCl<sub>3</sub> + NaCl + 4H<sub>2</sub>O"
        ],
        [
            "2Na[Al(OH)<sub>4</sub>]",
            "CO<sub>2</sub>",
            "ppt",
            "2Na[Al(OH)<sub>4</sub>] + CO<sub>2</sub>(少量) = 2Al(OH)<sub>3</sub>↓ + Na<sub>2</sub>CO<sub>3</sub> + 2H<sub>2</sub>O"
        ],
        [
            "Na[Al(OH)<sub>4</sub>]",
            "CO<sub>2</sub>",
            "ppt",
            "Na[Al(OH)<sub>4</sub>] + CO<sub>2</sub>(过量) = Al(OH)<sub>3</sub>↓ + NaHCO<sub>3</sub> + H<sub>2</sub>O"
        ],
        [
            "AlCl<sub>3</sub>",
            "3NaHCO<sub>3</sub>",
            "ppt",
            "AlCl<sub>3</sub> + 3NaHCO<sub>3</sub> = Al(OH)<sub>3</sub>↓ + 3NaCl + 3CO<sub>2</sub>↑"
        ],
        [
            "3Na[Al(OH)<sub>4</sub>]",
            "AlCl<sub>3</sub>",
            "ppt",
            "3Na[Al(OH)<sub>4</sub>] + AlCl<sub>3</sub> = 4Al(OH)<sub>3</sub>↓ + 3NaCl"
        ],
        [
            "FeCl<sub>2</sub>",
            "2NaOH",
            "ppt",
            "FeCl<sub>2</sub> + 2NaOH = Fe(OH)<sub>2</sub>↓ + 2NaCl"
        ],
        [
            "FeSO<sub>4</sub>",
            "2NaOH",
            "ppt",
            "FeSO<sub>4</sub> + 2NaOH = Fe(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>"
        ],
        [
            "FeCl<sub>3</sub>",
            "3NaOH",
            "ppt",
            "FeCl<sub>3</sub> + 3NaOH = Fe(OH)<sub>3</sub>↓ + 3NaCl"
        ],
        [
            "Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>",
            "6NaOH",
            "ppt",
            "Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6NaOH = 2Fe(OH)<sub>3</sub>↓ + 3Na<sub>2</sub>SO<sub>4</sub>"
        ],
        [
            "Cl<sub>2</sub>",
            "2NaOH",
            "",
            "Cl<sub>2</sub> + 2NaOH = NaCl + NaClO + H<sub>2</sub>O"
        ],
        [
            "AgNO<sub>3</sub>",
            "NaCl",
            "ppt",
            "AgNO<sub>3</sub> + NaCl = AgCl↓ + NaNO<sub>3</sub>"
        ],
        [
            "Cl<sub>2</sub>",
            "2NaBr",
            "",
            "Cl<sub>2</sub> + 2NaBr = 2NaCl + Br<sub>2</sub>"
        ],
        [
            "CuSO<sub>4</sub>",
            "2NaOH",
            "ppt",
            "CuSO<sub>4</sub> + 2NaOH = Cu(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>"
        ],
        [
            "CuCl<sub>2</sub>",
            "2NaOH",
            "ppt",
            "CuCl<sub>2</sub> + 2NaOH = Cu(OH)<sub>2</sub>↓ + 2NaCl"
        ],
        [
            "SO<sub>2</sub>",
            "2NaOH",
            "",
            "SO<sub>2</sub> + 2NaOH = Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O"
        ],
        [
            "SO<sub>2</sub>",
            "NaOH",
            "",
            "SO<sub>2</sub> + NaOH = NaHSO<sub>3</sub>"
        ],
        [
            "SO<sub>3</sub>",
            "Na<sub>2</sub>O",
            "",
            "SO<sub>3</sub> + Na<sub>2</sub>O = Na<sub>2</sub>SO<sub>4</sub>"
        ],
        [
            "CO<sub>2</sub>",
            "NaOH",
            "",
            "CO<sub>2</sub> + NaOH(少量) = NaHCO<sub>3</sub>"
        ],
        [
            "CO<sub>2</sub>",
            "2NaOH",
            "",
            "CO<sub>2</sub> + 2NaOH(过量) = Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O"
        ],
        [
            "SiO<sub>2</sub>",
            "2NaOH",
            "",
            "SiO<sub>2</sub> + 2NaOH = Na<sub>2</sub>SiO<sub>3</sub> + H<sub>2</sub>O"
        ],
        [
            "2CH<sub>3</sub>CH<sub>2</sub>OH",
            "2Na",
            "gas",
            "2CH<sub>3</sub>CH<sub>2</sub>OH + 2Na = 2CH<sub>3</sub>CH<sub>2</sub>ONa + H<sub>2</sub>↑"
        ]
    ],
    "aluminum": [
        [
            "4Al",
            "3O<sub>2</sub>",
            "",
            "4Al + 3O<sub>2</sub> = 2Al<sub>2</sub>O<sub>3</sub>"
        ],
        [
            "2Al",
            "3H<sub>2</sub>SO<sub>4</sub>",
            "gas",
            "2Al + 3H<sub>2</sub>SO<sub>4</sub> = Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>↑"
        ],
        [
            "2Al",
            "6HCl",
            "gas",
            "2Al + 6HCl = 2AlCl<sub>3</sub> + 3H<sub>2</sub>↑"
        ],
        [
            "Al<sub>2</sub>O<sub>3</sub>",
            "6HCl",
            "ppt",
            "Al<sub>2</sub>O<sub>3</sub> + 6HCl = 2AlCl<sub>3</sub> + 3H<sub>2</sub>O"
        ],
        [
            "Al<sub>2</sub>O<sub>3</sub>",
            "3H<sub>2</sub>SO<sub>4</sub>",
            "ppt",
            "Al<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>SO<sub>4</sub> = Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>O"
        ],
        [
            "Al(OH)<sub>3</sub>",
            "3HCl",
            "ppt",
            "Al(OH)<sub>3</sub> + 3HCl = AlCl<sub>3</sub> + 3H<sub>2</sub>O"
        ],
        [
            "Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>",
            "6NH<sub>3</sub>·H<sub>2</sub>O",
            "ppt",
            "Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6NH<sub>3</sub>·H<sub>2</sub>O = 2Al(OH)<sub>3</sub>↓ + 3(NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>"
        ],
        [
            "Al³⁺",
            "3H<sub>2</sub>O",
            "",
            "Al³⁺ + 3H<sub>2</sub>O ⇌ Al(OH)<sub>3</sub> + 3H⁺"
        ]
    ],
    "iron": [
        [
            "2Fe",
            "3Br<sub>2</sub>",
            "",
            "2Fe + 3Br<sub>2</sub> = 2FeBr<sub>3</sub>"
        ],
        [
            "Fe",
            "I<sub>2</sub>",
            "",
            "Fe + I<sub>2</sub> = FeI<sub>2</sub>"
        ],
        [
            "Fe",
            "2HCl",
            "gas",
            "Fe + 2HCl = FeCl<sub>2</sub> + H<sub>2</sub>↑"
        ],
        [
            "Fe",
            "H<sub>2</sub>SO<sub>4</sub>",
            "gas",
            "Fe + H<sub>2</sub>SO<sub>4</sub> = FeSO<sub>4</sub> + H<sub>2</sub>↑"
        ],
        [
            "Fe",
            "CuSO<sub>4</sub>",
            "",
            "Fe + CuSO<sub>4</sub> = FeSO<sub>4</sub> + Cu"
        ],
        [
            "Fe",
            "2AgNO<sub>3</sub>",
            "",
            "Fe + 2AgNO<sub>3</sub> = Fe(NO<sub>3</sub>)<sub>2</sub> + 2Ag"
        ],
        [
            "FeO",
            "2HCl",
            "",
            "FeO + 2HCl = FeCl<sub>2</sub> + H<sub>2</sub>O"
        ],
        [
            "Fe<sub>2</sub>O<sub>3</sub>",
            "6HCl",
            "",
            "Fe<sub>2</sub>O<sub>3</sub> + 6HCl = 2FeCl<sub>3</sub> + 3H<sub>2</sub>O"
        ],
        [
            "Fe<sub>2</sub>O<sub>3</sub>",
            "3H<sub>2</sub>SO<sub>4</sub>",
            "",
            "Fe<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>SO<sub>4</sub> = Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>O"
        ],
        [
            "Fe<sub>3</sub>O<sub>4</sub>",
            "8HCl",
            "",
            "Fe<sub>3</sub>O<sub>4</sub> + 8HCl = FeCl<sub>2</sub> + 2FeCl<sub>3</sub> + 4H<sub>2</sub>O"
        ],
        [
            "2FeCl<sub>2</sub>",
            "Cl<sub>2</sub>",
            "",
            "2FeCl<sub>2</sub> + Cl<sub>2</sub> = 2FeCl<sub>3</sub>"
        ],
        [
            "2FeCl<sub>3</sub>",
            "Fe",
            "",
            "2FeCl<sub>3</sub> + Fe = 3FeCl<sub>2</sub>"
        ],
        [
            "2FeCl<sub>3</sub>",
            "Cu",
            "",
            "2FeCl<sub>3</sub> + Cu = 2FeCl<sub>2</sub> + CuCl<sub>2</sub>"
        ],
        [
            "2FeCl<sub>3</sub>",
            "2KI",
            "",
            "2FeCl<sub>3</sub> + 2KI = 2FeCl<sub>2</sub> + 2KCl + I<sub>2</sub>"
        ],
        [
            "2FeCl<sub>3</sub>",
            "H<sub>2</sub>S",
            "ppt",
            "2FeCl<sub>3</sub> + H<sub>2</sub>S = 2FeCl<sub>2</sub> + 2HCl + S↓"
        ],
        [
            "FeCl<sub>3</sub>",
            "3KSCN",
            "",
            "FeCl<sub>3</sub> + 3KSCN = Fe(SCN)<sub>3</sub> + 3KCl"
        ],
        [
            "Fe³⁺",
            "3SCN⁻",
            "",
            "Fe³⁺ + 3SCN⁻ ⇌ Fe(SCN)<sub>3</sub>"
        ],
        [
            "Cl<sub>2</sub>",
            "2FeBr<sub>2</sub>",
            "",
            "Cl<sub>2</sub> + 2FeBr<sub>2</sub> = 2FeCl<sub>3</sub> + 2Br<sub>2</sub>"
        ],
        [
            "CuSO<sub>4</sub>",
            "Fe",
            "",
            "CuSO<sub>4</sub> + Fe = FeSO<sub>4</sub> + Cu"
        ],
        [
            "Fe³⁺",
            "3OH⁻",
            "ppt",
            "Fe³⁺ + 3OH⁻ = Fe(OH)<sub>3</sub>↓"
        ],
        [
            "Fe³⁺",
            "3H<sub>2</sub>O",
            "",
            "Fe³⁺ + 3H<sub>2</sub>O ⇌ Fe(OH)<sub>3</sub> + 3H⁺"
        ]
    ],
    "chlorine": [
        [
            "2KMnO<sub>4</sub>",
            "16HCl",
            "gas",
            "2KMnO<sub>4</sub> + 16HCl(浓) = 2KCl + 2MnCl<sub>2</sub> + 5Cl<sub>2</sub>↑ + 8H<sub>2</sub>O"
        ],
        [
            "Cl<sub>2</sub>",
            "H<sub>2</sub>O",
            "",
            "Cl<sub>2</sub> + H<sub>2</sub>O ⇌ HCl + HClO"
        ],
        [
            "2Cl<sub>2</sub>",
            "2Ca(OH)<sub>2</sub>",
            "",
            "2Cl<sub>2</sub> + 2Ca(OH)<sub>2</sub> = CaCl<sub>2</sub> + Ca(ClO)<sub>2</sub> + 2H<sub>2</sub>O"
        ],
        [
            "Ca(ClO)<sub>2</sub>",
            "2HCl",
            "",
            "Ca(ClO)<sub>2</sub> + 2HCl = CaCl<sub>2</sub> + 2HClO"
        ],
        [
            "AgNO<sub>3</sub>",
            "HCl",
            "ppt",
            "AgNO<sub>3</sub> + HCl = AgCl↓ + HNO<sub>3</sub>"
        ],
        [
            "Cl<sub>2</sub>",
            "2KI",
            "",
            "Cl<sub>2</sub> + 2KI = 2KCl + I<sub>2</sub>"
        ],
        [
            "NH<sub>3</sub>",
            "HCl",
            "gas",
            "NH<sub>3</sub> + HCl = NH<sub>4</sub>Cl"
        ]
    ],
    "sulfur": [
        [
            "CuSO<sub>4</sub>",
            "5H<sub>2</sub>O",
            "",
            "CuSO<sub>4</sub> + 5H<sub>2</sub>O = CuSO<sub>4</sub>·5H<sub>2</sub>O"
        ],
        [
            "SO<sub>2</sub>",
            "H<sub>2</sub>O",
            "",
            "SO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>SO<sub>3</sub>"
        ],
        [
            "SO<sub>2</sub>",
            "Ca(OH)<sub>2</sub>",
            "ppt",
            "SO<sub>2</sub> + Ca(OH)<sub>2</sub> = CaSO<sub>3</sub>↓ + H<sub>2</sub>O"
        ],
        [
            "SO<sub>3</sub>",
            "H<sub>2</sub>O",
            "",
            "SO<sub>3</sub> + H<sub>2</sub>O = H<sub>2</sub>SO<sub>4</sub>"
        ],
        [
            "SO<sub>3</sub>",
            "Ca(OH)<sub>2</sub>",
            "",
            "SO<sub>3</sub> + Ca(OH)<sub>2</sub> = CaSO<sub>4</sub> + H<sub>2</sub>O"
        ],
        [
            "Zn",
            "2H<sub>2</sub>SO<sub>4</sub>",
            "gas",
            "Zn + 2H<sub>2</sub>SO<sub>4</sub>(浓) = ZnSO<sub>4</sub> + SO<sub>2</sub>↑ + 2H<sub>2</sub>O"
        ],
        [
            "C<sub>12</sub>H<sub>22</sub>O<sub>11</sub>",
            "浓H<sub>2</sub>SO<sub>4</sub>",
            "",
            "C<sub>12</sub>H<sub>22</sub>O<sub>11</sub> + 浓H<sub>2</sub>SO<sub>4</sub> = 12C + 11H<sub>2</sub>O"
        ],
        [
            "S",
            "6HNO<sub>3</sub>",
            "gas",
            "S + 6HNO<sub>3</sub>(浓) = H<sub>2</sub>SO<sub>4</sub> + 6NO<sub>2</sub>↑ + 2H<sub>2</sub>O"
        ],
        [
            "SiO<sub>2</sub>",
            "4HF",
            "gas",
            "SiO<sub>2</sub> + 4HF = SiF<sub>4</sub>↑ + 2H<sub>2</sub>O"
        ],
        [
            "Ba²⁺",
            "SO<sub>4</sub>²⁻",
            "ppt",
            "Ba²⁺ + SO<sub>4</sub>²⁻ = BaSO<sub>4</sub>↓"
        ]
    ],
    "nitrogen": [
        [
            "AgNO<sub>3</sub>",
            "KCl",
            "ppt",
            "AgNO<sub>3</sub> + KCl = AgCl↓ + KNO<sub>3</sub>"
        ],
        [
            "NH<sub>3</sub>",
            "H<sub>2</sub>O",
            "",
            "NH<sub>3</sub> + H<sub>2</sub>O ⇌ NH<sub>3</sub>·H<sub>2</sub>O ⇌ NH<sub>4</sub>⁺ + OH⁻"
        ],
        [
            "NH<sub>3</sub>",
            "HNO<sub>3</sub>",
            "",
            "NH<sub>3</sub> + HNO<sub>3</sub> = NH<sub>4</sub>NO<sub>3</sub>"
        ],
        [
            "NH<sub>3</sub>",
            "CH<sub>3</sub>COOH",
            "",
            "NH<sub>3</sub> + CH<sub>3</sub>COOH = CH<sub>3</sub>COONH<sub>4</sub>"
        ],
        [
            "2NO",
            "O<sub>2</sub>",
            "gas",
            "2NO + O<sub>2</sub> = 2NO<sub>2</sub>"
        ],
        [
            "3NO<sub>2</sub>",
            "H<sub>2</sub>O",
            "gas",
            "3NO<sub>2</sub> + H<sub>2</sub>O = 2HNO<sub>3</sub> + NO"
        ],
        [
            "3Cu",
            "8HNO<sub>3</sub>",
            "gas",
            "3Cu + 8HNO<sub>3</sub>(稀) = 3Cu(NO<sub>3</sub>)<sub>2</sub> + 2NO↑ + 4H<sub>2</sub>O"
        ],
        [
            "Cu",
            "4HNO<sub>3</sub>",
            "gas",
            "Cu + 4HNO<sub>3</sub>(浓) = Cu(NO<sub>3</sub>)<sub>2</sub> + 2NO<sub>2</sub>↑ + 2H<sub>2</sub>O"
        ],
        [
            "C",
            "4HNO<sub>3</sub>",
            "gas",
            "C + 4HNO<sub>3</sub>(浓) = CO<sub>2</sub>↑ + 4NO<sub>2</sub>↑ + 2H<sub>2</sub>O"
        ],
        [
            "NH<sub>4</sub>⁺",
            "H<sub>2</sub>O",
            "",
            "NH<sub>4</sub>⁺ + H<sub>2</sub>O ⇌ NH<sub>3</sub>·H<sub>2</sub>O + H⁺"
        ]
    ],
    "copper": [],
    "magnesium": [],
    "zinc": [
        [
            "Zn",
            "2H⁺",
            "gas",
            "Zn + 2H⁺ = Zn²⁺ + H<sub>2</sub>↑"
        ]
    ],
    "calcium": [
        [
            "CO<sub>2</sub>",
            "Ca(OH)<sub>2</sub>",
            "ppt",
            "CO<sub>2</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + H<sub>2</sub>O"
        ]
    ],
    "carbon": [
        [
            "CO<sub>2</sub>",
            "H<sub>2</sub>O",
            "",
            "CO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub>"
        ],
        [
            "C<sub>2</sub>H<sub>4</sub>",
            "Br<sub>2</sub>",
            "",
            "C<sub>2</sub>H<sub>4</sub> + Br<sub>2</sub> = CH<sub>2</sub>BrCH<sub>2</sub>Br"
        ],
        [
            "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>(葡萄糖)",
            "6O<sub>2</sub>",
            "",
            "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>(葡萄糖) + 6O<sub>2</sub> = 6CO<sub>2</sub> + 6H<sub>2</sub>O"
        ],
        [
            "Ag⁺",
            "Cl⁻",
            "ppt",
            "Ag⁺ + Cl⁻ = AgCl↓"
        ],
        [
            "CO<sub>3</sub>²⁻",
            "2H⁺",
            "gas",
            "CO<sub>3</sub>²⁻ + 2H⁺ = CO<sub>2</sub>↑ + H<sub>2</sub>O"
        ],
        [
            "HCO<sub>3</sub>⁻",
            "H⁺",
            "gas",
            "HCO<sub>3</sub>⁻ + H⁺ = CO<sub>2</sub>↑ + H<sub>2</sub>O"
        ],
        [
            "CO<sub>3</sub>²⁻",
            "H<sub>2</sub>O",
            "",
            "CO<sub>3</sub>²⁻ + H<sub>2</sub>O ⇌ HCO<sub>3</sub>⁻ + OH⁻"
        ],
        [
            "HCO<sub>3</sub>⁻",
            "H<sub>2</sub>O",
            "",
            "HCO<sub>3</sub>⁻ + H<sub>2</sub>O ⇌ H<sub>2</sub>CO<sub>3</sub> + OH⁻"
        ],
        [
            "CH<sub>3</sub>COO⁻",
            "H<sub>2</sub>O",
            "",
            "CH<sub>3</sub>COO⁻ + H<sub>2</sub>O ⇌ CH<sub>3</sub>COOH + OH⁻"
        ],
        [
            "CH<sub>4</sub>",
            "2O<sub>2</sub>",
            "",
            "CH<sub>4</sub> + 2O<sub>2</sub> = CO<sub>2</sub> + 2H<sub>2</sub>O"
        ]
    ],
    "other": [
        [
            "Br<sub>2</sub>",
            "2KI",
            "",
            "Br<sub>2</sub> + 2KI = 2KBr + I<sub>2</sub>"
        ],
        [
            "H⁺",
            "OH⁻",
            "",
            "H⁺ + OH⁻ = H<sub>2</sub>O"
        ],
        [
            "2H<sub>2</sub>",
            "O<sub>2</sub>",
            "",
            "2H<sub>2</sub> + O<sub>2</sub> = 2H<sub>2</sub>O"
        ]
    ],
    "middleSchool": [
        [
            "4Al",
            "3O<sub>2</sub>",
            "ppt",
            "4Al + 3O<sub>2</sub> = 2Al<sub>2</sub>O<sub>3</sub>"
        ],
        [
            "2Na",
            "O<sub>2</sub>",
            "fire",
            "2Na + O<sub>2</sub> = Na<sub>2</sub>O<sub>2</sub>"
        ],
        [
            "CO<sub>2</sub>",
            "H<sub>2</sub>O",
            "",
            "CO<sub>2</sub> + H<sub>2</sub>O = H<sub>2</sub>CO<sub>3</sub>"
        ],
        [
            "CaO",
            "H<sub>2</sub>O",
            "ppt",
            "CaO + H<sub>2</sub>O = Ca(OH)<sub>2</sub>"
        ],
        [
            "SO<sub>2</sub>",
            "H<sub>2</sub>O",
            "",
            "SO<sub>2</sub> + H<sub>2</sub>O ⇌ H<sub>2</sub>SO<sub>3</sub>"
        ],
        [
            "SO<sub>3</sub>",
            "H<sub>2</sub>O",
            "",
            "SO<sub>3</sub> + H<sub>2</sub>O = H<sub>2</sub>SO<sub>4</sub>"
        ],
        [
            "NH<sub>3</sub>",
            "HCl",
            "gas",
            "NH<sub>3</sub> + HCl = NH<sub>4</sub>Cl"
        ],
        [
            "Zn",
            "H<sub>2</sub>SO<sub>4</sub>",
            "gas",
            "Zn + H<sub>2</sub>SO<sub>4</sub> = ZnSO<sub>4</sub> + H<sub>2</sub>↑"
        ],
        [
            "Fe",
            "H<sub>2</sub>SO<sub>4</sub>",
            "gas",
            "Fe + H<sub>2</sub>SO<sub>4</sub> = FeSO<sub>4</sub> + H<sub>2</sub>↑"
        ],
        [
            "Mg",
            "H<sub>2</sub>SO<sub>4</sub>",
            "gas",
            "Mg + H<sub>2</sub>SO<sub>4</sub> = MgSO<sub>4</sub> + H<sub>2</sub>↑"
        ],
        [
            "2Al",
            "3H<sub>2</sub>SO<sub>4</sub>",
            "gas",
            "2Al + 3H<sub>2</sub>SO<sub>4</sub> = Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>↑"
        ],
        [
            "Zn",
            "2HCl",
            "gas",
            "Zn + 2HCl = ZnCl<sub>2</sub> + H<sub>2</sub>↑"
        ],
        [
            "Fe",
            "2HCl",
            "gas",
            "Fe + 2HCl = FeCl<sub>2</sub> + H<sub>2</sub>↑"
        ],
        [
            "Mg",
            "2HCl",
            "gas",
            "Mg + 2HCl = MgCl<sub>2</sub> + H<sub>2</sub>↑"
        ],
        [
            "2Al",
            "6HCl",
            "gas",
            "2Al + 6HCl = 2AlCl<sub>3</sub> + 3H<sub>2</sub>↑"
        ],
        [
            "Fe",
            "CuSO<sub>4</sub>",
            "",
            "Fe + CuSO<sub>4</sub> = FeSO<sub>4</sub> + Cu"
        ],
        [
            "Zn",
            "CuSO<sub>4</sub>",
            "",
            "Zn + CuSO<sub>4</sub> = ZnSO<sub>4</sub> + Cu"
        ],
        [
            "Cu",
            "2AgNO<sub>3</sub>",
            "",
            "Cu + 2AgNO<sub>3</sub> = Cu(NO<sub>3</sub>)<sub>2</sub> + 2Ag"
        ],
        [
            "HCl",
            "NaOH",
            "",
            "HCl + NaOH = NaCl + H<sub>2</sub>O"
        ],
        [
            "H<sub>2</sub>SO<sub>4</sub>",
            "2NaOH",
            "",
            "H<sub>2</sub>SO<sub>4</sub> + 2NaOH = Na<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O"
        ],
        [
            "2HCl",
            "Ca(OH)<sub>2</sub>",
            "",
            "2HCl + Ca(OH)<sub>2</sub> = CaCl<sub>2</sub> + 2H<sub>2</sub>O"
        ],
        [
            "H<sub>2</sub>SO<sub>4</sub>",
            "Ca(OH)<sub>2</sub>",
            "",
            "H<sub>2</sub>SO<sub>4</sub> + Ca(OH)<sub>2</sub> = CaSO<sub>4</sub> + 2H<sub>2</sub>O"
        ],
        [
            "HCl",
            "KOH",
            "",
            "HCl + KOH = KCl + H<sub>2</sub>O"
        ],
        [
            "H<sub>2</sub>SO<sub>4</sub>",
            "2KOH",
            "",
            "H<sub>2</sub>SO<sub>4</sub> + 2KOH = K<sub>2</sub>SO<sub>4</sub> + 2H<sub>2</sub>O"
        ],
        [
            "HNO<sub>3</sub>",
            "NaOH",
            "",
            "HNO<sub>3</sub> + NaOH = NaNO<sub>3</sub> + H<sub>2</sub>O"
        ],
        [
            "CaCO<sub>3</sub>",
            "2HCl",
            "gas",
            "CaCO<sub>3</sub> + 2HCl = CaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"
        ],
        [
            "Na<sub>2</sub>CO<sub>3</sub>",
            "2HCl",
            "gas",
            "Na<sub>2</sub>CO<sub>3</sub> + 2HCl = 2NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑"
        ],
        [
            "NaHCO<sub>3</sub>",
            "HCl",
            "gas",
            "NaHCO<sub>3</sub> + HCl = NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑"
        ],
        [
            "MgCO<sub>3</sub>",
            "2HCl",
            "gas",
            "MgCO<sub>3</sub> + 2HCl = MgCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"
        ],
        [
            "BaCO<sub>3</sub>",
            "2HCl",
            "gas",
            "BaCO<sub>3</sub> + 2HCl = BaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"
        ],
        [
            "HCl",
            "AgNO<sub>3</sub>",
            "ppt",
            "HCl + AgNO<sub>3</sub> = AgCl↓ + HNO<sub>3</sub>"
        ],
        [
            "H<sub>2</sub>SO<sub>4</sub>",
            "BaCl<sub>2</sub>",
            "ppt",
            "H<sub>2</sub>SO<sub>4</sub> + BaCl<sub>2</sub> = BaSO<sub>4</sub>↓ + 2HCl"
        ],
        [
            "Fe<sub>2</sub>O<sub>3</sub>",
            "6HCl",
            "",
            "Fe<sub>2</sub>O<sub>3</sub> + 6HCl = 2FeCl<sub>3</sub> + 3H<sub>2</sub>O"
        ],
        [
            "Fe<sub>2</sub>O<sub>3</sub>",
            "3H<sub>2</sub>SO<sub>4</sub>",
            "",
            "Fe<sub>2</sub>O<sub>3</sub> + 3H<sub>2</sub>SO<sub>4</sub> = Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3H<sub>2</sub>O"
        ],
        [
            "CuO",
            "2HCl",
            "",
            "CuO + 2HCl = CuCl<sub>2</sub> + H<sub>2</sub>O"
        ],
        [
            "CuO",
            "H<sub>2</sub>SO<sub>4</sub>",
            "",
            "CuO + H<sub>2</sub>SO<sub>4</sub> = CuSO<sub>4</sub> + H<sub>2</sub>O"
        ],
        [
            "MgO",
            "H<sub>2</sub>SO<sub>4</sub>",
            "",
            "MgO + H<sub>2</sub>SO<sub>4</sub> = MgSO<sub>4</sub> + H<sub>2</sub>O"
        ],
        [
            "CaO",
            "2HCl",
            "",
            "CaO + 2HCl = CaCl<sub>2</sub> + H<sub>2</sub>O"
        ],
        [
            "2NaOH",
            "CuSO<sub>4</sub>",
            "ppt",
            "2NaOH + CuSO<sub>4</sub> = Cu(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>"
        ],
        [
            "3NaOH",
            "FeCl<sub>3</sub>",
            "ppt",
            "3NaOH + FeCl<sub>3</sub> = Fe(OH)<sub>3</sub>↓ + 3NaCl"
        ],
        [
            "2NaOH",
            "MgCl<sub>2</sub>",
            "ppt",
            "2NaOH + MgCl<sub>2</sub> = Mg(OH)<sub>2</sub>↓ + 2NaCl"
        ],
        [
            "2NaOH",
            "CuCl<sub>2</sub>",
            "ppt",
            "2NaOH + CuCl<sub>2</sub> = Cu(OH)<sub>2</sub>↓ + 2NaCl"
        ],
        [
            "Ca(OH)<sub>2</sub>",
            "Na<sub>2</sub>CO<sub>3</sub>",
            "ppt",
            "Ca(OH)<sub>2</sub> + Na<sub>2</sub>CO<sub>3</sub> = CaCO<sub>3</sub>↓ + 2NaOH"
        ],
        [
            "Ca(OH)<sub>2</sub>",
            "CuSO<sub>4</sub>",
            "ppt",
            "Ca(OH)<sub>2</sub> + CuSO<sub>4</sub> = Cu(OH)<sub>2</sub>↓ + CaSO<sub>4</sub>↓"
        ],
        [
            "NaCl",
            "AgNO<sub>3</sub>",
            "ppt",
            "NaCl + AgNO<sub>3</sub> = AgCl↓ + NaNO<sub>3</sub>"
        ],
        [
            "Na<sub>2</sub>SO<sub>4</sub>",
            "BaCl<sub>2</sub>",
            "ppt",
            "Na<sub>2</sub>SO<sub>4</sub> + BaCl<sub>2</sub> = BaSO<sub>4</sub>↓ + 2NaCl"
        ],
        [
            "Na<sub>2</sub>CO<sub>3</sub>",
            "CaCl<sub>2</sub>",
            "ppt",
            "Na<sub>2</sub>CO<sub>3</sub> + CaCl<sub>2</sub> = CaCO<sub>3</sub>↓ + 2NaCl"
        ],
        [
            "CuSO<sub>4</sub>",
            "BaCl<sub>2</sub>",
            "ppt",
            "CuSO<sub>4</sub> + BaCl<sub>2</sub> = BaSO<sub>4</sub>↓ + CuCl<sub>2</sub>"
        ],
        [
            "2NaOH",
            "CO<sub>2</sub>",
            "",
            "2NaOH + CO<sub>2</sub> = Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O"
        ],
        [
            "Ca(OH)<sub>2</sub>",
            "CO<sub>2</sub>",
            "ppt",
            "Ca(OH)<sub>2</sub> + CO<sub>2</sub> = CaCO<sub>3</sub>↓ + H<sub>2</sub>O"
        ],
        [
            "2NaOH",
            "SO<sub>2</sub>",
            "",
            "2NaOH + SO<sub>2</sub> = Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O"
        ],
        [
            "Ca(OH)<sub>2</sub>",
            "SO<sub>2</sub>",
            "ppt",
            "Ca(OH)<sub>2</sub> + SO<sub>2</sub> = CaSO<sub>3</sub>↓ + H<sub>2</sub>O"
        ],
        [
            "2NaOH",
            "SO<sub>3</sub>",
            "",
            "2NaOH + SO<sub>3</sub> = Na<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O"
        ],
        [
            "FeCl<sub>3</sub>",
            "3KSCN",
            "",
            "FeCl<sub>3</sub> + 3KSCN = Fe(SCN)<sub>3</sub> + 3KCl"
        ],
        [
            "CO<sub>2</sub>",
            "Ca(OH)<sub>2</sub>",
            "ppt",
            "CO<sub>2</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + H<sub>2</sub>O"
        ]
    ]
};

// ========================================
// Boss 关卡数据库
// ========================================

// 分解反应（单反应物）
const bossDecompDB = [
    {
        "reactant": "KAl(SO<sub>4</sub>)<sub>2</sub>·12H<sub>2</sub>O",
        "condition": "加热",
        "products": "K⁺ + Al³⁺ + 2SO₄²⁻ + 12H₂O"
    },
    {
        "reactant": "2NO<sub>2</sub>",
        "condition": "加热",
        "products": "N₂O₄"
    },
    {
        "reactant": "CH<sub>2</sub>",
        "condition": "加热",
        "products": "CH₂ + H₂O、 CH₃CH₂OH"
    },
    {
        "reactant": "nCH<sub>2</sub>",
        "condition": "加热",
        "products": "CH₂ (CH₂-CH₂)ₙ"
    },
    {
        "reactant": "CH<sub>3</sub>CH<sub>2</sub>OH、 CH<sub>2</sub>",
        "condition": "加热",
        "products": "CH₂↑ + H₂O"
    },
    {
        "reactant": "H<sub>2</sub>CO<sub>3</sub>",
        "condition": "加热",
        "products": "H₂O + CO₂↑"
    }
];

// 复杂反应（3+反应物）
const bossComplexDB = [
    [
        "2Al",
        "2NaOH",
        "6H<sub>2</sub>O"
    ],
    [
        "4Fe(OH)<sub>2</sub>",
        "O<sub>2</sub>",
        "2H<sub>2</sub>O"
    ],
    [
        "2FeSO<sub>4</sub>",
        "H<sub>2</sub>O<sub>2</sub>",
        "H<sub>2</sub>SO<sub>4</sub>"
    ],
    [
        "2FeCl<sub>3</sub>",
        "Na<sub>2</sub>SO<sub>3</sub>",
        "H<sub>2</sub>O"
    ],
    [
        "Ca(ClO)<sub>2</sub>",
        "CO<sub>2</sub>",
        "H<sub>2</sub>O"
    ],
    [
        "CaSO<sub>3</sub>",
        "SO<sub>2</sub>",
        "H<sub>2</sub>O"
    ],
    [
        "SO<sub>2</sub>",
        "Cl<sub>2</sub>",
        "2H<sub>2</sub>O"
    ],
    [
        "5SO<sub>2</sub>",
        "2KMnO<sub>4</sub>",
        "2H<sub>2</sub>O"
    ],
    [
        "4NO<sub>2</sub>",
        "O<sub>2</sub>",
        "2H<sub>2</sub>O"
    ],
    [
        "4NO",
        "3O<sub>2</sub>",
        "2H<sub>2</sub>O"
    ],
    [
        "CaCO<sub>3</sub>",
        "CO<sub>2</sub>",
        "H<sub>2</sub>O"
    ],
    [
        "2Al³⁺",
        "3SO<sub>4</sub>²⁻",
        "3Ba²⁺",
        "6OH⁻"
    ],
    [
        "2Cu",
        "4H⁺",
        "O<sub>2</sub>"
    ],
    [
        "2Fe",
        "O<sub>2</sub>",
        "2H<sub>2</sub>O"
    ]
];

// ========================================
// 自定义与拓展题库 (手动维护)
// 格式：[反应物A, 反应物B, 特效, 完整方程式]
// ========================================

const customDB = [
    // 格式：[反应物A, 反应物B, 特效(无则留空), 完整方程式]
    ["CH<sub>4</sub>", "2O<sub>2</sub>", "fire", "CH<sub>4</sub> + 2O<sub>2</sub> <small>点燃</small> CO<sub>2</sub> + 2H<sub>2</sub>O"],

    // === 1. 银盐与盐酸/盐酸盐的反应 ===
    ["AgNO<sub>3</sub>", "NaCl", "ppt", "AgNO<sub>3</sub> + NaCl = AgCl↓ + NaNO<sub>3</sub>"],
    ["AgNO<sub>3</sub>", "HCl", "ppt", "AgNO<sub>3</sub> + HCl = AgCl↓ + HNO<sub>3</sub>"],
    ["2AgNO<sub>3</sub>", "BaCl<sub>2</sub>", "ppt", "2AgNO<sub>3</sub> + BaCl<sub>2</sub> = 2AgCl↓ + Ba(NO<sub>3</sub>)<sub>2</sub>"],
    ["MgCl<sub>2</sub>", "2AgNO<sub>3</sub>", "ppt", "MgCl<sub>2</sub> + 2AgNO<sub>3</sub> = 2AgCl↓ + Mg(NO<sub>3</sub>)<sub>2</sub>"],
    ["AlCl<sub>3</sub>", "3AgNO<sub>3</sub>", "ppt", "AlCl<sub>3</sub> + 3AgNO<sub>3</sub> = 3AgCl↓ + Al(NO<sub>3</sub>)<sub>3</sub>"],

    // === 2. 常见金属之间的置换反应 ===
    ["Fe", "CuSO<sub>4</sub>", "", "Fe + CuSO<sub>4</sub> = FeSO<sub>4</sub> + Cu"],
    ["Cu", "2AgNO<sub>3</sub>", "", "Cu + 2AgNO<sub>3</sub> = Cu(NO<sub>3</sub>)<sub>2</sub> + 2Ag"],
    ["Zn", "FeSO<sub>4</sub>", "", "Zn + FeSO<sub>4</sub> = ZnSO<sub>4</sub> + Fe"],
    ["2Al", "3CuSO<sub>4</sub>", "", "2Al + 3CuSO<sub>4</sub> = Al<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 3Cu"],
    ["Zn", "CuSO<sub>4</sub>", "", "Zn + CuSO<sub>4</sub> = ZnSO<sub>4</sub> + Cu"],
    ["Fe", "2AgNO<sub>3</sub>", "", "Fe + 2AgNO<sub>3</sub> = Fe(NO<sub>3</sub>)<sub>2</sub> + 2Ag"],
    ["Cu", "Hg(NO<sub>3</sub>)<sub>2</sub>", "", "Cu + Hg(NO<sub>3</sub>)<sub>2</sub> = Cu(NO<sub>3</sub>)<sub>2</sub> + Hg"],

    // === 3. 碳酸盐/碳酸氢盐与强酸的反应 ===
    ["MgCO<sub>3</sub>", "2HCl", "gas", "MgCO<sub>3</sub> + 2HCl = MgCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["MgCO<sub>3</sub>", "H<sub>2</sub>SO<sub>4</sub>", "gas", "MgCO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> = MgSO<sub>4</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["Na<sub>2</sub>CO<sub>3</sub>", "2HCl", "gas", "Na<sub>2</sub>CO<sub>3</sub> + 2HCl = 2NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["CaCO<sub>3</sub>", "2HCl", "gas", "CaCO<sub>3</sub> + 2HCl = CaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["K<sub>2</sub>CO<sub>3</sub>", "H<sub>2</sub>SO<sub>4</sub>", "gas", "K<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> = K<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["BaCO<sub>3</sub>", "2HCl", "gas", "BaCO<sub>3</sub> + 2HCl = BaCl<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["NaHCO<sub>3</sub>", "HCl", "gas", "NaHCO<sub>3</sub> + HCl = NaCl + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["Na<sub>2</sub>CO<sub>3</sub>", "H<sub>2</sub>SO<sub>4</sub>", "gas", "Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> = Na<sub>2</sub>SO<sub>4</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["CaCO<sub>3</sub>", "H<sub>2</sub>SO<sub>4</sub>", "gas", "CaCO<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> = CaSO<sub>4</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["K<sub>2</sub>CO<sub>3</sub>", "2HNO<sub>3</sub>", "gas", "K<sub>2</sub>CO<sub>3</sub> + 2HNO<sub>3</sub> = 2KNO<sub>3</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["NaHCO<sub>3</sub>", "HNO<sub>3</sub>", "gas", "NaHCO<sub>3</sub> + HNO<sub>3</sub> = NaNO<sub>3</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],
    ["BaCO<sub>3</sub>", "2HNO<sub>3</sub>", "gas", "BaCO<sub>3</sub> + 2HNO<sub>3</sub> = Ba(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O + CO<sub>2</sub>↑"],

    // === 4. 生成常见氢氧化物沉淀的反应 ===
    ["2NaOH", "CuSO<sub>4</sub>", "ppt", "2NaOH + CuSO<sub>4</sub> = Cu(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>"],
    ["3NaOH", "FeCl<sub>3</sub>", "ppt", "3NaOH + FeCl<sub>3</sub> = Fe(OH)<sub>3</sub>↓ + 3NaCl"],
    ["2NaOH", "MgCl<sub>2</sub>", "ppt", "2NaOH + MgCl<sub>2</sub> = Mg(OH)<sub>2</sub>↓ + 2NaCl"],
    ["2NaOH", "FeSO<sub>4</sub>", "ppt", "2NaOH + FeSO<sub>4</sub> = Fe(OH)<sub>2</sub>↓ + Na<sub>2</sub>SO<sub>4</sub>"],
    ["CuSO<sub>4</sub>", "2KOH", "ppt", "CuSO<sub>4</sub> + 2KOH = Cu(OH)<sub>2</sub>↓ + K<sub>2</sub>SO<sub>4</sub>"],
    ["Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub>", "6NaOH", "ppt", "Fe<sub>2</sub>(SO<sub>4</sub>)<sub>3</sub> + 6NaOH = 2Fe(OH)<sub>3</sub>↓ + 3Na<sub>2</sub>SO<sub>4</sub>"],
    ["FeCl<sub>3</sub>", "3NH<sub>3</sub>·H<sub>2</sub>O", "ppt", "FeCl<sub>3</sub> + 3NH<sub>3</sub>·H<sub>2</sub>O = Fe(OH)<sub>3</sub>↓ + 3NH<sub>4</sub>Cl"],
    ["Fe(NO<sub>3</sub>)<sub>3</sub>", "3KOH", "ppt", "Fe(NO<sub>3</sub>)<sub>3</sub> + 3KOH = Fe(OH)<sub>3</sub>↓ + 3KNO<sub>3</sub>"],

    // === 5. 强酸与碱性氧化物的反应 ===
    ["CuO", "2HCl", "", "CuO + 2HCl = CuCl<sub>2</sub> + H<sub>2</sub>O"],
    ["Fe<sub>2</sub>O<sub>3</sub>", "6HCl", "", "Fe<sub>2</sub>O<sub>3</sub> + 6HCl = 2FeCl<sub>3</sub> + 3H<sub>2</sub>O"],
    ["CuO", "H<sub>2</sub>SO<sub>4</sub>", "", "CuO + H<sub>2</sub>SO<sub>4</sub> = CuSO<sub>4</sub> + H<sub>2</sub>O"],
    ["CuO", "2HNO<sub>3</sub>", "", "CuO + 2HNO<sub>3</sub> = Cu(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O"],
    ["Fe<sub>2</sub>O<sub>3</sub>", "6HNO<sub>3</sub>", "", "Fe<sub>2</sub>O<sub>3</sub> + 6HNO<sub>3</sub> = 2Fe(NO<sub>3</sub>)<sub>3</sub> + 3H<sub>2</sub>O"],
    ["MgO", "2HNO<sub>3</sub>", "", "MgO + 2HNO<sub>3</sub> = Mg(NO<sub>3</sub>)<sub>2</sub> + H<sub>2</sub>O"],
    ["MgO", "2HCl", "", "MgO + 2HCl = MgCl<sub>2</sub> + H<sub>2</sub>O"],

    // === 6. 酸性氧化物与强碱的反应 ===
    ["CaO", "CO<sub>2</sub>", "", "CaO + CO<sub>2</sub> = CaCO<sub>3</sub>"],
    ["CO<sub>2</sub>", "2NaOH", "", "CO<sub>2</sub> + 2NaOH = Na<sub>2</sub>CO<sub>3</sub> + H<sub>2</sub>O"],
    ["SO<sub>2</sub>", "2NaOH", "", "SO<sub>2</sub> + 2NaOH = Na<sub>2</sub>SO<sub>3</sub> + H<sub>2</sub>O"],
    ["CO<sub>2</sub>", "Ca(OH)<sub>2</sub>", "ppt", "CO<sub>2</sub> + Ca(OH)<sub>2</sub> = CaCO<sub>3</sub>↓ + H<sub>2</sub>O"],
    ["SO<sub>2</sub>", "Ca(OH)<sub>2</sub>", "ppt", "SO<sub>2</sub> + Ca(OH)<sub>2</sub> = CaSO<sub>3</sub>↓ + H<sub>2</sub>O"],

    // === 7. 酸与氨气的反应 ===
    ["NH<sub>3</sub>", "HCl", "gas", "NH<sub>3</sub> + HCl = NH<sub>4</sub>Cl"],
    ["2NH<sub>3</sub>", "H<sub>2</sub>SO<sub>4</sub>", "", "2NH<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub> = (NH<sub>4</sub>)<sub>2</sub>SO<sub>4</sub>"],
    ["NH<sub>3</sub>", "HNO<sub>3</sub>", "", "NH<sub>3</sub> + HNO<sub>3</sub> = NH<sub>4</sub>NO<sub>3</sub>"],

    // === 8. 氢氧化钡及钡盐的沉淀反应 ===
    ["Ba(OH)<sub>2</sub>", "H<sub>2</sub>SO<sub>4</sub>", "ppt", "Ba(OH)<sub>2</sub> + H<sub>2</sub>SO<sub>4</sub> = BaSO<sub>4</sub>↓ + 2H<sub>2</sub>O"],
    ["Ba(OH)<sub>2</sub>", "Na<sub>2</sub>SO<sub>4</sub>", "ppt", "Ba(OH)<sub>2</sub> + Na<sub>2</sub>SO<sub>4</sub> = BaSO<sub>4</sub>↓ + 2NaOH"],
    ["Ba(OH)<sub>2</sub>", "CuSO<sub>4</sub>", "ppt", "Ba(OH)<sub>2</sub> + CuSO<sub>4</sub> = BaSO<sub>4</sub>↓ + Cu(OH)<sub>2</sub>↓"],
    ["Ba(OH)<sub>2</sub>", "CO<sub>2</sub>", "ppt", "Ba(OH)<sub>2</sub> + CO<sub>2</sub> = BaCO<sub>3</sub>↓ + H<sub>2</sub>O"],

    // === 9. 卤素单质与金属的燃烧 ===
    ["2Na", "Cl<sub>2</sub>", "fire", "2Na + Cl<sub>2</sub> <small>点燃</small> 2NaCl"],
    ["2Fe", "3Cl<sub>2</sub>", "fire", "2Fe + 3Cl<sub>2</sub> <small>点燃</small> 2FeCl<sub>3</sub>"],
    ["Cu", "Cl<sub>2</sub>", "fire", "Cu + Cl<sub>2</sub> <small>点燃</small> CuCl<sub>2</sub>"]
];

// ========================================
// 合并所有题库到全局数据库
// ========================================

const allReactions = [...reactionDB, ...customDB];
