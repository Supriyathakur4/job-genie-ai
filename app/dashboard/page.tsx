export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800">
          Overview
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track your job applications and career progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Total Applications</p>
          <p className="text-3xl font-semibold mt-2">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Interviews</p>
          <p className="text-3xl font-semibold mt-2">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500">Offers</p>
          <p className="text-3xl font-semibold mt-2">0</p>
        </div>
      </div>
    </div>
  );
}


