import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import web3 from "../../../../../ethereum/web3";
import { useCampaign } from "../../../../hooks/useCampaign";
import Campaign from "../../../../../ethereum/campaign";

const RequestNew = ({ address }) => {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { createRequest } = useCampaign(address);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await createRequest(
        description,
        web3.utils.toWei(value, "ether"),
        recipient
      ).send({
        from: accounts[0],
      });

      router.push(`/campaigns/${address}/requests`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Create a Request</h3>
      <Form error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button onClick={onSubmit} loading={loading} primary>
          Create!
        </Button>

        <Button floated="right" secondary onClick={(e) => router.back()}>
          Back!
        </Button>
      </Form>
    </>
  );
};

export default RequestNew;

export async function getServerSideProps({ params }) {
  return {
    props: {
      address: params.address,
    },
  };
}
