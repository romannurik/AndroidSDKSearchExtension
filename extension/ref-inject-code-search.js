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
var _RESOURCE_DOC_URL_REGEX = /http(?:s)?:\/\/d(?:eveloper)?\.android\.com\/reference\/android\/(?:.+\/)?(R(?:\..+)?)\.html/;

var _GOOGLESOURCE_SITE = "https://android.googlesource.com";
var _GITHUB_SITE = "https://github.com";

var _ALTERNATIVE_URL_TEMPLATE = '$BASEURL/$PROJECT/+/refs/heads/master/$TREE/$NAME_SLASH';
var _ALTERNATIVE_RESOURCES_PATH = '$BASEURL/platform/frameworks/base/+/refs/heads/master/core/res/res/';
var _ALTERNATIVE_SAMPLES_PATH = '$BASEURL/platform/development/+/master/samples';

var _GOOGLESOURCE_URL_TEMPLATE = _GOOGLESOURCE_SITE + '/$PROJECT/+/refs/heads/master/$TREE/$NAME_SLASH';
var _GOOGLESOURCE_RESOURCES_PATH = _GOOGLESOURCE_SITE + '/platform/frameworks/$PROJECT/+/refs/heads/master/$TREE/';
var _GOOGLESOURCE_SAMPLES_PATH = _GOOGLESOURCE_SITE + '/platform/development/+/master/samples';
var _CONSTRAINT_LAYOUT_URL_TEMPLATE = _GOOGLESOURCE_SITE + '/$PROJECT/+/studio-3.0/$TREE/$NAME_SLASH';

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
  'android.R.color' : 'values/colors_material.xml',
  'R.dimen'         : 'values/dimens.xml',
  'android.R.dimen' : 'values/dimens_material.xml',
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
  'android.R.style' : ['values/styles_material.xml', 'values/themes_material.xml'],
  'R.styleable'     : 'values/attrs.xml',
  'R.xml'           : 'xml/'
};

