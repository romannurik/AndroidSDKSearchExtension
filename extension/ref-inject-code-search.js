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

var _PACKAGE_DOC_URL_REGEX = /http(?:s)?:\/\/d(?:eveloper)?\.android\.com\/reference\/(.+)\/package-(summary|descr)\.html/;
var _CLASS_DOC_URL_REGEX = /http(?:s)?:\/\/d(?:eveloper)?\.android\.com\/reference\/(.+)\.html/;
var _RESOURCE_DOC_URL_REGEX = /http(?:s)?:\/\/d(?:eveloper)?.android\.com\/reference\/android\/(?:.+\/)?(R(?:\..+)?)\.html/;

var _GOOGLESOURCE_URL_TEMPLATE = '$BASEURL/$PROJECT/+/refs/heads/master/$TREE/$NAME_SLASH';
var _GOOGLESOURCE_RESOURCES_PATH = '$BASEURL/platform/frameworks/$PROJECT/+/refs/heads/master/$TREE/';
var _GOOGLESOURCE_SAMPLES_PATH = '$BASEURL/platform/development/+/master/samples';

// @formatter:off
var _RESOURCE_MAP = {
  'R'               : '',
  'R.anim'          : 'anim/',
  'R.animator'      : 'animator/',
  'R.array'         : 'values/arrays.xml',
  'R.attr'          : 'values/attrs.xml',
  'R.bool'          : 'values/bools.xml',
  'R.color'         : 'values/colors_material.xml',
  'R.dimen'         : 'values/dimens_material.xml',
  'R.drawable'      : ['drawable/', 'drawable-xxhdpi/'],
  'R.id'            : 'values/ids.xml',
  'R.integer'       : 'integers.xml',
  'R.interpolator'  : 'interpolator/',
  'R.layout'        : 'layout/',
  'R.menu'          : 'menu/',
  'R.mipmap'        : ['mipmap-mdpi/', 'mipmap-xxhdpi/'],
  'R.plurals'       : 'values/strings.xml',
  'R.raw'           : 'raw/',
  'R.string'        : 'values/strings.xml',
  'R.style'         : ['values/styles_material.xml', 'values/themes_material.xml'],
  'R.styleable'     : 'values/attrs.xml',
  'R.xml'           : 'xml/'
};
// @formatter:on

// @formatter:off
var _PACKAGE_MAP = {
  'java'                                 : { project:'platform/libcore',             tree:'ojluni/src/main/java' },
  'javax'                                : { project:'platform/libcore',             tree:'ojluni/src/main/java' },
  'org'                                  : { project:'platform/libcore',             tree:'ojluni/src/main/java' },
  'java.math'                            : { project:'platform/libcore',             tree:'luni/src/main/java' },
  'java.util.concurrent'                 : { project:'platform/libcore',             tree:'luni/src/main/java' },
  'android'                              : { project:'platform/frameworks/base',     tree:'core/java' },
  'android.drm'                          : { project:'platform/frameworks/base',     tree:'drm/java' },
  'android.drm.mobile1'                  : { project:'platform/frameworks/base',     tree:'media/java' },
  'android.renderscript'                 : { project:'platform/frameworks/base',     tree:'graphics/java' },
  'android.graphics'                     : { project:'platform/frameworks/base',     tree:'graphics/java' },
  'android.icu'                          : { project:'platform/frameworks/base',     tree:'icu4j/java' },
  'android.security'                     : { project:'platform/frameworks/base',     tree:'keystore/java' },
  'android.location'                     : { project:'platform/frameworks/base',     tree:'location/java' },
  'android.media'                        : { project:'platform/frameworks/base',     tree:'media/java' },
  'android.mtp'                          : { project:'platform/frameworks/base',     tree:'media/java' },
  'android.opengl'                       : { project:'platform/frameworks/base',     tree:'opengl/java' },
  'android.sax'                          : { project:'platform/frameworks/base',     tree:'sax/java' },
  'android.telephony'                    : { project:'platform/frameworks/base',     tree:'telephony/java' },
  'android.net.rtp'                      : { project:'platform/frameworks/base',     tree:'voip/java' },
  'android.net.sip'                      : { project:'platform/frameworks/base',     tree:'voip/java' },
  'android.net.wifi'                     : { project:'platform/frameworks/base',     tree:'wifi/java' },
  'android.support.v4'                   : { project:'platform/frameworks/support',  tree:'v4/java' },
  'android.support.v7'                   : { project:'platform/frameworks/support',  tree:'v7/appcompat/src' },
  'android.support.v7.media'             : { project:'platform/frameworks/support',  tree:'v7/mediarouter/src' },
  'android.support.v7.graphics'          : { project:'platform/frameworks/support',  tree:'v7/palette/src' },
  'android.support.v13'                  : { project:'platform/frameworks/support',  tree:'v13/java' },
  'android.support.v17.leanback'         : { project:'platform/frameworks/support',  tree:'v17/leanback/src' },
  'android.support.design'               : { project:'platform/frameworks/support',  tree:'design/src' },
  'android.support.customtabs'           : { project:'platform/frameworks/support',  tree:'customtabs/src' },
  'android.support.percent'              : { project:'platform/frameworks/support',  tree:'percent/src' },
  'android.support.app.recommendation'   : { project:'platform/frameworks/support',  tree:'recommendation/src' },
  'android.support.v7.preference'        : { project:'platform/frameworks/support',  tree:'v7/preference/src' },
  'android.support.v14.preference'       : { project:'platform/frameworks/support',  tree:'v14/preference/src' },
};
// @formatter:on

