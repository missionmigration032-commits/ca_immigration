import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { verifyPaymentSession } from '../services/stripeService';
import { CheckCircle, Printer, ArrowLeft } from 'lucide-react';

export default function PaymentSuccess() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id') || queryParams.get('order_id');
  const paymentId = queryParams.get('payment_id');

  useEffect(() => {
    let isMounted = true;

    async function checkVerification() {
      if (!sessionId) {
        setLoading(false);
        setError('No active session identifier found in payment response.');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const result = await verifyPaymentSession(sessionId, token);

        if (isMounted) {
          if (result && result.verified) {
            setPaymentData(result.payment);
          } else {
            setError('Payment verification returned incomplete or unconfirmed status.');
          }
        }
      } catch (err) {
        console.error('Payment verification failed:', err);
        if (isMounted) {
          setError(err.message || 'Payment verification encountered an issue.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    checkVerification();

    return () => {
      isMounted = false;
    };
  }, [sessionId, paymentId]);

  return (
    <div className="gckey-page" style={{ backgroundColor: '#fff', minHeight: '80vh', fontFamily: 'Noto Sans, sans-serif' }}>
      <SEO
        title="Payment Receipt - Government of Canada"
        description="Official IRCC payment confirmation receipt for application processing."
        keywords="IRCC payment receipt, Canada immigration fee receipt"
      />

      <div className="container" style={{ paddingTop: '30px', paddingBottom: '60px', maxWidth: '750px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Verifying payment with Receiver General for Canada...</span>
            </div>
            <h3 style={{ marginTop: '20px', color: '#26374a' }}>Verifying Transaction...</h3>
            <p style={{ color: '#666' }}>Please do not close or refresh this window.</p>
          </div>
        ) : error ? (
          <div className="ca-card" style={{ padding: '30px', textAlign: 'center' }}>
            <h2 style={{ color: '#d9534f', marginTop: 0 }}>Payment Verification Status</h2>
            <p style={{ color: '#555', fontSize: '15px' }}>{error}</p>
            <div style={{ marginTop: '20px' }}>
              <Link to="/mycic/home" className="ca-btn ca-btn-primary">
                Return to MyCIC Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="ca-card" style={{ border: '2px solid #26374a', padding: '0', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#26374a', color: '#fff', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', color: '#fff', fontWeight: 'bold' }}>
                  Official Payment Receipt / Reçu de paiement
                </h2>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>Government of Canada / Gouvernement du Canada</div>
              </div>
              <CheckCircle size={36} color="#48bb78" />
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ backgroundColor: '#e6f4ea', border: '1px solid #ceead6', borderRadius: '4px', padding: '14px 18px', marginBottom: '24px', color: '#137333', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle size={20} />
                <span>Your payment has been successfully processed and recorded.</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px', fontSize: '14px' }}>
                <div>
                  <span style={{ color: '#666', display: 'block', fontSize: '12px', textTransform: 'uppercase' }}>Reference Number</span>
                  <strong style={{ fontSize: '16px', color: '#26374a' }}>{paymentData?.referenceNumber || sessionId}</strong>
                </div>
                <div>
                  <span style={{ color: '#666', display: 'block', fontSize: '12px', textTransform: 'uppercase' }}>Amount Paid</span>
                  <strong style={{ fontSize: '16px', color: '#137333' }}>${Number(paymentData?.amount || 100).toFixed(2)} {paymentData?.currency || 'CAD'}</strong>
                </div>
                <div>
                  <span style={{ color: '#666', display: 'block', fontSize: '12px', textTransform: 'uppercase' }}>Status</span>
                  <span className="ca-badge ca-badge-paid">PAID / PAYÉ</span>
                </div>
                <div>
                  <span style={{ color: '#666', display: 'block', fontSize: '12px', textTransform: 'uppercase' }}>Transaction Date</span>
                  <strong>{paymentData?.transactionDate ? new Date(paymentData.transactionDate).toLocaleString() : new Date().toLocaleDateString()}</strong>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', marginBottom: '24px', fontSize: '13px', color: '#555' }}>
                <p><strong>Issuing Office:</strong> {paymentData?.issuingOffice || 'Receiver General for Canada - IRCC Online Services'}</p>
                <p><strong>Description:</strong> {paymentData?.visaType || 'Immigration Application Processing Fee'}</p>
                <p style={{ margin: 0, fontStyle: 'italic' }}>Please print or save this confirmation for your official records.</p>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="ca-btn ca-btn-secondary"
                  onClick={() => window.print()}
                >
                  <Printer size={16} /> Print Receipt
                </button>
                <Link to="/mycic/home" className="ca-btn ca-btn-primary">
                  <ArrowLeft size={16} /> Continue to MyCIC Account
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