var _PACKAGE_MAP = {
  'java'                                 : { project:'platform/libcore',             tree:'ojluni/src/main/java' },
  'javax'                                : { project:'platform/libcore',             tree:'ojluni/src/main/java' },
  'javax.microedition'                   : { project:null,                           tree:null },
  'junit'                                : { project:'platform/frameworks/base',     tree:'legacy-test/src' },
  'org'                                  : { project:'platform/libcore',             tree:'luni/src/main/java' },
  'org.json'                             : { project:null,                           tree:null },
  'org.xmlpull'                          : { project:null,                           tree:null },
  'org.apache.http'                      : { project:'platform/libcore',             tree:'core/java' },
  'java.math'                            : { project:'platform/libcore',             tree:'luni/src/main/java' },
  'android'                              : { project:'platform/frameworks/base',     tree:'core/java' },
  'android.drm'                          : { project:'platform/frameworks/base',     tree:'drm/java' },
  'android.drm.mobile1'                  : { project:'platform/frameworks/base',     tree:'media/java' },
  'android.renderscript'                 : { project:'platform/frameworks/base',     tree:'rs/java' },
  'android.graphics'                     : { project:'platform/frameworks/base',     tree:'graphics/java' },
  'android.icu'                          : { project:'platform/external/icu',        tree:'android_icu4j/src/main/java' },
  'android.security'                     : { project:'platform/frameworks/base',     tree:'keystore/java' },
  'android.system'                       : { project:'platform/libcore',             tree:'luni/src/main/java' },
  'android.location'                     : { project:'platform/frameworks/base',     tree:'location/java' },
  'android.media'                        : { project:'platform/frameworks/base',     tree:'media/java' },
  'android.media.effect'                 : { project:'platform/frameworks/base',     tree:'media/mca/effect/java' },
  'android.mtp'                          : { project:'platform/frameworks/base',     tree:'media/java' },
  'android.opengl'                       : { project:'platform/frameworks/base',     tree:'opengl/java' },
  'android.sax'                          : { project:'platform/frameworks/base',     tree:'sax/java' },
  'android.telecom'                      : { project:'platform/frameworks/base',     tree:'telecomm/java' },
  'android.telephony'                    : { project:'platform/frameworks/base',     tree:'telephony/java' },
  'android.net.rtp'                      : { project:'platform/frameworks/opt/net/voip',      tree:'src/java' },
  'android.net.sip'                      : { project:'platform/frameworks/opt/net/voip',      tree:'src/java' },
  'android.net.wifi'                     : { project:'platform/frameworks/base',     tree:'wifi/java' },
  'android.support.animation'            : { project:'platform/frameworks/support',  tree:'dynamic-animation/src/main/java' },
  'android.support.annotation'           : { project:'platform/frameworks/support',  tree:'annotations/src/main/java' },
  'android.support.app.recommendation'   : { project:'platform/frameworks/support',  tree:'recommendation/src/main/java' },
  'android.support.compat'               : { project:null,                           tree:null },
  'android.support.content'              : { project:'platform/frameworks/support',  tree:'content/src/main/java' },
  'android.support.coreui'               : { project:null,                           tree:null },
  'android.support.coreutils'            : { project:null,                           tree:null },
  'android.support.customtabs'           : { project:'platform/frameworks/support',  tree:'customtabs/src/main/java' },
  'android.support.design'               : { project:'platform/frameworks/support',  tree:'design/src' },
  'android.support.fragment'             : { project:null,                           tree:null },
  'android.support.graphics.drawable'    : { project:'platform/frameworks/support',  tree:'graphics/drawable/static/src/main/java' },
  'android.support.multidex'             : { project:'platform/frameworks/multidex', tree:'library/src' },
  'android.support.media'                : { project:'platform/frameworks/support',  tree:'exifinterface/src/main/java' },
  'android.support.media.tv'             : { project:'platform/frameworks/support',  tree:'tv-provider/src/main/java' },
  'android.support.mediacompat'          : { project:null,                           tree:null },
  'android.support.mediacompat.testlib'  : { project:'platform/frameworks/support',  tree:'media-compat-test-lib/src/main/java' },
  'android.support.percent'              : { project:'platform/frameworks/support',  tree:'percent/src/main/java' },
  'android.support.text.emoji'           : { project:'platform/frameworks/support',  tree:'emoji/core/src/main/java' },
  'android.support.text.emoji.bundled'   : { project:'platform/frameworks/support',  tree:'emoji/bundled/src/main/java' },
  'android.support.text.emoji.widget'    : { project:'platform/frameworks/support',  tree:'emoji/appcompat/src/main/java' },
  'android.support.transition'           : { project:'platform/frameworks/support',  tree:'transition/src' },
  'android.support.v4'                   : { project:'platform/frameworks/support',  tree:'compat/src/main/java' },
  'android.support.v4.content'           : { project:'platform/frameworks/support',  tree:'core-utils/src/main/java' },
  'android.support.v4.math'              : { project:'platform/frameworks/support',  tree:'core-utils/src/main/java' },
  'android.support.v4.media'             : { project:'platform/frameworks/support',  tree:'media-compat/java' },
  'android.support.v4.print'             : { project:'platform/frameworks/support',  tree:'core-utils/src/main/java' },
  'android.support.v4.provider'          : { project:'platform/frameworks/support',  tree:'core-utils/src/main/java' },
  'android.support.v4.view.animation'    : { project:'platform/frameworks/support',  tree:'core-ui/src/main/java' },
  'android.support.v4.widget'            : { project:'platform/frameworks/support',  tree:'core-ui/src/main/java' },
  'android.support.v7'                   : { project:'platform/frameworks/support',  tree:'compat/src/main/java' },
  'android.support.v7.app'               : { project:'platform/frameworks/support',  tree:'v7/appcompat/src/main/java' },
  'android.support.v7.content.res'       : { project:'platform/frameworks/support',  tree:'v7/appcompat/src/main/java' },
  'android.support.v7.graphics'          : { project:'platform/frameworks/support',  tree:'v7/palette/src/main/java' },
  'android.support.v7.graphics.drawable' : { project:'platform/frameworks/support',  tree:'v7/appcompat/src/main/java' },
  'android.support.v7.media'             : { project:'platform/frameworks/support',  tree:'v7/mediarouter/src' },
  'android.support.v7.preference'        : { project:'platform/frameworks/support',  tree:'v7/preference/src/main/java' },
  'android.support.v7.util'              : { project:'platform/frameworks/support',  tree:'v7/recyclerview/src/main/java' },
  'android.support.v7.view'              : { project:'platform/frameworks/support',  tree:'v7/appcompat/src/main/java' },
  'android.support.v7.widget'            : { project:'platform/frameworks/support',  tree:'v7/appcompat/src/main/java' },
  'android.support.v7.widget.helper'     : { project:'platform/frameworks/support',  tree:'v7/recyclerview/src/main/java' },
  'android.support.v7.widget.util'       : { project:'platform/frameworks/support',  tree:'v7/recyclerview/src/main/java' },
  'android.support.v8.renderscript'      : { project:'platform/frameworks/support',  tree:'v8/renderscript/java/src' },
  'android.support.v13'                  : { project:'platform/frameworks/support',  tree:'v13/java' },
  'android.support.v14.preference'       : { project:'platform/frameworks/support',  tree:'v14/preference/src/main/java' },
  'android.support.v17.leanback'         : { project:'platform/frameworks/support',  tree:'v17/leanback/src' },
  'android.support.v17.preference'       : { project:'platform/frameworks/support',  tree:'v17/preference-leanback/src' },
  'android.support.wear'                 : { project:'platform/frameworks/support',  tree:'wear/src/main/java' },
  'android.support.constraint'           : { project:'platform/frameworks/opt/sherpa',        tree:'constraintlayout/src/main/java' },
  //'android.arch.core.executor.testing' : { project:'',                            tree:'' },
  'android.arch.lifecycle'               : { project:'platform/frameworks/support', tree:'lifecycle/extensions/src/main/java' },
  'android.arch.paging'                  : { project:'platform/frameworks/support', tree:'paging/common/src/main/java' },
  'android.arch.persistence.db'          : { project:'platform/frameworks/support', tree:'room/db/src/main/java' },
  'android.arch.persistence.db.framework'    : { project:'platform/frameworks/support',      tree:'room/db-impl/src/main/java' },
  'android.arch.persistence.room'        : { project:'platform/frameworks/support', tree:'room/common/src/main/java' },
  'android.arch.persistence.room.migration'  : { project:'platform/frameworks/support',      tree:'room/runtime/src/main/java' },
  'android.arch.persistence.room.testing'    : { project:'platform/frameworks/support',      tree:'room/testing/src/main/java' },
  'android.support.v7.recyclerview.extensions'   : { project:'platform/frameworks/support',  tree:'paging/runtime/src/main/java' }
};

