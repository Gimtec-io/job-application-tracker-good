import { Box, Button, DateInput, Form, FormExtendedEvent, FormField, TextArea, TextInput } from 'grommet';
import { useState } from 'react';
import { localDateFormat } from '../../../utils/localDateFormat';

export type ApplicationFormState = {
  company: string,
  position: string,
  description: string,
  link: string,
  date?: string,
};

// No need to do it on every render
// Users do not normally change browser locale
const dateFormat = localDateFormat();

type Props = {
  onSubmit: (data: ApplicationFormState) => void;
};

export const ApplicationForm = ({ onSubmit }: Props) => {
  const [value, setValue] = useState<ApplicationFormState>({ company: '', link: '', position: '', description: '', date: undefined });

  // Libraries do not always have the best docs
  // Yet, when using Typescript, you can rely on the Text Editor helpful tooltips
  const createNewApplication = (data: FormExtendedEvent<ApplicationFormState, Element>) => {
    onSubmit(data.value);
  }
  // It's always nice to learn to use forms with a library
  return (
    <Form
      value={ value }
      onChange={ (nextValue: ApplicationFormState) => setValue(nextValue) }
      onSubmit={ createNewApplication }
    >
      <FormField label="Company" name="company" htmlFor="company" required>
        <TextInput
          id="company"
          name="company"
          type="text"
          placeholder="Company Name"
        />
      </FormField>
      <FormField label="Position" name="position" htmlFor="position" required>
        <TextInput
          id="position"
          name="position"
          type="text"
          placeholder="Rockstar developer"
        />
      </FormField>
      <Box width="medium">
        <FormField label="Application date" name="date" htmlFor="date" required>
          <DateInput
            id="date"
            name="date"
            format={ dateFormat }
          />
        </FormField>
      </Box>
      <FormField label="Job Link" name="link" htmlFor="link">
        <TextInput
          id="link"
          name="link"
          type="text"
          placeholder="Link of the Job Listing"
        />
      </FormField>
      <FormField label="Job Description" name="description" htmlFor="description">
        <TextArea
          id="description"
          name="description"
          placeholder="Add the job description for future reference"
        />
      </FormField>
      <Button type="submit" label="Create" primary />
    </Form>
  );
};
