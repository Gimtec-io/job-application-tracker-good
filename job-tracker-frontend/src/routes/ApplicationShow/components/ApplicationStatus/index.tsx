import { Box, Form, FormField, Select } from 'grommet';
import { useEffect, useState } from 'react';
import { useQuery } from '../../../../hooks/useQuery';
import { ApplicationStatus } from '../../../../models/applications';

// the prefix name of the Create option entry
const prefix = 'Create';
const newStatusId = '0';

type Option = ApplicationStatus & {
  text?: string;
}

type Props = {
  status: ApplicationStatus;
  onChangeStatus: (newStatus: ApplicationStatus) => void;
}

type FormState = {
  status: Option,
};

export const ApplicationStatuSelector = (props: Props) => {
  const [options, setOptions] = useState<Option[]>([]);
  const { data: statuses, error, isLoading, refetch } = useQuery<ApplicationStatus[]>('/statuses');

  useEffect(() => {
    if (statuses) {
      setOptions(statuses);
    }
  }, [statuses]);

  useEffect(() => {
    // Need to refectch statuses in case a new one has been created
    refetch();
  }, [props.status.id, refetch])

  const searchOrCreateStatus = (text: string) => {
    const len = options.length;
    let newOptions = [...options];
    if (options[len - 1].content.includes(prefix)) {
      // remove Create option before adding an updated one
      newOptions.pop();
    }
    newOptions.push({
      content: `${prefix} '${text}'`,
      text,
      id: newStatusId,
    });
    // Filter by `text`
    setOptions(newOptions.filter((option) => option.content.indexOf(text) > -1));
  }

  const changeStatus = async ({ status: newStatusData }: FormState) => {
    if (newStatusData.id === newStatusId) {
      // We need to get the text without the "Create ..."
      props.onChangeStatus({
        id: newStatusId,
        content: newStatusData.text!,
      });
    } else {
      props.onChangeStatus(newStatusData);
    }
  }

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !statuses) {
    return <div>Loading...</div>;
  }

  return (
    <Box width="medium">
      <Form
        value={ {
          status: props.status,
        } }
        onChange={ changeStatus }
      >
        <FormField name="status">
          <Select
            name="status"
            options={ options }
            labelKey="content"
            valueKey="id"
            onSearch={ searchOrCreateStatus }
          />
        </FormField>
      </Form>
    </Box>
  );
};
