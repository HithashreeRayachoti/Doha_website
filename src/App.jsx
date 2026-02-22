import { useState, useEffect, useCallback } from 'react'
import './App.css'
import AttractionCarousel from './AttractionCarousel'
import thePearlImage from './thepearl.jpeg'
import introCardTwoImage from './new_im.jpeg'
import introCardThreeImage from './shipping_card.jpeg'
import musImage from './mus.jpg'
import kataraImage from './katara.jpeg'
import souqImage from './souq.webp'
import pearlAttractionImage from './The pearl.jpg'
import nationalAttractionImage from './National.jpg'
import inlandSeaImage from './sea.avif'
import attarsImage from './attars.jpg'
import taxiImage from './taxi.jpg'
import dohaMetroImage from './doha_metro.webp'
import dohaMetroRouteMap from './Doha-Metro-route-map.png'

const AUTO_SCROLL_MS = 5000

const INTRO_CARDS = [
  {
    id: 1,
    title: 'Tourist Attractions in Doha',
    description: 'The best places to visit in Doha all in one place',
    placeholderClass: 'card-placeholder-teal',
    image: thePearlImage,
    targetSectionId: 'attractions-section',
  },
  {
    id: 2,
    title: 'Transport and other options',
    description: 'Some imporatnt information about how you can navigate this beutiful city based  on your situation and preferences',
    placeholderClass: 'card-placeholder-pink',
    image: introCardTwoImage,
    targetSectionId: 'travel-options-section',
  },
  {
    id: 3,
    title: 'Shopping and hotels',
    description: 'What is a trip without a couple of souveniers and a relaxing place to stay?',
    placeholderClass: 'card-placeholder-orange',
    image: introCardThreeImage,
    targetSectionId: 'shopping-hotels-section',
  },
]

const ATTRACTIONS = [
  {
    id: 1,
    title: 'Museum of Islamic Art and Waterfront',
    description:
      'The Museum of Islamic Art sits on its own island along the Doha Corniche. Designed by I. M. Pei, it houses centuries of Islamic art spanning three continents. The surrounding park and waterfront offer stunning skyline views.',
    image: musImage,
  },
  {
    id: 2,
    title: 'Katara Cultural Village',
    description:
      'Katara Cultural Village is a prominent cultural and commercial hub. It features an amphitheatre, convention centre, and diverse dining and shopping options set in traditional architecture.',
    image: kataraImage,
  },
  {
    id: 3,
    title: 'Souq Waqif',
    description:
      'Souq Waqif is a traditional market with restored buildings, alleyways, and a variety of shops, restaurants, and cultural experiences in the heart of Doha.',
    image: souqImage,
  },
  {
    id: 4,
    title: 'The Pearl-Qatar',
    description:
      'The Pearl-Qatar is an artificial island with marinas, residential towers, and Mediterranean-style quarters, offering dining, shopping, and waterfront promenades.',
    image: pearlAttractionImage,
  },
  {
    id: 5,
    title: 'National Museum of Qatar',
    description:
      'The National Museum of Qatar presents the story of Qatar through innovative architecture and immersive exhibitions in a building inspired by the desert rose.',
    image: nationalAttractionImage,
  },
  {
    id: 6,
    title: 'Inland Sea',
    description:
      'The Inland Sea (Khor Al Adaid) is a stunning natural reserve where the desert meets the sea. Accessible only by 4x4, it offers dramatic dune landscapes and serene turquoise waters near the Saudi border.',
    image: inlandSeaImage,
  },
]