var _TREE_REFINEMENTS = {
  'android.support.v7.app': [
    {
      regex: /MediaRoute/,
      tree: 'v7/mediarouter/src'
    }
  ],
  'android.support.v7.widget': [
    {
      regex: /RecyclerView|DefaultItemAnimator|OrientationHelper|LinearSmoothScroller/,
      tree: 'v7/recyclerview/src'
    },
    {
      regex: /(Linear|Grid|StaggeredGrid)LayoutManager/,
      tree: 'v7/recyclerview/src'
    },
    {
      regex: /CardView/,
      tree: 'v7/cardview/src'
    },
    {
      regex: /GridLayout|\.Space$/, // must appear after GridLayoutManager
      tree: 'v7/gridlayout/src'
    }
  ]
};

var _ATSL_PACKAGE_PREFIX = 'android.support.test';

/*
 * Pattern map for ATSL.
 * NB: Order is important
 */
var _ATSL_FOLDER_MAP = {
  'espresso.contrib': 'espresso/contrib',
  'espresso.intent': 'espresso/intents',
  'espresso.web': 'espresso/web',
  'espresso': 'espresso/core',
  'rule': 'rules',
  'annotation': 'rules', // only for UiThreadTest
  'filters': 'runner',
  'uiautomator': 'uiautomator_test_libraries',
};

function trimLastNamePart(s) {
  return s.replace(/\.[^.]*$/, '');
}

function getPackageInfo(packageName) {
  var tmpPackageName = packageName;
  while (tmpPackageName) {
    if (tmpPackageName in _PACKAGE_MAP) {
      var pi = {};
      pi.tree = _PACKAGE_MAP[tmpPackageName].tree;
      pi.project = _PACKAGE_MAP[tmpPackageName].project;
      return pi;
    }
    if (!tmpPackageName.match(/\./)) {
      break;
    }
    tmpPackageName = trimLastNamePart(tmpPackageName);
  }
  return null;
}

