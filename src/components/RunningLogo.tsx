import jobsData from "@/jobs.json";

export default function RunningLogo() {
  const doubledData = [...jobsData, ...jobsData, ...jobsData, ...jobsData];

  return (
    <div className="w-full overflow-x-hidden whitespace-nowrap py-10">
      {/* Wrapper for animation */}
      <div className="inline-flex items-center gap-10 animate-marquee w-[200%]">
        {doubledData.map((job, key) => (
          <img
            key={key}
            src={job.icon}
            alt={job.companyName}
            className="w-12 h-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
