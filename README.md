# To-Do List App


A simple and efficient To-Do List application built using **HTML**, **CSS**, and **JavaScript**.  
It allows users to manage tasks with features such as adding, editing, deleting, marking tasks as complete, and automatic saving using localStorage.


## Overview


The To-Do List App provides a clean interface for organizing daily tasks.  
Smooth notifications appear for each action, and all tasks remain saved even after refreshing or reopening the page.



## Features

### Add Tasks
Users can add tasks through the input field using the button or the Enter key.

### Edit Tasks
Clicking the edit option loads the selected task into the input field for easy modification.

### Delete Tasks
Tasks can be removed instantly using the delete option.

### Mark as Complete
Each task includes a checkbox to toggle between completed and incomplete.  
Completed tasks show a line-through style.

### Duplicate Task Prevention
The app prevents adding the same task more than once and displays a notification if a duplicate is detected.


## Notifications

The app displays smooth, toast-style notifications for:
- Adding tasks  
- Editing tasks  
- Deleting tasks  
- Marking tasks complete or incomplete  
- Empty task input  
- Duplicate tasks  


## Data Persistence

All tasks are saved using the **LocalStorage API**.  
When the app is opened, tasks are automatically restored along with their completion status.

## Technical Details

### Unique Identifiers
Each task uses `crypto.randomUUID()` for accurate checkbox–label pairing.

### Technologies Used
- HTML5  
- CSS3  
- JavaScript (ES6+)  
- LocalStorage API  

---
