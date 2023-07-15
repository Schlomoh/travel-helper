import { Paper, Typography, styled } from "@mui/material";
import { Days } from "../../types/trip";
import ActivityDetails from "./Activity";

const DayWrapper = styled(Paper)`
  padding: 0.75rem;
  margin: 1rem -0.5rem 0;
  border-radius: 0.75rem;
  /* background-color: inherit; */
`;

const DayHeading = styled(Typography)`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const TripDetails = (days: Days | undefined) => {
  return days
    ? Object.keys(days).map((dayIndex) => {
        const day = days[dayIndex];

        return (
          <DayWrapper key={dayIndex} variant="outlined">
            <DayHeading variant="h5">{dayIndex}</DayHeading>
            {day.map((activity) => (
              <ActivityDetails key={activity.activityName} {...activity} />
            ))}
          </DayWrapper>
        );
      })
    : null;
};

export default TripDetails;
