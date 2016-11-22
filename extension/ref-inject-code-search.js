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

var _GOOGLESOURCE_SITE = "https://android.googlesource.com";
var _GITHUB_SITE = "https://github.com";

var _GOOGLESOURCE_URL_TEMPLATE = _GOOGLESOURCE_SITE + '/$PROJECT/+/refs/heads/master/$TREE/$NAME_SLASH';
var _GOOGLESOURCE_RESOURCES_PATH = _GOOGLESOURCE_SITE + '/platform/frameworks/$PROJECT/+/refs/heads/master/$TREE/';
var _GOOGLESOURCE_SAMPLES_PATH = _GOOGLESOURCE_SITE + '/platform/development/+/master/samples';

var _GITHUB_URL_TEMPLATE = _GITHUB_SITE + '/android/$PROJECT/blob/master/$TREE/$NAME_SLASH';
var _GITHUB_RESOURCES_PATH = _GITHUB_SITE + '/android/platform_frameworks_$PROJECT/tree/master/$TREE/';
var _GITHUB_SAMPLES_PATH = _GITHUB_SITE + '/android/platform_development/tree/master/samples';

var _RESOURCE_MAP = {
  'R'               : '',
  'R.anim'          : 'anim/',
  'R.animator'      : 'animator/',
  'R.array'         : 'values/arrays.xml',
  'R.attr'          : 'values/attrs.xml',
  'R.bool'          : 'values/bools.xml',
  'R.color'         : 'values/colors.xml',
  'R.dimen'         : 'values/dimens.xml',
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
  'R.style'         : ['values/styles.xml', 'values/themes.xml'],
  'R.styleable'     : 'values/attrs.xml',
  'R.xml'           : 'xml/'
};

var _PACKAGE_MAP = {
  'java'                                 : { project: 'platform/libcore',             tree: 'ojluni/src/main/java' },
  'javax'                                : { project: 'platform/libcore',             tree: 'ojluni/src/main/java' },
  'javax.javax.microedition'             : { project: null,                           tree: null },
  'org'                                  : { project:'platform/libcore',              tree:'luni/src/main/java' },
  'org.json'                             : { project: null,                           tree: null },
  'org.xmlpull'                          : { project: null,                           tree: null },
  'org.apache.http'                      : { project: 'platform/libcore',             tree: 'core/java' },
  'java.math'                            : { project: 'platform/libcore',             tree: 'luni/src/main/java' },
  'java.util.concurrent'                 : { project: 'platform/libcore',             tree: 'luni/src/main/java' },
  'android'                              : { project: 'platform/frameworks/base',     tree: 'core/java' },
  'android.drm'                          : { project: 'platform/frameworks/base',     tree: 'drm/java' },
  'android.drm.mobile1'                  : { project: 'platform/frameworks/base',     tree: 'media/java' },
  'android.renderscript'                 : { project: 'platform/frameworks/base',     tree: 'rs/java' },
  'android.graphics'                     : { project: 'platform/frameworks/base',     tree: 'graphics/java' },
  'android.icu'                          : { project: 'platform/frameworks/base',     tree: 'icu4j/java' },
  'android.security'                     : { project: 'platform/frameworks/base',     tree: 'keystore/java' },
  'android.system'                       : { project: null,                           tree: null },
  'android.location'                     : { project: 'platform/frameworks/base',     tree: 'location/java' },
  'android.media'                        : { project: 'platform/frameworks/base',     tree: 'media/java' },
  'android.media.effect'                 : { project: 'platform/frameworks/base',     tree: 'media/mca/effect/java' },
  'android.mtp'                          : { project: 'platform/frameworks/base',     tree: 'media/java' },
  'android.opengl'                       : { project: 'platform/frameworks/base',     tree: 'opengl/java' },
  'android.sax'                          : { project: 'platform/frameworks/base',     tree: 'sax/java' },
  'android.telephony'                    : { project: 'platform/frameworks/base',     tree: 'telephony/java' },
  'android.net.rtp'                      : { project: 'platform/frameworks/base',     tree: 'voip/java' },
  'android.net.sip'                      : { project: 'platform/frameworks/base',     tree: 'voip/java' },
  'android.net.wifi'                     : { project: 'platform/frameworks/base',     tree: 'wifi/java' },
  'android.support.annotation'           : { project: 'platform/frameworks/support',  tree: 'annotations/src' },
  'android.support.annotations'          : { project: null,  tree: null },
  'android.support.app.recommendation'   : { project: 'platform/frameworks/support',  tree: 'recommendation/src' },
  'android.support.compat'               : { project: null,  tree: null },
  'android.support.coreui'               : { project: null,  tree: null },
  'android.support.coreutils'            : { project: null,  tree: null },
  'android.support.customtabs'           : { project: 'platform/frameworks/support',  tree: 'customtabs/src' },
  'android.support.design'               : { project: 'platform/frameworks/support',  tree: 'design/src' },
  'android.support.fragment'             : { project: null,  tree: null },
  'android.support.graphics.drawable'    : { project: null,  tree: null },
  'android.support.multidex'             : { project: null,  tree: null },
  'android.support.mediacompat'          : { project: null,  tree: null },
  'android.support.percent'              : { project: 'platform/frameworks/support',  tree: 'percent/src' },
  'android.support.provider'             : { project: null,  tree: null },
  'android.support.transition'           : { project: null,  tree: null },
  'android.support.v4'                   : { project: 'platform/frameworks/support',  tree: 'v4/java' },
  'android.support.v7'                   : { project: 'platform/frameworks/support',  tree: 'v7/appcompat/src' },
  'android.support.v7.media'             : { project: 'platform/frameworks/support',  tree: 'v7/mediarouter/src' },
  'android.support.v7.graphics'          : { project: 'platform/frameworks/support',  tree: 'v7/palette/src' },
  'android.support.v7.preference'        : { project: 'platform/frameworks/support',  tree: 'v7/preference/src' },
  'android.support.v13'                  : { project: 'platform/frameworks/support',  tree: 'v13/java' },
  'android.support.v17.leanback'         : { project: 'platform/frameworks/support',  tree: 'v17/leanback/src' },
  'android.support.v14.preference'       : { project: 'platform/frameworks/support',  tree: 'v14/preference/src' },
  'android.support.wearable'             : { project: null,  tree: null }
};

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

