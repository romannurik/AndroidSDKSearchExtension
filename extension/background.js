/*
 * Copyright 2012 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var OMNIBOX_MAX_RESULTS = 20;
var REFERENCE_JS_URLS = [
  'https://developer.android.com/reference/lists.js',
  'https://developer.android.com/reference/gcm_lists.js',
  'https://developer.android.com/reference/gms_lists.js',
  'https://developer.android.com/reference/jd_lists.js',
  'android-xml-ref.js'
];


chrome.omnibox.setDefaultSuggestion({
  description: 'Loading Android SDK search data...'
});


/**
 * Initialization function that tries to load the SDK reference JS, and upon
 * failure, continually attempts to load it every 5 seconds. Once loaded,
 * runs onScriptsLoaded to continue extension initialization.
 */
(function init() {
  function _success() {
    if (!DATA || !GMS_DATA || !GCM_DATA) {
      _error('(some script)');
      return;
    }

    DATA = DATA.map(processReferenceItem)
    DATA = DATA.concat(GMS_DATA.map(processReferenceItem));
    DATA = DATA.concat(GCM_DATA.map(processReferenceItem));
    DATA = DATA.concat(JD_DATA.map(processDocsItem));
    DATA = DATA.concat(XML_DATA.map(processXmlItem));

    console.log('Successfully loaded SDK reference JS.');
    onScriptsLoaded();
  }

  function _error(script) {
    console.error('Failed to load ' + script + '. Retrying in 5 seconds.');
    window.setTimeout(init, 5000);
  }

  loadScripts(REFERENCE_JS_URLS, _success, _error);
})();


var nextid = 100000;


/**
 * Creates a standard DATA-like object for something from JD_DATA
 */
function processReferenceItem(item) {
  item.type = 'ref';
  return item;
}


/**
 * Creates a standard DATA-like object for something from JD_DATA
 */
function processDocsItem(item) {
  return {
    type: 'docs',
    id: ++nextid,
    label: item.label.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
    subLabel: item.type,
    link: item.link
  };
}


/**
 * Creates a standard DATA-like object for something from JD_DATA
 */
function processXmlItem(item) {
  item.type = 'ref.xml';
  return item;
}


/**
 * Attempts to load a set of JS scripts by adding them to the <head>. Provides
 * success and error callbacks.
 */
function loadScripts(urls, successFn, errorFn) {
  urls = urls || [];
  urls = urls.slice(); // clone

  var _loadNext = function() {
    var url = urls.shift();
    if (!url) {
      successFn();
      return;
    }
    loadScript(url, _loadNext, errorFn);
  };

  _loadNext();
}


/**
 * Attempts to load a JS script by adding it to the <head>. Provides
 * success and error callbacks.
 */
function loadScript(url, successFn, errorFn) {
  successFn = successFn || function(){};
  errorFn = errorFn || function(){};

  if (!url) {
    errorFn('(no script)');
    return;
  }

  var loadComplete = false;

  var headNode = document.getElementsByTagName('head')[0];
  var scriptNode = document.createElement('script');
  scriptNode.type = 'text/javascript';
  scriptNode.src = url;
  scriptNode.onload = scriptNode.onreadystatechange = function() {
    if ((!scriptNode.readyState ||
         'loaded' === scriptNode.readyState ||
         'complete' === scriptNode.readyState)
        && !loadComplete) {
      scriptNode.onload = scriptNode.onreadystatechange = null;
      if (headNode && scriptNode.parentNode) {
        headNode.removeChild(scriptNode);
      }
      scriptNode = undefined;
      loadComplete = true;
      successFn();
    }
  }
  scriptNode.onerror = function() {
    if (!loadComplete) {
      loadComplete = true;
      errorFn(url);
    }
  };

  headNode.appendChild(scriptNode);
}


/**
 * Second-stage initialization function. This contains all the Omnibox
 * setup features.
 */
