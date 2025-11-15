const CodeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-[0.03]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="code-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <text
              x="5"
              y="20"
              className="fill-current text-base-content"
              fontSize="12"
              fontFamily="monospace"
            >
              {'{ code: true }'}
            </text>
            <text
              x="5"
              y="40"
              className="fill-current text-base-content"
              fontSize="12"
              fontFamily="monospace"
            >
              {'function() {}'}
            </text>
            <text
              x="5"
              y="60"
              className="fill-current text-base-content"
              fontSize="12"
              fontFamily="monospace"
            >
              {'const x = 10;'}
            </text>
            <text
              x="5"
              y="80"
              className="fill-current text-base-content"
              fontSize="12"
              fontFamily="monospace"
            >
              {'return data;'}
            </text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#code-pattern)" />
      </svg>
    </div>
  )
}

export default CodeBackground
