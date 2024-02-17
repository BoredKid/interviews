import React from 'react';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import Candidates from './pages/CandidatesPage';
import EditCandidate from './pages/EditCandidatePage';
import Zones from './pages/ZonesPage';

const App: React.FC = () => {
  return (
    <Router>
      <Container fluid style={{ padding: '2em', height: '100%' }}>
        <Grid style={{ height: '100%' }}>
          <Grid.Column width={4} style={{ border: '1px black solid', borderRadius: 10 }}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <Container>
              <MainContent />
            </Container>
          </Grid.Column>
        </Grid>
      </Container>
    </Router>
  );
};

const Sidebar = () => {
  return (
    <>
      <Link to="/">
        <p>Candidates</p>
      </Link>
      <Link to="/zones">
        <p>Zones</p>
      </Link>
    </>
  );
};

const MainContent = () => {
  return (
    <Routes>
      <Route path="/" Component={Candidates} />
      <Route path="/candidate/:id" Component={EditCandidate} />
      <Route path="/zones" Component={Zones} />
    </Routes>
  );
};

export default App;
