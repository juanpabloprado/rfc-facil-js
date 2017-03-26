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

  it('should calculate homoclave for name with n with tilde', () => {
    expect(calculate('Muñoz Ortega Juan')).to.equal('T6');
  });

  it('should calculate homoclave for name with multiple n with tilde', () => {
    expect(calculate('Muñoz Muñoz Juan')).to.equal('RZ');
  });

  it('should calculate differnet homoclave for name with n with tilde and without', () => {
    expect(calculate('Muñoz Ortega Juan')).not.to.equal(calculate('Munoz Ortega Juan'));
  });

});
