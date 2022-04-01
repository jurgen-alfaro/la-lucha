import { useContext, useEffect } from "react";
import Spinner from "../shared/Spinner";
import JobContext from "../../context/jobs/JobContext";
import JobTable from "./JobTable";

function JobList() {
  const { isLoading, getJobs } = useContext(JobContext);

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-2xl my-4 font-bold card-title'>
          Solicitudes de Empleo
        </h2>

        <div className='overflow-x-auto max-h-full'>
          {!isLoading ? <JobTable /> : <Spinner />}
        </div>
      </div>
    </div>
  );
}

export default JobList;
