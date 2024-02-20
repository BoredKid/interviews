import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getCandidates } from '../utils/api';

const Candidates = () => {
  const [candidates, setCandidates] = useState(null);
  useEffect(() => {
    getCandidates().then((res) => setCandidates(res.data));
  }, []);

  if (!candidates) {
    return <p>Loading candidates ...</p>;
  }

  return (
    <Table striped celled style={{ marginTop: 0, borderRadius: 0 }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell style={{ textDecoration: 'underline' }}>Firstname</Table.HeaderCell>
          <Table.HeaderCell style={{ textDecoration: 'underline' }}>Lastname</Table.HeaderCell>
          <Table.HeaderCell style={{ textDecoration: 'underline' }}>Edit Candidate</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {candidates.map((candidate) => (
          <CandidateRow key={candidate.id} candidate={candidate} />
        ))}
      </Table.Body>
    </Table>
  );
};

const CandidateRow = ({ candidate }) => {
  return (
    <Table.Row>
      <Table.Cell>{candidate.firstname}</Table.Cell>
      <Table.Cell>{candidate.lastname}</Table.Cell>
      <Table.Cell>
        <Link to={`/candidate/${candidate.id}`}>
          <p>Edit -{'>'} </p>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

export default Candidates;
