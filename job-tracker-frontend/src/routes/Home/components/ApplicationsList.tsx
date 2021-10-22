import { List, Text } from 'grommet';
import { useHistory } from 'react-router';
import { Application } from '../../../models/applications';

type Props = {
  applications: Application[];
};

export const ApplicationsList = ({ applications }: Props) => {
  const history = useHistory();
  return (
    <List
      data={ applications }
      primaryKey={
        (application: Application) => <Text key={ `status-${application.id}` } weight="bold">{ application.status.content }</Text>
      }
      secondaryKey={
        (application: Application) => <Text key={ `title-${application.id}` }>{ `${application.company} - ${application.position}` }</Text>
      }
      onClickItem={
        ({ item }: { item?: Application }) => {
          if (item) {
            history.push(`/applications/${item.slug}`)
          }
        }
      }
    />
  );
};
