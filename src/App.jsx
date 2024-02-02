import React, { useState } from 'react';
import InvoiceForm from './InvoiceForm';
import InvoiceList from './InvoiceList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [invoiceList, setInvoiceList] = useState([]);

  const handleAddInvoice = (newRecord) => {
    setInvoiceList((prevList) => [...prevList, newRecord]);
  };

  const handleEditInvoice = (index, updatedRecord) => {
    setInvoiceList((prevList) => {
      const newList = [...prevList];
      newList[index] = updatedRecord;
      return newList;
    });
  };

  const handleDeleteInvoice = (index) => {
    setInvoiceList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <>
      <InvoiceForm onAddInvoice={handleAddInvoice} />
      <InvoiceList
        invoiceList={invoiceList}
        onEditInvoice={handleEditInvoice}
        setInvoiceList={setInvoiceList}
        onDeleteInvoice={handleDeleteInvoice}
      />
    </>
  );
}

export default App;