function onScriptsLoaded() {
  chrome.omnibox.setDefaultSuggestion({
    description: 'Search Android SDK docs for <match>%s</match>'
  });

  chrome.omnibox.onInputChanged.addListener(
    function(query, suggestFn) {
      if (!query)
        return;
  
      suggestFn = suggestFn || function(){};
      query = query.replace(/(^ +)|( +$)/g, '');

      var queryPartsLower = query.toLowerCase().match(/[^\s]+/g) || [];

      // Filter all classes/packages.
      var results = [];

      for (var i = 0; i < DATA.length; i++) {
        var result = DATA[i];
        var textLower = (result.label + ' ' + result.subLabel).toLowerCase();
        for (var j = 0; j < queryPartsLower.length; j++) {
          if (!queryPartsLower[j]) {
            continue;
          }

          if (textLower.indexOf(queryPartsLower[j]) >= 0) {
            results.push(result);
            break;
          }
        }
      }

      // Rank them.
      rankResults(results, query);

      console.clear();
      for (var i = 0; i < Math.min(20, results.length); i++) {
        console.log(results[i].__resultScore + '   ' + results[i].label);
      }

      // Add them as omnibox results, with prettyish formatting
      // (highlighting, etc.).
      var capitalLetterRE = new RegExp(/[A-Z]/);
      var queryLower = query.toLowerCase();
      var queryAlnumDotParts = queryLower.match(/[\&\;\-\w\.]+/g) || [''];
      var queryREs = queryAlnumDotParts.map(function(q) {
        return new RegExp('(' + q.replace(/\./g, '\\.') + ')', 'ig');
      });

      var omniboxResults = [];
      for (var i = 0; i < OMNIBOX_MAX_RESULTS && i < results.length; i++) {
        var result = results[i];

        var description = result.label;
        var firstCap = description.search(capitalLetterRE);
        if (firstCap >= 0 && result.type != 'ref.xml') {
          var newDesc;
          newDesc = '%{' + description.substring(0, firstCap) + '}%';
          newDesc += description.substring(firstCap);
          description = newDesc;
        }

        var subDescription = result.subLabel || '';
        if (subDescription) {
          description += ' %{(' + subDescription + ')}%';
        }

        for (var j = 0; j < queryREs.length; j++) {
          description = description.replace(queryREs[j], '%|$1|%');
        }

        // Remove HTML tags from description since omnibox cannot display them.
        description = description.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');

        // Convert special markers to Omnibox XML
        description = description
            .replace(/\%\{/g, '<dim>')
            .replace(/\}\%/g, '</dim>')
            .replace(/\%\|/g, '<match>')
            .replace(/\|\%/g, '</match>');

        omniboxResults.push({
          content: 'https://developer.android.com/' + result.link,
          description: description
        });
      }

      suggestFn(omniboxResults);
    }
  );

  chrome.omnibox.onInputEntered.addListener(function(text) {
    if (text.match(/^https?\:/)) {
      navigateToUrl(text);
    } else {
      navigateToUrl('https://developer.android.com/index.html#q=' +
          encodeURIComponent(text));
    }
  });
}


function navigateToUrl(url) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.update(tab.id, {url: url});
  });
}


/**
 * Helper function that gets the index of the last occurence of the given
 * regex in the given string, or -1 if not found.
 */
function regexFindLast(s, re) {
  if (s == '')
    return -1;
  var l = -1;
  var tmp;
  while ((tmp = s.search(re)) >= 0) {
    if (l < 0) l = 0;
    l += tmp;
    s = s.substr(tmp + 1);
  }
  return l;
}


/**
 * Helper function that counts the occurrences of a given character in
 * a given string.
 */
function countChars(s, c) {
  var n = 0;
  for (var i=0; i<s.length; i++)
    if (s.charAt(i) == c) ++n;
  return n;
}


/**
 * Populates matches with ranking data given the query.
 */
function rankResults(matches, query) {
  query = query || '';
  matches = matches || [];

  // We replace dashes with underscores so dashes aren't treated
  // as word boundaries.
  var queryParts = query.toLowerCase().replace(/-/g, '_').match(/\w+/g) || [''];

  for (var i = 0; i < matches.length; i++) {
    var totalScore = (matches[i].extraRank || 0) * 200;

    for (var j = 0; j < queryParts.length; j++) {
      var partialAlnumRE = new RegExp(queryParts[j]);
      var exactAlnumRE = new RegExp('\\b' + queryParts[j] + '\\b');
      totalScore += resultMatchScore(exactAlnumRE, partialAlnumRE, j, matches[i]);
    }

    matches[i].__resultScore = totalScore;
  }

  matches.sort(function(a, b) {
    var n = b.__resultScore - a.__resultScore;
    if (n == 0) // lexicographical sort if scores are the same
      n = (a.label < b.label) ? -1 : 1;
    return n;
  });
}


/**
 * Scores an individual match.
 */
function resultMatchScore(exactMatchRe, partialMatchRe, order, result) {
  // scores are calculated based on exact and prefix matches,
  // and then number of path separators (dots) from the last
  // match (i.e. favoring classes and deep package names)
  var score = 1.0;
  var labelLower = result.label.toLowerCase().replace(/-/g, '_');
  if (result.type == 'docs') {
    labelLower += ' ' + result.subLabel;
  }

  var t = regexFindLast(labelLower, exactMatchRe);
  if (t >= 0) {
    // exact part match
    var partsAfter = countChars(labelLower.substr(t + 1), '.');
    score *= 60 / (partsAfter + 1);
  } else {
    t = regexFindLast(labelLower, partialMatchRe);
    if (t >= 0) {
      // partial match
      var partsAfter = countChars(labelLower.substr(t + 1), '.');
      score *= 20 / (partsAfter + 1);
    }
  }

  if (!result.type.match(/ref/)) {
    // downgrade non-reference docs
    score /= 1.5;
  }

  score /= (1 + order / 2);

  return score;
}
