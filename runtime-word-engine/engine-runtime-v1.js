(function () {
  'use strict';

  var DATA = window.__WORD_ENGINE_DATA_V1__ || { graph: { concepts: [], curriculum_mappings: [] }, heart_word_intro: {} };
  var conceptIndex = {};
  (DATA.graph.concepts || []).forEach(function (c) { conceptIndex[c.concept_id] = c; });

  var KNOWN_MULTI = [
    'tch', 'dge', 'igh', 'eigh', 'augh', 'ough', 'tion', 'sion', 'ture',
    'air', 'are', 'ear', 'ore',
    'ng', 'nk', 'sh', 'th', 'ch', 'wh', 'ph', 'ck',
    'ai', 'ay', 'ee', 'ea', 'ey', 'oa', 'oe', 'ow', 'ou', 'oi', 'oy', 'oo', 'ue', 'ew', 'ui', 'au', 'aw',
    'er', 'ir', 'ur', 'ar', 'or',
    'kn', 'wr', 'gn', 'mb',
    'all', 'oll', 'ull', 'ild', 'ind', 'old', 'olt', 'ost'
  ];

  var FPR_LEVEL_BANDS = [
    { maxUnit: 8, level: 'Grade K, Level K', levelRank: 0, levelUnit: function (u) { return u; } },
    { maxUnit: 16, level: 'Grade 1, Level A', levelRank: 1, levelUnit: function (u) { return u - 8; } },
    { maxUnit: 24, level: 'Grade 2, Level B', levelRank: 2, levelUnit: function (u) { return u - 16; } },
    { maxUnit: 30, level: 'Grade 3, Level C', levelRank: 3, levelUnit: function (u) { return u - 24; } }
  ];

  function normalizeWord(word) {
    return String(word || '').toLowerCase().replace(/[^a-z']/g, '');
  }

  function curriculumRank(curriculum, programLevel) {
    var level = String(programLevel || '').trim().toLowerCase();
    if (curriculum === 'Fundations') {
      if (level.indexOf('1') >= 0) return 1;
      if (level.indexOf('2') >= 0) return 2;
      return null;
    }
    if (curriculum === 'UFLI Foundations') {
      var order = { 'k': 0, 'kindergarten': 0, 'first': 1, '1': 1, 'first grade': 1, 'second': 2, '2': 2, 'second grade': 2 };
      return Object.prototype.hasOwnProperty.call(order, level) ? order[level] : null;
    }
    if (curriculum === 'From Phonics to Reading') {
      var fprOrder = {
        'grade k, level k': 0, 'k': 0, 'level k': 0,
        'grade 1, level a': 1, 'level a': 1,
        'grade 2, level b': 2, 'level b': 2,
        'grade 3, level c': 3, 'level c': 3
      };
      return Object.prototype.hasOwnProperty.call(fprOrder, level) ? fprOrder[level] : null;
    }
    return null;
  }

  function mapGameConfigToEngine(config) {
    var program = config.program;
    var unit = Number(config.unit || 1);
    if (program === 'fundations') {
      return {
        gameProgram: program,
        engineCurriculum: 'Fundations',
        engineProgramLevel: unit <= 10 ? 'Level 1' : 'Level 2',
        engineUnit: unit <= 10 ? unit : unit - 10,
        mappingPath: 'fundations->Fundations ' + (unit <= 10 ? 'Level 1' : 'Level 2') + ' Unit ' + (unit <= 10 ? unit : unit - 10)
      };
    }
    if (program === 'ufli') {
      var lvl = unit <= 64 ? 'K' : (unit <= 96 ? 'First' : 'Second');
      return {
        gameProgram: program,
        engineCurriculum: 'UFLI Foundations',
        engineProgramLevel: lvl,
        engineUnit: unit,
        mappingPath: 'ufli->UFLI Foundations ' + lvl + ' Unit ' + unit
      };
    }
    if (program === 'from_phonics_to_reading') {
      var band = FPR_LEVEL_BANDS[FPR_LEVEL_BANDS.length - 1];
      for (var i = 0; i < FPR_LEVEL_BANDS.length; i += 1) {
        if (unit <= FPR_LEVEL_BANDS[i].maxUnit) { band = FPR_LEVEL_BANDS[i]; break; }
      }
      var levelUnit = Math.max(1, band.levelUnit(unit));
      return {
        gameProgram: program,
        engineCurriculum: 'From Phonics to Reading',
        engineProgramLevel: band.level,
        engineUnit: levelUnit,
        mappingPath: 'from_phonics_to_reading->' + band.level + ' Unit ' + levelUnit + ' (global unit ' + unit + ')'
      };
    }
    return null;
  }

  function taughtConcepts(curriculum, programLevel, unitNumber) {
    var taught = new Set();
    var selectedRank = curriculumRank(curriculum, programLevel);
    var selectedUnit = Number(unitNumber || 1);
    (DATA.graph.curriculum_mappings || []).forEach(function (row) {
      if (!row || row.curriculum !== curriculum || !row.concept_id) return;
      var rowLevel = row.program_level;
      var rowUnit = Number(row.unit_number || 9999);
      var rowRank = curriculumRank(curriculum, rowLevel);
      var include = false;
      if (selectedRank !== null && rowRank !== null) {
        if (rowRank < selectedRank) include = true;
        else if (rowRank === selectedRank && rowUnit <= selectedUnit) include = true;
      } else {
        include = String(rowLevel) === String(programLevel) && rowUnit <= selectedUnit;
      }
      if (include) taught.add(row.concept_id);
    });
    return taught;
  }

  function parseGraphemes(word) {
    var out = [];
    var i = 0;
    var w = normalizeWord(word);
    while (i < w.length) {
      if (i + 2 < w.length && /[aeiou]/.test(w[i]) && /[a-z]/.test(w[i + 1]) && w[i + 2] === 'e') {
        var pattern = w[i] + '_e';
        if (pattern === 'a_e' || pattern === 'i_e' || pattern === 'o_e' || pattern === 'u_e' || pattern === 'e_e') {
          out.push(pattern);
          i += 1;
          continue;
        }
      }
      var matched = '';
      for (var k = 0; k < KNOWN_MULTI.length; k += 1) {
        var g = KNOWN_MULTI[k];
        if (w.slice(i, i + g.length) === g && g.length > matched.length) matched = g;
      }
      if (matched) {
        out.push(matched);
        i += matched.length;
      } else {
        out.push(w[i]);
        i += 1;
      }
    }
    return out;
  }

  function featureSet(word) {
    var w = normalizeWord(word);
    var gs = parseGraphemes(w);
    var feats = new Set();

    if (/^[bcdfghjklmnpqrstvwxyz]?[aeiou][bcdfghjklmnpqrstvwxyz]$/.test(w)) feats.add('pattern_vc_cvc');
    if (gs.indexOf('sh') >= 0) feats.add('digraph_sh');
    if (gs.indexOf('ch') >= 0) feats.add('digraph_ch');
    if (gs.indexOf('wh') >= 0) feats.add('digraph_wh');
    if (gs.indexOf('ph') >= 0) feats.add('digraph_ph');
    if (gs.indexOf('ck') >= 0) feats.add('digraph_ck');
    if (gs.indexOf('tch') >= 0) feats.add('digraph_tch');
    if (gs.indexOf('dge') >= 0) feats.add('digraph_dge');
    if (gs.indexOf('th') >= 0) {
      feats.add('digraph_th_voiced');
      feats.add('digraph_th_unvoiced');
      feats.add('digraph_th_any');
    }
    if (gs.indexOf('ng') >= 0) { feats.add('pattern_glued_ng_nk'); feats.add('digraph_ng'); }
    if (gs.indexOf('nk') >= 0) { feats.add('pattern_glued_ng_nk'); feats.add('digraph_nk'); }
    if (gs.indexOf('all') >= 0 || gs.indexOf('oll') >= 0 || gs.indexOf('ull') >= 0) feats.add('pattern_all_oll_ull');
    if (gs.indexOf('all') >= 0) feats.add('pattern_all');
    if (gs.indexOf('oll') >= 0) feats.add('pattern_oll');
    if (gs.indexOf('ull') >= 0) feats.add('pattern_ull');
    if (w.indexOf('ff') >= 0 || w.indexOf('ll') >= 0 || w.indexOf('ss') >= 0 || w.indexOf('zz') >= 0) feats.add('pattern_bonus_letters');

    if (gs.indexOf('a_e') >= 0) { feats.add('syllable_vce'); feats.add('vce_a_e'); feats.add('vce_general'); }
    if (gs.indexOf('i_e') >= 0) { feats.add('syllable_vce'); feats.add('vce_i_e'); feats.add('vce_general'); }
    if (gs.indexOf('o_e') >= 0) { feats.add('syllable_vce'); feats.add('vce_o_e'); feats.add('vce_general'); }
    if (gs.indexOf('u_e') >= 0) { feats.add('syllable_vce'); feats.add('vce_u_e'); feats.add('vce_general'); }
    if (gs.indexOf('e_e') >= 0) { feats.add('syllable_vce'); feats.add('vce_e_e'); feats.add('vce_general'); }

    if (gs.indexOf('ai') >= 0) { feats.add('vteam_ai_ay'); feats.add('vowel_team_ai'); feats.add('long_a_family'); }
    if (gs.indexOf('ay') >= 0) { feats.add('vteam_ai_ay'); feats.add('vowel_team_ay'); feats.add('long_a_family'); }
    if (gs.indexOf('ee') >= 0) { feats.add('vteam_ee_ea_ey'); feats.add('vowel_team_ee'); feats.add('long_e_family'); }
    if (gs.indexOf('ea') >= 0) { feats.add('vteam_ee_ea_ey'); feats.add('vowel_team_ea_long_e'); feats.add('long_e_family'); }
    if (gs.indexOf('ey') >= 0) { feats.add('vteam_ee_ea_ey'); feats.add('vowel_team_ey_long_e'); feats.add('long_e_family'); }
    if (gs.indexOf('oa') >= 0) { feats.add('vteam_oa_ow_oe'); feats.add('vowel_team_oa'); feats.add('long_o_family'); }
    if (gs.indexOf('oe') >= 0) { feats.add('vteam_oa_ow_oe'); feats.add('vowel_team_oe'); feats.add('long_o_family'); }
    if (gs.indexOf('ow') >= 0) { feats.add('vteam_oa_ow_oe'); feats.add('vteam_ow_long_o'); feats.add('diphthong_ou_ow'); feats.add('diphthong_ow'); feats.add('vowel_team_ow_long_o'); feats.add('diphthong_ow_ou_sound'); }
    if (gs.indexOf('oi') >= 0) { feats.add('diphthong_oi_oy'); feats.add('diphthong_oi'); feats.add('diphthong_oi_oy_family'); }
    if (gs.indexOf('oy') >= 0) { feats.add('diphthong_oi_oy'); feats.add('diphthong_oy'); feats.add('diphthong_oi_oy_family'); }
    if (gs.indexOf('ou') >= 0) { feats.add('diphthong_ou_ow'); feats.add('diphthong_ou'); feats.add('diphthong_ou_ow_family'); }
    if (gs.indexOf('oo') >= 0) { feats.add('vteam_oo_u'); feats.add('vowel_team_oo_long'); }
    if (gs.indexOf('ue') >= 0) { feats.add('vteam_ew_ui_ue'); feats.add('vowel_team_ue'); }
    if (gs.indexOf('ew') >= 0) { feats.add('vteam_ew_ui_ue'); feats.add('vowel_team_ew'); }
    if (gs.indexOf('ui') >= 0) { feats.add('vowel_team_ui'); }
    if (gs.indexOf('igh') >= 0) { feats.add('vteam_ie_igh'); feats.add('vowel_team_igh'); }
    if (gs.indexOf('ie') >= 0) { feats.add('vteam_ie_igh'); feats.add('vowel_team_ie_long_i'); }
    if (gs.indexOf('au') >= 0) feats.add('vteam_au_aw_augh');
    if (gs.indexOf('aw') >= 0) feats.add('vteam_au_aw_augh');
    if (gs.indexOf('augh') >= 0) feats.add('vteam_au_aw_augh');

    if (gs.indexOf('ar') >= 0) { feats.add('rcontrolled_ar'); feats.add('syllable_r_controlled'); }
    if (gs.indexOf('or') >= 0 || gs.indexOf('ore') >= 0) { feats.add('rcontrolled_or_ore'); feats.add('syllable_r_controlled'); }
    if (gs.indexOf('er') >= 0) { feats.add('rcontrolled_er'); feats.add('rcontrolled_er_spellings'); feats.add('syllable_r_controlled'); }
    if (gs.indexOf('ir') >= 0 || gs.indexOf('ur') >= 0) { feats.add('rcontrolled_ir_ur'); feats.add('rcontrolled_er_spellings'); feats.add('syllable_r_controlled'); }
    if (gs.indexOf('air') >= 0 || gs.indexOf('are') >= 0 || gs.indexOf('ear') >= 0) feats.add('lf_air_spellings');
    if (gs.indexOf('ear') >= 0) feats.add('lf_ear_sound');

    if (/(^|[bcdfghjklmnpqrstvwxyz])y$/.test(w)) { feats.add('pattern_y_long_i'); feats.add('final_y_long_i'); }
    if (/y$/.test(w) || /ey/.test(w)) { feats.add('pattern_y_long_e'); feats.add('final_y_long_e'); }
    if ((w.match(/[aeiouy]+/g) || []).length >= 2) feats.add('multisyllable_concept');

    if (/s$/.test(w)) feats.add('pattern_plural_s');
    if (/es$/.test(w)) feats.add('pattern_plural_es');
    if (/ed$/.test(w)) feats.add('suffix_ed');
    if (/ing$/.test(w)) feats.add('suffix_ing');
    if (/ly$/.test(w)) feats.add('suffix_ly');
    if (/y$/.test(w)) feats.add('suffix_y');
    if (/ness$/.test(w)) feats.add('suffix_ness');
    if (/ment$/.test(w)) feats.add('suffix_ment');
    if (/ful$|less$/.test(w)) feats.add('suffix_less_ful');
    if (/ive$/.test(w)) feats.add('suffix_ive');
    if (/^(un)/.test(w)) feats.add('prefix_un');
    if (/^(pre|re)/.test(w)) feats.add('prefix_pre_re');
    if (/^dis/.test(w)) feats.add('prefix_dis');
    if (/^(mis|un|non|dis|trans)/.test(w)) feats.add('prefix_mis_un_non_dis_trans');
    if (/^(uni|bi|tri)/.test(w)) feats.add('prefix_numeric_uni_bi_tri');

    if (gs.indexOf('kn') >= 0) { feats.add('pattern_silent_letters'); feats.add('silent_kn'); feats.add('digraph_kn'); }
    if (gs.indexOf('wr') >= 0) { feats.add('pattern_silent_letters'); feats.add('silent_wr'); feats.add('digraph_wr'); }
    if (gs.indexOf('gn') >= 0) { feats.add('pattern_silent_letters'); feats.add('silent_gn'); feats.add('digraph_gn'); }
    if (gs.indexOf('mb') >= 0) { feats.add('pattern_silent_letters'); feats.add('silent_mb'); feats.add('digraph_mb'); }
    if (/ce|ge/.test(w)) feats.add('pattern_final_ce_ge');
    if (/c/.test(w)) feats.add('pattern_soft_c');
    if (/g/.test(w)) feats.add('pattern_soft_g');
    if (/ild|ind|old|olt|ost/.test(w)) feats.add('pattern_closed_syllable_exceptions');
    if (/ild/.test(w)) feats.add('pattern_ild');
    if (/ind/.test(w)) feats.add('pattern_ind');
    if (/old/.test(w)) feats.add('pattern_old');
    if (/olt/.test(w)) feats.add('pattern_olt');
    if (/ost/.test(w)) feats.add('pattern_ost');

    if (gs.indexOf('tion') >= 0 || /tion/.test(w)) { feats.add('trigraph_tion'); feats.add('suffix_tion'); feats.add('suffix_tion_sion'); feats.add('final_stable_tion'); }
    if (gs.indexOf('sion') >= 0 || /sion/.test(w)) { feats.add('trigraph_sion'); feats.add('suffix_sion'); feats.add('suffix_tion_sion'); feats.add('final_stable_sion'); }
    if (gs.indexOf('ture') >= 0 || /ture/.test(w)) { feats.add('trigraph_ture'); feats.add('pattern_ture'); feats.add('suffix_ture'); feats.add('final_stable_ture'); }

    return { graphemes: gs, features: Array.from(feats) };
  }

  function getHeartIntro(curriculum, level, word) {
    var map = (((DATA.heart_word_intro || {})[curriculum] || {})[level] || {});
    return Object.prototype.hasOwnProperty.call(map, word) ? map[word] : null;
  }

  function analyzeWord(word, config) {
    var map = mapGameConfigToEngine(config || {});
    if (!map) return { error: 'unsupported_config' };
    var clean = normalizeWord(word);
    if (!clean) return null;
    var parsed = featureSet(clean);
    var taught = taughtConcepts(map.engineCurriculum, map.engineProgramLevel, map.engineUnit);
    var supported = [];
    var blocked = [];
    parsed.features.forEach(function (cid) {
      if (!conceptIndex[cid]) return;
      if (cid === 'digraph_th_any') {
        var thTaught = taught.has('digraph_th_voiced') || taught.has('digraph_th_unvoiced') || taught.has('digraph_th_any');
        if (thTaught) supported.push(cid); else blocked.push(cid);
        return;
      }
      if (taught.has(cid)) supported.push(cid); else blocked.push(cid);
    });

    var introduced = getHeartIntro(map.engineCurriculum, map.engineProgramLevel, clean);
    var heartWord = introduced !== null;
    var heartAllowed = heartWord && introduced <= map.engineUnit;
    var label = blocked.length === 0 ? 'decodable' : (heartAllowed ? 'heart_word' : 'review');
    var allowed = blocked.length === 0 || heartAllowed;

    return {
      word: clean,
      mappingPath: map.mappingPath,
      engineCurriculum: map.engineCurriculum,
      engineProgramLevel: map.engineProgramLevel,
      engineUnit: map.engineUnit,
      graphemes: parsed.graphemes,
      label: label,
      allowed: allowed,
      blocked_features: blocked,
      supported_features: supported,
      heartIntroducedAt: introduced,
      earliestDecodableAt: blocked.length ? map.engineUnit + 1 : map.engineUnit,
      confidence: Math.max(0.5, Math.min(0.98, 0.88 - (blocked.length * 0.03))),
      isHeartScheduled: heartWord,
      reasons: blocked.length ? ['Contains untaught concept(s) for selected scope.'] : ['All detected concepts taught in selected scope.']
    };
  }

  function tierFor(result, config, toggles, freq) {
    var unit = Number(config.unit || 1);
    if (result.isHeartScheduled && result.heartIntroducedAt === result.engineUnit) return 'A_NEW';
    if (result.blocked_features.length === 0) return 'D_ON_LEVEL';
    if (result.isHeartScheduled && result.heartIntroducedAt !== null && result.heartIntroducedAt > result.engineUnit) return 'C_PREVIEW';
    var below = result.earliestDecodableAt <= unit - (config.program === 'fundations' ? 3 : 10);
    if (below && !toggles.includeBelowLevelDecodableReview && !toggles.includeEarlierHeartWords && freq < 2) return 'E_BELOW_EXCLUDE';
    return 'B_REVIEW';
  }

  function scoreFor(tier, freq, toggles, confidence) {
    var base = { 'A_NEW': 100, 'B_REVIEW': 80, 'C_PREVIEW': 60, 'D_ON_LEVEL': 40, 'E_BELOW_EXCLUDE': -999 }[tier] || 0;
    if (toggles.prioritizeRepeatedWords && freq >= 2) base += 10;
    base += Math.round((confidence - 0.5) * 20);
    return base;
  }

  function analyzeSelection(tokens, config, toggles) {
    var t = Object.assign({ includeEarlierHeartWords: false, includeBelowLevelDecodableReview: false, prioritizeRepeatedWords: true }, toggles || {});
    var freq = {};
    (tokens || []).forEach(function (tok) {
      var n = normalizeWord(tok);
      if (!n) return;
      freq[n] = (freq[n] || 0) + 1;
    });

    var rows = [];
    (tokens || []).forEach(function (tok) {
      var n = normalizeWord(tok);
      if (!n) return;
      var res = analyzeWord(tok, config);
      if (!res) return;
      var tier = tierFor(res, config, t, freq[n] || 1);
      var score = scoreFor(tier, freq[n] || 1, t, res.confidence);
      rows.push({
        word: tok,
        normalized: n,
        tier: tier,
        score: score,
        reasons: res.reasons,
        isSelected: false,
        confidence: res.confidence,
        earliestDecodableAt: res.earliestDecodableAt,
        heartIntroducedAt: res.heartIntroducedAt,
        isHeartScheduled: res.isHeartScheduled,
        conceptsBlocked: res.blocked_features,
        conceptsSupported: res.supported_features,
        mappingPath: res.mappingPath,
        label: res.label,
        allowed: res.allowed
      });
    });

    rows.sort(function (a, b) { return b.score - a.score; });
    var seen = new Set();
    var selected = [];
    for (var i = 0; i < rows.length; i += 1) {
      var row = rows[i];
      if (row.tier === 'E_BELOW_EXCLUDE') continue;
      if (seen.has(row.normalized)) continue;
      row.isSelected = true;
      selected.push(row.normalized);
      seen.add(row.normalized);
      if (selected.length >= 12) break;
    }

    return { selected: selected, audit: rows };
  }

  function getCurriculumConfig(program) {
    if (program === 'fundations') return { key: program, display: 'Fundations', minUnit: 1, maxUnit: 14 };
    if (program === 'ufli') return { key: program, display: 'UFLI Foundations', minUnit: 1, maxUnit: 128 };
    if (program === 'from_phonics_to_reading') return { key: program, display: 'From Phonics to Reading', minUnit: 1, maxUnit: 30 };
    return null;
  }

  function validateConfig(config) {
    var c = getCurriculumConfig(config && config.program);
    if (!c) return { valid: false, reason: 'unknown_program' };
    var unit = Number(config.unit || 1);
    if (unit < c.minUnit || unit > c.maxUnit) return { valid: false, reason: 'unit_out_of_range' };
    return { valid: true };
  }

  window.WordEngineRuntime = {
    version: '1.0.0',
    compatSchemaVersion: '1',
    analyzeWord: analyzeWord,
    analyzeSelection: analyzeSelection,
    getCurriculumConfig: getCurriculumConfig,
    validateConfig: validateConfig,
    adaptGameConfigToEngine: mapGameConfigToEngine
  };
})();
