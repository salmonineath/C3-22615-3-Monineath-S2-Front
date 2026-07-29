// ────────────────────────────────────────────────────────────────
// STUDENT PAGE
//
// S3.3 (15 pts) — Static markup with TailwindCSS, using SAMPLE_STUDENT:
//   • a student-id input + "Load" button (styled, with hover state)
//   • a student info card (name, email, phone)
//   • an enrollments table: course name, fee, enroll date,
//     status badge (ACTIVE = green, DROPPED = gray),
//     and a "Drop" button ONLY on ACTIVE rows
//
// S4.3 (10 pts) — Clicking "Load" fetches GET /students/<id> and shows
//   the real student + enrollments. For an unknown id, show the API's
//   error message (red box) instead of the card.
//
// S4.5 (10 pts) — Clicking "Drop" calls PUT /enrollments/<id>/drop,
//   then reloads the student so the status badge updates and the button
//   disappears.
// ────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { BASE_URL } from '../api';

// Use this sample data to build the static markup for S3.3.
// In S4.3 you will replace it with data from the API.
const SAMPLE_STUDENT = {
  id: 1,
  name: 'Sample Student',
  email: 'sample@example.com',
  phone: '012345678',
  enrollments: [
    { id: 1, status: 'ACTIVE', enrollDate: '2026-07-01', course: { name: 'Sample Course One', fee: 120 } },
    { id: 2, status: 'DROPPED', enrollDate: '2026-06-01', course: { name: 'Sample Course Two', fee: 200 } },
  ],
};

export default function StudentPage() {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState(SAMPLE_STUDENT);
  const [error, setError] = useState('');

  async function loadStudent(id = studentId) {
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/students/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setStudent(data);
    } catch (loadError) {
      setError(loadError.message || 'Unable to load student');
    }
  }

  async function dropEnrollment(enrollmentId) {
    await fetch(`${BASE_URL}/enrollments/${enrollmentId}/drop`, {
      method: 'PUT',
    });
    await loadStudent(student.id);
  }

  // TODO S3.3 — build the static page (input + card + enrollments table)
   return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Student lookup</h2>

      <div className="mb-6 flex gap-3">
        <div className="flex-1">
          <label htmlFor="student-lookup-id" className="sr-only">
            Student ID
          </label>
          <input
            id="student-lookup-id"
            type="number"
            min="1"
            placeholder="Enter student ID"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button
          type="button"
          onClick={() => loadStudent()}
          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Load
        </button>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : (
        <>
      <article className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800">{student.name}</h3>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-500">Email</dt>
            <dd className="mt-1 text-slate-800">{student.email}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Phone</dt>
            <dd className="mt-1 text-slate-800">{student.phone}</dd>
          </div>
        </dl>
      </article>

      <h3 className="mb-3 text-base font-semibold text-slate-800">Enrollments</h3>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Course</th>
              <th scope="col" className="px-4 py-3 font-semibold">Fee</th>
              <th scope="col" className="px-4 py-3 font-semibold">Enroll date</th>
              <th scope="col" className="px-4 py-3 font-semibold">Status</th>
              <th scope="col" className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {student.enrollments.map((enrollment) => (
              <tr key={enrollment.id} className="even:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">
                  {enrollment.course.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  ${enrollment.course.fee}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {enrollment.enrollDate}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      enrollment.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {enrollment.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {enrollment.status === 'ACTIVE' && (
                    <button
                      type="button"
                      onClick={() => dropEnrollment(enrollment.id)}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Drop
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </>
      )}
    </section>
  );
}
