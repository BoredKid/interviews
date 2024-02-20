import React, { useState } from 'react';

import { Form, Button } from 'semantic-ui-react';

import { createZone } from '../utils/api';

const CreateZone = () => {
  const [formData, setFormData] = useState({});

  const onChangeFormField =
    (field) =>
    (_, { value }) =>
      setFormData({ ...formData, [field]: value });

  return (
    <Form onSubmit={() => createZone(formData)}>
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
