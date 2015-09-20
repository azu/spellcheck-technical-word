var spellcheck = require("../").spellCheckText;
var assert = require("power-assert");
describe("spellcheck-technical-word", function () {
    context("when found wrong word", function () {
        it("should return the array of results", function () {
            var results = spellcheck("git");
            assert(results.length > 0);
            var result = results.pop();
            assert.equal(result.actual, "git");
            assert.equal(result.expected, "Git");
        });
        it("should have padding{line,column}", function () {
            var results = spellcheck("git");
            var result = results.pop();
            assert(result.paddingLine === 0);
            assert(result.paddingColumn === 0);
        });
    });
    context("when not found wrong word", function () {
        it("should return empty array", function () {
            var results = spellcheck("word");
            assert(results.length === 0);
        });
        it("should return empty array in formal", function () {
            var results = spellcheck("This is a pen.");
            assert(results.length === 0);
        });
    });
    context("when an expected word includes the pattern", function () {
        it("finds wrong word", function () {
            var results = spellcheck("ベンダ");
            assert(results.length > 0);
            var result = results.pop();
            assert.equal(result.actual, "ベンダ");
            assert.equal(result.expected, "ベンダー");
        });
        it("finds wrong word", function () {
            var results = spellcheck("HTML Import");
            assert(results.length === 1);
            var result = results.pop();
            assert.equal(result.actual, "HTML Import");
            assert.equal(result.expected, "HTML Imports");
        });
        it("doesn't find correct word", function () {
            var results = spellcheck("ベンダー");
            assert(results.length === 0);
        });
        // ?? $1がexpectedだとnew RegExp(expected)で例外となるのでそれを避けられてるか
        it("expected is regexp characters, is safe", function () {
            var results = spellcheck("??あ");
            assert(results.length === 1);
            var result = results.pop();
            assert.equal(result.actual, "??あ");
            assert.equal(result.expected, "?? あ");
        });
    });
});
