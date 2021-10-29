import { Box } from 'grommet';
import { Comment as CommentType } from '../../../models';
import { sortNewestByCreatedAt } from '../../../utils/sortNewestByCreatedAt';
import { Comment } from './Comment';

type Props = {
  comments: CommentType[],
};

export const CommentsList = ({ comments }: Props) => (
  <Box margin={ { top: 'medium' } }>
    {
      comments && comments.sort(sortNewestByCreatedAt).map((comment) => (
        <Comment key={ comment.id } comment={ comment } />
      ))
    }
  </Box>
);
