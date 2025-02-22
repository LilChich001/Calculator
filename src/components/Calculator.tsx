import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Display } from './Display/Display';
import { Keypad } from './Keypad/Keypad';
import { ThemeToggle } from './ThemeToggle/ThemeToggle';
import { Modal } from './Modal/Modal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  handleNumber,
  handleOperator,
  handleBackspace,
  resetCalculator,
  setDisplay,
  setEquation,
  setHasResult,
  setLastWasOperator,
  setShowModal,
  addToHistory,
} from '../store/calculatorSlice';
import { History } from './History/History';
import './Calculator.css';

const SPECIAL_KEYS = ['+', '-', '*', '/', '=', 'Enter', 'Escape'] as const;
const OPERATORS = ['+', '-', '*', '/'] as const;

const Calculator: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const {
    display,
    equation,
    hasResult,
    lastWasOperator,
    showModal
  } = useAppSelector(state => state.calculator);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;

      if (SPECIAL_KEYS.includes(key as any)) {
        event.preventDefault();
      }

      if (/^[0-9.]$/.test(key)) {
        dispatch(handleNumber(key as any));
      }
      else if (OPERATORS.includes(key as any)) {
        dispatch(handleOperator(key as any));
      }
      else if (key === '=' || key === 'Enter') {
        handleEqual();
      }
      else if (key === 'Escape' || key === 'Delete') {
        dispatch(resetCalculator());
      }
      else if (key === 'Backspace') {
        dispatch(handleBackspace());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch]);

  const calculate = (expression: string): string => {
    try {
      const tokens = expression.split(' ').filter(token => token !== '');
      if (tokens.length < 3) return tokens[0];

      let result = parseFloat(tokens[0]);
      
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);

        if (isNaN(nextNumber)) {
          console.error('Invalid number in calculation');
          return 'Error';
        }

        switch (operator) {
          case '+':
            result += nextNumber;
            break;
          case '-':
            result -= nextNumber;
            break;
          case '*':
            result *= nextNumber;
            break;
          case '/':
            if (nextNumber === 0) {
              dispatch(setShowModal(true));
              return '0';
            }
            result /= nextNumber;
            break;
          default:
            console.error('Invalid operator:', operator);
            return 'Error';
        }
      }

      if (!isFinite(result)) {
        dispatch(setShowModal(true));
        return '0';
      }
      
      return Number(result.toFixed(8)).toString();
    } catch (error) {
      console.error('Calculation error:', error);
      return 'Error';
    }
  };

  const handleEqual = () => {
    if (equation === '') return;
    
    const trimmedEquation = lastWasOperator ? equation.slice(0, -3) : equation;
    const result = calculate(trimmedEquation);
    
    dispatch(setDisplay(result));
    dispatch(setEquation(result));
    dispatch(setHasResult(true));
    dispatch(setLastWasOperator(false));
    
    // Add calculation to history
    if (result !== 'Error') {
      dispatch(addToHistory({
        equation: trimmedEquation,
        result: result
      }));
    }
  };

  return (
    <>
      <div className="calculator">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        <Display equation={equation} display={display} />
        <div className="keyboard-info">
          Keyboard input supported:
          <br />
          0-9, ., +, -, *, /, Enter, Escape, Backspace
        </div>
        <Keypad
          onNumberClick={(num) => dispatch(handleNumber(num))}
          onOperatorClick={(op) => dispatch(handleOperator(op))}
          onEqualClick={handleEqual}
          onClearClick={() => dispatch(resetCalculator())}
        />
      </div>

      <History />

      {showModal && (
        <Modal
          message="Division by zero is not allowed!"
          onClose={() => dispatch(setShowModal(false))}
        />
      )}
    </>
  );
};

export default Calculator; 