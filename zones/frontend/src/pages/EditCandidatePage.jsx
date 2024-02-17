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
          <Grid.Column>{candidate.firstname}</Grid.Column>
          <Grid.Column>{candidate.lastname}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default EditCandidate;
