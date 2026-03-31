"use client";

import { useEffect, useState } from "react";

interface ReportData {
  _id: string;
  username: string;
  trackedTimeSeconds: number;
}

export default function Reports() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        console.log(result);
        if (result.success) {
          setReports(result.data);
        } else {
          setError(result.error || "Failed to fetch reports");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div style={styles.container}>
      {/* Adding inner style tag for animations/hovers that can't be inline */}
      <style dangerouslySetInnerHTML={{
        __html: `
                .reports-row:hover { background-color: rgba(255, 255, 255, 0.04); }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .spinner { animation: spin 1s linear infinite; }
            `}} />

      <div style={styles.header}>
        <h1 style={styles.title}>User Reports</h1>
        <p style={styles.subtitle}>Today's tracking activity and logged hours.</p>
      </div>

      {loading ? (
        <div style={styles.centerContent}>
          <div className="spinner" style={styles.spinner}></div>
          <p style={styles.textMuted}>Loading reports...</p>
        </div>
      ) : error ? (
        <div style={{ ...styles.centerContent, ...styles.errorBox }}>
          <p style={{ margin: 0 }}>Error: {error}</p>
        </div>
      ) : reports.length === 0 ? (
        <div style={styles.centerContent}>
          <p style={styles.textMuted}>No reports found for today.</p>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeadRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Active Time</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="reports-row" style={styles.tableRow}>
                  <td style={styles.td}>
                    <div style={styles.nameCell}>
                      <div style={styles.avatar}>
                        {report.username.charAt(0).toUpperCase()}
                      </div>
                      <span style={styles.userName}>{report.username}</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.timeBadge}>
                      {formatTime(report.trackedTimeSeconds)}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.dateBadge}>{currentDate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '30px',
    fontFamily: "'Inter', system-ui, sans-serif",
    color: '#f8fafc',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 800,
    margin: '0 0 8px 0',
    letterSpacing: '-1px',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#94a3b8',
    margin: 0,
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    textAlign: 'center',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(59, 130, 246, 0.2)',
    borderTopColor: '#3b82f6',
    borderRadius: '50%',
    marginBottom: '20px',
  },
  textMuted: {
    color: '#94a3b8',
    fontSize: '1.1rem',
  },
  errorBox: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '12px',
    color: '#fca5a5',
    padding: '30px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  tableWrapper: {
    background: 'rgba(30, 41, 59, 0.6)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  tableHeadRow: {
    background: 'rgba(15, 23, 42, 0.6)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  th: {
    padding: '20px 24px',
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#94a3b8',
  },
  tableRow: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'background-color 0.2s',
  },
  td: {
    padding: '16px 24px',
    verticalAlign: 'middle',
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    fontWeight: 600,
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
  },
  userName: {
    fontSize: '1.05rem',
    fontWeight: 600,
    color: '#f8fafc',
  },
  timeBadge: {
    display: 'inline-block',
    padding: '6px 14px',
    background: 'rgba(16, 185, 129, 0.1)',
    color: '#34d399',
    borderRadius: '20px',
    fontSize: '0.95rem',
    fontWeight: 600,
    border: '1px solid rgba(16, 185, 129, 0.2)',
  },
  dateBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#cbd5e1',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 500,
  }
};