import React, { useRef, useEffect, useState } from 'react';
import LazyImage from '../LazyImage';

const ProjectCards = ({ project, setOpenModal }) => {
  const cardRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const displayUrl = (project.webapp || project.github || '')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');

  return (
    <div
      ref={cardRef}
      className="group project-card"
      onClick={() => setOpenModal({ state: true, project })}
    >
      <div
        className={`project-card-static-border ${hasEntered ? 'visible' : ''}`}
        aria-hidden="true"
      />
      <div
        className="project-card-spin-border"
        aria-hidden="true"
      />
      <div className="project-card-inner">
        <div className="project-card-browser-bar" aria-hidden="true">
          <div className="project-card-dots">
            <div className="project-card-dot" />
            <div className="project-card-dot" />
            <div className="project-card-dot" />
          </div>
          <div className="project-card-url-bar">
            <div className="project-card-url-icon" />
            <span className="project-card-url-text">
              {displayUrl}
            </span>
          </div>
        </div>

        <div className="project-card-image-container">
          <LazyImage
            src={project.image}
            alt={project.title}
            className="project-card-image"
          />
          <div className="project-card-image-gradient" />
        </div>

        <div className="project-card-content">
          <div className="project-card-content-header">
            <div>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-description">{project.description}</p>
            </div>
            <a
              href={project.webapp || project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="project-card-arrow-link"
              data-tooltip="View Live Demo"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

          <div className="project-card-tags">
            {project.tags?.map((tag) => (
              <span key={tag} className="project-card-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;