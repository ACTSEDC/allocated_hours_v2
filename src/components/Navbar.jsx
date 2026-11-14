import { LoaderCircle, Search } from 'lucide-react';

export default function Navbar({ pageTitle, enrollment, isLoading, onEnrollmentChange, onSubmit, inputRef }) {
  return (
    <header className="navbar">
      <div>
        <p className="navbar-label">ACTS EDC / Allocated Hours</p>
        <h1>{pageTitle}</h1>
      </div>
      <form className="navbar-search" onSubmit={onSubmit}>
        <label htmlFor="enrollment">Enrollment number</label>
        <input
          ref={inputRef}
          id="enrollment"
          type="search"
          value={enrollment}
          onChange={(event) => onEnrollmentChange(event.target.value)}
          placeholder="Enter enrollment number"
          autoComplete="off"
        />
        <button className={isLoading ? 'is-loading' : ''} type="submit" disabled={isLoading} aria-label="Search">
          {isLoading ? <LoaderCircle className="spin" size={17} /> : <Search size={16} />}
        </button>
      </form>
    </header>
  );
}
