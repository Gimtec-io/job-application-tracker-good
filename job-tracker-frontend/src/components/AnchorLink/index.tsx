import { Anchor, AnchorExtendedProps } from 'grommet';
import { Link, LinkProps } from 'react-router-dom';

export type AnchorLinkProps = LinkProps & AnchorExtendedProps;

// Misalignment of PropTypes and Typescript types creates a console error message
// Prop Types of an Anchor do not accept React.Element
// https://github.com/grommet/grommet/blob/master/src/js/components/Anchor/propTypes.js#L9
export const AnchorLink: React.FC<AnchorLinkProps> = (props) => {
  return <Anchor as={ (props) => <Link { ...props } /> } { ...props } />;
};
