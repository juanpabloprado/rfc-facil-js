
export interface NaturalPerson {
  name: string;
  firstLastName: string;
  secondLastName: string;
  day: number;
  month: number;
  year: number;
}

export function calculate(person: NaturalPerson): string {
  return new NameCode(person).toString() + new BirthdayCode(person).toString();
}

// matches any ocurrence of the special particles as a word: '^foo | foo | foo$''
const specialParticlesRegex: RegExp = new RegExp('(?:' + ["DE", "LA", "LAS", "MC", "VON", "DEL", "LOS", "Y", "MAC", "VAN", "MI"]
  .map((p) => `^${p} | ${p} | ${p}$`)
  .join('|')
  + ')', 'g');

class NameCode {

  private filteredPersonName: string;

  constructor(private person: NaturalPerson) {
    this.filteredPersonName = this.getFilteredPersonName();
  }

  toString(): string {
    if (this.isFirstLastNameIsTooShort()) {
      return this.normalize(this.person.firstLastName).charAt(0)
        + this.normalize(this.person.secondLastName).charAt(0)
        + this.filteredPersonName.substring(0, 2);
    } else {
      return this.normalize(this.person.firstLastName).charAt(0)
        + this.firstVowelExcludingFirstCharacterOf(this.normalize(this.person.firstLastName))
        + this.normalize(this.person.secondLastName).charAt(0)
        + this.filteredPersonName.charAt(0);
    }

  }

  // filter out common names (if more than one is provided)
  private getFilteredPersonName(): string {
    const normalized = this.normalize(this.person.name);
    if (this.person.name.split(' ').length > 1) {
      return normalized.replace(/(?:^JOSE |^MARIA |^MA |^MA\. ?)/gi, '');
    }
    return normalized;
  }

  private normalize(s: string): string {
    return this.removeAccents(s.toUpperCase())
      .replace(/\s+/g, '  ') // double space to allow multiple special-particles matching
      .replace(specialParticlesRegex, '')
      .replace(/\s+/g, ' ') // reset space
      .trim();
  }

  private firstVowelExcludingFirstCharacterOf(s: string): string {
    return /[aeiou]/i.exec(s.slice(1))[0];
  }

  private isFirstLastNameIsTooShort(): boolean {
    return this.normalize(this.person.firstLastName).length <= 2;
  }

  private removeAccents(input: string): string {
    return input.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "");
  }

}

class BirthdayCode {

  constructor(private person: NaturalPerson) {
  }

  toString(): string {
    return this.person.year.toString().slice(-2)
      + this.zeroPadded(this.person.month)
      + this.zeroPadded(this.person.day);
  }

  private zeroPadded(n: number): string {
    return ('00' + n).slice(-2);
  }

}
