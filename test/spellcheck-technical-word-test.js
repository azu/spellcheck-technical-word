var spellcheck = require("../").spellCheckText;
var assert = require("power-assert");
describe("spellcheck-technical-word", function () {
    context("when found wrong word", function(){
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
    context("when not found wrong word", function(){
        it("should return empty array", function () {
            var results = spellcheck("word");
            assert(results.length === 0);
        });
    })
    context("when an expected word includes the pattern", function(){
        it("finds wrong word", function () {
            var results = spellcheck("ベンダ");
            assert(results.length > 0);
            var result = results.pop();
            assert.equal(result.actual, "ベンダ");
            assert.equal(result.expected, "ベンダー");
        });
        it("doesn't find correct word", function () {
            var results = spellcheck("ベンダー");
            assert(results.length === 0);
        });
    });
});
