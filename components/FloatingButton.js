import React from 'react';
import { FloatingAction } from "react-native-floating-action";

const FloatingActionButton = ({ onPressCreate, onPressTaskList, onPressTaskDetails }) => {
  const actions = [
    {
      text: "Create Task",
      name: "bt_create",
      icon: require("../assets/create_task_icon.png"),
      position: 1
    },
    {
      text: "Task List",
      name: "bt_task_list",
      icon: require("../assets/task_list_icon.png"),
      position: 2
    },
    {
      text: "Task Details",
      name: "bt_task_details",
      icon: require("../assets/task_details_icon.png"),
      position: 3
    }
  ];

  return (
    <FloatingAction
      actions={actions}
      onPressItem={(name) => {
        switch (name) {
          case 'bt_create':
            onPressCreate();
            break;
          case 'bt_task_list':
            onPressTaskList();
            break;
          case 'bt_task_details':
            onPressTaskDetails();
            break;
          default:
            break;
        }
      }}
    />
  );
};

export default FloatingActionButton;
