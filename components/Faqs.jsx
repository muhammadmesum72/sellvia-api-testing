'use client';  // Required if using Next.js 13 app directory

import { useEffect, useState } from 'react';
import crypto from 'crypto';  // Make sure your environment supports this or switch to using a Node.js server route

const FAQComponent = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Generate the token
    const generateToken = () => {
      const date = new Date();
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${date.getFullYear()}`;
      return crypto.createHash('sha256').update('FAQQ' + formattedDate).digest('hex');
    };

    const token = generateToken();
    const url = `https://sellvia.business/api/faq?${token}`;

    // Fetch FAQ data
    const fetchFAQs = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFaqs(data.data);
        console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []); // Empty array ensures this runs only once on component mount

  if (loading) {
    return <p>Loading FAQs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h2 className="faq-question">{faq.question}</h2>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .faq-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .faq-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        .faq-item {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .faq-question {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: #333;
        }

        .faq-answer {
          font-size: 1rem;
          color: #666;
        }

        @media (min-width: 768px) {
          .faq-list {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQComponent;
