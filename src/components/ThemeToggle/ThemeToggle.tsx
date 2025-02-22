import './ThemeToggle.css';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <div className="calculator-header">
      <button 
        onClick={onToggle} 
        className="theme-toggle"
        data-theme-text={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}; 