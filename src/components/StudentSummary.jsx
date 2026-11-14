export default function StudentSummary({ name, enrollment, totalHours, branch, year }) {
  return (
    <section className="student-heading">
      <div>
        <p className="eyebrow">Student record</p>
        <h2>{name || enrollment}</h2>
        <p>{enrollment} <span className="summary-separator">•</span> {branch || 'Branch not available'} <span className="summary-separator">•</span> {year || 'Year not available'}</p>
      </div>
      <div className="total">
        <span>Total hours</span>
        <strong>{totalHours}</strong>
      </div>
    </section>
  );
}
