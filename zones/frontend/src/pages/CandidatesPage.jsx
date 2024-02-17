import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableRow, TableCell } from 'semantic-ui-react';
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
    <Table>
      <TableBody>
        {candidates.map((candidate) => (
          <CandidateRow key={candidate.id} candidate={candidate} />
        ))}
      </TableBody>
    </Table>
  );
};

const CandidateRow = ({ candidate }) => {
  return (
    <TableRow>
      <TableCell>{candidate.firstname}</TableCell>
      <TableCell>{candidate.lastname}</TableCell>
      <TableCell>
        <Link to={`/candidate/${candidate.id}`}>
          <p>Edit -{'>'} </p>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default Candidates;
