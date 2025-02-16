import math
import csv

class DateConstraint:
    CLOSE_TEXT = "Currently closed"
    OPEN_TEXT = "24 hours"
    VARIABLE_TEXT = "Variable hours"
    DAYLIGHT_TEXT = "Daylight hours"
    VENUE_TEXT = "Venue hours"
    
    DAYS = {
        'Mon' : 0,
        'Tue' : 1,
        'Wed' : 2,
        'Thu' : 3,
        'Fri' : 4,
        'Sat' : 5,
        'Sun' : 6
    }

    MONTHS = {
        'Jan' : 0,
        'Feb' : 1,
        'Mar' : 2,
        'Apr' : 3,
        'May' : 4,
        'Jun' : 5,
        'Jul' : 6,
        'Aug' : 7,
        'Sep' : 8,
        'Oct' : 9,
        'Nov' : 10,
        'Dec' : 11
    }

    @staticmethod
    def timeToMilitary(time):
        meridiem = time[-2:]
        baseTime = time[:-2]

        baseTime = list(map(int, baseTime.split(':')))
        hour = baseTime[0] if len(baseTime) == 1 else baseTime[0] + baseTime[1] / 60

        return hour + (12 if meridiem == 'pm' else 0)
    
    def isMonthValid(month, monthConstraint):
        monthConstraint = list(map(lambda x: DateConstraint.MONTHS[x], monthConstraint.split('-')))
        return month == monthConstraint if len(monthConstraint) == 1 else (
            month >= monthConstraint[0] and month <= monthConstraint[1] if monthConstraint[1] > monthConstraint[0] else 
            month >= monthConstraint[0] or month <= monthConstraint[1]
        )
    
    def isDayValid(day, dayConstraint):
        print(day)
        print(dayConstraint)
        dayConstraint = list(map(lambda x: DateConstraint.DAYS[x], dayConstraint.split('-')))
        print(dayConstraint)
        return day == dayConstraint[0] if len(dayConstraint) == 1 else (
            day >= dayConstraint[0] and day <= dayConstraint[1] if dayConstraint[1] > dayConstraint[0] else
            day >= dayConstraint[0] or day <= dayConstraint[1]
        )

    @staticmethod
    def isTimeValid(time, timeConstraint):
        timeConstraint = list(map(DateConstraint.timeToMilitary, timeConstraint.split('-')))
        return time == timeConstraint[0] if len(timeConstraint) == 1 else (
            time >= timeConstraint[0] and time <= timeConstraint[1] if timeConstraint[1] > timeConstraint[0] else
            time >= timeConstraint[0] or time <= timeConstraint[1]
        )
    
    def isMonthConstraint(constraint):
        constraint = constraint.split('-')
        return constraint[0] in DateConstraint.MONTHS
    
    def isDayConstraint(constraint):
        constraint = constraint.split('-')
        return constraint[0] in DateConstraint.DAYS
    
    def isDateTimeValid(month, day, hour, dateTimeConstraint):
        if dateTimeConstraint == DateConstraint.CLOSE_TEXT: return False
        assert dateTimeConstraint[:6] == 'OPEN: '
        dateTimeConstraint = dateTimeConstraint[6:]

        dateTimeConstraint = dateTimeConstraint.split(', ')
        for constraint in dateTimeConstraint:
            constraint = constraint.split(' ')
            n = 0
            if DateConstraint.isMonthConstraint(constraint[n]):
                print('MONTH CHECK:', constraint[n], month)
                if not DateConstraint.isMonthValid(month, constraint[n]): continue
                n += 1
            
            if DateConstraint.isDayConstraint(constraint[n]):
                print('DAY CHECK:', constraint[n], day)
                if not DateConstraint.isDayValid(day, constraint[n]): continue
                n += 1

            print('TIME CHECK:', constraint[n], hour)
            if DateConstraint.isTimeValid(hour, constraint[n]): return True
        
        return False
    

class DatabaseSearch:
    PATH = 'database/toilet_map.csv'

    def distance(x1, y1, x2, y2):
        return math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2))

    def search(long, lat, hasParking = False, hasAccessibleParking = False, hasBabyChange = False, ):
        with open(DatabaseSearch.PATH, encoding="utf8") as file:
            reader = csv.DictReader(file)
            count = 0
            hours = set()
            for row in reader:
                if (row['OpeningHours'][0] != "O"):
                    hours.add(row['OpeningHours'])