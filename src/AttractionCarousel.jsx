function AttractionCarousel({ attraction, index }) {
  return (
    <article className="attraction-card">
      <div className="attraction-card-inner">
        <h3 className="attraction-title">
          {index}. {attraction.title}
        </h3>

        {attraction.image ? (
          <img src={attraction.image} alt={attraction.title} className="attraction-image" />
        ) : (
          <div className="attraction-image-placeholder" />
        )}

        <div className="attraction-overlay">
          <p className="attraction-overlay-text">{attraction.description}</p>
        </div>
      </div>
    </article>
  )
}

export default AttractionCarousel
