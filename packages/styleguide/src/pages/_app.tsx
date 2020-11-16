import Styleguide from "../styleguide";

function MyApp({ Component, pageProps }) {
  return (
    <Styleguide>
      <Component {...pageProps} />
    </Styleguide>
  );
}

export default MyApp;
