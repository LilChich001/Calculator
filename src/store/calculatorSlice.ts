import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NumberType, OperatorType } from '../types';

interface HistoryItem {
  equation: string;
  result: string;
  timestamp: number;
}

interface CalculatorState {
  display: string;
  equation: string;
  hasResult: boolean;
  lastWasOperator: boolean;
  showModal: boolean;
  history: HistoryItem[];
}

// Load history from localStorage
const loadHistory = (): HistoryItem[] => {
  try {
    const savedHistory = localStorage.getItem('calculatorHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
};

const initialState: CalculatorState = {
  display: '0',
  equation: '',
  hasResult: false,
  lastWasOperator: false,
  showModal: false,
  history: loadHistory(),
};

// Save history to localStorage
const saveHistory = (history: HistoryItem[]) => {
  try {
    localStorage.setItem('calculatorHistory', JSON.stringify(history.slice(-10)));
  } catch (error) {
    console.error('Error saving history:', error);
  }
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    setDisplay: (state, action: PayloadAction<string>) => {
      state.display = action.payload;
    },
    setEquation: (state, action: PayloadAction<string>) => {
      state.equation = action.payload;
    },
    setHasResult: (state, action: PayloadAction<boolean>) => {
      state.hasResult = action.payload;
    },
    setLastWasOperator: (state, action: PayloadAction<boolean>) => {
      state.lastWasOperator = action.payload;
    },
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    handleNumber: (state, action: PayloadAction<NumberType>) => {
      const number = action.payload;
      if (state.hasResult) {
        state.display = number;
        state.equation = number;
        state.hasResult = false;
      } else {
        if (state.display === '0' && number !== '.') {
          state.display = number;
          if (state.lastWasOperator) {
            state.equation += number;
          } else {
            state.equation = number;
          }
        } else if (!(number === '.' && state.display.includes('.'))) {
          if (state.display === '-0' && number !== '.') {
            state.display = '-' + number;
            state.equation = state.equation.slice(0, -1) + number;
          } else {
            state.display += number;
            state.equation += number;
          }
        }
      }
      state.lastWasOperator = false;
    },
    handleOperator: (state, action: PayloadAction<OperatorType>) => {
      const operator = action.payload;
      
      // Handle initial minus sign for negative numbers
      if (state.equation === '' && operator === '-') {
        state.display = '-0';
        state.equation = '-0';
        return;
      }
      
      if (state.equation === '' && operator !== '-') return;
      
      if (state.hasResult) {
        state.hasResult = false;
      }

      // Handle consecutive operators
      if (state.lastWasOperator) {
        // Allow minus after other operators for negative numbers
        if (operator === '-' && !state.equation.endsWith('- ')) {
          state.equation += operator + ' ';
          state.display = '-0';
        } else {
          // Replace last operator
          state.equation = state.equation.replace(/[\+\-\*\/]\s*[\-]?\s*$/, operator + ' ');
        }
      } else {
        state.equation += ' ' + operator + ' ';
        state.display = '0';
      }
      state.lastWasOperator = true;
    },
    resetCalculator: (state) => {
      state.display = '0';
      state.equation = '';
      state.hasResult = false;
      state.lastWasOperator = false;
    },
    handleBackspace: (state) => {
      if (state.hasResult || state.display === '0') return;

      if (state.display.length === 1) {
        state.display = '0';
        if (!state.lastWasOperator) {
          state.equation = '';
        }
      } else {
        state.display = state.display.slice(0, -1);
        if (!state.lastWasOperator) {
          state.equation = state.equation.slice(0, -1);
        }
      }
    },
    addToHistory: (state, action: PayloadAction<{ equation: string; result: string }>) => {
      const newHistoryItem: HistoryItem = {
        equation: action.payload.equation,
        result: action.payload.result,
        timestamp: Date.now(),
      };
      state.history = [newHistoryItem, ...state.history].slice(0, 10);
      saveHistory(state.history);
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.removeItem('calculatorHistory');
    },
    useHistoryItem: (state, action: PayloadAction<HistoryItem>) => {
      state.display = action.payload.result;
      state.equation = action.payload.result;
      state.hasResult = true;
      state.lastWasOperator = false;
    },
  },
});

export const {
  setDisplay,
  setEquation,
  setHasResult,
  setLastWasOperator,
  setShowModal,
  handleNumber,
  handleOperator,
  resetCalculator,
  handleBackspace,
  addToHistory,
  clearHistory,
  useHistoryItem,
} = calculatorSlice.actions;

export default calculatorSlice.reducer; 