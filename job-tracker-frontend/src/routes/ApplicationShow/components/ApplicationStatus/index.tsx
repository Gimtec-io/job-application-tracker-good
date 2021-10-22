import { Box, Form, FormField, Select } from 'grommet';
import { useState } from 'react';

// the prefix name of the Create option entry
const prefix = 'Create';
const newStatusId = '0';

type Option = {
  id: string,
  name: string,
  text?: string,
}

const defaultOptions: Option[] = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
];

const updateCreateOption = (text: string) => {
  const len = defaultOptions.length;
  if (defaultOptions[len - 1].name.includes(prefix)) {
    // remove Create option before adding an updated one
    defaultOptions.pop();
  }
  defaultOptions.push({
    name: `${prefix} '${text}'`,
    text,
    id: newStatusId,
  });
};

type FormState = {
  status: Option,
};

export const ApplicationStatus = () => {
  const [state, setState] = useState<FormState | undefined>();
  const [options, setOptions] = useState(defaultOptions);

  const searchOrCreateStatus = (text: string) => {
    updateCreateOption(text);
    setOptions(defaultOptions.filter((option) => option.name.indexOf(text) > -1));
  }
  const changeStatus = ({ status: newStatus }: FormState) => {
    // If the selected option is the `Create ${...}`
    if (newStatus.id === newStatusId && newStatus.text) {
      // create status in backend
      // update application
      // remove last option: `Create ${...}` from options array
      options.pop();
      // add new status
      const newOptions = options.concat({ id: newStatus.id, name: newStatus.text });
      // set new state
      setOptions(newOptions)
      setState({
        status: {
          name: newStatus.text,
          id: newStatus.id,
        }
      });
    } else {
      setState({
        status: newStatus,
      });
    }
  }
  return (
    <Box width="small">
      <Form
        value={ state }
        onChange={ changeStatus }
      >
        <FormField name="status">
          <Select
            name="status"
            options={ options }
            labelKey="name"
            valueKey="id"
            onSearch={ searchOrCreateStatus }
          />
        </FormField>
      </Form>
    </Box>
  );
};
