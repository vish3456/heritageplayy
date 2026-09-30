import { Link } from 'react-router-dom'
import './CaseCard.css'

const DIFFICULTY_CONFIG = {
  Beginner: {
    className: 'case-card__difficulty--beginner',
    label: 'Beginner',
    badge: '🟢 Beginner Level',
  },
  Intermediate: {
    className: 'case-card__difficulty--intermediate',
    label: 'Intermediate',
    badge: '🟡 Intermediate',
  },
  Advanced: {
    className: 'case-card__difficulty--advanced',
    label: 'Advanced',
    badge: '🔴 Advanced Research',
  },
}

const CATEGORY_ICONS = {
  board: '🏁 Board Layout',
  pieces: '♟️ Gaming Pieces',
  randomizer: '🎲 Randomizer',
  movement: '🔄 Movement Rules',
  objective: '🎯 Goal & Victory',
  players: '👥 Player Count',
}

export default function CaseCard({ caseData }) {
  const {
    id,
    number,
    title,
    civilization,
    period,
    region,
    summary,
    difficulty,
    evidence,
    isPrototype,
  } = caseData

  // Primary clue image
  const primaryEvidence = evidence?.find((e) => e.image) || evidence?.[0]
  const previewClues = evidence?.filter((e) => e.image && e.id !== primaryEvidence?.id).slice(0, 3) || []

  // Extract unique puzzle categories tested by this case
  const deductionCategories = Array.from(
    new Set((evidence || []).flatMap((e) => e.relatesTo || []))
  ).slice(0, 3)

  const diffConfig = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Beginner

  return (
    <article className="case-card">
      {/* Visual Header with Artifact Image */}
      <div className="case-card__media">
        {primaryEvidence?.image ? (
          <img
            src={primaryEvidence.image}
            alt={primaryEvidence.title || title}
            className="case-card__img"
            loading="lazy"
          />
        ) : (
          <div className="case-card__placeholder">
            <span>🏺</span>
          </div>
        )}
        <div className="case-card__overlay-gradient" />

        {/* Top Badges */}
        <div className="case-card__badges">
          <span className="case-card__case-badge">CASE {number}</span>
          <span className={`case-card__difficulty-chip ${diffConfig.className}`}>
            {diffConfig.badge}
          </span>
        </div>

        {/* Thumbnail Clue Strip */}
        {previewClues.length > 0 && (
          <div className="case-card__clue-strip">
            <span className="case-card__clue-label">Clues:</span>
            {previewClues.map((clue) => (
              <img
                key={clue.id}
                src={clue.image}
                alt={clue.title}
                title={`${clue.type}: ${clue.title}`}
                className="case-card__clue-thumb"
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="case-card__body">
        <div className="case-card__meta-bar">
          <span className="case-card__civ-tag">
            <span className="case-card__icon" aria-hidden="true">🏛️</span>
            {civilization}
          </span>
          <span className="case-card__period-tag">
            <span className="case-card__icon" aria-hidden="true">⏳</span>
            {period}
          </span>
        </div>

        <h3 className="case-card__title">
          <Link to={`/detective/${id}`}>{title}</Link>
        </h3>

        <div className="case-card__location">
          <span aria-hidden="true">📍</span>
          <span>{region}</span>
        </div>

        <p className="case-card__summary">{summary}</p>

        {/* Deduction tags */}
        {deductionCategories.length > 0 && (
          <div className="case-card__categories">
            <span className="case-card__categories-label">Key Deductions:</span>
            <div className="case-card__pills">
              {deductionCategories.map((cat) => (
                <span key={cat} className="case-card__cat-pill">
                  {CATEGORY_ICONS[cat] || cat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="case-card__footer">
        <div className="case-card__stats">
          <span className="case-card__evidence-count">
            <span aria-hidden="true">🔍</span>
            <strong>{evidence.length}</strong> Evidence Clues
          </span>
          {isPrototype && <span className="case-card__prototype-tag">Field Prototype</span>}
        </div>
        <Link to={`/detective/${id}`} className="case-card__cta">
          Investigate Case <span className="case-card__cta-arrow">→</span>
        </Link>
      </div>
    </article>
  )
}
