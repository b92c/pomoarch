/**
 * PomoTimer :: Arch Linux (r/unixporn) + 8-Bit Arcade Engine
 */

const STORAGE_KEYS = {
  STATE: 'pomotimer_arch_state_v1',
  TASKS: 'pomotimer_arch_tasks_v1',
};

const SUPPORTED_LANGS = ['en', 'pt'];

function detectClientLanguage(navObj = typeof navigator !== 'undefined' ? navigator : undefined) {
  const candidates =
    navObj && Array.isArray(navObj.languages) && navObj.languages.length > 0
      ? navObj.languages
      : [navObj?.language || 'en'];
  const primary = String(candidates[0] || 'en').toLowerCase();
  return primary.startsWith('pt') ? 'pt' : 'en';
}

function normalizeLang(lang) {
  return lang === 'pt' ? 'pt' : 'en';
}

const I18N = {
  en: {
    wsNavAria: 'WM Workspaces',
    wsAllTitle: 'Show all windows',
    wsTimerTitle: 'Focus Timer',
    wsTasksTitle: 'Focus Tasks',
    wsFetchTitle: 'Focus Fastfetch',
    wsManTitle: 'Focus Manual',
    sfxBtnTitle: 'Toggle 8-bit audio',
    crtBtnTitle: 'Toggle CRT effect',
    themeBtnTitle: 'Switch Mocha / Latte theme',
    langBtnTitle: 'Switch language (EN / PT)',
    settingsBtnTitle: 'Edit dotfiles.conf',
    clockAria: 'System clock',
    modeTabsAria: 'Pomodoro modes',
    tabFocusLabel: 'POMODORO',
    tabShortLabel: 'SHORT BREAK',
    tabLongLabel: 'LONG BREAK',
    sessionMinLabel: 'SESSION (MIN)',
    breakMinLabel: 'BREAK (MIN)',
    decSessionAria: 'Decrease session time',
    incSessionAria: 'Increase session time',
    decBreakAria: 'Decrease break time',
    incBreakAria: 'Increase break time',
    hpProgressLabel: 'HP / PROGRESS',
    btnStart: '[▶ START]',
    btnPause: '[⏸ PAUSE]',
    btnReset: '[↻ RESET]',
    btnNext: '[⏭ NEXT]',
    stateRunning: '[RUNNING]',
    stateIdle: '[IDLE]',
    substatusExecuting: '> EXECUTING {mode}...',
    substatusReady: '> {mode} :: READY',
    tickerActive: 'ACTIVE',
    tickerStandby: 'STANDBY',
    hudLevel: 'LVL {level} ARCH RICER',
    hudCompletedLabel: 'COMPLETED:',
    hudCycleLabel: 'CYCLE:',
    tasksPendingBadge: '[{count} PENDING]',
    activeQuestTag: '[ACTIVE QUEST]',
    activeQuestNone: 'No quest selected — click [🎯]',
    taskPlaceholder: 'e.g., configure hyprland.conf...',
    taskTagAria: 'Task tag',
    taskEstAria: 'Estimated pomodoros',
    filterGroupAria: 'Filter tasks',
    filterAll: 'ALL',
    filterPending: 'PENDING',
    filterCleared: 'CLEARED',
    clearCompletedTitle: 'Remove completed tasks',
    emptyQuests: '> no quests in this filter.',
    focusQuestTitle: 'Set as Active Quest',
    deleteQuestTitle: 'Delete quest',
    fetchFocusLabel: 'Focus Time:',
    fetchClearedLabel: 'Cleared Quests:',
    fetchStreakLabel: 'Streak:',
    streakUnit: 'cycles',
    manTabsAria: 'Manual sections',
    manTabKeys: 'KEYBINDINGS',
    manTabFeatures: 'FEATURES',
    manTabPricing: 'PRICING',
    manTabAbout: 'ABOUT',
    manPanelKeys: `
      <p class="man-heading">NAME</p>
      <p class="man-indent">pomotimer — r/unixporn + 8-bit RPG HUD Pomodoro timer</p>
      <p class="man-heading">KEYBINDINGS</p>
      <table class="man-table">
        <tbody>
          <tr><td><kbd>Space</kbd></td><td>Start / Pause current timer</td></tr>
          <tr><td><kbd>R</kbd></td><td>Reset current timer phase</td></tr>
          <tr><td><kbd>N</kbd></td><td>Skip to next phase (Focus / Break)</td></tr>
          <tr><td><kbd>/</kbd></td><td>Focus <code>$ task add</code> input</td></tr>
          <tr><td><kbd>1</kbd> - <kbd>3</kbd></td><td>Switch mode (Pomodoro / Short / Long)</td></tr>
        </tbody>
      </table>`,
    manPanelFeatures: `
      <p class="man-heading">POMODORO ENGINE</p>
      <p class="man-indent">Alternate deep focus blocks (25m default) with short breaks (5m) and long breaks (15m). Adjust durations inline or in <code>dotfiles.conf</code> with 8-bit chiptune alerts.</p>
      <p class="man-heading">QUEST LOG (TO-DO LIST)</p>
      <p class="man-indent">Manage tasks with tags, pomodoro estimates, and Active Quest targeting. Data is saved automatically in your browser (localStorage + cookies).</p>`,
    manPanelPricing: `
      <p class="man-heading">LICENSE &amp; PRICING</p>
      <p class="man-indent"><strong class="c-green">FREE FOREVER (GPL / FOSS Spirit):</strong> 100% free, no hidden fees, no subscriptions, and zero distractions. Pure Arch Linux productivity.</p>`,
    manPanelAbout: `
      <p class="man-heading">POMODORO TECHNIQUE</p>
      <p class="man-indent">Created by Francesco Cirillo in the late 1980s, it breaks work into 25-minute intervals separated by short breaks to maintain focus, avoid burnout, and beat procrastination. Take a long break every 4 cycles.</p>`,
    closeSettingsAria: 'Close settings',
    confComment: '# Edit PomoTimer environment variables',
    cfgLangLabel: 'LOCALE_LANG =',
    btnCancel: '[ESC: CANCEL]',
    btnSave: '[💾 :wq SAVE]',
  },
  pt: {
    wsNavAria: 'Workspaces do WM',
    wsAllTitle: 'Mostrar todas as janelas',
    wsTimerTitle: 'Focar Timer',
    wsTasksTitle: 'Focar Tasks',
    wsFetchTitle: 'Focar Fastfetch',
    wsManTitle: 'Focar Manual',
    sfxBtnTitle: 'Alternar áudio 8-bit',
    crtBtnTitle: 'Alternar efeito CRT',
    themeBtnTitle: 'Alternar tema Mocha / Latte',
    langBtnTitle: 'Alternar idioma (EN / PT)',
    settingsBtnTitle: 'Editar dotfiles.conf',
    clockAria: 'Relógio do sistema',
    modeTabsAria: 'Modos do Pomodoro',
    tabFocusLabel: 'POMODORO',
    tabShortLabel: 'PAUSA CURTA',
    tabLongLabel: 'PAUSA LONGA',
    sessionMinLabel: 'SESSÃO (MIN)',
    breakMinLabel: 'PAUSA (MIN)',
    decSessionAria: 'Diminuir tempo de sessão',
    incSessionAria: 'Aumentar tempo de sessão',
    decBreakAria: 'Diminuir tempo de pausa',
    incBreakAria: 'Aumentar tempo de pausa',
    hpProgressLabel: 'HP / PROGRESSO',
    btnStart: '[▶ INICIAR]',
    btnPause: '[⏸ PAUSAR]',
    btnReset: '[↻ RESETAR]',
    btnNext: '[⏭ PRÓXIMO]',
    stateRunning: '[RODANDO]',
    stateIdle: '[PARADO]',
    substatusExecuting: '> EXECUTANDO {mode}...',
    substatusReady: '> {mode} :: PRONTO',
    tickerActive: 'ATIVO',
    tickerStandby: 'AGUARDANDO',
    hudLevel: 'NVL {level} ARCH RICER',
    hudCompletedLabel: 'CONCLUÍDOS:',
    hudCycleLabel: 'CICLO:',
    tasksPendingBadge: '[{count} PENDENTES]',
    activeQuestTag: '[QUEST ATIVA]',
    activeQuestNone: 'Nenhuma quest selecionada — clique em [🎯]',
    taskPlaceholder: 'ex: configurar hyprland.conf...',
    taskTagAria: 'Tag da tarefa',
    taskEstAria: 'Pomodoros estimados',
    filterGroupAria: 'Filtrar tarefas',
    filterAll: 'TODAS',
    filterPending: 'PENDENTES',
    filterCleared: 'CONCLUÍDAS',
    clearCompletedTitle: 'Remover tarefas concluídas',
    emptyQuests: '> nenhuma quest neste filtro.',
    focusQuestTitle: 'Definir como Quest Ativa',
    deleteQuestTitle: 'Excluir quest',
    fetchFocusLabel: 'Tempo de Foco:',
    fetchClearedLabel: 'Quests Concluídas:',
    fetchStreakLabel: 'Sequência:',
    streakUnit: 'ciclos',
    manTabsAria: 'Seções do Manual',
    manTabKeys: 'ATALHOS',
    manTabFeatures: 'RECURSOS',
    manTabPricing: 'PREÇO',
    manTabAbout: 'SOBRE',
    manPanelKeys: `
      <p class="man-heading">NOME</p>
      <p class="man-indent">pomotimer — cronômetro Pomodoro r/unixporn + 8-bit RPG HUD</p>
      <p class="man-heading">ATALHOS</p>
      <table class="man-table">
        <tbody>
          <tr><td><kbd>Space</kbd></td><td>Iniciar / Pausar timer atual</td></tr>
          <tr><td><kbd>R</kbd></td><td>Resetar fase do cronômetro</td></tr>
          <tr><td><kbd>N</kbd></td><td>Avançar para próxima fase (Foco / Pausa)</td></tr>
          <tr><td><kbd>/</kbd></td><td>Focar campo <code>$ task add</code></td></tr>
          <tr><td><kbd>1</kbd> - <kbd>3</kbd></td><td>Alternar modo (Pomodoro / Curta / Longa)</td></tr>
        </tbody>
      </table>`,
    manPanelFeatures: `
      <p class="man-heading">MOTOR POMODORO</p>
      <p class="man-indent">Alterne blocos de foco intenso (padrão 25m) com pausas curtas (5m) e longas (15m). Ajuste durações inline ou em <code>dotfiles.conf</code> com alertas 8-bit chiptune.</p>
      <p class="man-heading">QUEST LOG (LISTA DE TAREFAS)</p>
      <p class="man-indent">Gerencie tarefas com tags, estimativa de pomodoros e seleção de Quest Ativa. Seus dados são salvos automaticamente no navegador (localStorage + cookies).</p>`,
    manPanelPricing: `
      <p class="man-heading">LICENÇA &amp; PREÇO</p>
      <p class="man-indent"><strong class="c-green">GRÁTIS PARA SEMPRE (Espírito GPL / FOSS):</strong> 100% gratuito, sem taxas ocultas, sem assinaturas e sem distrações. Produtividade pura no estilo Arch Linux.</p>`,
    manPanelAbout: `
      <p class="man-heading">TÉCNICA POMODORO</p>
      <p class="man-indent">Criada por Francesco Cirillo no final dos anos 80, divide o trabalho em intervalos de 25 minutos separados por pausas curtas para manter o foco, evitar burnout e vencer a procrastinação. A cada 4 ciclos, faça uma pausa longa.</p>`,
    closeSettingsAria: 'Fechar configurações',
    confComment: '# Edite as variáveis de ambiente do PomoTimer',
    cfgLangLabel: 'LOCALE_LANG =',
    btnCancel: '[ESC: CANCELAR]',
    btnSave: '[💾 :wq SALVAR]',
  },
};

