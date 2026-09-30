import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CASES } from '../../data/cases.js'
import CaseCard from '../../components/detective/CaseCard.jsx'
import PageHero from '../../components/PageHero.jsx'
import './Detective.css'

export default function Detective() {
  const [difficultyFilter, setDifficultyFilter] = useState('ALL')
  const [civFilter, setCivFilter] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const civilizations = useMemo(() => {
    return ['ALL', ...new Set(CASES.map((c) => c.civilization))]
  }, [])

  const filteredCases = useMemo(() => {
    return CASES.filter((c) => {
      const matchDiff = difficultyFilter === 'ALL' || c.difficulty.toUpperCase() === difficultyFilter.toUpperCase()
      const matchCiv = civFilter === 'ALL' || c.civilization === civFilter
      const q = searchQuery.trim().toLowerCase()
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.region.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.civilization.toLowerCase().includes(q)

      return matchDiff && matchCiv && matchSearch
    })
  }, [difficultyFilter, civFilter, searchQuery])

  return (
    <div className="detective-page">
      {/* ---------- HERO SECTION WITH PAGEHERO & IMAGE ---------- */}
      <PageHero
        eyebrow="Archaeological Detective"
        title={
          <>
            Discover the Evidence. <span className="detective__hero-accent">Build Your Theory.</span>
          </>
        }
        subtitle="Step into the field as an archaeologist. Inspect excavated dice, game boards, figurines, and court records to deduce how ancient civilizations played."
      >
        <div className="detective-hero__bottom">
          <div className="detective-hero__stats">
            <div className="detective-hero__stat-card">
              <span className="detective-hero__stat-num">3</span>
              <span className="detective-hero__stat-label">Active Case Files</span>
            </div>
            <div className="detective-hero__stat-divider" />
            <div className="detective-hero__stat-card">
              <span className="detective-hero__stat-num">16</span>
              <span className="detective-hero__stat-label">Excavated Artifacts</span>
            </div>
            <div className="detective-hero__stat-divider" />
            <div className="detective-hero__stat-card">
              <span className="detective-hero__stat-num">100%</span>
              <span className="detective-hero__stat-label">Scientific Rigor</span>
            </div>
          </div>

          <a href="#case-browser" className="detective-hero__cta">
            Explore Cases ↓
          </a>
        </div>
      </PageHero>

      {/* ---------- HOW IT WORKS: THE DETECTIVE METHODOLOGY ---------- */}
      <section className="detective__method-band">
        <div className="container">
          <div className="detective__method-head">
            <span className="detective__section-icon">🔍</span>
            <div>
              <h2>The Archaeological Investigation Process</h2>
              <p>How researchers decode ancient games from fragmentary archaeological evidence</p>
            </div>
          </div>

          <div className="detective__steps-grid">
            <div className="detective__step-card">
              <div className="detective__step-top">
                <span className="detective__step-number">01</span>
                <span className="detective__step-icon">🏺</span>
              </div>
              <h3>Examine Finds</h3>
              <p>Inspect 3D photos of excavated dice cubes, scratched brick boards, cones, and soil stratigraphy.</p>
            </div>

            <div className="detective__step-card">
              <div className="detective__step-top">
                <span className="detective__step-number">02</span>
                <span className="detective__step-icon">⚖️</span>
              </div>
              <h3>Weigh Confidence</h3>
              <p>Differentiate between directly <strong>Verified</strong> finds, scholarly <strong>Interpretations</strong>, and hypothetical <strong>Reconstructions</strong>.</p>
            </div>

            <div className="detective__step-card">
              <div className="detective__step-top">
                <span className="detective__step-number">03</span>
                <span className="detective__step-icon">🧩</span>
              </div>
              <h3>Form Hypothesis</h3>
              <p>Connect your clues and select board geometry, player count, piece counts, movement, and game objective.</p>
            </div>

            <div className="detective__step-card">
              <div className="detective__step-top">
                <span className="detective__step-number">04</span>
                <span className="detective__step-icon">🏛️</span>
              </div>
              <h3>Compare & Play</h3>
              <p>Test your conclusions against leading archaeological theories and see your reconstructed game come alive!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CASE FILES BROWSER ---------- */}
      <section id="case-browser" className="detective__cases-section">
        <div className="container">
          <div className="detective__cases-head">
            <div>
              <p className="eyebrow">Case Files</p>
              <h2>Choose an Archaeological Case</h2>
              <p className="detective__cases-sub">
                Each excavation dossier contains photographic evidence, site reports, and stratigraphic records.
              </p>
            </div>

            {/* Search Input */}
            <div className="detective__search-wrap">
              <span className="detective__search-icon">🔍</span>
              <input
                type="text"
                className="detective__search-input"
                placeholder="Search case, site or artifact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="detective__search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="detective__filter-bar">
            <div className="detective__filter-group">
              <span className="detective__filter-label">Difficulty:</span>
              {['ALL', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  className={`detective__pill ${difficultyFilter.toUpperCase() === diff.toUpperCase() ? 'is-active' : ''}`}
                  onClick={() => setDifficultyFilter(diff)}
                >
                  {diff === 'ALL' ? 'All Levels' : diff}
                </button>
              ))}
            </div>

            <div className="detective__filter-group">
              <span className="detective__filter-label">Civilization:</span>
              {civilizations.map((civ) => (
                <button
                  key={civ}
                  type="button"
                  className={`detective__pill ${civFilter === civ ? 'is-active' : ''}`}
                  onClick={() => setCivFilter(civ)}
                >
                  {civ === 'ALL' ? 'All Regions' : civ.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Case Cards Grid */}
          {filteredCases.length > 0 ? (
            <div className="detective-list__grid">
              {filteredCases.map((c) => (
                <CaseCard key={c.id} caseData={c} />
              ))}
            </div>
          ) : (
            <div className="detective__no-results">
              <span className="detective__no-results-icon">🔎</span>
              <h3>No matching cases found</h3>
              <p>Try clearing your search query or switching your difficulty filter.</p>
              <button
                type="button"
                className="detective__reset-btn"
                onClick={() => {
                  setDifficultyFilter('ALL')
                  setCivFilter('ALL')
                  setSearchQuery('')
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Scientific Methodology Note */}
          <div className="detective__methodology-card">
            <span className="detective__notice-icon">📜</span>
            <div>
              <h3>Methodology & Scientific Integrity</h3>
              <p>
                In genuine archaeology, ancient game boards don't come with instructional rulebooks. Every case in HeritagePlay reflects authentic excavation methodology: all evidence items are strictly categorized by confidence level (<strong>VERIFIED</strong> context, scholarly <strong>INTERPRETATION</strong>, and speculative <strong>RECONSTRUCTION</strong>) so learners understand how archaeological conclusions are formed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- EVIDENCE CATEGORIES EXPLORER ---------- */}
      <section className="detective__categories-section">
        <div className="container">
          <div className="detective__categories-head">
            <span className="detective__section-icon">🗃️</span>
            <div>
              <h2>Evidence Categories You'll Investigate</h2>
              <p>The primary classes of archaeological material that unlock ancient game rules</p>
            </div>
          </div>

          <div className="detective__categories-grid">
            <div className="detective__category-card">
              <span className="detective__category-emoji">🎲</span>
              <h3>Dice & Chance Objects</h3>
              <p>
                Terracotta cubes with 1–6 pip markings, cowrie shells worn smooth from tossing, and carved tetrahedral sticks indicate chance-driven movement.
              </p>
              <span className="detective__category-example">Found at: Harappa, Mohenjo-daro</span>
            </div>

            <div className="detective__category-card">
              <span className="detective__category-emoji">🗺️</span>
              <h3>Board Markings & Grids</h3>
              <p>
                Incised markings on paving stones, scratched grids on fired kiln bricks, and cross-in-square stone carvings define track paths and board geometry.
              </p>
              <span className="detective__category-example">Found at: Deccan Plateau, Indus Sites</span>
            </div>

            <div className="detective__category-card">
              <span className="detective__category-emoji">♟️</span>
              <h3>Gaming Pieces & Figurines</h3>
              <p>
                Matched sets of terracotta cones, polished stone animal figurines, and colored glass counters reveal player counts, teams, and hierarchy.
              </p>
              <span className="detective__category-example">Found at: Domestic Floors, Palace Courtyards</span>
            </div>

            <div className="detective__category-card">
              <span className="detective__category-emoji">📜</span>
              <h3>Stratigraphy & Records</h3>
              <p>
                Undisturbed soil layers confirm chronology; proximity to trade routes explains diffusion; and court administrative chronicles record social context.
              </p>
              <span className="detective__category-example">Found at: Royal Archives, Excavation Trenches</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- BOTTOM CALL TO ACTION ---------- */}
      <div className="container">
        <div className="detective__cta">
          <div className="detective__cta-text">
            <h2>Ready to Test Ancient Theories in Action?</h2>
            <p>
              Put down the detective notes and play the reconstructed historical games, or explore the ancient cities where they were found on the Heritage Map.
            </p>
          </div>
          <div className="detective__cta-buttons">
            <Link to="/play" className="detective__cta-btn detective__cta-btn--primary">
              Play Reconstructed Games →
            </Link>
            <Link to="/map" className="detective__cta-btn detective__cta-btn--secondary">
              Explore Heritage Map 🗺️
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
