import { ArrowRight, Search, User } from 'lucide-react';

export default function EmptyState({ error, isWelcome, onStartSearch }) {
  return (
    <section className="empty-panel">
      {isWelcome ? <span className="welcome-mark">ACTS</span> : <User size={28} />}
      <p className="eyebrow">ACTS EDC / Hour Allocation Portal</p>
      <h2>{isWelcome ? 'Welcome to the ACTS EDC hour allocation portal' : 'Search for a student'}</h2>
      <p>{isWelcome ? 'Find your participation records, explore ACTS events, and keep track of every hour you have earned.' : 'Enter an enrollment number above to load their allocated hour records.'}</p>
      {isWelcome && (
        <button className="welcome-hint" type="button" onClick={onStartSearch}>
          <Search size={15} /> Search by enrollment number to get started <ArrowRight size={15} />
        </button>
      )}
      {error && <p className="message error">{error}</p>}
    </section>
  );
}
