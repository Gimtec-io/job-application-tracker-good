import { Box, Button, DateInput, Form, FormExtendedEvent, FormField, Heading, TextArea, TextInput } from 'grommet';
import { useState } from 'react';
import { localDateFormat } from '../../utils/localDateFormat';

type FormState = {
  company: string,
  position: string,
  description: string,
  link: string,
  date?: string,
};

// No need to do it on every render
// Users do not normally change browser locale
const dateFormat = localDateFormat();

export const ApplicationNew = () => {
  const [value, setValue] = useState<FormState>({ company: '', link: '', position: '', description: '', date: undefined });

  // Libraries do not always have the best docs
  // Yet, when using Typescript, you can rely on the Text Editor helpful tooltips
  const createNewApplication = (data: FormExtendedEvent<FormState, Element>) => {
    console.log('submitting');
    console.log(data);
  }
  return (
    <>
      <Heading level="2">New Application</Heading>
      {/* It's always nice to learn to use forms with a library */}
      <Form
        value={ value }
        onChange={ (nextValue: FormState) => setValue(nextValue) }
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
        <Button type="submit" label="Update" primary />
      </Form>
    </>
  )
}
