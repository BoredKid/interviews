import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { getZones } from '../utils/api';

const formatZonesValues = (zones, n) => {
  return zones.reduce(
    (unfoldedZones, zone) =>
      unfoldedZones
        .concat([
          {
            text: zone.name,
            value: zone.id,
            content: (
              <span
                style={{
                  marginLeft: `${n}rem`,
                  fontWeight: zone.children && zone.children.length > 0 ? 600 : 'normal'
                }}>
                {zone.name}
              </span>
            )
          }
        ])
        .concat(formatZonesValues(zone.children, n + 1)),
    []
  );
};

const DropdownZones = ({ placeholder, multiple, onChange, mobility, residency }) => {
  const [zones, setZones] = useState([]);
  useEffect(() => {
    getZones(!!mobility, !!residency).then((res) => {
      setZones(res.data);
    });
  }, []);

  const options = [{ text: '', value: null }].concat(formatZonesValues(zones, 0));

  return (
    <Dropdown
      options={options}
      placeholder={placeholder ? placeholder : 'Zone'}
      closeOnChange
      search
      fluid
      selection
      multiple={!!multiple}
      onChange={(_, { value }) => onChange(value)}
    />
  );
};

export default DropdownZones;
