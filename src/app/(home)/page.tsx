'use client';

import { useState, ChangeEvent } from 'react';
import './home.scss';

interface ResultType {
  result: string;
}

const MainPage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateText = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/generate?prompt=${encodeURIComponent(prompt)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: ResultType = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePromptChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  console.log(result);

  return (
    <div className="MainPage">
      {/* <CsvFileUploader /> */}
      <h1>대화내용 입력</h1>
      <textarea
        value={prompt}
        onChange={handlePromptChange}
        rows={40}
        cols={50}
        placeholder="Enter your prompt here..."
      />
      <button onClick={generateText} className="btn-gene" disabled={loading}>
        Generate
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        <h2>결과:</h2>
        <textarea value={result?.result || ''} rows={40} readOnly></textarea>
      </div>
    </div>
  );
};

export default MainPage;
