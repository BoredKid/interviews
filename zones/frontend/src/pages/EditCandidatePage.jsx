import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Container } from 'semantic-ui-react';

import { getCandidateById } from '../utils/api';

const EditCandidate = () => {
  let { id } = useParams();
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    if (id) {
      getCandidateById(id).then((res) => setCandidate(res.data));
    }
  }, []);

  if (!candidate) {
    return <p>Loading candidate ...</p>;
  }

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <p>Firstname : {candidate.firstname}</p>
        </Grid.Row>
        <Grid.Row>
          <p>Lastname : {candidate.lastname}</p>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default EditCandidate;
