(function() {

    // Set starting Values
    let hours;
    let dueDate;
    let numDaysRaw;
    let numDaysNoWeekends;
    let hoursPerDay;
    let includeSafety = true;
    let includeWeekends = false;
    let safetyDays = 0;

    // Set DOM variables
    const domTime = document.querySelector(".time-input");
    const domDate = document.querySelector(".date-input");
    const domTotal = document.querySelector("#total");
    const domSafetyCheck = document.querySelector(".safety-check");
    const domSafetyWrapper = document.querySelector(".safety-wrapper");
    const domSafetyTime = document.querySelector(".safety-time");
    const domWeekendCheck = document.querySelector(".weekend-check");

    // Set third party variables
    const {differenceInCalendarDays, eachDay, isWeekend, addDays} = dateFns;
    const todaysDate = new Date();
    const tomorrowsDate = addDays(todaysDate, 1);
    const minDate = tomorrowsDate.toISOString().substring(0,10);
    domDate.setAttribute("min", minDate);
    domDate.setAttribute("value", minDate);

    // Set up DOM interactions
    domSafetyCheck.addEventListener("change", () => {
        includeSafety = !includeSafety;
        domSafetyWrapper.classList.toggle("display-none");
        domSafetyTime.value = 0;
        safetyDays = 0;
        updateFields();
    })

    domWeekendCheck.addEventListener("change", () => {
        includeWeekends = !includeWeekends;
        updateFields();
    })

    domTime.addEventListener("input", () => {
        updateFields()
    })

    domDate.addEventListener("change", () => {
        updateFields();
    })

    domSafetyTime.addEventListener("input", () => {
        safetyDays = domSafetyTime.value;
        updateFields();
    })

    // Core functionality 
    function updateFields() {
        hours = domTime.value;
        dueDate = domDate.value;
        if(hours !== undefined && dueDate !== undefined) {
            calculateTime(dueDate, todaysDate, hours);
            const lowNumbers = [`Smooth sailing! ⛵⛵ Only ${hoursPerDay} hours per day required.`, 
                                `Easy peasy, just ${hoursPerDay} hours each day. 🎉🎉`, 
                                `You're on fire! 🔥🔥🔥 Just ${hoursPerDay} hours per day.`,
                                `Nice one. Just ${hoursPerDay} hours each day for this project. 💯💯`,
                                `😎 ${hoursPerDay} hours each day. That's all.`,
                                `Nice. Only ${hoursPerDay} hours needed each day. Might as well finish work early. 👌👌`
                                ];
            
            const medNumbers = [`Totally achievable. 🦕🦕 Put in ${hoursPerDay} hours each day and you're there!`,
                                `Keep up the good work. Just ${hoursPerDay} hours each day to deliver this project on time. 💪💪`,
                                `🤙🤙 Keep at it, ${hoursPerDay} hours each day isn't too bad at all.`,
                                `😐 ${hoursPerDay} hours each day. Ok. 😐`,
                                `You're going to have to hustle 💰💰, but if anyone can do it YOU can 🙌🙌. That's ${hoursPerDay} hours each day.`,
                                `${hoursPerDay} hours per day. Hey, it could be worse. 💁‍💁‍`
                                ]
            
            const highNumbers = [`${hoursPerDay} hours each day? Good luck. 🤞🏻🤞🏻`,
                                `🐶🔥 Everything is fine. ${hoursPerDay} hours each day.`,
                                `☕☕ Drink up, you're going to need it. That's ${hoursPerDay} hours each day to get this project over the line on time.`,
                                `Congrats, you got the rare eggplant 🍆🍆. Also have fun with that ${hoursPerDay} hours each day you'll need to spend on the project 😅😅`,
                                `How did it come to this? 🤦‍🤦‍ ${hoursPerDay} hours each day.`,
                                `☠️☠️⚰️⚰️ ${hoursPerDay} hours each day.`
                                ]
            const lowArrayItem = lowNumbers[Math.floor(Math.random() * lowNumbers.length)];
            const medArrayItem = medNumbers[Math.floor(Math.random() * medNumbers.length)];
            const highArrayItem = highNumbers[Math.floor(Math.random() * highNumbers.length)];
            
            if(hoursPerDay > 0 && hoursPerDay <= 3) {
                domTotal.innerHTML = lowArrayItem;
            } else if (hoursPerDay > 3 && hoursPerDay <= 5) {
                domTotal.innerHTML = medArrayItem;
            } else if (hoursPerDay > 5) {
                domTotal.innerHTML = highArrayItem;
            }
        }
    }

    function calculateTime(endDate, startDate, numHours) {
        const allDays = eachDay(startDate, endDate);
        numDaysRaw = allDays.length;

        if (includeWeekends === false) {
            const noWeekends = allDays.filter(function(date){
                return isWeekend(date) == false
            });
            numDaysNoWeekends = noWeekends.length;
                if(safetyDays !== 0) {
                    numDaysNoWeekends = noWeekends.length - safetyDays;
                }
            hoursPerDay = (hours / numDaysNoWeekends).toFixed(1);
        } else {
            if(safetyDays !== 0) {
                numDaysRaw = numDaysRaw - safetyDays;
            }
            hoursPerDay = (hours / numDaysRaw).toFixed(1);
        }
    }
})();