import React, { useState } from 'react';

import { Form, Button } from 'semantic-ui-react';

import { createZone } from '../utils/api';
import DropdownZones from '../components/DropdownZones';

const CreateZone = () => {
  const [formData, setFormData] = useState({
    isResidency: false,
    isMobility: false,
    name: null,
    parent: null
  });

  const onChangeFormField =
    (field) =>
    (_, { value }) =>
      setFormData({ ...formData, [field]: value });

  return (
    <Form onSubmit={() => createZone(formData)}>
      <Form.Group widths="equal">
        <Form.Input placeholder="Name" label="Zone Name" required onChange={onChangeFormField('name')} />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Checkbox
          label="Residency"
          value={true}
          checked={formData?.isResidency}
          onChange={() => onChangeFormField('isResidency')(null, { value: !formData?.isResidency })}
        />
        <Form.Checkbox
          label="Mobility"
          value={true}
          checked={formData?.isResidency}
          onChange={() => onChangeFormField('isResidency')(null, { value: !formData?.isResidency })}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label>Parent</label>
          <DropdownZones placeholder="Parent" onChange={(value) => setFormData({ ...formData, parent: value })} />
        </Form.Field>
      </Form.Group>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="big" type="submit">
          Create Zone
        </Button>
      </div>
    </Form>
  );
};

export default CreateZone;
