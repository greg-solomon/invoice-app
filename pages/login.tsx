import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Loading } from "../components/shared/Loading";
import { Button } from "../components/ui/Button";
import { Heading } from "../components/ui/Heading";
import { useInvoices } from "../lib/context/InvoiceContext";
import { useThemeContext } from "../lib/context/ThemeContext";
import styles from "../styles/LoginPage.module.scss";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const { dark } = useThemeContext();
  const { demoHandler } = useInvoices();

  React.useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  const handleDemo = () => {
    demoHandler.on();
    router.replace("/");
  };

  if (loading) return <Loading />;
  return (
    <main
      role="main"
      className={[styles.main, dark ? styles.dark : ""].join(" ")}
    >
      <Head>
        <title>Login | Invoice App</title>
      </Head>
      <div
        className={[
          styles.loginContainer,
          dark ? styles.darkContainer : "",
        ].join(" ")}
      >
        <Heading variant="h1">Login</Heading>
        <p>
          This is a portfolio project developed from a{" "}
          <a
            href="https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Front End Mentor
          </a>{" "}
          challenge
        </p>
        <div className={styles.flex}>
          <Button variant={3} onClick={handleDemo}>
            View as Demo
          </Button>
          <Button variant={1}>Sign in with Github</Button>
        </div>
      </div>
    </main>
  );
};

export default Login;
