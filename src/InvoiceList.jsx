// InvoiceList.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function InvoiceList({ invoiceList, onEditInvoice, onDeleteInvoice,setInvoiceList }) {
  const handleEditChange = (index, field, value) => {
    setInvoiceList((prevList) => {

        const newValue = value | 0

        const updatedList = [...prevList]
        const tempList = [...prevList]

        updatedList[index] = { ...updatedList[index], [field]: value }
        tempList[index] = { ...updatedList[index], [field]: newValue }

        const editedRecord = updatedList[index]
        const tempRecord = tempList[index]

        const amount = parseFloat(tempRecord.price) * parseFloat(tempRecord.quantity)

        const newDiscount = (amount * parseFloat(tempRecord.discountPercentage) / 100).toFixed(2)
        const newTax = (amount * parseFloat(tempRecord.taxPercentage) / 100).toFixed(2)
        const newTotal = (amount - parseFloat(newDiscount) + parseFloat(newTax)).toFixed(2)

        updatedList[index] = {
            ...editedRecord,
            discount: newDiscount,
            tax: newTax,
            total: newTotal,
        }

        return updatedList
    })
  };

  const handleDeleteRecord = (index) => {
    onDeleteInvoice(index);
  };

  return (
    <div className='m-5 table-responsive-sm bg-light'>
      <h2>List of Invoices</h2>
      <table className='table table-primary table-hover table-stripped align-middle br-light'>
        <thead className='table-dark'>
          <tr>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount %</th>
            <th>Discount</th>
            <th>Tax %</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='table-group-divider'>
          {invoiceList.map((record, index) => (
            <tr key={index}>
              <td>
                <input
                  type="number"
                  value={record.quantity}
                  onChange={(e) => handleEditChange(index, 'quantity', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={record.price}
                  onChange={(e) => handleEditChange(index, 'price', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={record.discountPercentage}
                  onChange={(e) => handleEditChange(index, 'discountPercentage', e.target.value)}
                />
              </td>
              <td>{record.discount}</td>
              <td>
                <input
                  type="number"
                  value={record.taxPercentage}
                  onChange={(e) => handleEditChange(index, 'taxPercentage', e.target.value)}
                />
              </td>
              <td>{record.tax}</td>
              <td>{record.total}</td>
              <td>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => handleDeleteRecord(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;
