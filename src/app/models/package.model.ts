export interface Package {
  package_id: string;

  package_name: string;
  description: string;

  total_sessions: number;
  remaining_sessions: number;

  price: number;

  start_date: string;
  expire_date: string;

  status: 'ACTIVE' | 'EXPIRED' | 'USED_UP';

  created_at: string;
  updated_at: string;
}
