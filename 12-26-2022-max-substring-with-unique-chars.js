// Given a string, find the length of the longest substring with all unique characters.
// i: string
// o: length of substring
//

function findLongestSubstring(string) {

    if (string.length === 0) return 0;

    let substrings = {};
    let freqCount = {};
    let subStringStart = 0;
    let subStringEnd = 1;

    freqCount[string[subStringStart]] = 1;

    while (subStringEnd < string.length) {
        if (subStringEnd === string.length - 1) {
            if (string[subStringEnd] === string[subStringEnd - 1]) {
                substrings[subStringStart] = string.slice(subStringStart, subStringEnd);
                substrings[subStringEnd - 1] = string[subStringEnd - 1]
                substrings[subStringEnd] = string[subStringEnd];
                break;
            }
            substrings[subStringStart] = string.slice(subStringStart, subStringEnd + 1);
            break;
        } else if (!(string[subStringEnd] in freqCount)) {
            freqCount[string[subStringEnd]] = 1;
            subStringEnd++;

        } else {
            substrings[subStringStart] = string.slice(subStringStart, subStringEnd);
            freqCount = {};
            subStringStart = subStringEnd;
            freqCount[string[subStringStart]] = 1;
            subStringEnd++;
        }
    }

    let largest = '';

    for (key in substrings) {
        if (substrings[key].length > largest.length) largest = substrings[key];
    }

    return largest.length;

}

// console.log(findLongestSubstring('')) // 0
console.log(findLongestSubstring('rithmscholl')) // 7
// console.log(findLongestSubstring('thisisawesome')) // 6
// console.log(findLongestSubstring('thecatinthehat')) // 7
console.log(findLongestSubstring('bbbbbb'))// 1
// console.log(findLongestSubstring('longestsubstring')) // 8
// console.log(findLongestSubstring('thisishowwedoit')) // 6
