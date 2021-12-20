"use strict";

var frequency = "two weekly";
var nextNotification = frequency === "weekly" ? addWeeks(today, 1) : addWeeks(today, 2);
consolog.consolog();