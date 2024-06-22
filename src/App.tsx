import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import Job from "./types/Job";
import supabase from "./supabase";
import { toast } from "react-toastify";

const App = () => {
  const addJob = async (newJob: Job) => {
    const { data } = await supabase
      .from("companies")
      .insert({
        name: newJob.company.name,
        description: newJob.company.description,
        contactEmail: newJob.company.contactEmail,
        contactPhone: newJob.company.contactPhone,
      })
      .select()
      .single();

    // Check the id key exists
    if (!data || !data.id) {
      toast.error("Error creating job");
      return;
    }

    await supabase.from("jobs").insert({
      title: newJob.title,
      type: newJob.type,
      location: newJob.location,
      salary: newJob.salary,
      description: newJob.description,
      company_id: data.id,
    });

    return;
  };

  const updateJob = async (updatedJob: Job) => {
    const { data } = await supabase
      .from("companies")
      .insert({
        name: updatedJob.company.name,
        description: updatedJob.company.description,
        contactEmail: updatedJob.company.contactEmail,
        contactPhone: updatedJob.company.contactPhone,
      })
      .select()
      .single();

    // Check the id key exists
    if (!data || !data.id) {
      toast.error("Error updating job");
      return;
    }

    await supabase
      .from("jobs")
      .update({
        title: updatedJob.title,
        type: updatedJob.type,
        location: updatedJob.location,
        salary: updatedJob.salary,
        description: updatedJob.description,
        company_id: data.id,
      })
      .eq("id", updatedJob.id);

    return;
  };

  const deleteJob = async (id: string) => {
    await supabase.from("jobs").delete().eq("id", id);
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
