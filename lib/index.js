System.register("homoclave", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function calculate(fullName) {
        var mappedFullName = '0' + normalize(fullName).split('')
            .map(mapCharacterToTwoDigitsCode)
            .join('');
        var sum = sumPairsOfDigits(mappedFullName);
        var lastThreeDigits = sum % 1000;
        var quo = lastThreeDigits / 34;
        var reminder = lastThreeDigits % 34;
        return digits.charAt(quo) + digits.charAt(reminder);
    }
    exports_1("default", calculate);
    // remove accents without removing the Ñ (u0303)
    // and remove special characters: .'-,
    function normalize(input) {
        return input.toUpperCase()
            .normalize('NFD')
            .replace(/[\u0300-\u0302]/g, "")
            .replace(/[\u0304-\u036f]/g, "")
            .replace(/N\u0303/g, "Ñ")
            .replace(/[-\.',]/g, ''); // remove .'-,
    }
    function sumPairsOfDigits(input) {
        var sum = 0;
        var i = 0;
        for (i = 0; i < input.length - 1; i++) {
            var firstPair = parseInt(input.substring(i, i + 2));
            var secondPair = parseInt(input.substring(i + 1, i + 2));
            sum += firstPair * secondPair;
        }
        return sum;
    }
    function mapCharacterToTwoDigitsCode(c) {
        var m = map[c];
        if (!m) {
            throw Error("No two-digit code mapping for char " + c);
        }
        return m;
    }
    var map, digits;
    return {
        setters: [],
        execute: function () {
            map = {
                ' ': '00',
                '0': '00',
                '1': '01',
                '2': '02',
                '3': '03',
                '4': '04',
                '5': '05',
                '6': '06',
                '7': '07',
                '8': '08',
                '9': '09',
                '&': '10',
                'A': '11',
                'B': '12',
                'C': '13',
                'D': '14',
                'E': '15',
                'F': '16',
                'G': '17',
                'H': '18',
                'I': '19',
                'J': '21',
                'K': '22',
                'L': '23',
                'M': '24',
                'N': '25',
                'O': '26',
                'P': '27',
                'Q': '28',
                'R': '29',
                'S': '32',
                'T': '33',
                'U': '34',
                'V': '35',
                'W': '36',
                'X': '37',
                'Y': '38',
                'Z': '39',
                'Ñ': '40',
            };
            digits = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
        }
    };
});
System.register("verification-digit", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function calculate(rfc12Digits) {
        var sum = rfc12Digits.split('')
            .map(function (c) { return map[c.toUpperCase()] || 0; })
            .reduce(function (sum, current, index) { return sum + current * (13 - index); }, 0);
        var reminder = sum % 11;
        if (reminder == 0) {
            return '0';
        }
        else {
            return (11 - reminder).toString(16).toUpperCase(); // from 1 to A (hex)
        }
    }
    exports_2("default", calculate);
    var map;
    return {
        setters: [],
        execute: function () {
            map = {
                '0': 0,
                '1': 1,
                '2': 2,
                '3': 3,
                '4': 4,
                '5': 5,
                '6': 6,
                '7': 7,
                '8': 8,
                '9': 9,
                'A': 10,
                'B': 11,
                'C': 12,
                'D': 13,
                'E': 14,
                'F': 15,
                'G': 16,
                'H': 17,
                'I': 18,
                'J': 19,
                'K': 20,
                'L': 21,
                'M': 22,
                'N': 23,
                '&': 24,
                'O': 25,
                'P': 26,
                'Q': 27,
                'R': 28,
                'S': 29,
                'T': 30,
                'U': 31,
                'V': 32,
                'W': 33,
                'X': 34,
                'Y': 35,
                'Z': 36,
                ' ': 37,
                'Ñ': 38
            };
        }
    };
});
System.register("tdc-code", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function calculate(person) {
        return new NameCode(person).toString() + new BirthdayCode(person).toString();
    }
    exports_3("calculate", calculate);
    var specialParticlesRegex, NameCode, BirthdayCode;
    return {
        setters: [],
        execute: function () {
            // matches any ocurrence of the special particles as a word: '^foo | foo | foo$''
            specialParticlesRegex = new RegExp('(?:' + ["DE", "LA", "LAS", "MC", "VON", "DEL", "LOS", "Y", "MAC", "VAN", "MI"]
                .map(function (p) { return "^" + p + " | " + p + " | " + p + "$"; })
                .join('|')
                + ')', 'g');
            NameCode = (function () {
                function NameCode(person) {
                    this.person = person;
                    this.filteredPersonName = this.getFilteredPersonName();
                }
                NameCode.prototype.toString = function () {
                    if (this.isFirstLastNameIsTooShort()) {
                        return this.normalize(this.person.firstLastName).charAt(0)
                            + this.normalize(this.person.secondLastName).charAt(0)
                            + this.filteredPersonName.substring(0, 2);
                    }
                    else {
                        return this.normalize(this.person.firstLastName).charAt(0)
                            + this.firstVowelExcludingFirstCharacterOf(this.normalize(this.person.firstLastName))
                            + this.normalize(this.person.secondLastName).charAt(0)
                            + this.filteredPersonName.charAt(0);
                    }
                };
                // filter out common names (if more than one is provided)
                NameCode.prototype.getFilteredPersonName = function () {
                    var normalized = this.normalize(this.person.name);
                    if (this.person.name.split(' ').length > 1) {
                        return normalized.replace(/(?:^JOSE |^MARIA |^MA |^MA\. ?)/gi, '');
                    }
                    return normalized;
                };
                NameCode.prototype.normalize = function (s) {
                    return this.removeAccents(s.toUpperCase())
                        .replace(/\s+/g, '  ') // double space to allow multiple special-particles matching
                        .replace(specialParticlesRegex, '')
                        .replace(/\s+/g, ' ') // reset space
                        .trim();
                };
                NameCode.prototype.firstVowelExcludingFirstCharacterOf = function (s) {
                    return /[aeiou]/i.exec(s.slice(1))[0];
                };
                NameCode.prototype.isFirstLastNameIsTooShort = function () {
                    return this.normalize(this.person.firstLastName).length <= 2;
                };
                NameCode.prototype.removeAccents = function (input) {
                    return input.normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, "");
                };
                return NameCode;
            }());
            BirthdayCode = (function () {
                function BirthdayCode(person) {
                    this.person = person;
                }
                BirthdayCode.prototype.toString = function () {
                    return this.person.year.toString().slice(-2)
                        + this.zeroPadded(this.person.month)
                        + this.zeroPadded(this.person.day);
                };
                BirthdayCode.prototype.zeroPadded = function (n) {
                    return ('00' + n).slice(-2);
                };
                return BirthdayCode;
            }());
        }
    };
});
System.register("index", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
