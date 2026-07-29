// ────────────────────────────────────────────────────────────────
// ENROLL PAGE
//
// S3.2 (15 pts) — Static form markup with TailwindCSS:
//   • labeled student-id input (number)
//   • labeled course <select> (use the two SAMPLE_COURSES as options
//     for now)
//   • a submit button with a hover state
//   • a green success box and a red error box (hardcode both visible
//     for S3.2 — you will show/hide them in S4.4)
//
// S4.4 (15 pts) — Make it dynamic:
//   • fill the select with real courses from GET /courses (name + fee +
//     how many seats left)
//   • on submit: POST /enrollments with { studentId, courseId } (numbers!)
//   • success → show a success message in the green box, clear the form
//   • failure (404 / 409) → show the API's error message in the red box
//   • only one of the two boxes is visible at a time
// ────────────────────────────────────────────────────────────────
import { BASE_URL } from '../api';

// Use this sample data for the select options in S3.2.
// In S4.4 you will replace it with data from the API.
const SAMPLE_COURSES = [
  { id: 1, name: 'Sample Course One', fee: 120, seatsAvailable: 18 },
  { id: 2, name: 'Sample Course Two', fee: 200, seatsAvailable: 0 },
];

export default function EnrollPage() {
  // TODO S3.2 — build the static form (inputs + button + boxes)
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Enroll a student</h2>

      <form className="space-y-5 rounded-lg border border-slate-200 bg-white p-6">
        <div>
          <label
            htmlFor="student-id"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Student ID
          </label>
          <input
            id="student-id"
            name="studentId"
            type="number"
            min="1"
            required
            placeholder="Enter student ID"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label
            htmlFor="course-id"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Course
          </label>
          <select
            id="course-id"
            name="courseId"
            required
            defaultValue=""
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="" disabled>
              Select a course
            </option>
            {SAMPLE_COURSES.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} — ${course.fee} ({course.seatsAvailable} seats left)
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Enroll student
        </button>
      </form>

      <div
        role="status"
        className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
      >
        Student enrolled successfully.
      </div>

      <div
        role="alert"
        className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      >
        Unable to enroll the student.
      </div>
    </section>
  );
  // TODO S4.4 — wire the form to the API
}
