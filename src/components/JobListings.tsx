import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import Job from "../types/Job";
import supabase from "../supabase";
const JobListings = ({ isHome = false }: { isHome?: boolean }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Select the jobs and its associated company as one to one relationship from supabase
        const { data } = (await supabase
          .from("jobs")
          .select(
            "id, title, type, description, location, salary, company:companies(name,description,contactEmail,contactPhone)"
          )) as { data: Job[] };
        setJobs(data);
      } catch (error) {
        console.log("Error fetching data ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <Spinner loading={true} />
            ) : (
              <>
                {jobs.map((job) => {
                  return <JobListing key={job.id} job={job} />;
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListings;