const TRAVEL_QUESTIONS = [
  {
    id: 'layover',
    question: 'Are you there on a layover or just for a day?',
    answer: (
      <>
        If you are on a layover and would prefer a guided option, Hamad International Airport offers multiple
        transit tour packages based on your layover duration.
        <br />
        <br />
        In this case, you usually do not have to worry about visa formalities, as the team helps with the transit
        visa process and ensures you return to the airport on time.
        <br />
        <br />
        Link:{' '}
        <a
          href="https://www.discoverqatar.qa/transit-tours/?utm_source=qr&utm_medium=website&utm_campaign=transit-tours&utm_content=transit-tour-landing-page-content"
          target="_blank"
          rel="noreferrer"
        >
          Discover Qatar Transit Tours
        </a>
        <br />
        <br />
        You can choose between bus tours and private vehicles based on your comfort level and budget.
        <br />
        <br />
        If you prefer exploring on your own with public transport, there is also a guided one-day plan at the end of
        this website, curated with a lot of love &lt;3.
      </>
    ),
  },
  {
    id: 'multi-day',
    question: 'Are you there to stay for a couple of days?',
    answer: (
      <>
        If you are staying in Doha for a couple of days, you can slow down and enjoy each area without rushing.
        A great way to plan is to split your days by theme&mdash;culture and museums, waterfront walks and cafes,
        shopping and souqs, and a desert experience.
        <br />
        <br />
        The Inland Sea (Khor Al Adaid) is best kept as a full day of its own, since it usually involves a longer
        4x4 desert trip and you will want enough time to enjoy the dunes and views comfortably.
        <br />
        <br />
        For city days, you can mix places like Katara Cultural Village, The Pearl, Souq Waqif, and the National
        Museum based on your interests and energy level.
        <br />
        <br />
        There are hotel links in the Shopping and Hotels section below, so you can choose a stay based on your
        budget, trip length, and preferred activities.
      </>
    ),
  },
]

