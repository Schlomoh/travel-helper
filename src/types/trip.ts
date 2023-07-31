export interface Trip {
  message: string;
  estimatedTotalPrice: string;
  days: Days;
}

export interface Days {
  [day: string]: Activity[];
}

export interface Activity {
  estimatedPrice: string;
  activityName: string;
  specificLocation: string;
  plannedTime: string;
  description: string;
}
