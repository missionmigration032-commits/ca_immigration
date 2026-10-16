import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function PaymentCancel() {
  return (
    <div className="gckey-page" style={{ backgroundColor: '#fff', minHeight: '80vh', fontFamily: 'Noto Sans, sans-serif' }}>
      <SEO
        title="Payment Cancelled - Government of Canada"
        description="Payment process was cancelled. You can retry paying your IRCC fees at any time."
        keywords="IRCC payment cancelled, Canada visa payment"
      />

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px', maxWidth: '600px' }}>
        <div className="ca-card" style={{ padding: '30px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
            <AlertCircle size={48} color="#d9534f" />
          </div>
          <h2 style={{ color: '#26374a', marginTop: 0 }}>Payment Process Cancelled</h2>
          <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.6' }}>
            Your transaction was not completed. No charges have been processed on your card. You can return to your MyCIC account to review your application and try again whenever you are ready.
          </p>
          <div style={{ marginTop: '25px' }}>
            <Link to="/mycic/home" className="ca-btn ca-btn-primary">
              <ArrowLeft size={16} /> Return to MyCIC Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
