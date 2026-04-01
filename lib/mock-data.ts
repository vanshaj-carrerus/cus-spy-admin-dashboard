export const mockStats = [
  { title: 'Total Working Hours', value: '168h 30m', trend: '+12%', trendType: 'positive' as const },
  { title: 'Number of Screenshots', value: '1,245', trend: '+5%', trendType: 'positive' as const },
  { title: 'Active Applications', value: '24', trend: '-2%', trendType: 'negative' as const },
  { title: 'Productivity Score', value: '85%', trend: '+8%', trendType: 'positive' as const },
];

export const activityData = [
  { name: 'Mon', hours: 8 },
  { name: 'Tue', hours: 7.5 },
  { name: 'Wed', hours: 9 },
  { name: 'Thu', hours: 8.5 },
  { name: 'Fri', hours: 7 },
  { name: 'Sat', hours: 4 },
  { name: 'Sun', hours: 0 },
];

export const appUsageData = [
  { name: 'VS Code', value: 45 },
  { name: 'Chrome', value: 30 },
  { name: 'Slack', value: 15 },
  { name: 'Terminal', value: 10 },
];

export const mockEmployees = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Employee', status: 'active', lastActive: '2 mins ago' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'active', lastActive: 'Online' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Employee', status: 'inactive', lastActive: '2 days ago' },
];

export const mockScreenshots = [
  { id: '1', user: 'John Doe', timestamp: '10:15 AM', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop' },
  { id: '2', user: 'Jane Smith', timestamp: '10:12 AM', imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop' },
  { id: '3', user: 'John Doe', timestamp: '10:05 AM', imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop' },
  { id: '4', user: 'Mike Johnson', timestamp: '09:55 AM', imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop' },
];