const DEFAULT_TASKS_I18N = {
  en: {
    q1: 'pacman -Syu && configure dotfiles',
    q2: 'Complete 1 Deep Work cycle',
    q3: 'Review study notes',
  },
  pt: {
    q1: 'pacman -Syu && configurar dotfiles',
    q2: 'Completar 1 ciclo de Deep Work',
    q3: 'Revisar anotações de estudo',
  },
};

function buildDefaultTasks(lang) {
  const dict = DEFAULT_TASKS_I18N[normalizeLang(lang)];
  return [
    { id: 'q1', text: dict.q1, tag: 'RICE', est: 2, donePomos: 0, completed: false },
    { id: 'q2', text: dict.q2, tag: 'CODE', est: 1, donePomos: 0, completed: false },
    { id: 'q3', text: dict.q3, tag: 'STUDY', est: 2, donePomos: 1, completed: true },
  ];
}

const DEFAULT_CONFIG = {
  focusMin: 25,
  shortBreakMin: 5,
  longBreakMin: 15,
  autoBreak: false,
  autoFocus: false,
  sfxEnabled: true,
  sfxVolume: 50,
  crtEnabled: true,
  theme: 'mocha',
  lang: 'en',
};

const state = {
  config: { ...DEFAULT_CONFIG },
  mode: 'focus', // 'focus' | 'shortBreak' | 'longBreak'
  isRunning: false,
  timeLeft: DEFAULT_CONFIG.focusMin * 60,
  totalTime: DEFAULT_CONFIG.focusMin * 60,
  intervalId: null,
  completedPomos: 0,
  focusMinutesTotal: 0,
  streak: 0,
  xp: 0,
  level: 1,
  cycle: 1,
  activeQuestId: null,
  taskFilter: 'all',
  tasks: [],
};

