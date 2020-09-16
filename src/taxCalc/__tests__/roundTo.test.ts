import roundTo from '../roundTo';

describe('Check correct rounding for decimal places', () => {
  it('returns correct rounding for two decimal places for 1.005', () => {
    expect(roundTo(1.005, 2)).toBe(1.01);
  });
  it('returns correct rounding for two decimal places for 10', () => {
    expect(roundTo(10, 2)).toBe(10.0);
  });
  it('returns correct rounding for two decimal places for 1.777777', () => {
    expect(roundTo(1.777777, 2)).toBe(1.78);
  });
  it('returns correct rounding for two decimal places for 9.1', () => {
    expect(roundTo(9.1, 2)).toBe(9.1);
  });
  it('returns correct rounding for two decimal places for 1234.57', () => {
    expect(roundTo(1234.5678, 2)).toBe(1234.57);
  });
  it('returns correct rounding for two decimal places for 1.5550', () => {
    expect(roundTo(1.555, 2)).toBe(1.56);
  });
  it('returns correct rounding for two decimal places for 1.5551', () => {
    expect(roundTo(1.5551, 2)).toBe(1.56);
  });
  it('returns correct rounding for two decimal places for 1.3555', () => {
    expect(roundTo(1.3555, 2)).toBe(1.36);
  });
  it('returns correct rounding for two decimal places for 1.35551', () => {
    expect(roundTo(1.35551, 2)).toBe(1.36);
  });
});
