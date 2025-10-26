import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSessionById, cancelSession } from '../../redux/features/sessionSlice';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const SessionDetails: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentSession: session, loading } = useAppSelector((state) => state.session);

  useEffect(() => {
    if (sessionId) {
      dispatch(getSessionById(sessionId));
    }
  }, [dispatch, sessionId]);

  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel this session?')) {
      await dispatch(cancelSession({ sessionId: sessionId! }));
      navigate('/sessions/my-sessions');
    }
  };

  const handleJoin = () => {
    if (session?.meetingLink) {
      window.open(session.meetingLink, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!session) {
    return (
      <Container>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Session not found
          </h2>
          <Button onClick={() => navigate('/sessions/my-sessions')}>
            Back to Sessions
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {session.title}
            </h1>
            <Badge variant={
              session.status === 'upcoming' ? 'info' :
              session.status === 'completed' ? 'success' : 'error'
            }>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </Badge>
          </div>
          {session.status === 'upcoming' && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancel}>
                Cancel Session
              </Button>
              {session.mode === 'online' && (
                <Button onClick={handleJoin}>
                  Join Session
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            <Card padding="lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Session Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(session.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {session.startTime} - {session.endTime} ({session.duration} min)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {session.mode === 'online' ? (
                    <Video className="w-5 h-5 text-gray-500" />
                  ) : (
                    <MapPin className="w-5 h-5 text-gray-500" />
                  )}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mode</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {session.mode === 'online' ? 'Online' : 'In-Person'}
                      {session.location && ` - ${session.location}`}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {session.notes && (
              <Card padding="lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Notes
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{session.notes}</p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card padding="lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Expert
              </h3>
              <div className="flex items-center gap-3">
                <Avatar
                  src={session.expert.avatar}
                  fallback={session.expert.name}
                  size="lg"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {session.expert.name}
                  </p>
                  <a
                    href={`/experts/${session.expert.name}`}
                    className="text-sm text-[#32b8c6] hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Cost
              </h3>
              <p className="text-3xl font-bold text-[#32b8c6]">
                {session.credits} credits
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SessionDetails;