function t(key, vars = {}) {
  const lang = normalizeLang(state.config.lang);
  let str = I18N[lang]?.[key] ?? I18N.en[key] ?? key;
  for (const [k, v] of Object.entries(vars)) {
    str = str.replaceAll(`{${k}}`, String(v));
  }
  return str;
}

// DOM References
const el =
  typeof document !== 'undefined'
    ? {
        waybarClock: document.getElementById('waybarClock'),
        waybarTicker: document.getElementById('waybarTicker'),
        wmGrid: document.getElementById('wmGrid'),
        wsBtns: document.querySelectorAll('.ws-btn'),
        windows: document.querySelectorAll('.wm-window'),
        toggleSfxBtn: document.getElementById('toggleSfxBtn'),
        toggleCrtBtn: document.getElementById('toggleCrtBtn'),
        toggleThemeBtn: document.getElementById('toggleThemeBtn'),
        toggleLangBtn: document.getElementById('toggleLangBtn'),
        openSettingsBtn: document.getElementById('openSettingsBtn'),
        dialog: document.getElementById('dotfiles-dialog'),
        dotfilesForm: document.getElementById('dotfilesForm'),
        cfgFocusMin: document.getElementById('cfgFocusMin'),
        cfgShortMin: document.getElementById('cfgShortMin'),
        cfgLongMin: document.getElementById('cfgLongMin'),
        cfgVolume: document.getElementById('cfgVolume'),
        cfgLang: document.getElementById('cfgLang'),
        cfgAutoBreak: document.getElementById('cfgAutoBreak'),
        cfgAutoFocus: document.getElementById('cfgAutoFocus'),
        cfgCrt: document.getElementById('cfgCrt'),

        // Timer
        timerStateBadge: document.getElementById('timerStateBadge'),
        arcadeStage: document.getElementById('arcadeStage'),
        timerDisplay: document.getElementById('timerDisplay'),
        timerSubstatus: document.getElementById('timerSubstatus'),
        hpSegments: document.getElementById('hpSegments'),
        hpPercentText: document.getElementById('hpPercentText'),
        nativeProgress: document.getElementById('nativeProgress'),
        startPauseBtn: document.getElementById('startPauseBtn'),
        resetBtn: document.getElementById('resetBtn'),
        nextBtn: document.getElementById('nextBtn'),
        modeTabs: document.querySelectorAll('.mode-tab'),
        tabFocusMin: document.getElementById('tabFocusMin'),
        tabShortMin: document.getElementById('tabShortMin'),
        tabLongMin: document.getElementById('tabLongMin'),
        quickSessionVal: document.getElementById('quickSessionVal'),
        quickBreakVal: document.getElementById('quickBreakVal'),
        incSessionBtn: document.getElementById('incSessionBtn'),
        decSessionBtn: document.getElementById('decSessionBtn'),
        incBreakBtn: document.getElementById('incBreakBtn'),
        decBreakBtn: document.getElementById('decBreakBtn'),

        // RPG HUD
        rpgLevel: document.getElementById('rpgLevel'),
        hudCompleted: document.getElementById('hudCompleted'),
        hudCycle: document.getElementById('hudCycle'),
        xpFill: document.getElementById('xpFill'),
        xpText: document.getElementById('xpText'),

        // Tasks
        activeQuestText: document.getElementById('activeQuestText'),
        tasksCountBadge: document.getElementById('tasksCountBadge'),
        taskForm: document.getElementById('taskForm'),
        newTaskInput: document.getElementById('newTaskInput'),
        taskTagSelect: document.getElementById('taskTagSelect'),
        taskEstSelect: document.getElementById('taskEstSelect'),
        filterBtns: document.querySelectorAll('.filter-btn[data-filter]'),
        clearCompletedBtn: document.getElementById('clearCompletedBtn'),
        questList: document.getElementById('questList'),

        // Fastfetch
        fetchFocusTime: document.getElementById('fetchFocusTime'),
        fetchClearedQuests: document.getElementById('fetchClearedQuests'),
        fetchPomodoros: document.getElementById('fetchPomodoros'),
        fetchStreak: document.getElementById('fetchStreak'),

        // Manual
        manTabs: document.querySelectorAll('.man-tab'),
        manPanels: document.querySelectorAll('.man-panel'),
      }
    : {};

