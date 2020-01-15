export const handleFileSelect = evt => {
  var file = evt.target.files[0];
  if (file.type !== "application/json") {
    return "error";
  }
  var reader = new FileReader();
  reader.onload = (() => {
    return e => {
      const oldGroupsArr = JSON.parse(e.target.result).faculties[0].groups;
      const newGroupsArr = [];
      for (let oldGroup = 0; oldGroup < oldGroupsArr.length; oldGroup++) {
        newGroupsArr[oldGroup] = { name: oldGroupsArr[oldGroup].name };
        newGroupsArr[oldGroup].timetable = neededGroupTimetable(
          oldGroupsArr,
          oldGroupsArr[0].name
        );
      }
      console.log(newGroupsArr);
    };
  })();
  reader.readAsText(file);
};
const timeTableDayFilter = (groupDayItem, selectedDay) => {
  const dayFromJSON = new Date(
    groupDayItem.date
      .split(".")
      .reverse()
      .join("-")
  );
  const dayFromJSONOfTwoWeek =
    Math.floor(dayFromJSON.getTime() / 86400000 + 3) % 14;
  const selectedDayOfTwoWeek = Math.floor(selectedDay / 86400000 + 3) % 14;
  if (dayFromJSONOfTwoWeek === selectedDayOfTwoWeek) {
    return "true";
  }
};

const neededGroupTimetable = (allGroupsTimetable, selectedGroups) => {
  const selectedGroupsArr = [];
  selectedGroupsArr[0] = selectedGroups;
  selectedGroupsArr[1] = selectedGroups.slice(0, -2);

  const neededGroups = [...allGroupsTimetable].filter(
    selectGroupItem =>
      selectGroupItem.name === selectedGroupsArr[0] ||
      selectGroupItem.name === selectedGroupsArr[1]
  );
  // получаем выбранную группу и подгруппу из полного расписания
  let daysLength = 14;
  const fullNeededGroupTimetableData = [];

  for (let i = 0; i < daysLength; i++) {
    let neededGroupTimetableData = [];
    neededGroups.forEach((neededGroupItem, index) => {
      const groupAndDayItem = neededGroupItem.lessons.filter(groupDayItem =>
        timeTableDayFilter(groupDayItem, 86400000 * 11 + 86400000 * i)
      );
      // получаем расписание на выбранный день у группы и подгруппы
      groupAndDayItem.forEach(neededGroupLessen => {
        neededGroupTimetableData.push(neededGroupLessen);
      });
    });

    neededGroupTimetableData.sort((a, b) => a.time.start > b.time.start);
    // сортируем нужное расписание по времени начала пары (в формате строки)
    fullNeededGroupTimetableData.push(neededGroupTimetableData);
  }
  return fullNeededGroupTimetableData;
};
