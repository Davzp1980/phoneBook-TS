import DocumentTitle from '../../components/DocumentTitle';

type Styles = {
  container: {
    minHeight: string;
    display: string;
    alignItems: string;
    justifyContent: string;
  };
  title: {
    fontWeight: number;
    fontSize: number;
    textAlign: any;
  };
};

const styles: Styles = {
  container: {
    minHeight: 'calc(100vh - 50px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 500,
    fontSize: 48,
    textAlign: 'center',
  },
};

export default function HomePage() {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div style={styles.container}>
        <h1 style={styles.title}>
          Contacts welcome page{' '}
          <span role="img" aria-label="Greeting icon">
            💁‍♀️
          </span>
        </h1>
      </div>
    </>
  );
}
