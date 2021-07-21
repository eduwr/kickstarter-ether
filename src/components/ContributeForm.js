import { Button, Form, Input } from "semantic-ui-react";

export const ContributeForm = () => {
  return (
    <Form>
      <Form.Field>
        <Input label="ether" labelPosition="right" />
      </Form.Field>
      <Button primary>Contribute!</Button>
    </Form>
  );
};