const FOREX_COUNTRIES = [
  { country: 'India', currency: 'INR' },
  { country: 'United States', currency: 'USD' },
  { country: 'United Kingdom', currency: 'GBP' },
  { country: 'European Union', currency: 'EUR' },
  { country: 'United Arab Emirates', currency: 'AED' },
  { country: 'Saudi Arabia', currency: 'SAR' },
  { country: 'Canada', currency: 'CAD' },
  { country: 'Australia', currency: 'AUD' },
  { country: 'Singapore', currency: 'SGD' },
  { country: 'Japan', currency: 'JPY' },
  { country: 'Qatar', currency: 'QAR' },
  { country: 'Kuwait', currency: 'KWD' },
  { country: 'Bahrain', currency: 'BHD' },
  { country: 'Oman', currency: 'OMR' },
  { country: 'Jordan', currency: 'JOD' },
  { country: 'Turkey', currency: 'TRY' },
  { country: 'Egypt', currency: 'EGP' },
  { country: 'South Africa', currency: 'ZAR' },
  { country: 'Nigeria', currency: 'NGN' },
  { country: 'Kenya', currency: 'KES' },
  { country: 'China', currency: 'CNY' },
  { country: 'Hong Kong', currency: 'HKD' },
  { country: 'South Korea', currency: 'KRW' },
  { country: 'Thailand', currency: 'THB' },
  { country: 'Malaysia', currency: 'MYR' },
  { country: 'Indonesia', currency: 'IDR' },
  { country: 'Philippines', currency: 'PHP' },
  { country: 'Vietnam', currency: 'VND' },
  { country: 'Pakistan', currency: 'PKR' },
  { country: 'Bangladesh', currency: 'BDT' },
  { country: 'Sri Lanka', currency: 'LKR' },
  { country: 'Nepal', currency: 'NPR' },
  { country: 'Switzerland', currency: 'CHF' },
  { country: 'Sweden', currency: 'SEK' },
  { country: 'Norway', currency: 'NOK' },
  { country: 'Denmark', currency: 'DKK' },
  { country: 'Poland', currency: 'PLN' },
  { country: 'Czech Republic', currency: 'CZK' },
  { country: 'Hungary', currency: 'HUF' },
  { country: 'Romania', currency: 'RON' },
  { country: 'Russia', currency: 'RUB' },
  { country: 'Israel', currency: 'ILS' },
  { country: 'Brazil', currency: 'BRL' },
  { country: 'Mexico', currency: 'MXN' },
  { country: 'Argentina', currency: 'ARS' },
  { country: 'Chile', currency: 'CLP' },
  { country: 'Colombia', currency: 'COP' },
  { country: 'New Zealand', currency: 'NZD' },
]

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [openQuestion, setOpenQuestion] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState('INR')
  const [forexRate, setForexRate] = useState(null)
  const [forexDate, setForexDate] = useState('')
  const [isForexLoading, setIsForexLoading] = useState(false)
  const [forexError, setForexError] = useState('')
  const totalCards = ATTRACTIONS.length

  const toggleQuestion = (id) => {
    setOpenQuestion((prev) => (prev === id ? null : id))
  }

  const goToNextCard = useCallback(() => {
    setCurrentCardIndex((prev) => (prev + 1) % totalCards)
  }, [totalCards])

  const goToPrevCard = useCallback(() => {
    setCurrentCardIndex((prev) => (prev - 1 + totalCards) % totalCards)
  }, [totalCards])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(goToNextCard, AUTO_SCROLL_MS)
    return () => clearInterval(timer)
  }, [isPaused, goToNextCard])

  useEffect(() => {
    let cancelled = false

    const fetchFromFrankfurter = async (baseCurrency) => {
      const response = await fetch(`https://api.frankfurter.app/latest?from=${baseCurrency}&to=QAR`)
      if (!response.ok) throw new Error('Frankfurter request failed')
      const data = await response.json()
      const rate = data?.rates?.QAR
      if (typeof rate !== 'number') throw new Error('Frankfurter response missing rate')
      return { rate, date: data?.date || '' }
    }

    const fetchFromOpenErApi = async (baseCurrency) => {
      const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
      if (!response.ok) throw new Error('Open ER API request failed')
      const data = await response.json()
      const rate = data?.rates?.QAR
      if (typeof rate !== 'number') throw new Error('Open ER API response missing rate')
      return { rate, date: data?.time_last_update_utc || '' }
    }

    const fetchForexRate = async () => {
      setIsForexLoading(true)
      setForexError('')

      try {
        const result =
          selectedCurrency === 'QAR'
            ? { rate: 1, date: '' }
            : await fetchFromFrankfurter(selectedCurrency).catch(() => fetchFromOpenErApi(selectedCurrency))

        if (!cancelled) {
          setForexRate(result.rate)
          setForexDate(result.date)
        }
      } catch (error) {
        if (!cancelled) {
          setForexRate(null)
          setForexDate('')
          setForexError('Could not load live rates right now. Please try again.')
        }
      } finally {
        if (!cancelled) setIsForexLoading(false)
      }
    }

    fetchForexRate()

    return () => {
      cancelled = true
    }
  }, [selectedCurrency])

  return (
    <div className="app">
      <main className="main">
        <h1 className="main-title">Day In Doha Guide</h1>

        <section className="intro-cards">
          {INTRO_CARDS.map((card) => (
            <article
              key={card.id}
              className="intro-card intro-card-interactive"
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection(card.targetSectionId)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  scrollToSection(card.targetSectionId)
                }
              }}
              aria-label={`Go to ${card.title} section`}
            >
              {card.image ? (
                <img src={card.image} alt={card.title} className="intro-card-image" />
              ) : (
                <div className={`intro-card-image ${card.placeholderClass}`} />
              )}
              <h2 className="intro-card-title">{card.title}</h2>
              <p className="intro-card-description">{card.description}</p>
            </article>
          ))}
        </section>

        <section id="attractions-section" className="attractions-section">
          <h2 className="section-title">
            Tourist attractions and a little information about them for the curious
          </h2>

          <div
            className="attractions-carousel-outer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="attractions-viewport">
              <div
                className="attractions-track"
                style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
              >
                {ATTRACTIONS.map((attraction, index) => (
                  <AttractionCarousel
                    key={attraction.id}
                    attraction={attraction}
                    index={index + 1}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="card-arrow card-arrow-left"
              onClick={goToPrevCard}
              aria-label="Previous attraction"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className="card-arrow card-arrow-right"
              onClick={goToNextCard}
              aria-label="Next attraction"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>

          <div className="attraction-dots">
            {ATTRACTIONS.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`attraction-dot ${i === currentCardIndex ? 'attraction-dot-active' : ''}`}
                onClick={() => setCurrentCardIndex(i)}
                aria-label={`Go to attraction ${i + 1}`}
              />
            ))}
          </div>
        </section>

        <section id="travel-options-section" className="travel-options-section">
          <h2 className="travel-options-title">Travel options and important information</h2>

          <p className="travel-options-intro">
            First things first, check your eligibility based on your passport and explore visa options
          </p>

          <ol className="travel-options-list">
            <li>
              Use this official Qatar tourism website to check if you are eligible for a visa free entry:{' '}
              <a
                href="https://visitqatar.com/intl-en/plan-your-trip/visas"
                target="_blank"
                rel="noreferrer"
              >
                visitqatar.com
              </a>
            </li>
            <li>
              If preferred/required you can apply for an e-visa on the Hayya website:{' '}
              <a href="https://hayya.qa/" target="_blank" rel="noreferrer">
                hayya.qa
              </a>
            </li>
          </ol>

          <div className="forex-card">
            <h3 className="forex-card-title">
              Find out the currency conversion from your currency to QAR (Qatari Riyal)
            </h3>
            <label htmlFor="forex-country" className="forex-label">
              Choose your country
            </label>
            <select
              id="forex-country"
              className="forex-select"
              value={selectedCurrency}
              onChange={(event) => setSelectedCurrency(event.target.value)}
            >
              {FOREX_COUNTRIES.map((item) => (
                <option key={item.currency} value={item.currency}>
                  {item.country} ({item.currency})
                </option>
              ))}
            </select>

            <p className="forex-result" aria-live="polite">
              {isForexLoading && 'Loading live exchange rate...'}
              {!isForexLoading && forexError && forexError}
              {!isForexLoading && !forexError && forexRate !== null && (
                <>
                  1 {selectedCurrency} = {forexRate.toFixed(4)} QAR
                  {forexDate ? ` (Updated: ${forexDate})` : ''}
                </>
              )}
            </p>
          </div>

          <div className="payments-taxi-card">
            <p className="payments-taxi-text">
              International cards, especially <strong>Visa</strong> and <strong>Mastercard</strong>, are widely
              accepted across Doha for shop, restaurant, hotel, and ATM transactions. <strong>American Express</strong>{' '}
              and <strong>UnionPay</strong> are also accepted in many places, and contactless payments (
              <strong>Apple Pay</strong>, <strong>Google Pay</strong>) are very common.
            </p>
            <p className="payments-taxi-text">
              So in most cases, you do not need to worry about carrying a lot of cash. Also, <strong>Uber</strong> is
              the most widely used car service in Doha.
            </p>
            <div className="taxi-photo-row">
              <div className="taxi-photo-placeholder">
                <img src={taxiImage} alt="Local taxi in Doha" className="taxi-photo" />
              </div>
              <p className="taxi-side-note">This is what local taxis look like.</p>
            </div>
          </div>

          <p className="travel-options-subtext">
            Now that we have entering Doha all figured out let&apos;s see how we want to go around the city
          </p>

          {TRAVEL_QUESTIONS.map((item) => (
            <div key={item.id} className="travel-accordion-item">
              <button
                type="button"
                className={`travel-accordion-trigger ${openQuestion === item.id ? 'travel-accordion-trigger-open' : ''}`}
                onClick={() => toggleQuestion(item.id)}
                aria-expanded={openQuestion === item.id}
              >
                <span>{item.question}</span>
                <svg
                  className="travel-accordion-chevron"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                className={`travel-accordion-panel ${openQuestion === item.id ? 'travel-accordion-panel-open' : ''}`}
              >
                <div className="travel-accordion-answer">{item.answer}</div>
              </div>
            </div>
          ))}
        </section>

        <section id="shopping-hotels-section" className="shopping-hotels-section">
          <h2 className="shopping-hotels-title">Shopping and hotels</h2>

          <div className="shopping-hotels-block">
            <h3 className="shopping-hotels-subtitle">Where to stay</h3>
            <p className="shopping-hotels-text">
              Doha has accommodation for every budget, from luxury waterfront resorts to comfortable mid-range hotels near the city centre. Here are a few well-located options to consider:
            </p>
            <ul className="shopping-hotels-list">
              <li>
                <strong>Banana Island Resort by Anantara</strong> &mdash; a private island retreat just off the coast.{' '}
                <a href="https://www.anantara.com/en/banana-island-doha" target="_blank" rel="noreferrer">
                  anantara.com
                </a>
              </li>
              <li>
                <strong>Souq Waqif Boutique Hotels</strong> &mdash; charming heritage hotels right inside Souq Waqif.{' '}
                <a href="https://www.souqwaqifboutiquehotels.com" target="_blank" rel="noreferrer">
                  souqwaqifboutiquehotels.com
                </a>
              </li>
              <li>
                <strong>The St. Regis Doha</strong> &mdash; luxury on the Corniche with stunning bay views.{' '}
                <a href="https://www.marriott.com/hotels/travel/dohxr-the-st-regis-doha/" target="_blank" rel="noreferrer">
                  marriott.com
                </a>
              </li>
              <li>
                <strong>Premier Inn Doha</strong> &mdash; a reliable budget-friendly option near key attractions.{' '}
                <a href="https://www.premierinn.com" target="_blank" rel="noreferrer">
                  premierinn.com
                </a>
              </li>
            </ul>
            <p className="shopping-hotels-text">
              You can also browse and compare options on{' '}
              <a href="https://www.booking.com/city/qa/doha.html" target="_blank" rel="noreferrer">Booking.com</a>{' '}
              or{' '}
              <a href="https://visitqatar.com/intl-en/plan-your-trip/hotels" target="_blank" rel="noreferrer">Visit Qatar</a>.
            </p>
          </div>

          <div className="shopping-hotels-block">
            <h3 className="shopping-hotels-subtitle">Shopping at Souq Waqif</h3>
            <p className="shopping-hotels-text">
              If you are looking for souvenirs to take home, Souq Waqif is the place to go. The winding alleys are packed with stalls selling traditional keepsakes ; embroidered hats, keychains, miniature dhow boats, Arabic coffee sets, and handcrafted textiles. Prices are reasonable and bargaining is part of the fun.
            </p>
          </div>

          <div className="shopping-hotels-block">
            <h3 className="shopping-hotels-subtitle">Local attars &mdash; a must-try</h3>
            <p className="shopping-hotels-text">
              One thing you absolutely cannot miss is exploring the local attar (perfume oil) shops. Doha has a remarkable selection of traditional Arabian fragrances &mdash; from rich oud and musk to lighter floral and citrus blends. You can find attars at Souq Waqif, the Gold Souq area, and speciality perfumeries across the city. Many shops will even custom-blend a fragrance just for you.
            </p>

            <div className="attar-feature">
              <div className="attar-image-placeholder">
                <img src={attarsImage} alt="Local attars in Doha" className="attar-image" />
              </div>
              <div className="attar-note">
                <p className="attar-note-text">
                  <span className="attar-note-icon">&#9829;</span>{' '}
                  <em>Little note from the person behind this website: I picked up an attar from one of the Souq Waqif shops and it smells absolutely divine. Easily one of my favourite souvenirs &mdash; every time I wear it, it takes me right back to Doha.</em>
                </p>
              </div>
            </div>
          </div>

          <div className="shopping-hotels-block">
            <h3 className="shopping-hotels-subtitle">Other shopping spots</h3>
            <p className="shopping-hotels-text">
              Beyond Souq Waqif, Doha has modern malls with international and local brands. <strong>Villaggio Mall</strong> features an indoor canal with gondola rides, <strong>Place Vendome</strong> is one of the largest malls in the region, and <strong>The Pearl-Qatar</strong> has luxury boutiques along its waterfront promenades.
            </p>
          </div>
        </section>

        <section className="itinerary-section">
          <h2 className="itinerary-title">One day in Doha &mdash; a complete itinerary</h2>
          <p className="itinerary-subtitle">
            Curated for travellers who have exactly one day in Doha &mdash; whether it&apos;s a long layover or a quick stop. This plan keeps things realistic, walkable where possible, and uses the Doha Metro as the backbone.
          </p>

          <div className="itinerary-metro-pass">
            <img
              src={dohaMetroImage}
              alt="Doha Metro day pass"
              className="metro-pass-photo"
            />
            <div className="metro-pass-info">
              <h3 className="metro-pass-heading">Step 0: Buy a Doha Metro Day Pass</h3>
              <p className="metro-pass-text">
                Before you head out, grab a <strong>Standard Day Pass</strong> from any metro station ticket machine. It costs <strong>QAR 6 (~$1.65 USD)</strong> and gives you unlimited rides on all three metro lines (Red, Green, Gold) for the entire day.
              </p>
              <p className="metro-pass-text">
                A Gold Class Day Pass is also available for <strong>QAR 30</strong> if you prefer premium seating.
              </p>
              <p className="metro-pass-tip">
                <strong>Tip:</strong> Google Maps works excellently in Doha &mdash; it tells you exactly which metro line to take, which station to get off at, and gives walking directions from the station to your destination. Keep it handy throughout the day.
              </p>
            </div>
          </div>

          <div className="metro-map-block">
            <h3 className="metro-map-title">This is the map</h3>
            <img
              src={dohaMetroRouteMap}
              alt="Doha Metro route map"
              className="metro-map-image"
            />
          </div>

          <div className="itinerary-timeline">

            <div className="itinerary-stop">
              <div className="itinerary-stop-info">
                <div className="itinerary-stop-time">9:30 am &ndash; 10:15 am</div>
                <h3 className="itinerary-stop-name">Airport &rarr; Museum of Islamic Art</h3>
                <span className="itinerary-transport-badge itinerary-badge-metro">Metro</span>
                <p className="itinerary-stop-details">
                  Take the <strong>Red Line</strong> from <strong>Hamad International Airport</strong> station to <strong>National Museum</strong> station. Exit and walk approximately 15 minutes to the Museum of Islamic Art Park. The walk is flat, safe, and scenic along the waterfront.
                </p>
                <p className="itinerary-stop-station">
                  <strong>Metro station:</strong> National Museum (Red Line)
                </p>
              </div>
              <div className="itinerary-stop-map">
                <iframe
                  title="Museum of Islamic Art"
                  src="https://maps.google.com/maps?q=Museum+of+Islamic+Art+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="itinerary-stop">
              <div className="itinerary-stop-info">
                <div className="itinerary-stop-time">10:15 am &ndash; 11:30 am</div>
                <h3 className="itinerary-stop-name">Museum of Islamic Art and Waterfront</h3>
                <span className="itinerary-transport-badge itinerary-badge-walk">Walking</span>
                <p className="itinerary-stop-details">
                  Walk along the waterfront park, enjoy skyline views, take photos, and sit by the water. Optional short visit inside the museum if rain begins. This is a calm introduction to Doha.
                </p>
                <p className="itinerary-stop-station">
                  <strong>Nearest metro:</strong> National Museum (Red Line)
                </p>
              </div>
              <div className="itinerary-stop-map">
                <iframe
                  title="MIA Park Waterfront"
                  src="https://maps.google.com/maps?q=MIA+Park+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="itinerary-stop">
              <div className="itinerary-stop-info">
                <div className="itinerary-stop-time">11:40 am &ndash; 12:30 pm</div>
                <h3 className="itinerary-stop-name">Mina Corniche and Old Doha Port (Mina District)</h3>
                <span className="itinerary-transport-badge itinerary-badge-uber">Uber &middot; ~QAR 10&ndash;15</span>
                <p className="itinerary-stop-details">
                  From MIA Park, take a short Uber (about 5 minutes, approximately <strong>QAR 10&ndash;15 / ~$3&ndash;4 USD</strong>) to Mina Corniche and Old Doha Port. Explore the colourful Mina District, waterfront promenade, marine-themed art, and cruise terminal area. This is a short photo and coffee stop &mdash; do not spend more than 40 minutes.
                </p>
                <p className="itinerary-stop-station">
                  <strong>Nearest metro:</strong> Old Doha Port (Gold Line)
                </p>
              </div>
              <div className="itinerary-stop-map">
                <iframe
                  title="Old Doha Port"
                  src="https://maps.google.com/maps?q=Old+Doha+Port+Mina+District&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="itinerary-stop">
              <div className="itinerary-stop-info">
                <div className="itinerary-stop-time">12:45 pm &ndash; 2:30 pm</div>
                <h3 className="itinerary-stop-name">Souq Waqif (Lunch)</h3>
                <span className="itinerary-transport-badge itinerary-badge-metro">Metro / Walk</span>
                <p className="itinerary-stop-details">
                  Walk or take the Metro to <strong>Msheireb</strong> station (Gold Line one stop, or a short walk). Explore the traditional market lanes, have lunch at one of the many restaurants, sit at a caf&eacute;, and wander. Many areas are covered, making this ideal if rain starts.
                </p>
                <p className="itinerary-stop-station">
                  <strong>Metro station:</strong> Msheireb (Red / Green / Gold &mdash; interchange hub)
                </p>
              </div>
              <div className="itinerary-stop-map">
                <iframe
                  title="Souq Waqif"
                  src="https://maps.google.com/maps?q=Souq+Waqif+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="itinerary-stop">
              <div className="itinerary-stop-info">
                <div className="itinerary-stop-time">2:45 pm &ndash; 4:30 pm</div>
                <h3 className="itinerary-stop-name">Katara Cultural Village</h3>
                <span className="itinerary-transport-badge itinerary-badge-metro">Metro</span>
                <p className="itinerary-stop-details">
                  From Souq Waqif, walk to <strong>Msheireb</strong> station and take the <strong>Red Line</strong> to <strong>Katara</strong> station. Explore cultural buildings, art spaces, and seaside paths. This area is spacious and calming.
                </p>
                <p className="itinerary-stop-station">
                  <strong>Metro station:</strong> Katara (Red Line)
                </p>
              </div>
              <div className="itinerary-stop-map">
                <iframe
                  title="Katara Cultural Village"
                  src="https://maps.google.com/maps?q=Katara+Cultural+Village+Doha&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="itinerary-stop">
              <div className="itinerary-stop-info">
                <div className="itinerary-stop-time">4:45 pm &ndash; 6:00 pm</div>
                <h3 className="itinerary-stop-name">The Pearl Qatar (Qanat Quartier / Porto Arabia)</h3>
                <span className="itinerary-transport-badge itinerary-badge-uber">Uber &middot; ~QAR 15&ndash;20</span>
                <p className="itinerary-stop-details">
                  Take an Uber from Katara to The Pearl (10&ndash;15 minutes, approximately <strong>QAR 15&ndash;20 / ~$4&ndash;5.50 USD</strong>). Walk along the marina, relax at a caf&eacute;, and enjoy modern waterfront views. Optional short marina boat ride if operating and weather permits. This stop is flexible and can be shortened if raining.
                </p>
                <p className="itinerary-stop-station">
                  <strong>Nearest metro:</strong> No direct metro &mdash; Uber recommended
                </p>
              </div>
              <div className="itinerary-stop-map">
                <iframe
                  title="The Pearl Qatar"
                  src="https://maps.google.com/maps?q=The+Pearl+Qatar+Porto+Arabia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="itinerary-stop">
              <div className="itinerary-stop-info">
                <div className="itinerary-stop-time">6:00 pm &ndash; 6:30 pm</div>
                <h3 className="itinerary-stop-name">Return to Airport</h3>
                <span className="itinerary-transport-badge itinerary-badge-uber">Uber &middot; ~QAR 35&ndash;50</span>
                <p className="itinerary-stop-details">
                  Uber back to Hamad International Airport (approximately <strong>QAR 35&ndash;50 / ~$10&ndash;14 USD</strong>, about 20&ndash;30 minutes depending on traffic). Arriving early ensures a stress-free international departure.
                </p>
                <p className="itinerary-stop-station">
                  <strong>Metro alternative:</strong> Hamad International Airport (Red Line) &mdash; if time allows, take the metro back from Katara or Msheireb for just the cost of your day pass.
                </p>
              </div>
              <div className="itinerary-stop-map">
                <iframe
                  title="Hamad International Airport"
                  src="https://maps.google.com/maps?q=Hamad+International+Airport+Doha&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

          <div className="itinerary-cost-summary">
            <h3 className="itinerary-cost-heading">Estimated transport costs for the day</h3>
            <ul className="itinerary-cost-list">
              <li>Metro Day Pass: <strong>QAR 6</strong></li>
              <li>Uber to Mina District: <strong>~QAR 10&ndash;15</strong></li>
              <li>Uber to The Pearl: <strong>~QAR 15&ndash;20</strong></li>
              <li>Uber to Airport: <strong>~QAR 35&ndash;50</strong></li>
              <li className="itinerary-cost-total">Total: approximately <strong>QAR 66&ndash;91 (~$18&ndash;25 USD)</strong></li>
            </ul>
          </div>
        </section>

        <p className="itinerary-reel-link">
          Here is a little sneak peak via Instagram reel of this very itinerary:{' '}
          <a
            href="https://www.instagram.com/reel/DTFGPqJkr5m/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            target="_blank"
            rel="noreferrer"
          >
            Watch the reel
          </a>
        </p>
      </main>
    </div>
  )
}

export default App
