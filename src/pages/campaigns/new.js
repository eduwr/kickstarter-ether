import { useState } from "react";
import { useRouter } from "next/router";

import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../../ethereum/factory";
import web3 from "../../../ethereum/web3";

const New = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      router.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Create a Campaign</h3>
      <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />

        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </>
  );
};

export default New;
