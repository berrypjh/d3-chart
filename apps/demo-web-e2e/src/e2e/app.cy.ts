describe('demo-web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the chart header', () => {
    cy.get('h1').contains('2D Chart Library Demo');
  });

  it('should render the chart svg', () => {
    // 차트 컨테이너 내부의 SVG가 존재하는지 확인
    cy.get('.chart-container svg').should('exist');

    // 막대(rect) 개수가 데이터 개수(7개)와 일치하는지 확인
    cy.get('.chart-container svg rect').should('have.length', 7);
  });
});
