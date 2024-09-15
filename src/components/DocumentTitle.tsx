import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
type DocumentTitleProps = {
  children: ReactNode;
};
export default function DocumentTitle({ children }: DocumentTitleProps) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
}
