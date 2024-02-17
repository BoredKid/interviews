import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Candidates from './pages/CandidatesPage';
import EditCandidate from './pages/EditCandidatePage';
import { Container } from 'semantic-ui-react';

const App: React.FC = () => {
  return (
    <Container fluid>
      <Router>
        <Routes>
          <Route path="/" Component={Candidates} />
          <Route path="/candidate/:id" Component={EditCandidate} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
