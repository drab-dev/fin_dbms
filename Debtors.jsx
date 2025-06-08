import Sidebar from "./sideBar.jsx";
import './fin.css';
import { useState } from "react";
import { Link } from "react-router-dom";

function Debtors() {
    const debtorData = [
        {
            id: 1,
            name: "John Doe",
            date: "2025-06-01",
            description: "Loan given",
            amount: 2000,
            status: "Pending",
            contact: "john@example.com"
        },
        {
            id: 2,
            name: "Jane Smith",
            date: "2025-06-03",
            description: "Advance payment",
            amount: 1500,
            status: "Partially Paid",
            contact: "jane@example.com"
        },
        {
            id: 3,
            name: "Acme Corp",
            date: "2025-06-05",
            description: "Invoice #123",
            amount: 5000,
            status: "Paid",
            contact: "acme@corp.com"
        }
    ];

    // Simulated transaction data for demo purposes
    const transactionData = [
        { debtorId: 1, year: 2022, amount: 1000, type: 'debit', badDebt: 0 },
        { debtorId: 1, year: 2023, amount: 1200, type: 'debit', badDebt: 200 },
        { debtorId: 2, year: 2024, amount: 1500, type: 'debit', badDebt: 0 },
        { debtorId: 3, year: 2025, amount: 5000, type: 'debit', badDebt: 0 },
        { debtorId: 2, year: 2023, amount: 500, type: 'debit', badDebt: 100 },
        { debtorId: 3, year: 2024, amount: 2000, type: 'debit', badDebt: 0 },
    ];

    // Helper to get year of first transaction
    function getFirstTransactionYear(debtorId) {
        const txs = transactionData.filter(t => t.debtorId === debtorId);
        if (txs.length === 0) return 'N/A';
        return Math.min(...txs.map(t => t.year));
    }
    // Helper to get bad debt
    function getBadDebt(debtorId) {
        const txs = transactionData.filter(t => t.debtorId === debtorId);
        return txs.reduce((sum, t) => sum + (t.badDebt || 0), 0);
    }
    // Helper to get total receivables
    function getTotalReceivables(debtorId) {
        const txs = transactionData.filter(t => t.debtorId === debtorId);
        return txs.reduce((sum, t) => sum + (t.amount || 0), 0);
    }

    const [results, setResults] = useState([]);
    const [selectedDebtor, setSelectedDebtor] = useState(null);
    // Add state for animation
    const [showDetails, setShowDetails] = useState(false);

    const updateResults = (e) => {
        const x = e.target.value;
        if (x === "") {
            setResults([]);
        } else {
            const lowerX = x.toLowerCase();
            const startsWith = [];
            const includesButNotStart = [];
            for (const debtor of debtorData) {
                const nameLower = debtor.name.toLowerCase();
                if (nameLower.startsWith(lowerX)) {
                    startsWith.push(debtor);
                } else if (nameLower.includes(lowerX)) {
                    includesButNotStart.push(debtor);
                }
            }
            setResults([...startsWith, ...includesButNotStart]);
        }
    };

    const selectDebtor = (debtor) => {
        setSelectedDebtor(debtor);
        setShowDetails(false);
        // Trigger animation after a short delay to allow re-render
        setTimeout(() => setShowDetails(true), 10);
    };

    // Sign out logic (same as in Greeting component)
    const handleSignOut = () => {
        localStorage.removeItem('fin_user');
        window.location.replace('login.html');
    };

    return (
        <>
            <div className="ledgersBox">
                <Sidebar />
                <div style={{ width: "100%" }}>
                    <div className="ledgersHeroSection">
                        <header className="ledgersHeroSectionHeader">
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <button style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#333',
                                    fontSize: '1.1em',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: 0,
                                    fontFamily: 'inherit',
                                    fontWeight: 500
                                }}>
                                    ← Back to Dashboard
                                </button>
                            </Link>
                            <h1>Debtors</h1>
                        </header>
                        <main>
                            <div>
                                <div className="ledgerSearchBox">
                                    <input type="text" placeholder="Search Debtors" onChange={updateResults} />
                                </div>
                                <div className="ledgerSelectionContainer" style={{ visibility: results.length > 0 ? "visible" : "hidden" }} >
                                    <div className="ledgerResults">
                                        {
                                            results.map((debtor) => (
                                                <div className="ledgerCard" key={debtor.id} onClick={() => selectDebtor(debtor)}>
                                                    <h3>{debtor.name}</h3>
                                                    <p>{debtor.amount}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="ledgerDisplay">
                                <header className="ledgerDisplayHeader">
                                    <h2>{selectedDebtor ? selectedDebtor.name : "No Debtor Selected"}</h2>
                                </header>
                                {selectedDebtor ? (
                                    <div className={`ledgerDetails pop3d${showDetails ? ' show' : ''}`}>
                                        <div>
                                            <p>Name/Company name: {selectedDebtor.name}</p>
                                            <p>Person Of Contact: {selectedDebtor.name}</p>
                                            <p>Designation: {selectedDebtor.designation || 'N/A'}</p>
                                            <p>Contact: {selectedDebtor.contact}</p>
                                            <p>Mail: {selectedDebtor.contact}</p>
                                            <p>Telephone: {selectedDebtor.telephone || 'N/A'}</p>
                                            <p>Customer Since: {getFirstTransactionYear(selectedDebtor.id)}</p>
                                            <p>Bad Debt: {getBadDebt(selectedDebtor.id)}</p>
                                            <p>Total receivables: {getTotalReceivables(selectedDebtor.id)}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Please select a debtor to view details.</p>
                                )}
                            </div>
                        </main>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "auto" }}>
                        <div></div>
                        <button className="savetopdfBtn" style={{ opacity: selectedDebtor ? "1" : "0" }}>
                            Save to PDF
                        </button>
                    </div>
                    {/* Sign out button in the same position as Greeting */}
                    {/* Removed signout button, now handled by sidebar */}
                </div>
            </div>
        </>
    );
}

export default Debtors;
