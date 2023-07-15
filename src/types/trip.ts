export interface Trip {
  message: string;
  days: Days;
}

export interface Days {
  [day: string]: Activity[];
}

export interface Activity {
  activityName: string;
  specificLocation: string;
  plannedTime: string;
  description: string;
}
