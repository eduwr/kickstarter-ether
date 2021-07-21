import { useRouter } from "next/router";

const Show = () => {
  const router = useRouter();

  console.log(router.query);
  return <h1>Show</h1>;
};

export default Show;
