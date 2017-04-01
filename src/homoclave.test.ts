import calculate from './homoclave';
import { expect } from 'chai';
import 'mocha';

describe('homoclave calculator', () => {

  it('should calculate homoclave for simple name', () => {
    expect(calculate('Perez Garcia Juan')).to.equal('LN');
  });

  it('should calculate same homoclave for names with and without accents', () => {
    expect(calculate('Perez Garcia Juan')).to.equal(calculate('Pérez García Juan'));
  });

  it('should calculate homoclave for person with more that one name', () => {
    expect(calculate('Del real Anzures Jose Antonio')).to.equal('N9');
  });

  it('should calculate homoclave for name with n-tilde', () => {
    expect(calculate('Muñoz Ortega Juan')).to.equal('T6');
  });

  it('should calculate homoclave for name with multiple n-tilde', () => {
    expect(calculate('Muñoz Muñoz Juan')).to.equal('RZ');
  });

  it('should calculate different homoclave for name with and without n-tilde', () => {
    expect(calculate('Muñoz Ortega Juan')).not.to.equal(calculate('Munoz Ortega Juan'));
  });

  it('should calculate homoclave for name with u-umlaut', () => {
    expect(calculate('Argüelles Ortega Jesus')).to.equal('JF');
  });

  it('should calculate same homoclave for name with and without u-umlaut', () => {
    expect(calculate('Argüelles Ortega Jesus')).to.equal(calculate('Arguelles Ortega Jesus'));
  });

  it('should calculate homoclave for name with ampersand', () => {
    expect(calculate('Perez&Gomez Garcia Juan')).to.equal('2R');
  });

  it('should calculate different homoclave for name with and without ampersand', () => {
    expect(calculate('Perez&Gomez Garcia Juan')).not.to.equal(calculate('PerezGomez Garcia Juan'));
  });

  it('should calculate same homoclave for name with and without special-characters', () => {
    expect(calculate("Mc.Gregor O'Connor-Juarez Juan")).to.equal(calculate('McGregor OConnorJuarez Juan'));
  });

});
