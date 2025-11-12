const DotGridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-base-100">
      {/* Light mode: dark dots, darkest at top center */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.5) 1.5px, transparent 1.5px)`,
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 70%)',
        }}
      />

      {/* Dark mode: light dots, brightest at top center */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.3) 1.5px, transparent 1.5px)`,
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default DotGridBackground;
