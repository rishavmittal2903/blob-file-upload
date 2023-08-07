import React from "react";
import Layout from "./component/Layout/Layout";
import { getSaSTokenForBlob } from "./utility/utility";

const App = () => {
  const [sasToken, setSasToken] = React.useState<string>();

  const getSaSToken = async () => {
    const sasToken = await getSaSTokenForBlob();
    if (sasToken) {
      setSasToken(sasToken);
    }
  };
  React.useEffect(() => {
    getSaSToken();
  }, []);
  return <>{sasToken ? <Layout sasToken={sasToken} /> : "Loading..."}</>;
};

export default App;