/* =========================================================
 * 8-Bit Chiptune Web Audio Synthesizer
 * ======================================================= */
let audioCtx = null;

function playTone(notes) {
  if (!state.config.sfxEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const vol = Math.max(0.01, (state.config.sfxVolume / 100) * 0.15);
    let offset = audioCtx.currentTime;

    notes.forEach(([freq, duration, type = 'square']) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, offset);
      gain.gain.setValueAtTime(vol, offset);
      gain.gain.exponentialRampToValueAtTime(0.001, offset + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(offset);
      osc.stop(offset + duration);
      offset += duration * 0.9;
    });
  } catch {
    // Ignore audio errors if blocked by browser policy
  }
}

const sfx = {
  click: () => playTone([[660, 0.04]]),
  start: () => playTone([[440, 0.06], [554, 0.06], [659, 0.09]]),
  pause: () => playTone([[523, 0.06], [392, 0.09]]),
  complete: () => playTone([[523, 0.08], [659, 0.08], [784, 0.08], [1046, 0.22]]),
  questDone: () => playTone([[587, 0.06], [880, 0.14]]),
};

/* =========================================================
 * Persistence (localStorage + Cookie parity)
 * ======================================================= */
function saveAll() {
  try {
    const persistedState = {
      config: state.config,
      completedPomos: state.completedPomos,
      focusMinutesTotal: state.focusMinutesTotal,
      streak: state.streak,
      xp: state.xp,
      level: state.level,
      cycle: state.cycle,
      activeQuestId: state.activeQuestId,
    };
    localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(persistedState));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(state.tasks));

    // Parity with original PomoTimer cookie storage
    const expires = new Date(Date.now() + 360 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(state.tasks))};expires=${expires};path=/;SameSite=Lax`;
  } catch {
    // Ignore storage quota errors
  }
}

function loadAll() {
  const detectedLang = detectClientLanguage();
  let hasStoredLang = false;

  try {
    const savedState = localStorage.getItem(STORAGE_KEYS.STATE);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      if (parsed.config && typeof parsed.config.lang === 'string') {
        hasStoredLang = true;
      }
      state.config = {
        ...DEFAULT_CONFIG,
        ...(parsed.config || {}),
        lang: hasStoredLang ? normalizeLang(parsed.config.lang) : detectedLang,
      };
      state.completedPomos = parsed.completedPomos || 0;
      state.focusMinutesTotal = parsed.focusMinutesTotal || 0;
      state.streak = parsed.streak || 0;
      state.xp = parsed.xp || 0;
      state.level = parsed.level || 1;
      state.cycle = parsed.cycle || 1;
      state.activeQuestId = parsed.activeQuestId || null;
    } else {
      state.config.lang = detectedLang;
    }

    const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (savedTasks) {
      state.tasks = JSON.parse(savedTasks);
    } else {
      state.tasks = buildDefaultTasks(state.config.lang);
    }
  } catch {
    state.config.lang = detectedLang;
    state.tasks = buildDefaultTasks(state.config.lang);
  }
}

/* =========================================================
 * Internationalization (i18n)
 * ======================================================= */
function syncDefaultStarterTasksLanguage(newLang) {
  const targetLang = normalizeLang(newLang);
  const otherLang = targetLang === 'pt' ? 'en' : 'pt';
  state.tasks.forEach((task) => {
    if (
      DEFAULT_TASKS_I18N[otherLang][task.id] &&
      task.text === DEFAULT_TASKS_I18N[otherLang][task.id]
    ) {
      task.text = DEFAULT_TASKS_I18N[targetLang][task.id];
    }
  });
}

function applyLanguage() {
  const lang = normalizeLang(state.config.lang);
  state.config.lang = lang;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  if (el.toggleLangBtn) {
    el.toggleLangBtn.textContent = `[🌐 LANG: ${lang.toUpperCase()}]`;
  }

  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-html]').forEach((node) => {
    node.innerHTML = t(node.dataset.i18nHtml);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
    node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder));
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((node) => {
    node.setAttribute('aria-label', t(node.dataset.i18nAria));
  });

  document.querySelectorAll('[data-i18n-title]').forEach((node) => {
    node.setAttribute('title', t(node.dataset.i18nTitle));
  });

  syncDefaultStarterTasksLanguage(lang);
  renderTimer();
  renderTasks();
  renderStats();
}

/* =========================================================
 * Timer Engine
 * ======================================================= */
function getModeDurationMinutes(mode) {
  if (mode === 'shortBreak') return state.config.shortBreakMin;
  if (mode === 'longBreak') return state.config.longBreakMin;
  return state.config.focusMin;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function setMode(mode, autoStart = false) {
  stopTimerInterval();
  state.mode = mode;
  state.isRunning = false;
  const mins = getModeDurationMinutes(mode);
  state.totalTime = mins * 60;
  state.timeLeft = mins * 60;

  el.modeTabs.forEach((btn) => {
    const active = btn.dataset.mode === mode;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  el.arcadeStage.dataset.mode = mode;
  renderTimer();

  if (autoStart) {
    startTimer();
  }
}

function startTimer() {
  if (state.isRunning) return;
  state.isRunning = true;
  sfx.start();

  state.intervalId = setInterval(() => {
    if (state.timeLeft > 0) {
      state.timeLeft -= 1;
      renderTimer();
    } else {
      handlePhaseComplete();
    }
  }, 1000);

  renderTimer();
}

function pauseTimer() {
  if (!state.isRunning) return;
  stopTimerInterval();
  state.isRunning = false;
  sfx.pause();
  renderTimer();
}

function stopTimerInterval() {
  if (state.intervalId !== null) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }
}

function resetTimer() {
  sfx.click();
  stopTimerInterval();
  state.isRunning = false;
  state.totalTime = getModeDurationMinutes(state.mode) * 60;
  state.timeLeft = state.totalTime;
  renderTimer();
}

function handlePhaseComplete() {
  stopTimerInterval();
  state.isRunning = false;
  sfx.complete();

  if (state.mode === 'focus') {
    state.completedPomos += 1;
    state.focusMinutesTotal += state.config.focusMin;
    state.streak += 1;
    grantXp(25);

    if (state.activeQuestId) {
      const quest = state.tasks.find((tItem) => tItem.id === state.activeQuestId);
      if (quest) {
        quest.donePomos += 1;
      }
    }

    const nextMode = state.cycle >= 4 ? 'longBreak' : 'shortBreak';
    state.cycle = state.cycle >= 4 ? 1 : state.cycle + 1;
    saveAll();
    renderTasks();
    renderStats();
    setMode(nextMode, state.config.autoBreak);
  } else {
    saveAll();
    renderStats();
    setMode('focus', state.config.autoFocus);
  }
}

function nextPhase() {
  sfx.click();
  if (state.mode === 'focus') {
    const nextMode = state.cycle >= 4 ? 'longBreak' : 'shortBreak';
    setMode(nextMode, false);
  } else {
    setMode('focus', false);
  }
}

function grantXp(amount) {
  state.xp += amount;
  while (state.xp >= 100) {
    state.xp -= 100;
    state.level += 1;
  }
}

/* =========================================================
 * Rendering
 * ======================================================= */
function initHpSegments() {
  el.hpSegments.innerHTML = '';
  for (let i = 0; i < 20; i += 1) {
    const block = document.createElement('div');
    block.className = 'hp-block is-filled';
    el.hpSegments.appendChild(block);
  }
}

function renderTimer() {
  const formatted = formatTime(state.timeLeft);
  el.timerDisplay.textContent = formatted;

  const pct = state.totalTime > 0 ? Math.round((state.timeLeft / state.totalTime) * 100) : 0;
  el.hpPercentText.textContent = `${pct}%`;
  el.nativeProgress.value = pct;

  const filledBlocks = Math.ceil((pct / 100) * 20);
  const blocks = el.hpSegments.children;
  for (let i = 0; i < blocks.length; i += 1) {
    blocks[i].classList.toggle('is-filled', i < filledBlocks);
  }

  el.startPauseBtn.textContent = state.isRunning ? t('btnPause') : t('btnStart');
  el.timerStateBadge.textContent = state.isRunning ? t('stateRunning') : t('stateIdle');

  const modeLabel =
    state.mode === 'focus'
      ? 'FOCUS_MODE'
      : state.mode === 'shortBreak'
      ? 'SHORT_BREAK'
      : 'LONG_BREAK';

  el.timerSubstatus.textContent = state.isRunning
    ? t('substatusExecuting', { mode: modeLabel })
    : t('substatusReady', { mode: modeLabel });

  el.waybarTicker.textContent = `[${modeLabel} :: ${formatted} :: ${
    state.isRunning ? t('tickerActive') : t('tickerStandby')
  }]`;

  document.title = `${formatted} - arch@pomotimer`;

  // Sync quick adjuster & tab labels
  el.tabFocusMin.textContent = state.config.focusMin;
  el.tabShortMin.textContent = state.config.shortBreakMin;
  el.tabLongMin.textContent = state.config.longBreakMin;
  el.quickSessionVal.textContent = state.config.focusMin;
  el.quickBreakVal.textContent = state.config.shortBreakMin;
}

function renderStats() {
  el.rpgLevel.textContent = t('hudLevel', { level: state.level });
  el.hudCompleted.textContent = state.completedPomos;
  el.hudCycle.textContent = `${state.cycle}/4`;
  el.xpFill.style.width = `${state.xp}%`;
  el.xpText.textContent = `${state.xp}/100`;

  const clearedCount = state.tasks.filter((task) => task.completed).length;
  el.fetchFocusTime.textContent = `${state.focusMinutesTotal} min`;
  el.fetchClearedQuests.textContent = `${clearedCount}`;
  el.fetchPomodoros.textContent = `${state.completedPomos}`;
  el.fetchStreak.textContent = `${state.streak} ${t('streakUnit')}`;
}

function renderTasks() {
  const pendingCount = state.tasks.filter((task) => !task.completed).length;
  el.tasksCountBadge.textContent = t('tasksPendingBadge', { count: pendingCount });

  const activeQuest = state.tasks.find((task) => task.id === state.activeQuestId);
  el.activeQuestText.textContent = activeQuest
    ? `${activeQuest.text} (${activeQuest.donePomos}/${activeQuest.est} 🍅)`
    : t('activeQuestNone');

  const filtered = state.tasks.filter((task) => {
    if (state.taskFilter === 'pending') return !task.completed;
    if (state.taskFilter === 'cleared') return task.completed;
    return true;
  });

  el.questList.innerHTML = '';
  if (filtered.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'quest-item';
    empty.textContent = t('emptyQuests');
    el.questList.appendChild(empty);
    renderStats();
    return;
  }

  filtered.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'quest-item';
    if (task.completed) li.classList.add('is-done');
    if (task.id === state.activeQuestId) li.classList.add('is-active-quest');

    const label = document.createElement('label');
    label.className = 'quest-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      if (task.completed) {
        sfx.questDone();
        grantXp(10);
      } else {
        sfx.click();
      }
      saveAll();
      renderTasks();
    });

    const span = document.createElement('span');
    span.className = 'quest-title';
    span.textContent = task.text;

    label.appendChild(checkbox);
    label.appendChild(span);

    const meta = document.createElement('div');
    meta.className = 'quest-meta';

    const tag = document.createElement('span');
    tag.className = 'quest-tag';
    tag.textContent = `[${task.tag}]`;

    const count = document.createElement('span');
    count.className = 'quest-pomo-count';
    count.textContent = `${task.donePomos}/${task.est}🍅`;

    const focusBtn = document.createElement('button');
    focusBtn.type = 'button';
    focusBtn.className = 'quest-action-btn';
    focusBtn.title = t('focusQuestTitle');
    focusBtn.textContent = task.id === state.activeQuestId ? '[★]' : '[🎯]';
    focusBtn.addEventListener('click', () => {
      sfx.click();
      state.activeQuestId = state.activeQuestId === task.id ? null : task.id;
      saveAll();
      renderTasks();
    });

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'quest-action-btn quest-del-btn';
    delBtn.title = t('deleteQuestTitle');
    delBtn.textContent = '[✖]';
    delBtn.addEventListener('click', () => {
      sfx.click();
      state.tasks = state.tasks.filter((taskItem) => taskItem.id !== task.id);
      if (state.activeQuestId === task.id) state.activeQuestId = null;
      saveAll();
      renderTasks();
    });

    meta.append(tag, count, focusBtn, delBtn);
    li.append(label, meta);
    el.questList.appendChild(li);
  });

  renderStats();
}

function applyVisualConfig() {
  document.documentElement.dataset.theme = state.config.theme;
  document.body.classList.toggle('crt-enabled', state.config.crtEnabled);

  el.toggleSfxBtn.textContent = `[🔊 SFX: ${state.config.sfxEnabled ? 'ON' : 'OFF'}]`;
  el.toggleSfxBtn.setAttribute('aria-pressed', String(state.config.sfxEnabled));

  el.toggleCrtBtn.textContent = `[📺 CRT: ${state.config.crtEnabled ? 'ON' : 'OFF'}]`;
  el.toggleCrtBtn.setAttribute('aria-pressed', String(state.config.crtEnabled));

  el.toggleThemeBtn.textContent = `[${state.config.theme === 'mocha' ? '🌙 RICE: MOCHA' : '☀ RICE: LATTE'}]`;
}

/* =========================================================
 * Dialog & Event Listeners
 * ======================================================= */
function syncDialogFields() {
  el.cfgFocusMin.value = state.config.focusMin;
  el.cfgShortMin.value = state.config.shortBreakMin;
  el.cfgLongMin.value = state.config.longBreakMin;
  el.cfgVolume.value = state.config.sfxVolume;
  if (el.cfgLang) el.cfgLang.value = state.config.lang;
  el.cfgAutoBreak.checked = state.config.autoBreak;
  el.cfgAutoFocus.checked = state.config.autoFocus;
  el.cfgCrt.checked = state.config.crtEnabled;
}

function setupDialog() {
  if (!('commandForElement' in HTMLButtonElement.prototype)) {
    el.openSettingsBtn.addEventListener('click', () => {
      syncDialogFields();
      el.dialog.showModal();
    });
  } else {
    el.openSettingsBtn.addEventListener('click', syncDialogFields);
  }

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const isOutside = (e, dialog) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    let pressedOutside = false;
    el.dialog.addEventListener('pointerdown', (e) => {
      pressedOutside = isOutside(e, el.dialog);
    });
    el.dialog.addEventListener('pointerup', (e) => {
      if (pressedOutside && isOutside(e, el.dialog)) {
        el.dialog.close('cancel');
      }
    });
  }

  el.dialog.addEventListener('close', () => {
    if (el.dialog.returnValue === 'save') {
      state.config.focusMin = Math.min(120, Math.max(1, Number(el.cfgFocusMin.value) || 25));
      state.config.shortBreakMin = Math.min(60, Math.max(1, Number(el.cfgShortMin.value) || 5));
      state.config.longBreakMin = Math.min(90, Math.max(1, Number(el.cfgLongMin.value) || 15));
      state.config.sfxVolume = Number(el.cfgVolume.value) || 50;
      if (el.cfgLang) {
        state.config.lang = normalizeLang(el.cfgLang.value);
      }
      state.config.autoBreak = el.cfgAutoBreak.checked;
      state.config.autoFocus = el.cfgAutoFocus.checked;
      state.config.crtEnabled = el.cfgCrt.checked;

      applyVisualConfig();
      if (!state.isRunning) {
        setMode(state.mode, false);
      }
      applyLanguage();
      saveAll();
      sfx.questDone();
    }
    el.dialog.returnValue = '';
  });
}

function setupListeners() {
  // Waybar clock
  const updateClock = () => {
    const now = new Date();
    el.waybarClock.textContent = now.toTimeString().slice(0, 8);
  };
  updateClock();
  setInterval(updateClock, 1000);

  // Workspaces
  el.wsBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sfx.click();
      el.wsBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      el.wmGrid.dataset.workspace = btn.dataset.ws;
    });
  });

  // Window focus border
  el.windows.forEach((win) => {
    win.addEventListener('pointerdown', () => {
      el.windows.forEach((w) => w.classList.remove('is-focused'));
      win.classList.add('is-focused');
    });
  });

  // Waybar quick toggles
  el.toggleSfxBtn.addEventListener('click', () => {
    state.config.sfxEnabled = !state.config.sfxEnabled;
    applyVisualConfig();
    saveAll();
    if (state.config.sfxEnabled) sfx.click();
  });

  el.toggleCrtBtn.addEventListener('click', () => {
    sfx.click();
    state.config.crtEnabled = !state.config.crtEnabled;
    applyVisualConfig();
    saveAll();
  });

  el.toggleThemeBtn.addEventListener('click', () => {
    sfx.click();
    state.config.theme = state.config.theme === 'mocha' ? 'latte' : 'mocha';
    applyVisualConfig();
    saveAll();
  });

  if (el.toggleLangBtn) {
    el.toggleLangBtn.addEventListener('click', () => {
      sfx.click();
      state.config.lang = state.config.lang === 'en' ? 'pt' : 'en';
      applyLanguage();
      saveAll();
    });
  }

  // Timer controls
  el.startPauseBtn.addEventListener('click', () => {
    if (state.isRunning) pauseTimer();
    else startTimer();
  });

  el.resetBtn.addEventListener('click', resetTimer);
  el.nextBtn.addEventListener('click', nextPhase);

  el.modeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      sfx.click();
      setMode(tab.dataset.mode, false);
    });
  });

  // Inline +/- adjusters
  el.incSessionBtn.addEventListener('click', () => {
    sfx.click();
    state.config.focusMin = Math.min(120, state.config.focusMin + 1);
    if (state.mode === 'focus' && !state.isRunning) setMode('focus', false);
    else renderTimer();
    saveAll();
  });

  el.decSessionBtn.addEventListener('click', () => {
    sfx.click();
    state.config.focusMin = Math.max(1, state.config.focusMin - 1);
    if (state.mode === 'focus' && !state.isRunning) setMode('focus', false);
    else renderTimer();
    saveAll();
  });

  el.incBreakBtn.addEventListener('click', () => {
    sfx.click();
    state.config.shortBreakMin = Math.min(60, state.config.shortBreakMin + 1);
    if (state.mode === 'shortBreak' && !state.isRunning) setMode('shortBreak', false);
    else renderTimer();
    saveAll();
  });

  el.decBreakBtn.addEventListener('click', () => {
    sfx.click();
    state.config.shortBreakMin = Math.max(1, state.config.shortBreakMin - 1);
    if (state.mode === 'shortBreak' && !state.isRunning) setMode('shortBreak', false);
    else renderTimer();
    saveAll();
  });

  // Tasks form & filters
  el.taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = el.newTaskInput.value.trim();
    if (!text) return;

    sfx.click();
    state.tasks.unshift({
      id: `q_${Date.now()}`,
      text,
      tag: el.taskTagSelect.value,
      est: Number(el.taskEstSelect.value) || 1,
      donePomos: 0,
      completed: false,
    });
    el.newTaskInput.value = '';
    saveAll();
    renderTasks();
  });

  el.filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sfx.click();
      state.taskFilter = btn.dataset.filter;
      el.filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderTasks();
    });
  });

  el.clearCompletedBtn.addEventListener('click', () => {
    sfx.click();
    state.tasks = state.tasks.filter((task) => !task.completed);
    if (state.activeQuestId && !state.tasks.some((task) => task.id === state.activeQuestId)) {
      state.activeQuestId = null;
    }
    saveAll();
    renderTasks();
  });

  // Manual tabs
  el.manTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      sfx.click();
      const target = tab.dataset.man;
      el.manTabs.forEach((tabItem) => {
        const active = tabItem === tab;
        tabItem.classList.toggle('is-active', active);
        tabItem.setAttribute('aria-selected', String(active));
      });
      el.manPanels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.manPanel === target);
      });
    });
  });

  // Vim / WM Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.dialog.open) {
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      if (state.isRunning) pauseTimer();
      else startTimer();
    } else if (e.key === 'r' || e.key === 'R') {
      resetTimer();
    } else if (e.key === 'n' || e.key === 'N') {
      nextPhase();
    } else if (e.key === '/') {
      e.preventDefault();
      el.newTaskInput.focus();
    } else if (e.key === '1') {
      setMode('focus', false);
    } else if (e.key === '2') {
      setMode('shortBreak', false);
    } else if (e.key === '3') {
      setMode('longBreak', false);
    }
  });
}

/* =========================================================
 * Boot
 * ======================================================= */
if (typeof document !== 'undefined') {
  loadAll();
  initHpSegments();
  applyVisualConfig();
  setMode('focus', false);
  applyLanguage();
  setupDialog();
  setupListeners();
}
