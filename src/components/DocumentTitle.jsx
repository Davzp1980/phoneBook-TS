import { Helmet } from 'react-helmet';

export default function DocumentTitle({ children }) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
}
