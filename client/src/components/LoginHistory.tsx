import { useState, useEffect } from 'react';
import { Clock, MapPin, Monitor, Shield, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LoginRecord {
  id: string;
  timestamp: Date;
  ipAddress: string;
  location: string;
  device: string;
  browser: string;
  status: 'success' | 'failed' | 'suspicious';
}

export default function LoginHistory() {
  const [loginHistory, setLoginHistory] = useState<LoginRecord[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      ipAddress: '192.168.1.1',
      location: 'New York, USA',
      device: 'Windows PC',
      browser: 'Chrome 120',
      status: 'success'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      ipAddress: '10.0.0.1',
      location: 'London, UK',
      device: 'MacBook Pro',
      browser: 'Safari 17',
      status: 'success'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      ipAddress: '172.16.0.1',
      location: 'Unknown',
      device: 'Unknown',
      browser: 'Unknown',
      status: 'failed'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'suspicious': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <Shield className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      case 'suspicious': return <AlertTriangle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Card className="bg-black/50 border-purple-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Login History</h3>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          Secure Account
        </Badge>
      </div>

      <div className="space-y-4">
        {loginHistory.map((login) => (
          <div
            key={login.id}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(login.status)}`} />
                  <span className="text-white font-medium">
                    {login.status === 'success' ? 'Successful Login' : 
                     login.status === 'failed' ? 'Failed Attempt' : 'Suspicious Activity'}
                  </span>
                  {getStatusIcon(login.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{login.timestamp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{login.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Monitor className="w-3 h-3" />
                    <span>{login.device}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-xs">IP: {login.ipAddress}</span>
                  </div>
                </div>
              </div>
              
              {login.status === 'suspicious' && (
                <button className="text-red-400 hover:text-red-300 text-sm">
                  Report
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <div className="flex items-start gap-2">
          <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <p className="text-blue-300 font-medium text-sm">Security Tip</p>
            <p className="text-gray-400 text-xs mt-1">
              If you see any suspicious login attempts, enable 2FA immediately and change your password.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}