import { ClipLoader } from 'react-spinners';
import './_Spinner.scss';
export function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <h3>잠시만 기다려주세요.</h3>
        <ClipLoader className="loader" color="#A6EAFF" />
      </div>
    </div>
  );
}
