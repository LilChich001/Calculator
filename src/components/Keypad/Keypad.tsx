import { type NumberType, type OperatorType } from '../../types';
import './Keypad.css';

interface KeypadProps {
  onNumberClick: (number: NumberType) => void;
  onOperatorClick: (operator: OperatorType) => void;
  onEqualClick: () => void;
  onClearClick: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  onNumberClick,
  onOperatorClick,
  onEqualClick,
  onClearClick,
}) => {
  return (
    <div className="buttons">
      <button onClick={onClearClick} className="clear">C</button>
      <button onClick={() => onOperatorClick('/')} className="operator">÷</button>
      <button onClick={() => onOperatorClick('*')} className="operator">×</button>
      <button onClick={() => onOperatorClick('-')} className="operator">−</button>

      <button onClick={() => onNumberClick('7')}>7</button>
      <button onClick={() => onNumberClick('8')}>8</button>
      <button onClick={() => onNumberClick('9')}>9</button>
      <button onClick={() => onOperatorClick('+')} className="operator">+</button>

      <button onClick={() => onNumberClick('4')}>4</button>
      <button onClick={() => onNumberClick('5')}>5</button>
      <button onClick={() => onNumberClick('6')}>6</button>
      <button onClick={onEqualClick} className="equal">=</button>

      <button onClick={() => onNumberClick('1')}>1</button>
      <button onClick={() => onNumberClick('2')}>2</button>
      <button onClick={() => onNumberClick('3')}>3</button>
      <button onClick={() => onNumberClick('0')} className="zero">0</button>

      <button onClick={() => onNumberClick('.')}>.</button>
    </div>
  );
}; 