var _TREE_REFINEMENTS = {
  'android.support.graphics.drawable': [
    {
      regex: /Animated|Animatable/,
      tree: 'graphics/drawable/animated/src/main/java'
    }
  ],
  'android.support.v4.app': [
    {
      regex: /Fragment|Loader/,
      tree: 'fragment/src/main/java'
    },
    {
      regex: /ActionBarDrawerToggle/,
      tree: 'core-ui/src/main/java'
    },
    {
      regex: /TaskStackBuilder|AppLaunchChecker|FrameMetricsAggregator|NavUtils/,
      tree: 'core-utils/src/main/java'
    }
  ],
  'android.support.v4.content': [
    {
      regex: /Compat/,
      tree: 'compat/src/main/java'
    }
  ],
  'android.support.v4.graphics.drawable': [
    {
      regex: /RoundedBitmapDrawable/,
      tree: 'core-utils/src/main/java'
    }
  ],
  'android.support.v4.provider': [
    {
      regex: /Font/,
      tree: 'compat/src/main/java'
    }
  ],
  'android.support.v4.view': [
    {
      regex: /AbsSavedState|AsyncLayoutInflater|NestedScrollingChildHelper|NestedScrollingParentHelper|PagerAdapter|PagerTabStrip|PagerTitleStrip|ViewPager/,
      tree: 'core-ui/src/main/java'
    },
    {
      regex: /GravityCompat/,
      tree: 'compat/src/main/java'
    }
  ],
  'android.support.v4.view.animation': [
    {
      regex: /Path/,
      tree: 'compat/src/main/java'
    }
  ],
  'android.support.v4.widget': [
    {
      regex: /Compat/,
      tree: 'compat/src/main/java'
    }
  ],
  'android.support.v7.app': [
    {
      regex: /MediaRoute/,
      tree: 'v7/mediarouter/src'
    }
  ],
  'android.support.v7.widget': [
    {
      regex: /RecyclerView|ItemAnimator|OrientationHelper|LinearSmoothScroller|DividerItemDecoration|SnapHelper/,
      tree: 'v7/recyclerview/src/main/java'
    },
    {
      regex: /(Linear|Grid|StaggeredGrid)LayoutManager/,
      tree: 'v7/recyclerview/src/main/java'
    },
    {
      regex: /CardView/,
      tree: 'v7/cardview/src/main/java'
    },
    {
      regex: /GridLayout|\.Space$/, // must appear after GridLayoutManager
      tree: 'v7/gridlayout/src/main/java'
    }
  ],
  'android.arch.lifecycle': [
    {
      regex: /LifecycleRegistryOwner/,
      tree: 'lifecycle/runtime/src/main/java'
    },
    {
      regex: /Lifecycle|LifecycleObserver|LifecycleOwner|OnLifecycleEvent/,
      tree: 'lifecycle/common/src/main/java'
    }
  ],
  'android.arch.paging': [
    {
      regex: /DiffCallback/,
      tree: 'paging/runtime/src/main/java'
    }
  ],
  'android.arch.persistence.room': [
    {
      regex: /Rx|EmptyResultSetException/,
      tree: 'room/rxjava2/src/main/java'
    },
    {
      regex: /DatabaseConfiguration|InvalidationTracker|Room/,
      tree: 'room/runtime/src/main/java'
    }
  ]
};

