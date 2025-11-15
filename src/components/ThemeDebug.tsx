import { useTheme } from '../hooks/useTheme'

const ThemeDebug = () => {
  const { theme } = useTheme()

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-base-200 border-2 border-primary rounded-lg z-50 text-xs">
      <div>
        Current Theme: <strong>{theme}</strong>
      </div>
      <div className="mt-2">
        <div className="bg-base-100 text-base-content p-2">base-100</div>
        <div className="bg-base-200 text-base-content p-2">base-200</div>
        <div className="bg-base-300 text-base-content p-2">base-300</div>
        <div className="bg-primary text-primary-content p-2">primary</div>
        <div className="bg-secondary text-secondary-content p-2">secondary</div>
      </div>
    </div>
  )
}

export default ThemeDebug
