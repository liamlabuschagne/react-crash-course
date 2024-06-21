import {
  ActionFunctionArgs,
  ParamParseKey,
  Params,
  useLoaderData,
} from "react-router-dom";

const JobPage = () => {
  const job = useLoaderData();

  return <h1>{job.title}</h1>;
};

const PathNames = {
  jobDetail: "/jobs/:id",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.jobDetail>>;
}

const jobLoader = async ({ params }: Args) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { JobPage as default, jobLoader };