var _NAME_REFINEMENTS = {
  'android.arch.paging':  {
      replace: '/arch/paging/',
      with: '/arch/util/paging/'
    },
    'android.support.v7.recyclerview.extensions': {
      replace: '/support/v7/recyclerview/extensions/',
      with: '/arch/util/paging/'
    }
};

var _ATSL_PACKAGE_PREFIX = 'android.support.test';

/*
 * Pattern map for ATSL.
 * NB: Order is important
 */
var _ATSL_FOLDER_MAP = {
  'espresso.contrib' : 'espresso/contrib',
  'espresso.intent' : 'espresso/intents',
  'espresso.web' : 'espresso/web',
  'espresso' : 'espresso/core',
  'rule' : 'rules',
  'annotation' : 'rules', // only for UiThreadTest
  'filters' : 'runner',
  'uiautomator' : 'uiautomator_test_libraries',
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
  return { suffix : suffix, folder : folder };
}

chrome.storage.local.get({
  baseUrl: _GOOGLESOURCE_SITE
}, function(items) {
  var url = window.location.href;
  var appendContent;

  var m;
  if (m = url.match(_PACKAGE_DOC_URL_REGEX)) {
    var nameSlash = m[1];
    var packageName = nameSlash.replace(/\//g, '.');

    var pi = getPackageInfo(packageName);
    if (pi && pi.project != null) {
      var templateUrl;
      var espressoInfo = getTestingSupportLibraryInfo(packageName);

      switch (items.baseUrl) {
        case _GITHUB_SITE: {
          var isOkGithub = espressoInfo == null && isPackageAvailableGithub(pi);
          if (isOkGithub) {
            templateUrl = _GITHUB_URL_TEMPLATE;
            break;
          }
        }
        case _GOOGLESOURCE_SITE: {
          if (packageName.indexOf('constraint') != -1) {
            templateUrl = _CONSTRAINT_LAYOUT_URL_TEMPLATE;
          } else {
            templateUrl = _GOOGLESOURCE_URL_TEMPLATE;
          }
          break;
        }
        default:
          templateUrl = _ALTERNATIVE_URL_TEMPLATE;
          break;
      }

      if (packageName in _NAME_REFINEMENTS) {
        var refinements = _NAME_REFINEMENTS[packageName];
        outerNameSlash = outerNameSlash.replace(refinements.replace, refinements.with);
      }

      var url = templateUrl
        .replace(/\$BASEURL/g, items.baseUrl)
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
        url = url.replace(urlPattern,
               'testing/+/android-support-test/');
        url += folder + '/src/main/java/android/support/test/' + suffix;
      }

      appendContent = [
          '<a class="__asdk_search_extension_link__" href="', url, '">view source listing</a>'
      ].join('');
    }

  } else if (m = url.match(_RESOURCE_DOC_URL_REGEX)) {
    var nameSlash = m[1];
    if (url.indexOf('support') === -1) {
      nameSlash = "android." + nameSlash;
    }
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

      switch (items.baseUrl) {
        case _GITHUB_SITE: {
          templateUrl = _GITHUB_RESOURCES_PATH;
          break;
        }
        case _GOOGLESOURCE_SITE: {
          templateUrl = _GOOGLESOURCE_RESOURCES_PATH;
          break;
        }
        default:
          templateUrl = _ALTERNATIVE_RESOURCES_PATH;
          break;
      }

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
    if (packageName in _NAME_REFINEMENTS) {
      var refinements = _NAME_REFINEMENTS[packageName];
      outerNameSlash = outerNameSlash.replace(refinements.replace, refinements.with);
    }
    if (pi && pi.project != null) {
      var templateUrl;
      var espressoInfo = getTestingSupportLibraryInfo(packageName);

      switch (items.baseUrl) {
        case _GITHUB_SITE: {
          var isOkGithub = espressoInfo == null && isPackageAvailableGithub(pi);
          if (isOkGithub) {
            templateUrl = _GITHUB_URL_TEMPLATE;
            break;
          }
        }
        case _GOOGLESOURCE_SITE: {
          if (packageName.indexOf('constraint') != -1) {
            templateUrl = _CONSTRAINT_LAYOUT_URL_TEMPLATE;
          } else {
            templateUrl = _GOOGLESOURCE_URL_TEMPLATE;
          }
          break;
        }
        default:
          templateUrl = _ALTERNATIVE_URL_TEMPLATE;
          break;
      }

      var url = templateUrl
        .replace(/\$BASEURL/g, items.baseUrl)
        .replace(/\$PROJECT/g, pi.project.replace(/\//g, isOkGithub ? "_" : "/"))
        .replace(/\$TREE/g, pi.tree)
        .replace(/\$NAME_SLASH/g, outerNameSlash + '.java');

      if (espressoInfo != null) {
         url = url.replace('base/+/refs/heads/master/core/java/android/support/test/',
             'testing/+/android-support-test/'
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
    document.querySelector('#jd-content').insertBefore(
        appendNode, document.querySelector('#jd-content h1').nextSibling);
  }

  var samplesUrl;

  switch (items.baseUrl) {
    case _GITHUB_SITE: {
      samplesUrl = _GITHUB_SAMPLES_PATH;
      break;
    }
    case _GOOGLESOURCE_SITE: {
      samplesUrl = _GOOGLESOURCE_SAMPLES_PATH;
      break;
    }
    default:
      samplesUrl = _ALTERNATIVE_SAMPLES_PATH.replace(/\$BASEURL/g, items.baseUrl);
      break;
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
    link.href = samplesUrl + codePath;
  }

});
