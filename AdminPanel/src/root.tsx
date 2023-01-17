// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import Sidebar from "./components/global/Sidebar";
import "./root.css";
export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Galore - Admin </Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <main class="flex flex-row justify-start items-start">
                <Sidebar />
                <FileRoutes />
              </main>
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
