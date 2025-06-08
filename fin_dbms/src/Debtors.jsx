import React, { useState } from 'react';
import './Debtors.css';

const dummyDebtors = [
  {
    name: 'ABC Corp',
    contactPerson: 'John Doe',
    designation: 'Manager',
    contact: '+91-9876543210',
    mail: 'john@abccorp.com',
    telephone: '080-12345678',
    customerSince: '2018',
    badDebt: '₹15,000',
    receivables: '₹1,75,000',
  },
  {
    name: 'XYZ Pvt Ltd',
    contactPerson: 'Jane Smith',
    designation: 'Accounts Head',
    contact: '+91-9123456789',
    mail: 'jane@xyz.com',
    telephone: '022-99887766',
    customerSince: '2020',
    badDebt: '₹12,000',
    receivables: '₹1,43,000',
  },
];

const Debtors = () => {
  const [selectedDebtor, setSelectedDebtor] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const filteredDebtors = dummyDebtors.filter(d =>
    d.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="debtors-page">
      <div className="sidebar">Sidebar</div>
      <div className="main-content">
        <div className="header">
          <button className="back-btn" onClick={() => window.location.href = '/'}>&larr; Back to Dashboard</button>
          <h1 className="title">Debtors</h1>
        </div>

        <div className="search-select">
          <input
            type="text"
            placeholder="Select / Search Debtor"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setSearchInput('')}
          />
          {searchInput && (
            <div className="dropdown">
              {filteredDebtors.map((debtor, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => setSelectedDebtor(debtor)}
                >
                  {debtor.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="content-area">
          {selectedDebtor && (
            <div className="debtor-info">
              <h3>Debtor Info</h3>
              <p><strong>Name:</strong> {selectedDebtor.name}</p>
              <p><strong>Contact Person:</strong> {selectedDebtor.contactPerson}</p>
              <p><strong>Designation:</strong> {selectedDebtor.designation}</p>
              <p><strong>Contact:</strong> {selectedDebtor.contact}</p>
              <p><strong>Mail:</strong> {selectedDebtor.mail}</p>
              <p><strong>Telephone:</strong> {selectedDebtor.telephone}</p>
              <p><strong>Customer Since:</strong> {selectedDebtor.customerSince}</p>
              <p><strong>Bad Debt:</strong> {selectedDebtor.badDebt}</p>
              <p><strong>Total Receivables:</strong> {selectedDebtor.receivables}</p>
            </div>
          )}

          <div className="ledger-box">
            <h3>Ledger of Debtor</h3>
            <div className="ledger-content">
              {/* Ledger entries will go here */}
            </div>
            <button className="print-btn">Save/Print PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debtors;
