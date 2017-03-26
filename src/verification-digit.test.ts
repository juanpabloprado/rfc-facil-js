import calculate from './verification-digit';
import { expect } from 'chai';
import 'mocha';

describe('verification digit calculator', () => {

  it('should calculate verification digit', () => {
    expect(calculate('GODE561231GR')).to.equal('8');
    expect(calculate('AECS211112JP')).to.equal('A');
    expect(calculate('OOGE52071115')).to.equal('1');
  });

});
