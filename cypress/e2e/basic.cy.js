describe('Sample Tests', () => {
  it('should pass - addition works', () => {
    expect(2 + 2).to.equal(4);
  });

  it('should fail - incorrect assertion', () => {
    expect(5).to.equal(10);
  });
});

describe('String Tests', () => {
  it('should concatenate strings', () => {
    expect('Hello' + ' ' + 'World').to.equal('Hello World');
  });

  it('should check string length', () => {
    expect('Cypress'.length).to.equal(7);
  });

  it('should verify string includes substring', () => {
    expect('Testing with Cypress').to.include('Cypress');
  });
});

describe('Array Tests', () => {
  it('should check array length', () => {
    expect([1, 2, 3, 4, 5]).to.have.lengthOf(5);
  });

  it('should verify array includes value', () => {
    expect([1, 2, 3]).to.include(2);
  });

  it('should check array equality', () => {
    expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
  });
});

describe('Boolean Tests', () => {
  it('should verify true value', () => {
    expect(true).to.be.true;
  });

  it('should verify false value', () => {
    expect(false).to.be.false;
  });

  it('should verify truthy values', () => {
    expect(1).to.be.ok;
    expect('text').to.be.ok;
  });

  it('should verify falsy values', () => {
    expect(0).to.be.empty;
    expect('').to.be.empty;
  });
});
