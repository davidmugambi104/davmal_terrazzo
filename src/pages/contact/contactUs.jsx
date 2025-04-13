import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';
import Navbar from '../Navbar';
import Footer from '../footer.jsx';

const ContactForm = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);


  const whatsappNumber = '+254729159585'; // International format

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    if (activeTab === 'email' && !validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (activeTab === 'whatsapp' && !validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (activeTab === 'email') {
        // EmailJS integration (replace with your credentials)
        await emailjs.send(
          'service_h5cdmdt',  // From EmailJS dashboard
          'template_dt3ezvd', // From EmailJS dashboard
          formData,
          'WP_aXQaHRiZeJRalh'      // From EmailJS account
        );
        
        setSuccess('Email sent successfully!');
      } else {
        // WhatsApp integration
        const message = encodeURIComponent(
          `Name: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        setSuccess('WhatsApp message prepared!');
      }
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setErrors({ general: 'Error sending message. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <React.Fragment>
    <Navbar/>
    
    <div className="contact-container">
      <h1 className="typing-header">Contact Us</h1>
      <div className="tab-switcher">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          Email Us
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'whatsapp' ? 'active' : ''}`}
          onClick={() => setActiveTab('whatsapp')}
        >
          WhatsApp
        </button>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {activeTab === 'email' ? (
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        ) : (
          <div className="form-group">
            <label>Phone (with country code):</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={errors.phone ? 'error' : ''}
              placeholder='+254712345678'
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        )}

        <div className="form-group">
          <label>Message:</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={errors.message ? 'error' : ''}
            rows="5"
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        {errors.general && <div className="error-message general">{errors.general}</div>}
        {success && <div className="success-message">{success}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : activeTab === 'email' ? (
            'Send Email'
          ) : (
            'Open WhatsApp'
          )}
        </button>
      </form>
    
    </div>
    <Footer />
    </React.Fragment>
  );
};

export default ContactForm;