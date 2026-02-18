import type { ReactElement } from 'react';

interface GenerateOGImageProps {
  title: string;
  description?: string;
}

export function generateOGImage({
  title,
  description,
}: GenerateOGImageProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '80px',
        backgroundColor: 'rgb(10, 10, 10)',
        color: 'white',
        fontFamily: 'Inter',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div
          style={{
            fontSize: title.length > 40 ? 60 : 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'white',
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              fontSize: description.length > 100 ? 36 : 42,
              lineHeight: 1.4,
              color: 'rgb(163, 163, 163)',
              maxWidth: '900px',
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Frog icon inline SVG */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgb(74, 222, 128)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a4 4 0 0 0-4 4v2H4a2 2 0 0 0-2 2v2a8 8 0 0 0 16 0v-2a2 2 0 0 0-2-2h-4V6a4 4 0 0 0-4-4z" />
          <circle cx="9" cy="13" r="1" fill="rgb(74, 222, 128)" />
          <circle cx="15" cy="13" r="1" fill="rgb(74, 222, 128)" />
        </svg>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: 'white',
          }}
        >
          Rybbit
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgb(115, 115, 115)',
            marginLeft: '8px',
          }}
        >
          Docs
        </div>
      </div>
    </div>
  );
}
