/* ===========================================================
   Not So Bad — P3 raid guide
   Vanilla, no build step. Renders from data.js.
   Persists: open sections, active tab, role filter, checklist.
   =========================================================== */
(function () {
  'use strict';

  var LS = 'nsbp3.';
  var TABS = ['intro', 'hyjal', 'bt'];

  /* ---------- storage helpers (never throw in private mode) ---------- */

  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(LS + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(LS + key, JSON.stringify(value)); } catch (e) {}
  }

  var THEMES = ['light', 'dark', 'horde', 'alliance'];
  var DEFAULT_THEME = 'horde';
  var currentTheme = load('theme', DEFAULT_THEME);
  if (THEMES.indexOf(currentTheme) === -1) currentTheme = DEFAULT_THEME;

  var openState = load('open', {});
  var checkState = load('check', {});
  var activeRoles = load('roles', []);

  /* ---------- accent-insensitive folding (length-preserving) ---------- */

  function foldChar(c) {
    var d = c.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return d.length === 1 ? d.toLowerCase() : c.toLowerCase();
  }
  function fold(s) {
    var out = '';
    for (var i = 0; i < s.length; i++) out += foldChar(s[i]);
    return out;
  }

  /* ---------- tiny DOM helper ---------- */

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (attrs[k] === null || attrs[k] === undefined || attrs[k] === false) continue;
      if (k === 'class') n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  var ICON_LINK = '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7L12 19"/></svg>';
  var ICON_CHECK = '<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>';
  var ICON_CHEV = '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>';
  var ICON_EXPAND = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3H3v6M15 21h6v-6M3 3l7 7M21 21l-7-7"/></svg>';
  var ICON_SHRINK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h6V4M20 14h-6v6M10 10L3 3M14 14l7 7"/></svg>';

  /* ---------- rendering ---------- */

  function renderItems(items) {
    var ul = el('ul');
    items.forEach(function (item) {
      var li = el('li');
      if (typeof item === 'string') {
        li.innerHTML = item;
      } else {
        li.innerHTML = item.t;
        if (item.sub && item.sub.length) {
          var sub = el('ul');
          item.sub.forEach(function (s) { sub.appendChild(el('li', null, s)); });
          li.appendChild(sub);
        }
      }
      ul.appendChild(li);
    });
    return ul;
  }

  function roleList(role) {
    if (!role) return [];
    return Array.isArray(role) ? role : [role];
  }

  function renderBlock(block) {
    var roles = roleList(block.role);
    var node = el('div', {
      class: 'block' + (roles.length ? '' : ' is-generic'),
      'data-roles': roles.join(' '),
    });
    var head = el('div', { class: 'block-head' });
    head.appendChild(el('h4', { class: 'block-title' }, block.title));
    roles.forEach(function (r) {
      var meta = ROLES.filter(function (x) { return x.id === r; })[0];
      if (meta) head.appendChild(el('span', { class: 'badge', 'data-role': r }, meta.short));
    });
    node.appendChild(head);
    node.appendChild(renderItems(block.items));
    return node;
  }

  function watchUrl(vid, t) {
    return 'https://www.youtube.com/watch?v=' + vid + (t ? '&t=' + t + 's' : '');
  }

  // YouTube refuses to configure the player (error 153) when the embedding page
  // has no valid origin — which is exactly the case for file:// pages.
  function embedUrl(vid, t) {
    var url = 'https://www.youtube-nocookie.com/embed/' + vid +
      '?start=' + t + '&autoplay=1&rel=0&modestbranding=1';
    if (location.origin && location.origin !== 'null') {
      url += '&origin=' + encodeURIComponent(location.origin);
    }
    return url;
  }

  function renderVideo(video, title) {
    if (!video) return null;
    var mm = Math.floor(video.t / 60), ss = video.t % 60;
    var stamp = mm + ':' + (ss < 10 ? '0' : '') + ss;
    var wrap = el('div', { class: 'video' });
    var btn = el('button', {
      type: 'button',
      class: 'yt-facade js-yt',
      'data-vid': video.vid,
      'data-t': video.t,
      'aria-label': 'Lire la vidéo — ' + title + ' à ' + stamp,
    });
    btn.innerHTML =
      '<img loading="lazy" decoding="async" alt="" src="https://i.ytimg.com/vi/' + video.vid + '/hqdefault.jpg">' +
      '<span class="yt-play"><span><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></span>' +
      '<span class="yt-cap"><span>' + title + ' — WoW Curios</span><span class="t">' + stamp + '</span></span>';
    wrap.appendChild(btn);

    var actions = el('div', { class: 'yt-actions' });
    actions.appendChild(el('button', {
      type: 'button',
      class: 'yt-size js-yt-size',
      'aria-expanded': 'false',
    }, ICON_EXPAND + '<span class="js-yt-size-label">Afficher plus grand</span>'));
    actions.appendChild(el('a', {
      class: 'yt-out',
      href: watchUrl(video.vid, video.t),
      target: '_blank',
      rel: 'noopener',
    }, 'Ouvrir sur YouTube \u2197'));
    wrap.appendChild(actions);
    return wrap;
  }

  // Which raid panel a section belongs to — needed before it is in the DOM.
  var SECTION_RAID = {};

  function raidOf(id) { return SECTION_RAID[id] || null; }

  function renderSection(section) {
    var d = el('details', { class: 'boss', id: section.id });

    var summary = el('summary');
    var numLabel = section.kind === 'trash' ? 'TRASH' : String(section.num);
    summary.appendChild(el('span', {
      class: 'boss-num' + (section.kind === 'trash' ? ' trash' : ''),
      'aria-hidden': 'true',
    }, numLabel));

    var heads = el('span', { class: 'boss-heads', 'data-hl': '' });
    heads.appendChild(el('span', { class: 'boss-name' }, section.name));
    heads.appendChild(el('span', { class: 'boss-tag' }, section.tagline));
    summary.appendChild(heads);

    var tools = el('span', { class: 'boss-tools' });
    tools.appendChild(el('button', {
      type: 'button',
      class: 'icon-btn js-copy',
      'data-id': section.id,
      title: 'Copier le lien direct',
      'aria-label': 'Copier le lien direct vers ' + section.name,
    }, ICON_LINK));
    summary.appendChild(tools);
    summary.appendChild(el('span', { class: 'chev', 'aria-hidden': 'true' }, ICON_CHEV));
    d.appendChild(summary);

    var body = el('div', { class: 'boss-body' });
    var vid = renderVideo(section.video, section.name);
    if (vid) body.appendChild(vid);
    var blocks = el('div', { class: 'boss-blocks', 'data-hl': '' });
    section.blocks.forEach(function (b) { blocks.appendChild(renderBlock(b)); });
    if (section.kind === 'boss') {
      var self = whLookup(section.name, raidOf(section.id));
      if (self) heads.querySelector('.boss-name').appendChild(whLink(self));
    }
    body.appendChild(blocks);
    d.appendChild(body);

    return d;
  }

  function renderRaid(raid) {
    raid.sections.forEach(function (s) { SECTION_RAID[s.id] = raid.id; });
    var panel = document.getElementById('panel-' + raid.id);
    var head = el('div', { class: 'panel-head' });
    head.appendChild(el('h2', { class: 'panel-title' }, raid.name));
    head.appendChild(el('p', { class: 'panel-tagline' }, raid.tagline));
    var link = el('a', {
      class: 'panel-video-link',
      href: raid.videoUrl,
      target: '_blank',
      rel: 'noopener',
    }, '<span class="yt-dot"></span>' + raid.videoLabel);
    head.appendChild(link);
    panel.appendChild(head);

    var jump = el('nav', { class: 'jumpbar', 'aria-label': 'Aller à un boss' });
    raid.sections.forEach(function (s) {
      var label = s.kind === 'trash'
        ? '<span class="n">~</span>' + s.name
        : '<span class="n">' + s.num + '</span>' + s.name;
      jump.appendChild(el('a', { class: 'jump', href: '#' + s.id }, label));
    });
    panel.appendChild(jump);

    raid.sections.forEach(function (s) { panel.appendChild(renderSection(s)); });
    decorateWowhead(panel, raid.id);
  }

  function renderIntro() {
    var host = document.getElementById('prep-blocks');
    INTRO_BLOCKS.forEach(function (b) {
      var card = el('section', { class: 'prep-block', 'data-hl': '' });
      card.appendChild(el('h3', null, b.title));
      card.appendChild(renderItems(b.items));
      host.appendChild(card);
    });
    decorateWowhead(host, null);

    var list = document.getElementById('checklist-items');
    PREP_CHECKLIST.forEach(function (item) {
      var li = el('li');
      var label = el('label');
      var input = el('input', { type: 'checkbox', 'data-ck': item.id });
      input.checked = !!checkState[item.id];
      var text = el('span', { class: 'ck-text' });
      text.appendChild(el('span', null, item.label));
      if (item.note) text.appendChild(el('span', { class: 'ck-note' }, item.note));
      label.appendChild(input);
      label.appendChild(text);
      li.appendChild(label);
      list.appendChild(li);
    });
    updateChecklistProgress();
  }

  /* ---------- checklist ---------- */

  function updateChecklistProgress() {
    var boxes = $$('#checklist-items input');
    var done = boxes.filter(function (b) { return b.checked; }).length;
    $('#checklist-count').textContent = done + ' / ' + boxes.length;
    $('#progress-fill').style.width = (boxes.length ? (done / boxes.length) * 100 : 0) + '%';
  }

  /* ---------- tabs ---------- */

  var currentTab = 'intro';

  function setTab(id, opts) {
    if (TABS.indexOf(id) === -1) id = 'intro';
    currentTab = id;
    TABS.forEach(function (t) {
      var btn = document.getElementById('tab-' + t);
      var panel = document.getElementById('panel-' + t);
      var on = t === id;
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.tabIndex = on ? 0 : -1;
      panel.hidden = !on;
    });
    save('tab', id);
    if (opts && opts.hash) {
      history.replaceState(null, '', '#' + id);
    }
    applyFilters();
  }

  /* ---------- open state ---------- */

  var suppressSave = false;

  function restoreOpenState() {
    suppressSave = true;
    $$('details.boss').forEach(function (d) { d.open = !!openState[d.id]; });
    suppressSave = false;
  }

  function setAllOpen(open) {
    var panel = document.getElementById('panel-' + currentTab);
    $$('details.boss', panel).forEach(function (d) {
      if (d.hidden) return;
      d.open = open;
      openState[d.id] = open;
    });
    save('open', openState);
  }

  /* ---------- highlight ---------- */

  function clearHighlights() {
    $$('[data-hl]').forEach(function (host) {
      if (host.__orig !== undefined && host.__hl) {
        host.innerHTML = host.__orig;
        host.__hl = false;
      }
    });
  }

  function highlight(host, needle) {
    if (host.__orig === undefined) host.__orig = host.innerHTML;
    else host.innerHTML = host.__orig;
    host.__hl = true;

    var walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (p && (p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE' || p.nodeName === 'MARK')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      var text = node.nodeValue;
      var hay = fold(text);
      if (hay.indexOf(needle) === -1) return;
      var frag = document.createDocumentFragment();
      var from = 0, idx;
      while ((idx = hay.indexOf(needle, from)) !== -1) {
        if (idx > from) frag.appendChild(document.createTextNode(text.slice(from, idx)));
        var mark = document.createElement('mark');
        mark.textContent = text.slice(idx, idx + needle.length);
        frag.appendChild(mark);
        from = idx + needle.length;
      }
      if (from < text.length) frag.appendChild(document.createTextNode(text.slice(from)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  /* ---------- filtering (search + roles) ---------- */

  // The divider is drawn as a border-top on each block, so the first *visible*
  // one must not have it. Recomputed whenever visibility changes.
  function applyRoleVisibility(scope) {
    var blocks = $$('.block', scope);
    var firstShown = true;
    blocks.forEach(function (b) {
      var show = blockMatchesRoles(b);
      b.hidden = !show;
      b.classList.toggle('is-first-visible', show && firstShown);
      if (show) firstShown = false;
    });
  }

  function blockMatchesRoles(block) {
    if (!activeRoles.length) return true;
    var roles = (block.getAttribute('data-roles') || '').split(' ').filter(Boolean);
    if (!roles.length) return true; // generic context blocks always shown
    return roles.some(function (r) { return activeRoles.indexOf(r) !== -1; });
  }

  function applyFilters() {
    var q = fold($('#search').value.trim());
    var searching = q.length >= 2;
    var counts = { intro: 0, hyjal: 0, bt: 0 };

    if (!searching) clearHighlights();

    // Raids
    ['hyjal', 'bt'].forEach(function (rid) {
      var panel = document.getElementById('panel-' + rid);
      $$('details.boss', panel).forEach(function (d) {
        // role filter on blocks (also re-tags the first visible one)
        applyRoleVisibility(d);

        var visibleText = $$('.block', d)
          .filter(function (b) { return !b.hidden; })
          .map(function (b) { return b.textContent; })
          .join(' ');
        var hay = fold($('.boss-heads', d).textContent + ' ' + visibleText);
        var hit = !searching || hay.indexOf(q) !== -1;

        d.hidden = !hit;
        if (hit) counts[rid]++;

        if (searching && hit) {
          highlight($('.boss-heads', d), q);
          highlight($('.boss-blocks', d), q);
          decorateWowhead($('.boss-heads', d), rid);
          decorateWowhead($('.boss-blocks', d), rid);
          // highlight() rebuilt the block subtree, so re-apply visibility
          applyRoleVisibility(d);
          suppressSave = true;
          d.open = true;
          suppressSave = false;
        }
      });
      // hide jump links pointing at hidden sections
      $$('.jump', panel).forEach(function (a) {
        var target = document.getElementById(a.getAttribute('href').slice(1));
        a.hidden = !!(target && target.hidden);
      });
    });

    // Intro cards
    var introCards = $$('#panel-intro [data-hl], #panel-intro .release-card, #panel-intro .checklist-card, #panel-intro .sources-card');
    introCards.forEach(function (card) {
      var hit = !searching || fold(card.textContent).indexOf(q) !== -1;
      card.hidden = !hit;
      if (hit) counts.intro++;
      if (searching && hit && card.hasAttribute('data-hl')) {
        highlight(card, q);
        decorateWowhead(card, null);
      }
    });

    if (!searching) restoreOpenState();

    // Tab meta + status
    var metas = { intro: 'Avant J-1', hyjal: '5 boss', bt: '9 boss' };
    TABS.forEach(function (t) {
      var m = $('#tab-' + t + ' .tab-meta');
      m.textContent = searching ? (counts[t] + ' résultat' + (counts[t] > 1 ? 's' : '')) : metas[t];
    });

    var status = $('#search-status');
    var total = counts.intro + counts.hyjal + counts.bt;
    if (searching) {
      status.hidden = false;
      status.textContent = total + ' résultat' + (total > 1 ? 's' : '') +
        ' — Préparation ' + counts.intro + ' · Mont Hyjal ' + counts.hyjal + ' · Temple Noir ' + counts.bt;
    } else if (activeRoles.length) {
      status.hidden = false;
      var names = activeRoles.map(function (r) {
        return ROLES.filter(function (x) { return x.id === r; })[0].label;
      });
      status.textContent = 'Filtre actif : ' + names.join(' + ') + ' (les blocs communs restent affichés)';
    } else {
      status.hidden = true;
    }

    $('#search-clear').hidden = !$('#search').value;
    $('#no-results').hidden = !(searching && counts[currentTab] === 0);
  }

  /* ---------- deep links ---------- */

  function panelIdOf(node) {
    var p = node.closest('.panel');
    return p ? p.id.replace('panel-', '') : 'intro';
  }

  function goToHash(hash, opts) {
    var id = (hash || '').replace(/^#/, '');
    if (!id) return false;

    if (TABS.indexOf(id) !== -1) { setTab(id); return true; }

    var target = document.getElementById(id);
    if (!target) return false;

    setTab(panelIdOf(target));

    if (target.tagName === 'DETAILS') {
      target.open = true;
      openState[id] = true;
      save('open', openState);
      target.classList.add('is-target');
      setTimeout(function () { target.classList.remove('is-target'); }, 2200);
    }
    if (!opts || opts.scroll !== false) {
      requestAnimationFrame(function () {
        target.scrollIntoView({ block: 'start', behavior: opts && opts.instant ? 'auto' : 'smooth' });
      });
    }
    return true;
  }

  /* ---------- events ---------- */

  function wire() {
    // Tabs
    $('#tablist').addEventListener('click', function (e) {
      var btn = e.target.closest('.tab');
      if (!btn) return;
      setTab(btn.dataset.tab, { hash: true });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    $('#tablist').addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var i = TABS.indexOf(currentTab);
      var next = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
      setTab(next, { hash: true });
      document.getElementById('tab-' + next).focus();
      e.preventDefault();
    });

    // Details open/close persistence.
    // Listen to the user's click on <summary> rather than the `toggle` event:
    // `toggle` fires asynchronously, so a suppression flag set around a
    // programmatic `d.open = true` (search auto-expand) is already cleared by
    // the time the handler runs, and every searched section gets persisted.
    document.addEventListener('click', function (e) {
      if (e.target.closest('.js-copy')) return;
      var summary = e.target.closest('.boss > summary');
      if (!summary) return;
      var d = summary.parentNode;
      // The <details> flips after dispatch, and rAF is throttled in background
      // tabs, so read the resolved state from a macrotask instead.
      setTimeout(function () {
        openState[d.id] = d.open;
        save('open', openState);
      }, 0);
    });

    // Copy deep link
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-copy');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      var url = location.origin + location.pathname + '#' + btn.dataset.id;
      var done = function () {
        btn.innerHTML = ICON_CHECK;
        btn.classList.add('copied');
        setTimeout(function () { btn.innerHTML = ICON_LINK; btn.classList.remove('copied'); }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () { prompt('Lien :', url); });
      } else {
        prompt('Lien :', url);
      }
    });

    // YouTube lazy facade
    document.addEventListener('click', function (e) {
      var facade = e.target.closest('.js-yt');
      if (!facade) return;
      e.preventDefault();
      // file:// has a null origin, so the embedded player errors out (153).
      // Send the viewer to YouTube instead of showing a broken frame.
      if (location.protocol === 'file:') {
        window.open(watchUrl(facade.dataset.vid, facade.dataset.t), '_blank', 'noopener');
        return;
      }
      var iframe = el('iframe', {
        src: embedUrl(facade.dataset.vid, facade.dataset.t),
        title: 'Guide vidéo WoW Curios',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture',
        allowfullscreen: '',
        referrerpolicy: 'strict-origin-when-cross-origin',
      });
      facade.replaceWith(iframe);
    });

    // Video size toggle
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.js-yt-size');
      if (!btn) return;
      e.preventDefault();
      var wrap = btn.closest('.video');
      var big = wrap.getAttribute('data-size') === 'lg';
      wrap.setAttribute('data-size', big ? 'sm' : 'lg');
      btn.setAttribute('aria-expanded', big ? 'false' : 'true');
      btn.innerHTML = (big ? ICON_EXPAND : ICON_SHRINK) +
        '<span class="js-yt-size-label">' + (big ? 'Afficher plus grand' : 'Réduire') + '</span>';
    });

    // Jump links / internal anchors
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var hash = a.getAttribute('href');
      if (hash === '#') return;
      if (goToHash(hash)) {
        e.preventDefault();
        history.replaceState(null, '', hash);
      }
    });

    // Search
    var searchTimer;
    $('#search').addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(applyFilters, 120);
    });
    $('#search-clear').addEventListener('click', function () {
      $('#search').value = '';
      applyFilters();
      $('#search').focus();
    });
    $('#no-results-clear').addEventListener('click', function () {
      $('#search').value = '';
      activeRoles = [];
      save('roles', activeRoles);
      syncRoleButtons();
      applyFilters();
    });

    // Roles
    $$('.role-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var r = btn.dataset.role;
        if (r === 'all') {
          activeRoles = [];
        } else {
          var i = activeRoles.indexOf(r);
          if (i === -1) activeRoles.push(r); else activeRoles.splice(i, 1);
        }
        save('roles', activeRoles);
        syncRoleButtons();
        applyFilters();
      });
    });

    // Shadow-resistance modal
    document.addEventListener('click', function (e) {
      if (e.target.closest('.js-sr-open')) { e.preventDefault(); openShadowResist(); return; }
      var dlg = document.getElementById('sr-modal');
      if (!dlg || !dlg.open) return;
      // close on the X, or on a click that lands on the backdrop rather than the panel
      if (e.target.closest('.modal-close') || e.target.id === 'modal-backdrop') closeShadowResist();
    });

    // Theme switcher
    $$('.theme-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { setTheme(btn.dataset.themeSet); });
    });

    // Bulk expand / collapse
    $('#expand-all').addEventListener('click', function () { setAllOpen(true); });
    $('#collapse-all').addEventListener('click', function () { setAllOpen(false); });

    // Checklist
    $('#checklist-items').addEventListener('change', function (e) {
      if (e.target.type !== 'checkbox') return;
      checkState[e.target.dataset.ck] = e.target.checked;
      save('check', checkState);
      updateChecklistProgress();
    });
    $('#checklist-reset').addEventListener('click', function () {
      checkState = {};
      save('check', checkState);
      $$('#checklist-items input').forEach(function (b) { b.checked = false; });
      updateChecklistProgress();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      var t = e.target;
      var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      var srDlg = document.getElementById('sr-modal');
      if (srDlg && srDlg.open) {
        if (e.key === 'Escape') { e.preventDefault(); closeShadowResist(); return; }
        if (e.key === 'Tab') {
          var f = srFocusables(srDlg);
          if (!f.length) return;
          var first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
        return;
      }
      if (e.key === 'Escape' && typing && t.id === 'search') {
        t.value = ''; applyFilters(); t.blur(); return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === '/') { e.preventDefault(); $('#search').focus(); }
      else if (e.key === 'e' || e.key === 'E') { setAllOpen(true); }
      else if (e.key === 'c' || e.key === 'C') { setAllOpen(false); }
    });

    window.addEventListener('hashchange', function () { goToHash(location.hash); });
  }

  function syncRoleButtons() {
    $$('.role-btn').forEach(function (b) {
      var r = b.dataset.role;
      var on = r === 'all' ? activeRoles.length === 0 : activeRoles.indexOf(r) !== -1;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* ---------- countdown ---------- */

  function tickCountdown() {
    var node = document.getElementById('countdown');
    var target = new Date(P3_RELEASE_UTC).getTime();
    var diff = target - Date.now();

    if (diff <= 0) {
      node.classList.add('is-live');
      var days = Math.floor(-diff / 86400000);
      node.innerHTML = 'Phase 3 <b>LIVE</b>' + (days > 0 ? ' — J+' + days : '');
      return;
    }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor(diff / 3600000) % 24;
    var m = Math.floor(diff / 60000) % 60;
    var s = Math.floor(diff / 1000) % 60;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    node.innerHTML = 'Phase 3 dans <b>J-' + d + '</b> ' + pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  /* ---------- theme ---------- */

  // The Horde and Alliance themes lean on Montserrat (the accent face Blizzard's
  // own site lists). Only fetch it when one of them is actually selected.
  var DISPLAY_FONT_THEMES = ['horde', 'alliance'];

  function ensureDisplayFont() {
    if (document.getElementById('horde-font')) return;
    var l = document.createElement('link');
    l.id = 'horde-font';
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap';
    document.head.appendChild(l);
  }

  function setTheme(name, persist) {
    if (THEMES.indexOf(name) === -1) name = DEFAULT_THEME;
    currentTheme = name;
    document.documentElement.setAttribute('data-theme', name);
    if (DISPLAY_FONT_THEMES.indexOf(name) !== -1) ensureDisplayFont();
    $$('.theme-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.themeSet === name ? 'true' : 'false');
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', {
        light: '#f5f7f3', horde: '#1d1a13', alliance: '#0a0d15', dark: '#0b0d0a',
      }[name]);
    }
    if (persist !== false) save('theme', name);
  }

  /* ---------- Wowhead decoration ---------- */

  // 'icon' shows the entity's own Wowhead icon, falling back to a round (i)
  // for entities that have none (Wowhead ships no icon for NPCs).
  // 'info' forces the (i) everywhere.
  var WH_STYLE = 'icon';
  var WH_ICON_BASE = 'https://wow.zamimg.com/images/wow/icons/medium/';

  // Wowhead locale for both the links and the tooltips. '' gives English.
  var WH_LOCALE = 'fr';
  var WH_HOST = (WH_LOCALE || 'www') + '.wowhead.com';
  var WH_DOMAIN = (WH_LOCALE ? WH_LOCALE + '.' : '') + 'tbc';

  function whLookup(label, raid) {
    var scoped = (typeof WOWHEAD_SCOPED !== 'undefined' && WOWHEAD_SCOPED[raid]) || null;
    if (scoped && scoped[label]) return scoped[label];
    if (typeof WOWHEAD !== 'undefined' && WOWHEAD[label]) return WOWHEAD[label];
    return null;
  }

  // "Death & Decay :" / "Tanks (3 requis)" -> "Death & Decay" / "Tanks"
  function whKey(text) {
    return text.replace(/\s*\(.*?\)\s*$/, '').replace(/\s*:\s*$/, '').trim();
  }

  function whUrl(entry) {
    var base = 'https://' + WH_HOST + '/tbc/';
    return entry.kind === 'search'
      ? base + 'search?q=' + encodeURIComponent(entry.q)
      : base + entry.kind + '=' + entry.id;
  }

  var WH_KIND_LABEL = { spell: 'sort', npc: 'PNJ', item: 'objet', search: 'recherche' };

  // Wowhead's tooltip script scans the document once on load. Links added later
  // (first render, and every search rebuild) need an explicit rescan.
  var whRefreshTimer;
  function whRefreshTooltips() {
    clearTimeout(whRefreshTimer);
    whRefreshTimer = setTimeout(function () {
      var power = window.$WowheadPower;
      if (power && typeof power.refreshLinks === 'function') power.refreshLinks();
    }, 80);
  }

  function whLink(entry) {
    var a = el('a', {
      class: 'wh',
      href: whUrl(entry),
      target: '_blank',
      rel: 'noopener',
      'data-wh-kind': entry.kind,
      // Explicit target for the tooltip script, rather than letting it parse
      // the href. 'fr.tbc' is Wowhead's domain key for French TBC Classic.
      'data-wowhead': entry.kind === 'search' ? null : entry.kind + '=' + entry.id + '&domain=' + WH_DOMAIN,
      // No `title`: it would race the Wowhead tooltip with a native one.
      // aria-label still names the target for screen readers.
      'aria-label': entry.name + ' \u2014 Wowhead TBC (' + (WH_KIND_LABEL[entry.kind] || entry.kind) + ')',
    });
    if (WH_STYLE === 'icon' && entry.icon) {
      a.classList.add('wh-img');
      a.appendChild(el('img', {
        src: WH_ICON_BASE + entry.icon + '.jpg',
        alt: '', loading: 'lazy', decoding: 'async', width: '18', height: '18',
      }));
    } else {
      a.textContent = 'i';
    }
    return a;
  }

  // Appends one Wowhead link after every <strong> naming a known entity.
  // Runs on already-rendered DOM, so data.js stays free of link markup.
  function decorateWowhead(root, raid) {
    if (typeof WOWHEAD === 'undefined') return;
    $$('strong', root).forEach(function (node) {
      if (node.querySelector('.wh')) return;
      if (node.nextElementSibling && node.nextElementSibling.classList &&
          node.nextElementSibling.classList.contains('wh')) return;
      var entry = whLookup(whKey(node.textContent), raid);
      if (!entry) return;
      node.parentNode.insertBefore(whLink(entry), node.nextSibling);
    });
    whRefreshTooltips();
  }

/* ---------- shadow-resistance modal ---------- */

  function srList(items) {
    var ul = el('ul');
    items.forEach(function (i) { ul.appendChild(el('li', null, i)); });
    return ul;
  }

  function srTextSection(title, text) {
    var box = el('section', { class: 'sr-block' });
    box.appendChild(el('h3', null, title));
    box.appendChild(el('p', null, text));
    return box;
  }

  function srSection(title, items, note) {
    var box = el('section', { class: 'sr-block' });
    box.appendChild(el('h3', null, title));
    if (note) box.appendChild(el('p', { class: 'sr-note' }, note));
    box.appendChild(srList(items));
    return box;
  }

  function renderShadowResist() {
    if (typeof SHADOW_RESIST === 'undefined') return;
    var d = SHADOW_RESIST;
    var body = $('#sr-modal .modal-body');
    if (body.dataset.rendered) return;

    $('#sr-modal-title').textContent = d.title;
    $('#sr-modal .modal-sub').textContent = d.subtitle;

    var lead = el('div', { class: 'sr-lead' });
    d.intro.forEach(function (p) { lead.appendChild(el('p', null, p)); });
    body.appendChild(lead);

    body.appendChild(srSection(d.buff.title, d.buff.items));
    body.appendChild(srTextSection(d.target.title, d.target.text));

    // sources table
    var box = el('section', { class: 'sr-block' });
    box.appendChild(el('h3', null, d.sources.title));
    box.appendChild(el('p', { class: 'sr-note' }, d.sources.note));
    if (d.sources.warn) box.appendChild(el('p', { class: 'sr-warn' }, d.sources.warn));
    if (d.sources.family) {
      var fam = el('div', { class: 'sr-family' });
      fam.appendChild(el('h4', null, d.sources.family.title));
      fam.appendChild(el('p', null, d.sources.family.text));
      box.appendChild(fam);
    }
    var scroll = el('div', { class: 'sr-tablewrap' });
    var table = el('table', { class: 'sr-table' });
    table.innerHTML = '<thead><tr><th>Source</th><th>Emplacement</th><th>RO</th><th>Comment l\'obtenir</th></tr></thead>';
    var tb = el('tbody');
    d.sources.rows.forEach(function (r) {
      var tr = el('tr', r.craft ? { class: 'is-craft' } : null);
      tr.appendChild(el('td', null, '<strong>' + r.item + '</strong>'));
      tr.appendChild(el('td', null, r.slot));
      tr.appendChild(el('td', { class: 'sr-sr' }, r.sr));
      tr.appendChild(el('td', null, r.how));
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    scroll.appendChild(table);
    box.appendChild(scroll);
    body.appendChild(box);

    // the two routes
    d.paths.forEach(function (p) {
      var sec = el('section', { class: 'sr-block sr-path' });
      sec.appendChild(el('h3', null, p.title));
      sec.appendChild(el('p', { class: 'sr-total' }, p.total));
      sec.appendChild(srList(p.steps));
      body.appendChild(sec);
    });

    body.appendChild(srSection(d.consumable.title, d.consumable.items));
    body.appendChild(srSection(d.caveats.title, d.caveats.items));

    decorateWowhead(body, 'bt');
    body.dataset.rendered = '1';
  }

  // Deliberately NOT showModal(): that puts the dialog in the top layer, which
  // outranks every z-index, so Wowhead's tooltip — appended to <body> — renders
  // behind the panel. Relocating the tooltip into the dialog breaks its markup
  // (the frame stays behind, only the text follows). A non-modal dialog with our
  // own backdrop keeps one ordinary stacking context and the tooltip wins on its
  // own z-index. The trade-off is doing ESC and the focus trap by hand.
  var srLastFocus = null;

  function srFocusables(dlg) {
    return $$('button, a[href], input, [tabindex]:not([tabindex="-1"])', dlg)
      .filter(function (n) { return n.offsetParent !== null; });
  }

  function openShadowResist() {
    renderShadowResist();
    var dlg = document.getElementById('sr-modal');
    srLastFocus = document.activeElement;
    $('#modal-backdrop').hidden = false;
    document.body.classList.add('is-modal-open');
    dlg.show();
    dlg.setAttribute('aria-modal', 'true');
    var close = $('.modal-close', dlg);
    if (close) close.focus();
    whRefreshTooltips();
  }

  function closeShadowResist() {
    var dlg = document.getElementById('sr-modal');
    if (!dlg.open) return;
    dlg.close();
    dlg.removeAttribute('aria-modal');
    $('#modal-backdrop').hidden = true;
    document.body.classList.remove('is-modal-open');
    if (srLastFocus && srLastFocus.focus) srLastFocus.focus();
  }

  /* ---------- sticky header height -> --stick (drives scroll-margin) ---------- */

  function trackStickyHeight() {
    var head = $('.stickyhead');
    if (!head) return;
    var apply = function () {
      document.documentElement.style.setProperty('--stick', head.offsetHeight + 'px');
    };
    apply();
    if (window.ResizeObserver) new ResizeObserver(apply).observe(head);
    else window.addEventListener('resize', apply);
  }

  /* ---------- boot ---------- */

  function init() {
    setTheme(currentTheme, false);
    renderIntro();
    RAIDS.forEach(renderRaid);
    trackStickyHeight();

    syncRoleButtons();
    restoreOpenState();
    wire();

    var handled = goToHash(location.hash, { instant: true, scroll: true });
    if (!handled) setTab(load('tab', 'intro'));
    applyFilters();

    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
