export interface Trip {
  [day: string]: Day;
}

interface Day {
  activityName: string;
  specificLocation: string;
  plannedTime: string;
  description: string;
}
