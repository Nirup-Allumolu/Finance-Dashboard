# Activity Selection Problem Using Greedy Algorithm
# Define the number of activities
num_activities = 6  # This variable stores the total number of activities (6 in this case).

# Create start and finish times for 6 activities.
# Format: (start_time, finish_time).
activities = [
    (1, 2),  # Activity 1: Starts at time 1, finishes at time 2
    (3, 4),  # Activity 2: Starts at time 3, finishes at time 4
    (0, 6),  # Activity 3: Starts at time 0, finishes at time 6
    (5, 7),  # Activity 4: Starts at time 5, finishes at time 7
    (8, 9),  # Activity 5: Starts at time 8, finishes at time 9
    (5, 9)   # Activity 6: Starts at time 5, finishes at time 9
]
# Function to select the maximum number of non-overlapping activities
def activity_selection(activities):
    # Sort activities based on their finish times (ascending order).
    # This ensures we always pick the activity that finishes first.
    sorted_activities = sorted(activities, key=lambda x: x[1])
    # The `sorted()` function sorts the list of activities by their finish time.
    # `key=lambda x: x[1]` specifies that sorting should be based on the second element.

    # Initialize the list to store selected activities
    selected_activities = []  # This list will store the activities selected by the greedy algorithm.

    # The first activity is always selected
    selected_activities.append(sorted_activities[0])  # Add the first activity to the selected list.
    last_finish_time = sorted_activities[0][1]  # Store the finish time of the last selected activity.

    # Iterate through the remaining activities
    for i in range(1, len(sorted_activities)):  # Loop through the remaining activities.
        # If the current activity's start time is greater than or equal to.
        # The finish time of the last selected activity, select it
        if sorted_activities[i][0] >= last_finish_time:
            # Check if the current activity's start time does not overlap with the last selected activity.
            selected_activities.append(sorted_activities[i])  # If no overlap, add the current activity to the selected list.
            last_finish_time = sorted_activities[i][1]  # Update the finish time of the last selected activity.

    return selected_activities  # Return the list of selected non-overlapping activities.

# Call the function and get the selected activities
selected = activity_selection(activities)  # Call the `activity_selection` function with the list of activities.

# Print the selected activities
print("Selected Activities (start, finish):")  # Print a header for the output.
for activity in selected:  # Loop through the selected activities.
    print(activity)  # Print each selected activity in the format (start_time, finish_time).