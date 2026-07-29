// ────────────────────────────────────────────────────────────────
// COURSES PAGE
//
// S3.1 (15 pts) — Static markup with TailwindCSS, using SAMPLE_COURSES:
//   • a search input styled with Tailwind (full width, border, focus state)
//   • a table: styled header row, borders or zebra rows, one row per
//     course with id, name, fee (show it as "$120"), and a seats badge
//   • badge shows "available / total" — green when seatsAvailable > 0,
//     red when it is 0
//
// S4.1 (10 pts) — Load the real courses from GET /courses when the page
//   mounts (useEffect + fetch). Show "Loading…" while the request runs.
//   Replace SAMPLE_COURSES with the fetched data.
//
// S4.2 (10 pts) — Make the search input work: typing (or submitting)
//   refetches with GET /courses?search=<text> so the table only shows
//   matching names.
// ────────────────────────────────────────────────────────────────
import { BASE_URL } from '../api';

// Use this sample data to build the static markup for S3.1.
// In S4.1 you will replace it with data from the API.
const SAMPLE_COURSES = [
  { id: 1, name: 'Sample Course One', fee: 120, seatsTotal: 20, seatsAvailable: 18 },
  { id: 2, name: 'Sample Course Two', fee: 200, seatsTotal: 10, seatsAvailable: 0 },
];

export default function CoursesPage() {
  // TODO S3.1 — build the static page (search input + table)
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Courses</h2>

      <label htmlFor="course-search" className="sr-only">
        Search courses
      </label>
      <input
        id="course-search"
        type="search"
        placeholder="Search courses..."
        className="mb-6 w-full rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">ID</th>
              <th scope="col" className="px-4 py-3 font-semibold">Name</th>
              <th scope="col" className="px-4 py-3 font-semibold">Fee</th>
              <th scope="col" className="px-4 py-3 font-semibold">Seats</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {SAMPLE_COURSES.map((course) => (
              <tr key={course.id} className="even:bg-slate-50">
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{course.id}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{course.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  ${course.fee}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      course.seatsAvailable > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {course.seatsAvailable} / {course.seatsTotal}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
  // TODO S4.1 — load real courses from the API
  // TODO S4.2 — wire the search input to ?search=
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Courses</h2>
      <p className="text-sm text-slate-500">TODO: build the Courses page here.</p>
    </section>
  );
}