function isPackageAvailableGithub(packageInfo) {
  return packageInfo.tree.indexOf('luni') === -1;
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
  baseUrl: _GOOGLESOURCE_SITE
}, function (items) {
  var url = window.location.href;
  var appendContent;

  var github = items.baseUrl === _GITHUB_SITE;

  var m;
  if (m = url.match(_PACKAGE_DOC_URL_REGEX)) {
    var nameSlash = m[1];
    var packageName = nameSlash.replace(/\//g, '.');

    var pi = getPackageInfo(packageName);
    if (pi && pi.project != null) {
      var templateUrl;
      var espressoInfo = getTestingSupportLibraryInfo(packageName);

      var isOkGithub = github && espressoInfo == null && isPackageAvailableGithub(pi);
      if (isOkGithub) {
        templateUrl = _GITHUB_URL_TEMPLATE;
      } else {
        templateUrl = _GOOGLESOURCE_URL_TEMPLATE;
      }

      var url = templateUrl
        .replace(/\$PROJECT/g, pi.project.replace(/\//g, isOkGithub ? "_" : "/"))
        .replace(/\$TREE/g, pi.tree)
        .replace(/\$NAME_SLASH/g, nameSlash);

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
        var packageName = getSupportPackageName(url);

        project = 'support';
        tree = packageName + '/res';

        packageName = 'android.support.' + packageName;

        if (_PACKAGE_MAP[packageName].project == null) return;
      }

      var templateUrl = github ? _GITHUB_RESOURCES_PATH : _GOOGLESOURCE_RESOURCES_PATH;

      for (var i = 0; i < destinations.length; i++) {
        var resPath = destinations[i];
        appendContent += [
          '<a class="__asdk_search_extension_link__" href="',
          templateUrl.replace(/\$BASEURL/g, items.baseUrl)
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
    if (pi && pi.project != null) {
      var templateUrl;
      var espressoInfo = getTestingSupportLibraryInfo(packageName);

      var isOkGithub = github && espressoInfo == null && isPackageAvailableGithub(pi);
      if (isOkGithub) {
        templateUrl = _GITHUB_URL_TEMPLATE;
      } else {
        templateUrl = _GOOGLESOURCE_URL_TEMPLATE;
      }

      var url = templateUrl
        .replace(/\$PROJECT/g, pi.project.replace(/\//g, isOkGithub ? "_" : "/"))
        .replace(/\$TREE/g, pi.tree)
        .replace(/\$NAME_SLASH/g, outerNameSlash + '.java');

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

  var samplesUrl = github ? _GITHUB_SAMPLES_PATH : _GOOGLESOURCE_SAMPLES_PATH;

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
    link.href = samplesUrl + codePath;
  }

});
