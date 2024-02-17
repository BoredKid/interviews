import React, { useState, useEffect } from 'react';
import { getZones } from '../utils/api';

const Zones = () => {
  const [zones, setZones] = useState(null);
  useEffect(() => {
    getZones(false, true).then((res) => setZones(res.data));
  }, []);

  if (!zones) {
    return <p>Loading candidates ...</p>;
  }

  return <p>Zones</p>;
};

export default Zones;
