import { useRouter } from "next/router";
import en from "public/lang/en.js";
import sg from "public/lang/sg.js";

const useTrans = () => {
  const { locale } = useRouter();
  let trans;
  switch (locale) {
    case "sg":
      trans = sg;
      break;

    default:
      trans = en;
      break;
  }

  return trans;
};

export default useTrans;
