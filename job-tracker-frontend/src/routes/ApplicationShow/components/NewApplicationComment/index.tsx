import { Button, Form, FormExtendedEvent, FormField, TextArea } from 'grommet';
import { useState } from 'react';

type Props = {
  onSubmit: (text: string) => void;
}

type FormState = {
  comment: string,
};

export const NewApplicationComment = ({ onSubmit }: Props) => {
  const [value, setValue] = useState<FormState>({ comment: '' });
  const createNewComment = async (data: FormExtendedEvent<FormState, Element>) => {
    await onSubmit(data.value.comment);
    setValue({ comment: '' });
  };
  return (
    <Form
      value={ value }
      onChange={ (nextValue: FormState) => setValue(nextValue) }
      onSubmit={ createNewComment }
    >
      <FormField name="comment" htmlFor="comment">
        <TextArea
          id="comment"
          name="comment"
          placeholder="Write whatever happened with this job application"
        />
      </FormField>
      <Button label="Add Comment" primary type="submit" />
    </Form>
  );
};
