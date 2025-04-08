import { useState } from 'react';
import './whatsapp.css'; // Adjust the path as necessary
const WhatsAppForm = () => {
  const [email, setEmail] = useState('');
  const [projectDetails, setProjectDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format message with proper order and encoding
    const message = `Email: ${email}%0AProject Details: ${projectDetails}`;
    const whatsappUrl = `https://wa.me/+254729159585?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <form className="contact-form1" onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea 
        placeholder="Project details"
        value={projectDetails}
        onChange={(e) => setProjectDetails(e.target.value)}
        required
      />
      <button type="submit">Send via WhatsApp</button>
    </form>
  );
};

export default WhatsAppForm;