"use strict";
var dictionaryItems = require("technical-word-rules");
/**
 * spell check the text, then return array of result.
 * @param {string} text
 * @returns {SpellCheckResult[]}
 */
function spellCheckText(text) {
    var results = [];
    for (var i = 0, length = dictionaryItems.length; i < length; i++) {
        var dictionary = dictionaryItems[i];
        var query = new RegExp(dictionary.pattern, dictionary.flag);
        var match = query.exec(text);
        if (!match) {
            continue;
        }
        var matchedString = match[0];
        // s/Web/Web/iは大文字小文字無視してWebに変換したいという意味に対応する
        if (dictionary.flag != null) {
            var strictQuery = new RegExp(dictionary.pattern);
            var isStrictMatch = strictQuery.test(match[0]);
            // /Web/i でマッチするけど、 /Web/ でマッチするならそれは除外する
            if (isStrictMatch) {
                continue;
            }
        }
        // [start, end]
        var matchedStartIndex = match.index + 1;
        var expected = matchedString.replace(query, dictionary.expected);
        var substring = text.substring(0, matchedStartIndex);
        var matchedStartLine = substring.split("\n").length - 1;
        /**
         *
         * @typedef {{actual: *, expected: (XML|void|string), matchedStartLine: number, matchedStartIndex: number}} SpellCheckResult
         */
        var result = {
            actual: matchedString,
            expected: expected,
            matchedStartLine: matchedStartLine,
            matchedStartIndex: matchedStartIndex
        };
        results.push(result);
    }
    return results;
}

module.exports = {
    spellCheckText: spellCheckText
};