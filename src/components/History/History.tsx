import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearHistory, useHistoryItem } from '../../store/calculatorSlice';
import './History.css';

export const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(state => state.calculator.history);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (history.length === 0) {
    return (
      <div className="history-container">
        <div className="history-header">
          <h3>Calculation History</h3>
          <button className="history-clear-btn" disabled>
            Clear
          </button>
        </div>
        <div className="history-empty">History is empty</div>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h3>Calculation History</h3>
        <button 
          className="history-clear-btn"
          onClick={() => dispatch(clearHistory())}
        >
          Clear
        </button>
      </div>
      <div className="history-list">
        {history.map((item) => (
          <div 
            key={item.timestamp} 
            className="history-item"
            onClick={() => dispatch(useHistoryItem(item))}
          >
            <div className="history-equation">{item.equation} = {item.result}</div>
            <div className="history-timestamp">{formatDate(item.timestamp)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}; 