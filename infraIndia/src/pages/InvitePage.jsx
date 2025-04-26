import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InvitePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [inviteDetails, setInviteDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = searchParams.get('token');

  // Fetch invite details when the component loads
  useEffect(() => {
    const fetchInviteDetails = async () => {
      if (!token) {
        setMessage('Invalid invitation link');
        setStatus('error');
        setLoading(false);
        return;
      }
      
      try {
        // Optional: Add an endpoint to get invite details
        // This is not required but would improve user experience
        // const res = await axios.get(`http://localhost:5000/api/invites/details/${token}`);
        // setInviteDetails(res.data);
        setLoading(false);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Invalid or expired invitation');
        setStatus('error');
        setLoading(false);
      }
    };
    
    fetchInviteDetails();
  }, [token]);

  const handleResponse = async (responseStatus) => {
    setStatus('loading');
    try {
      const res = await axios.post('http://localhost:5000/api/invites/respond', {
        token,
        status: responseStatus,
      });

      setMessage(res.data.message);
      setStatus('done');

      if (responseStatus === 'Accepted') {
        // Wait 3 seconds, then redirect to login
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
      setStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <p className="text-xl">Loading invitation details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Project Manager Invitation</h2>
        
        {status === 'error' ? (
          <div className="text-red-500 text-center mb-4">{message}</div>
        ) : status === 'done' ? (
          <div className="text-green-600 text-center mb-4">
            {message}
            {status === 'done' && <div className="mt-2">Redirecting to login...</div>}
          </div>
        ) : (
          <>
            <p className="mb-6 text-gray-700 text-center">
              You've been invited to join as a Project Manager{inviteDetails?.projectName ? ` for project: ${inviteDetails.projectName}` : ''}. 
              Would you like to accept or reject this invitation?
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleResponse('Accepted')}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-200"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Processing...' : 'Accept'}
              </button>
              <button
                onClick={() => handleResponse('Rejected')}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Processing...' : 'Reject'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InvitePage