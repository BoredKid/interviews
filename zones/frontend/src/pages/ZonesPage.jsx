import React, { useState, useEffect } from 'react';
import { Checkbox, Table } from 'semantic-ui-react';

import { getZones, editZone } from '../utils/api';

const Zones = () => {
  const [zones, setZones] = useState(null);

  const updateZone = (id, data) => {
    editZone(id, data)
      .then((res) => setZones(unfoldZone(res.data, 0, null)))
      .catch(() => setZones(null));
  };

  useEffect(() => {
    getZones(false, false).then((res) => setZones(unfoldZone(res.data, 0, null)));
  }, []);

  if (!zones) {
    return <p>Loading Zones ...</p>;
  }

  return (
    <Table striped celled style={{ marginTop: 0, borderRadius: 0 }}>
      <ZoneHeaders />
      <Table.Body>
        {zones.map((zone) => (
          <ZoneRow
            zone={zone}
            key={zone.id}
            updateZoneValue={(id, field, value) => updateZone(id, { [field]: value })}
          />
        ))}
      </Table.Body>
    </Table>
  );
};

const unfoldZone = (zones, n = 0, parent = null) => {
  return zones.reduce(
    (unfoldedZones, zone) =>
      unfoldedZones.concat([{ ...zone, depth: n, parent }]).concat(unfoldZone(zone.children, n + 1, zone.id)),
    []
  );
};

const ZoneHeaders = (props) => {
  return (
    <Table.Header {...props}>
      <Table.Row>
        <Table.HeaderCell style={{ textDecoration: 'underline' }}>Name</Table.HeaderCell>
        <Table.HeaderCell style={{ textDecoration: 'underline' }} textAlign="center">
          Job Area & Mobility
        </Table.HeaderCell>
        <Table.HeaderCell style={{ textDecoration: 'underline' }} textAlign="center">
          Residency
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

const CheckboxCell = ({ fieldKey, zone, update }) => {
  return (
    <Table.Cell textAlign="center">
      <Checkbox checked={zone[fieldKey]} onChange={(_, data) => update(fieldKey, data.checked)} />
    </Table.Cell>
  );
};

const ZoneRow = ({ zone, updateZoneValue }) => {
  return (
    <Table.Row>
      <Table.Cell
        style={{
          paddingLeft: `${1 + zone.depth * 2}rem`,
          fontWeight: zone.children.length > 0 ? 900 : 'normal',
          fontSize: `${1.1 - zone.depth / 20}em`,
          cursor: 'pointer'
        }}>
        <div>{zone.name}</div>
      </Table.Cell>
      <CheckboxCell
        fieldKey="isMobility"
        zone={zone}
        update={(field, value) => updateZoneValue(zone.id, field, value)}
      />
      <CheckboxCell
        fieldKey="isResidency"
        zone={zone}
        update={(field, value) => updateZoneValue(zone.id, field, value)}
      />
    </Table.Row>
  );
};

export default Zones;
