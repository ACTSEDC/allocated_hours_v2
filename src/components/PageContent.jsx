import RecordsTable from './RecordsTable';
import StatCard from './StatCard';
import { actsEvents } from '../data/events';

export default function PageContent({
  activePage,
  headers,
  results,
  totalHours,
  enrollment,
  name,
  branch,
  year,
}) {
  if (activePage === 'events') {
    return (
      <section className="events-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ACTS EDC / Experiences</p>
            <h2>Events that build, connect and inspire</h2>
          </div>
          <span className="section-count">{actsEvents.length} events</span>
        </div>
        <div className="event-grid">
          {actsEvents.map((event) => (
            <article className="event-card" key={event.name}>
              <span className="event-year">{event.year}</span>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <span className="event-arrow">ACTS EDC <span>↗</span></span>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (activePage === 'overview') {
    return (
      <div className="stats-grid">
        <StatCard label="Student" value={name || enrollment} />
        <StatCard label="Branch" value={branch || '—'} />
        <StatCard label="Year" value={year || '—'} />
        <StatCard label="Events attended" value={results.length} />
        <StatCard label="Hours allocated" value={totalHours} />
      </div>
    );
  }

  if (activePage === 'hours') {
    return (
      <RecordsTable
        headers={['event', 'hours']}
        rows={results}
        emptyMessage="No hour records found."
      />
    );
  }

  return <RecordsTable headers={headers} rows={results} emptyMessage="No records found." />;
}
