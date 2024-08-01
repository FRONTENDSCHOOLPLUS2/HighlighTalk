// import React, { useState, ChangeEvent } from 'react';
// import Papa from 'papaparse';

// interface CsvRow {
//   [key: string]: string;
// }

// const CsvFileUploader: React.FC = () => {
//   const [csvData, setCsvData] = useState<CsvRow[]>([]);
//   const [csvContent, setCsvContent] = useState<string>('');
//   const [startDate, setStartDate] = useState<string>('');
//   const [endDate, setEndDate] = useState<string>('');

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       Papa.parse(file, {
//         complete: (result) => {
//           setCsvData(result.data as CsvRow[]);
//           setCsvContent(JSON.stringify(result.data, null, 2));
//         },
//         header: true,
//         skipEmptyLines: true,
//       });
//     }
//   };

//   const handleFilterData = () => {
//     if (!startDate || !endDate) {
//       alert('Please select both start and end dates.');
//       return;
//     }

//     const filteredData = csvData.filter((row) => {
//       const date = new Date(row['date']);
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       return date >= start && date <= end;
//     });

//     setCsvContent(JSON.stringify(filteredData, null, 2));
//   };

//   return (
//     <>
//       <div>
//         <input type="file" accept=".csv" onChange={handleFileChange} />
//         <textarea
//           value={csvContent}
//           readOnly
//           rows={20}
//           cols={80}
//           style={{ marginTop: '10px', width: '100%' }}
//         />
//       </div>
//       <div style={{ marginTop: '10px' }}>
//         <label>
//           Start Date:
//           <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//         </label>
//         <label style={{ marginLeft: '10px' }}>
//           End Date:
//           <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//         </label>
//         <button style={{ padding: '1rem', marginTop: '10px' }} onClick={handleFilterData}>
//           Filter Data
//         </button>
//       </div>
//     </>
//   );
// };

// export default CsvFileUploader;
