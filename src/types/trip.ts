export interface Trip {
  message: string;
  days: Days;
}

interface Days {
  [day: string]: Activity[];
}

interface Activity {
  activityName: string;
  specificLocation: string;
  plannedTime: string;
  description: string;
}
