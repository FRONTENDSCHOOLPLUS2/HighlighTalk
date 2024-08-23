import { BarLoader } from 'react-spinners';
import './_Spinner.scss';
export function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <h2>잠시만 기다려주세요.</h2>
        <BarLoader className="loader" color="#A6EAFF" />
      </div>
    </div>
  );
}
