/*
 * Copyright 2014 Takuya Asano
 * Copyright 2010-2014 Atilika Inc. and contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var Tokenizer = require("./Tokenizer");
var DictionaryLoader = require("./loader/NodeDictionaryLoader");

/**
 * TokenizerBuilder create Tokenizer instance.
 * @param {Object} option JSON object which have key-value pairs settings
 * @param {string} option.dicPath Dictionary directory path (or URL using in browser)
 * @constructor
 */
function TokenizerBuilder(option) {
  if (option.dicPath == null) {
    this.dic_path = "dict/";
  } else {
    this.dic_path = option.dicPath;
  }
}

/**
 * Build Tokenizer instance by asynchronous manner
 * @param {TokenizerBuilder~onLoad} callback Callback function
 */
var ifDic = false;
var tokenizer;
var loader;

TokenizerBuilder.prototype.build = function (callback) {
  if (!ifDic) {
    console.log("初回");
    loader = new DictionaryLoader(this.dic_path);
    loader.load(function (err, dic) {
      tokenizer = new Tokenizer(dic);
      callback(err, tokenizer);
    });
    ifDic = true;
  } else {
    console.log("二界目以降");
    loader.load(function (err, dic) {
      callback(err, tokenizer);
    });
  }
};

/**
 * Callback used by build
 * @callback TokenizerBuilder~onLoad
 * @param {Object} err Error object
 * @param {Tokenizer} tokenizer Prepared Tokenizer
 */

module.exports = TokenizerBuilder;
