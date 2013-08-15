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

var XML_DATA = [
  { label:"AndroidManifest.xml", link:"guide/topics/manifest/manifest-intro.html", extraRank:1 },

  // Manifest
  { subLabel:"AndroidManifest.xml", label:"<action>", link:"guide/topics/manifest/action-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<activity>", link:"guide/topics/manifest/activity-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<activity-alias>", link:"guide/topics/manifest/activity-alias-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<application>", link:"guide/topics/manifest/application-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<category>", link:"guide/topics/manifest/category-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<compatible-screens>", link:"guide/topics/manifest/compatible-screens-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<data>", link:"guide/topics/manifest/data-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<grant-uri-permission>", link:"guide/topics/manifest/grant-uri-permission-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<instrumentation>", link:"guide/topics/manifest/instrumentation-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<intent-filter>", link:"guide/topics/manifest/intent-filter-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<manifest>", link:"guide/topics/manifest/manifest-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<meta-data>", link:"guide/topics/manifest/meta-data-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<path-permission>", link:"guide/topics/manifest/path-permission-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<permission>", link:"guide/topics/manifest/permission-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<permission-group>", link:"guide/topics/manifest/permission-group-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<permission-tree>", link:"guide/topics/manifest/permission-tree-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<provider>", link:"guide/topics/manifest/provider-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<receiver>", link:"guide/topics/manifest/receiver-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<service>", link:"guide/topics/manifest/service-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<supports-gl-texture>", link:"guide/topics/manifest/supports-gl-texture-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<supports-screens>", link:"guide/topics/manifest/supports-screens-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<uses-configuration>", link:"guide/topics/manifest/uses-configuration-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<uses-feature>", link:"guide/topics/manifest/uses-feature-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<uses-library>", link:"guide/topics/manifest/uses-library-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<uses-permission>", link:"guide/topics/manifest/uses-permission-element.html" },
  { subLabel:"AndroidManifest.xml", label:"<uses-sdk>", link:"guide/topics/manifest/uses-sdk-element.html" },

  // Animations
  { subLabel:"Animation Resources", label:"<animator>", link:"guide/topics/graphics/animation.html#declaring-xml" },
  { subLabel:"Animation Resources", label:"<objectAnimator>", link:"guide/topics/graphics/animation.html#declaring-xml" },

  { subLabel:"Animation Resources", label:"<set>", link:"guide/topics/resources/animation-resource.html#set-element" },
  { subLabel:"Animation Resources", label:"<alpha>", link:"guide/topics/resources/animation-resource.html#set-element" },
  { subLabel:"Animation Resources", label:"<scale>", link:"guide/topics/resources/animation-resource.html#set-element" },
  { subLabel:"Animation Resources", label:"<translate>", link:"guide/topics/resources/animation-resource.html#set-element" },
  { subLabel:"Animation Resources", label:"<rotate>", link:"guide/topics/resources/animation-resource.html#set-element" },

  { subLabel:"Animation Resources", label:"<animation-list>", link:"guide/topics/resources/animation-resource.html#animation-list-element" },

  { subLabel:"Animation Resources", label:"<accelerateDecelerateInterpolator>", link:"guide/topics/resources/animation-resource.html#Interpolators" },  
  { subLabel:"Animation Resources", label:"<accelerateInterpolator>", link:"guide/topics/resources/animation-resource.html#Interpolators" },
  { subLabel:"Animation Resources", label:"<anticipateInterpolator>", link:"guide/topics/resources/animation-resource.html#Interpolators" },
  { subLabel:"Animation Resources", label:"<anticipateOvershootInterpolator>", link:"guide/topics/resources/animation-resource.html#Interpolators" },
  { subLabel:"Animation Resources", label:"<bounceInterpolator>", link:"guide/topics/resources/animation-resource.html#Interpolators" },
  { subLabel:"Animation Resources", label:"<cycleInterpolator>", link:"guide/topics/resources/animation-resource.html#Interpolators" },
  { subLabel:"Animation Resources", label:"<decelerateInterpolator>", link:"guide/topics/resources/animation-resource.html#Interpolators" },
  { subLabel:"Animation Resources", label:"<linearInterpolator>", link:"guide/topics/resources/animation-resource.html#Interpolators" },
  { subLabel:"Animation Resources", label:"<overshootInterpolator>", link:"guide/topics/resources/animation-resource.html#Interpolators" },

  // Drawables
  { subLabel:"Drawable Resources", label:"<bitmap>", link:"guide/topics/resources/drawable-resource.html#bitmap-element" },
  { subLabel:"Drawable Resources", label:"<nine-patch>", link:"guide/topics/resources/drawable-resource.html#ninepatch-element" },
  { subLabel:"Drawable Resources", label:"<layer-list>", link:"guide/topics/resources/drawable-resource.html#layerlist-element" },
  { subLabel:"Drawable Resources", label:"<selector>", link:"guide/topics/resources/drawable-resource.html#selector-element" },
  { subLabel:"Drawable Resources", label:"<level-list>", link:"guide/topics/resources/drawable-resource.html#levellist-element" },
  { subLabel:"Drawable Resources", label:"<transition>", link:"guide/topics/resources/drawable-resource.html#transition-element" },
  { subLabel:"Drawable Resources", label:"<inset>", link:"guide/topics/resources/drawable-resource.html#inset-element" },
  { subLabel:"Drawable Resources", label:"<clip>", link:"guide/topics/resources/drawable-resource.html#clip-element" },
  { subLabel:"Drawable Resources", label:"<scale>", link:"guide/topics/resources/drawable-resource.html#scale-element" },

  { subLabel:"Drawable Resources", label:"<shape>", link:"guide/topics/resources/drawable-resource.html#shape-element" },
  { subLabel:"Drawable Resources", label:"<corners>", link:"guide/topics/resources/drawable-resource.html#corners-element" },
  { subLabel:"Drawable Resources", label:"<gradient>", link:"guide/topics/resources/drawable-resource.html#gradient-element" },
  { subLabel:"Drawable Resources", label:"<padding>", link:"guide/topics/resources/drawable-resource.html#padding-element" },
  { subLabel:"Drawable Resources", label:"<size>", link:"guide/topics/resources/drawable-resource.html#size-element" },
  { subLabel:"Drawable Resources", label:"<solid>", link:"guide/topics/resources/drawable-resource.html#solid-element" },
  { subLabel:"Drawable Resources", label:"<stroke>", link:"guide/topics/resources/drawable-resource.html#stroke-element" },

  // Layout
  { subLabel:"Layouts", label:"<fragment>", link:"guide/topics/fundamentals/fragments.html#Adding" },
  { subLabel:"Layouts", label:"<include>", link:"guide/topics/resources/layout-resource.html#include-element" },
  { subLabel:"Layouts", label:"<requestFocus>", link:"guide/topics/resources/layout-resource.html#requestfocus-element" },
  { subLabel:"Layouts", label:"<merge>", link:"guide/topics/resources/layout-resource.html#merge-element" },

  // Menu
  { subLabel:"Menu Resources", label:"<menu>", link:"guide/topics/resources/menu-resource.html#menu-element" },
  { subLabel:"Menu Resources", label:"<group>", link:"guide/topics/resources/menu-resource.html#group-element" },
//  { subLabel:"Menu Resources", label:"<item>", link:"guide/topics/resources/menu-resource.html#item-element" },

  // String
  { subLabel:"String Resources", label:"<string>", link:"guide/topics/resources/string-resource.html#string-element" },
  { subLabel:"String Resources", label:"<string-array>", link:"guide/topics/resources/string-resource.html#string-array-element" },
//  { subLabel:"String Resources", label:"<item>", link:"guide/topics/resources/string-resource.html#string-array-item-element" },
  { subLabel:"String Resources", label:"<plurals>", link:"guide/topics/resources/string-resource.html#plurals-element" },
//  { subLabel:"String Resources", label:"<item>", link:"guide/topics/resources/string-resource.html#plurals-item-element" },

  // Style
  { subLabel:"Style/Theme Resources", label:"<style>", link:"guide/topics/resources/style-resource.html#style-element" },
//  { subLabel:"Style/Theme Resources", label:"<item>", link:"guide/topics/resources/style-resource.html#item-element" },

  // More Resources
  { subLabel:"Resources", label:"<bool>", link:"guide/topics/resources/more-resources.html#bool-element" },
  { subLabel:"Resources", label:"<color>", link:"guide/topics/resources/more-resources.html#color-element" },
  { subLabel:"Resources", label:"<dimen>", link:"guide/topics/resources/more-resources.html#dimen-element" },
//  { subLabel:"Resources", label:"<item>", link:"guide/topics/resources/more-resources.html#id-item-element" },
  { subLabel:"Resources", label:"<integer>", link:"guide/topics/resources/more-resources.html#integer-element" },
  { subLabel:"Resources", label:"<integer-array>", link:"guide/topics/resources/more-resources.html#integer-array-element" },
//  { subLabel:"Resources", label:"<item>", link:"guide/topics/resources/more-resources.html#integer-array-item-element" },
  { subLabel:"Resources", label:"<array>", link:"guide/topics/resources/more-resources.html#array-element" },

  // Other XML resources
  { subLabel:"App Widget Resources", label:"<appwidget-provider>", link:"guide/topics/appwidgets/index.html#MetaData" },

  { subLabel:"Searchable Resources", label:"<searchable>", link:"guide/topics/search/searchable-config.html#searchable-element" },
  { subLabel:"Searchable Resources", label:"<actionkey>", link:"guide/topics/search/searchable-config.html#actionkey-element" },

  // Fun stuff in android.R.styleable
  { subLabel:"SyncAdapter", label:"<sync-adapter>", link:"reference/android/R.styleable.html#SyncAdapter" },
  { subLabel:"AccountAuthenticator", label:"<account-authenticator>", link:"reference/android/R.styleable.html#AccountAuthenticator" },
  { subLabel:"AccessibilityService", label:"<accessibility-service>", link:"reference/android/R.styleable.html#AccessibilityService" },
  { subLabel:"DeviceAdmin", label:"<device-admin>", link:"reference/android/R.styleable.html#DeviceAdmin" },
  { subLabel:"InputExtras", label:"<input-extras>", link:"reference/android/R.styleable.html#InputExtras" },
  { subLabel:"InputMethod", label:"<input-method>", link:"reference/android/R.styleable.html#InputMethod" },
  { subLabel:"RecognitionService", label:"<recognition-service>", link:"reference/android/R.styleable.html#RecognitionService" },
  { subLabel:"SpellChecker", label:"<spell-checker>", link:"reference/android/R.styleable.html#SpellChecker" },
  { subLabel:"TextToSpeechEngine", label:"<tts-engine>", link:"reference/android/R.styleable.html#TextToSpeechEngine" },
  { subLabel:"Wallpaper", label:"<wallpaper>", link:"reference/android/R.styleable.html#Wallpaper" },
  { subLabel:"WallpaperPreviewInfo", label:"<wallpaper-preview>", link:"reference/android/R.styleable.html#WallpaperPreviewInfo" },
];
