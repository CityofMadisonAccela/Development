function workingDaysBetweenDates(rsstartDate, rsendDate) {if (rsendDate < rsstartDate)return 0;var dtStartDate = new Date(rsstartDate.getYear(),rsstartDate.getMonth()-1,rsstartDate.getDayOfMonth());var dtEndDate  = new Date(rsendDate.getYear(),rsendDate.getMonth()-1,rsendDate.getDayOfMonth());var millisecondsPerDay = 86400 * 1000; dtStartDate.setHours(0,0,0,1);  dtEndDate.setHours(23,59,59,999); var diff = dtEndDate - dtStartDate;     var days = Math.ceil(diff / millisecondsPerDay);var weeks = Math.floor(days / 7);var days = days - (weeks * 2);var startDay = dtStartDate.getDay();var endDay = dtEndDate.getDay();   if (startDay - endDay > 1)         days = days - 2;      if (startDay == 0 && endDay != 6)days = days - 1  if (endDay == 6 && startDay != 0)days = days - 1  logDebug("days " + days);return days;}