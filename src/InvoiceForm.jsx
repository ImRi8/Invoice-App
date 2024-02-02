import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function InvoiceForm({ onAddInvoice }) {
  const [formData, setFormData] = useState({
    quantity: '',
    price: '',
    discountPercentage: '',
    discount: '',
    taxPercentage: '',
    tax: '',
    total: '',
  });

  const handleChange = (event) => {
    const { id, value } = event.target

    const newValue = value | 0
    // Calculates new values
    const newFormData = { ...formData, [id]: value }
    const tempFormData = { ...formData, [id]: newValue }

    const amount = parseFloat(tempFormData.price) * parseFloat(tempFormData.quantity)

    const newDiscount = (amount * parseFloat(tempFormData.discountPercentage) / 100).toFixed(2)
    const newTax = (amount * parseFloat(tempFormData.taxPercentage) / 100).toFixed(2)
    const newTotal = (amount - parseFloat(newDiscount) + parseFloat(newTax)).toFixed(2)

    // Updates the state
    setFormData({
        ...newFormData,
        discount: newDiscount,
        tax: newTax,
        total: newTotal
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    const newRecord = { ...formData };

    // Add the new record to the list
    onAddInvoice(newRecord);

    // Clear the form fields after submission
    setFormData({
      quantity: '',
      price: '',
      discountPercentage: '',
      discount: '',
      taxPercentage: '',
      tax: '',
      total: '',
    });
  };

  const inputFields = [
    { name: 'quantity', label: 'Quantity', value: formData.quantity },
    { name: 'price', label: 'Price', value: formData.price },
    { name: 'discountPercentage', label: 'Discount %', value: formData.discountPercentage },
    { name: 'discount', label: 'Discount', value: formData.discount },
    { name: 'taxPercentage', label: 'Tax %', value: formData.taxPercentage },
    { name: 'tax', label: 'Tax', value: formData.tax },
    { name: 'total', label: 'Total', value: formData.total },
  ];

  return (
    <form className='row g-12 p-5 bg-light mt-5 ' onSubmit={handleSubmit}>
    <h1>
      <center>
        Invoice Form
      </center>
    </h1>
      {inputFields.map(field => {
          return (
              <div key={field.name} className='col-lg-3 col-md-4 col-sm-6'>
                  <label htmlFor={field.name} className='form-label'>
                      {field.label}
                  </label>
                  <input
                      id={field.name}
                      className='form-control'
                      type='number'
                      value={field.value}
                      onChange={handleChange}
                  />
              </div>
          )
      })}

      <div className='col-12 mt-5 mb-3'>
      <center>
          <button className="btn btn-success" type="submit">Create Invoice</button>
          </center>
      </div>
    </form>
  );
}

export default InvoiceForm;
