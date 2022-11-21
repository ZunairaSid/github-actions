import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <main name='viewport' content='width=device-width initial-scale=1' />
      <meta name='keywords' content={description} />
      <meta charSet='utf-8'></meta>
      <link rel='icon' href='/favicon.ico' />
      <title>{title} </title>
    </Head>
  );
};

Meta.defaultProps = {
  title: '',
  keywords: '',
  description: '',
};
export default Meta;
