import "../styles/globals.css";
import type { AppPropsWithLayout } from "../layouts/layoutTypes";
import GlobalProvider from "../context/GlobalContext";
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>,
  );
}
