import './Display.css';

interface DisplayProps {
  equation: string;
  display: string;
}

export const Display: React.FC<DisplayProps> = ({ equation, display }) => {
  return (
    <>
      <div className="equation">{equation || '0'}</div>
      <div className="display">{display}</div>
    </>
  );
}; 