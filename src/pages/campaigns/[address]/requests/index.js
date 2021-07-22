import React from "react";
import { Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
const Requests = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>New Request</Button>
      </Link>
    </>
  );
};

export default Requests;
