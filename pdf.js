// main.js – Alles in einer Datei (ohne Module)

const Awesomizr = {};

Awesomizr.matchesSelector = function(ele, selector) {
  if (!ele || !(ele instanceof HTMLElement)) {
    throw 'The first parameter must indicate an HTML element';
  }

  if (selector) {
    const matchesList = ['matches', 'webkitMatches', 'mozMatches', 'msMatches', 'oMatches', 'matchesSelector', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'];

    for (let i = 0; i < matchesList.length; i++) {
      if (typeof ele[matchesList[i]] == 'function') {
        return ele[matchesList[i]](selector);
      }
    }
  }

  return false;
};

Awesomizr.getNextId = function(startValue, prefix, suffix) {
  if (startValue === undefined || (typeof startValue).toLowerCase() != 'number') {
    startValue = 0;
  }
  if (prefix === undefined || (typeof prefix).toLowerCase() != 'string' || !prefix) {
    prefix = 'ro-id';
  }
  if (suffix === undefined || (typeof suffix).toLowerCase() != 'string') {
    suffix = '';
  }
  let index = startValue;
  while (document.getElementById(prefix + index + suffix)) {
    index++;
  }
  return { index: index, prefix: prefix, value: prefix + index + suffix };
};

Awesomizr.rotateTableHeader = /* dein kompletter rotateTableHeader code hier einsetzen */

  Awesomizr.createTableOfContents = function({
                                               insertiontarget = 'body',
                                               insertiontype = 'afterbegin',
                                               elements = ['h1', 'h2'],
                                               toctitle = 'Table of Contents',
                                               disabledocumenttitle = false,
                                               text = null,
                                               accessible = false
                                             } = {}) {
    let toc = '';
    const tocHeadingClass = 'ro-toc-heading';
    const tocClass = 'ro-toc';
    const tocAccClass = 'ro-toc-acc';

    if ((typeof elements).toLowerCase() == 'string') {
      elements = [elements];
    }

    let selector = elements[0];
    for (let i = 1; i < elements.length; i++) {
      selector += ', ' + elements[i];
    }

    let elementNodes = document.querySelectorAll(selector);
    let idNumber = 0;
    for (let i = 0; i < elementNodes.length; i++) {
      let ele = elementNodes[i];
      let id = ele.id;
      let textContent = null;

      if ((typeof text).toLowerCase() === 'function') {
        textContent = text(ele);
        if (textContent === false) continue;
        else if (textContent === true) textContent = null;
        else textContent += '';
      }

      if (textContent === null) {
        textContent = ele.textContent;
      }

      if (!id) {
        let nextId = Awesomizr.getNextId(idNumber, 'ro-toc-heading');
        idNumber = nextId.index;
        id = nextId.value;
        ele.id = id;
      }

      let tocLevel = 0;
      for (let k = 0; k < elements.length; k++) {
        if (Awesomizr.matchesSelector(ele, elements[k])) {
          tocLevel = k + 1;
          break;
        }
      }

      toc += '<div class="ro-toc-level-' + tocLevel + '">';
      if (accessible) toc += '<div>';
      toc += '<a href="#' + id + '">' + textContent.replace('&', '&amp;').replace('<', '&lt;') + '</a></div>';
      if (accessible) toc += '</div>';
    }

    let tocContainer = '<div class="' + tocClass + (accessible ? (' ' + tocAccClass) : '') + '">';

    if (!disabledocumenttitle) {
      tocContainer += '<h1>' + document.title + '</h1>';
    }

    if (toctitle.length > 0) {
      tocContainer += '<h2 class="' + tocHeadingClass + '">' + toctitle + '</h2>';
    }

    if (accessible) tocContainer += '<div>';
    tocContainer += toc + '</div>';
    if (accessible) tocContainer += '</div>';

    document.querySelector(insertiontarget).insertAdjacentHTML(insertiontype, tocContainer);
  };

// Weitere Methoden wie applyAdaptivePageBreaks, autoFillPages, compactifyTable, loadMathJax
// kannst du analog auch mit Awesomizr.xyz = function(...) {...} hinzufügen

window.onload = () => {
  const chapterElements = Array.from(document.querySelectorAll('.srl-chapter'));
  if (window.ro) {
    Awesomizr.createTableOfContents({
      elements: ['.srl-chapter', '.srl-chapter h1'],
      insertiontarget: '.srlp-pdf-toc-table',
      insertiontype: 'afterend',
      toctitle: '',
      disabledocumenttitle: false,
      text: function(elem) {
        // the entry text should be the image's alt text
        if (elem.classList.contains('srl-chapter')) {
          let index = chapterElements.indexOf(elem);
          return index + 1;
        } else {
          return elem.textContent || '';
        }
      }
    });
  }
};