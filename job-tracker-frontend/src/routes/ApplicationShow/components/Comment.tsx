import { Box, Text } from 'grommet';
import { Comment as CommentType } from '../../../models';

type Props = {
  comment: CommentType;
}

export const Comment = ({ comment }: Props) => (
  <Box margin="small" border="bottom">
    <Text margin={ { bottom: 'xsmall' } }>
      { comment.content }
    </Text>
    <Text size="small">
      { new Date(comment.createdAt).toLocaleDateString() }
    </Text>
  </Box>
)