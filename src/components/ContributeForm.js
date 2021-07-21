import { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

import { useRouter } from "next/router";

export const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });

      router.replace(`/campaigns/${address}`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form error={!!errorMessage} onSubmit={onSubmit}>
      <Form.Field>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button loading={loading} primary>
        Contribute!
      </Button>
    </Form>
  );
};
