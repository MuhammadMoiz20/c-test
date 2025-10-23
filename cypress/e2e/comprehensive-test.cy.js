describe('MERN Notes App - Complete Tests', () => {
  // File structure tests
  describe('Project Structure', () => {
    it('should have package.json with required dependencies', () => {
      cy.readFile('package.json').then((pkg) => {
        expect(pkg.dependencies).to.have.property('react');
        expect(pkg.dependencies).to.have.property('react-dom');
        expect(pkg.devDependencies).to.have.property('cypress');
      });
    });

    it('should have src directory with main files', () => {
      cy.readFile('src/index.jsx').should('exist');
      cy.readFile('src/components/App.jsx').should('exist');
      cy.readFile('src/components/Note.jsx').should('exist');
    });

    it('should have index.html at project root', () => {
      cy.readFile('index.html').should('exist');
    });

    it('should have cypress configuration', () => {
      cy.readFile('cypress.config.cjs').should('exist');
    });

    it('should have vite configuration', () => {
      cy.readFile('vite.config.js').should('exist');
    });
  });

  // Basic functionality tests (when server is available)
  describe('Basic Functionality', () => {
    it('should have proper HTML structure', () => {
      cy.readFile('index.html').then((content) => {
        expect(content).to.include('<!DOCTYPE html>');
        expect(content).to.include('<html');
        expect(content).to.include('<head>');
        expect(content).to.include('<body>');
        expect(content).to.include('<div id="root">');
      });
    });

    it('should have React app title', () => {
      cy.readFile('index.html').then((content) => {
        expect(content).to.include('<title');
      });
    });

    it('should have note input elements', () => {
      cy.readFile('src/components/App.jsx').then((content) => {
        expect(content).to.include('noteinput');
        expect(content).to.include('input');
        expect(content).to.include('button');
      });
    });

    it('should have sample note structure', () => {
      cy.readFile('src/components/Note.jsx').then((content) => {
        expect(content).to.include('className="note"');
        expect(content).to.include('Draggable');
      });
    });
  });

  // Code quality tests
  describe('Code Quality', () => {
    it('should have proper React component structure in App.jsx', () => {
      cy.readFile('src/components/App.jsx').then((content) => {
        expect(content).to.include('import React');
        expect(content).to.include('function App');
        expect(content).to.include('export default');
      });
    });

    it('should have proper React component structure in Note.jsx', () => {
      cy.readFile('src/components/Note.jsx').then((content) => {
        expect(content).to.include('import React');
        expect(content).to.include('function Note');
        expect(content).to.include('export default');
      });
    });

    it('should have proper main entry point', () => {
      cy.readFile('src/index.jsx').then((content) => {
        expect(content).to.include('import React');
        expect(content).to.include('createRoot');
        expect(content).to.include('App');
      });
    });
  });
});