function getSupportPackageName(url) {
  return url.replace(/.+android\/support\//g, '').replace(/\/R.+/g, '')
}

function getTestingSupportLibraryInfo(packageName) {
  if (packageName.indexOf(_ATSL_PACKAGE_PREFIX) != 0) {
    return null;
  }
  var suffix = packageName.substring(_ATSL_PACKAGE_PREFIX.length + 1);
  var folder = null;
  //Try and find folder match in map.
  //A match can be part of the suffix
  var s;
  for (s in _ATSL_FOLDER_MAP) {
    if (packageName.indexOf(s) != -1) {
      folder = _ATSL_FOLDER_MAP[s];
      break;
    }
  }
  if (folder == null) {
    if (suffix == '' || suffix.indexOf('runner') != -1) {
      folder = 'runner';
    } else {
      //Better to guess rather than nothing
      folder = suffix.replace(/\./, '/');
    }
  }
  return {suffix: suffix, folder: folder};
}

chrome.storage.local.get({
  baseUrl: 'https://android.googlesource.com'
}, function (items) {
  var url = window.location.href;
  var appendContent;

  var m;
  if (m = url.match(_PACKAGE_DOC_URL_REGEX)) {
    var nameSlash = m[1];
    var packageName = nameSlash.replace(/\//g, '.');

    var pi = getPackageInfo(packageName);
    if (pi) {
      var url = _GOOGLESOURCE_URL_TEMPLATE
        .replace(/\$BASEURL/g, items.baseUrl)
        .replace(/\$PROJECT/g, pi.project)
        .replace(/\$TREE/g, pi.tree)
        .replace(/\$NAME_SLASH/g, nameSlash);

      var espressoInfo = getTestingSupportLibraryInfo(packageName);
      if (espressoInfo != null) {
        var suffix;
        if (espressoInfo.suffix != null) {
          suffix = espressoInfo.suffix.replace(/\./g, '/');
        } else {
          suffix = '';
        }
        var folder = espressoInfo.folder;
        var urlPattern;
        if (suffix != '') {
          urlPattern = 'base/+/refs/heads/master/core/java/android/support/test/' + suffix;
        } else {
          urlPattern = 'base/+/refs/heads/master/core/java/android/support/test';
        }
        url = url.replace(urlPattern, 'testing/+/android-support-test/');
        url += folder + '/src/main/java/android/support/test/' + suffix;
      }

      appendContent = [
        '<a class="__asdk_search_extension_link__" href="', url, '">view source listing</a>'
      ].join('');
    }

  } else if (m = url.match(_RESOURCE_DOC_URL_REGEX)) {
    var nameSlash = m[1];
    if (nameSlash in _RESOURCE_MAP) {
      var destinations = _RESOURCE_MAP[nameSlash];
      if (!destinations.splice) {
        // Single string, convert to array
        destinations = [destinations];
      }
      appendContent = '';

      var project = 'base';
      var tree = 'core/res/res';
      if (url.indexOf('support') !== -1) {
        project = 'support';
        tree = getSupportPackageName(url) + '/res';
      }

      for (var i = 0; i < destinations.length; i++) {
        var resPath = destinations[i];
        appendContent += [
          '<a class="__asdk_search_extension_link__" href="',
          _GOOGLESOURCE_RESOURCES_PATH.replace(/\$BASEURL/g, items.baseUrl)
            .replace(/\$PROJECT/g, project)
            .replace(/\$TREE/g, tree) + resPath,
          '">view res/',
          resPath.replace(/\/$/, ''),
          '</a>'
        ].join('');
      }
    }

  } else if (m = url.match(_CLASS_DOC_URL_REGEX)) {
    var nameSlash = m[1];
    var outerNameSlash = nameSlash.replace(/\..*$/, ''); // trim inner classes
    var outerNameDot = outerNameSlash.replace(/\//g, '.');
    var packageName = trimLastNamePart(outerNameDot);

    var pi = getPackageInfo(packageName);
    if (packageName in _TREE_REFINEMENTS) {
      var refinements = _TREE_REFINEMENTS[packageName];
      for (var i = 0; i < refinements.length; i++) {
        if (outerNameDot.match(refinements[i].regex)) {
          pi.tree = refinements[i].tree;
          break;
        }
      }
    }
    if (pi) {
      var url = _GOOGLESOURCE_URL_TEMPLATE
        .replace(/\$BASEURL/g, items.baseUrl)
        .replace(/\$PROJECT/g, pi.project)
        .replace(/\$TREE/g, pi.tree)
        .replace(/\$NAME_SLASH/g, outerNameSlash + '.java')

      var espressoInfo = getTestingSupportLibraryInfo(packageName);
      if (espressoInfo != null) {
        url = url.replace('base/+/refs/heads/master/core/java/android/support/test/', 'testing/+/android-support-test/'
          + espressoInfo.folder + '/src/main/java/android/support/test/');
      }

      appendContent = [
        '<a class="__asdk_search_extension_link__" href="', url, '">view source</a>'
      ].join('');
    }

  }

  if (appendContent) {
    var appendNode = document.createElement('div');
    appendNode.classList.add('__asdk_search_extension_link_container__');
    appendNode.innerHTML = appendContent;
    document.querySelector('#jd-content').insertBefore(appendNode, document.querySelector('#jd-content h1').nextSibling);
  }

  // rewrite any direct links to sample code
  var sampleLinks = document.querySelectorAll('a[href*="/resources/samples"]');
  for (var i = 0; i < sampleLinks.length; i++) {
    var link = sampleLinks[i];
    var codePath = link.href.split('resources/samples')[1];
    var rootSuffix = 'index.html'; // a rooted sample link
    var classSuffix = '.html'; // a specific class link, usually in ApiDemos
    if (codePath.indexOf(rootSuffix) > 0) {
      codePath = codePath.slice(0, codePath.indexOf(rootSuffix));
    } else if (classSuffix == codePath.slice(-classSuffix.length)) {
      codePath = codePath.slice(0, codePath.length - classSuffix.length) + '.java';
    }
    link.href = _GOOGLESOURCE_SAMPLES_PATH.replace(/\$BASEURL/g, items.baseUrl) + codePath;
  }

});
